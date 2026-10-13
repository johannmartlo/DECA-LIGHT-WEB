# DECA Light — Documento maestro de la web

**Versión:** 0.1  
**Fecha:** 13 de octubre de 2026  
**Estado:** Borrador de referencia comercial y de diseño  
**Uso:** Fuente de verdad para diseñar y construir la web pública de DECA Light  
**Importante:** Este documento no autoriza cambios en el código de la aplicación SaaS ni implica que las funcionalidades descritas como objetivo estén ya disponibles.

---

## 1. Propósito del documento

Centralizar en un único documento las decisiones comerciales, el posicionamiento, el contenido y las restricciones de la web de DECA Light.

Este archivo guía el trabajo de diseño y construcción de la web pública. No sustituye la arquitectura técnica de la aplicación ni debe utilizarse para modificar el producto SaaS sin instrucciones específicas.

### Reglas de trabajo

1. No modificar el código de la aplicación SaaS.
2. No desplegar la web ni publicar contenidos sin aprobación expresa.
3. No presentar como disponibles funcionalidades que no hayan sido verificadas en la aplicación.
4. Diferenciar siempre hechos conocidos, hipótesis por validar y funcionalidades futuras.
5. No inventar clientes, testimonios, métricas, integraciones, precios, plazos de lanzamiento ni resultados.
6. Mantener una identidad visual premium, sobria, moderna y accesible.
7. Si una decisión comercial o técnica no está confirmada, señalarla como pendiente en vez de resolverla por suposición.

---

## 2. Producto y posicionamiento

### 2.1 Qué es DECA Light

DECA Light es un proyecto SaaS B2B orientado a almacenes hortofrutícolas y empresas comercializadoras que necesitan coordinar la documentación de sus expediciones y preparar el DECA a partir de la información disponible, incluso cuando los datos del vehículo llegan más tarde.

La propuesta es actuar como una **capa de coordinación documental sobre el ERP**, no como sustituto de Hispatec ni como un ERP nuevo.

### 2.2 Posicionamiento principal

**Coordinación documental de expediciones para almacenes hortofrutícolas.**

La propuesta no debe reducirse a «generar un PDF». El problema que se quiere resolver es la coordinación entre la documentación de expedición que prepara el almacén y los datos del transporte que comunica posteriormente el transportista.

### 2.3 Lema aprobado provisionalmente

> La gestión documental de tus expediciones, más sencilla.

Mantener esta frase como lema principal salvo decisión comercial posterior.

### 2.4 Texto base para el hero

> DECA Light está en desarrollo para ayudar a los almacenes hortofrutícolas a organizar la información de sus expediciones y simplificar las tareas administrativas relacionadas con su documentación.

Este texto debe dejar claro el estado de desarrollo. No sustituirlo por promesas de ahorro, eliminación de errores o automatización total sin evidencia verificable.

### 2.5 Público objetivo inicial

- Almacenes hortofrutícolas.
- Empresas comercializadoras de frutas y hortalizas.
- Personal administrativo que prepara la documentación de las expediciones.
- Responsables de administración, logística u operaciones.
- Empresas que trabajan con Hispatec u otros procedimientos documentales, sin presuponer que exista integración técnica disponible.

### 2.6 Problema central

El proceso habitual descrito es:

1. El departamento comercial recibe o emite el pedido.
2. El almacén prepara y pesa la mercancía.
3. Se generan el albarán y la documentación de expedición en el sistema habitual, con Hispatec como referencia.
4. La matrícula y otros datos del transporte pueden llegar más tarde por parte de la empresa transportista.
5. La preparación del DECA queda pendiente hasta disponer de la información necesaria para continuar el flujo habitual.
6. El personal administrativo debe asociar la información recibida con la expedición correcta y completar el procedimiento.

Esto crea una dependencia temporal entre el trabajo del almacén y la recepción de datos externos. Puede concentrar trabajo al final de la jornada y requerir búsquedas entre documentos, albaranes y comunicaciones.

**Distinción importante:** la espera de la matrícula está descrita por el usuario como un problema operativo real. La frecuencia, duración media y coste administrativo exactos todavía deben medirse.

---

## 3. Hechos, hipótesis y funciones futuras

### 3.1 Hechos comunicados sobre la operativa

