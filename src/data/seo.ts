import { effects, type Effect, type EffectType } from './effects';

/**
 * Search-facing metadata for every effect. The library names ("Neon-Haus",
 * "Glitchcore") are brand names nobody searches for, so each effect also gets
 * a plain-English keyword phrase — used for its URL slug, page title and H1 —
 * plus a category for grouping related effects.
 */

export type Category = 'gradient' | 'glitch' | 'glow' | 'reveal' | 'depth' | 'retro' | 'motion' | 'texture';

export const categoryLabels: Record<Category, string> = {
  gradient: 'Gradient & colour',
  glitch: 'Glitch & distortion',
  glow: 'Neon & glow',
  reveal: 'Reveal & typing',
  depth: '3D & depth',
  retro: 'Retro display',
  motion: 'Letter motion',
  texture: 'Material & texture',
};

interface CategoryInfo {
  slug: string;
  /** H1 / title phrase — the search term the page targets */
  heading: string;
  /** one-line summary for meta descriptions and cards */
  summary: string;
  /** intro paragraphs explaining the technique family */
  intro: string[];
}

export const categories: Record<Category, CategoryInfo> = {
  gradient: {
    slug: 'css-gradient-text-animations',
    heading: 'CSS Gradient Text Animations',
    summary: 'Animated gradient, rainbow and colour-shifting text built with pure CSS.',
    intro: [
      'Gradient text in CSS starts with one trick: paint a gradient as the element’s background, clip it to the glyphs with background-clip: text, and make the text colour transparent. The letters become a window onto the gradient.',
      'To animate it, the background is made larger than the text and its background-position is moved with @keyframes, so colour flows through the word. Other effects here rotate a conic-gradient, cycle hue-rotate() or layer offset colour plates for iridescent, holographic and mesh-gradient looks.',
    ],
  },
  glitch: {
    slug: 'css-glitch-text-effects',
    heading: 'CSS Glitch Text Effects',
    summary: 'RGB split, sliced, jittering and signal-noise glitch text in pure CSS.',
    intro: [
      'Most CSS glitch effects duplicate the word into ::before and ::after with content: attr(data-text), tint each copy a different colour, and clip them into horizontal bands with clip-path. Shifting those bands a few pixels at random-looking keyframes produces the RGB-split tear.',
      'steps() timing makes the jumps snap instead of ease, which is what sells the digital-error feel. The effects below also use skew, blur and repeating gradients for jitter, pixel sorting, holographic scanlines and broadcast interference.',
    ],
  },
  glow: {
    slug: 'css-neon-glow-text-effects',
    heading: 'CSS Neon & Glow Text Effects',
    summary: 'Neon signs, fire, sparkle, electric and soft-glow text in pure CSS.',
    intro: [
      'Glow in CSS is built from stacked text-shadow layers: a tight, bright shadow for the tube core and progressively wider, softer shadows for the halo. Animating their opacity or blur radius makes the light flicker, pulse or breathe.',
      'The effects in this collection combine that with filter: drop-shadow(), brightness() and blend modes to produce neon signs, embers, heartbeats, spotlights, eclipses and crackling electricity — all without images or JavaScript.',
    ],
  },
  reveal: {
    slug: 'css-text-reveal-animations',
    heading: 'CSS Text Reveal & Typing Animations',
    summary: 'Typewriter, scramble, highlighter, shimmer and wipe-in text reveals in pure CSS.',
    intro: [
      'Reveal animations control how much of the word is visible over time. A typewriter animates the width of an overflow: hidden box with steps(), one step per character. Wipes and highlighter strokes animate clip-path or a background-size sweep across the text.',
      'Other reveals here swap characters inside @keyframes content to decode scrambled text, pass a luminance band over muted letters for the “AI thinking” shimmer, or stamp, redact and karaoke-fill the word, and hide it under shimmering invisible ink.',
    ],
  },
  depth: {
    slug: 'css-3d-text-effects',
    heading: 'CSS 3D Text Effects',
    summary: 'Extruded, rotating, folding, reflected and long-shadow 3D text in pure CSS.',
    intro: [
      'There are two ways to give text depth in CSS. The first stacks many offset text-shadow layers to extrude the letters into a solid block or cast a long shadow. The second uses real 3D transforms — perspective, rotateX, rotateY and translateZ — to move letters through space.',
      'This collection covers both: extruded and anaglyph type, parallax shadow layers, letters that fold like paper or spin on a drum, keycaps that press down, reflections and hyperspace zooms.',
    ],
  },
  retro: {
    slug: 'css-retro-text-effects',
    heading: 'Retro CSS Text Effects',
    summary: '70s retro, CRT terminal, split-flap, LED board, dot-matrix and matrix-rain text in pure CSS.',
    intro: [
      'Retro display effects recreate hardware with gradients. repeating-linear-gradient draws CRT scanlines and LED grids, radial gradients form dot-matrix pixels, and steps() timing reproduces the mechanical clack of a split-flap departure board.',
      'Stacked offset text-shadow layers in a warm cream, orange and brown palette give the classic 70s retro type look. Each effect here is still live, selectable text — no canvas, no images — so it stays accessible and scales cleanly with font-size.',
    ],
  },
  motion: {
    slug: 'css-letter-animations',
    heading: 'CSS Letter Animations',
    summary: 'Per-letter wave, bounce, pendulum, domino, explode and marquee text animations in pure CSS.',
    intro: [
      'Letter-by-letter animation in CSS wraps each character in its own element with an index custom property — <b style="--i:3">. Every letter runs the same @keyframes, but animation-delay: calc(var(--i) * 0.08s) offsets them so the motion ripples through the word.',
      'With that one pattern you get waves, bounces, swinging pendulums, toppling dominoes, shattering and smoke-like letters, and laser bolts that fire each letter into place. Transforms keep it GPU-composited, so it stays smooth even on long words.',
    ],
  },
  texture: {
    slug: 'css-textured-text-effects',
    heading: 'CSS Textured & Material Text Effects',
    summary: 'Chrome, gold foil, marble, glass, liquid, ice, grunge and film-grain text in pure CSS.',
    intro: [
      'Material effects fill the letters with a texture instead of a flat colour. Layered linear and radial gradients clipped to the text imitate brushed chrome, gold foil, marble veining and frost; a moving highlight band adds the specular sheen.',
      'Glass and lens effects use backdrop-filter to blur what is behind them, and noise, grunge wear, caustics and liquid fills are built from animated gradients, inline SVG noise and masks — no image files required.',
    ],
  },
};

