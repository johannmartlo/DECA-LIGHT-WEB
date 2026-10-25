# Sistema de Diseño: DECA Light Web Comercial

> **Documento normativo de identidad visual, componentes, experiencia responsive, motion design y estándares técnicos para la web comercial de DECA Light.**  
> Versión consolidada: `3.1.0` (25-oct-2026: lanzamiento comercial)  
> Estado: `Consolidado y reconciliado con Documento Maestro (WEB_MAESTRO_DECA_LIGHT.md v1.0.0)`  
> Ámbito: Proyecto `DECA-LIGHT-WEB` (Astro `v7.3.8`, TypeScript Estricto)  
> Documentos normativos complementarios:
> - [`WEB_MAESTRO_DECA_LIGHT.md`](WEB_MAESTRO_DECA_LIGHT.md) (Estrategia, narrativa, posicionamiento y restricciones comerciales).
> - [`COMPONENT_LIBRARY.md`](COMPONENT_LIBRARY.md) (Catálogo visual, anatomía y estados de componentes gráficos).
> - [`MOTION_GUIDELINES.md`](MOTION_GUIDELINES.md) (Estándares de animación, curvas, accesibilidad de movimiento y rendimiento).

> **Decisión de lanzamiento (25-oct-2026, responsable del producto):** la web deja de presentar DECA Light como proyecto en desarrollo o programa piloto. El producto se presenta como **disponible**, con **demostración y puesta en marcha guiada**. La llamada a la acción aprobada es **«Solicitar demostración»** (variantes: «Solicitar una demostración», «Contactar»). Siguen vigentes TODAS las prohibiciones de veracidad: nada de testimonios, logotipos, métricas, «homologado», «certificado», «cumple el 100 % de la normativa» ni «preparado para eFTI» sin acreditarlo. Ver también `WEB_MAESTRO_DECA_LIGHT.md` §0.

---

## 1. Principios de Identidad y Posicionamiento

### 1.1. Propósito de la Web Comercial
La web comercial de **DECA Light** tiene como objetivos exclusivos:
1. **Presentar con rigor técnico, sobriedad y transparencia** la propuesta de valor de DECA Light ante gerentes generales, directores de operaciones y responsables de administración en **almacenes y comercializadoras hortofrutícolas** (cítricos, fruta de hueso, hortalizas, centrales de confección y cooperativas).
2. **Canalizar solicitudes de demostración** de empresas interesadas y acompañarlas en la **puesta en marcha** del servicio.

### 1.2. Principio de Veracidad Absoluta (Anti-Falsedad)
El producto está **disponible** con demostración y puesta en marcha guiada (decisión de 25-oct-2026). Se establecen las siguientes reglas deontológicas obligatorias e inquebrantables:
* **Prohibiciones estrictas:**
  * Prohibido incluir testimonios, citas, casos de éxito o reseñas ficticias.
  * Prohibido mostrar logotipos corporativos de empresas del sector simulando que son clientes en producción si no existe un acuerdo formal de colaboración.
  * Prohibido publicar métricas de impacto comercial o porcentajes de mejora inventados (ej. *"Aumenta la productividad un 35%"* o *"Ahorra 2 horas por camión"*).
  * Prohibido presentar capturas de pantalla reales o interfaces acabadas de funciones que aún no estén implementadas o confirmadas en código.
  * Prohibido añadir botones de autoservicio, registro automático o compra inmediata mientras no existan en el producto (el alta es guiada por el equipo).
  * Prohibido prometer plazas limitadas, urgencia artificial, fechas de lanzamiento definitivas, precios cerrados, condiciones de soporte técnico garantizadas o acceso operativo inmediato.
