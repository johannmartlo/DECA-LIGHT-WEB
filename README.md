# DECA Light Web

Sitio web comercial estático de **DECA Light**, solución en desarrollo orientada a la coordinación documental de expediciones para almacenes y comercializadoras hortofrutícolas.

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
| `npm run dev` | Inicia el servidor local de desarrollo de Astro (`astro dev`) con recarga en caliente. |
| `npm run build` | Compila el proyecto en modo estático de producción (`astro build`) hacia el directorio `dist/`. |
| `npm run preview` | Sirve localmente el contenido ya compilado en `dist/` (`astro preview`) para validar antes de publicar. |
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
- **URL temporal de validación:** `https://deca-light-web.pages.dev`
- **Parámetros de compilación en Cloudflare Pages:**
  - **Framework preset:** `Astro`
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
  - **Versión de Node.js:** `22.19.0` (definida en `.node-version`; si existe la variable `NODE_VERSION` en el panel de Cloudflare Pages, debe establecerse en `22.19.0` o eliminarse para delegar en `.node-version`).

---

## 6. Procedimiento general de despliegue

1. Realizar y verificar los cambios localmente ejecutando `npm run build` y `npm run preview`.
2. Confirmar que `dist/` se genera sin errores de Astro ni de TypeScript.
3. Hacer commit de los cambios en la rama `feat/ui-redesign-v2` y subirlos a GitHub (`git push origin feat/ui-redesign-v2`).
4. Cloudflare Pages detecta automáticamente el nuevo commit en `feat/ui-redesign-v2`, ejecuta `npm run build` en su entorno de compilación y publica el directorio `dist/` en la red global de Cloudflare.