# Reporte de Errores E2E — DistriSam Make Up

**Fecha:** 2026-06-19  
**Servidor:** Astro dev server  
**Método:** Pruebas visuales, de animaciones y navegación E2E

---

## Error 1: Imágenes incorrectas en tarjetas de productos (Página Principal)

**Página:** `/` (Inicio)  
**Sección:** "Nuestras Colecciones Estrella"  
**Descripción:** Las 4 tarjetas de productos destacados muestran imágenes incorrectas o faltantes:

- "Kit Vitamina C + Hialurónico" → No muestra imagen (solo texto "Ver Catálogo")
- "Paleta Libro KYC 48 Tonos" → No muestra imagen (solo texto "Ver Catálogo")
- "Libro Brochas x 24 Unidades" → Muestra imagen de otro producto
- "Pijama Encaje Fino Rosa" → Muestra imagen de otro producto

**Impacto:** La sección de productos destacados se ve rota e incompleta.

---

## Error 2: Imágenes desalineadas en el Catálogo

**Página:** `/catalogo`  
**Descripción:** Las imágenes de los productos no corresponden con los nombres:

- "Kit Bioaqua Camelia" muestra la imagen de "Crema Facial Vitamina C"
- "Crema Facial Vitamina C" muestra la imagen de "Tónico de Ceramidas"
- Las imágenes son flyers promocionales completos en lugar de fotos limpias de producto

**Impacto:** Confusión visual, el cliente no puede identificar correctamente los productos.

---

## Error 3: Logo roto en el Footer

**Páginas afectadas:** `/`, `/catalogo`, `/quienes-somos`, `/contacto`  
**Descripción:** El logo del footer aparece como un círculo blanco vacío en lugar de mostrar la imagen de DistriSam Make Up.

**Impacto:** El footer se ve incompleto y poco profesional.

---

## Error 4: Espacios en blanco excesivos (Página Principal)

**Página:** `/` (Inicio)  
**Descripción:** Hay espacios en blanco muy grandes entre secciones, especialmente:

- Entre la navegación y el contenido "De corazón a corazón"
- Entre la sección "Filosofía" y "Nuestras Colecciones Estrella"
- Entre "Nuestra promesa contigo" y "Preguntas Frecuentes"

**Impacto:** La página se siente vacía y mal estructurada visualmente.

---

## Error 5: Grid de 3 columnas roto (Sección "Nuestra promesa contigo")

**Página:** `/` (Inicio)  
**Descripción:** La tarjeta "Resultados Reales" aparece sola a la izquierda, con espacio vacío a la derecha. El grid debería mostrar 3 columnas pero solo muestra 1.5.

**Impacto:** Layout roto, se ve desbalanceado.

---

## Resumen de Pruebas

| Página                  | Estado              | Errores                                             |
| ----------------------- | ------------------- | --------------------------------------------------- |
| `/` (Inicio)            | ❌ Con errores      | Imágenes incorrectas, espacios en blanco, grid roto |
| `/catalogo`             | ❌ Con errores      | Imágenes desalineadas                               |
| `/quienes-somos`        | ✅ OK               | Sin errores visuales                                |
| `/contacto`             | ⚠️ Logo footer roto | Logo del footer no carga                            |
| `/links`                | ✅ OK               | Sin errores                                         |
| `/pagina-que-no-existe` | ✅ OK               | Página 404 funciona correctamente                   |

**Errores de JavaScript:** 0  
**Errores de consola:** 0  
**Total de errores encontrados:** 5

---

# Reporte de Auditoría E2E #2 — DistriSam Make Up (Mobile + Desktop)

