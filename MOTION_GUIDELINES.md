# DECA Light — Directrices Maestras de Motion Design

**Versión:** 1.0.0  
**Fecha de consolidación:** 14 de octubre de 2026  
**Estado:** Documento normativo de arquitectura de movimiento y microinteracciones  
**Uso:** Fuente de verdad para el diseño, implementación y auditoría de movimiento en DECA Light  
**Documentos vinculados:** [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (v3.0.0), [`WEB_MAESTRO_DECA_LIGHT.md`](WEB_MAESTRO_DECA_LIGHT.md) (v1.0.0), [`COMPONENT_LIBRARY.md`](COMPONENT_LIBRARY.md) (v1.0.0)  

---

## 1. Filosofía y Principios Rectores del Movimiento

### 1.1 El rol del movimiento en DECA Light
El Motion Design en DECA Light no es un adorno cosmético ni un ejercicio de pirotecnia visual. Su función exclusiva es **guiar la atención cognitiva, clarificar la asincronía de los flujos de expedición y transmitir una sensación de precisión de ingeniería de software B2B**.

La experiencia estética se inspira en la sobriedad técnica de **Linear** y **Docarga**, la claridad financiera de **Stripe** y **Ramp**, y el orden documental de **Origin**, adaptados rigurosamente a la realidad operativa del almacén hortofrutícola.

### 1.2 Principios cardinales
1. **Intencionalidad funcional:** Toda animación debe responder a una de tres preguntas:
   - *¿Hacia dónde debe mirar el usuario?* (Jerarquía de lectura).
   - *¿Qué proceso temporal se está modelando?* (Convergencia asíncrona de datos).
   - *¿El sistema ha respondido a mi acción?* (Feedback interactivo).
2. **Respeto a la quietud y sobriedad:** Los elementos en reposo permanecen quietos. No se permiten oscilaciones infinitas, rebotes elásticos ni sacudidas que distraigan de la lectura técnica.
3. **Compositor-first (Rendimiento estricto):** Priorizar propiedades que el motor del navegador pueda gestionar en el hilo de composición (`transform` y `opacity`).
   > **Nota técnica rigurosa:** El uso de `transform` y `opacity` **no garantiza mágicamente 0 repaints ni aceleración por GPU universal**. La promoción indiscriminada a capas de GPU (`will-change: transform`) consume memoria de vídeo (VRAM) y puede penalizar el rendimiento en dispositivos móviles modestos. La asignación de capas debe ser acotada y validada empíricamente en DevTools (panel *Rendering > Paint flashing* y panel *Layers*).
4. **Estabilidad dimensional (CLS = 0):** Ninguna animación de entrada o interacción de hover debe alterar la geometría ni empujar los elementos adyacentes del layout.
5. **Accesibilidad sin pérdida de información:** En `prefers-reduced-motion: reduce`, se suprimen los desplazamientos espaciales, pero los estados operativos (badges ámbar, marcas de verificación, textos) se mantienen 100% visibles y estáticos.
6. **Mejora progresiva y resiliencia No-JS:** El contenido HTML es visible de inmediato por defecto (`opacity: 1; transform: none;`). Los estados iniciales ocultos sólo se activan si JavaScript confirma que el entorno soporta `IntersectionObserver` y añade la clase `html.reveal-ready`.

---

## 2. Escala Normativa de Tokens de Movimiento

Los tokens de movimiento están unificados en `src/styles/global.css` y deben emplearse sin excepción. Queda prohibido hardcodear curvas bézier o duraciones ad-hoc en componentes individuales.

### 2.1 Curvas de aceleración (Easings)
```css
:root {
  /* Salida suave editorial: máxima desaceleración final, sin rebote */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* Transición simétrica entre estados controlados */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Aceleración inicial para salidas rápidas de pantalla */
  --ease-in: cubic-bezier(0.32, 0, 0.67, 0);

  /* Curva de pulso sutil para indicadores de atención */
  --ease-pulse: cubic-bezier(0.4, 0, 0.6, 1);
}
```

- `--ease-out`: Curva canónica para el 90% de las animaciones de entrada, scroll reveals y elevaciones en hover. Proporciona una entrada enérgica que frena con suavidad orgánica sin oscilar.
- `--ease-in-out`: Utilizada en bucles continuos (pulsos de badges, ondas SVG) y aperturas de acordeón.

### 2.2 Escala de duraciones
```css
:root {
  /* Microinteracciones inmediatas (hover de enlaces, toggle rápido) */
  --duration-fast: 120ms;

  /* Transiciones estándar de interfaz (hover de tarjetas, foco, botones) */
  --duration-normal: 200ms;

  /* Movimientos espaciales medios (elevación de tarjetas, cambio de tabs) */
  --duration-medium: 300ms;

  /* Revelados editoriales y secuencias narrativas de scroll */
  --duration-slow: 500ms;

  /* Secuencias complejas orquestadas (entrada inicial del Hero) */
  --duration-entrance: 800ms;
}
```

---

## 3. Catálogo de Familias de Animación

Cada familia de animación responde a un patrón de interacción específico y cuenta con un estado de implementación contrastado con el código fuente.

---

### Familia 1: Revelado Editorial de Scroll (Scroll Reveals)
- **Estado en código:** `IMPLEMENTADO` (`src/components/Problem.astro`, `src/components/HowItWorks.astro`)
- **Propósito:** Presentar el contenido editorial de forma secuencial y coordinada a medida que el usuario recorre la página, reforzando la jerarquía de lectura.
- **Mecanismo técnico:**
  - Coordinado mediante `IntersectionObserver` nativo en el cliente.
  - La compuerta CSS `.reveal-on-scroll` solo oculta elementos si la raíz porta `html.reveal-ready`.
  - Umbrales de intersección: `threshold: 0.15` en desktop, `threshold: 0.08` en móvil.
  - Unobserver automático tras activarse (`observer.unobserve(entry.target)`) para liberar memoria.
- **Parámetros espaciales:**
  - Desplazamiento vertical máximo en desktop: `translateY(16px)` a `translateY(24px)`.
  - Desplazamiento vertical en móvil (<768px): Reducido a `translateY(10px)` para evitar sensación de lentitud o saltos bruscos.
  - Duración: `var(--duration-slow)` (450ms – 550ms).
  - Curva: `var(--ease-out)`.
  - Escalonado (Stagger): 60ms – 100ms entre elementos hermanos de una misma fila (ej. las 3 fricciones en Problem).

```css
/* Regla canónica de Scroll Reveal */
html.reveal-ready .reveal-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
  will-change: opacity, transform;
}

html.reveal-ready .reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

### Familia 2: Secuencia de Entrada del Hero (Blueprint Sequence)
- **Estado en código:** `IMPLEMENTADO` (`src/components/Hero.astro`, `src/styles/global.css`)
- **Propósito:** Orquestar los primeros 1.000 ms tras la carga de la página, presentando primero la propuesta tipográfica y posteriormente el modelo técnico convergente.
- **Cronología de la secuencia:**
  - `0 ms`: Render inicial limpio.
  - `80 ms`: Entrada de la insignia de estado superior (`StatusBadge`).
  - `160 ms`: Entrada del H1 principal y kicker (`opacity: 0 → 1`, `translateY: 16px → 0`).
  - `260 ms`: Entrada del párrafo explicativo y botón primario CTA.
  - `400 ms`: Entrada del marco del diagrama SVG (`ProcessDiagram`).
  - `600 ms`: Dibujo de trazados conectores y activación del dot ámbar de transporte.
  - `1.500 ms`: **Retirada de la compuerta `.hero-motion`**. Las propiedades de transición se eliminan para que ningún contenido quede dependiente de animaciones o estados congelados.
- **Garantía de contenido visible:** Si JavaScript falla, se bloquea o tarda más de lo previsto, los estilos base garantizan que todo el contenido del Hero es legible sin opacidades residuales.

---

### Familia 3: Conexiones SVG y Flujo Continuo
- **Estado en código:** `IMPLEMENTADO` (`Hero.astro`, `HowItWorks.astro`)
- **Propósito:** Simular el flujo de datos entre el ERP del almacén y el transportista a lo largo de cables o conductos técnicos.
- **Mecanismo técnico:**
  - Animación del trazo SVG mediante manipulación de `stroke-dasharray` y `stroke-dashoffset`.
  - Para bucles de flujo: `animation: flow-pulse 3s linear infinite;`.
  - Indicadores de pulso en nodos: Anillo concéntrico animado con `transform: scale(1.8)` y `opacity: 0`.
- **Restricción de rendimiento:** No aplicar más de 2 bucles SVG simultáneos en viewport activo para evitar consumo sostenido de CPU/batería en portátiles y móviles.

---

### Familia 4: Microinteracciones y Estados de Superficie (Hover / Focus)
- **Estado en código:** `IMPLEMENTADO` (Global)
- **Propósito:** Confirmar físicamente la interactividad de botones, enlaces y tarjetas.
- **Reglas de elevación:**
  - Elevación de tarjeta (`DocumentBlueprint`, `EntityCard`):
    - `transform: translateY(-2px);`
    - `box-shadow: var(--shadow-md);`
    - Duración: `var(--duration-normal)` (200ms).
    - Curva: `var(--ease-out)`.
  - **PROHIBICIÓN ESTRICTA:** Queda prohibido aplicar rotaciones en perspectiva 3D (`rotateX`, `rotateY`, `perspective`), sacudidas o inclinaciones tipo "tilt" de videojuegos. El tono de DECA Light es de software corporativo sobrio.
- **Botón primario esmeralda:**
  - Hover: Fondo conmuta de `#047857` a `#065F46` con transición de 150ms.
  - Active: `transform: scale(0.98)` para dar sensación táctil de pulsación.
  - Focus-visible: Anillo exterior `#0284C7` de 2px con offset de 2px.

---

### Familia 5: Acordeón Accesible de Preguntas Frecuentes (WAAPI)
- **Estado en código:** `IMPLEMENTADO` (`src/components/Faq.astro`)
- **Propósito:** Expandir y colapsar respuestas en la sección FAQ con fluidez cinemática perfecta y sin saltos bruscos de scroll (layout thrashing).
- **Mecanismo técnico:**
  - Basado en el elemento nativo `<details>` y `<summary>` de HTML5.
  - Animación gestionada mediante la **Web Animations API (WAAPI)** nativa en cliente.
  - Flujo de apertura:
    1. Se calcula la altura real de contenido (`scrollHeight`).
    2. Se ejecuta animación de altura: `height: [headerHeight, totalHeight]` con curva `cubic-bezier(0.16, 1, 0.3, 1)` y duración 250ms.
    3. Simultáneamente, el icono chevron rota suavemente 180º (`transform: rotate(180deg)`).
  - Flujo de cierre: Animación inversa hacia `headerHeight`, tras lo cual se retira el atributo `open` nativo.
- **Resiliencia:** Si JavaScript está desactivado, el elemento `<details>` se abre y cierra de forma instantánea mediante el comportamiento estándar del navegador, sin romper el contenido.

---

### Familia 6: Orquestación Scroll-Linked y Parallax Sutil
- **Estado en código:** `PROPUESTO` (Planificado para Fase 3)
- **Propósito:** Acompañar el desplazamiento vertical del usuario con micro-variaciones de velocidad entre el fondo técnico y las tarjetas documentales.
- **Límites estrictos:**
  - Desplazamiento máximo diferencial: **15px** a lo largo de un scroll de 500px (factor de escala < 0.03).
  - Prohibido distorsionar la posición de botones o enlaces cliqueables.
  - Desactivado automáticamente en pantallas de ancho inferior a 1024px para evitar desincronización táctil.

---

## 4. Estrategia Canónica de Accesibilidad (`prefers-reduced-motion`)

La reducción de movimiento es una directriz de accesibilidad de obligado cumplimiento (WCAG 2.2 Criterio 2.3.3 Nivel AAA / Criterio 2.2.2 Nivel AA).

### 4.1 El error del "reseteo universal destructivo"
Muchos sistemas aplican erróneamente la siguiente regla:
```css
/* ⚠️ ANTIPATRÓN PROHIBIDO EN DECA LIGHT ⚠️ */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
**Por qué está prohibido:** Esta regla provoca que elementos que dependen de transiciones de opacidad para consolidarse o indicadores de estado con animaciones cíclicas (como el dot ámbar de transporte) parpadeen incontrolablemente, queden invisibles o colapsen en un estado intermedio indefinido.

### 4.2 La solución normativa de DECA Light
En `prefers-reduced-motion: reduce`, el sistema debe:
1. **Eliminar traslaciones espaciales:** Todos los desplazamientos (`translateY`, `translateX`, `scale`) se fijan en su posición final neutral (`transform: none !important;`).
2. **Hacer transiciones de visibilidad instantáneas:** La opacidad pasa inmediatamente a `1` sin esperas.
3. **Preservar la visibilidad de estados:** Los dots pulsantes eliminan su anillo exterior de pulso (`display: none;`), pero el punto sólido central **permanece visible al 100%**, con su color funcional intacto.
4. **Respetar el scroll nativo:** La propiedad `scroll-behavior: smooth` conmuta a `scroll-behavior: auto`.

```css
/* Implementación canónica en global.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* Restauración explícita de visibilidad y posición final */
  html.reveal-ready .reveal-on-scroll,
  .hero-badge,
  .hero-title,
  .hero-subtitle,
  .hero-actions,
  .hero-diagram {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  /* Preservación de indicadores de estado */
  .status-badge__dot,
  .pulse-dot {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .status-badge__ring,
  .pulse-ring {
    display: none !important; /* Suprime la oscilación, conserva el dato */
  }
}
```

---

## 5. Arquitectura de Mejora Progresiva (Estrategia No-JS)

La web debe ser 100% legible y navegable si JavaScript está deshabilitado por directiva de seguridad del navegador o falla durante la descarga.

### 5.1 Regla del estado inicial limpio
- **CSS por defecto:** En el archivo CSS compilado, ningún elemento del DOM nace con `opacity: 0` o `visibility: hidden`.
- **Activación condicionada:** La clase `reveal-ready` solo es inyectada en la etiqueta `<html>` por un script inline de bloqueo mínimo ubicado al inicio del `<body>`:

```html
<!-- Inyección temprana de compuerta No-JS en Layout.astro -->
<script is:inline>
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
  }
</script>
```

- **Efecto garantizado:** Si JavaScript no se ejecuta, `html.reveal-ready` nunca existe en el DOM. Por tanto, las reglas de ocultamiento `.reveal-on-scroll { opacity: 0; }` nunca se aplican y el visitante ve todo el contenido maquetado con normalidad.

---

## 6. Rendimiento, Capas y Criterios de Auditoría

Para asegurar 60 FPS estables durante el scroll en dispositivos móviles y de sobremesa:

### 6.1 Auditoría técnica en DevTools
Toda implementación de animación debe ser validada mediante:
1. **Rendering > Paint Flashing:** Al hacer scroll en la página, **no deben observarse destellos verdes masivos de repintado** sobre bloques de texto o tarjetas estáticas. Los únicos destellos tolerados son los de elementos interactivos en el momento exacto de su activación.
2. **Layers Panel:** Comprobar que no se han creado docenas de capas de renderizado innecesarias. Cada capa independiente en GPU consume memoria. Las tarjetas de la rejilla deben residir en la capa principal hasta que reciben una elevación por hover.
3. **Performance Monitor:** Mantener la tasa de refresco por encima de 58 FPS en scroll continuo a 1440px y 390px.
4. **Prueba de estrangulamiento de CPU (CPU 4x Slowdown):** Verificar que con CPU limitada, el scroll no presenta bloqueos del hilo principal superiores a 50 ms.

---

## 7. Matriz de Estados de Implementación

| Familia de Animación | Componente / Ubicación | Estado Actual | Próximo Paso Previsto |
|---|---|---|---|
| **Secuencia de Entrada** | `Hero.astro` | `IMPLEMENTADO` | Modularizar compuerta al extraer `ProcessDiagram`. |
| **Scroll Reveal Editorial** | `Problem.astro` | `IMPLEMENTADO` | Ajustar stagger fino tras feedback de usuario. |
| **Scroll Reveal Flujo** | `HowItWorks.astro` | `IMPLEMENTADO` | Optimizar coordenadas de stems conectores. |
| **Acordeón WAAPI** | `Faq.astro` | `IMPLEMENTADO` | Ninguno (comportamiento cerrado y validado). |
| **Pulsos continuos SVG** | `Hero.astro` | `IMPLEMENTADO` | Evaluar pausa cuando el Hero sale del viewport (`IntersectionObserver`). |
| **Hover de tarjetas 2px** | Global | `IMPLEMENTADO` | Extender a futuros componentes del catálogo. |
| **Scroll Parallax Sutil** | Toda la landing | `PROPUESTO` | Evaluar en Fase 3 tras validación de contenidos. |
| **Checklists secuenciales**| `HowItWorks.astro` | `IMPLEMENTADO` | Añadir delay escalonado en aparición de checks verdes. |
