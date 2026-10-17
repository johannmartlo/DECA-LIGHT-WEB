// functions/api/pilot.ts - Endpoint Edge de Cloudflare Pages para captación del programa piloto

export interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  NOTIFICATION_RECIPIENT_EMAIL?: string;
  NOTIFICATION_SENDER_EMAIL?: string;
  IP_HASH_SALT?: string;
}

const RFC5322_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff"
};

/**
 * Calcula un hash HMAC/SHA-256 de la IP con sal para rate limiting y auditoría privada (RGPD)
 */
async function computeIpHash(ip: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${ip}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Handler principal POST /api/pilot
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // 1. Verificación obligatoria de persistencia en el entorno actual
  if (!env.DB) {
    return new Response(
      JSON.stringify({
        error: "SERVICE_UNAVAILABLE",
        message: "El servicio de persistencia no está configurado en este entorno de despliegue."
      }),
      { status: 503, headers: CORS_HEADERS }
    );
  }

  // 2. Control de tamaño máximo del payload (10 KB)
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > 10240) {
    return new Response(
      JSON.stringify({
        error: "PAYLOAD_TOO_LARGE",
        message: "El tamaño de la solicitud excede el límite permitido."
      }),
      { status: 413, headers: CORS_HEADERS }
    );
  }

  // 3. Procesamiento y deserialización de datos entrantes
  let companyRaw = "";
  let emailRaw = "";
  let idempotencyKeyRaw = "";
  let gotchaRaw = "";

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const json = await request.json<Record<string, unknown>>();
      companyRaw = typeof json.company === "string" ? json.company : "";
      emailRaw = typeof json.email === "string" ? json.email : "";
      idempotencyKeyRaw = typeof json.idempotency_key === "string" ? json.idempotency_key : "";
      gotchaRaw = typeof json._gotcha === "string" ? json._gotcha : "";
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      companyRaw = (formData.get("company") as string) || "";
      emailRaw = (formData.get("email") as string) || "";
      idempotencyKeyRaw = (formData.get("idempotency_key") as string) || "";
      gotchaRaw = (formData.get("_gotcha") as string) || "";
    } else {
      return new Response(
        JSON.stringify({
          error: "UNSUPPORTED_MEDIA_TYPE",
          message: "Formato de contenido no admitido. Utilice application/json o multipart/form-data."
        }),
        { status: 415, headers: CORS_HEADERS }
      );
    }
  } catch {
    return new Response(
      JSON.stringify({
        error: "MALFORMED_INPUT",
        message: "No se ha podido procesar el cuerpo de la solicitud."
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // 4. Defensa anti-bot pasiva (Honeypot)
  // Si el campo invisible _gotcha contiene texto, se descarta silenciosamente con respuesta 200 fingida
  if (gotchaRaw.trim() !== "") {
    return new Response(
      JSON.stringify({
        success: true,
        message: "Solicitud registrada con éxito."
      }),
      { status: 200, headers: CORS_HEADERS }
    );
  }

  // 5. Validación y normalización estricta de entradas
  const company = companyRaw.trim().replace(/[\u0000-\u001F\u007F]/g, ""); // Sanear caracteres de control
  const email = emailRaw.trim().toLowerCase();
  const idempotencyKey = (idempotencyKeyRaw.trim() || crypto.randomUUID()).slice(0, 64);

  if (company.length < 2 || company.length > 120) {
    return new Response(
      JSON.stringify({
        error: "INVALID_COMPANY",
        message: "El nombre de la empresa debe tener entre 2 y 120 caracteres."
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (email.length < 5 || email.length > 254 || !RFC5322_EMAIL_REGEX.test(email)) {
    return new Response(
      JSON.stringify({
        error: "INVALID_EMAIL",
        message: "La dirección de correo electrónico introducida no es válida."
      }),
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // 6. Rate Limiting con ventana deslizante continua (máx 3 solicitudes en 10 min por IP)
  const clientIP =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";
  const salt = env.IP_HASH_SALT || "deca-light-default-local-salt-2026";
  const ipHash = await computeIpHash(clientIP, salt);

  try {
    // Inserción atómica en D1 sujeta a la cuota continua de los últimos 600 segundos
    const rateLimitResult = await env.DB.prepare(`
      INSERT INTO rate_limit_events (ip_hash, created_at_unix)
      SELECT ?1, unixepoch()
      WHERE (
        SELECT COUNT(*) 
        FROM rate_limit_events 
        WHERE ip_hash = ?1 AND created_at_unix >= (unixepoch() - 600)
      ) < 3;
    `)
      .bind(ipHash)
      .run();

    if (rateLimitResult.meta.changes === 0) {
      return new Response(
        JSON.stringify({
          error: "RATE_LIMIT_EXCEEDED",
          message: "Límite de solicitudes superado. Por favor, inténtelo de nuevo dentro de 10 minutos."
        }),
        {
          status: 429,
          headers: {
            ...CORS_HEADERS,
            "Retry-After": "600"
          }
        }
      );
    }

    // Limpieza oportunista de registros expirados de esta IP
    context.waitUntil?.(
      env.DB.prepare(`
        DELETE FROM rate_limit_events 
        WHERE ip_hash = ?1 AND created_at_unix < (unixepoch() - 600);
      `)
        .bind(ipHash)
        .run()
    );
  } catch (err) {
    console.error("Error en comprobación de rate limit:", err);
    // En caso de fallo inesperado del subsistema de rate limit, no bloqueamos al usuario si la DB principal responde
  }

  // 7. Persistencia primaria en Cloudflare D1
  const submissionId = crypto.randomUUID();
  const deviceType = request.headers.get("cf-device-type") || "desktop";

  try {
    await env.DB.prepare(`
      INSERT INTO pilot_submissions (
        id,
        idempotency_key,
        company_name,
        email,
        ip_hash,
        device_type,
        notification_status,
        created_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'pending', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'));
    `)
      .bind(submissionId, idempotencyKey, company, email, ipHash, deviceType)
      .run();
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);

    // Detección de colisión por clave de idempotencia (reintento del cliente o doble clic)
    if (errorMsg.includes("UNIQUE") || errorMsg.includes("constraint") || errorMsg.includes("2067")) {
      const existing = await env.DB.prepare(`
        SELECT id, created_at FROM pilot_submissions WHERE idempotency_key = ?1;
      `)
        .bind(idempotencyKey)
        .first<{ id: string; created_at: string }>();

      if (existing) {
        return new Response(
          JSON.stringify({
            success: true,
            id: existing.id,
            duplicate: true,
            message: "Solicitud ya registrada previamente."
          }),
          { status: 200, headers: CORS_HEADERS }
        );
      }
    }

    console.error("Error crítico de persistencia en D1:", err);
    return new Response(
      JSON.stringify({
        error: "DATABASE_ERROR",
        message: "No se ha podido guardar la solicitud en este momento. Por favor, inténtelo de nuevo."
      }),
      { status: 500, headers: CORS_HEADERS }
    );
  }

  // 8. Notificación mediante proveedor de email (Resend)
  // La persistencia ya está garantizada en D1. Si el correo falla, la solicitud no se pierde.
  const recipientEmail = env.NOTIFICATION_RECIPIENT_EMAIL || "contacto@decalight.es";
  const senderEmail = env.NOTIFICATION_SENDER_EMAIL || "DECA Light <piloto@envios.decalight.es>";
  const resendApiKey = env.RESEND_API_KEY;

  if (resendApiKey) {
    const notificationPromise = (async () => {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `pilot-${submissionId}`
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [recipientEmail],
            subject: `[Piloto DECA Light] Nueva solicitud: ${company}`,
            html: `
              <h2>Nueva solicitud de participación en el programa piloto</h2>
              <p>Se ha recibido una nueva solicitud a través del formulario de la web comercial:</p>
              <ul>
                <li><strong>Empresa:</strong> ${escapeHtml(company)}</li>
                <li><strong>Correo de contacto:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>
                <li><strong>ID de Solicitud:</strong> <code>${submissionId}</code></li>
                <li><strong>Dispositivo:</strong> ${escapeHtml(deviceType)}</li>
              </ul>
              <hr />
              <p><small>Este mensaje fue generado automáticamente por la web comercial de DECA Light.</small></p>
            `
          })
        });

        if (emailResponse.ok) {
          const resendData = (await emailResponse.json()) as { id?: string };
          await env.DB!.prepare(`
            UPDATE pilot_submissions 
            SET notification_status = 'dispatched',
                resend_id = ?1,
                notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
            WHERE id = ?2;
          `)
            .bind(resendData.id || "ok", submissionId)
            .run();
        } else {
          const errText = await emailResponse.text();
          const statusCode = `HTTP_${emailResponse.status}`;
          console.error("Resend devolvió error HTTP:", statusCode, errText);

          await env.DB!.prepare(`
            UPDATE pilot_submissions 
            SET notification_status = 'failed',
                notification_attempts = notification_attempts + 1,
                notification_error = ?1,
                notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
            WHERE id = ?2;
          `)
            .bind(statusCode, submissionId)
            .run();
        }
      } catch (emailErr) {
        console.error("Excepción al contactar con la API de correo:", emailErr);
        await env.DB!.prepare(`
          UPDATE pilot_submissions 
          SET notification_status = 'failed',
              notification_attempts = notification_attempts + 1,
              notification_error = 'NETWORK_OR_TIMEOUT',
              notification_last_attempt = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
          WHERE id = ?1;
        `)
          .bind(submissionId)
          .run();
      }
    })();

    if (context.waitUntil) {
      context.waitUntil(notificationPromise);
    } else {
      // Entorno de prueba o desarrollo sin waitUntil
      await notificationPromise;
    }
  } else {
    // En desarrollo local sin credenciales de correo configuradas, queda registrado como pending
    console.info(`[DECA Light Local] Solicitud ${submissionId} guardada en D1. Resend API Key no configurada.`);
  }

  // 9. Respuesta satisfactoria al usuario
  return new Response(
    JSON.stringify({
      success: true,
      id: submissionId,
      message: "¡Solicitud recibida con éxito! Nos pondremos en contacto contigo para evaluar el encaje operativo de DECA Light en tu almacén."
    }),
    { status: 200, headers: CORS_HEADERS }
  );
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
