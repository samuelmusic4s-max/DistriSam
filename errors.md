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