export const categoryPath = (category: Category) => `/${categories[category].slug}/`;

export const categoryOrder = Object.keys(categories) as Category[];

export const effectsIn = (category: Category) => effects.filter((e) => seo[e.type].category === category);

interface EffectSeo {
  slug: string;
  keyword: string;
  category: Category;
}

const seo: Record<EffectType, EffectSeo> = {
  aurora: { slug: 'aurora-gradient-text-animation', keyword: 'Aurora Gradient Text Animation', category: 'gradient' },
  glitch: { slug: 'glitch-text-effect', keyword: 'Glitch Text Effect', category: 'glitch' },
  typewriter: { slug: 'typewriter-effect', keyword: 'Typewriter Text Effect', category: 'reveal' },
  neon: { slug: 'neon-text-effect', keyword: 'Neon Text Effect', category: 'glow' },
  liquid: { slug: 'liquid-fill-text-animation', keyword: 'Liquid Fill Text Animation', category: 'texture' },
  chrome: { slug: 'chrome-text-effect', keyword: 'Chrome Metallic Text Effect', category: 'texture' },
  focus: { slug: 'blur-focus-text-animation', keyword: 'Text Blur Focus Effect', category: 'motion' },
  wave: { slug: 'wave-text-animation', keyword: 'Wavy Text Animation', category: 'motion' },
  sliced: { slug: 'sliced-text-effect', keyword: 'Sliced Text Effect', category: 'glitch' },
  decoder: { slug: 'text-scramble-effect', keyword: 'Text Scramble Decode Effect', category: 'reveal' },
  scanner: { slug: 'scanning-highlight-text-effect', keyword: 'Scanning Highlight Text Effect', category: 'reveal' },
  ember: { slug: 'fire-text-effect', keyword: 'Fire Text Effect', category: 'glow' },
  echo: { slug: 'echo-text-effect', keyword: 'Echo Text Effect', category: 'depth' },
  extrude: { slug: '3d-text-effect', keyword: '3D Extruded Text Effect', category: 'depth' },
  contour: { slug: 'outline-text-animation', keyword: 'Animated Outline Text', category: 'reveal' },
  spectrum: { slug: 'rainbow-text-animation', keyword: 'Rainbow Text Animation', category: 'gradient' },
  jitter: { slug: 'shaky-text-effect', keyword: 'Shaky Jitter Text Effect', category: 'glitch' },
  anaglyph: { slug: 'anaglyph-3d-text-effect', keyword: 'Anaglyph 3D Text Effect', category: 'depth' },
  flap: { slug: 'split-flap-text-animation', keyword: 'Split-Flap Display Text Animation', category: 'retro' },
  crt: { slug: 'crt-terminal-text-effect', keyword: 'Retro CRT Terminal Text Effect', category: 'retro' },
  pop: { slug: 'pop-art-text-effect', keyword: 'Pop Art Comic Text Effect', category: 'motion' },
  spotlight: { slug: 'spotlight-text-effect', keyword: 'Spotlight Text Effect', category: 'glow' },
  elastic: { slug: 'rubber-band-text-animation', keyword: 'Rubber Band Text Animation', category: 'motion' },
  mirror: { slug: 'text-reflection-effect', keyword: 'Water Reflection Text Effect', category: 'depth' },
  ransom: { slug: 'ransom-note-text-effect', keyword: 'Ransom Note Text Effect', category: 'motion' },
  melt: { slug: 'melting-text-effect', keyword: 'Melting Text Effect', category: 'motion' },
  heartbeat: { slug: 'heartbeat-text-animation', keyword: 'Heartbeat Pulse Text Animation', category: 'glow' },
  marker: { slug: 'highlighter-text-effect', keyword: 'Highlighter Marker Text Effect', category: 'reveal' },
  sundial: { slug: 'long-shadow-text-effect', keyword: 'Animated Long Shadow Text', category: 'depth' },
  negative: { slug: 'inverted-text-effect', keyword: 'Inverted Negative Text Effect', category: 'reveal' },
  hologram: { slug: 'hologram-text-effect', keyword: 'Hologram Text Effect', category: 'glitch' },
  foil: { slug: 'gold-text-effect', keyword: 'Gold Foil Text Effect', category: 'texture' },
  pixel: { slug: 'pixel-text-effect', keyword: 'Pixel Sort Text Effect', category: 'glitch' },
  starlight: { slug: 'sparkle-text-effect', keyword: 'Sparkle Text Effect', category: 'glow' },
  blueprint: { slug: 'blueprint-text-effect', keyword: 'Blueprint Grid Text Effect', category: 'texture' },
  vapor: { slug: 'vaporwave-text-effect', keyword: 'Vaporwave Trail Text Effect', category: 'glow' },
  kinetic: { slug: 'kinetic-typography-animation', keyword: 'Kinetic Typography Animation', category: 'motion' },
  blackout: { slug: 'redacted-text-effect', keyword: 'Redacted Text Effect', category: 'reveal' },
  magnetic: { slug: 'magnetic-letters-animation', keyword: 'Magnetic Letters Animation', category: 'motion' },
  mesh: { slug: 'mesh-gradient-text-animation', keyword: 'Mesh Gradient Text Animation', category: 'gradient' },
  iridescent: { slug: 'iridescent-text-effect', keyword: 'Iridescent Text Effect', category: 'gradient' },
  glass: { slug: 'glass-text-effect', keyword: 'Frosted Glass Text Effect', category: 'texture' },
  datastream: { slug: 'matrix-text-effect', keyword: 'Matrix Data Stream Text Effect', category: 'retro' },
  orbit: { slug: 'orbiting-letters-animation', keyword: 'Orbiting Letters Animation', category: 'motion' },
  prismcut: { slug: 'prism-text-effect', keyword: 'Prism Refraction Text Effect', category: 'gradient' },
  softblur: { slug: 'soft-glow-text-animation', keyword: 'Soft Blur Glow Text Animation', category: 'glow' },
  laser: { slug: 'laser-cut-text-effect', keyword: 'Laser Cut Text Effect', category: 'glitch' },
  microchip: { slug: 'circuit-board-text-effect', keyword: 'Circuit Board Text Effect', category: 'texture' },
  heatmap: { slug: 'thermal-heatmap-text-effect', keyword: 'Thermal Heatmap Text Effect', category: 'gradient' },
  parallax: { slug: 'parallax-text-shadow-animation', keyword: 'Parallax Layered Shadow Text', category: 'depth' },
  inktrap: { slug: 'ink-bleed-text-effect', keyword: 'Ink Bleed Text Effect', category: 'texture' },
  topographic: { slug: 'topographic-text-effect', keyword: 'Topographic Contour Text Effect', category: 'texture' },
  signal: { slug: 'tv-signal-distortion-text-effect', keyword: 'TV Signal Distortion Text Effect', category: 'glitch' },
  portal: { slug: 'vortex-text-effect', keyword: 'Portal Vortex Text Effect', category: 'gradient' },
  tiltshift: { slug: 'tilt-shift-text-effect', keyword: 'Tilt-Shift Blur Text Effect', category: 'depth' },
  duotone: { slug: 'duotone-text-effect', keyword: 'Duotone Offset Text Effect', category: 'gradient' },
  glyphrain: { slug: 'falling-letters-animation', keyword: 'Falling Letters Animation', category: 'motion' },
  zoetrope: { slug: '3d-rotating-text-animation', keyword: '3D Rotating Text Animation', category: 'depth' },
  dotmatrix: { slug: 'dot-matrix-text-effect', keyword: 'Dot Matrix Printer Text Effect', category: 'retro' },
  pendulum: { slug: 'swinging-text-animation', keyword: 'Swinging Pendulum Text Animation', category: 'motion' },
  smoke: { slug: 'smoke-text-animation', keyword: 'Smoke Text Animation', category: 'motion' },
  eclipse: { slug: 'eclipse-text-effect', keyword: 'Eclipse Text Effect', category: 'glow' },
  barcode: { slug: 'barcode-scanner-text-effect', keyword: 'Barcode Scanner Text Effect', category: 'retro' },
  frost: { slug: 'frozen-ice-text-effect', keyword: 'Frozen Ice Text Effect', category: 'texture' },
  moire: { slug: 'moire-pattern-text-effect', keyword: 'Moiré Pattern Text Effect', category: 'texture' },
  stamp: { slug: 'rubber-stamp-text-effect', keyword: 'Rubber Stamp Text Effect', category: 'reveal' },
  led: { slug: 'led-sign-text-effect', keyword: 'LED Sign Text Effect', category: 'retro' },
  lightleak: { slug: 'light-leak-text-effect', keyword: 'Light Leak Text Effect', category: 'gradient' },
  voltage: { slug: 'electric-text-effect', keyword: 'Electric Text Effect', category: 'glow' },
  marble: { slug: 'marble-text-effect', keyword: 'Marble Text Effect', category: 'texture' },
  ripple: { slug: 'water-ripple-text-effect', keyword: 'Water Ripple Text Effect', category: 'texture' },
  shatter: { slug: 'exploding-text-animation', keyword: 'Exploding Text Animation', category: 'motion' },
  grain: { slug: 'film-grain-text-effect', keyword: 'Film Grain Text Effect', category: 'texture' },
  caustic: { slug: 'underwater-caustics-text-effect', keyword: 'Underwater Caustics Text Effect', category: 'texture' },
  fold: { slug: 'origami-fold-text-animation', keyword: 'Origami Fold Text Animation', category: 'depth' },
  domino: { slug: 'domino-letters-animation', keyword: 'Domino Falling Letters Animation', category: 'motion' },
  zipper: { slug: 'zipper-text-animation', keyword: 'Zipper Text Animation', category: 'motion' },
  equalizer: { slug: 'equalizer-text-animation', keyword: 'Audio Equalizer Text Animation', category: 'motion' },
  gooey: { slug: 'gooey-liquid-metal-text-effect', keyword: 'Gooey Liquid Metal Text Effect', category: 'texture' },
  sonar: { slug: 'radar-sonar-text-effect', keyword: 'Radar Sonar Text Effect', category: 'glow' },
  warp: { slug: 'hyperspace-zoom-text-animation', keyword: 'Hyperspace Zoom Text Animation', category: 'depth' },
  shimmer: { slug: 'shimmer-text-effect', keyword: 'Shimmer Text Effect', category: 'reveal' },
  ticker: { slug: 'marquee-text-animation', keyword: 'Infinite Marquee Text Animation', category: 'motion' },
  kaboom: { slug: 'slam-text-animation', keyword: 'Text Slam Effect Animation', category: 'motion' },
  karaoke: { slug: 'karaoke-text-fill-animation', keyword: 'Karaoke Text Fill Animation', category: 'reveal' },
  lenticular: { slug: 'holographic-card-text-effect', keyword: 'Holographic Card Text Effect', category: 'gradient' },
  balloon: { slug: 'balloon-text-animation', keyword: 'Inflating Balloon Text Animation', category: 'motion' },
  lens: { slug: 'liquid-glass-text-effect', keyword: 'Liquid Glass Lens Text Effect', category: 'texture' },
  smear: { slug: 'motion-blur-text-animation', keyword: 'Motion Blur Text Animation', category: 'motion' },
  keycap: { slug: 'keyboard-keycap-text-animation', keyword: 'Keyboard Keycap Text Animation', category: 'depth' },
  groovy: { slug: 'retro-text-effect', keyword: 'Retro 70s Text Effect', category: 'retro' },
  grunge: { slug: 'grunge-text-effect', keyword: 'Grunge Distressed Text Effect', category: 'texture' },
  pewpew: { slug: 'pew-pew-text-effect', keyword: 'Pew Pew Laser Text Effect', category: 'motion' },
  invisible: { slug: 'invisible-ink-text-effect', keyword: 'Invisible Ink Text Effect', category: 'reveal' },
  loud: { slug: 'loud-text-animation', keyword: 'Loud Shouting Text Animation', category: 'motion' },
  gentle: { slug: 'gentle-text-animation', keyword: 'Gentle Whisper Text Animation', category: 'reveal' },
  rotator: { slug: 'text-changing-animation', keyword: 'Text Changing Animation', category: 'reveal' },
  loader: { slug: 'text-loading-animation', keyword: 'Text Loading Animation', category: 'motion' },
  fade: { slug: 'fading-text-effect', keyword: 'Fading Text Effect', category: 'reveal' },
};

export const effectSeo = (effect: Effect): EffectSeo => seo[effect.type];

export const effectPath = (effect: Effect) => `/effects/${seo[effect.type].slug}/`;

// Fail the build on a duplicate slug rather than silently overwriting a page.
const slugs = effects.map((e) => seo[e.type].slug);
const dupe = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (dupe) throw new Error(`Duplicate effect slug: ${dupe}`);
