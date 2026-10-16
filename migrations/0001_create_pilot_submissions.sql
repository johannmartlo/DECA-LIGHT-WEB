-- migrations/0001_create_pilot_submissions.sql
-- Tabla aislada para captación comercial de DECA Light (Cloudflare D1)

CREATE TABLE IF NOT EXISTS pilot_submissions (
    id TEXT PRIMARY KEY,                              -- UUID v4 generado en servidor
    idempotency_key TEXT NOT NULL UNIQUE,             -- Token UUID v4 generado en cliente
    company_name TEXT NOT NULL,                        -- Nombre de la empresa (máx 120 caracteres)
    email TEXT NOT NULL,                               -- Email corporativo normalizado (máx 254 caracteres)
    ip_hash TEXT NOT NULL,                             -- SHA-256(IP + IP_HASH_SALT) para auditoría y privacidad
    device_type TEXT,                                  -- 'desktop' | 'mobile' | 'tablet'
    notification_status TEXT NOT NULL DEFAULT 'pending',-- 'pending' | 'processing' | 'dispatched' | 'failed'
    notification_attempts INTEGER NOT NULL DEFAULT 0,  -- Contador de intentos de notificación (máx 3)
    notification_last_attempt TEXT,                    -- Timestamp ISO 8601 del último intento
    notification_error TEXT,                           -- Código o causa técnica saneada en caso de fallo
    resend_id TEXT,                                    -- ID devuelto por la API de Resend
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_pilot_idempotency ON pilot_submissions(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_pilot_email_window ON pilot_submissions(email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pilot_retry_queue ON pilot_submissions(notification_status, notification_attempts, created_at ASC);

-- Tabla para rate limiting con ventana deslizante real (Sliding Window Log)
CREATE TABLE IF NOT EXISTS rate_limit_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_hash TEXT NOT NULL,
    created_at_unix INTEGER NOT NULL                   -- Epoch Unix en segundos
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_window ON rate_limit_events(ip_hash, created_at_unix DESC);
