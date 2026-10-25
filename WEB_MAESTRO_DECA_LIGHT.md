# DECA Light — Documento Maestro de la Web Comercial

**Versión:** 1.1.0  
**Fecha de consolidación:** 14 de octubre de 2026 · **Actualizado:** 25 de octubre de 2026 (lanzamiento comercial)  
**Estado:** Documento normativo de referencia de producto, narrativa y arquitectura  
**Uso:** Fuente de verdad canónica para el diseño, contenido y construcción de la web comercial de DECA Light  
**Documentos vinculados:** [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (v3.0.0), [`COMPONENT_LIBRARY.md`](COMPONENT_LIBRARY.md) (v1.0.0), [`MOTION_GUIDELINES.md`](MOTION_GUIDELINES.md) (v1.0.0)  
**Restricción permanente:** Este documento no autoriza modificaciones en el código de la aplicación SaaS subyacente ni presupone la disponibilidad operativa de funcionalidades catalogadas como hoja de ruta o hipótesis.

---

## 0. Decisión de lanzamiento (25-oct-2026) — prevalece sobre el resto del documento

Por decisión del responsable del producto, la web deja de presentar DECA Light como proyecto en desarrollo o programa piloto.

- **Mensaje:** DECA Light está **disponible** para almacenes y comercializadoras hortofrutícolas, con **demostración y puesta en marcha guiada** (alta y configuración acompañadas; no hay autoservicio).
- **Llamada a la acción aprobada:** «Solicitar demostración» (variantes: «Solicitar una demostración», «Contactar»). El ancla `#piloto` se mantiene por compatibilidad de enlaces.
- **Qué se puede afirmar hoy:** importa el informe de expediciones de Hispatec (CSV exportado) y cartas de porte en PDF; agrupa el día por transportista; pide solo lo que falta (normalmente la matrícula); genera el DeCA en PDF con código QR; multiempresa.
- **Qué NO se puede afirmar:** clientes, testimonios, logotipos o métricas no reales; «ya funciona en almacenes» hasta que el piloto real esté en marcha; integración directa (API) con Hispatec o TransFollow; CMR o transporte internacional; «homologado», «certificado», «cumple el 100 % de la normativa», «preparado para eFTI».
- **Páginas legales:** siguen marcadas como borrador hasta incorporar los datos del titular (LSSI art. 10).
- Las secciones 3, 4, 5, 6 y 8 se han actualizado a esta decisión; donde quede algún texto antiguo, prevalece esta sección.

---


## 1. Propósito y Marco de Gobernanza

### 1.1 Objetivo del documento
Centralizar de forma vinculante la definición comercial, el posicionamiento estratégico, la narrativa editorial, la arquitectura de contenidos y los límites de honestidad tecnológica de la web pública de **DECA Light**.

Este archivo actúa como el contrato maestro para cualquier diseñador, director de arte, redactor o ingeniero de software que intervenga en la plataforma comercial. Resuelve ambigüedades, previene desviaciones de producto y garantiza la máxima coherencia entre la realidad operativa y la comunicación externa.

### 1.2 Reglas fundamentales de gobernanza
1. **Inviolabilidad del software SaaS:** No tocar, modificar ni refactorizar repositorios, bases de datos o servicios de la aplicación SaaS desde el proyecto web.
2. **Despliegue bajo autorización:** Prohibido alterar zonas DNS (gestionadas en Cloudflare) o publicar cambios en la rama de producción de Cloudflare Pages sin aprobación humana expresa y trazable.
3. **Principio de honestidad comercial:** Prohibido anunciar como operativas funciones que se encuentren en fase de investigación, diseño o desarrollo. Distinguir siempre entre:
   - **Hechos comprobados:** Realidad contrastada en almacenes hortofrutícolas.
   - **Capacidades disponibles:** Funciones que existen en el producto (§6).
   - **Hoja de ruta:** Funciones previstas pero no disponibles.
   - **Hipótesis por validar:** Suposiciones operativas o de negocio sujetas a entrevistas de campo.
4. **Tolerancia cero a la ficción de marketing:** No inventar logotipos de clientes, citas testimoniales, métricas de ahorro inventadas, acuerdos de integración con terceros (Hispatec, TransFollow) ni garantías de cumplimiento normativo absoluto.
5. **Calidad estética e integridad técnica:** Mantener una identidad visual B2B sobria, editorial y premium, rechazando recursos de plantilla genérica, animaciones intrusivas o degradaciones de accesibilidad.

---

## 2. Producto, Posicionamiento y Contexto Sectorial

### 2.1 Definición técnica y conceptual de DECA Light
DECA Light es una solución SaaS B2B concebida como una **capa ligera de coordinación documental de expediciones** para almacenes hortofrutícolas y empresas comercializadoras agrícolas.

```
┌────────────────────────────────────────────────────────┐
│               CAPA EXISTENTE EN EL ALMACÉN              │
│       ERP Agropecuario (ej. Hispatec) / Básculas       │
│        (Albaranes, pesajes, pedidos comerciales)       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│           DECA LIGHT (CAPA DE COORDINACIÓN)            │
│  Centralización documental · Detección de asincronía   │
│   Emparejamiento por albarán · Preparación anticipada  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             FLUJO DE SALIDA DE EXPEDICIÓN              │
│   Documento DECA listo para revisión humana y firma    │
└────────────────────────────────────────────────────────┘
```

**Lo que DECA Light ES:**
- Una herramienta complementaria que ayuda al personal administrativo a preparar la información disponible de cada carga y asociarla de manera estructurada con los datos de transporte en cuanto son comunicados.
- Un entorno de control visual sobre las expediciones en curso para evitar dispersión documental y saturación al final de la jornada.

**Lo que DECA Light NO ES (y no debe comunicarse nunca como tal):**
- **NO es un ERP:** No gestiona facturación, contabilidad, nóminas ni pedidos comerciales.
- **NO es un sustituto de Hispatec:** Respeta y se apoya en los sistemas centrales de gestión del almacén.
- **NO es un SGA/WMS:** No gestiona ubicaciones físicas en cámara, inventario de palés ni preparación de pedidos internos.
- **NO es un TMS de flotas:** No optimiza rutas de camiones ni gestiona contratos con transportistas.
- **NO es un autómata legal ciego:** No emite documentación oficial sin verificación previa del personal autorizado.

### 2.2 El problema operativo central: La asincronía en el muelle
En el sector hortofrutícola, la expedición de productos perecederos está sujeta a un **desfase temporal crítico** entre dos flujos de trabajo independientes:

1. **Flujo interno del almacén (Síncrono y controlado):**
   - El departamento comercial confirma el pedido.
   - El almacén selecciona el producto, confecciona los palés y realiza el pesaje en báscula.
   - El personal administrativo emite el albarán de salida y la documentación base en su ERP.
   - *Estado en este punto:* La mercancía está lista para carga física, pero administrativamente incompleta para viajar.

2. **Flujo del transporte externo (Asíncrono y fragmentado):**
   - Las empresas de transporte asignan vehículos y remolques en función de sus rotaciones logísticas.
   - Los datos críticos (matrícula del tractor, matrícula del remolque, nombre del conductor, DNI/identificación) llegan con horas de desfase respecto a la preparación de la carga.
   - Estos datos llegan a través de canales dispersos: mensajes de WhatsApp, llamadas telefónicas, correos electrónicos con PDFs adjuntos o albaranes manuscritos a la llegada del chófer al muelle.

3. **El punto de fricción:**
   - La emisión del documento obligatorio (DECA y carta de porte/CMR asociada) no puede cerrarse sin las matrículas del transporte.
   - Los administrativos deben retener expediciones en su cabeza o en notas adhesivas, buscar manualmente entre correos y mensajes a última hora de la tarde, e interrumpir su ritmo para completar los documentos cuando los camiones ya están presionando en la báscula de salida.

### 2.3 Los cuatro documentos de expedición hortofrutícola
Para mantener el rigor editorial y técnico, la web debe referenciar con exactitud los documentos reales del sector:

| Documento | Función Operativa | Datos Clave que Contiene | Momento de Disponibilidad |
|---|---|---|---|
| **Albarán de entrega** | Acredita la salida física de mercancía del almacén. | Nº albarán, bultos, kg netos/brutos, variedad, cliente de destino. | Inmediato tras confección y pesaje en almacén. |
| **Carta de Porte (Nacional)** | Contrato de transporte terrestre en territorio español (LOTT). | Cargador, transportista, destinatario, peso, instrucciones de transporte. | Albarán listo; datos de vehículo pendientes del transportista. |
| **CMR (Internacional)** | Convenio relativo al contrato de transporte internacional de mercancías por carretera. | Remitente, destinatario, lugares de carga/entrega, precintos, reservas. | Preparado por almacén; formalizado con conductor extranjero. |
| **DECA** | Documento de Control y Acompañamiento en el transporte de productos agrarios y pesqueros. | Origen agrario, trazabilidad, datos del transportista y **matrículas**. | **Bloqueado hasta la recepción de la matrícula y conductor.** |

### 2.4 Lema y directrices de posicionamiento
- **Lema principal aprobado:**  
  > *La gestión documental de tus expediciones, más sencilla.*
- **Sublema / Kicker superior de posicionamiento:**  
  > `COORDINACIÓN DOCUMENTAL DE EXPEDICIONES`
- **Tono de voz comercial:**
  - Sobrio, riguroso, empático con la tensión del muelle agrícola y respetuoso con los procedimientos tradicionales.
  - Rechazo frontal de la hipérbole tecnológica ("revolución cuántica", "magia de IA", "disrupción").
  - Vocabulario sectorial preciso: *almacén hortofrutícola, muelle de carga, expedición, albarán, báscula, carta de porte, CMR, DECA, transportista, matrícula*.

---

## 3. Límites de Honestidad y Declaraciones Prohibidas

Para preservar la credibilidad de DECA Light ante directores de operaciones y gerentes de cooperativas agrícolas, la web debe respetar estrictamente los siguientes límites:

### 3.1 Lo que SÍ se puede afirmar
- "DECA Light está disponible para almacenes y comercializadoras hortofrutícolas, con demostración y puesta en marcha guiada."
- "Importa el informe de expediciones de Hispatec y las cartas de porte en PDF, y genera el DeCA con su PDF y su código QR."
- "El objetivo del proyecto es estructurar la documentación disponible para que la llegada de la matrícula no colapse la operativa."
- "Diseñado para actuar como una capa complementaria sobre los sistemas de gestión habituales."
- "Mantiene la verificación humana como principio central en cada decisión documental."
- "Te enseñamos DECA Light con un caso como el tuyo y te acompañamos en la puesta en marcha."

### 3.2 Declaraciones terminantemente PROHIBIDAS
| Declaración Prohibida | Razón de la Prohibición | Formulación Aceptada de Reemplazo |
|---|---|---|
| *"Automatización total del proceso"* | No existe automatización sin revisión en documentos legales de transporte. | *"Organización estructurada y preparación anticipada de los datos disponibles."* |
| *"Cero errores garantizados"* | La calidad del dato depende de las comunicaciones de terceros y revisión humana. | *"Detección de incoherencias y validación previa antes de la emisión."* |
| *"Generación instantánea con un clic"* | Minimiza falsamente la complejidad de la verificación documental. | *"Agiliza la emisión al concentrar los datos previamente validados."* |
| *"Integración nativa con Hispatec / ERP"* | No existe integración técnica validada por contrato; es un objetivo de estudio. | *"Diseñado para convivir con los procedimientos y sistemas habituales del almacén."* |
| *"Ahorra un 80% del tiempo de expedición"* | No existen métricas estadísticas auditadas en producción real. | *"Orientado a reducir las búsquedas manuales y la sobrecarga al final de la jornada."* |
| *"Cumplimiento legal 100% blindado"* | La responsabilidad legal del transporte recae en el cargador y transportista según la LOTT. | *"Facilita la incorporación de los datos exigidos por la normativa de transporte."* |
| *"Comienza a utilizarlo hoy gratis"* | No hay autoservicio ni precio público: el alta es guiada. | *"Solicita una demostración."* |
| *"Homologado / certificado por el Ministerio"* | El Ministerio no certifica aplicaciones de DeCA. | *"Genera el DeCA en PDF con código QR para su consulta en carretera."* |
| *"Preparado para eFTI"* | No acreditado. | No mencionar hasta tener integración o certificación documentada. |

---

## 4. Arquitectura de la Landing Page (Sección por Sección)

La web comercial de DECA Light se estructura en una sola página fluida, modular y orientada a la pedagogía del producto. A continuación se define la especificación canónica de cada sección:

```
┌──────────────────────────────────────────────────────────────────┐
│ HEADER: Marca · Nav (Problema, Flujo, Demostración, FAQ) · CTA    │
├──────────────────────────────────────────────────────────────────┤
│ HERO: Kicker · H1 Lema · P Propuesta · CTA Contactar · SVG Flujo │
├──────────────────────────────────────────────────────────────────┤
│ PROBLEM: Editorial 2 cols · Kicker · H2 · P · 3 Fricciones · Banner│
├──────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS: 3 Fases (Preparar · Coordinar · Completar)         │
│               Blueprints · Pipeline Nodes · Human Checklists     │
├──────────────────────────────────────────────────────────────────┤
│ DEMO (#piloto): Solicitud de demostración · Formulario · Pasos   │
├──────────────────────────────────────────────────────────────────┤
│ FAQ: Acordeón accesible · 6 Preguntas normativas de producto     │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER: Marca · Disclaimer legal · Contacto real · Copyright     │
└──────────────────────────────────────────────────────────────────┘
```

### 4.1 Header (`src/components/Header.astro`)
- **Propósito:** Identificación de marca inmediata, navegación accesible y llamada a la acción siempre disponible.
- **Elementos anatómicos:**
  - **Identificador de marca:** Logotipo tipográfico `DECA Light` con enlace ancla a inicio (`#`). Tipografía Inter semibold con acento sutil en `Light`.
  - **Navegación principal:** Lista semántica `<nav>` con 4 anclas: *El problema* (`#problema`), *Cómo funciona* (`#como-funciona`), *Demostración* (`#piloto`), *Preguntas frecuentes* (`#faq`).
  - **CTA de cabecera:** Enlace botón a `#piloto` con texto: `Contactar`. No hay distintivo de «En desarrollo».
- **Responsive:** En móvil (<768px), la navegación de enlaces se oculta o condensa; el identificador de marca y el CTA de cabecera se mantienen accesibles respetando el área táctil mínima de 44×44px.

### 4.2 Hero (`src/components/Hero.astro`)
- **Propósito:** Declarar el posicionamiento en los primeros 3 segundos y modelar visualmente la convergencia del flujo documental.
- **Elementos anatómicos:**
  - **Kicker superior:** `COORDINACIÓN DOCUMENTAL DE EXPEDICIONES` estilizado con tracking amplio y acento esmeralda.
  - **Titular H1:** *La gestión documental de tus expediciones, más sencilla.*
  - **Párrafo de posicionamiento:** *DECA Light coordina la documentación de las expediciones y organiza la información del almacén y del transporte, incluso cuando los datos llegan en momentos diferentes.*
  - **Acción principal:** Botón primario esmeralda con enlace a `#piloto`: *Contactar*.
  - **Diagrama de proceso convergente (ProcessDiagram):**
    - Columna izquierda: Bloque "Almacén" (Albarán, Pesaje, Bultos listos).
    - Columna central: Bloque "Transporte" (Matrícula y Conductor con estado ámbar "Pendiente").
    - Centro de convergencia: Nodo DECA Light que procesa la unión.
    - Columna derecha: Bloque de salida con el documento DeCA listo, en verde esmeralda.
    - En móvil (<768px): El diagrama SVG conmuta a una representación vertical lineal clara y legible.

### 4.3 Sección «El problema» (`src/components/Problem.astro`)
- **Propósito:** Demostrar conocimiento profundo de la realidad del almacén agrícola, conectando emocional y técnicamente con los dolores del administrativo.
- **Estructura editorial:**
  - **Columna izquierda (Contexto y tesis):**
    - Kicker: `EL CUELLO DE BOTELLA OPERATIVO`
    - H2 de gran tamaño: *El reto no es generar un PDF. Es coordinar datos que no llegan a la vez.*
    - Párrafo de apoyo: Explica cómo el almacén tiene todo listo para salir, pero el proceso administrativo queda encallado esperando información externa.
  - **Columna derecha (Las tres fricciones documentales):**
    1. **Fricción 01 · Desfase temporal:** La mercancía está en el muelle, el albarán emitido, pero el transportista no asigna la matrícula hasta horas más tarde.
    2. **Fricción 02 · Canales dispersos:** Las matrículas llegan por WhatsApp, correos no estructurados o llamadas directas al personal de báscula.
    3. **Fricción 03 · Cuello de botella vespertino:** Las expediciones pendientes se acumulan al final del turno, exigiendo cotejos manuales bajo la presión de salida de camiones.
  - **Banner inferior de conclusión:**
    - Superficie en Plano 1 con acento esmeralda (`#047857`) y mensaje de cierre: *DECA Light no inventa un nuevo ERP. Actúa como el puente que sostiene la información hasta que la expedición puede completarse.*

### 4.4 Sección «Cómo funciona» (`src/components/HowItWorks.astro`)
- **Propósito:** Mostrar la solución propuesta como un proceso ordenado en 3 macro-fases, transparente y centrado en el control humano.
- **Estructura por macro-fases:**
  1. **Fase 01 · Preparar lo conocido (El almacén adelanta su trabajo):**
     - Explicación de cómo se toman los albaranes y órdenes de carga existentes en el ERP o sistema de pesaje.
     - Componente visual `DocumentBlueprint` mostrando el albarán con datos de cliente, producto y kilos confirmados.
     - Indicador `PipelineTrack` conectando con el nodo siguiente.
  2. **Fase 02 · Coordinar lo pendiente (Entrada asíncrona del transporte):**
     - Llegada del dato de transporte (matrícula/chófer) y emparejamiento con el albarán correspondiente mediante coincidencia de referencias.
     - Componente visual de tarjeta de conciliación con estado de alerta ámbar mientras los datos no están confirmados.
  3. **Fase 03 · Completar y archivar (Validación previa y generación):**
     - Lista de comprobación humana (`HumanChecklist`): *Trazabilidad de origen verificada*, *Datos de transporte completos*, *Pesaje oficial cuadrado*.
     - Generación del documento DECA estructurado, trazable y listo para su custodia o envío.
     - Las ilustraciones son esquemas del flujo, no capturas de pantalla.

### 4.5 Sección «Demostración» (`src/components/Pilot.astro`, ancla `#piloto`)
- **Propósito:** Punto de conversión de la landing: solicitud de demostración y puesta en marcha guiada.
- **Elementos anatómicos (estado real tras el lanzamiento):**
  - Kicker `SOLICITA UNA DEMOSTRACIÓN`; titular *Llevemos DECA Light a la operativa real de tu almacén.*
  - Pasos de puesta en marcha: 01 Conocemos tu operativa · 02 Configuramos tu cuenta · 03 Arranque acompañado (en paralelo al sistema actual hasta darlo por bueno).
  - Botón del formulario: `Solicitar demostración`. Campos reales: nombre de la empresa y correo (ver `src/components/Pilot.astro`).
- **Especificación original (histórica, sustituida):**
  - **Formulario de captación `#piloto`:**
    - Campo 1: *Nombre y apellidos* (obligatorio).
    - Campo 2: *Correo electrónico corporativo* (obligatorio, tipo email).
    - Campo 3: *Nombre del almacén o cooperativa* (obligatorio).
    - Campo 4: *Volumen orientativo de expediciones diarias* (selector: `1–5`, `6–15`, `Más de 15`, `No estoy seguro`).
    - Campo 5: *Casilla obligatoria de consentimiento informado y privacidad*.
    - Botón de envío: `Solicitar participar en la validación`.
  - **Límites técnicos y legales actuales del formulario:**
    - El formulario está activo con Cloudflare Pages Functions y D1 (ver README).
    - Prohibido simular un envío exitoso ficticio con pantallas de agradecimiento que confundan al usuario.
    - No solicitar en esta fase documentos confidenciales de expedición, CIFs ni datos bancarios.

### 4.6 Sección «Preguntas frecuentes» (`src/components/Faq.astro`)
- **Propósito:** Resolver objeciones técnicas y comerciales clave mediante un acordeón accesible nativo con animación WAAPI fluida sin dependencias.
- **Las 6 preguntas normativas de producto:**
  1. *¿DECA Light sustituye a Hispatec o al sistema de gestión de mi almacén?*  
     **Respuesta:** No. DECA Light no es un ERP ni pretende sustituirlo. Su diseño está orientado a actuar como una capa de coordinación documental que complemente al software existente, organizando los datos de transporte que el ERP aún no tiene.
  2. *¿Está el software disponible?*  
     **Respuesta:** Sí, con demostración previa y puesta en marcha guiada por el equipo (no hay autoservicio).
  3. *¿Qué documentación contempla el sistema en su alcance objetivo?*  
     **Respuesta:** El DeCA (documento de control administrativo electrónico del transporte de mercancías por carretera, interior y cabotaje) a partir del informe de expediciones del ERP y de las cartas de porte en PDF. No incluye CMR ni transporte internacional.
  4. *¿Existe actualmente integración directa confirmada con Hispatec o TransFollow?*  
     **Respuesta:** No hay integración directa por API. DECA Light importa el informe de expediciones exportado de Hispatec (CSV) y lee cartas de porte en PDF.
  5. *¿Cómo puedo ver DECA Light funcionando?*  
     **Respuesta:** Solicitando una demostración desde el formulario o en contacto@decalight.es.
  6. *(Precios: no se publican; se informan en la demostración. No prometer condiciones no acordadas.)*

### 4.7 Pie de página (`src/components/Footer.astro`)
- **Propósito:** Cierre institucional, salvaguarda de cumplimiento normativo y contacto corporativo.
- **Elementos anatómicos:**
  - Identidad: Logotipo tipográfico `DECA Light` y descriptor *Coordinación documental para expediciones hortofrutícolas*.
  - Enlaces de navegación rápida a las secciones de la página.
  - Enlaces normativos legales: *Aviso Legal*, *Política de Privacidad*, *Política de Cookies* (marcadas como borrador hasta incorporar los datos del titular).
  - Distintivo: *Disponible para almacenes hortofrutícolas*.
  - Aviso de marcas: *Las denominaciones de terceros mencionadas pertenecen a sus respectivos titulares y se citan exclusivamente con fines de compatibilidad operativa y contexto sectorial.*
  - Correo de contacto real verificado. (No inventar correos ficticios).
  - Copyright: `© 2026 DECA Light. Todos los derechos reservados.`

---

## 5. Dinámica Inter-Secciones y Flujo Narrativo

La experiencia de lectura en la landing page está concebida como un **embudo narrativo deductivo** donde cada sección prepara y valida la siguiente:

```
[HERO]              SÍNTESIS RÁPIDA: Plantea la promesa (coordinar documentos y transporte)
       │
       ▼ (Scroll)
[PROBLEM]           DIAGNÓSTICO REALISTA: Demuestra empatía con el caos de la tarde y la asincronía
       │
       ▼ (Scroll)
[HOW IT WORKS]      MÉTODO EN 3 PASOS: Resuelve el problema con orden, blueprints y verificación humana
       │
       ▼ (Scroll)
[DEMO]              LLAMADA A LA ACCIÓN: Solicitar demostración y puesta en marcha guiada
       │
       ▼ (Scroll)
[FAQ]               RESOLUCIÓN DE DUDAS: Neutraliza objeciones técnicas de integración y plazos
       │
       ▼ (Scroll)
[FOOTER]            SOLVENCIA LEGAL: Cierra con rigor institucional y transparencia
```

- **Del Hero al Problema:** El Hero muestra el diagrama conceptual de cómo convergen almacén y transporte. Al hacer scroll, la sección Problem detalla por qué esa convergencia hoy es dolorosa y genera fricción.
- **Del Problema a Cómo Funciona:** Tras constatar el desfase temporal, How It Works desglosa el protocolo de 3 pasos para mitigar el caos: preparar anticipadamente lo conocido, recibir de forma estructurada lo pendiente y validar antes de emitir.
- **De Cómo Funciona a la Demostración:** Una vez que el visitante comprende el mecanismo, se le ofrece verlo con su propia casuística mediante una demostración.
- **De la Demostración a las FAQs:** Para quienes tienen dudas razonables sobre su ERP existente o la disponibilidad del software, las FAQs ofrecen respuestas directas y transparentes sin rodeos comerciales.

---

## 6. Matriz de Estado de Capacidades del Producto

Para asegurar que todo el equipo distinga la realidad de los objetivos de diseño, se establece la siguiente matriz normativa:

| Capacidad del Sistema | Clasificación | Estado Técnico / Comercial | Tratamiento en la Web |
|---|---|---|---|
| **Estructuración del problema de asincronía** | **HECHO COMPROBADO** | Validado mediante trabajo de campo con empresas agrícolas. | Argumentario central en Hero y Problem. |
| **Flujo de 3 fases (Preparar · Coordinar · Completar)** | **CONCEPTO APROBADO** | Arquitectura conceptual cerrada y diagramada. | Base visual de HowItWorks. |
| **Importación del informe de expediciones de Hispatec (CSV)** | **DISPONIBLE** | Implementado y probado. | Se puede afirmar. |
| **Lectura de cartas de porte en PDF (modelo FOM, con texto)** | **DISPONIBLE** | Implementado; escaneos/fotos y CMR no. | Afirmar solo PDF con texto; no prometer OCR. |
| **Conciliación por nº de albarán (informe + carta)** | **DISPONIBLE** | Implementado. | Se puede afirmar, con revisión humana de discrepancias. |
| **Vista del día por transportista y matrícula una vez por camión** | **DISPONIBLE** | Implementado. | Se puede afirmar. |
| **Integración directa bidireccional con Hispatec** | **HIPÓTESIS POR VALIDAR**| No iniciada contractualmente ni desarrollada técnicamente. | **Prohibido afirmar disponibilidad**. Mencionar como estudio técnico. |
| **Intercambio electrónico con TransFollow (e-CMR)** | **HIPÓTESIS POR VALIDAR**| Exploración técnica preliminar de estándares. | No anunciar como funcionalidad existente. |
| **Generación del DeCA en PDF con código QR** | **DISPONIBLE** | Implementado (normativa estatal: Ley 9/2025, Orden FOM/2861/2012, Resolución de 5-jun-2026). La emisión la confirma siempre una persona. | Afirmar «genera el DeCA»; nunca «certificado» ni «homologado». |
| **Usuarios con inicio de sesión y roles; alta autónoma** | **HOJA DE RUTA** | Previsto. | No anunciar como disponible. |
| **eFTI** | **HOJA DE RUTA** | En estudio. | No mencionar como disponible. |

---

## 7. Directrices de Identidad Visual y Experiencia

> Las definiciones normativas de tokens, curvas de movimiento, contrastes matemáticos y componentes están recogidas en sus respectivos documentos dedicados:
> - [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
> - [`COMPONENT_LIBRARY.md`](COMPONENT_LIBRARY.md)
> - [`MOTION_GUIDELINES.md`](MOTION_GUIDELINES.md)

### 7.1 Síntesis de los principios visuales
1. **Luz, pulcritud y sobriedad:** Fondo dominante `#F8FAFC`, superficies `#FFFFFF` con micro-bordes de 1px (`#E2E8F0`). Ausencia de fondos negros masivos o modos oscuros no justificados en el flujo comercial.
2. **Jerarquía tipográfica editorial:** Inter con escala modular fija, titulares oscuros `#0F172A` de alto impacto y cuerpos de lectura `#475569` que superan cómodamente el contraste WCAG AAA/AA.
3. **Acento funcional inteligente:**
   - Verde esmeralda (`#047857`) exclusivo para identidad de marca, éxito verificado, botones primarios y confirmación documental.
   - Ámbar (`#FEF3C7` con texto `#92400E`) reservado para estados asíncronos pendientes y atención operativa.
   - Azul cielo (`#0284C7`) dedicado a anillos de foco de teclado (`:focus-visible`).
4. **Profundidad arquitectónica sutil:** Sistema de 3 planos (Plano 0 Canvas, Plano 1 Tarjetas, Plano 2 Flotantes) con elevaciones máximas de 2px en interacción. **Prohibido el uso de transformaciones 3D, giros en perspectiva o efectos de cristal translúcido pesado (heavy glassmorphism)**.

---

## 8. Criterios de Aceptación y Checklist de Publicación

Antes de que cualquier versión de la web de DECA Light sea considerada lista para despliegue público, debe superar la siguiente lista de verificación:

- [ ] **Auditoría de textos:** Ninguna sección promete "automatización total", "cero errores" ni "integración con Hispatec garantizada".
- [ ] **Coherencia con §0:** Ningún texto presenta el producto como «en desarrollo» o «programa piloto», ni afirma lo prohibido en §0.
- [ ] **Formulario seguro y no engañoso:** El formulario de `#piloto` cuenta con aviso de privacidad coherente con la finalidad (demostración).
- [ ] **Matriz responsive superada:** Comprobación sin desbordamientos horizontales ni textos solapados en: 320px, 375px, 390px, 768px, 1024px y 1440px.
- [ ] **Accesibilidad certificada:** Todos los elementos interactivos alcanzan al menos 44×44px de área táctil, el foco por teclado es nítido y la navegación no depende exclusivamente del color.
- [ ] **Modo No-JS y movimiento reducido:** Con JavaScript desactivado o con `prefers-reduced-motion: reduce`, todo el contenido es visible y comprensible de inmediato.
- [ ] **Verificación de build estático:** `npm run build` compila con cero advertencias y cero errores en TypeScript estricto.
- [ ] **Autorización expresa:** Aprobación por escrito del responsable del proyecto antes de conectar el dominio o cambiar registros DNS.
