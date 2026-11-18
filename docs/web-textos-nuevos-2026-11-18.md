# Web decalight.es — versión 2, revisada (18-nov-2026, 22:50)

Sustituye a la versión 1 de esta noche. Revisada contra:
- el código de la web (`DECA-LIGHT-WEB`: rama `feat/web-mejoras`, `1d6db82` del 26-oct, la más reciente);
- la **Guía de DECA Light para almacenes** (comprobada contra el código el 18-nov);
- el traspaso del DT del 18-nov (qué está en producción y qué no).

**Regla de oro:** la web solo dice lo que hoy hace la app en producción. Lo que está en curso va marcado como **[cuando esté en producción]** y no se publica hasta entonces.

---

## 0. Qué falla hoy y qué cambia

| Hoy en la web | Problema | Versión 2 |
|---|---|---|
| «Coordina la documentación de tus expediciones sin esperas innecesarias» | Genérico; no dice qué hace | «Todos tus DeCA del día, sin ir albarán por albarán» |
| Condicionales: «busca ayudar», «siempre que esta capacidad esté disponible» | Suena a proyecto, no a producto | Afirmaciones concretas de lo que hace |
| Pie y avisos: «en desarrollo», «programa piloto», marcas de terceros | Ya corregido en `feat/web-mejoras` | Se mantiene |
| Habla de CMR, CSV y «entrada manual» | No confirmado en producción | Fuera |
| Ilustraciones inventadas («Naranjas», «Tráiler», «CMR #982») | No se parecen a la app | Vídeo y capturas reales |
| Formulario: empresa y correo | No sabes el tamaño del cliente | + teléfono, cargas al día y ERP |
| **Aviso legal: «BORRADOR… PENDIENTE DE INCORPORACIÓN» del NIF y el titular** | **ROJO: la LSSI exige identificar al titular en una web comercial** | Completar con tus datos (ver apartado 15) |
| Logotipo antiguo (los colores ya están unificados en `tokens.css` en `feat/web-mejoras`) | Marca incoherente con las redes | Logotipo «la D con el QR» |

---

## PARTE 1 · Textos

### 1. Cabecera de navegación (`Header.astro`)
- Logotipo nuevo (claro): `deca-light-logo-claro.svg`.
- Enlaces: **Cómo funciona** · **Qué incluye** · **Normativa** · **Preguntas**
- Botón: **Pedir demostración** → `#demo`

### 2. Portada (`Hero.astro`)
- **Antetítulo:** DeCA PARA ALMACENES HORTOFRUTÍCOLAS
- **Titular (H1):** Todos tus DeCA del día, sin ir albarán por albarán.
- **Subtítulo:** Importas tus albaranes o tus cartas de porte, pones una matrícula por camión y emites todos los DeCA de cada transportista con un botón. Sin cambiar de ERP.
- **Botón principal:** Pruébalo gratis un mes → `#demo`
- **Botón secundario:** Ver cómo funciona → `#como-funciona`
- **Bajo los botones:** Primer mes gratis · Te lo dejamos configurado · Datos en la UE
- **Visual:** vídeo de demostración (`demo.mp4`, sin sonido, en bucle) con su póster. Más adelante, la grabación real de la app.

### 3. Franja de contexto (NUEVA, fina, bajo la portada)
> El DeCA electrónico es obligatorio desde el **5 de octubre de 2026**. DECA Light está hecho para emitirlo en la hora punta, con muchos camiones a la vez.

### 4. El problema (`Problem.astro`)
- **Antetítulo:** LA HORA PUNTA
- **Titular:** Cuarenta cargas, la matrícula en el último minuto y un DeCA por cada albarán.
- **Texto:** Los albaranes están listos por la mañana, pero el camión se confirma a última hora. Con un generador manual toca rellenar un formulario por cada DeCA y teclear la misma matrícula una y otra vez. Ahí se va el tiempo y se cuelan los errores.
- **Tres tarjetas:**
  1. **Un formulario por DeCA.** Cuarenta cargas son cuarenta formularios.
  2. **La matrícula, repetida.** La misma, en cada albarán del mismo camión.
  3. **El camión esperando.** Sin DeCA no sale, y el conductor necesita su copia antes de arrancar.

### 5. Cómo funciona (`HowItWorks.astro`, `id="como-funciona"`)
- **Antetítulo:** CÓMO FUNCIONA
- **Titular:** Importas, pones la matrícula, emites.
- **Paso 1 · Importa las cargas del día.** El informe de expediciones de tu ERP o tus cartas de porte en PDF, varias a la vez. DECA Light rellena todo lo que puede y agrupa las cargas por transportista.
- **Paso 2 · Pon la matrícula una vez por camión.** En cada transportista, «Asignar camión a las pendientes»: escribes la tractora y, si lleva, el remolque, y se aplica a todas sus cargas pendientes. Lo que no cuadra se queda en Revisión, con el motivo escrito.
- **Paso 3 · Emite y envía.** «Emitir DeCA» emite todas las cargas listas de ese transportista. Cada DeCA sale en PDF con su QR, y se lo envías al transportista por correo desde su ficha.
- **Debajo, en pequeño:** Todo se puede hacer con el teclado: **I** importar · **G** asignar camión · **E** emitir.
- **Visual:** una imagen por paso: `public/img/paso-1.webp`, `paso-2.webp` y `paso-3.webp`. Más adelante, capturas reales de la app en tema claro.

### 6. Comparativa (NUEVA, `Comparison.astro`)
- **Titular:** La misma mañana, de dos maneras.

| | Uno a uno | DECA Light |
|---|---|---|
| Formularios que rellenas | 40 | 0 |
| Matrículas que tecleas | 40 | 10 |
| Clics para emitir | 40 | 4, uno por transportista |

- **Nota:** Ejemplo: 40 cargas de 4 transportistas en 10 camiones.

### 7. Para los días complicados (NUEVA, `RealLife.astro`)
Es lo que separa a DECA Light de un generador de PDF: los imprevistos del muelle ya tienen su botón.
- **Titular:** Lo que pasa de verdad en el muelle, resuelto.
- **Tarjetas:**
  1. **Cambia la tractora a última hora.** Modificas el DeCA con el motivo. Mismo QR: el que ya tiene el conductor sigue valiendo.
  2. **Cambia la empresa transportista.** Lo sustituyes por un DeCA nuevo y el anterior queda sustituido.
  3. **El transporte no se hace.** Lo anulas y su enlace se cierra al momento.
  4. **El cliente recoge con su camión.** «Sin DeCA: transporte del cliente», y esas cargas dejan de estar pendientes.
  5. **Un camión por la mañana y otro por la tarde.** Las cargas de la tarde llegan aparte y reciben su matrícula sin tocar las de la mañana.
  6. **Importas el mismo informe dos veces.** No se duplica nada: ni cargas, ni matrículas, ni DeCA emitidos.
  7. **El transportista viene escrito de otra forma.** Lo asignas una vez y DECA Light aprende ese nombre para la próxima.
- **[cuando esté en producción]** «Se anuló por error: Volver a preparar» (T-090) y «Sugerencias por cliente» (T-089).
- **Pie:** Cada cambio pide su motivo y queda registrado: quién, qué y cuándo.

### 8. Qué incluye (`Includes.astro`, `id="que-incluye"`; sustituye a `BenefitsStrip`)
- **Titular:** Qué recibes con DECA Light.
- **Columna «Lo que hace»:**
  - Importación del informe de tu ERP y de cartas de porte en PDF, varias a la vez
  - Cargas agrupadas por transportista y estados claros: Lista para emitir, Falta matrícula, Revisión
  - Matrícula de tractora y remolque una vez por camión
  - Emisión de todos los DeCA de un transportista con un botón
  - DeCA en PDF con QR, y envío al transportista por correo
  - Modificar, sustituir y anular, con motivo e historial
  - Equipo: cada persona con su usuario
  - Datos en la UE, con copias de seguridad cifradas diarias
- **Columna «Lo que no tienes que hacer»:** cambiar de ERP · instalar nada (funciona en el navegador) · teclear la matrícula en cada albarán · rellenar un formulario por DeCA · registrar a los conductores en ninguna plataforma

### 9. Normativa y confianza (NUEVA, `Trust.astro`, `id="normativa"`)
- **Titular:** Lo que pide el DeCA electrónico, de serie.
- **Columna «El documento»:**
  - PDF nativo con código QR
  - Descarga directa desde el QR, sin usuario ni contraseña
  - No se emite sin los datos mínimos (tampoco sin matrícula)
  - Modificaciones con su motivo y su historial, con el mismo QR
  - Enlace disponible durante el transporte y siete días después de terminarlo
- **Columna «Tus datos»:**
  - Servidores en la Unión Europea
  - Copias de seguridad cifradas cada día
  - Cada empresa ve solo sus cargas, transportistas y DeCA
  - Cada persona entra con su usuario y todo queda registrado
- **Nota pequeña:** Referencias: Orden FOM/2861/2012 y Resolución de la Dirección General de Transporte por Carretera y Ferrocarril de 5 de junio de 2026 (BOE de 12 de junio de 2026).
- No usar «cumple», «homologado» ni «certificado».

### 10. Para transportistas (NUEVA, franja corta)
- **Titular:** ¿Eres transportista?
- **Texto:** Recibes el DeCA por correo, con su enlace. Tu conductor lo abre en el móvil o lee el QR: sin registrarse ni instalar nada. Si trabajas con almacenes que todavía lo hacen uno a uno, cuéntales que existe DECA Light.

### 11. (Descartado el 18-nov: sin sección del fundador)

### 12. Oferta y formulario (`Pilot.astro`, `id="demo"`)
- **Antetítulo:** PRIMER MES GRATIS
- **Titular:** Pruébalo un mes con tus cargas reales.
- **Texto:** Trabajas en paralelo con lo que usas hoy hasta que lo veas claro. Dejamos tu cuenta y tus transportistas configurados contigo. El precio depende de tu volumen: te lo damos en la demostración, sin compromiso.
- **Tres pasos:** 1. Demostración de 30 minutos con tu operativa. 2. Configuramos tu cuenta. 3. Un mes gratis con tus cargas reales.
- **Campos del formulario:**
  - Empresa
  - Correo
  - Teléfono (opcional)
  - Cargas al día: Menos de 20 / 20-50 / 50-100 / Más de 100
  - ERP que usáis (opcional)
- **Botón:** Pedir demostración
- **Debajo:** Sin compromiso. Te respondemos en un día laborable.
- Fuera: «Escucha activa», «Mejora continua», la tarjeta de CMR y «Fase actual: Contacto con almacenes…».

### 13. Preguntas frecuentes (`Faq.astro`, `id="preguntas"`)
1. **¿Tengo que cambiar de ERP?** No. DECA Light trabaja con el informe de expediciones que ya sacas de tu ERP, o con tus cartas de porte.
2. **¿Y si mi ERP saca un informe distinto?** En la puesta en marcha lo dejamos funcionando con el informe de tu ERP. **[cuando esté en producción T-092:** o usas la plantilla de DECA Light en Excel o CSV.**]**
3. **¿Qué recibe el conductor?** Su DeCA en PDF con un QR. Lo abre en el móvil, desde el enlace del correo o leyendo el QR, sin registrarse.
4. **¿Se puede emitir un DeCA sin matrícula?** No. La carga se queda en «Falta matrícula» hasta que la pones.
5. **Si cambia el camión después de emitir, ¿hay que hacer otro DeCA?** No. Se modifica el mismo con el motivo, y el QR que ya tiene el conductor sigue sirviendo. Solo hace falta uno nuevo si cambia la empresa transportista.
6. **¿Y si el mismo transportista manda un camión por la mañana y otro por la tarde?** Las cargas de la tarde llegan como pendientes y reciben su propia matrícula, sin tocar las de la mañana.
7. **¿Qué pasa si importo el mismo informe dos veces?** No se duplica nada. Una matrícula ya puesta no se pisa y un DeCA emitido no cambia.
8. **¿Quién de mi empresa puede usarlo?** Quien invites. Cada persona entra con su usuario y todo lo que hace queda registrado con su nombre.
9. **¿Dónde están mis datos?** En servidores de la Unión Europea, con copias de seguridad cifradas diarias. Cada empresa ve solo lo suyo.
10. **¿Hay que instalar algo?** No. Funciona en el navegador.
11. **¿Cuánto cuesta?** Depende de tu volumen de cargas. Te lo damos en la demostración. El primer mes es gratis.
12. **¿Qué pasa al terminar el mes gratis?** Decides tú. Si no sigues, no pagas nada.

### 14. Cierre y pie (`FinalCta.astro`, `Footer.astro`)
- **Cierre, titular:** Tu próxima hora punta, con todos los DeCA listos.
- **Cierre, texto:** Primer mes gratis, con tus cargas reales y sin dejar lo que usas hoy.
- **Cierre, botón:** Pedir demostración → `#demo`
- **Pie, lema:** DECA Light · El DeCA de cada camión, en segundos.
- **Pie, contacto:** contacto@decalight.es · Almería
- **Pie, sin:** «Proyecto en desarrollo», «Programa piloto», ni la mención a Hispatec y TransFollow.

### 15. Legal (BLOQUEANTE antes de atraer visitas)
- **Aviso legal:** quitar el banner «BORRADOR» y poner los datos del titular, que da Juan Alberto:
  - nombre y apellidos o razón social;
  - NIF;
  - domicilio;
  - correo.
- **Privacidad:** añadir el teléfono, las cargas al día y el ERP a los datos tratados, con la misma finalidad: atender la solicitud de demostración.
- **Decidido el 18-nov:** los datos del titular se ponen después del alta de autónomo. Hasta entonces, el aviso legal no se toca. La web nueva puede publicarse, pero no conviene llevar visitas desde las redes con la oferta.

### 16. Datos de la página y medición
- **Título:** DECA Light · Todos tus DeCA del día, sin ir albarán por albarán
- **Descripción:** Emite en bloque el DeCA de tus expediciones hortofrutícolas: importas albaranes o cartas de porte, pones una matrícula por camión y emites con QR. Primer mes gratis.
- **Favicon y logotipo:** archivos de `C:\Users\juani\PROYECTOS\DECA LIGHT MARKETING\marca\`.
- **Imagen para compartir (og-image):** nueva, de 1200×630, con el logotipo y el titular. La hace Claude.
- **Datos estructurados:** JSON-LD `SoftwareApplication` (nombre, categoría BusinessApplication, oferta «Primer mes gratis»), sin valoraciones.
- **Medición:** Cloudflare Web Analytics, sin cookies. Medir los envíos del formulario.

### 17. Estética: se respetan los colores de la web (decidido el 18-nov, 23:07)
- **Colores:** los de `tokens.css`, sin cambios. Página clara entera, sin franjas oscuras. El verde de la marca, #047857, es el mismo de las redes y de la app.
- **Tipografía:** Inter, la del logotipo, alojada en la propia web (`public/fonts/`, sin Google Fonts, sin cookies). Es el único cambio de estilo.
- **Imágenes de producto:** las tres de «Cómo funciona» (`public/img/paso-1.webp`, `paso-2.webp`, `paso-3.webp`), en versión clara con los colores de la web. Llevan las mismas piezas que los carruseles: ventana, estados, matrícula y botones.
- **Estados con los colores de la app:**
  - ámbar: Falta matrícula;
  - verde: Lista para emitir;
  - rojo: Revisión;
  - azul: DeCA emitido.
- **El vídeo de la portada,** que es oscuro, va dentro de un marco de ventana con esquinas de 16 px y sombra suave, como una pantalla sobre la página clara.
- **Las redes** siguen en oscuro. Es lo habitual: la web en claro y las redes con su propio estilo, unidas por el logotipo, el verde y la letra.
- **Más adelante:** las capturas reales de la app, en su **tema claro**, para que encajen con la web.

---

## PARTE 2 · Orden para el agente

> **Corregido a las 22:55:** el trabajo más reciente no está en `main` (17-oct), sino en la rama
> `feat/web-mejoras` (`1d6db82`, 26-oct), que ya incluye `feat/web-lanzamiento`: textos de lanzamiento,
> `tokens.css` con el verde #047857 unificado, la página `/guia-deca`, el sitemap, los avisos legales
> revisados y los componentes divididos en partes. Se trabaja sobre esa rama.

```
Repositorio: C:\Users\juani\PROYECTOS\DECA LIGHT WEB (Astro + TypeScript estricto,
Cloudflare Pages + Functions + D1).

0. Antes de nada: dime qué rama publica Cloudflare Pages en producción para
   www.decalight.es (proyecto de Pages y rama de producción). No muestres tokens.
   Si necesitas credenciales que no tienes, dímelo y sigue con el resto.

Rama nueva: web/v2-comercial desde origin/feat/web-mejoras (1d6db82).
No toques main ni feat/web-mejoras. Lleva a la rama nueva docs/web-textos-nuevos-2026-11-18.md
y public/video/ (ya copiados, sin rastrear).

Fuente de los textos: docs/web-textos-nuevos-2026-11-18.md, PARTE 1.
Copia los textos LITERALMENTE. No añadas frases, cifras ni funciones que no estén ahí.
Omite todo lo marcado como [cuando esté en producción].
Respeta DESIGN_SYSTEM.md, COMPONENT_LIBRARY.md, MOTION_GUIDELINES.md y src/styles/tokens.css.

1. Orden de index.astro: Hero, franja de contexto, Problem, HowItWorks, Comparison,
   RealLife, Includes, Trust, franja de transportistas, Pilot (id="demo"),
   Faq (id="preguntas"), FinalCta.
   Anclas: #como-funciona, #que-incluye, #normativa, #preguntas, #demo.
   Retira BenefitsStrip de index.astro (no borres el archivo).
2. Textos en los componentes que ya existen: HeroContenido, ProblemEditorial,
   ProblemFricciones, ProblemBanner, HowItWorksIntro, HowItWorksPaso1-4 (el paso 4 sobra:
   son 3 pasos), HowItWorksBeneficios, PilotIntroEditorial, PilotProfile, PilotSteps,
   PilotCta, FaqEditorial, FaqAcordeon, FinalCta, Header y Footer.
3. Componentes nuevos: Comparison (<table> con <th scope>), RealLife, Includes, Trust.
   En Trust añade el enlace «Lee la guía del DeCA» a /guia-deca.
4. Sin ilustraciones inventadas: quita las maquetas con datos de ejemplo («Naranjas»,
   «Tráiler», «CMR», «EXP-2026-1047», «ALB-2026-1047», «TR-2026-1047») de HeroDiagrama,
   ProblemFricciones, HowItWorksPaso1-4, PilotIntroVisual y FaqEditorial.
   Usa iconos sencillos o huecos marcados para capturas reales.
5. Hero: sustituye HeroDiagrama por <video autoplay muted loop playsinline
   preload="metadata" poster="/video/demo-poster.jpg"> con /video/demo.mp4.
   Con prefers-reduced-motion: solo el póster.
6. Marca: logotipo nuevo en Header y Footer, favicon.svg y apple-touch-icon desde
   C:\Users\juani\PROYECTOS\DECA LIGHT MARKETING\marca\ (deca-light-logo-claro.svg,
   deca-light-favicon.svg, deca-light-simbolo-512.png). No cambies los colores de tokens.css.
7. Formulario (PilotCta o donde esté + functions/api/pilot.ts + migración D1 nueva):
   añade phone (opcional, máx. 30), daily_loads (opcional: "<20","20-50","50-100",">100")
   y erp (opcional, máx. 60). Valídalos en el servidor como los actuales. No toques
   _gotcha, la idempotencia ni los límites. Prueba nueva en test/ para los tres campos.
8. Footer: textos del apartado 14 (mantén el enlace a la Guía del DeCA).
9. politica-privacidad.astro: añade teléfono, cargas al día y ERP a los datos tratados.
   aviso-legal.astro: NO lo toques (faltan los datos del titular; los dará el usuario).
10. Layout.astro: título, descripción y JSON-LD del apartado 16. Actualiza sitemap.xml
    si cambia alguna ruta. Cloudflare Web Analytics solo si ya está configurado; si no,
    déjalo anotado en el informe.
11. Estética (apartado 17 de la Parte 1). NO cambies los colores de tokens.css ni pongas
    secciones oscuras: la web sigue clara entera.
    - Inter alojada en la web: @font-face con public/fonts/inter-latin-{400,500,600,700}-normal.woff2
      (ya copiados), font-display: swap, precarga de 400 y 700; --font-sans: "Inter", y detrás la
      pila actual.
    - Si faltan, añade a tokens.css los colores de los estados: Falta matrícula (#92400E sobre
      #FEF3C7), Lista para emitir (#047857 sobre #ECFDF5), Revisión (#B91C1C sobre #FEE2E2) y
      DeCA emitido (#1D4ED8 sobre #DBEAFE).
    - Vídeo de la portada dentro de un marco de ventana: radio 16 px, borde --color-border-subtle
      y sombra suave.
    - «Cómo funciona»: usa public/img/paso-1.webp, paso-2.webp y paso-3.webp (ya copiados, 1920×1440)
      con width/height, loading="lazy". Alt:
        1 «Pantalla Día: 40 cargas importadas, agrupadas por transportista y con su estado»
        2 «Asignar camión a las pendientes: una tractora y un remolque para 4 cargas»
        3 «4 DeCA emitidos en PDF con QR y botón Enviar al transportista»

Prohibido: «homologado», «certificado», «cumple», «cumple eFTI», nombres de
competidores, precios, nombres de clientes reales, matrículas reales, CMR, CSV,
«entrada manual».

Comprobaciones antes de entregar:
- npm run build sin errores ni avisos de TypeScript; pruebas de test/ en verde.
- grep en src/components y src/pages/index.astro de: CMR, CSV, Naranjas, Tráiler,
  EXP-2026, TransFollow, Hispatec, «en desarrollo», homologad, certificad, cumple
  → sin resultados.
- Capturas a 1280 y 375 px de cada sección, en logs/ (fuera de git).
- Lighthouse móvil: accesibilidad ≥ 95, rendimiento ≥ 90, SEO ≥ 95.
- Push de la rama y URL de la vista previa de Cloudflare Pages en el informe.

Entrega: informe con archivos tocados, resultados reales de build, pruebas, grep y
Lighthouse, URL de la vista previa y ruta de las capturas.
No fusiones ninguna rama ni despliegues a producción.
```

---

## PARTE 3 · Siguiente nivel (después de esta versión)
1. **Capturas y vídeo reales** de la app, con una empresa de prueba y datos inventados: grabación de 2 minutos de la pantalla «Día».
2. **Cifras del piloto** en la portada en cuanto las haya: minutos por día frente al sistema anterior.
3. **Página de Ayuda** con la Guía de DECA Light para almacenes.
4. **Precio público** cuando lo decidas.
