import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://fajriawwaluddin.com',
  integrations: [sitemap()],
  output: 'server', // Use 'server' for SSR, or 'static' if no SSR is needed
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});