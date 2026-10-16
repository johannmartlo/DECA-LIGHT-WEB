// test/pilot-api.test.mjs
// Suite de pruebas automatizadas para la API de captación del programa piloto

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * Adaptador D1 ligero sobre SQLite nativo de Node.js (DatabaseSync)
 */
function createMockD1Database(migrationSql) {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(migrationSql);

  const createStatement = (sql, boundParams = []) => {
    return {
      bind(...params) {
        return createStatement(sql, params);
      },
      async run() {
        try {
          const cleanParams = boundParams.map((p) => (p === undefined ? null : p));
          const stmt = sqlite.prepare(sql);
          const info = stmt.run(...cleanParams);
          return {
            meta: {
              changes: Number(info.changes),
              last_row_id: Number(info.lastInsertRowid)
            }
          };
        } catch (err) {
          throw err;
        }
      },
      async first() {
        const cleanParams = boundParams.map((p) => (p === undefined ? null : p));
        const stmt = sqlite.prepare(sql);
        const row = stmt.get(...cleanParams);
        return row || null;
      },
      async all() {
        const cleanParams = boundParams.map((p) => (p === undefined ? null : p));
        const stmt = sqlite.prepare(sql);
        const rows = stmt.all(...cleanParams);
        return { results: rows };
      }
    };
  };

  return {
    raw: sqlite,
    prepare(sql) {
      return createStatement(sql);
    }
  };
}

// Cargar la migración real del proyecto
const migrationPath = path.resolve("migrations/0001_create_pilot_submissions.sql");
const migrationSql = fs.readFileSync(migrationPath, "utf8");

// Importar la función Cloudflare Pages
// Para compatibilidad ESM con extensiones .ts, importamos el handler directamente
const pilotModule = await import("../functions/api/pilot.ts");
const onRequestPost = pilotModule.onRequestPost;

const retryModule = await import("../scripts/retry-notifications.mjs");
const { processNextRetryNotification, buildNotificationEmail } = retryModule;

test("1. Validación de campos obligatorios y formatos", async (t) => {
  const db = createMockD1Database(migrationSql);
  const env = { DB: db };

  // Caso: Empresa vacía
  {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: "  ", email: "valido@empresa.com" })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, "INVALID_COMPANY");
  }

  // Caso: Correo inválido
  {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: "Frutas Levante", email: "correo-invalido-sin-arroba" })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.error, "INVALID_EMAIL");
  }

  // Caso: Payload excesivo (> 10 KB)
  {
    const hugeString = "A".repeat(11000);
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": "11500" },
      body: JSON.stringify({ company: "Grande", email: "valido@empresa.com", extra: hugeString })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 413);
  }
});

test("2. Envío legítimo y persistencia completa en D1", async () => {
  const db = createMockD1Database(migrationSql);
  const env = {
    DB: db,
    NOTIFICATION_RECIPIENT_EMAIL: "contacto@decalight.es"
  };

  const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-connecting-ip": "198.51.100.25",
      "cf-device-type": "desktop"
    },
    body: JSON.stringify({
      company: "Frutas del Sureste S.L.",
      email: "logistica@frutasdelsureste.com",
      idempotency_key: "test-idemp-001"
    })
  });

  const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.success, true);
  assert.ok(body.id, "Debe devolver un ID de solicitud generado");

  // Verificar en base de datos D1
  const row = db.raw.prepare("SELECT * FROM pilot_submissions WHERE id = ?").get(body.id);
  assert.ok(row, "La fila debe existir en D1");
  assert.equal(row.company_name, "Frutas del Sureste S.L.");
  assert.equal(row.email, "logistica@frutasdelsureste.com");
  assert.equal(row.notification_status, "pending");
  assert.equal(row.device_type, "desktop");
  assert.ok(row.ip_hash, "El hash de IP debe estar calculado");
  assert.notEqual(row.ip_hash, "198.51.100.25", "La IP nunca debe guardarse en texto plano");
});

