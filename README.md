# DECA Light Web

Sitio web comercial estático de **DECA Light**, solución orientada a la coordinación documental de expediciones para almacenes y comercializadoras hortofrutícolas.

---

## 1. Requisitos del entorno

- **Node.js:** `>=22.19.0` (fijado en `.node-version` y declarado en `package.json` bajo `engines.node`).
- **npm:** `>=9.6.5` (incluido con Node.js 22 LTS).

---

## 2. Instalación de dependencias

En la raíz del repositorio, ejecuta:

```bash
npm install
```

Para entornos de integración continua o reproducción exacta del árbol de dependencias (`package-lock.json`):

```bash
npm ci
```

---

## 3. Comandos disponibles

Definidos y verificados en `package.json`:

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor local de desarrollo de Astro (`astro dev`) con recarga en caliente (solo frontend). |
| `npm run dev:pages` | Inicia el entorno local completo emulando Cloudflare Pages Functions y D1 (`wrangler pages dev`). |
| `npm run d1:migrate:local` | Aplica las migraciones SQL sobre la base de datos D1 local emulada (`deca-light-d1-local`). |
| `npm run build` | Compila el proyecto en modo estático de producción (`astro build`) hacia el directorio `dist/`. |
| `npm run preview` | Sirve localmente el contenido ya compilado en `dist/` (`astro preview`) para validar antes de publicar. |
| `npm test` | Ejecuta la suite completa de pruebas automatizadas con el runner nativo de Node.js. |
| `npm run astro` | Acceso directo a la CLI de Astro (`astro`). |

---

## 4. Arquitectura estática y directorio de salida

- **Framework:** Astro `^7.3.8` con TypeScript en modo estricto (`astro/tsconfigs/strict`).
- **Modo de salida (`output`):** `static` (generación 100 % estática en tiempo de compilación, sin adaptadores SSR ni ejecución de servidor Node/Workers en producción).
- **Directorio de salida:** `dist/`
- **Rutas estáticas generadas:**
  - `/` (`dist/index.html`) — Landing principal de DECA Light.
  - `/aviso-legal` (`dist/aviso-legal/index.html`) — Aviso Legal.
  - `/politica-privacidad` (`dist/politica-privacidad/index.html`) — Política de Privacidad.
  - `/politica-cookies` (`dist/politica-cookies/index.html`) — Política de Cookies.

---

## 5. Integración con GitHub y Cloudflare Pages

El repositorio está conectado directamente a **Cloudflare Pages** mediante la integración oficial de GitHub:

- **Repositorio GitHub:** `johannmartlo/DECA-LIGHT-WEB`
- **Rama de producción actual:** `feat/ui-redesign-v2`
- **Dominios de producción:** `https://www.decalight.es` y `https://decalight.es`
- **URL de Cloudflare Pages:** `https://deca-light-web.pages.dev`
- **Parámetros de compilación en Cloudflare Pages:**
  - **Framework preset:** `Astro`
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
  - **Versión de Node.js:** `22.19.0` (definida en `.node-version`; si existe la variable `NODE_VERSION` en el panel de Cloudflare Pages, debe establecerse en `22.19.0` o eliminarse para delegar en `.node-version`).

---

## 6. Procedimiento general de despliegue

1. Realizar y verificar los cambios localmente ejecutando `npm test`, `npm run build` y `npm run preview`.
2. Confirmar que `dist/` se genera sin errores de Astro ni de TypeScript.
3. Hacer commit de los cambios en la rama `feat/ui-redesign-v2` y subirlos a GitHub (`git push origin feat/ui-redesign-v2`).
4. Cloudflare Pages detecta automáticamente el nuevo commit en `feat/ui-redesign-v2`, ejecuta `npm run build` en su entorno de compilación y publica el directorio `dist/` junto con las Pages Functions (`functions/`) en la red global de Cloudflare.

---

## 7. Formulario de solicitud de demostración (Pages Functions y Cloudflare D1)

