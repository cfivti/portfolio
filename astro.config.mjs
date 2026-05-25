// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  redirects: {
    '/yandex-market-wishlist': '/yandex-market-wishlist-alice-ai',
  },
});
