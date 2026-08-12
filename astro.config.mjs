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
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Override session driver to prevent auto-injection of SESSION KV Namespace binding
  session: {
    driver: 'memory',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});