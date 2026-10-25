> **Documento histórico.** Describe el estado de la web antes del lanzamiento. Superado por la decisión de lanzamiento del 25-oct-2026 (ver `WEB_MAESTRO_DECA_LIGHT.md` §0). No usar como especificación actual.

DECA Light — Auditoría Final Integral y Plan de Cierre de la Web

1\. Resumen ejecutivo



El equipo senior de auditoría técnica, diseño y producto SaaS ha completado una inspección exhaustiva sobre el repositorio local DECA-LIGHT-WEB en su rama activa feat/ui-redesign-v2.



La landing page presenta una calidad visual y de maquetación sobresaliente, con una traslación de alta fidelidad de las referencias de diseño aprobadas, disciplina cromática acorde a la realidad del sector hortofrutícola y un sistema de Motion Design refinado, sobrio y no invasivo. La compilación estática con Astro v7.3.8 es limpia (tiempo de compilación: 439 ms, 0 errores, 0 advertencias), la consola del navegador arroja 0 errores en tiempo de ejecución y se ha verificado empíricamente la ausencia total de desbordamiento horizontal (hasHScroll: false) en todos los anchos de pantalla evaluados (desde 320 px hasta 1.536 px).



Sin embargo, desde el prisma de lanzamiento y captación comercial B2B, la web se encuentra actualmente en un estado de simulación funcional incompleta en sus puntos críticos de conversión y solvencia legal:



Bloqueo absoluto de captación de leads: El formulario del programa piloto (Pilot.astro) intercepta el envío con e.preventDefault(), no realiza peticiones HTTP/POST a ningún servicio, resetea los campos y muestra un mensaje de éxito ficticio. Toda solicitud real de un responsable de almacén se pierde irremediablemente en el cliente.

Inseguridad jurídica y privacidad: Se solicitan datos corporativos y de contacto sin casilla de aceptación expresa de política de privacidad (obligatoria por RGPD / LOPD-GDD) y todos los enlaces legales del pie de página (Aviso legal, Política de privacidad, Política de cookies) apuntan a #piloto en bucle.

Ausencia de canal de contacto alternativo: No existe dirección de correo electrónico corporativa visible ni enlace funcional mailto:, por lo que el almacén interesado no dispone de ninguna vía real de contacto si el formulario no está operativo.

Resiliencia No-JS deficiente en FAQ: En entornos sin JavaScript, 7 de las 8 preguntas frecuentes quedan permanentemente ocultas con altura 0 px.



Veredicto del equipo: PREPARADA TRAS CORREGIR BLOQUEANTES CONCRETOS.



2\. Estado de Git y cambios locales

Parámetro	Estado verificado	Evidencia técnica

Rama actual	feat/ui-redesign-v2	## feat/ui-redesign-v2...origin/feat/ui-redesign-v2

Sincronización remota	Al día con el origen (up to date)	origin: https://github.com/johannmartlo/DECA-LIGHT-WEB

Árbol de trabajo (working tree)	Completamente limpio	git status --short = vacío

Comprobación de diffs (git diff --check)	Sin conflictos ni espacios residuales	Salida con código de salida 0

Archivos sin rastrear (untracked)	Ninguno en el repositorio	Los artefactos temporales de prueba se aislaron en scratch/

Último commit local	0a56ccd	feat(web): complete DECA Light landing integration and motion design

3\. Mapa de componentes y funcionalidades verificadas



A continuación se detalla el inventario de las 9 secciones reales implementadas y el estado operativo comprobado de sus elementos:



Sección / Archivo	Componente / Submódulos	Clasificación Funcional	Hallazgo / Estado Operativo

01\. Header

Header.astro	• Brand link (/)

• Menú navegación 4 enlaces

• Botón móvil (hamburguesa)

• Botón CTA de cabecera	Funcional y verificado	Sticky nav funcional, enlaces ancla resueltos. Menú móvil accesible con aria-expanded y tecla Escape. Falta el StatusBadge ("En desarrollo") documentado en el Maestro. El botón dice "Contactar" en vez del lema de piloto.

02\. Hero

Hero.astro	• H1 editorial y kicker

• CTA primario y secundario

