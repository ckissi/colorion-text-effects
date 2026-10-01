import css from '../styles/global.css?raw';
import type { EffectType } from '../data/effects';
import { allKeyframes, effectBlocks } from './effectCss';

/**
 * Per-page stylesheet. global.css holds the site chrome plus ~100 effect
 * blocks; inlining all of it put ~100 KB of CSS on every effect page that
 * shows only seven effects. Each page now inlines the shared chrome plus just
 * the blocks (and @keyframes) for the effects it actually renders.
 */

const SECTION_START = css.indexOf('/* ---------- Text effects (ink on surface)');
const SECTION_END = css.indexOf('/* ---------- Lazy loading');
if (SECTION_START < 0 || SECTION_END < SECTION_START) throw new Error('pageCss: effect section markers not found in global.css');

/**
 * Small CSS minifier: drops comments and collapses whitespace, leaving string
 * literals (content: "…", data URIs) untouched.
 */
export function minify(src: string): string {
  let out = '';
  let i = 0;
  let chunk = '';
  const flush = () => {
    out += chunk.replace(/\s+/g, ' ').replace(/\s*([{};,])\s*/g, '$1').replace(/;}/g, '}');
    chunk = '';
  };
  while (i < src.length) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end < 0 ? src.length : end + 2;
      chunk += ' ';
    } else if (c === '"' || c === "'") {
      flush();
      let j = i + 1;
      while (j < src.length && src[j] !== c) j += src[j] === '\\' ? 2 : 1;
      out += src.slice(i, j + 1);
      i = j + 1;
    } else {
      chunk += c;
      i++;
    }
  }
  flush();
  return out.trim();
}

const definedIn = (block: string) => new Set([...block.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]));

const baseRaw = css.slice(0, SECTION_START) + css.slice(SECTION_END);
const base = minify(baseRaw);
const baseKeyframes = definedIn(baseRaw);

const blockCache = new Map<string, string>();
const minBlock = (type: string) => {
  if (!blockCache.has(type)) blockCache.set(type, minify(effectBlocks[type] ?? ''));
  return blockCache.get(type)!;
};

/** Inline CSS for a page that renders the given effects. */
export function pageCss(types: readonly EffectType[]): string {
  const unique = [...new Set(types)];
  const have = new Set(baseKeyframes);
  unique.forEach((t) => definedIn(effectBlocks[t] ?? '').forEach((k) => have.add(k)));
  // shared @keyframes an effect references but lives in another block
  const extras: string[] = [];
  for (const t of unique) {
    const block = effectBlocks[t] ?? '';
    for (const [name, def] of allKeyframes) {
      if (have.has(name) || !new RegExp(`\\b${name}\\b`).test(block)) continue;
      have.add(name);
      extras.push(minify(def));
    }
  }
  return base + unique.map(minBlock).join('') + extras.join('');
}