**Fecha:** 2026-06-22
**Servidor:** Astro dev server (`pnpm dev`) en `http://localhost:4321/`
**Método:** Inspección visual + análisis de DOM + pruebas de interacción (Playwright/Chromium)
**Alcance:** Recorrido completo de las 7 rutas en mobile (375×812, iPhone X) y verificación cruzada en desktop. Revisión de código fuente de `ContactForm.svelte`, `astro.config.mjs`, `package.json` y los componentes del footer.
**Rutas auditadas:** `/`, `/main`, `/modelo`, `/catalogo`, `/quienes-somos`, `/contacto`, `404`.

> **Convención de severidad**
>
> - 🔴 **CRÍTICO** — Falla funcional, pérdida de datos, daño reputacional, riesgo legal.
> - 🟠 **ALTO** — UX rota, contenido engañoso, accesibilidad bloqueante.
> - 🟡 **MEDIO** — Inconsistencias, estética mejorable, deuda técnica.
> - 🟢 **BAJO** — Nice-to-have, pulido visual.

---

## 1. Errores Visuales y de Layout

### 🔴 V-01 — Carousel de "Lo más amado" mide 2304px y desborda el viewport

- **Ruta:** `/main`
- **Sección:** `.routine-section` → `.carousel-track`
- **Síntoma:** El track tiene `scrollWidth = 2304px` mientras el viewport es 375px. El padre lo recorta con `overflow:hidden`, lo que visualmente recorta el contenido en lugar de permitir scroll horizontal táctil.
- **Impacto:** En mobile el usuario solo ve una porción de un producto y no hay indicadores (dots) ni flechas visibles. No se puede intuir que es scrollable.
- **Por qué importa:** Falla el patrón de discovery de producto destacado. Se sospecha que el CSS asume desktop-first y nadie probó la versión mobile.

### 🔴 V-02 — Botón "Suscribirse" del newsletter se desborda 28px en /catalogo

- **Ruta:** `/catalogo` (mobile)
- **Síntoma:** `document.scrollWidth = 388px` vs `clientWidth = 360px`. El culpable es el `<button>` "Suscribirse" del formulario del newsletter (x=228, w=160, right=388).
- **Impacto:** Scroll horizontal accidental, layout roto. Es típico bug de botón que ignora el padding del contenedor.
- **Adicional:** Algunas cards de producto estilo "promo banner" (las más anchas) también se recortan en el borde derecho.

### 🟠 V-03 — Grid "Nuestra promesa contigo" de 3 columnas se ve mal en mobile

- **Ruta:** `/main` (mobile) y `/`
- **Síntoma:** Las 3 cards (Piel Segura / Resultados Reales / Envíos Confiables) se apilan, pero el espaciado y la altura del SVG/imagen de la tercera card dejan un hueco visual notable.
- **Impacto:** Layout se ve inconsistente entre cards. No llega a ser roto, pero pierde la simetría buscada.

### 🟠 V-04 — Logo del footer aparece como círculo blanco/transparente

- **Ruta:** `/catalogo`, `/quienes-somos`, `/contacto`
- **Síntoma:** El `<img>` del logo en el footer se renderiza como un círculo vacío. La referencia apunta a un asset que no existe o tiene un nombre mal escrito (`Logo Footer` vs el archivo real).
- **Impacto:** Footer descuidado, sensación de proyecto a medio terminar.
- **Nota:** En `/` y `/main` sí se ve bien, sugiriendo rutas de asset distintas o un componente Footer duplicado.

### 🟠 V-05 — Textarea de /contacto demasiado pequeña en mobile

- **Ruta:** `/contacto` (mobile)
- **Síntoma:** El `<textarea id="message">` renderiza con apenas 100px de alto. La etiqueta "Tu mensaje" termina cubriendo el campo visible.
- **Impacto:** El cliente no puede escribir un mensaje legible. UX rota en el único canal de contacto que la marca ofrece.

### 🟡 V-06 — Cards de producto "estilo promo banner" se cortan en mobile

- **Ruta:** `/catalogo`
- **Síntoma:** Algunas cards horizontales se extienden más allá del viewport y muestran solo la mitad derecha.
- **Impacto:** Inventario del catálogo parcialmente invisible. El cliente pierde producto.