• Diagrama convergente SVG (CMP-01)	Funcional y verificado	Animaciones de flujo de líneas SVG y flotación coordinadas. Enlaces dirigen a #piloto y #como-funciona. Contiene 3 etiquetas <h2> dentro del diagrama que fragmentan la jerarquía semántica.

03\. Problema

Problem.astro	• Columna editorial

• 3 Tarjetas de fricción (Albarán, Palé isométrico, Camión)

• Callout final	Funcional y verificado	Ancla id="el-problema". Estructura editorial en 2 columnas, palé isométrico SVG y mini-albarán de tomates. Escalonado de entrada suave y correcto.

04\. Cómo funciona

HowItWorks.astro	• Intro editorial

• Grid de 4 pasos con blueprints (CMP-02, CMP-04, CMP-07)	Funcional y verificado	Ancla id="como-funciona". Implementa 4 pasos (según diseño aprobado 03-como-funciona.png) frente a las 3 macrofases descritas originalmente en el texto del documento maestro.

05\. Programa piloto

Pilot.astro	• Bloque de confianza y canvas

• Formulario #pilot-interest-form

• Metodología 3 pasos

• Bloques de encaje	Solo visual / Bloqueante	Anclas id="piloto" y #programa-piloto. El formulario no envía datos (e.preventDefault() -> form.reset()). No almacena ni remite los datos. Falta casilla RGPD y campos de contacto personal.

06\. FAQ

Faq.astro	• Mockup editorial izquierdo

• Acordeón de 8 preguntas	Parcialmente funcional	Anclas id="faq" y #preguntas-frecuentes. Con JS activo: acordeón accesible, cierre exclusivo y teclado correctos. Sin JS: preguntas 2 a 8 inaccesibles (altura 0 px).

07\. CTA Final

FinalCta.astro	• Card centrado

• Botón "Conocer el programa piloto"	Funcional y verificado	Enlace dirigido a #piloto. Transición e iluminación sutil verificadas.

08\. Franja beneficios

BenefitsStrip.astro	• Grid de 4 tarjetas de beneficios con iconos	Funcional y verificado	Hover sutil con elevación de 4 px y cambio de tono en contenedor de icono. Responsive en 1 col (móvil), 2 col (tablet) y 4 col (desktop).

09\. Footer

Footer.astro	• Columna marca + badge

• Columna producto

• Columna legal

• Columna contacto y redes	Pendiente de configuración	Enlaces legales apuntan a #piloto. Iconos sociales apuntan a #piloto (no hay correo corporativo ni LinkedIn real). Botones sociales miden 36×36 px (inferior a 44 px). Falta disclaimer de marcas de terceros.

4\. Resultados de pruebas técnicas

4.1 Compilación de producción (npm run build)

Herramienta: Astro v7.3.8 compilando estáticamente para producción.

Resultado: ÉXITO TOTAL (0 errores, 0 warnings).

Duración: 439 ms.

Salida: dist/index.html (66,9 kB), activos CSS y JS empaquetados e inmutables sin dependencias externas.

4.2 Verificación de tipos TypeScript

Configuración: tsconfig.json extiende astro/tsconfigs/strict.

Auditoría: Los scripts incrustados de TypeScript en Header.astro, Pilot.astro y Faq.astro compilan estrictamente durante el build. No obstante, @astrojs/check no está añadido en package.json, por lo que el script npm run check no está disponible de forma nativa como script independiente.

4.3 Errores de consola y red en tiempo de ejecución

Navegador de pruebas: Google Chrome Headless v155.0.8059.41 conectado mediante Chrome DevTools Protocol (CDP).

Mensajes de consola (Console errors / warnings): 0

Errores de red (HTTP 4xx / 5xx): 0

5\. Auditoría visual y responsive



Pruebas reales ejecutadas en navegador headless a través de emulación de métricas de dispositivo:



Dispositivo / Viewport	Scroll Horizontal	Estado visual verificado en navegador

1536 × 1024 (Escritorio grande)	NO (doc: 1521px)	Márgenes equilibrados (max-width: 1340px), retícula amplia, tipografía con ritmo de lectura confortable.

1440 × 900 (Portátil estándar)	NO (doc: 1425px)	Proporción idónea de 5fr/7fr en Hero y Problem. El diagrama SVG y los abanicos documentales encajan con holgura.