- El departamento comercial emite los pedidos.
- El personal administrativo prepara la documentación.
- Los datos del transporte, incluidas las matrículas, llegan después y por varios canales.
- Las matrículas pueden recibirse individualmente o en grupos.
- Se asocian a la documentación mediante el número de albarán o pedido.
- El bloqueo descrito afecta principalmente a la preparación del DECA; el resto de la documentación de expedición suele estar preparado.
- El volumen conjunto estimado en las dos empresas de referencia es de 31–60 expediciones diarias. Esta cifra es una estimación inicial, no una métrica auditada.
- Según la información disponible, Hispatec tiene conectado el DECA con la documentación de expedición. El comportamiento técnico exacto debe confirmarse.

### 3.2 Hipótesis que deben validarse

- Que preparar anticipadamente la información disponible puede reducir la acumulación de tareas.
- Que centralizar documentos y datos de transporte puede reducir búsquedas y cambios de contexto.
- Que la conciliación por número de albarán puede reducir asociaciones manuales erróneas.
- Que el volumen de trabajo y el beneficio potencial justifican una herramienta independiente.
- Que existe una vía técnica viable para completar el proceso sin duplicar datos ni romper el flujo de Hispatec.

No publicar estas hipótesis como resultados demostrados.

### 3.3 Capacidades objetivo descritas en la arquitectura

Las siguientes son capacidades previstas o definidas como objetivo. Su disponibilidad real debe comprobarse antes de anunciarlas como funcionalidades operativas:

- Importación documental de cartas de porte y CMR, individualmente o por lotes.
- Extracción de datos documentales.
- Conciliación de documentos mediante el número de albarán.
- Control de expediciones pendientes de matrícula.
- Identificación de datos ausentes, dudosos, duplicados o inconsistentes.
- Asignación de datos confirmados del transporte.
- Validación previa a la generación del DECA.
- Generación y consulta de documentos, con historial y control de versiones.
- Agrupación de expediciones por transportista cuando existan datos suficientes.

### 3.4 Integraciones

La integración directa con Hispatec mediante CSV, Excel o API es una posibilidad de evolución, no una capacidad confirmada. La vía de entrada definida inicialmente es la importación documental. No afirmar que existe una integración con Hispatec o TransFollow hasta que se haya verificado y autorizado su comunicación comercial.

### 3.5 Funciones fuera del objetivo inicial

DECA Light no debe presentarse como:

- Un ERP.
- Un sistema de gestión de almacén o existencias.
- Una plataforma de facturación o contabilidad.
- Un TMS completo de planificación de rutas y flotas.
- Un sistema que inventa datos o genera documentación sin las validaciones necesarias.
- Una garantía de cumplimiento legal por el mero hecho de generar un documento.

---

## 4. Propuesta de valor

### Mensaje central

**Preparar antes lo que ya se conoce y mantener bajo control lo que depende de la información del transporte.**

La web puede explicar que el proyecto pretende ayudar a organizar la documentación disponible, identificar lo que falta y coordinar el trabajo pendiente hasta poder completar el DECA.

### Beneficios potenciales que deben formularse con prudencia

- Más visibilidad sobre las expediciones pendientes.
- Menos búsquedas manuales entre documentos y comunicaciones.
- Menos repetición de tareas cuando la información ya está disponible.
- Mayor control de referencias, datos incompletos y documentos duplicados.
- Un proceso más ordenado para el personal administrativo.

No afirmar que DECA Light ya consigue estos resultados ni cuantificarlos hasta que existan pruebas suficientes.

### Evitar estas promesas

No utilizar sin evidencia y aprobación:

- «Elimina los errores».
- «Acaba con los retrasos».
- «Generación instantánea».
- «Automatización completa».
- «Integración directa con Hispatec».
- «Ahorra X horas o X %».
- «Cumplimiento legal garantizado».
- «Sin interrumpir la salida de camiones».
- Garantías de disponibilidad, soporte inmediato o fechas de lanzamiento.

---

## 5. Objetivo comercial de la web

La web inicial no debe funcionar como una página de compra de un producto listo para producción.

Su objetivo es:

1. Explicar el problema que aborda DECA Light.
2. Presentar la propuesta de coordinación documental.
3. Dejar claro que el producto está en desarrollo.
4. Captar empresas interesadas en participar en entrevistas y en valorar un posible piloto futuro.
5. Ayudar a validar el problema, el flujo de trabajo y la disposición de las empresas a probar una solución.

