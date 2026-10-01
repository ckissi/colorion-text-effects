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
  focus: { slug: 'blur-focus-text-animation', keyword: 'Blur Focus Text Animation', category: 'motion' },
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
  kaboom: { slug: 'slam-text-animation', keyword: 'Slam-In Impact Text Animation', category: 'motion' },
  karaoke: { slug: 'karaoke-text-fill-animation', keyword: 'Karaoke Text Fill Animation', category: 'reveal' },
  lenticular: { slug: 'holographic-card-text-effect', keyword: 'Holographic Card Text Effect', category: 'gradient' },
  balloon: { slug: 'balloon-text-animation', keyword: 'Inflating Balloon Text Animation', category: 'motion' },
  lens: { slug: 'liquid-glass-text-effect', keyword: 'Liquid Glass Lens Text Effect', category: 'texture' },
  smear: { slug: 'motion-blur-text-animation', keyword: 'Motion Blur Text Animation', category: 'motion' },
  keycap: { slug: 'keyboard-keycap-text-animation', keyword: 'Keyboard Keycap Text Animation', category: 'depth' },
};

export const effectSeo = (effect: Effect): EffectSeo => seo[effect.type];

export const effectPath = (effect: Effect) => `/effects/${seo[effect.type].slug}/`;

// Fail the build on a duplicate slug rather than silently overwriting a page.
const slugs = effects.map((e) => seo[e.type].slug);
const dupe = slugs.find((s, i) => slugs.indexOf(s) !== i);
if (dupe) throw new Error(`Duplicate effect slug: ${dupe}`);