### 🟡 V-07 — Año "© 2030" en 3 footers (año futuro)

- **Rutas:** `/catalogo`, `/quienes-somos`, `/contacto`
- **Síntoma:** El copyright dice "© 2030", un año que aún no ocurre.
- **Impacto:** Error de marca — da impresión de plantilla sin personalizar, o peor, de marca desactualizada. Probablemente sea un placeholder que se quedó.

---

## 2. Errores de UX / Funcionalidad

### 🔴 U-01 — Formulario de contacto completamente FALSO (no envía nada)

- **Ruta:** `/contacto` → `src/components/ContactForm.svelte`
- **Síntoma:** El handler `handleSubmit()` (líneas 10-26) **no hace ninguna llamada a backend**. Solo:
  1. Cambia `isSubmitting = true`
  2. Ejecuta `await new Promise(resolve => setTimeout(resolve, 1500))` ← simulación
  3. Cambia `showSuccess = true`
  4. Resetea los inputs
  5. Después de 5s, oculta el mensaje
- **Impacto:** **GRAVE**. El cliente ve un "¡Mensaje enviado con éxito!" y la empresa nunca recibe nada. Es un canal de venta invisiblemente roto. Cualquier consulta comercial se pierde.
- **Pruebas realizadas:** Llené los 5 campos, hice click en "Enviar Mensaje", observé durante >5s: aparece brevemente un mensaje verde de éxito, los campos se vacían, **no hay request HTTP saliente** (verificado en network tab).
- **Riesgo legal:** Si un cliente reclama "les escribí y nunca me contestaron", la marca no tiene evidencia ni el mensaje.

### 🔴 U-02 — Botones "Buscar" y "Carrito" en el header NO funcionan

- **Ruta:** `/main` y `/modelo` (mobile y desktop)
- **Síntoma:** Los botones `button[aria-label="Buscar"]` y `button[aria-label="Carrito"]` están renderizados, tienen icono y tooltip, pero **no tienen handler**. Hice click forzado en ambos:
  - La URL no cambia
  - No se abre ningún drawer/modal/dropdown
  - No hay cambio visual de "activo"
- **Impacto:** Engaño al usuario. Una tienda online con un ícono de carrito que no abre nada rompe la confianza inmediatamente. Peor en mobile, donde el carrito es el embudo de compra principal.
- **Nota:** El botón "Menú" SÍ funciona correctamente (abre drawer con 6 links).

### 🔴 U-03 — Paginación del catálogo es DECORATIVA

- **Ruta:** `/catalogo` (desktop y mobile)
- **Síntoma:** Hay botones "1", "2", "3" con estado visual `active` que cambia al hacer click, pero:
  - El contador sigue mostrando "Mostrando 1-14 de 14 productos" en TODAS las páginas
  - Los productos visibles no cambian
  - No hay filtrado, no hay fetch, no hay paginación real
- **Impacto:** Falsa affordance. El cliente cree que hay más productos cuando en realidad solo hay 14. Engaño funcional.

### 🟠 U-04 — Link "Inicio" del footer lleva a la página equivocada

- **Rutas:** `/catalogo`, `/quienes-somos`, `/contacto`
- **Síntoma:** El link "Inicio" del footer apunta a `/` (la versión link-in-bio), no a `/main` (la home real de la tienda).
- **Impacto:** Quien hace click en "Inicio" desde el footer aterriza en una página de links sociales, no en el home de la marca. Confuso y rompe la navegación.

### 🟠 U-05 — Botón "Ver Catálogo" de las cards en /main no es clickable

- **Ruta:** `/main`
- **Síntoma:** Las 4 cards de "Lo más amado" tienen un texto "Ver Catálogo" pero la card entera no es un enlace. No hay handler en el botón.
- **Impacto:** El CTA explícito de la sección principal no funciona. Fricción de compra.