### CTA principal

**Mostrar interés en el programa piloto**

Alternativa más corta para botones estrechos:

**Me interesa el piloto**

El CTA debe llevar a la sección del formulario identificada como `#piloto`. No implementar modal inicialmente.

No usar «Contratar», «Empezar ahora», «Probar gratis» o mensajes que sugieran acceso inmediato al software.

### Estado del programa piloto

Hipótesis comercial inicial, aún no contractual:

- Dos o tres empresas candidatas.
- Posible prueba operativa de un mes.
- Posible ausencia de coste de licencia durante la prueba para empresas seleccionadas.
- Acompañamiento acordado individualmente.
- Inicio operativo solo cuando la aplicación esté preparada y las validaciones técnicas y de seguridad hayan sido superadas.

La fase inmediata es de entrevistas y demostraciones conceptuales, sin acceso operativo ni tratamiento de documentación real sensible. No presentar las condiciones anteriores como oferta definitiva.

---

## 6. Estructura propuesta de la página

### 6.1 Cabecera

- Marca tipográfica DECA Light.
- Navegación breve: El problema, Cómo funciona, Programa piloto, Preguntas frecuentes.
- Indicador discreto de estado: «Proyecto en desarrollo».
- CTA: «Mostrar interés en el programa piloto» (versión corta: «Me interesa el piloto»).
- Cabecera adaptable a móvil, con navegación accesible.

Evitar una barra de navegación excesivamente larga.

### 6.2 Hero

**Etiqueta superior:**  
PROYECTO EN DESARROLLO · DOCUMENTACIÓN DE EXPEDICIONES

**H1:**  
La gestión documental de tus expediciones, más sencilla.

**Texto:**  
DECA Light está en desarrollo para ayudar a los almacenes hortofrutícolas a organizar la información de sus expediciones y simplificar las tareas administrativas relacionadas con su documentación.

**CTA:**  
Mostrar interés en el programa piloto

**Nota breve:**  
Estamos contrastando el proceso con profesionales del sector antes de abrir una prueba operativa.

El hero puede incorporar un diagrama conceptual de una expedición y sus documentos. Si se muestra una interfaz, debe identificarse claramente como conceptual; no fingir que es una captura real del producto.

### 6.3 Sección «El problema»

Explicar el desfase entre dos procesos:

- El almacén recibe pedidos, prepara cargas, pesa producto y genera albaranes y documentos de expedición.
- La empresa transportista confirma posteriormente el vehículo y comunica la matrícula.
- El DECA queda pendiente hasta disponer de la información necesaria.

Mensaje de cierre:

> El reto no es únicamente generar un documento. Es coordinar la información de la expedición con los datos del transporte que llegan después.

No presentar como medidos los tiempos de espera ni la frecuencia de incidencias.

### 6.4 Sección «Cómo debería funcionar»

Representar el flujo objetivo como una secuencia conceptual:

1. Preparar la documentación disponible.
2. Importar o reunir los documentos necesarios.
3. Relacionar la información con su albarán.
4. Identificar datos pendientes o dudosos.
5. Incorporar los datos confirmados del transporte.
6. Validar la información antes de completar el DECA.
7. Conservar el documento y su historial.

Incluir una nota: «Flujo objetivo en desarrollo; las funciones y vías de integración están sujetas a validación técnica».

### 6.5 Sección «Qué queremos simplificar»

Presentar como objetivos, no resultados garantizados:

- Saber qué expediciones siguen pendientes.
- Reducir la búsqueda manual de documentos.
- Identificar datos que faltan.
- Relacionar la documentación con su albarán.
- Evitar repetir información ya disponible.
- Mantener la revisión humana cuando los datos sean ambiguos.

### 6.6 Sección «Programa piloto»

Explicar que se está preparando una fase de validación con un número reducido de almacenes.

Texto recomendado:

> Estamos hablando con almacenes hortofrutícolas para conocer sus procesos documentales y definir una prueba acotada. En esta fase recogemos interés y validamos necesidades; el acceso operativo se valorará cuando el producto esté preparado.

No prometer gratuidad, duración, fechas, disponibilidad ni condiciones de soporte como definitivas.