1024 × 768 (Tableta apaisada)	NO (doc: 1009px)	Beneficios pasan a 4 columnas compactas, acordeón FAQ se mantiene a 2 columnas. Sin solapamientos de textos.

768 × 1024 (Tableta vertical)	NO (doc: 753px)	Activación de menú de navegación móvil. Hero reordena el diagrama bajo el titular. Beneficios pasan a grid 2×2.

390 × 844 (iPhone moderno)	NO (doc: 390px)	Diagrama SVG del Hero conmuta fluidamente a disposición vertical. Formularios, tarjetas y botones aprovechan el ancho.

375 × 812 (Dispositivo móvil base)	NO (doc: 375px)	Lectura sin saltos ni desbordamientos. Tipografía responsiva ajustada a 1rem en cuerpo y 1.625rem en títulos.

320 × 568 (Móvil ultra-estrecho)	NO (doc: 320px)	Sin pérdida de cajas ni solapamiento de badges. Botones de ancho completo con padding interno de 16 px.

6\. Auditoría de Motion Design



Se comprobó el comportamiento del ciclo de vida del script de revelado y transiciones:



Garantía No-JS y estado inicial:

Al cargar la página sin JavaScript, html no recibe la clase .reveal-ready. Los estilos globales aplican la regla de seguridad:

css

html:not(.reveal-ready) \[data-reveal] { opacity: 1 !important; transform: none !important; }

Resultado comprobado: Los 26 elementos marcados con data-reveal son 100% visibles de inmediato. Ningún contenido queda oculto ni bloqueado.

Ciclo de IntersectionObserver y .is-revealed:

Con JavaScript activo, se inyecta html.reveal-ready. Inicialmente los elementos fuera de pantalla tienen opacity: 0 y transform: translateY(18px). Al hacer scroll hasta el pie de página, los 26 elementos (100%) reciben .is-revealed y se des-observan (unobserve) inmediatamente para no consumir ciclos de CPU.

Escalonado (Staggering):

Verificado retraso de transición escalonado en desktop (80ms, 160ms, 240ms, 320ms) en las tarjetas de Problem.astro, HowItWorks.astro y BenefitsStrip.astro. En móvil (<768px), el retraso se anula para respuesta instantánea.

Modo movimiento reducido (prefers-reduced-motion: reduce):

Comprobado mediante emulación CDP: el script omite la inserción de reveal-ready, las traslaciones espaciales se cancelan (transform: none !important), las animaciones infinitas de pulso y flotación se desactivan, y todos los estados operativos (badges ámbar, checks verdes) permanecen visibles y estáticos.

7\. SEO, accesibilidad, seguridad y privacidad

7.1 SEO

Titular y Meta Description: Correctamente configurados en Layout.astro con texto prudente y descriptivo.

Etiqueta canónica (canonical): Ausente. No existe <link rel="canonical">.

Open Graph / Twitter Cards: Ausentes. No hay etiquetas og:title, og:image, og:description ni twitter:card.

Sitemap y robots.txt: Ausentes. No existen en public/ ni mediante integración de Astro.

Configuración de dominio de producción: astro.config.mjs no tiene configurada la propiedad site: 'https://...'.

7.2 Accesibilidad (WCAG 2.1 AA)

