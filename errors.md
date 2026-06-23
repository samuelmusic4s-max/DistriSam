# Reporte de Auditoría de Frontend — DistriSam Make Up

**Fecha:** 2026-06-23  
**Auditor:** Antigravity (AI Coding Assistant)  
**Servidor de Prueba:** Astro dev server (`pnpm dev` en `http://localhost:4321/`)  
**Metodología:** Inspección visual manual y del DOM mediante Chrome DevTools y Browser Agent en entornos Mobile (375×812, iPhone X) y Desktop.  

---

## 📢 NOTA IMPORTANTE DE CONTEXTO (Historial vs. Estado Actual)

En la auditoría previa del 2026-06-22 se reportaron múltiples errores funcionales en las páginas `/catalogo` (paginación falsa, scrollbar desbordado) y `/contacto` (formulario falso que no enviaba datos, textarea pequeña). 

**ESTOS ERRORES YA NO APLICAN debido a que las páginas `/catalogo` y `/contacto` fueron ELIMINADAS por completo del proyecto en el commit `74e7791`.** La funcionalidad de catálogo e interacción con clientes ha sido delegada a enlaces externos hacia Google Drive (PDFs) y WhatsApp. La working tree actual está limpia y el proyecto compila exitosamente, pero persisten problemas estructurales, de branding, inconsistencias de navegación y deuda técnica que se detallan a continuación.

---

## 🚨 CONVENCIÓN DE SEVERIDAD

*   🔴 **CRÍTICO:** Errores que rompen la compilación, impiden la navegación básica, exponen vulnerabilidades de seguridad o representan riesgos legales inminentes.
*   🟠 **ALTO:** Experiencia de usuario (UX) rota o deficiente que genera confusión, inconsistencias graves de marca o fallas en el diseño responsivo.
*   🟡 **MEDIO:** Deuda técnica, malas prácticas de desarrollo (code smells) o placeholders que deslucen el acabado profesional.
*   🟢 **BAJO:** Sugerencias de pulido estético o mejoras UX no bloqueantes.

---

## 1. Ruta: `/` (Links / Link-in-bio)