### 6.7 Preguntas frecuentes

**¿DECA Light sustituye a Hispatec?**  
No es el objetivo. El proyecto está concebido como una capa de coordinación documental sobre el sistema de gestión habitual. Las vías de integración concretas están pendientes de validación.

**¿Está disponible para utilizarlo hoy?**  
DECA Light está en desarrollo. En esta fase se está validando el problema y la propuesta con profesionales del sector; no se ofrece todavía acceso operativo general.

**¿Qué documentos contempla?**  
La arquitectura de referencia contempla cartas de porte, CMR, albaranes y datos de transporte relacionados. Las capacidades de importación y tratamiento deben validarse antes de presentarlas como disponibles.

**¿Se integra con Hispatec?**  
No debe afirmarse una integración operativa confirmada. La compatibilidad y las posibles vías de intercambio están pendientes de análisis técnico.

**¿Cómo puedo participar?**  
Puedes mostrar tu interés mediante el formulario. El contacto servirá inicialmente para conocer tu proceso y valorar una posible participación futura; no supone compromiso de contratación.

**¿Cuánto cuesta el piloto?**  
Las condiciones todavía no están cerradas. Se definirán con las empresas seleccionadas antes de cualquier prueba operativa.

### 6.8 Formulario de interés `#piloto`

Mantenerlo corto para facilitar el envío.

Campos recomendados:

1. Nombre.
2. Correo electrónico de contacto.
3. Empresa o almacén.
4. Volumen aproximado de expediciones diarias: `1–5`, `6–15`, `Más de 15`, `No lo sé`.
5. Casilla de aceptación del aviso de privacidad, redactada y revisada antes de publicar.

No solicitar teléfono, matrícula, documentos de expedición ni otros datos sensibles en el primer contacto, salvo que exista una razón clara y se haya definido el tratamiento correspondiente.

No construir el envío del formulario hasta decidir y verificar el mecanismo de recepción, almacenamiento, seguridad y gestión de solicitudes. No simular un envío exitoso ni dejar el botón sin funcionalidad.

### 6.9 Pie de página

Incluir solo información real y confirmada:

- Identidad del responsable del sitio.
- Correo de contacto real, una vez configurado.
- Aviso legal.
- Política de privacidad.
- Política de cookies, si procede.
- Condiciones de uso, si procede.

No publicar direcciones de correo no creadas, horarios de atención inventados, datos empresariales no confirmados ni textos legales genéricos como si hubieran sido revisados por un profesional.

---

## 7. Identidad visual

> La especificación detallada de tokens CSS, contrastes matemáticos, anatomía de componentes y estados se encuentra normada en [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md). Este apartado resume los principios rectores.

### 7.1 Dirección de diseño

- SaaS B2B premium.
- Sobrio, claro, moderno y profesional.
- Inspiración general en webs SaaS de logística y documentación, sin copiar textos, diseños ni recursos de competidores.
- Evitar estética de plantilla genérica, exceso de tarjetas, gradientes decorativos o efectos innecesarios.
- La jerarquía visual debe explicar el proceso y transmitir confianza.

### 7.2 Paleta base aprobada provisionalmente

| Uso | Color |
|---|---|
| Fondo principal | `#F8FAFC` |
| Superficies y tarjetas | `#FFFFFF` |
| Texto principal | `#0F172A` |
| Texto secundario | `#475569` |
| Color de marca principal | `#047857` |
| Hover de marca | `#065F46` |
| Anillo de foco | `#0284C7` |
| Fondo de aviso ámbar | `#FEF3C7` |
| Texto sobre aviso ámbar | `#92400E` |

Usar el ámbar solo para avisos o estados de atención. No usar texto blanco sobre fondo ámbar.

Comprobar el contraste de todas las combinaciones reales antes de declarar conformidad con WCAG.

### 7.3 Tipografía

Recomendación: Inter, autoalojada en WOFF2, con licencia SIL Open Font License comprobada y solo los pesos necesarios (400, 500, 600, 700). Si no se incorpora la fuente, utilizar una pila de fuentes del sistema. No descargar ni añadir dependencias sin aprobación.

### 7.4 Imágenes, diagramas y movimiento