La sección `#piloto` cuenta con un endpoint serverless gestionado por Cloudflare Pages Functions:

- **Endpoint:** `POST /api/pilot` (`functions/api/pilot.ts`).
- **Migraciones SQL:** `migrations/0001_create_pilot_submissions.sql`.
- **Notificaciones por email:** Integración con Resend (`RESEND_API_KEY`) desde el remitente verificado `DECA Light <piloto@envios.decalight.es>` hacia `contacto@decalight.es`, ejecutada en background mediante `context.waitUntil()`.

### Variables de entorno y bindings en Cloudflare Pages (solo nombres)

| Nombre | Tipo | Entornos | Descripción |
| :--- | :--- | :--- | :--- |
| `DB` | Binding D1 | Production / Preview | Persistencia primaria de solicitudes (`pilot_submissions`) y control de cuota (`rate_limit_events`). |
| `RESEND_API_KEY` | Secreto (`secret_text`) | Production / Preview | Clave privada de API de Resend para despacho de alertas transaccionales. |
| `IP_HASH_SALT` | Secreto (`secret_text`) | Production / Preview | Sal criptográfica privada para anonimización RGPD de direcciones IP (`SHA-256`). |
| `NOTIFICATION_SENDER_EMAIL` | Variable opcional | Production / Preview | Por defecto en código: `DECA Light <piloto@envios.decalight.es>`. |
| `NOTIFICATION_RECIPIENT_EMAIL` | Variable opcional | Production / Preview | Por defecto en código: `contacto@decalight.es`. |

### Aislamiento estricto de bases de datos por entorno
Por seguridad y coherencia operativa, los entornos **nunca deben compartir la base de datos de producción**:

1. **Local (Desarrollo offline):** `deca-light-d1-local` (emulada automáticamente en SQLite local bajo `.wrangler/state/v3/d1`).
2. **Preview (Validación y PRs):** `deca-light-d1-preview` (`ed864a09-32d3-4b67-850a-19ac8eae5c80`, región `EEUR`).
3. **Producción:** `deca-light-d1` (`c90f8ab0-493f-481b-9de2-2688004134dd`, región `EEUR`).

> [!WARNING]
> En `wrangler.toml` y en el panel de Cloudflare Pages (`Settings > Functions > D1 database bindings`), el binding `DB` para el entorno **Preview** apunta a `deca-light-d1-preview`. **Nunca vincules el entorno de Preview a la base de datos de producción `deca-light-d1`**.

### Seguridad y fiabilidad implementadas
- Limitación atómica por ventana deslizante (máximo 3 solicitudes por IP en 10 minutos).
- Trampa honeypot invisible (`_gotcha`) para descartar bots automáticamente sin alertarlos.
- Idempotencia por UUID (`idempotency_key`) para evitar duplicados en caso de reintentos o doble clic.
- Almacenamiento garantizado del lead en D1 con estados `pending`, `dispatched`, `failed` o `processing`.

### Script de recuperación de notificaciones
Permite reclamar y reintentar de forma atómica y segura las solicitudes rezagadas o huérfanas (> 5 min en `processing`) con un límite estricto de 3 intentos:

```bash
# Entorno local emulado:
node scripts/retry-notifications.mjs --local

# Entorno de validación (Preview remoto):
node scripts/retry-notifications.mjs --remote --db=deca-light-d1-preview

# Entorno de producción (remoto):
node scripts/retry-notifications.mjs --remote --db=deca-light-d1
```

### Pruebas automatizadas y desarrollo local
- Ejecutar `npm test` para validar las 12 pruebas de integración en memoria (validación, persistencia, honeypot, rate limiting, idempotencia, resiliencia y recuperación).
- Ejecutar `npm run d1:migrate:local` para inicializar las tablas en el emulador local.
- Ejecutar `npm run dev:pages` para servir la web con las Pages Functions y D1 emulado en local.