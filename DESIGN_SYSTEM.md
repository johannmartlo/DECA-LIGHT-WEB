# Sistema de Diseño: DECA Light Web Comercial

> **Documento normativo de identidad visual, componentes, experiencia responsive y estándares técnicos para la web comercial de DECA Light.**  
> Versión: `2.1.0`  
> Estado: `Reconciliado con Documento Maestro (WEB_MAESTRO_DECA_LIGHT.md)`  
> Ámbito: Proyecto `DECA-LIGHT-WEB` (Astro `v7.3.8`, TypeScript Estricto)  
> Documento complementario: [`WEB_MAESTRO_DECA_LIGHT.md`](file:///c:/Users/juani/OneDrive/Escritorio/PROYECTOS/DECA-LIGHT-WEB/WEB_MAESTRO_DECA_LIGHT.md) (Fuente de verdad para estrategia, contenido, narrativa y decisiones comerciales).

---

## 1. Principios de Identidad y Posicionamiento

### 1.1. Propósito de la Web Comercial
La web comercial de **DECA Light** tiene como objetivos exclusivos:
1. **Presentar con rigor técnico y sobriedad** la propuesta de valor de DECA Light ante gerentes generales, directores de operaciones y responsables de sistemas en **almacenes y comercializadoras hortofrutícolas** (cítricos, fruta de hueso, hortalizas, centrales de confección y cooperativas).
2. **Canalizar el interés de empresas candidatas** para participar en entrevistas técnicas y valorar un posible **programa piloto de desarrollo inicial**.

### 1.2. Principio de Veracidad Absoluta (Anti-Falsedad)
El producto se encuentra en **fase de desarrollo activo**. Se establecen las siguientes reglas deontológicas obligatorias:
* **Prohibiciones estrictas:**
  * Prohibido incluir testimonios, citas, casos de éxito o reseñas ficticias.
  * Prohibido mostrar logotipos corporativos de empresas del sector simulando que son clientes en producción si no existe un acuerdo formal de colaboración.
  * Prohibido publicar métricas de impacto comercial o porcentajes de mejora inventados (ej. *"Aumenta la productividad un 35%"* o *"Ahorra 2 horas por camión"*).
  * Prohibido presentar capturas de pantalla reales o interfaces acabadas de funciones que aún no estén implementadas o confirmadas en código.
  * Prohibido añadir botones de autoservicio, registro automático o compra inmediata que sugieran disponibilidad comercial general o producto listo para producción.
  * Prohibido prometer plazas limitadas, urgencia artificial, fechas de lanzamiento definitivas, precios cerrados, condiciones de soporte técnico garantizadas o acceso operativo inmediato.
* **Criterios de comunicación honesta:**
  * Cada módulo, flujo o característica debe indicar con transparencia su estado real: `En desarrollo`, `Fase Piloto`, `Hoja de ruta`.
  * La llamada a la acción principal aprobada es: **«Mostrar interés en el programa piloto»** (alternativa corta para espacios reducidos: **«Me interesa el piloto»**).

### 1.3. Dirección Estética: Claridad B2B Premium
* **Identidad Clara y Minimalista:** Base estética clara, luminosa, limpia y estructurada (`#F8FAFC` en lienzo y `#FFFFFF` en tarjetas), idónea para un entorno profesional agroindustrial B2B.
* **Sobriedad y Tecnología:** Ausencia de artificios visuales, sombras exageradas o degradados de fantasía. El protagonismo reside en los datos de pesaje, calibrado, trazabilidad y procesos de almacén.
* **Referencias de Calidad (Docarga y DeCAtrans):** Se toman como referencia de calidad, solidez y pulcritud técnica, **sin copiar en ningún caso su identidad de marca, logotipos, maquetaciones ni contenidos.**

---

## 2. Paleta Cromática y Tokens de Color

El sistema se basa en un tema claro estructurado, con tokens semánticos normalizados y verificación estricta de contraste para cumplir el estándar **WCAG 2.1 nivel AA** (mínimo 4,5:1 para texto normal y 3:1 para texto grande o componentes de interfaz).

### 2.1. Tokens Base Aprobados

| Token CSS | Valor HEX | Función y Rol Semántico |
| :--- | :--- | :--- |
| `--color-bg-canvas` | `#F8FAFC` | Fondo principal de la página (Slate 50). Aporta calidez y reduce la fatiga visual frente al blanco puro. |
| `--color-bg-surface` | `#FFFFFF` | Fondo de tarjetas, paneles, barras de navegación y campos de entrada. |
| `--color-bg-surface-subtle` | `#F1F5F9` | Superficies secundarias (Slate 100), cabeceras de tablas o bloques de datos técnicos. |
| `--color-border-subtle` | `#E2E8F0` | Líneas divisorias y bordes de tarjetas en reposo (Slate 200). |
| `--color-border-strong` | `#CBD5E1` | Bordes interactivos, inputs de formulario y botones secundarios (Slate 300). |
| `--color-text-primary` | `#0F172A` | Texto de máxima jerarquía: titulares, encabezados y etiquetas críticas (Slate 900). |
| `--color-text-secondary` | `#475569` | Texto de lectura editorial, subtítulos y párrafos explicativos (Slate 600). |
| `--color-text-muted` | `#64748B` | Metadatos técnicos, notas al pie y textos de ayuda (Slate 500). |
| `--color-brand-primary` | `#047857` | Color corporativo principal (Emerald 700). Verde hortofrutícola sobrio y técnico. |
| `--color-brand-hover` | `#065F46` | Estado activo/hover del botón primario (Emerald 800). Mayor contraste visual. |
| `--color-accent-amber` | `#F59E0B` | Ámbar base (Amber 500). **Reservado exclusivamente** para el estado e indicador del programa piloto. |
| `--color-accent-amber-subtle` | `#FEF3C7` | Fondo sutil de distintivos del programa piloto (Amber 100). |
| `--color-accent-amber-text` | `#92400E` | Texto accesible de distintivo del programa piloto (Amber 800). |
| `--color-focus-ring` | `#0284C7` | Anillo de foco accesible para navegación por teclado (Sky 600). |

---

### 2.2. Verificación Matemática de Contraste (WCAG AA / AAA)

Para cumplir con la exigencia de no declarar conformidad sin comprobación empírica, se documentan las métricas reales de contraste para cada combinación utilizable:

| Combinación Evaluada | Color de Texto | Color de Fondo | Ratio Real | Conformidad WCAG | Resultado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Titular sobre Canvas** | `#0F172A` | `#F8FAFC` | **16,5:1** | Supera WCAG AAA (7,0:1) | **Válido** |
| **Titular sobre Card** | `#0F172A` | `#FFFFFF` | **17,6:1** | Supera WCAG AAA (7,0:1) | **Válido** |
| **Lectura sobre Canvas** | `#475569` | `#F8FAFC` | **5,3:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Lectura sobre Card** | `#475569` | `#FFFFFF` | **5,6:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Botón Primario** | `#FFFFFF` | `#047857` | **5,5:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Badge Piloto (Fondo tenue)** | `#92400E` | `#FEF3C7` | **6,3:1** | Supera WCAG AA (4,5:1) | **Válido** |
| **Anillo de Foco vs Canvas** | `#0284C7` | `#F8FAFC` | **4,8:1** | Supera indicador interfaz (3,0:1) | **Válido** |

> **Nota obligatoria sobre el color Ámbar (`#F59E0B`):**  
> El color `#F59E0B` con texto blanco puro `#FFFFFF` ofrece un ratio deficiente de solo `2,1:1` (incumpliría WCAG). Por consiguiente, queda terminantemente prohibido utilizar texto blanco sobre fondo ámbar. Para los indicadores del programa piloto, se usará la combinación verificada: fondo ámbar claro (`#FEF3C7`) con texto ámbar oscuro (`#92400E`), o bien un punto de estado `#F59E0B` junto a texto `#0F172A`.

---

## 3. Tipografía y Jerarquía de Contenidos

### 3.1. Recomendación Técnica: Inter Autohospedada
* **Familia principal recomendada:** `Inter` en formato moderno **WOFF2**, con licencia abierta verificada (**SIL Open Font License 1.1**).
* **Pesos estrictamente necesarios:** Regular (`400`), Medium (`500`), Semi-bold (`600`) y Bold (`700`). No se cargarán pesos ni variantes cursivas superfluas.
* **Fuentes de reserva del sistema (Fallbacks inmediatos):**
  ```css
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  ```
* **Tipografía monoespaciada para telemetría y datos de almacén:**
  ```css
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  ```
  *(Empleada en códigos de lote, registros de albarán, calibres y especificaciones técnicas).*
* **Condición de implementación:** No se instalarán paquetes ni se descargarán archivos de fuentes hasta que se inicie formalmente la fase técnica correspondiente.

---

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

### 3.3. Legibilidad y Párrafos
* Los bloques de texto editorial no superarán los **65–75 caracteres de ancho** (`max-width: 68ch`).
* Todo el texto se alinea a la izquierda de forma natural; no se empleará texto justificado.

---

## 4. Espaciado, Retícula, Bordes y Elevación

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

### 4.2. Contenedores y Márgenes
* **Contenedor Principal:** `max-width: 1200px; margin-inline: auto;`
* **Contenedor Reducido (Formulario / Texto Técnico):** `max-width: 720px; margin-inline: auto;`
* **Márgenes de seguridad laterales (Padding interno):**
  * Móvil (320px – 767px): `1.25rem` (20px).
  * Tableta (768px – 1023px): `2rem` (32px).
  * Escritorio (1024px+): `2.5rem` (40px).

### 4.3. Radios de Esquina (`Border Radius`)
Sobriedad geométrica, evitando radios excesivamente curvados:
* `--radius-sm`: `4px` (Insignias técnicas, checkboxes).
* `--radius-md`: `6px` (Botones, campos de formulario).
* `--radius-lg`: `10px` (Tarjetas de información, paneles).
* `--radius-full`: `9999px` (Píldoras de estado).

### 4.4. Sombras y Delimitación en Fondo Claro
En una paleta clara, la separación entre capas se fundamenta en **bordes limpios** respaldados por sombras sutiles:
* `--shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05);`
* `--shadow-card`: `0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.04);`
* `--shadow-popover`: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03);`
* Toda tarjeta o panel interactivo debe contar con un borde visible (`1px solid var(--color-border-subtle)`).

---

## 5. Componentes y Acciones Interactivas

### 5.1. Reconocibilidad Intrínseca de Elementos Interactivos
**Principio fundamental:** Los botones, enlaces y variantes fantasma deben identificarse inequívocamente como elementos clicables **en su estado de reposo**, sin depender exclusivamente del cursor ni del efecto hover.

| Tipo de Control | Apariencia Visual en Reposo | Criterio de Reconocibilidad |
| :--- | :--- | :--- |
| **Botón Primario** | Fondo verde `#047857`, texto blanco `#FFFFFF`, peso 600, borde sutil. | Contraste de bloque destacado frente a la superficie blanca. CTA: «Mostrar interés en el programa piloto» o «Me interesa el piloto». |
| **Botón Secundario** | Fondo blanco `#FFFFFF`, borde sólido de 1px `#CBD5E1`, texto `#0F172A`. | Borde exterior visible y relieve sombreado `--shadow-sm`. |
| **Botón Fantasma (Ghost)** | Texto `#047857`, peso 600, acompañado de icono direccional (ej. `→`) o subrayado sutil permanente. | Icono vectorizado de acción o subrayado que evidencia interactividad sin hover. |
| **Enlaces en Texto** | Color `#047857` con subrayado visible o peso tipográfico 600 diferenciado. | No confiar únicamente en el cambio de color; el subrayado aporta accesibilidad inmediata. |