* **Criterios de comunicación honesta:**
  * Solo se presentan como disponibles las funciones que existen en el producto (ver la matriz de capacidades de `WEB_MAESTRO_DECA_LIGHT.md` §6). Lo que no exista se presenta como `Hoja de ruta` o no se menciona.
  * La llamada a la acción principal aprobada es: **«Solicitar demostración»** (variantes: «Solicitar una demostración», «Contactar»).
  * Prohibido afirmar «homologado», «certificado por el Ministerio», «cumple el 100 % de la normativa» o «preparado para eFTI» sin acreditación documentada.

### 1.3. Dirección Artística: Precisión Logística B2B
Definimos la personalidad de DECA Light bajo la tríada:  
> **«Precisión Logística B2B · Sobriedad Editorial · Honestidad Tecnológica»**

* **Claridad y Luminosidad:** Base estética clara, limpia y estructurada (`#F8FAFC` en lienzo y `#FFFFFF` en tarjetas), idónea para un entorno profesional agroindustrial y de muelle de carga.
* **Sobriedad Tecnológica:** Ausencia de artificios visuales, ilustraciones 3D flotantes o degradados de fantasía. El protagonismo reside en los datos de pesaje, expedición, albaranes, matrículas y trazabilidad.
* **Referencias de Excelencia Destiladas:** Se toman principios de diseño de referencias líderes (Stripe en precisión tabular y micro-sombras, Linear en contraste y tipografía monoespaciada funcional, Docarga y Ramp en claridad de estados de transporte y pipelines, Retool en honestidad de diagramas), adaptándolos a una identidad visual propia y genuinamente hortofrutícola.

### 1.4. Decálogo Anti-Plantilla SaaS Genérica
Para asegurar que DECA Light no se perciba como una plantilla prediseñada:
1. **Cero ilustraciones 3D de personajes abstractos**, manos flotantes o metáforas visuales infantiles.
2. **Cero degradados multicolores estridentes** (violeta/magenta/azul eléctrico) en titulares.
3. **Cero estadísticas no auditadas.**
4. **Cero simulaciones de software inexistente:** Las ilustraciones de la herramienta son esquemas, no capturas; no deben mostrar funciones que el producto no tenga.
5. **Cero tarjetas con bordes redondeados excesivos** (máximo `10px` para tarjetas, manteniendo la disciplina geométrica).
6. **Composición asimétrica funcional:** Huir de la clásica simetría rígida de 50/50 mediante el patrón *Split-Flow* (5fr editorial / 7fr datos).
7. **Tipografía monoespaciada con función real:** No como adorno cosmético, sino para códigos de albarán, matrículas, bultos y horas.
8. **Bicolor semántico estricto:** El verde (`#047857`) representa datos de almacén y validación; el ámbar (`#F59E0B`/`#92400E`) representa transporte pendiente y anticipación.
9. **Movimiento con propósito:** El movimiento nunca es decorativo; guía el orden de lectura y la comprensión del flujo asíncrono.
10. **Respeto a la realidad de planta:** La web habla el lenguaje del almacén (calibres, cartas de porte, CMR, muelles), no jerga publicitaria vacía.

---

## 2. Paleta Cromática y Tokens Semánticos

El sistema se basa en un tema claro estructurado, con tokens semánticos normalizados y verificación estricta de contraste para cumplir el estándar **WCAG 2.1 nivel AA** (mínimo 4,5:1 para texto normal y 3:1 para componentes de interfaz y texto grande).

### 2.1. Tokens Base y Semánticos Aprobados