test("3. Defensa anti-bot pasiva (Honeypot)", async () => {
  const db = createMockD1Database(migrationSql);
  const env = { DB: db };

  const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company: "Bot Spammer",
      email: "bot@spam.com",
      _gotcha: "http://enlace-trampa-de-bot.ru"
    })
  });

  const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
  assert.equal(res.status, 200, "Debe fingir 200 OK para no alertar al bot");
  const body = await res.json();
  assert.equal(body.success, true);

  // Comprobar que NADA fue guardado en D1
  const count = db.raw.prepare("SELECT COUNT(*) as c FROM pilot_submissions").get().c;
  assert.equal(count, 0, "No debe guardarse ninguna fila en D1 si el honeypot viene relleno");
});

test("4. Rate limiting atómico con ventana deslizante (máx 3 en 10 min)", async () => {
  const db = createMockD1Database(migrationSql);
  const env = { DB: db };
  const testIP = "203.0.113.88";

  for (let i = 1; i <= 3; i++) {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": testIP },
      body: JSON.stringify({
        company: `Empresa ${i}`,
        email: `empresa${i}@test.es`,
        idempotency_key: `key-${i}`
      })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 200, `Intento ${i} debe tener éxito`);
  }

  // 4º intento de la misma IP debe ser bloqueado con 429
  {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": testIP },
      body: JSON.stringify({
        company: "Empresa 4 (Excedida)",
        email: "empresa4@test.es",
        idempotency_key: "key-4"
      })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 429, "El 4º intento debe ser rechazado con 429");
    assert.equal(res.headers.get("Retry-After"), "600");
    const body = await res.json();
    assert.equal(body.error, "RATE_LIMIT_EXCEEDED");
  }

  // Un intento desde otra IP debe permitirse sin problema
  {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json", "cf-connecting-ip": "198.51.100.99" },
      body: JSON.stringify({
        company: "Empresa Otra IP",
        email: "otraip@test.es",
        idempotency_key: "key-otra"
      })
    });
    const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
    assert.equal(res.status, 200, "Otra IP no debe verse afectada por el límite");
  }
});

test("5. Idempotencia y prevención de duplicados por reintento de red o doble clic", async () => {
  const db = createMockD1Database(migrationSql);
  const env = { DB: db };
  const idempotencyKey = "reintento-cliente-uuid-1234";

  // Primer envío
  const req1 = new Request("https://deca-light-web.pages.dev/api/pilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company: "Hortícola Almería S.C.",
      email: "info@horticolaalmeria.es",
      idempotency_key: idempotencyKey
    })
  });
  const res1 = await onRequestPost({ request: req1, env, waitUntil: () => {} });
  assert.equal(res1.status, 200);
  const body1 = await res1.json();
  const originalId = body1.id;

  // Segundo envío concurrente/reintento con la misma clave
  const req2 = new Request("https://deca-light-web.pages.dev/api/pilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company: "Hortícola Almería S.C.",
      email: "info@horticolaalmeria.es",
      idempotency_key: idempotencyKey
    })
  });
  const res2 = await onRequestPost({ request: req2, env, waitUntil: () => {} });
  assert.equal(res2.status, 200);
  const body2 = await res2.json();

  // Debe devolver el mismo ID original y marcar duplicate: true
  assert.equal(body2.id, originalId, "Debe devolver el mismo ID de la solicitud previa");
  assert.equal(body2.duplicate, true);

  // En la base de datos solo debe haber exactamente 1 registro
  const total = db.raw.prepare("SELECT COUNT(*) as c FROM pilot_submissions").get().c;
  assert.equal(total, 1, "No debe duplicarse ninguna fila en D1");
});

test("6. Comprobación fail-fast si falta el binding de base de datos D1", async () => {
  // Entorno sin binding DB
  const env = {};
  const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ company: "Test", email: "test@test.es" })
  });
  const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
  assert.equal(res.status, 503, "Debe fallar con 503 Service Unavailable");
  const body = await res.json();
  assert.equal(body.error, "SERVICE_UNAVAILABLE");
});

