#!/usr/bin/env node
// scripts/retry-notifications.mjs
// Procedimiento operativo y módulo para recuperar notificaciones pendientes o fallidas en Cloudflare D1

import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const MAX_ATTEMPTS = 3;
export const LEASE_TIMEOUT_MINUTES = 5;

/**
 * Escapa entidades HTML para evitar inyecciones en el cuerpo del correo
 */
export function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Genera el payload de notificación con la misma plantilla y remitente que pilot.ts
 */
export function buildNotificationEmail(record, { recipientEmail, senderEmail } = {}) {
  const recipient = recipientEmail || process.env.NOTIFICATION_RECIPIENT_EMAIL || "contacto@decalight.es";
  const sender = senderEmail || process.env.NOTIFICATION_SENDER_EMAIL || "DECA Light <onboarding@resend.dev>";
  const company = record.company_name || "";
  const email = record.email || "";
  const id = record.id;
  const device = record.device_type || "desktop";

  return {
    from: sender,
    to: [recipient],
    subject: `[Piloto DECA Light] Nueva solicitud: ${company}`,
    html: `
      <h2>Nueva solicitud de participación en el programa piloto</h2>
      <p>Se ha recibido una nueva solicitud a través del formulario de la web comercial:</p>
      <ul>
        <li><strong>Empresa:</strong> ${escapeHtml(company)}</li>
        <li><strong>Correo de contacto:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
        <li><strong>ID de Solicitud:</strong> <code>${id}</code></li>
        <li><strong>Dispositivo:</strong> ${escapeHtml(device)}</li>
      </ul>
      <hr />
      <p><small>Este mensaje fue generado automáticamente por la web comercial de DECA Light.</small></p>
    `
  };
}

export const CLAIM_SQL = `
UPDATE pilot_submissions 
SET notification_status = 'processing',
    notification_attempts = notification_attempts + 1,
    notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE id = (
    SELECT id FROM pilot_submissions 
    WHERE (
        notification_status IN ('pending', 'failed')
        OR (notification_status = 'processing' AND notification_last_attempt < datetime('now', '-${LEASE_TIMEOUT_MINUTES} minutes'))
    )
    AND notification_attempts < ${MAX_ATTEMPTS}
    ORDER BY created_at ASC 
    LIMIT 1
)
RETURNING id, idempotency_key, company_name, email, device_type, notification_attempts;
`.trim().replace(/\s+/g, " ");

/**
 * Reclama atómicamente la solicitud más prioritaria
 */
export async function claimNextSubmission(db) {
  if (typeof db.prepare === "function") {
    return await db.prepare(CLAIM_SQL).first();
  }
  throw new Error("El adaptador de base de datos debe implementar el método .prepare()");
}

/**
 * Actualiza el registro a dispatched cuando Resend confirma la aceptación
 */
export async function markSubmissionSuccess(db, id, resendId) {
  const sql = `
    UPDATE pilot_submissions 
    SET notification_status = 'dispatched',
        resend_id = ?1,
        notification_error = NULL,
        notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
    WHERE id = ?2;
  `;
  await db.prepare(sql).bind(resendId || "ok", id).run();
}

/**
 * Actualiza el registro a failed registrando el código de error correspondiente
 */
export async function markSubmissionFailure(db, id, errorCode) {
  const sql = `
    UPDATE pilot_submissions 
    SET notification_status = 'failed',
        notification_error = ?1,
        notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
    WHERE id = ?2;
  `;
  await db.prepare(sql).bind(errorCode, id).run();
}

/**
 * Orquestador principal de recuperación para una solicitud
 */