### 🔴 S-01 — Avatar del perfil depende de una URL externa de larga duración
*   **Síntoma:** El tag `<img>` en [ProfileHeader.astro](file:///c:/dev/DistriSam/frontend/src/components/ProfileHeader.astro) apunta a una URL de Google User Content (`lh3.googleusercontent.com/aida-public/...`) que contiene un token temporal generado por servicios de IA.
*   **Riesgo:** Si el token expira o el bucket de origen rota sus claves, la imagen de perfil se romperá silenciosamente, dejando un contenedor vacío en la portada del link-in-bio.
*   **Solución:** Los assets de marca SIEMPRE deben ser locales. La imagen debe descargarse y guardarse en `src/assets/` o en `public/`.

### 🟠 B-01 — Inconsistencia en el handle de redes sociales
*   **Síntoma:** El handle superior en la página de links muestra `@distrisam.makeup`, pero el enlace de TikTok apunta y muestra `@maquillajedistrisam`.
*   **Impacto:** Confusión de branding. Un cliente no sabe con certeza cuál es el usuario oficial de la marca.

---

## 2. Ruta: `/main` (Tienda / Landing Principal)

### 🟠 V-01 — Carrusel "Colecciones Estrella" carece de affordance en Mobile
*   **Síntoma:** En mobile, el carrusel de productos favoritos (`HomeCollections.astro`) desactiva su animación infinita y pasa a usar scroll horizontal táctil nativo. Sin embargo, no se renderizan flechas, dots indicadores ni una barra de scroll visible.
*   **Impacto:** Un usuario en mobile no tiene ninguna pista visual de que puede deslizar hacia la derecha para ver más productos. La sección parece estática con solo una tarjeta visible a medias.

### 🟠 U-01 — Botón "Buscar" y "Carrito" inexistentes (Deuda de Layout)
*   **Síntoma:** Se utiliza `NavigationModelo.astro` para el navbar, el cual carece de las acciones de Buscar y Carrito. No obstante, existe un componente `Navigation.astro` que sí los tiene pero está huérfano (no se importa en ningún layout).
*   **Impacto:** Si la tienda online planea tener estas características funcionales, se está importando el navbar incorrecto.

### 🔴 L-01 — Enlaces del Footer rotos (Placeholders)
*   **Síntoma:** En [FooterModelo.astro](file:///c:/dev/DistriSam/frontend/src/components/FooterModelo.astro), los enlaces a "Términos y Condiciones" y "Envíos y Devoluciones" tienen `href="#"`.
*   **Riesgo Legal:** En Colombia (país donde opera la marca), la Ley 1480 de 2011 (Estatuto del Consumidor) exige obligatoriamente a los comercios electrónicos tener términos, condiciones y políticas de devolución reales y visibles. Un link roto con `#` constituye incumplimiento legal.

### 🟡 V-02 — Logo del Footer no usa variante invertida
*   **Síntoma:** Se renderiza `<Logo size={48} />` en el footer. Al no pasarle la propiedad `invert={true}`, el logo mantiene su fondo blanco y borde dorado, viéndose como un parche cuadrado sobre el fondo carbón `#1A1A1A` del footer.

---

## 3. Ruta: `/quienes-somos`

### 🔴 S-02 — Imágenes de la historia enlazadas a URLs externas temporales
*   **Síntoma:** En las secciones "Los Inicios" y "El Nacimiento de DistriSam", las imágenes ilustrativas provienen de enlaces de Google User Content (`lh3.googleusercontent.com/aida-public/...`).
*   **Riesgo:** Mismo riesgo que el avatar de la landing links: rotura de imágenes en producción cuando expiren los tokens de Google.
*   **Solución:** Guardar los assets localmente en el directorio del proyecto.

### 🟠 U-02 — Link del Navbar no se ilumina como activo
*   **Síntoma:** Cuando se navega a `/quienes-somos`, el enlace "Quiénes Somos" del navbar no se destaca con el color de fondo oscuro (`.active`).
*   **Causa:** En [NavigationModelo.astro](file:///c:/dev/DistriSam/frontend/src/components/NavigationModelo.astro), el enlace no tiene la lógica condicional `class={activePage === 'quienes-somos' ? 'active' : ''}` que sí tienen los otros links.

---

## 4. Ruta: `/404` (Página de Error)

### 🔴 T-01 — Importación de módulo inexistente (Deuda Técnica)
*   **Síntoma:** En [404.astro](file:///c:/dev/DistriSam/frontend/src/pages/404.astro) (línea 3) se encuentra `import MainFooter from '../components/MainFooter.astro';`. Sin embargo, `MainFooter.astro` fue borrado del proyecto en commits anteriores.
*   **Gravedad:** Aunque el build de Astro actual no falló porque el componente importado no se utiliza en el markup, esta referencia rota es una bomba de tiempo en el linter y representa deuda técnica que debe ser saneada.

### 🟠 U-03 — Página aislada sin navegación ni footer
*   **Síntoma:** La página de error 404 no pasa `activePage` al Layout y no renderiza ningún footer. 
*   **Impacto:** El usuario queda aislado de la navegación global y los canales de contacto (como WhatsApp o correo electrónico del footer) si aterriza en esta página, forzándolo a retroceder o usar exclusivamente los CTAs centrales.

---

## 5. Ruta: `/modelo` (Landing de Referencia)

### 🔴 U-04 — Enlace roto hacia página eliminada
*   **Síntoma:** El botón "Entrar a la Tienda Oficial" en la sección de CTA final apunta a `/catalogo` (`href="/catalogo"`).
*   **Impacto:** Lleva al usuario a la página de error 404, ya que `/catalogo` fue eliminada.

---

## 📊 RESUMEN CONSOLIDADO DE ISSUES

| Severidad | Conteo | ID de Errores |
| :--- | :--- | :--- |
| 🔴 **CRÍTICO** | 4 | S-01, S-02, L-01, T-01 |
| 🟠 **ALTO** | 5 | B-01, V-01, U-01, U-02, U-03 |
| 🟡 **MEDIO** | 2 | V-02, U-04 |
| 🟢 **BAJO** | 0 | - |

### 🔍 Top 3 Errores de Mayor Prioridad:
1.  **L-01 (Riesgo Legal):** Enlaces del footer apuntando a `#` en vez de políticas reales de términos y devoluciones.
2.  **S-01 & S-02 (Riesgo de Rotura):** Carga de assets clave (avatar e imágenes históricas) mediante URLs públicas temporales de Google.
3.  **T-01 (Deuda Técnica):** Importación de `MainFooter.astro` rota en la página 404.