### 🟡 U-06 — Inputs del formulario no tienen atributo `name`

- **Ruta:** `/contacto` → `ContactForm.svelte`
- **Síntoma:** Los `<input>` solo tienen `id` y `bind:value`. Si en el futuro se conecta a un backend con `FormData`, el form enviará campos sin nombre. También rompe autofill del navegador y análisis de analytics.
- **Impacto:** Deuda técnica. Si arreglan U-01 sin agregar `name`, el form no funcionará.

### 🟡 U-07 — No hay feedback accesible al fallar el envío

- **Ruta:** `/contacto`
- **Síntoma:** Si la simulación terminara en error, no hay manejo. Hoy todo "funciona" porque es fake, pero el esqueleto no contempla estado de error.
- **Impacto:** Deuda técnica pre-acoplamiento a backend real.

### 🟡 U-08 — Filtros del sidebar del catálogo no se probaron a fondo (mobile)

- **Ruta:** `/catalogo` (mobile)
- **Síntoma:** En mobile los filtros de categoría/precio/marca existen pero no se pudo verificar que filtren. Mismo patrón que U-03: UI presente, lógica probablemente ausente.

---

## 3. Vulnerabilidades de Seguridad

### 🔴 S-01 — Formulario de contacto sin protección anti-spam

- **Ruta:** `/contacto` → `ContactForm.svelte`
- **Síntoma:** No hay honeypot field, no hay captcha, no hay rate limiting visible.
- **Impacto:** Cuando se conecte a un backend real, este form será un imán para spam y bots. Sin validación server-side adicional, cualquier atacante puede inyectar payloads XSS a través del campo `message` (que se renderiza luego en un backend/CRM, según corresponda).

### 🟠 S-02 — Sin token CSRF

- **Ruta:** `/contacto` (cuando se conecte a backend)
- **Síntoma:** Ningún token CSRF presente. Si el backend es un POST simple, es vulnerable a CSRF desde cualquier sitio malicioso.
- **Impacto:** Estándar de la industria es SameSite=Strict en cookies + token CSRF en forms. Ninguno presente.

### 🟠 S-03 — Sin headers de seguridad HTTP

- **Ruta:** Todas
- **Síntoma:** `astro.config.mjs` no configura `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` ni `Permissions-Policy`.
- **Impacto:** Sin CSP la marca es vulnerable a XSS si cualquier integración futura inyecta HTML inseguro. Astro 6 soporta headers vía `vite.preview.headers` o middleware.
- **Por qué importa:** Un form de contacto que renderiza HTML del usuario sin sanitizar (futuro) sería XSS trivial sin CSP que lo mitigue.

### 🟠 S-04 — Dirección física completa expuesta públicamente

- **Ruta:** `/contacto` → sección "Información de contacto"
- **Síntoma:** Se muestra la dirección completa: "Manzana i Casa 7, Panorámico 2, Pasto, Colombia" junto a email y teléfono.
- **Impacto:** Información que se puede combinar con otras filtraciones (nombre del propietario de dominio WHOIS, redes sociales @burlesqueagencyof mencionadas en /quienes-somos) para ingeniería social o acoso. La mayoría de marcas de e-commerce solo comparten la ciudad/país en público y la dirección exacta por email/pedido.

### 🟡 S-05 — Avatar del link-in-bio viene de URL pública de Google con token de larga duración

- **Ruta:** `/` (link-in-bio)
- **Síntoma:** El `<img src="...">` apunta a `lh3.googleusercontent.com/aida-public/AB6AXu.../...` con un token AI/Público de más de 200 caracteres.
- **Impacto:** Es la URL que Google Photos/AI Studio genera para assets públicos. Si el bucket se despublica o Google rota la clave, la imagen muere. Es un anti-patrón: el asset debe estar en `/public/` del proyecto.
- **Por qué importa:** Quebradero de cabeza a futuro + SEO pobre (no es discoverable) + dependencia de un servicio externo gratuito.

