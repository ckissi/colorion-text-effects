import { effects, perLetter, usesDataText, type Effect } from '../data/effects';
// Import as raw text so Vite tracks global.css and re-runs this module on edit
// (fs.readFileSync alone does not create a dependency, so snippets went stale in dev).
import css from '../styles/global.css?raw';

/**
 * Build-time extraction of each effect's CSS from global.css.
 *
 * The stylesheet documents every effect with a numbered marker comment
 * (`/* 01 Borealis — aurora gradient drifting… *​/`). We slice the file on
 * those markers to recover one block per effect, then make each block
 * self-contained by appending any shared `@keyframes` it references but
 * doesn't define itself.
 */

// The three colour tokens the effects paint with; surface them so the copied
// snippet is genuinely standalone.
const INK_NOTE = `/* Colour tokens — override to re-skin the effect:
   --ink    main text colour (defaults to currentColor)
   --ink-2  primary accent   --ink-3  secondary accent */
:root { --ink: currentColor; --ink-2: #FF4FD8; --ink-3: #4FF8FF; }

`;

/** Extract every `@keyframes name { … }` block with brace matching. */
function extractKeyframes(src: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /@keyframes\s+([\w-]+)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    let depth = 1;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      i++;
    }
    map.set(m[1], src.slice(m.index, i).trim());
  }
  return map;
}

export const allKeyframes = extractKeyframes(css);

// Slice the effects section into one block per numbered marker.
// Allow multi-line marker comments (e.g. 24 Still-Water, 30 Negative).
const markerRe = /\/\*\s*(\d{2,})\s+(?:[^*]|\*(?!\/))*\*\//g;
const markers = [...css.matchAll(markerRe)];
const sectionEnd = css.indexOf('/* ---------- Lazy loading');

const byIndex = new Map<string, string>();
/** 1-based [first, last] line of each effect's block in global.css, keyed by effect index */
export const blockLines = new Map<string, [number, number]>();
const lineAt = (offset: number) => css.slice(0, offset).split('\n').length;
markers.forEach((marker, i) => {
  const start = marker.index!;
  const end = i + 1 < markers.length ? markers[i + 1].index! : sectionEnd;
  byIndex.set(marker[1], css.slice(start, end).trim());
  blockLines.set(marker[1], [lineAt(start), lineAt(end) - 1]);
});

function selfContained(block: string): string {
  const definedHere = new Set([...block.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1]));
  const extras: string[] = [];
  for (const [name, def] of allKeyframes) {
    if (definedHere.has(name)) continue;
    // referenced as a whole word somewhere in the block (animation shorthand etc.)
    if (new RegExp(`\\b${name}\\b`).test(block)) extras.push(def);
  }
  return extras.length ? `${block}\n\n${extras.join('\n\n')}` : block;
}

/** Raw CSS block per effect type, exactly as written in global.css (no keyframes appended). */
export const effectBlocks: Record<string, string> = {};
export const effectCss: Record<string, string> = {};
// One-line description from each effect's marker comment (text after the "—").
export const effectBlurbs: Record<string, string> = {};
for (const effect of effects) {
  const block = byIndex.get(effect.index);
  if (!block) continue;
  effectBlocks[effect.type] = block;
  effectCss[effect.type] = INK_NOTE + selfContained(block);
  const marker = block.match(/^\/\*\s*\d{2,}\s+((?:[^*]|\*(?!\/))*)\*\//);
  const blurb = marker?.[1].replace(/\s+/g, ' ').split(/\s+—\s+/).slice(1).join(' — ').trim();
  if (blurb) effectBlurbs[effect.type] = blurb;
}

/** HTML markup a given effect needs — mirrors Effect.astro. */
export function effectMarkup(effect: Effect): string {
  const { type, text } = effect;
  if (type === 'contour') {
    return `<svg class="fx-contour" viewBox="0 0 260 56" role="img" aria-label="${text}"><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">${text}</text></svg>`;
  }
  if (type === 'decoder') {
    return `<div class="fx-decoder" role="img" aria-label="${text}"></div>`;
  }
  if (perLetter.has(type)) {
    const spans = text
      .split('')
      .map((ch, i) => `<b aria-hidden="true" style="--i:${i}">${ch}</b>`)
      .join('');
    return `<div class="fx-${type}" role="img" aria-label="${text}">${spans}</div>`;
  }
  if (usesDataText.has(type)) {
    return `<div class="fx-${type}" data-text="${text}">${text}</div>`;
  }
  return `<div class="fx-${type}">${text}</div>`;
}

// Per-effect copyable snippet: required markup as a leading comment, then the
// self-contained CSS. Keyed by effect type (matches each cell's data-type).
export const snippets: Record<string, string> = {};
// Per-effect LLM prompt: a self-contained instruction a coding agent can paste
// to recreate the exact same text effect (markup + CSS).
export const prompts: Record<string, string> = {};

for (const effect of effects) {
  const cssBlock = effectCss[effect.type];
  if (!cssBlock) continue;
  const markup = effectMarkup(effect);
  snippets[effect.type] = `<!-- Markup: ${markup} -->\n\n${cssBlock}`;
  prompts[effect.type] = `Recreate this animated text effect exactly, using pure CSS only — no JavaScript, no external libraries, no dependencies.

It is a "${effect.name}" text effect applied to the word "${effect.text}": the animation must match the CSS below precisely (same motion, timing curves, and colours).

Use this exact HTML markup:

${markup}

Apply this CSS:

${cssBlock}

Requirements:
- Keep the markup and class names exactly as shown.
- The effect paints with the \`--ink\`, \`--ink-2\` and \`--ink-3\` colour tokens — preserve them so the colours can be overridden.
- The effect should work with any word, not just "${effect.text}" (per-letter effects index each letter with an inline \`--i\` custom property).
- Respect \`prefers-reduced-motion: reduce\` by disabling the animation.
- Do not add any JavaScript; the effect must be achieved with CSS alone.`;
}