| Token CSS | Valor HEX / RGBA | Función y Rol Semántico |
| :--- | :--- | :--- |
| `--color-bg-canvas` | `#F8FAFC` | Fondo principal de la página (Slate 50). Aporta calidez y reduce la fatiga visual. |
| `--color-bg-surface` | `#FFFFFF` | Fondo de tarjetas, paneles, barras de navegación y campos de entrada. |
| `--color-bg-surface-subtle`| `#F1F5F9` | Superficies secundarias (Slate 100), cabeceras de tablas o metadatos técnicos. |
| `--color-border-subtle` | `#E2E8F0` | Líneas divisorias y bordes de tarjetas en reposo (Slate 200). |
| `--color-border-strong` | `#CBD5E1` | Bordes interactivos, inputs de formulario y botones secundarios (Slate 300). |
| `--color-text-primary` | `#0F172A` | Texto de máxima jerarquía: titulares, encabezados y cifras críticas (Slate 900). |
| `--color-text-secondary` | `#475569` | Texto de lectura editorial, subtítulos y párrafos explicativos (Slate 600). |
| `--color-text-muted` | `#64748B` | Metadatos técnicos, notas al pie y etiquetas secundarias (Slate 500). |
| `--color-brand-primary` | `#047857` | Color corporativo principal (Emerald 700). Verde hortofrutícola sobrio y técnico. |
| `--color-brand-hover` | `#065F46` | Estado activo/hover del botón primario (Emerald 800). Mayor contraste visual. |
| `--color-brand-subtle` | `rgba(4, 120, 87, 0.08)` | Fondo sutil de validaciones completadas y checks de conciliación. |
| `--color-accent-amber` | `#F59E0B` | Ámbar base (Amber 500). Punto indicador de estado pendiente o piloto. |
| `--color-accent-amber-subtle`| `#FEF3C7`| Fondo sutil para distintivos y bloques de transporte pendiente (Amber 100). |
| `--color-accent-amber-text` | `#92400E` | Texto accesible sobre fondo ámbar claro (Amber 800). |
| `--color-accent-amber-border`| `#FCD34D`| Borde para campos o tarjetas con datos de transporte pendientes (Amber 300). |
| `--color-focus-ring` | `#0284C7` | Anillo de foco accesible para navegación por teclado (Sky 600). |

---

### 2.2. Verificación Matemática de Contraste (WCAG AA / AAA)

| Combinación Evaluada | Color de Texto | Color de Fondo | Ratio Real | Conformidad WCAG | Resultado |
| :--- | :--- | :--- | :---: | :--- | :---: |
| **Titular sobre Canvas** | `#0F172A` | `#F8FAFC` | **16,5:1** | Supera WCAG AAA (7,0:1) | **Válido** |
| **Titular sobre Card** | `#0F172A` | `#FFFFFF` | **17,6:1** | Supera WCAG AAA (7,0:1) | **Válido** |
| **Lectura sobre Canvas** | `#475569` | `#F8FAFC` | **5,3:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Lectura sobre Card** | `#475569` | `#FFFFFF` | **5,6:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Botón Primario** | `#FFFFFF` | `#047857` | **5,5:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Badge Piloto (Fondo tenue)**| `#92400E` | `#FEF3C7` | **6,3:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Anillo de Foco vs Canvas** | `#0284C7` | `#F8FAFC` | **4,8:1** | Supera indicador interfaz (3,0:1) | **Válido** |

> **Regla de Accesibilidad Cromática Obligatoria:**  
> Queda terminantemente prohibido utilizar texto blanco `#FFFFFF` sobre fondo ámbar `#F59E0B` (ratio deficiente de `2,1:1`). Para comunicar estados pendientes o avisos de piloto, se empleará exclusivamente fondo `#FEF3C7` con texto `#92400E`, o bien un punto dot `#F59E0B` acompañado de texto `#0F172A`.  
> Además, ningún estado debe depender exclusivamente del color: todo indicador debe acompañarse de texto descriptivo explícito (ej. «Pendiente», «Completado», «En revisión»).

---

## 3. Tipografía, Jerarquía y Retícula

### 3.1. Familias Tipográficas
* **Familia Principal Sans:**
  ```css
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  ```
  *(Recomendación para fase de producción: autohospedar `Inter` en formato WOFF2 con pesos 400, 500, 600 y 700).*
* **Familia Monoespaciada Tabular:**
  ```css
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
  ```
  *(Obligatoria para códigos de expedición `EXP-0842`, albaranes `ALB-0842`, matrículas `7421-KMB`, marcas de hora y cifras).*