### 🟡 S-06 — Inputs sin `autocomplete` attributes

- **Ruta:** `/contacto` → `ContactForm.svelte`
- **Síntoma:** Los inputs no declaran `autocomplete="name"`, `autocomplete="tel"`, `autocomplete="email"`. El navegador no puede sugerir valores guardados.
- **Impacto:** UX menor, no es estrictamente seguridad, pero es un estándar.

---

## 4. Problemas de Branding y Contenido

### 🔴 B-01 — Riesgo reputacional: copy sobre "plataformas de citas virtuales" y "@burlesqueagencyof"

- **Ruta:** `/quienes-somos`
- **Síntoma:** Texto literal: _"Empezamos a trabajar hace 5 años con plataformas de citas virtuales..."_ y _"Nuestra agencia oficial es @burlesqueagencyof con más de 3.500 chicas trabajando en plataformas de citas digitales"_.
- **Impacto:** **GRAVE** para una marca que se presenta como distribuidora de maquillaje. Un cliente que llega buscando labial y encuentra esto puede:
  1. Creer que el negocio es un esquema de scam/sugar daddy
  2. Reportar la marca a redes sociales como sospechosa
  3. Asociar la marca con contenido adulto (lo que limita severamente el marketing y la posibilidad de vender en marketplaces tipo MercadoLibre, Amazon, Falabella)
- **Decisión de producto:** ¿Esto es copy legacy que se quedó, o realmente la marca opera ese modelo? Si es lo segundo, separar la marca de maquillaje en otro dominio. Si es lo primero, eliminar.
- **Mobile agrava:** En mobile, este texto aparece en una card que ocupa casi toda la pantalla, mucho más visible que en desktop.

### 🟠 B-02 — Inconsistencias en los handles de redes sociales

- **Ruta:** `/` vs el resto del sitio
- **Síntoma:**
  - `/` (link-in-bio): TikTok `@maquillajedistrisam`, Instagram `@maquillajedistrisam`
  - `/catalogo` y otros: TikTok `@distrisam.makeup`, Instagram `@maquillajedistrisam`
- **Impacto:** Dos cuentas de TikTok (¿o mismo handle escrito diferente?). Cliente confunde y no sabe a cuál seguir. En Instagram el handle es el mismo en todos lados, pero en TikTok no.

### 🟠 B-03 — Email y contacto presentes en el footer con un email que no es de la marca

- **Ruta:** `/modelo`
- **Síntoma:** El footer dice `hola@distrisam.com` (no `@distrisammakeup.com` ni `@distrisam.co`).
- **Impacto:** Posible email personal, o dominio mal configurado. Vale verificar.

### 🟡 B-04 — Links "Términos y Condiciones", "Políticas de Privacidad", "Envíos y Devoluciones" son placeholders

- **Ruta:** `/modelo` (footer)
- **Síntoma:** Aparecen como links `<a>` pero el `href` es `#` o vacío.
- **Impacto:** En Colombia (donde la marca dice operar), la Ley 1480 de 2011 (Estatuto del Consumidor) obliga a publicar términos, política de privacidad y derecho de retracto en cualquier sitio de e-commerce. **Incumplimiento legal potencial**.

### 🟡 B-05 — "Volver al Inicio" del 404 lleva a `/` (link-in-bio) en vez de `/main`

- **Ruta:** `/404`
- **Síntoma:** El CTA "Volver al Inicio" del 404 va al link-in-bio, no al home real.
- **Impacto:** Quien llega al 404 aterriza en una página de links, no en la tienda.

### 🟡 B-06 — Mensaje motivacional en /quienes-somos bien redactado pero mezcla tonos

- **Ruta:** `/quienes-somos`
- **Síntoma:** El copy es cálido y aspiracional ("Es cuidarte, es quererte, es recordarte que mereces lo mejor") pero convive con el copy de B-01. La yuxtaposición se siente disonante.

