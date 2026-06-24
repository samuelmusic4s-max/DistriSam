// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://distrisamakeup.vercel.app',
  integrations: [svelte(), sitemap()],
});