Navegación por teclado y foco visible: Anillo de foco :focus-visible azul cielo (#0284C7) verificado con contraste 4,8:1 sobre canvas. Enlace de salto inicial (.skip-link) funcional.

Jerarquía de encabezados: Se detectaron 55 encabezados en total. Existe una discrepancia semántica en el Hero: las tarjetas internas del diagrama visual están marcadas con <h2> (Datos del almacén, Datos del transporte, Documentación preparada), compitiendo al mismo nivel semántico que los títulos de sección principales.

Áreas táctiles en móvil: Todos los botones y enlaces principales superan 44×44 px. Excepción: Los botones de redes sociales del pie de página miden 36×36 px (Footer.astro#L295).

Accesibilidad del acordeón FAQ sin JS: Como se demostró empíricamente, las preguntas 2 a 8 no son legibles si el usuario tiene JavaScript deshabilitado.

7.3 Seguridad y privacidad

Secretos expuestos: Ninguno. Sin claves API ni variables de entorno filtradas.

Dependencias y scripts externos: 0 scripts CDN, 0 rastreadores externos.

Tratamiento de datos personales (RGPD / LOPD-GDD): El formulario de interés solicita correo electrónico y nombre de empresa pero carece de casilla de consentimiento explícito no premarcada y de enlace a una política de privacidad real.

8\. Estado comercial y captación de leads

Aspecto Comercial	Estado Actual	Diagnóstico de Captación

Canal de captación web (Formulario Piloto)	Desconectado	Al pulsar el botón de envío, el formulario se reinicia y no guarda ni envía la información.

Canal de contacto directo alternativo	Inexistente	El enlace de contacto del footer conduce a #piloto. No hay correo corporativo visible.

Textos legales obligatorios (LSSI / RGPD)	Pendientes	Los enlaces a Aviso Legal y Privacidad apuntan a #piloto a modo de marcador de posición.

Descargo de marcas de terceros	Pendiente	Falta la mención explícita a la titularidad de marcas citadas (ej. Hispatec).

Veracidad y honestidad de la copia	Excelente	0 promesas de "automatización total", 0 falsas afirmaciones de integración cerrada.

9\. Tabla de hallazgos (P0–P3)

ID	Severidad	Archivo / Componente	Evidencia Concreta	Impacto Real	Corrección Mínima Recomendada	¿Bloquea?

H-01	P1	src/components/Pilot.astro#L623-L641	Script con e.preventDefault(), form.reset(), 0 llamadas fetch o POST. Red de pruebas captura POST requests: \[].	El usuario cree haber solicitado participar, pero la empresa nunca recibe la petición. Pérdida del 100% de los leads.	Conectar a servicio de formulario real (ej. Formspree / endpoint API / webhook) o fallback directo a mailto: con asunto preconfigurado.	SÍ

H-02	P1	src/components/Pilot.astro#L303-L339	Formulario carece de casilla de aceptación de política de privacidad y de información básica del tratamiento de datos (RGPD art. 13).	Infracción de normativa de protección de datos al recopilar emails corporativos sin base informada.	Añadir casilla obligatoria de consentimiento con enlace a la política de privacidad.	SÍ

H-03	P1	src/components/Footer.astro#L41-L54	Enlaces Aviso legal, Política de privacidad y Política de cookies tienen href="#piloto".	Falta de textos legales preceptivos para una entidad comercial según la LSSI-CE y el RGPD.	Crear las páginas estáticas correspondientes o desplegar un modal informativo accesible con la información legal básica.	SÍ

H-04	P1	src/components/Footer.astro#L62-L95	Enlaces de contacto y correo tienen href="#piloto". No existe correo visible ni mailto:.	Si el formulario falla o el usuario prefiere contactar directamente, no dispone de ningún canal alternativo.	Indicar la dirección de correo corporativa oficial (ej. contacto@... o enlace mailto: directo).	SÍ

H-05	P2	src/components/Faq.astro#L1229-L1250	.accordion-content con grid-template-rows: 0fr en elementos con data-open="false". Prueba No-JS: preguntas 2–8 con altura 0 px.	Usuarios con bloqueadores de scripts o navegadores restringidos no pueden leer las respuestas de las FAQs.	Añadir regla CSS html:not(.reveal-ready) .accordion-content { grid-template-rows: 1fr !important; } o utilizar elemento nativo <details>/<summary>.	NO

H-06	P2	src/components/Hero.astro#L53-L244	Tres etiquetas <h2> dentro del contenedor visual .hero-diagram.	Ruptura de jerarquía semántica en lectores de pantalla: confunde tarjetas de un diagrama con secciones primarias.	Cambiar las etiquetas <h2> del interior del diagrama a <h3> o <div> estilizados.	NO

H-07	P2	src/layouts/Layout.astro#L20-L29	Ausencia de <link rel="canonical">, Open Graph (og:\*), Twitter Cards y public/robots.txt.	Enlaces compartidos en WhatsApp, LinkedIn o Slack no muestran vista previa ni imagen del producto.	Añadir etiquetas meta Open Graph, canonical y generar un robots.txt básico.	NO

H-08	P2	src/components/Footer.astro#L99-L108	Omisión del descargo preceptivo sobre marcas de terceros contemplado en el Documento Maestro (sección 4.7).	Riesgo legal o malentendido sobre relaciones comerciales con marcas registradas mencionadas.	Añadir en el footer la nota aclaratoria: "Las marcas mencionadas pertenecen a sus respectivos titulares y se citan exclusivamente con fines de compatibilidad operativa."	NO

H-09	P3	src/components/Footer.astro#L295-L300	.footer-social-btn configurado con width: 36px; height: 36px;.	No alcanza el tamaño táctil objetivo recomendado de 44×44 px (WCAG 2.5.5).	Incrementar padding o dimensiones a mínimo 44×44 px.	NO

H-10	P3	src/components/Header.astro#L42 y Hero.astro#L14-L27	El botón dice "Contactar" y el titular H1 dice "Coordina la documentación..." en lugar del lema aprobado en el documento maestro ("La gestión documental de tus expediciones, más sencilla").	Discrepancia editorial menor entre el Documento Maestro y el código fuente.	Alinear los copies al Documento Maestro o ratificar la versión actual del código como versión definitiva.	NO

10\. Lista de tareas imprescindibles (Grupo 1 — Antes de publicar)

Recepción real de leads del formulario: Configurar un destino real para el formulario #pilot-interest-form (mediante servicio de formularios tipo Formspree / Cloudflare / webhook o mailto: directo de respaldo) para que ninguna solicitud se extravíe.

Cumplimiento legal y RGPD en el formulario: Añadir la casilla de aceptación obligatoria de política de privacidad con cláusula informativa de primera capa.

Páginas o modales de textos legales: Redactar e incorporar los textos mínimos de Aviso Legal, Política de Privacidad y Cookies enlazados correctamente desde el pie de página.

Canal de contacto directo visible: Sustituir los enlaces ficticios a #piloto en la columna de contacto del footer por un correo corporativo verificado y operativo.

11\. Lista de mejoras recomendadas (Grupo 2 — Para el lanzamiento)

Resiliencia No-JS en acordeón FAQ: Añadir regla en global.css para que, en ausencia de JavaScript, todas las preguntas frecuentes aparezcan desplegadas por defecto.

Corrección de jerarquía semántica en Hero: Reemplazar los tres <h2> dentro del diagrama por etiquetas <h3> o <div> con rol presentacional.

Metadatos Open Graph, Twitter Card y robots.txt: Incorporar imagen representativa de previsualización (1200×630 px) y etiquetas sociales en el <head>.

Descargo de marcas registradas: Incluir en el pie de página la cláusula de titularidad de terceros exigida en el Documento Maestro.

Ajuste de áreas táctiles en footer: Elevar los botones sociales a 44×44 px.

12\. Plan de cierre en orden de ejecución

Fase 1 (Inmediata tras autorización): Corregir los 4 bloqueantes de captación y legalidad (H-01 a H-04).

Fase 2 (Inmediata tras Fase 1): Aplicar las mejoras técnicas de accesibilidad y SEO (H-05 a H-08).

Fase 3 (Validación de cierre): Ejecutar nueva batería de pruebas en navegador con CDP para comprobar la transmisión del formulario, la jerarquía de encabezados y el build final.

13\. Veredicto final

PREPARADA TRAS CORREGIR BLOQUEANTES CONCRETOS



Justificación:

La base visual, de maquetación, rendimiento estático y animación cumple con creces los estándares profesionales de un SaaS B2B moderno. No se requiere ningún rediseño estético ni reestructuración de la página. El bloqueo para su salida al mercado es de naturaleza estrictamente funcional y comercial: actualmente la web carece de un canal para recibir solicitudes reales de clientes y adolece de las salvaguardas legales exigidas por la normativa europea de protección de datos (RGPD). Una vez resueltos estos puntos específicos (estimados en una intervención técnica breve y localizada), la web estará plenamente lista para su publicación comercial.



Fin del informe de auditoría. En cumplimiento de las instrucciones de la misión, no se ha modificado ningún archivo del proyecto. A la espera de tu revisión y autorización para proceder.