test("7. Resiliencia de notificación: si Resend falla, D1 conserva el lead con status failed", async () => {
  const db = createMockD1Database(migrationSql);
  const env = {
    DB: db,
    RESEND_API_KEY: "re_mock_test_key"
  };

  // Interceptar global.fetch para simular fallo 401 de Resend (clave inválida o timeout)
  const originalFetch = global.fetch;
  global.fetch = async () => {
    return new Response(JSON.stringify({ message: "Invalid API key" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  };

  try {
    const req = new Request("https://deca-light-web.pages.dev/api/pilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "Agrícola Prueba Fallo Correo",
        email: "fallocorreo@test.es",
        idempotency_key: "idemp-fallo-correo"
      })
    });

    const res = await onRequestPost({ request: req, env, waitUntil: (p) => p });
    // El usuario debe recibir 200 OK porque su solicitud quedó guardada a salvo en D1
    assert.equal(res.status, 200);
    const body = await res.json();

    // Comprobar que en D1 el registro existe y su estado es 'failed'
    const row = db.raw.prepare("SELECT * FROM pilot_submissions WHERE id = ?").get(body.id);
    assert.ok(row, "El lead debe conservarse intacto en D1");
    assert.equal(row.notification_status, "failed");
    assert.equal(row.notification_error, "HTTP_401");
    assert.equal(row.notification_attempts, 1);
  } finally {
    global.fetch = originalFetch;
  }
});

test("8. Verificación de la consulta atómica de recuperación (reclamación de pendientes y huérfanos)", async () => {
  const db = createMockD1Database(migrationSql);

  // Insertar un registro normal 'pending'
  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, created_at)
    VALUES ('id-1', 'key-1', 'Empresa 1', 'emp1@test.es', 'hash', 'pending', datetime('now', '-10 minutes'))
  `).run();

  // Insertar un registro huérfano 'processing' bloqueado hace 8 minutos
  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, notification_last_attempt, created_at)
    VALUES ('id-2', 'key-2', 'Empresa 2 (Huérfano)', 'emp2@test.es', 'hash', 'processing', datetime('now', '-8 minutes'), datetime('now', '-20 minutes'))
  `).run();

  // Insertar un registro agotado con 3 intentos (no debe ser seleccionado)
  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, notification_attempts, created_at)
    VALUES ('id-3', 'key-3', 'Empresa 3 (Agotada)', 'emp3@test.es', 'hash', 'failed', 3, datetime('now', '-30 minutes'))
  `).run();

  const claimSql = `
    UPDATE pilot_submissions 
    SET notification_status = 'processing',
        notification_attempts = notification_attempts + 1,
        notification_last_attempt = datetime('now')
    WHERE id = (
        SELECT id FROM pilot_submissions 
        WHERE (
            notification_status IN ('pending', 'failed')
            OR (notification_status = 'processing' AND notification_last_attempt < datetime('now', '-5 minutes'))
        )
        AND notification_attempts < 3
        ORDER BY created_at ASC 
        LIMIT 1
    )
    RETURNING id, company_name;
  `;

  // Primera reclamación: debe tomar id-2 (más antigua: hace 20 min)
  const claim1 = db.raw.prepare(claimSql).get();
  assert.equal(claim1.id, "id-2");

  // Segunda reclamación: debe tomar id-1 (hace 10 min)
  const claim2 = db.raw.prepare(claimSql).get();
  assert.equal(claim2.id, "id-1");

  // Tercera reclamación: id-3 tiene 3 intentos, no debe haber más registros elegibles
  const claim3 = db.raw.prepare(claimSql).get();
  assert.equal(claim3, undefined, "No debe haber más registros elegibles");
});

test("9. scripts/retry-notifications.mjs - Recuperación exitosa y actualización a dispatched", async () => {
  const db = createMockD1Database(migrationSql);

  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, created_at)
    VALUES ('lead-rec-1', 'key-rec-1', 'Frutas El Valle', 'info@valle.es', 'hash', 'pending', datetime('now', '-5 minutes'))
  `).run();

  let capturedHeaderKey = null;
  let capturedBody = null;

  const mockFetch = async (url, options) => {
    capturedHeaderKey = options.headers["Idempotency-Key"];
    capturedBody = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: "resend-rec-001" }), { status: 200 });
  };

  const result = await processNextRetryNotification({
    db,
    resendApiKey: "re_mock_test_key",
    fetchFn: mockFetch,
    recipientEmail: "contacto@decalight.es"
  });

  assert.equal(result.processed, true);
  assert.equal(result.success, true);
  assert.equal(result.resendId, "resend-rec-001");
  assert.equal(capturedHeaderKey, "pilot-lead-rec-1", "Debe mantener Idempotency-Key pilot-${id}");
  assert.ok(capturedBody.html.includes("Frutas El Valle"));

  // Verificar en base de datos
  const row = db.raw.prepare("SELECT * FROM pilot_submissions WHERE id = 'lead-rec-1'").get();
  assert.equal(row.notification_status, "dispatched");
  assert.equal(row.resend_id, "resend-rec-001");
  assert.equal(row.notification_error, null);
  assert.equal(row.notification_attempts, 1);
});

