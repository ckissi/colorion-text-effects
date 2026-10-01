import { effects, perLetter, usesDataText, type Effect } from '../data/effects';
import { effectSeo } from '../data/seo';
import { effectCss } from './effectCss';

/**
 * Build-time "how it works" notes for each effect page, derived from the
 * effect's actual CSS — so the explanation can never drift from the snippet.
 */

interface Technique {
  id: string;
  label: string;
  detail: string;
  test: (css: string, effect: Effect) => boolean;
}

const has = (re: RegExp) => (css: string) => re.test(css);
/** test only inside @keyframes bodies (what actually animates) */
const animates = (re: RegExp) => (css: string) =>
  (css.match(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g) ?? []).some((kf) => re.test(kf));

const TECHNIQUES: Technique[] = [
  {
    id: 'per-letter',
    label: 'Per-letter stagger',
    detail:
      'Each letter is its own <b> element carrying an inline --i index. The same @keyframes run on every letter, offset by calc(var(--i) * …), so the motion ripples through the word.',
    test: (css, e) => perLetter.has(e.type) && /var\(--i\)/.test(css),
  },
  {
    id: 'data-text',
    label: 'Pseudo-element copies',
    detail:
      '::before and ::after repeat the word via content: attr(data-text). These extra layers can be coloured, offset, blurred or clipped independently of the real text.',
    test: (_css, e) => usesDataText.has(e.type),
  },
  {
    id: 'clip-text',
    label: 'background-clip: text',
    detail:
      'A background is painted behind the word and clipped to the glyph shapes, with the text colour set to transparent, so the fill only shows through the letters.',
    test: has(/background-clip:\s*text/),
  },
  {
    id: 'bg-position',
    label: 'Animated background-position',
    detail:
      'The background is larger than the text, and @keyframes slide its background-position, which makes the fill appear to flow through the letters.',
    test: has(/background-position/),
  },
  {
    id: 'conic',
    label: 'conic-gradient',
    detail: 'A conic-gradient sweeps colour around a centre point, which suits rotating beams, sweeps and vortices.',
    test: has(/conic-gradient/),
  },
  {
    id: 'repeating',
    label: 'Repeating gradients',
    detail:
      'repeating-linear-gradient / repeating-radial-gradient generate stripes, scanlines, dots or grids procedurally, so no image files are needed.',
    test: has(/repeating-(?:linear|radial|conic)-gradient/),
  },
  {
    id: 'text-shadow',
    label: 'Layered text-shadow',
    detail:
      'Stacked, comma-separated text-shadow values build glow, depth or offset copies of the word without adding elements.',
    test: has(/text-shadow/),
  },
  {
    id: 'text-stroke',
    label: '-webkit-text-stroke',
    detail: 'A stroke outlines the letterforms, either on its own as hollow text or layered under a fill.',
    test: has(/-webkit-text-stroke/),
  },
  {
    id: 'svg-dash',
    label: 'SVG stroke-dashoffset',
    detail:
      'The word is SVG <text> with a dashed stroke. Animating stroke-dashoffset moves the dashes along the outline so the letters appear to trace themselves.',
    test: has(/stroke-dash/),
  },
  {
    id: 'clip-path',
    label: 'clip-path',
    detail: 'clip-path masks a layer to an inset rectangle or polygon. Animating it slices, wipes or reveals parts of the word.',
    test: has(/clip-path/),
  },
  {
    id: 'mask',
    label: 'CSS masks',
    detail: 'A gradient mask fades or cuts out parts of a layer using its alpha channel, without touching the markup.',
    test: has(/(?:^|[\s;{])(?:-webkit-)?mask(?:-image)?\s*:/),
  },
  {
    id: 'blend',
    label: 'mix-blend-mode',
    detail:
      'mix-blend-mode composites a layer onto the text (difference, screen, multiply…), so colours invert or combine where they overlap.',
    test: has(/mix-blend-mode/),
  },
  {
    id: 'filter',
    label: 'CSS filters',
    detail:
      'Filter functions such as blur(), brightness(), drop-shadow() and hue-rotate() post-process the rendered letters on the GPU.',
    test: has(/(?:^|[\s;{])filter\s*:/),
  },
  {
    id: 'backdrop',
    label: 'backdrop-filter',
    detail: 'backdrop-filter blurs or distorts whatever sits behind a layer. That is what gives it the glass-like refraction.',
    test: has(/backdrop-filter/),
  },
  {
    id: '3d',
    label: '3D transforms',
    detail:
      'perspective together with rotateX / rotateY / translateZ moves the letters through real 3D space instead of faking depth with scale.',
    test: has(/perspective|rotate[XY]\(|translateZ|preserve-3d/),
  },
  {
    id: 'reflect',
    label: '-webkit-box-reflect',
    detail:
      '-webkit-box-reflect renders a live mirrored copy of the element. It works in Chromium and Safari, and other browsers simply show the word without the reflection.',
    test: has(/-webkit-box-reflect/),
  },
  {
    id: 'property',
    label: '@property',
    detail:
      '@property registers a typed custom property (such as an <angle>), so the browser can interpolate it smoothly inside @keyframes.',
    test: has(/@property/),
  },
  {
    id: 'content-swap',
    label: 'Animated content',
    detail: 'Keyframes swap the pseudo-element’s content string frame by frame, cycling through characters with no JavaScript.',
    test: has(/%\s*\{\s*content\s*:/),
  },
  {
    id: 'transform',
    label: 'Keyframed transforms',
    detail:
      'The motion comes from translate, scale, rotate and skew inside @keyframes. Transforms are composited on the GPU, so the animation stays smooth without triggering layout.',
    test: animates(/transform\s*:|translate|scale\(|rotate|skew/),
  },
  {
    id: 'origin',
    label: 'transform-origin',
    detail: 'transform-origin moves the pivot point, so letters swing, fold or squash from an edge instead of their centre.',
    test: has(/transform-origin/),
  },
  {
    id: 'width-reveal',
    label: 'Width reveal',
    detail:
      'The text sits in an overflow: hidden box whose width is animated, so characters are uncovered one at a time.',
    test: (css) => /overflow:\s*hidden/.test(css) && animates(/(?:^|[\s;{])width\s*:/)(css),
  },
  {
    id: 'opacity',
    label: 'Opacity keyframes',
    detail: 'Opacity changes inside the keyframes fade or flicker layers in and out, timed against the rest of the motion.',
    test: animates(/opacity\s*:/),
  },
  {
    id: 'color',
    label: 'Animated colour',
    detail: 'The colour tokens are swapped inside the keyframes, so the letters shift hue as the effect plays.',
    test: animates(/(?:^|[\s;{])color\s*:/),
  },
  {
    id: 'steps',
    label: 'steps() timing',
    detail:
      'steps() makes the animation jump between frames instead of easing, which gives it a mechanical, digital or typed feel.',
    test: has(/steps\(/),
  },
];

export interface EffectGuide {
  techniques: { id: string; label: string; detail: string }[];
  keyframeCount: number;
  /** longest animation cycle in seconds */
  loopSeconds: number;
}

function analyse(effect: Effect): EffectGuide {
  const css = effectCss[effect.type] ?? '';
  const techniques = TECHNIQUES.filter((t) => t.test(css, effect)).map(({ id, label, detail }) => ({ id, label, detail }));
  const keyframeCount = new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1])).size;
  // First time value in each animation shorthand is its duration.
  const durations = [...css.matchAll(/animation\s*:\s*([^;]+)/g)].flatMap((m) =>
    m[1].split(',').map((part) => {
      const t = part.match(/(\d*\.?\d+)(m?s)\b/);
      return t ? Number(t[1]) / (t[2] === 'ms' ? 1000 : 1) : 0;
    })
  );
  return { techniques, keyframeCount, loopSeconds: Math.max(0, ...durations) };
}

export const guides = new Map<Effect, EffectGuide>(effects.map((e) => [e, analyse(e)]));

/** Six related effects: same category first, then by shared techniques. */
export function relatedEffects(effect: Effect, count = 6): Effect[] {
  const mine = new Set(guides.get(effect)!.techniques.map((t) => t.id));
  const category = effectSeo(effect).category;
  const score = (other: Effect) => {
    const theirs = guides.get(other)!.techniques.map((t) => t.id);
    const shared = theirs.filter((id) => mine.has(id)).length;
    const union = new Set([...mine, ...theirs]).size || 1;
    return (effectSeo(other).category === category ? 1 : 0) + shared / union;
  };
  return effects
    .filter((e) => e !== effect)
    .map((e) => ({ e, s: score(e) }))
    .sort((a, b) => b.s - a.s || a.e.index.localeCompare(b.e.index))
    .slice(0, count)
    .map(({ e }) => e);
}