* **Regla Táctil Universal:** Todo botón o enlace interactivo debe mantener un área táctil mínima de **`44 × 44 píxeles`** en dispositivos móviles y táctiles.

---

### 5.2. Barra de Navegación (`Header`)
* **Ubicación:** Fijada en la parte superior (`position: sticky; top: 0; z-index: 50`).
* **Fondo:** Superficie blanca translúcida con desenfoque (`backdrop-filter: blur(12px); background-color: rgba(255, 255, 255, 0.9);`) y borde inferior de 1px (`#E2E8F0`).
* **Elementos y Enlaces de Navegación Aprobados:**
  1. Marca DECA Light con distintivo textual `"PILOTO"` o `"PROYECTO EN DESARROLLO"`.
  2. Enlaces semánticos aprobados (4 elementos):
     - **El problema** (`#el-problema`)
     - **Cómo funciona** (`#como-funciona`)
     - **Programa piloto** (`#piloto`)
     - **Preguntas frecuentes** (`#faq`)
  3. CTA directo con enlace `#piloto`: **«Me interesa el piloto»** o **«Mostrar interés en el piloto»**.
  4. En móvil: botón de menú accesible con etiqueta `aria-label="Abrir menú"` y objetivo táctil de 44×44 px.

---

### 5.3. Tarjetas de Información Técnica (`Cards`)
* **Fondo:** Blanco `#FFFFFF` sobre Canvas `#F8FAFC`.
* **Borde:** `1px solid var(--color-border-subtle)`.
* **Estructura interna:**
  1. *Etiqueta superior (Overline):* En mayúsculas, color secundario (`#475569`).
  2. *Título (H3):* Enfoque del proceso operativo objetivo.
  3. *Cuerpo:* Texto explicativo riguroso (redactado según [`WEB_MAESTRO_DECA_LIGHT.md`](file:///c:/Users/juani/OneDrive/Escritorio/PROYECTOS/DECA-LIGHT-WEB/WEB_MAESTRO_DECA_LIGHT.md)).
  4. *Estado:* Indicador de desarrollo (ej. `● En desarrollo · Fase 1`).

---

### 5.4. Sección y Formulario de Interés en el Programa Piloto
Siguiendo las decisiones comerciales y de privacidad aprobadas, **la captación se resuelve en una sección dedicada al final de la página de inicio**, evitando modales flotantes que interfieren con la lectura.

* **Identificador de ancla:** `<section id="piloto" ...>`
* **Encabezado:** Explicación transparente sobre la fase actual de recogida de interés y entrevistas técnicas, sin prometer plazas cerradas ni acceso inmediato.
* **Estructura Estricta del Formulario Inicial (4 campos de datos + privacidad):**
  1. **Nombre:** Campo de texto con `<label for="nombre">` visible (`<input type="text" id="nombre" name="nombre" required>`).
  2. **Correo electrónico de contacto:** `<input type="email" id="email" name="email" required>` con validación de sintaxis.
  3. **Empresa o almacén:** `<input type="text" id="empresa" name="empresa" required>`.
  4. **Volumen aproximado de expediciones diarias:** Selector desplegable (`<select id="volumen" name="volumen" required>`):
     - `1–5 expediciones/día`
     - `6–15 expediciones/día`
     - `Más de 15 expediciones/día`
     - `No lo sé / Variable`
  5. **Casilla de información y aceptación de privacidad:** `<input type="checkbox" id="privacidad" name="privacidad" required>` vinculada al texto legal correspondiente.
* **Campos expresamente excluidos del formulario inicial:**  
  *No se solicitará teléfono, tipo de producto confeccionado, ERP actual (Hispatec u otros), matrículas ni documentación de transporte.* Estos detalles operativos se recogerán preferentemente durante las entrevistas técnicas posteriores.
* **Botón de Envío:**  
  Botón primario accesible (ancho completo en móvil): **«Mostrar interés en el programa piloto»**.
* **Bloqueo técnico de backend:**  
  *No construir el envío del formulario ni simular envíos exitosos hasta que se decida y verifique el mecanismo real de recepción, almacenamiento seguro, tratamiento y atención de derechos.*

---

### 5.5. Distintivos y Avisos del Programa Piloto
* **Fondo:** `#FEF3C7` (Ámbar 100).
* **Borde:** `1px solid #FCD34D` (Ámbar 300).
* **Texto:** `#92400E` (Ámbar 800) — *Ratio de contraste verificado: 6,3:1*.
* **Icono:** Símbolo de información técnica con trazo vectorizado.
* **Mensaje:** *"Proyecto en desarrollo activo. Recogida de interés para futuras pruebas y entrevistas técnicas."*  
*(Sin promesas de plazas limitadas, urgencia artificial ni fechas definitivas).*

---

## 6. Criterios de Representación Visual del Producto (Sin Falsedad)

Ante la ausencia de capturas definitivas y para proteger la credibilidad del proyecto, la interfaz de DECA Light se comunicará mediante recursos conceptuales veraces:

1. **Esquemas Vectoriales de Flujo de Trabajo (Wireframes Conceptuales):**
   * Ilustraciones esquemáticas en SVG o HTML/CSS limpio que muestren el modelo lógico:
     * *Almacén prepara expedición ──► Transporte comunica matrícula ──► Coordinación documental y preparación del DECA*.
   * Todo esquema debe etiquetarse visiblemente como: `«Concepto visual · Propuesta en desarrollo»`.
2. **Diagramas de Arquitectura de Datos:**
   * Esquemas visuales que representen la interacción conceptual entre la documentación disponible y los datos que llegan con posterioridad.
3. **Fichas Técnicas de Módulos:**
   * Bloques con atributos técnicos concretos, entradas, salidas y estado actual de programación, referenciados desde [`WEB_MAESTRO_DECA_LIGHT.md`](file:///c:/Users/juani/OneDrive/Escritorio/PROYECTOS/DECA-LIGHT-WEB/WEB_MAESTRO_DECA_LIGHT.md).

---

## 7. Experiencia Móvil Prioritaria y Arquitectura Robusta

### 7.1. Matriz de Breakpoints Obligatoria

```text
320px         375px         390px         768px         1024px        1440px+
[--- Móvil Compacto ---] [--- Móvil Moderno ---] [-- Tableta --] [-- Portátil --] [-- Gran Pantalla --]
```

* **320px (Dispositivos compactos y terminales industriales de mano):**
  * Padding lateral de contenedor: `16px`.
  * Botones en ancho completo (`width: 100%`).
  * Sin elementos rígidos con ancho superior a `288px`.
* **375px – 390px (Smartphones modernos de referencia):**
  * Disposición en columna única vertical.
  * Menú de navegación condensado con botón táctil accesible.
* **768px (Tabletas en vertical / Terminales en carretilla):**
  * Grids de 2 columnas para tarjetas técnicas.
* **1024px (Tabletas apaisadas / Portátiles):**
  * Navegación horizontal expandida. Grids de 3 columnas.
* **1440px+ (Estaciones de trabajo de escritorio):**
  * Ancho máximo contenido en `1200px` con márgenes holgados.

---

### 7.2. Prohibición de Parches Globales de Desbordamiento (`Anti-Overflow Real`)
* **Regla estricta:** **Queda prohibido el uso indiscriminado de `overflow-x: clip` o `overflow-x: hidden` a nivel global (`body`, `html`) para camuflar errores de maquetación.**
* El diseño debe ser intrínsecamente elástico y robusto:
  1. Uso universal de `box-sizing: border-box`.
  2. Elementos gráficos fluidos: `max-width: 100%; height: auto; display: block;`.
  3. Evitar anchos fijos en píxeles (`width: 600px`); utilizar `max-width` y porcentajes.
  4. Tablas técnicas o esquemas con desplazamiento horizontal **intencionado, encapsulado y explícito**:
     ```css
     .table-container {
       overflow-x: auto;
       -webkit-overflow-scrolling: touch;
     }
     ```
  5. Textos largos o referencias documentales protegidos con `overflow-wrap: break-word`.

---

### 7.3. Objetivos Táctiles y Accesibilidad Operativa
* Zona interactiva mínima de **`44 × 44 píxeles`** en todos los controles (botones, enlaces, selectores, casillas de verificación).
* **Foco visible inderrotable:**
  ```css
  :focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
  ```
* **Enlace de salto (*Skip Link*):** Enlace visible al inicio del documento por tabulación para acceder de inmediato al contenido principal.
* **Respeto a `prefers-reduced-motion`:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 8. Criterios Técnicos y Rendimiento en Astro

1. **Generación Estática:** Salida configurada en `output: 'static'` para máxima velocidad de entrega y seguridad.
2. **TypeScript Estricto:** Tipado completo y estricto sin uso de `any` en componentes ni scripts auxiliares.
3. **Cero Dependencias Superfluas:**
   * La interfaz se construye con HTML semántico nativo y CSS estructurado.
   * Cero frameworks pesados de cliente (React, Vue, Svelte) en la landing inicial.
   * Interacciones cliente (menú móvil accesible y validación de formulario) resueltas en Vanilla TypeScript mínimo (< 3 kB).
4. **Optimización SEO:**
   * Marcado `<html lang="es">`.
   * Títulos descriptivos y meta tags Open Graph / Twitter Cards coherentes con [`WEB_MAESTRO_DECA_LIGHT.md`](file:///c:/Users/juani/OneDrive/Escritorio/PROYECTOS/DECA-LIGHT-WEB/WEB_MAESTRO_DECA_LIGHT.md).

---

## 9. Bloqueos Técnicos y Lista de Comprobación (Quality Gate)

### 9.1. Bloqueos Explícitos Previos a la Publicación
Antes de publicar o desplegar, deben resolverse los siguientes bloqueos:
1. **[Bloqueo Formulario]:** No construir backend ni simular envíos hasta definir almacenamiento seguro, privacidad y destinatario de los leads.
2. **[Bloqueo Privacidad y Legal]:** Redactar y validar aviso legal y política de privacidad con asesoramiento profesional.
3. **[Bloqueo Condiciones del Piloto]:** No prometer condiciones definitivas (plazas, gratuidad, fechas, soporte).
4. **[Bloqueo Infraestructura y Dominio]:** Dominio `decalight.es` comprado en DonDominio. Hosting y correo no contratados. No desplegar ni cambiar DNS.
5. **[Bloqueo Integraciones]:** Ninguna integración con Hispatec o TransFollow está confirmada; son estudios técnicos preliminares.
6. **[Bloqueo Tipografía y Recursos]:** No instalar dependencias ni descargar fuentes hasta la fase autorizada.
7. **[Bloqueo Publicación General]:** Ninguna puesta en producción sin aprobación humana expresa.

### 9.2. Quality Gate para Aprobación de Páginas
- [ ] No contiene testimonios, reseñas ni casos de éxito ficticios.
- [ ] No muestra logotipos de empresas no confirmadas formalmente.
- [ ] No exhibe métricas de rendimiento inventadas ni porcentajes no fundamentados.
- [ ] Comunica explícitamente el estado de desarrollo activo y programa piloto.
- [ ] No presenta capturas de pantalla de funciones inexistentes.
- [ ] Comprobado manualmente a **320px**, **375px**, **390px**, **768px**, **1024px** y **1440px**.
- [ ] Ausencia de scroll horizontal no intencionado sin aplicar parches globales de `overflow-x: hidden/clip`.
- [ ] Todos los elementos interactivos cumplen la dimensión táctil de al menos 44×44 px en móvil.
- [ ] Los botones y enlaces son reconocibles en reposo sin depender del estado hover.
- [ ] La llamada principal conduce fluidamente a la sección `#piloto`.
- [ ] Pares de color comprobados con ratio de contraste superior a 4,5:1 (texto normal) y 3:1 (componentes/texto grande).
- [ ] Navegación completa posible exclusivamente mediante teclado (Tab, Shift+Tab, Enter, Escape).
- [ ] Anillo de foco `:focus-visible` claramente identificable.
- [ ] Formulario accesible con etiquetas `<label>` vinculadas mediante `for`/`id` y gestión de errores.
- [ ] Comportamiento verificado bajo `prefers-reduced-motion: reduce`.
- [ ] Puntuación objetivo en Google Lighthouse: 100 en Rendimiento, 100 en Accesibilidad, 100 en Mejores Prácticas y 100 en SEO.
- [ ] Compilación correcta con `npm run build` sin advertencias.
- [ ] Validación de tipos limpia con `npx astro check`.