### 3.2. Escala Tipográfica Modular (Responsive)

| Nivel | Móvil (<768px) | Escritorio (>=1024px) | Peso | Interlineado | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero)** | 2.25rem (36px) | 3.25rem (52px) | 700 / Bold | 1.15 | -0.025em |
| **H1 (Página)** | 1.875rem (30px) | 2.5rem (40px) | 700 / Bold | 1.2 | -0.02em |
| **H2 (Sección)** | 1.5rem (24px) | 2rem (32px) | 600 / Semi | 1.25 | -0.015em |
| **H3 (Bloque / Card)** | 1.25rem (20px) | 1.375rem (22px) | 600 / Semi | 1.3 | -0.01em |
| **H4 (Subtítulo)** | 1.125rem (18px) | 1.125rem (18px) | 500 / Med | 1.4 | 0 |
| **Body Large** | 1.125rem (18px) | 1.125rem (18px) | 400 / Regular | 1.6 | 0 |
| **Body Base (Lectura)**| 1rem (16px) | 1rem (16px) | 400 / Regular | 1.6 | 0 |
| **Body Small** | 0.875rem (14px) | 0.875rem (14px) | 400 / Regular | 1.5 | +0.01em |
| **Caption / Overline** | 0.75rem (12px) | 0.75rem (12px) | 600 / Semi | 1.4 | +0.05em (Mayúsculas) |

* **Ancho de línea editorial:** Máximo 65–70 caracteres (`max-width: 65ch` a `68ch`) para preservar el confort visual.

---

## 4. Retícula, Espaciado, Bordes y Profundidad

### 4.1. Escala de Espaciado Modular (Base 4px / 8px)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### 4.2. Contenedores
* **Contenedor Principal (`.container`):** `max-width: 1200px; margin-inline: auto;`
* **Contenedor Reducido (`.container-narrow`):** `max-width: 720px; margin-inline: auto;` (utilizado en Formulario Piloto y FAQ).
* **Márgenes de seguridad laterales (Padding interno):**
  * Móvil (320px – 767px): `1.25rem` (20px).
  * Tableta (768px – 1023px): `2rem` (32px).
  * Escritorio (1024px+): `2.5rem` (40px).

### 4.3. Radios de Esquina (`Border Radius`)
* `--radius-sm`: `4px` (Insignias técnicas, checkboxes, tags).
* `--radius-md`: `6px` (Botones, campos de formulario, bloques checklist).
* `--radius-lg`: `10px` (Tarjetas de información, blueprints conceptuales).
* `--radius-full`: `9999px` (Píldoras de estado).

### 4.4. Sistema de Superficies, Bordes y Sombras
La jerarquía de profundidad se articula en **tres planos planos y limpios**:
1. **Plano 0 (Lienzo):** `#F8FAFC` (Canvas base).
2. **Plano 1 (Superficies y Tarjetas):** `#FFFFFF` con borde `1px solid var(--color-border-subtle)` y sombra sutil `--shadow-card`:
   ```css
   --shadow-card: 0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.04);
   ```
3. **Plano 2 (Micro-elementos interactivos en hover):**  
   Elevación táctil contenida a **-2px** exclusivamente en dispositivos con cursor preciso:
   ```css
   @media (hover: hover) and (pointer: fine) {
     .interactive-card:hover {
       transform: translateY(-2px);
       border-color: rgba(4, 120, 87, 0.25);
       box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 10px 20px -3px rgba(15, 23, 42, 0.06);
     }
   }
   ```
   * **Prohibición técnica:** Queda prohibido el uso de transformaciones 3D con perspectiva rotacional (`rotateX`, `rotateY`), ya que distorsionan los textos técnicos monoespaciados e interfieren con el apilamiento de elementos anclados (`position: sticky`).

---

## 5. Estados Visuales de la Información Documental

