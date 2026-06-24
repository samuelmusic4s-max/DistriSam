# DistriSam Make Up - Frontend

Este es el repositorio oficial del Frontend de **DistriSam Make Up**, una tienda y distribuidora de artículos de belleza ubicada en Pasto, Colombia. La aplicación está construida para servir como vitrina digital (tanto para ventas al detal como al por mayor), integrando enlaces hacia los catálogos en PDF y optimizando la experiencia de usuario y el posicionamiento SEO.

## 🚀 Tecnologías Principales

- **[Astro](https://astro.build/)**: Framework web enfocado en la entrega rápida de contenido estático y SEO.
- **Svelte**: Utilizado para componentes interactivos puntuales (si los hay).
- **CSS Nativo**: Estilos personalizados siguiendo patrones de diseño limpios.
- **Vercel**: Plataforma de despliegue principal.

## 📂 Estructura del Proyecto

```text
/
├── public/           # Archivos estáticos como el favicon, robots.txt, etc.
├── src/
│   ├── assets/       # Imágenes locales (logos, iconos, fotos de productos).
│   ├── components/   # Componentes reutilizables de Astro.
│   ├── layouts/      # Plantillas base (ej: Layout.astro con las etiquetas SEO).
│   ├── pages/        # Rutas de la aplicación (index, main, quienes-somos, etc.).
│   └── styles/       # Hojas de estilo globales.
├── astro.config.mjs  # Configuración del proyecto Astro (plugins, integraciones, sitemap).
└── package.json      # Dependencias del proyecto.
```

## 🧞 Comandos Locales

Todos los comandos se deben ejecutar desde la raíz de este directorio (`/frontend`):

| Comando                  | Acción                                                                  |
| :----------------------- | :---------------------------------------------------------------------- |
| `pnpm install`           | Instala todas las dependencias necesarias.                              |
| `pnpm run dev`           | Levanta el servidor local de desarrollo en `localhost:4321`.            |
| `pnpm run build`         | Compila el sitio estático para producción en la carpeta `./dist/`.      |
| `pnpm run preview`       | Previsualiza el build de producción localmente.                         |

## 📈 SEO y Metadatos

El proyecto cuenta con una sólida base técnica para motores de búsqueda:
- Generación automática de `sitemap-index.xml`.
- Configuración de `robots.txt`.
- Etiquetas estructuradas JSON-LD integradas (LocalBusiness).
- Soporte para Open Graph y Twitter Cards.

---
*Desarrollado con pasión para ayudar a crecer el negocio de DistriSam Make Up.*
