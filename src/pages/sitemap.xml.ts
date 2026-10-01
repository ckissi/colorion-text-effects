import type { APIRoute } from 'astro';
import { effects } from '../data/effects';
import { categoryOrder, categoryPath, effectPath } from '../data/seo';

// Generated so every effect page is listed automatically as effects are added.
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://text-effects.colorion.co');
  const urls = ['/', ...categoryOrder.map(categoryPath), ...effects.map(effectPath)]
    .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