export async function processNextRetryNotification({
  db,
  resendApiKey = process.env.RESEND_API_KEY,
  fetchFn = globalThis.fetch,
  recipientEmail,
  senderEmail
} = {}) {
  // 1. Reclamación atómica en D1
  const record = await claimNextSubmission(db);
  if (!record || !record.id) {
    return { processed: false, reason: "NO_PENDING_SUBMISSIONS" };
  }

  // 2. Si no hay clave de API configurada, no intentamos el envío y lo marcamos como fallido para evitar bucle
  if (!resendApiKey) {
    await markSubmissionFailure(db, record.id, "MISSING_RESEND_API_KEY");
    return {
      processed: true,
      success: false,
      id: record.id,
      error: "MISSING_RESEND_API_KEY",
      message: "RESEND_API_KEY no encontrada en las variables de entorno."
    };
  }

  // 3. Preparar el payload idéntico a pilot.ts
  const emailPayload = buildNotificationEmail(record, { recipientEmail, senderEmail });

  try {
    const res = await fetchFn("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `pilot-${record.id}`
      },
      body: JSON.stringify(emailPayload)
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      const resendId = data.id || "ok";
      await markSubmissionSuccess(db, record.id, resendId);
      return {
        processed: true,
        success: true,
        id: record.id,
        resendId,
        attempts: record.notification_attempts
      };
    } else {
      const errText = await res.text().catch(() => "");
      const statusCode = `HTTP_${res.status}`;
      await markSubmissionFailure(db, record.id, statusCode);
      return {
        processed: true,
        success: false,
        id: record.id,
        error: statusCode,
        details: errText,
        attempts: record.notification_attempts
      };
    }
  } catch (netErr) {
    // Timeout, DNS error o corte de conexión de red (resultado incierto)
    await markSubmissionFailure(db, record.id, "NETWORK_OR_TIMEOUT");
    return {
      processed: true,
      success: false,
      id: record.id,
      error: "NETWORK_OR_TIMEOUT",
      details: netErr instanceof Error ? netErr.message : String(netErr),
      attempts: record.notification_attempts
    };
  }
}

/**
 * Adaptador de base de datos D1 mediante la CLI de Wrangler para ejecución manual en terminal
 */
export function createWranglerDbAdapter(dbName, isRemote = false) {
  const envFlag = isRemote ? "--remote" : "--local";

  const createStmt = (sql, boundParams = []) => ({
    bind(...params) {
      return createStmt(sql, params);
    },
    async first() {
      const res = await this.all();
      return res.results?.[0] || null;
    },
    async run() {
      const res = await this.all();
      return { meta: { changes: res.results?.length ?? 1 } };
    },
    async all() {
      let finalSql = sql;
      boundParams.forEach((param, idx) => {
        let sanitizedVal = "NULL";
        if (param !== null && param !== undefined) {
          sanitizedVal = `'${String(param).replace(/'/g, "''")}'`;
        }
        finalSql = finalSql.replace(new RegExp(`\\?${idx + 1}\\b`, "g"), sanitizedVal);
      });

      const cmd = `npx wrangler d1 execute ${dbName} ${envFlag} --command "${finalSql.replace(/"/g, '\\"')}" --json`;
      const output = execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
      const parsed = JSON.parse(output);
      return { results: parsed[0]?.results || [] };
    }
  });

  return {
    prepare(sql) {
      return createStmt(sql);
    }
  };
}

// Ejecución directa por CLI si se invoca desde la terminal
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMainModule) {
  const isRemote = process.argv.includes("--remote");
  const dbArg = process.argv.find((a) => a.startsWith("--db="));
  // Aislamiento: por defecto usa base de datos local
  const dbName = dbArg ? dbArg.split("=")[1] : (isRemote ? "deca-light-d1" : "deca-light-d1-local");

  console.log(`[DECA Light] Ejecutando recuperación de notificaciones en ${dbName} (${isRemote ? "REMOTO" : "LOCAL"})...`);
  const db = createWranglerDbAdapter(dbName, isRemote);

  processNextRetryNotification({ db })
    .then((result) => {
      if (!result.processed) {
        console.log("[DECA Light] No hay solicitudes pendientes de notificación.");
      } else if (result.success) {
        console.log(`[DECA Light] Notificación completada con éxito para solicitud ${result.id} (Resend ID: ${result.resendId}).`);
      } else {
        console.warn(`[DECA Light] Fallo al procesar solicitud ${result.id}: ${result.error}.`);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error("[DECA Light] Error ejecutando la recuperación:", err.message || err);
      process.exit(1);
    });
}
