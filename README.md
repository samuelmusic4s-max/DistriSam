<div align="center">
  <img src="public/favicon.svg" alt="DistriSam Logo" width="120" height="120" />
  <h1>💄 DistriSam Make Up</h1>
  <p><strong>Tienda y Distribuidora Oficial — Pasto, Colombia</strong></p>

  [![Astro](https://img.shields.io/badge/Astro-0C0E14?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
  [![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://svelte.dev/)
  [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
</div>

<br/>

Este es el repositorio oficial del Frontend de **DistriSam Make Up**. La aplicación está construida para servir como vitrina digital omnicanal (tanto para ventas al detal como al por mayor), conectando a los clientes con catálogos actualizados y canales de WhatsApp, priorizando un rendimiento ultra rápido y un posicionamiento SEO excepcional.

---

## 🚀 Arquitectura y Stack Tecnológico

- **Framework:** [Astro](https://astro.build/) (Optimizado para generar sitios estáticos ultrarrápidos sin JavaScript innecesario).
- **Componentes Reactivos:** Svelte (Utilizado para micro-interacciones específicas en el cliente).
- **Estilos:** CSS Nativo + Variables CSS (Diseño responsivo optimizado para móviles).
- **Despliegue:** [Vercel](https://vercel.com/) (Configurado con CI/CD automático; cualquier push a la rama `main` lanza un despliegue en producción).

## 📂 Estructura del Código

```text
/
├── public/           # Archivos estáticos públicos (robots.txt, favicon.svg)
├── src/
│   ├── assets/       # Assets procesados por Astro (Imágenes de productos)
│   ├── components/   # Componentes modulares y reutilizables de UI
│   ├── layouts/      # Plantillas globales (Ej: Layout.astro con inyección SEO)
│   ├── pages/        # Enrutamiento basado en archivos (/, /main, /quienes-somos)
│   └── styles/       # Hojas de estilo globales
├── astro.config.mjs  # Configuración principal (Integraciones como el Sitemap)
└── package.json      # Configuración de Node y dependencias de pnpm
```

## 🛠️ Instalación y Desarrollo Local

Para correr este proyecto en tu máquina local, clona el repositorio y asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados.

```bash
# 1. Clonar el repositorio
git clone https://github.com/samuelmusic4s-max/DistriSam.git

# 2. Entrar a la carpeta del frontend
cd DistriSam/frontend

# 3. Instalar dependencias
pnpm install

# 4. Levantar el servidor de desarrollo
pnpm run dev
```
El servidor estará corriendo en `http://localhost:4321`.

## 📈 SEO y Metadatos Técnicos

El frontend fue diseñado con un enfoque agresivo hacia el posicionamiento en buscadores:
- **Sitemap Dinámico:** Archivos `sitemap-index.xml` generados automáticamente en cada compilación gracias a la integración oficial `@astrojs/sitemap`.
- **Datos Estructurados (JSON-LD):** Configuración nativa bajo el estándar de `LocalBusiness` para generar paneles de conocimiento en Google.
- **Open Graph & Twitter Cards:** Configurados estáticamente en el head global para previsualizaciones enriquecidas al compartir la web en WhatsApp, Facebook y Twitter.
- **Robots.txt:** Directivas claras para permitir el rastreo profundo de bots.

---

<div align="center">
  <i>Desarrollado con pasión para digitalizar y escalar el negocio de DistriSam Make Up.</i>
</div>
