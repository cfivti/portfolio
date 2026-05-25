// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cfivti.github.io',
  base: '/portfolio',
  devToolbar: {
    enabled: false,
  },
  redirects: {
    '/yandex-market-wishlist': '/yandex-market-wishlist-alice-ai',
  },
});