test("10. scripts/retry-notifications.mjs - Rechazo HTTP de Resend y actualización a failed", async () => {
  const db = createMockD1Database(migrationSql);

  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, created_at)
    VALUES ('lead-rec-2', 'key-rec-2', 'Hortícola Fallo', 'info@fallo.es', 'hash', 'pending', datetime('now', '-5 minutes'))
  `).run();

  const mockFetch = async () => {
    return new Response(JSON.stringify({ message: "Domain not verified" }), { status: 422 });
  };

  const result = await processNextRetryNotification({
    db,
    resendApiKey: "re_mock_test_key",
    fetchFn: mockFetch
  });

  assert.equal(result.processed, true);
  assert.equal(result.success, false);
  assert.equal(result.error, "HTTP_422");

  const row = db.raw.prepare("SELECT * FROM pilot_submissions WHERE id = 'lead-rec-2'").get();
  assert.equal(row.notification_status, "failed");
  assert.equal(row.notification_error, "HTTP_422");
  assert.equal(row.notification_attempts, 1);
});

test("11. scripts/retry-notifications.mjs - Timeout o corte de red (resultado incierto) registrado como failed", async () => {
  const db = createMockD1Database(migrationSql);

  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, created_at)
    VALUES ('lead-rec-3', 'key-rec-3', 'Tomates Timeout', 'info@timeout.es', 'hash', 'pending', datetime('now', '-5 minutes'))
  `).run();

  const mockFetch = async () => {
    throw new Error("Network timeout: Resend API did not answer within 10000ms");
  };

  const result = await processNextRetryNotification({
    db,
    resendApiKey: "re_mock_test_key",
    fetchFn: mockFetch
  });

  assert.equal(result.processed, true);
  assert.equal(result.success, false);
  assert.equal(result.error, "NETWORK_OR_TIMEOUT");

  const row = db.raw.prepare("SELECT * FROM pilot_submissions WHERE id = 'lead-rec-3'").get();
  assert.equal(row.notification_status, "failed");
  assert.equal(row.notification_error, "NETWORK_OR_TIMEOUT");
  assert.equal(row.notification_attempts, 1);
});

test("12. scripts/retry-notifications.mjs - Comportamiento cuando no hay pendientes y respeto al tope de intentos", async () => {
  const db = createMockD1Database(migrationSql);

  // Caso A: DB vacía
  const result1 = await processNextRetryNotification({ db, resendApiKey: "re_mock_key" });
  assert.equal(result1.processed, false);
  assert.equal(result1.reason, "NO_PENDING_SUBMISSIONS");

  // Caso B: Lead con 3 intentos ya agotados
  db.raw.prepare(`
    INSERT INTO pilot_submissions (id, idempotency_key, company_name, email, ip_hash, notification_status, notification_attempts, created_at)
    VALUES ('lead-agotado', 'key-agotado', 'Agotado S.L.', 'info@agotado.es', 'hash', 'failed', 3, datetime('now', '-10 minutes'))
  `).run();

  const result2 = await processNextRetryNotification({ db, resendApiKey: "re_mock_key" });
  assert.equal(result2.processed, false);
  assert.equal(result2.reason, "NO_PENDING_SUBMISSIONS");
});

