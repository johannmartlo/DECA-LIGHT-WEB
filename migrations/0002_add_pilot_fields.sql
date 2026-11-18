-- migrations/0002_add_pilot_fields.sql
-- Añade campos opcionales de cualificación en solicitudes de demostración (Cloudflare D1)

ALTER TABLE pilot_submissions ADD COLUMN phone TEXT;
ALTER TABLE pilot_submissions ADD COLUMN daily_loads TEXT;
ALTER TABLE pilot_submissions ADD COLUMN erp TEXT;