- Priorizar diagramas propios en SVG o CSS para explicar el proceso documental.
- Usar fotografías sectoriales solo si son relevantes, de calidad y con licencia o autorización adecuada.
- No inventar logotipos de clientes, testimonios ni capturas reales.
- Si se usan maquetas de interfaz, etiquetarlas como «Concepto visual» o «Propuesta en desarrollo».
- Animaciones discretas, con propósito informativo y sin perjudicar la lectura.
- Respetar `prefers-reduced-motion`.
- No incorporar vídeo automáticamente; solo si aporta información y no perjudica el rendimiento.

---

## 8. Requisitos técnicos y de calidad de la web

> Para la matriz de breakpoints, prevención de desbordamientos sin parches globales de `overflow-x: clip`, objetivos táctiles (>=44x44px) y pautas de accesibilidad e interacción, consultar la especificación técnica en [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).

### 8.1 Arquitectura

- Proyecto de web separado del repositorio de la aplicación SaaS.
- Astro con salida estática y TypeScript estricto, según la base actual del proyecto.
- JavaScript de cliente mínimo y justificado.
- No añadir dependencias por comodidad si la plataforma puede resolverlo de forma nativa.
- No cambiar versiones, configuración o dependencias sin explicar la razón y revisar el impacto.

### 8.2 Responsive

Probar como mínimo estas anchuras:

- 320 px
- 375 px
- 390 px
- 768 px
- 1024 px
- 1440 px

Requisitos:

- Sin desbordamiento horizontal no intencionado.
- Texto legible y jerarquía clara en móvil.
- Objetivos táctiles aproximadamente de 44 × 44 px cuando sea viable.
- Diagramas adaptables o con una alternativa legible en móvil.
- Formularios utilizables con teclado y lectores de pantalla.

No corregir desbordamientos aplicando `overflow-x: clip` global como parche sin encontrar la causa.

### 8.3 Accesibilidad

- Estructura semántica y encabezados en orden lógico.
- Navegación por teclado y foco visible.
- Etiquetas asociadas a todos los campos.
- Errores del formulario explicados de manera comprensible.
- Contraste comprobado.
- Texto alternativo útil para imágenes informativas.
- Controles accesibles y estado comprensible sin depender solo del color.
- Respeto a la preferencia de movimiento reducido.

No afirmar cumplimiento WCAG sin realizar pruebas.

### 8.4 Rendimiento

- Imágenes optimizadas y con dimensiones adecuadas.
- Carga diferida de imágenes que no sean críticas.
- Vídeo solo bajo demanda, si se incorpora.
- Evitar librerías de animación pesadas.
- Evitar JavaScript de cliente innecesario.
- Comprobar los resultados de build y las métricas de rendimiento antes de publicar.

### 8.5 SEO

- Título y descripción específicos.
- Un H1 principal.
- URL canónica y metadatos sociales cuando proceda.
- Sitemap y robots configurados de forma coherente con el estado del sitio.
- Contenido original en español, dirigido a almacenes hortofrutícolas.
- No crear páginas artificiales ni afirmar autoridad, clientes o resultados que no existen.
- No indexar páginas de pruebas o contenido incompleto.

---

## 9. Privacidad, seguridad y publicación

Antes de publicar el formulario:

- Definir quién es el responsable del tratamiento.
- Identificar qué datos se recogen y para qué.
- Determinar dónde se almacenan y quién puede acceder.
- Definir la base jurídica, información de privacidad, conservación y atención de derechos con asesoramiento adecuado.
- Revisar la necesidad de consentimiento separado para comunicaciones comerciales.
- Probar el envío, la gestión de errores y el acceso a los datos.
- No recopilar documentación real de expediciones mediante el formulario de marketing.

No activar analítica no esencial ni cookies que requieran consentimiento hasta implementar los mecanismos apropiados.

El dominio `decalight.es` ya fue adquirido en DonDominio. No volver a comprarlo. No se ha confirmado la contratación de hosting ni la creación de cuentas de correo. No asumir que existe `info@decalight.com` ni publicar esa dirección sin verificarla.

No desplegar ni realizar cambios DNS hasta contar con aprobación expresa y verificar el entorno de alojamiento.

---

## 10. Instrucciones para Antigravity

Usar este documento como fuente de verdad para el contenido y las decisiones de la web pública.

### Antes de modificar archivos

