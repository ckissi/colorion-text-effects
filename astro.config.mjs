import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://text-effects.colorion.co',
  server: { port: Number(process.env.PORT) || 4321 },
  // Inline the page's CSS into <head> so it isn't a separate render-blocking request.
  build: { inlineStylesheets: 'always' },
});
