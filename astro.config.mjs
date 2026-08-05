import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fajri.web.id',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml',
    },
  }),
  // Override session driver to prevent auto-injection of SESSION KV Namespace binding
  session: {
    driver: 'memory',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});