1. Revisar el repositorio `DECA-LIGHT-WEB` y el documento `DESIGN_SYSTEM.md` si está disponible.
2. Identificar contradicciones entre los documentos y señalarlas antes de aplicar cambios.
3. No tocar ningún repositorio, carpeta, credencial o código de la aplicación SaaS.
4. No cambiar código, instalar fuentes o dependencias ni hacer commits/push sin la instrucción específica de la fase correspondiente.
5. No publicar ni desplegar.

### Al preparar la implementación

1. Proponer primero un plan de archivos y secciones.
2. Utilizar el contenido aprobado y mantener visibles las etiquetas de «en desarrollo» donde corresponda.
3. No inventar funcionalidades, integraciones, testimonios, clientes, métricas, precios o compromisos.
4. Si una función no está confirmada, expresarla como objetivo del proyecto o dejarla pendiente.
5. Mantener los formularios sin falsa funcionalidad: no simular envíos.
6. Aplicar los requisitos responsive, accesibilidad, SEO y rendimiento de este documento.
7. Al terminar cada fase, informar de los archivos cambiados, comprobaciones ejecutadas, decisiones pendientes y cualquier desviación de este documento.

### Regla de aceptación

Una fase no se considera terminada solo porque el sitio compile. Debe cumplir el alcance acordado, mostrar contenido comercial veraz, funcionar en móvil y teclado, no tener errores evidentes y no introducir cambios fuera de la web pública.

---

## 11. Decisiones y bloqueos pendientes antes de publicar

Los siguientes bloqueos deben resolverse de forma explícita antes de cualquier despliegue o puesta en producción:

1. **[Bloqueo Formulario]:** No construir backend ni simular envíos hasta definir almacenamiento seguro, privacidad y destinatario de los contactos.
2. **[Bloqueo Privacidad y Legal]:** Redactar y validar con asesoramiento profesional el aviso legal, política de privacidad y condiciones de tratamiento.
3. **[Bloqueo Condiciones del Piloto]:** No prometer condiciones definitivas (plazas, gratuidad, fechas, acceso operativo ni soporte técnico garantizado).
4. **[Bloqueo Infraestructura y Dominio]:** Dominio `decalight.es` adquirido en DonDominio. Hosting y cuentas de correo pendientes de contratación. No desplegar ni cambiar DNS.
5. **[Bloqueo Integraciones]:** Ninguna integración con Hispatec o TransFollow está confirmada; son estudios técnicos preliminares.
6. **[Bloqueo Tipografía y Recursos]:** No instalar dependencias ni descargar archivos de fuentes (Inter WOFF2) hasta la fase autorizada.
7. **[Bloqueo Publicación General]:** Ninguna puesta en producción sin aprobación humana expresa.

### Lista de comprobación de tareas pendientes
- [ ] Revisar y aprobar el contenido final de cada vista.
- [ ] Confirmar qué funciones están realmente implementadas y cuáles son solo objetivo.
- [ ] Resolver mecanismo real de recepción del formulario.
- [ ] Configurar y confirmar correo corporativo de contacto.
- [ ] Revisar y publicar aviso legal y privacidad definitivos.
- [ ] Decidir si se utilizarán fotografías externas y verificar licencias comerciales.
- [ ] Verificar licencia y archivos WOFF2 de Inter antes de integrarlos.
- [ ] Ejecutar pruebas en matriz responsive (320px – 1440px), accesibilidad (A11y), build y rendimiento.
- [ ] Configurar hosting definitivo, HTTPS y DNS en DonDominio tras aprobación.
- [ ] Obtener aprobación expresa final antes del despliegue público.

---

## 12. Resumen ejecutivo

DECA Light es un proyecto en desarrollo que busca ayudar a los almacenes hortofrutícolas a coordinar la documentación de sus expediciones, especialmente cuando la información del vehículo llega después de que el almacén haya preparado sus documentos.

La web debe explicar este problema de forma concreta, presentar la propuesta de coordinación documental, recoger interés de empresas que quieran participar en la validación y mantener una separación clara entre las capacidades objetivo y las funciones efectivamente disponibles.

La prioridad inmediata es la validación comercial con las dos empresas de referencia, seguida de una definición precisa del piloto. La web apoyará ese proceso; no debe prometer un servicio operativo antes de que el producto y sus controles de seguridad estén preparados.
