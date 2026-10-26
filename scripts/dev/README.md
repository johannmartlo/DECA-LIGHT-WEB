# Herramientas de desarrollo (no se publican)

Dividir un componente grande sin cambiar el aspecto:

1. `npm run build` y servir `dist/` (p. ej. `python -m http.server 4402 --directory dist`).
2. Capturas de referencia: `node scripts/dev/capturas.mjs http://localhost:4402/ capturas/A` (requiere `npm i -D playwright` y `npx playwright install chromium`, o `CHROME_PATH`).
3. Dividir: `python scripts/dev/split_astro_component.py src/components/X.astro X Parte1:INICIO:FIN Parte2:INICIO:FIN`
   (líneas 1-indexadas e inclusivas del marcado de cada parte; requiere `pip install tinycss2`). Aborta si alguna regla CSS no cabe en ninguna parte.
4. `npm run build`, capturas `capturas/B` y `python scripts/dev/comparar_capturas.py A B`: debe salir `diferencias: None 0` en móvil (m) y escritorio (d).
5. Si hay diferencias, deshacer (`git checkout src/components`) y ajustar los rangos.