Para reflejar fielmente la operativa de expedición sin inducir a error:

| Estado Documental | Tratamiento Visual | Borde / Fondo | Dot Indicador | Significado Operativo |
| :--- | :--- | :--- | :--- | :--- |
| **Consolidado (Almacén)** | Ficha blanca sobria, metadatos oscuros, check verde `✓`. | Borde `#CBD5E1`<br/>Fondo `#FFFFFF` | Verde fijo `#047857` | Carga pesada, albarán emitido y documentación base disponible en el muelle. |
| **Pendiente (Transporte)** | Ficha con acento ámbar, badge `Puede estar pendiente`, icono `⋯`. | Borde `#FCD34D`<br/>Fondo `#FFFBEB` | Ámbar `#F59E0B` (con pulso calmo opcional) | Mercancía lista en muelle a la espera de confirmación de vehículo y matrícula. |
| **Conciliación Humana** | Fila de checklist destacada con acento verde claro, icono de doble check. | Borde `rgba(4, 120, 87, 0.35)`<br/>Fondo `#F0FDF4` | Verde fijo `#047857` | Asociación de albarán y matrícula verificada por el personal administrativo. |
| **Resultado Preparado** | Bloque verde esmeralda de alto contraste con texto blanco. | Sin borde exterior<br/>Fondo `#047857` | Blanco `#FFFFFF` | Documentación organizada y dispuesta para revisión previa a la firma del DECA. |

---

## 6. Principios de Motion Design y Coordinación

*(Especificación exhaustiva en [`MOTION_GUIDELINES.md`](MOTION_GUIDELINES.md)).*

### 6.1. Tokens de Movimiento Aprobados
```css
/* Curvas normativas */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* Entradas, aperturas y revelados */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* Movimientos cíclicos continuos */

/* Duraciones normativas */
--duration-fast: 120ms;       /* Microinteracciones inmediatas */
--duration-normal: 200ms;     /* Desplegables, menús, chevrons */
--duration-reveal-fast: 320ms;/* Revelado editorial ágil */
--duration-reveal: 450ms;     /* Entrada de tarjetas estructurales */
```

### 6.2. Reglas Maestras de Animación
1. **Un Solo Ciclo de Ejecución:** Toda animación vinculada a scroll mediante `IntersectionObserver` se ejecuta una única vez por visita (`observer.unobserve`). Prohibido reiniciar animaciones al subir y bajar.
2. **Anti-FOUC Sincrónico:** El contenido en el primer pliegue se marca como visible sincrónicamente antes de activar la compuerta global `.reveal-ready`.
3. **Respeto a `prefers-reduced-motion`:** Se elimina el movimiento espacial no esencial (`transform: none`, animaciones `none !important`), pero **se preservan íntegros los estados visuales y la legibilidad**: los puntos indicadores y badges pendientes permanecen visibles sin parpadear.
4. **Degradación Segura sin JavaScript (No-JS):** El estado base en CSS puro garantiza visibilidad al 100% (`opacity: 1; transform: none`). Ningún contenido queda oculto si falla o se desactiva JavaScript.

---

## 7. Experiencia Responsive y Accesibilidad Operativa

### 7.1. Matriz de Breakpoints Obligatoria
```text
320px         375px         390px         768px         1024px        1440px+
[--- Móvil Compacto ---] [--- Móvil Moderno ---] [-- Tableta --] [-- Portátil --] [-- Gran Pantalla --]
```
- **320 px (Terminales industriales compactos de muelle):** Padding lateral de `16px`. Botones a ancho completo (`width: 100%`). Cero desbordamiento horizontal.
- **375 px – 390 px (Smartphones modernos):** Cascada vertical ordenada. Retrasos de animación reducidos a $\le 90\text{ ms}$.
- **768 px (Tabletas en vertical / Terminales de carretilla):** Grids de 2 columnas. Menú colapsado accesible.
- **1024 px (Tabletas apaisadas / Laptops de oficina):** Grids asimétricos *Split-Flow*. Columna editorial sticky funcional (`top: 104px`).
- **1440 px+ (Puestos de administración en escritorio):** Contenedor central contenido en `1200px` con holgura visual.

