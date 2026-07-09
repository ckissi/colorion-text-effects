import type { APIRoute } from 'astro';
import { snippets, prompts } from '../utils/effectCss';

// Emitted as a static /effect-data.json file at build time. The client fetches
// it on demand (first time the copy modal is opened) so the snippet + prompt
// text stays out of the initial HTML document.
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ snippets, prompts }), {
    headers: { 'Content-Type': 'application/json' },
  });
