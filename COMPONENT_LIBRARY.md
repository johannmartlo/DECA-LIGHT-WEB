# DECA Light — Catálogo Normativo de Componentes UI

**Versión:** 1.0.0  
**Fecha de consolidación:** 14 de octubre de 2026  
**Estado:** Documento normativo de especificación y arquitectura de componentes  
**Uso:** Catálogo maestro para el desarrollo, modularización y mantenimiento de interfaces en DECA Light  
**Documentos vinculados:** [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (v3.0.0), [`WEB_MAESTRO_DECA_LIGHT.md`](WEB_MAESTRO_DECA_LIGHT.md) (v1.0.0), [`MOTION_GUIDELINES.md`](MOTION_GUIDELINES.md) (v1.0.0)  

---

## 1. Principios de Arquitectura de Componentes

### 1.1 Metodología de componentes
La biblioteca de componentes de DECA Light sigue una arquitectura orientada a la **claridad funcional**, el **rendimiento nativo sin dependencias** y la **accesibilidad universal (WCAG AA / AAA)**. 

Cada componente se define mediante:
1. **Semántica HTML nativa:** Empleo estricto de elementos estándar (`<article>`, `<section>`, `<header>`, `<dl>`, `<button>`, `<details>`) antes de recurrir a capas `<div>` genéricas.
2. **Sistema de planos de profundidad:** Pertenencia explícita a un plano de profundidad (Plano 0 Canvas, Plano 1 Superficie/Tarjeta, Plano 2 Flotante/Interactivo) sin saltos visuales incoherentes.
3. **Estabilidad dimensional (CLS = 0 como objetivo):** Los cambios de estado no desplazan el layout. Las propiedades que varían en hover o foco (ej. bordes) se preservan mediante bordes transparentes preexistentes o `box-shadow` inset, y los contenedores de iconos cuentan con dimensiones fijas (`flex-shrink: 0`).
4. **Mejora progresiva y degradación limpia:** Los componentes son totalmente legibles y utilizables sin JavaScript y con `prefers-reduced-motion: reduce`.
5. **Límites de simulación comercial:** Los componentes que muestran datos de negocio ficticios (matrículas, kg, albaranes) deben portar advertencias visuales de "Concepto" para evitar equívocos sobre el estado real de la herramienta.

### 1.2 Clasificación de estado de implementación
Para garantizar total veracidad con el código existente en el repositorio:
- `IMPLEMENTADO`: El componente existe en el código fuente actual (`src/components/` o `src/styles/`), se encuentra en producción local y sus selectores y estilos están operativos.
- `PARCIAL`: El componente existe de forma incrustada (inline) dentro de una sección específica (ej. Hero o HowItWorks), pero no ha sido desacoplado ni parametrizado como componente `.astro` reutilizable con slots o props formales.
- `PROPUESTO`: El componente ha sido especificado arquitectural y conceptualmente como evolución aprobada del sistema de diseño, pero su implementación en código está programada para una fase posterior.

---

## 2. Índice General de Componentes

| ID | Componente | Tipo / Categoría | Plano | Estado Real en Código |
|---|---|---|---|---|
| **CMP-01** | `ProcessDiagram` | Visualización técnica / SVG | Plano 1 | **PARCIAL** (Incrustado en `Hero.astro`) |
| **CMP-02** | `DocumentBlueprint` | Modelo esquemático documental | Plano 1 | **PARCIAL** (Incrustado en `HowItWorks.astro`) |
| **CMP-03** | `EntityCard` | Tarjeta de entidad (Almacén/Transporte) | Plano 1 | **PARCIAL** (Incrustado en `Hero.astro`) |
| **CMP-04** | `PipelineTrack` | Pista conectora de flujo | Plano 0/1 | **IMPLEMENTADO** (`HowItWorks.astro`) |
| **CMP-05** | `StatusBadge` | Micro-indicador de estado operativo | Plano 1/2 | **IMPLEMENTADO** (`Header`, `Hero`, `Problem`, `HowItWorks`) |
| **CMP-06** | `ExpeditionTimeline`| Guía secuencial cronológica | Plano 1 | **PROPUESTO** (Evolución de macro-fases) |
| **CMP-07** | `HumanChecklist` | Lista de verificación con intervención | Plano 1 | **IMPLEMENTADO** (`HowItWorks.astro`) |
| **CMP-08** | `ResultBanner` | Banner de consolidación / éxito | Plano 1 | **IMPLEMENTADO** (`Hero.astro`, `HowItWorks.astro`) |

---

## 3. Especificación Detallada de Componentes

---

### CMP-01: `ProcessDiagram` (Diagrama de Proceso Convergente)

- **Estado en código:** `PARCIAL`  
  *Justificación:* Implementado actualmente como un bloque SVG complejo y estructurado dentro de `src/components/Hero.astro`. Requiere parametrización futura para extraerse a `src/components/ui/ProcessDiagram.astro`.
- **Propósito:** Sintetizar visualmente la convergencia entre los datos del almacén (síncronos) y los datos del transporte (asíncronos) en el nodo central de DECA Light.
- **Semántica HTML:** `<figure role="region" aria-label="Diagrama de flujo de expedición hortofrutícola">` con `<figcaption class="sr-only">`.
- **Plano de profundidad:** **Plano 1** (`var(--color-surface)` `#FFFFFF`, `box-shadow: var(--shadow-sm)`).
- **Anatomía:**
  - `Container`: Caja exterior con borde `1px solid var(--color-border)`.
  - `NodeLeft` (Almacén): Representación esquemática del albarán y pesaje.
  - `NodeRight` (Transporte): Representación del camión con estado "Pendiente".
  - `FlowConnectors`: Rutas SVG (`<path>`) con efecto de trazo dinámico y marcadores direccionales.
  - `CentralHub`: Nodo DECA Light donde convergen los flujos.
  - `NodeOutput`: Salida unificada "DECA Listo".
- **Variantes:**
  - `variant="desktop-flow"`: Disposición horizontal en 3 columnas con conectores convergentes.
  - `variant="mobile-stack"`: Disposición vertical compacta en una sola columna con flujo descendente (activo por debajo de 768px).
- **Estados:**
  - *Default:* Rutas SVG estáticas con gradiente sutil.
  - *Animated (Default Motion):* Flujo secuencial de pulsos a lo largo de las rutas (`stroke-dashoffset`).
  - *Reduced-Motion:* Rutas 100% dibujadas, trazos continuos, sin traslaciones ni pulsos móviles. El estado de los nodos permanece 100% visible.
- **Tokens asociados:**
  - Fondos: `var(--color-surface)` (`#FFFFFF`), `var(--color-surface-subtle)` (`#F1F5F9`).
  - Trazos: `var(--color-border)` (`#E2E8F0`), acentos `var(--color-brand)` (`#047857`), `var(--color-warning-text)` (`#92400E`).
  - Radio: `var(--radius-lg)` (`12px`).
- **Comportamiento responsive:**
  - `1440px – 1024px`: Ancho completo del canvas derecho del Hero (580px – 640px). Conectores horizontales.
  - `768px`: Se reescala manteniendo legibilidad.
  - `<768px (Móvil)`: Los conectores SVG horizontales se ocultan; se activa la variante apilada vertical con flechas conectoras discretas de 24px para evitar desbordamientos y mantener legibilidad a 320px.
- **Accesibilidad (WCAG AA):**
  - Todo el SVG contiene `aria-hidden="true"`.
  - La información esencial se acompaña de un texto alternativo accesible oculto para lectores de pantalla (`class="sr-only"`): *"Diagrama que ilustra la convergencia de los datos de albarán del almacén con las matrículas del transporte en DECA Light para generar el documento oficial."*
- **Límites de simulación:** Las matrículas y números de albarán mostrados (`ALB-2026-089`, `7482-KML`) deben etiquetarse sutilmente como `EJEMPLO ILUSTRATIVO`.

---

### CMP-02: `DocumentBlueprint` (Representación Esquemática Documental)

- **Estado en código:** `PARCIAL`  
  *Justificación:* Implementado actualmente en `src/components/HowItWorks.astro` bajo las clases `.blueprint-card`, `.blueprint-header`, `.blueprint-row`. Diseñado para convertirse en componente agnóstico.
- **Propósito:** Mostrar la anatomía técnica de un documento logístico (Albarán, CMR, Carta de Porte, DECA) con rigor editorial, tipografía monoespaciada en datos y diferenciación de campos completos vs. pendientes.
- **Semántica HTML:** `<article class="document-blueprint" aria-labelledby="[id-titulo]">` utilizando `<dl>` para pares clave-valor de datos.
- **Plano de profundidad:** **Plano 1** (`var(--color-surface)` `#FFFFFF`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-md)`).
- **Anatomía:**
  - `BlueprintHeader`: Barra superior con tipo de documento (ej. `ALBARÁN Nº 48102`), badge de estado y fecha.
  - `BlueprintBody`: Rejilla de campos de datos.
  - `BlueprintField`: Contenedor individual con etiqueta pequeña en mayúsculas (`font-size: var(--font-size-xs)`) y valor en monospace (`font-family: var(--font-mono)`).
  - `BlueprintStatusLine`: Borde izquierdo o barra inferior con color condicional (esmeralda = confirmado, ámbar = pendiente de transporte).
- **Variantes:**
  - `variant="albaran"`: Campos de kg, variedad hortofrutícola, palés y cargador (100% completados en verde).
  - `variant="cmr"`: Campos de transporte internacional con sección de transportista pendiente.
  - `variant="deca"`: Documento final consolidado con todos los campos validados.
- **Estados interactivos:**
  - *Default:* Borde `#E2E8F0`, fondo blanco, sombra plana.
  - *Hover:* Elevación sutil de 2px (`transform: translateY(-2px)`), sombra `var(--shadow-md)`. Curva `var(--ease-out)`, 200ms.
  - *Focus-visible:* Anillo `2px solid var(--color-focus)` con offset de 2px.
  - *Reduced-motion:* Hover sin traslación vertical; únicamente cambio sutil de sombra o borde.
- **Tokens asociados:**
  - Tipografía: `var(--font-sans)` para títulos, `var(--font-mono)` para identificadores y valores numéricos.
  - Espaciado: `padding: var(--space-4)` (16px) a `var(--space-6)` (24px).
  - Colores: Fondo `var(--color-surface)`, bordes `var(--color-border)`.
- **Comportamiento responsive:**
  - En desktop: Rejilla interna de 2 o 3 columnas de datos.
  - En móvil (<640px): Colapso a una columna individual (`grid-template-columns: 1fr`). Tamaños de fuente ajustados a 12px para evitar saltos de línea antiestéticos en códigos alfanuméricos largos.
- **Accesibilidad (WCAG AA):**
  - Estructura en lista de definición `<dl>`, `<dt>` para el nombre del campo, `<dd>` para el valor.
  - Contraste de texto en etiquetas secundarias `#475569` sobre blanco: 4.6:1 (supera WCAG AA).
- **Límites de simulación:** Prohibido mostrar nombres de cooperativas reales sin autorización. Emplear identidades ficticias realistas (*"SAT Agrícola Levante"*, *"Transportes Frigoríficos del Sur"*).

---

### CMP-03: `EntityCard` (Tarjeta de Entidad Operativa)

- **Estado en código:** `PARCIAL`  
  *Justificación:* Implementado como bloques descriptivos de "Almacén" y "Transporte" en el Hero y en Problem. Requiere unificación como componente base de tarjeta.
- **Propósito:** Representar los dos actores operacionales del proceso (el Almacén/Cargador vs. el Transportista/Agencia) mostrando qué información aporta cada uno y su nivel de preparación.
- **Semántica HTML:** `<aside class="entity-card">` o `<div class="entity-card">`.
- **Plano de profundidad:** **Plano 1** (`var(--color-surface)` `#FFFFFF`).
- **Anatomía:**
  - `EntityIcon`: Contenedor cuadrado de 40×40px con icono SVG representativo (Almacén = edificio/caja, Transporte = camión).
  - `EntityHeader`: Título de la entidad (`font-weight: 600`) y subtítulo de rol.
  - `EntityContent`: Lista de atributos que aporta (`<ul>`).
  - `EntityBadge`: Estado de la aportación (`Completo` / `Asíncrono`).
- **Variantes:**
  - `entity="warehouse"`: Acento verde esmeralda (`#047857`), icono de almacén, lista de datos internos.
  - `entity="carrier"`: Acento ámbar (`#92400E`), icono de transporte, lista de datos externos sujetos a espera.
- **Estados:**
  - *Default:* Borde gris `#E2E8F0`.
  - *Active / Highlighted:* Micro-borde reforzado de 1px con el color temático de la entidad (`#047857` o `#F59E0B`).
- **Tokens asociados:**
  - Radio: `var(--radius-lg)` (`12px`).
  - Sombra: `var(--shadow-sm)`.
  - Espaciado: `padding: var(--space-5)` (20px).
- **Comportamiento responsive:**
  - Desktop: Distribución horizontal en paralelo.
  - Móvil (<768px): Apilado vertical con flecha conectora intermedia.
- **Accesibilidad:** Iconos decorativos marcados con `aria-hidden="true"`. Texto descriptivo completo accesible.

---

### CMP-04: `PipelineTrack` (Pista de Conexión y Flujo)

- **Estado en código:** `IMPLEMENTADO`  
  *Justificación:* Operativo en `src/components/HowItWorks.astro` (`.flow-stem`, `.step-connector`, `.node-marker`).
- **Propósito:** Guiar la mirada del usuario entre las fases secuenciales de la plataforma mediante una línea técnica continua punteada o sólida con nodos de estado.
- **Semántica HTML:** `<div class="pipeline-track" aria-hidden="true">` (puramente visual/decorativo, la semántica secuencial reside en la lista ordenada `<ol>`).
- **Plano de profundidad:** **Plano 0 / Plano 1** (discurre por debajo de las tarjetas de contenido).
- **Anatomía:**
  - `StemLine`: Línea vertical u horizontal de 2px de grosor.
  - `TrackNode`: Círculo de 24×24px con borde de 2px y número de paso o icono interior.
  - `PulsePoint`: Indicador luminoso opcional en el nodo activo.
- **Variantes:**
  - `orientation="vertical"`: Para secuencias de scroll editorial descendente (desktop y móvil).
  - `orientation="horizontal"`: Para esquemas de proceso en ancho completo.
  - `status="completed | active | pending"`: Diferenciación cromática (verde, azul foco, gris borde).
- **Movimiento asociado:**
  - Con scroll reveal: La línea se revela progresivamente mediante `transform: scaleY()` con punto de anclaje superior (`transform-origin: top`).
  - *Reduced-motion:* Escala estática inmediata (`scaleY(1)`), sin animación de trazo.
- **Tokens asociados:**
  - Color de línea: `var(--color-border)` (`#E2E8F0`).
  - Color activo: `var(--color-brand)` (`#047857`).
- **Comportamiento responsive:**
  - En desktop: Se alinea a la izquierda de las columnas de contenido o en el centro de diagramas.
  - En móvil: Se mantiene visible en el lateral izquierdo (offset de 16px) sirviendo de eje de anclaje para la lectura en pantallas pequeñas.

---

### CMP-05: `StatusBadge` (Insignia de Estado Operativo)

- **Estado en código:** `IMPLEMENTADO`  
  *Justificación:* Operativo en `src/components/Footer.astro` ("Disponible para almacenes hortofrutícolas"), en `src/components/Hero.astro`, en `src/components/Problem.astro` y en `src/components/HowItWorks.astro`.
- **Propósito:** Informar de manera instantánea sobre el estado de un proceso, documento o del propio proyecto, asociando un color funcional con un texto explícito.
- **Semántica HTML:** `<span class="status-badge status-badge--[variant]">`.
- **Plano de profundidad:** **Plano 1** (dentro de tarjetas) o **Plano 2** (flotante sobre cabeceras).
- **Anatomía:**
  - `StatusDot`: Círculo de 6×6px u 8×8px con color sólido. Opcionalmente envuelto en un anillo de pulso (`pulse-ring`).
  - `StatusLabel`: Texto en `font-size: var(--font-size-xs)` (12px), `font-weight: 500`.
- **Variantes:**
  1. `variant="warning"` (Ámbar - Espera / Pendiente):
     - Fondo: `var(--color-warning-surface)` (`#FEF3C7`).
     - Borde: `1px solid rgba(245, 158, 11, 0.3)`.
     - Texto: `var(--color-warning-text)` (`#92400E`). Contraste: 6.8:1 sobre blanco.
     - Dot: `#D97706`.
  2. `variant="success"` (Verde - Confirmado / Listo):
     - Fondo: `var(--color-brand-surface)` (`#ECFDF5`).
     - Borde: `1px solid rgba(4, 120, 87, 0.2)`.
     - Texto: `var(--color-brand)` (`#047857`). Contraste: 4.8:1 sobre blanco.
     - Dot: `#047857`.
  3. `variant="neutral"` (Gris - Informativo / Sistema):
     - Fondo: `var(--color-surface-subtle)` (`#F1F5F9`).
     - Borde: `1px solid var(--color-border)` (`#E2E8F0`).
     - Texto: `var(--color-text-secondary)` (`#475569`). Contraste: 4.6:1 sobre blanco.
     - Dot: `#64748B`.
- **Comportamiento con `prefers-reduced-motion: reduce`:**
  - **CRÍTICO:** Prohibido el uso de `animation-duration: 0.01ms !important` genérico que hace parpadear o desaparecer el dot.
  - La animación de pulso (`keyframes pulse`) se apaga (`animation: none`), pero el `StatusDot` permanece **100% visible, estático y con su color funcional intacto**.
- **Accesibilidad (WCAG AA):**
  - **No basarse únicamente en el color:** El badge siempre incluye texto legible ("Disponible", "Pendiente de matrícula", "Validado").
  - Si el dot estuviera aislado, requeriría `aria-label="Estado: Pendiente"`.

---

### CMP-06: `ExpeditionTimeline` (Línea de Tiempo de Expedición)

- **Estado en código:** `PROPUESTO`  
  *Justificación:* El concepto existe repartido conceptualmente entre las 3 macro-fases de HowItWorks. Se propone como componente unificado de tracking visual interactivo para futuras fases de producto.
- **Propósito:** Mostrar las horas críticas de una expedición hortofrutícola tipo (ej. 14:00 Confección Albarán → 17:30 Recepción Matrícula WhatsApp → 18:00 Emisión DECA en báscula).
- **Semántica HTML:** `<ol class="expedition-timeline">` con elementos `<li>`.
- **Plano de profundidad:** **Plano 1** (`var(--color-surface)`).
- **Anatomía:**
  - `TimelineItem`: Contenedor del hito temporal.
  - `TimeBadge`: Hora en formato monoespaciado (`17:30`).
  - `TimelineMarker`: Hito gráfico conectado al eje central.
  - `TimelineContent`: Descripción del evento y sistema involucrado.
- **Responsive:**
  - En desktop: Diagrama horizontal de izquierda a derecha.
  - En móvil: Plegado vertical idéntico a un feed de actividad.
- **Accesibilidad:** Secuencia ordenada semántica con `<ol>` para navegación por voz.

---

### CMP-07: `HumanChecklist` (Lista de Verificación con Intervención Humana)

- **Estado en código:** `IMPLEMENTADO`  
  *Justificación:* Operativo en `src/components/HowItWorks.astro` (Fase 3: `.check-list`, `.check-item`, `.check-icon`).
- **Propósito:** Enfatizar la filosofía central de DECA Light: el software no reemplaza el criterio del profesional; proporciona una lista rigurosa de chequeo previo que el usuario valida antes de generar el DECA oficial.
- **Semántica HTML:** `<ul class="human-checklist" role="list">` con `<li>` que contienen etiquetas e iconos de verificación.
- **Plano de profundidad:** **Plano 1** (`background: var(--color-surface)`).
- **Anatomía:**
  - `CheckItem`: Fila individual con espaciado vertical `padding: var(--space-2) 0`.
  - `CheckIcon`: Círculo de 20×20px con fondo verde esmeralda translúcido (`#ECFDF5`), borde verde y marca de verificación SVG (`✓`) en verde `#047857`.
  - `CheckText`: Título de la comprobación (`font-weight: 500`) y micro-texto explicativo en gris `#475569`.
- **Estados interactivos:**
  - *Default:* Items estáticos verificados.
  - *Hover:* Sutil iluminación de fondo `#F8FAFC` sin movimiento brusco.
- **Accesibilidad (WCAG AA):**
  - Icono marcado con `aria-hidden="true"`.
  - Texto descriptivo autosuficiente (ej. *"Validación de trazabilidad de parcela: Verificado"*).
  - Cumplimiento de contraste texto/fondo: 4.6:1.

---

### CMP-08: `ResultBanner` (Banner de Consolidación y Resultado)

- **Estado en código:** `IMPLEMENTADO`  
  *Justificación:* Operativo en la salida del Hero y en el cierre de HowItWorks (`.result-banner`, `.conclusion-box`).
- **Propósito:** Destacar visualmente el resultado positivo alcanzado al finalizar un flujo: documento listo para firma, ausencia de bloqueos o síntesis de propuesta de valor.
- **Semántica HTML:** `<aside class="result-banner" role="status">` o `<div class="result-banner">`.
- **Plano de profundidad:** **Plano 1** reforzado con borde acentuado.
- **Anatomía:**
  - `BannerAccentBar`: Borde izquierdo o superior de 3px o 4px en verde esmeralda (`var(--color-brand)` `#047857`).
  - `BannerIcon`: Icono de documento sellado o marca de verificación de 24×24px.
  - `BannerHeading`: Titular breve (`font-size: var(--font-size-base)`, `font-weight: 600`).
  - `BannerBody`: Párrafo explicativo en `font-size: var(--font-size-sm)`.
- **Variantes:**
  - `variant="emerald"` (Éxito / Documento listo): Fondo `#F0FDF4`, borde izquierdo `#047857`, texto `#064E3B`.
  - `variant="neutral"` (Conclusión editorial): Fondo `#FFFFFF`, borde perimetral `#E2E8F0`, acento esmeralda interior.
- **Comportamiento responsive:**
  - Se adapta fluidamente al 100% del contenedor padre. Padding interno de 16px en móvil y 24px en desktop.
- **Accesibilidad:** Uso de `role="status"` si el banner aparece dinámicamente, asegurando que lectores de pantalla anuncien la finalización del proceso.

---

## 4. Guía de Código y Estructuras HTML/CSS Canónicas

A continuación se documentan las estructuras de marcado canónicas para los componentes implementados y parciales:

### 4.1 Estructura canónica de `StatusBadge`
```html
<!-- Variante Advertencia / Espera -->
<span class="status-badge status-badge--warning">
  <span class="status-badge__dot" aria-hidden="true">
    <span class="status-badge__ring"></span>
  </span>
  <span class="status-badge__label">Pendiente de transporte</span>
</span>

<!-- CSS Normativo -->
<style>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: var(--font-size-xs);
  font-weight: 500;
  line-height: 1;
}

.status-badge--warning {
  background-color: var(--color-warning-surface);
  color: var(--color-warning-text);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-badge__dot {
  position: relative;
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #D97706;
}

.status-badge__ring {
  position: absolute;
  top: -2px;
  left: -2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #D97706;
  opacity: 0.4;
  animation: badge-pulse 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes badge-pulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.2); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .status-badge__ring {
    display: none; /* Anillo eliminado, dot sólido permanece visible */
  }
}
</style>
```

### 4.2 Estructura canónica de `DocumentBlueprint`
```html
<article class="document-blueprint" aria-label="Albarán de expedición hortofrutícola">
  <header class="document-blueprint__header">
    <div class="document-blueprint__meta">
      <span class="document-blueprint__tag">ALBARÁN</span>
      <span class="document-blueprint__code">ALB-2026-0481</span>
    </div>
    <span class="status-badge status-badge--success">Completado</span>
  </header>
  
  <dl class="document-blueprint__grid">
    <div class="document-blueprint__field">
      <dt class="document-blueprint__label">Producto</dt>
      <dd class="document-blueprint__val">Pimiento California Rojo</dd>
    </div>
    <div class="document-blueprint__field">
      <dt class="document-blueprint__label">Peso Neto</dt>
      <dd class="document-blueprint__val font-mono">18.420 kg</dd>
    </div>
    <div class="document-blueprint__field">
      <dt class="document-blueprint__label">Bultos</dt>
      <dd class="document-blueprint__val font-mono">1.200 cajas</dd>
    </div>
    <div class="document-blueprint__field document-blueprint__field--highlight">
      <dt class="document-blueprint__label">Transporte</dt>
      <dd class="document-blueprint__val">Pendiente asignación</dd>
    </div>
  </dl>
  
  <footer class="document-blueprint__footer">
    <span class="document-blueprint__disclaimer">Datos simulados con fines ilustrativos</span>
  </footer>
</article>
```

---

## 5. Prevención de Inestabilidad Visual (CLS) en Componentes

Para garantizar empíricamente que la interacción con los componentes no genere saltos de maquetación (CLS = 0):

1. **Bordes preasignados:** Si un componente adquiere un borde de color en `:hover` o `:focus-visible`, la regla CSS base debe declarar un borde idéntico transparente (`border: 1px solid transparent;`) o resolver el efecto mediante `box-shadow: inset 0 0 0 1px var(--color-brand)`. Prohibido añadir `border: 1px solid ...` exclusivamente en el estado hover.
2. **Dimensiones de iconos fijas:** Todos los contenedores de iconos dentro de botones, listas (`HumanChecklist`) y badges deben definir explícitamente `width`, `height` y `flex-shrink: 0` para evitar deformaciones mientras las fuentes o SVG se renderizan.
3. **Manejo de texto dinámico o colapsable:** Los componentes con paneles expandibles (`Faq`, detalles de blueprint) deben animarse mediante transformaciones de altura coordinadas con Web Animations API o CSS grid (`grid-template-rows: 0fr` a `1fr`), evitando cambios bruscos de dimensiones en el flujo de documento.