### 7.2. Calidad de Maquetación y Anti-Overflow Real
- **Prohibición terminante:** **Prohibido el uso indiscriminado de `overflow-x: hidden` o `overflow-x: clip` en `body` o `html` para tapar fallos de maquetación.**
- Todo elemento debe ser intrínsecamente flexible (`box-sizing: border-box`, `max-width: 100%`).
- Todo texto con identificadores técnicos debe incorporar `overflow-wrap: break-word`.
- Las animaciones de líneas deben utilizar `transform: scaleX(...)` sobre bases transparentes sin alterar las dimensiones geométricas de la caja, garantizando **estabilidad de maquetación (CLS = 0)**.

### 7.3. Objetivos Táctiles y Navegación por Teclado
- **Dianas táctiles mínimas:** Todos los botones, enlaces, campos de formulario y conmutadores deben garantizar un área táctil mínima de **`44 × 44 píxeles`** en pantallas móviles.
- **Foco visible accesible:**
  ```css
  :focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
  ```
- **Enlace de salto (*Skip Link*):** Presente en la primera posición del DOM para saltar directamente al contenido principal (`#el-problema` o `#main-content`).

---

## 8. Bloqueos Técnicos y Quality Gate Previo a Publicación

### 8.1. Bloqueos Técnicos Activos
1. **[Formulario]:** El formulario de `#piloto` está activo (Cloudflare Pages Functions + D1, ver README). No se cambia su tratamiento de datos sin actualizar la política de privacidad.
2. **[Integraciones]:** Se puede decir que DECA Light importa el informe de expediciones exportado de Hispatec y lee cartas de porte en PDF. No afirmar integración directa (API) con Hispatec ni con TransFollow.
3. **[Despliegue y DNS]:** La web se publica en Cloudflare Pages desde la rama de producción (ver README). No modificar registros DNS ni publicar en producción sin autorización expresa del responsable del producto.
4. **[Bloqueo Dependencias]:** No instalar frameworks JS pesados ni librerías de animación externas.

### 8.2. Quality Gate para Aprobación Visual
- [ ] No contiene testimonios, reseñas ni casos de éxito ficticios.
- [ ] No muestra logotipos de empresas sin acuerdo formal.
- [ ] No exhibe métricas de rendimiento inventadas ni porcentajes no fundamentados.
- [ ] No presenta como disponible ninguna función que no exista en el producto; sin «homologado», «certificado» ni «preparado para eFTI» sin acreditar.
- [ ] No presenta capturas de software simuladas como reales.
- [ ] Comprobado empíricamente a **320px**, **375px**, **390px**, **768px**, **1024px** y **1440px**.
- [ ] Ausencia de scroll horizontal no intencionado sin aplicar parches globales en `body`/`html`.
- [ ] Todos los elementos interactivos cumplen la dimensión táctil de al menos 44×44 px en móvil.
- [ ] Los botones y enlaces son reconocibles en reposo sin depender del hover.
- [ ] Ratios de contraste $\ge 4,5:1$ en texto y $\ge 3:1$ en interfaz verificados.
- [ ] Navegación completa posible exclusivamente mediante teclado (Tab, Shift+Tab, Enter, Escape).
- [ ] Anillo de foco `:focus-visible` claramente identificable.
- [ ] Formulario accesible con etiquetas `<label>` vinculadas mediante `for`/`id`.
- [ ] Comportamiento verificado bajo `prefers-reduced-motion: reduce` (sin pérdida de información ni indicadores de estado).
- [ ] Comportamiento verificado con JavaScript desactivado (No-JS).
- [ ] Compilación estática limpia con `npm run build` sin errores de Astro ni TypeScript.