---

## 5. Inconsistencias Detectadas

| #    | Inconsistencia     | Detalle                                                                                                                                                 |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I-01 | Año del footer     | `/main` y `/modelo` dicen "© 2026" (correcto, año actual). `/catalogo`, `/quienes-somos`, `/contacto` dicen "© 2030" (futuro).                          |
| I-02 | Componente Footer  | `MainFooter.astro`, `Footer.astro` y `FooterModelo.astro` son 3 archivos distintos. La duplicación facilita que las personalizaciones se desincronicen. |
| I-03 | Nav de /main       | Usa la clase `nav-modelo` (code smell: el "home real" usa la variante "modelo").                                                                        |
| I-04 | Routes link-in-bio | `/` es link-in-bio y `/main` es la home. El footer de 3 páginas apunta a `/` por error.                                                                 |
| I-05 | Email              | `/modelo` muestra `hola@distrisam.com`. Otras páginas no muestran email.                                                                                |
| I-06 | Teléfono           | `/contacto` y `/modelo` muestran `+57 302 7431560`. Las otras no.                                                                                       |

---

## 6. Mejoras Estéticas (no son errores, son sugerencias)

### 🟢 E-01 — Avatar del link-in-bio podría tener marco y sombra

- Se ve bien, pero una sombra suave y un borde dorado (el color de marca) lo harían más premium.

### 🟢 E-02 — Cards de producto podrían tener badge "Original" o "100% Originales"

- Refuerza el claim de marca. Hoy está solo en /quienes-somos como stat.

### 🟢 E-03 — Hero del /main: tipografía gigante está bien, pero el texto en blanco sobre imagen de fondo tiene contraste justo en la zona donde aparece la palabra "Brilla"

- Sugerencia: overlay oscuro sutil (linear-gradient de negro 20% a 0% de abajo hacia arriba) para garantizar WCAG AA.

### 🟢 E-04 — Falta una sección de "testimonios" o "reseñas" en /main

- La marca tiene stats ("5+ años", "3.500+ chicas") pero no hay prueba social humana visible. Una sección con 2-3 reseñas reales (con foto) subiría conversión.

### 🟢 E-05 — Botón "INICIA TU VIAJE AQUÍ" del hero es bueno

- Pero podría tener un micro-efecto hover (en desktop) o un haptic feedback (en mobile) para feedback táctil.

### 🟢 E-06 — Menú mobile está bien

- Drawer limpio, links claros, jerarquía correcta. Solo sugerir: agregar un link "WhatsApp" directo arriba de todo (ya que es el canal de venta principal).

### 🟢 E-07 — El color dorado de marca se ve bien y está bien aplicado

- No se observa overuse ni saturación. Buen trabajo de design tokens.

### 🟢 E-08 — El footer podría tener un mini-CTA "¿Tienes preguntas? Escríbenos al WhatsApp" arriba de los datos

- Reduce fricción. El usuario no tiene que scrollear hasta los iconos de redes para encontrar el canal directo.

---

## 7. Resumen Consolidado (2026-06-22)

### Conteo por severidad

| Severidad  | Conteo                                                                            |
| ---------- | --------------------------------------------------------------------------------- |
| 🔴 CRÍTICO | 6 (V-01, V-02, U-01, U-02, U-03, S-01, B-01)                                      |
| 🟠 ALTO    | 9 (V-03, V-04, V-05, U-04, U-05, S-02, S-03, S-04, B-02)                          |
| 🟡 MEDIO   | 12 (V-06, V-07, U-06, U-07, U-08, S-05, S-06, B-03, B-04, B-05, B-06, I-01..I-06) |
| 🟢 BAJO    | 8 (E-01..E-08)                                                                    |

