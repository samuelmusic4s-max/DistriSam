# Reporte de Errores E2E — DistriSam Make Up

**Fecha:** 2026-06-18  
**Servidor:** `http://localhost:4322/` (Astro v6.4.6)  
**Método:** Navegación manual página por página + inspección de consola y logs del servidor

---

## Error 1: Logo 404 en todas las páginas

| Campo                 | Detalle                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tipo**              | 404 Not Found                                                                                                                                                                                                                                                                                                 |
| **Recurso**           | `/logo.png`                                                                                                                                                                                                                                                                                                   |
| **Páginas afectadas** | `/`, `/catalogo`, `/quienes-somos`, `/contacto` (todas las que tienen navegación)                                                                                                                                                                                                                             |
| **Momento**           | Al cargar cualquier página con el componente `Navigation.astro`                                                                                                                                                                                                                                               |
| **Causa**             | En `src/components/Navigation.astro` línea 11 hay un `<img src="/logo.png">` hardcoded que apunta a la raíz del servidor. El archivo `logo.png` no existe en `public/`. El logo real está en `src/assets/logo.png` y se importa correctamente en `Logo.astro`, pero `Navigation.astro` no usa ese componente. |
| **Impacto**           | El logo de la barra de navegación no se muestra en ninguna página. Se ve un ícono de imagen rota.                                                                                                                                                                                                             |
| **Fix sugerido**      | Reemplazar `<img src="/logo.png">` en `Navigation.astro` por el componente `<Logo size="sm" />` importado desde `./Logo.astro`.                                                                                                                                                                               |

---

## Error 2: Imágenes de productos 404 en el Catálogo

| Campo                 | Detalle                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tipo**              | 404 Not Found (14 imágenes)                                                                                                                                                                                                                                                                                                                                                                              |
| **Recursos**          | `/products/01-kit-bioaqua-vitamina-c.jpg` hasta `/products/14-protector-ojeras.jpg`                                                                                                                                                                                                                                                                                                                      |
| **Páginas afectadas** | `/catalogo`                                                                                                                                                                                                                                                                                                                                                                                              |
| **Momento**           | Al cargar la página de catálogo, todas las tarjetas de producto muestran imagen rota                                                                                                                                                                                                                                                                                                                     |
| **Causa**             | En `src/pages/catalogo.astro` las imágenes se referencian como rutas estáticas `/products/...` (que esperan archivos en `public/products/`), pero la carpeta `public/products/` **no existe**. Las imágenes reales están en `src/assets/products/`. La página de inicio (`index.astro`) sí las carga correctamente porque usa el componente `<Image>` de `astro:assets` con imports desde `src/assets/`. |
| **Impacto**           | Las 14 tarjetas de producto en el catálogo aparecen sin imagen. El sitio se ve roto/incompleto.                                                                                                                                                                                                                                                                                                          |
| **Fix sugerido**      | Dos opciones: (A) Importar las imágenes en `catalogo.astro` desde `src/assets/products/` y pasarlas al componente `ProductCard` como objetos `ImageMetadata`, o (B) Copiar las imágenes a `public/products/` para que las rutas estáticas funcionen. La opción A es la correcta siguiendo el patrón de `index.astro`.                                                                                    |

---

## Páginas verificadas sin errores adicionales

| Página                  | Estado                 | Notas                                                       |
| ----------------------- | ---------------------- | ----------------------------------------------------------- |
| `/` (Inicio)            | ✅ OK (menos logo nav) | Hero, novedades, productos destacados cargan bien           |
| `/catalogo`             | ⚠️ Imágenes rotas      | Layout, filtros, sidebar y estructura OK                    |
| `/quienes-somos`        | ✅ OK (menos logo nav) | Historia, bloques de texto, footer OK                       |
| `/contacto`             | ✅ OK (menos logo nav) | Formulario, info de contacto, mapa OK                       |
| `/links`                | ✅ OK                  | Página de links tipo "bio link" sin navegación, sin errores |
| `/pagina-que-no-existe` | ✅ OK                  | Página 404 custom se muestra correctamente                  |

---

## Resumen

- **2 errores encontrados**, ambos relacionados con rutas de imágenes incorrectas
- **0 errores de JavaScript** en consola
- **0 errores de layout/CSS** visibles
- **6 páginas** navegadas y verificadas
- El servidor Astro arranca sin errores de compilación