> **Nota:** Hay 6 problemas CRÍTICOS. Los 3 más urgentes (en orden):
>
> 1. **U-01** — El formulario de contacto no envía nada. Cualquier mensaje del cliente se pierde. Fix: integrar con un servicio real (Resend, Formspree, Supabase, o un endpoint propio).
> 2. **B-01** — Copy sobre "plataformas de citas" en /quienes-somos. Riesgo reputacional severo. Decisión de producto obligatoria.
> 3. **U-02** — Botones "Buscar" y "Carrito" del header sin handler. Rompe la confianza en mobile.

### Estado por página (vista mobile 375×812)

| Página                | Estado               | Issues críticos                                                       |
| --------------------- | -------------------- | --------------------------------------------------------------------- |
| `/` (link-in-bio)     | ✅ Funcional         | S-05 (asset externo)                                                  |
| `/main` (home tienda) | ❌ Múltiples issues  | V-01 (carousel roto), U-02 (cart/search sin handler), U-05 (CTA roto) |
| `/modelo` (template)  | ✅ Funcional         | I-03 (clase nav-modelo en home real), B-03 (email a verificar)        |
| `/catalogo`           | ❌ Múltiples issues  | V-02 (overflow), U-03 (paginación fake), V-07 (año 2030)              |
| `/quienes-somos`      | ❌ Riesgo alto       | B-01 (copy riesgoso), V-07 (año 2030)                                 |
| `/contacto`           | ❌ Canal roto        | U-01 (form fake), V-05 (textarea pequeña), S-04 (dirección expuesta)  |
| `404`                 | ⚠️ Link mal apuntado | B-05                                                                  |

### Estado por página (vista desktop, hallazgos heredados de auditoría 2026-06-19)

Los 5 errores originales del 2026-06-19 siguen vigentes (no se cerraron en este pase):

- **#1** Imágenes incorrectas en home
- **#2** Imágenes desalineadas en catálogo
- **#3** Logo del footer roto (confirmado también en mobile)
- **#4** Espacios en blanco excesivos
- **#5** Grid 3 columnas roto

**Total de errores encontrados en esta auditoría (mobile + cross-check desktop):** 35 (6 críticos + 9 altos + 12 medios + 8 bajos).

**Errores de JavaScript:** 0
**Errores de consola:** 0

---

## 8. Hallazgos Adicionales (Auditoría de Responsiveness)

### 🟠 V-08 — Menú hamburguesa redundante en Desktop y Tablet
- **Ruta:** `/main`
- **Síntoma:** El botón del menú hamburguesa permanece visible en resoluciones de tablet (768px) y desktop (1280px) a pesar de que los enlaces completos de navegación ya son visibles.
- **Impacto:** Redundancia visual y desorden en el header.

### 🔴 V-09 — Productos ocultos/faltantes en vista móvil
- **Ruta:** `/main`
- **Sección:** "Colecciones Estrella"
- **Síntoma:** Los productos individuales no se renderizan en el viewport móvil (375px), solo aparecen las pestañas de categorías (Top Beauty, Top Piel, etc.).
- **Impacto:** Los usuarios móviles no pueden ver ni interactuar con los productos destacados.

### 🔴 U-09 — Pestañas de categorías estáticas en vista móvil
- **Ruta:** `/main`
- **Sección:** "Colecciones Estrella"
- **Síntoma:** Las pestañas de categorías (Top Beauty, Top Piel, etc.) actúan como texto estático en un contenedor con scroll horizontal, careciendo de funcionalidad de botón o click handler.
- **Impacto:** Los usuarios no pueden cambiar entre categorías en móvil.

### 🟠 V-10 — Atributos src ausentes en el logo de navegación
- **Ruta:** `/main` (Navbar)
- **Síntoma:** El logo principal dentro del navbar contiene una etiqueta `<img>` vacía sin atributos `src` o `alt` en el DOM.
- **Impacto:** Riesgo de imagen rota o invisible bajo ciertas condiciones de carga.
