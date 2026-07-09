export type EffectType =
  | 'aurora'
  | 'glitch'
  | 'typewriter'
  | 'neon'
  | 'liquid'
  | 'chrome'
  | 'focus'
  | 'wave'
  | 'sliced'
  | 'decoder'
  | 'scanner'
  | 'ember'
  | 'echo'
  | 'extrude'
  | 'contour'
  | 'spectrum'
  | 'jitter'
  | 'anaglyph'
  | 'flap'
  | 'crt'
  | 'pop'
  | 'spotlight'
  | 'elastic'
  | 'mirror'
  | 'ransom'
  | 'melt'
  | 'heartbeat'
  | 'marker'
  | 'sundial'
  | 'negative'
  | 'hologram'
  | 'foil'
  | 'pixel'
  | 'starlight'
  | 'blueprint'
  | 'vapor'
  | 'kinetic'
  | 'blackout'
  | 'magnetic'
  | 'mesh'
  | 'iridescent'
  | 'glass'
  | 'datastream'
  | 'orbit'
  | 'prismcut'
  | 'softblur'
  | 'laser'
  | 'microchip'
  | 'heatmap'
  | 'parallax'
  | 'inktrap'
  | 'topographic'
  | 'signal'
  | 'portal'
  | 'tiltshift'
  | 'duotone'
  | 'glyphrain';

export interface Effect {
  index: string;
  name: string;
  type: EffectType;
  /** the word the effect renders in its stage */
  text: string;
}

export const effects: Effect[] = [
  { index: '01', name: 'Borealis', type: 'aurora', text: 'AURORA' },
  { index: '02', name: 'Glitchcore', type: 'glitch', text: 'GLITCH' },
  { index: '03', name: 'Teletype', type: 'typewriter', text: 'TYPEWRITER' },
  { index: '04', name: 'Neon-Haus', type: 'neon', text: 'NEON' },
  { index: '05', name: 'Aqua-Fill', type: 'liquid', text: 'LIQUID' },
  { index: '06', name: 'Chromia', type: 'chrome', text: 'CHROME' },
  { index: '07', name: 'Lens-Drift', type: 'focus', text: 'FOCUS' },
  { index: '08', name: 'Tidal-Type', type: 'wave', text: 'WAVE' },
  { index: '09', name: 'Bisect', type: 'sliced', text: 'SLICED' },
  { index: '10', name: 'Cipher', type: 'decoder', text: 'DECODER' },
  { index: '11', name: 'Redactor', type: 'scanner', text: 'SCANNER' },
  { index: '12', name: 'Emberglow', type: 'ember', text: 'EMBER' },
  { index: '13', name: 'Echo-Verse', type: 'echo', text: 'ECHO' },
  { index: '14', name: 'Deep-Type', type: 'extrude', text: 'DEPTH' },
  { index: '15', name: 'Wireframe', type: 'contour', text: 'OUTLINE' },
  { index: '16', name: 'Prisma', type: 'spectrum', text: 'SPECTRUM' },
  { index: '17', name: 'Jitterbug', type: 'jitter', text: 'JITTER' },
  { index: '18', name: 'Anaglyph-3D', type: 'anaglyph', text: 'DEPTH-3D' },
  { index: '19', name: 'Split-Flap', type: 'flap', text: 'DEPART' },
  { index: '20', name: 'Phosphor', type: 'crt', text: 'CRT_MODE' },
  { index: '21', name: 'Pop-Riot', type: 'pop', text: 'POP!' },
  { index: '22', name: 'Limelight', type: 'spotlight', text: 'SPOTLIGHT' },
  { index: '23', name: 'Rubber-Band', type: 'elastic', text: 'BOING' },
  { index: '24', name: 'Still-Water', type: 'mirror', text: 'MIRROR' },
  { index: '25', name: 'Ransom-Note', type: 'ransom', text: 'RANSOM' },
  { index: '26', name: 'Meltdown', type: 'melt', text: 'MELT' },
  { index: '27', name: 'Cardio', type: 'heartbeat', text: 'PULSE' },
  { index: '28', name: 'Hi-Liter', type: 'marker', text: 'MARKED' },
  { index: '29', name: 'Sundial', type: 'sundial', text: 'SHADOW' },
  { index: '30', name: 'Negativ', type: 'negative', text: 'INVERTED' },
  { index: '31', name: 'Holograph', type: 'hologram', text: 'HOLOGRAM' },
  { index: '32', name: 'Gold-Foil', type: 'foil', text: 'LUXE' },
  { index: '33', name: 'Pixel-Sort', type: 'pixel', text: 'PIXELS' },
  { index: '34', name: 'Starlight', type: 'starlight', text: 'STARDUST' },
  { index: '35', name: 'Blueprint', type: 'blueprint', text: 'DRAFT' },
  { index: '36', name: 'Vapor-Trail', type: 'vapor', text: 'VAPOR' },
  { index: '37', name: 'Kinetic-Type', type: 'kinetic', text: 'KINETIC' },
  { index: '38', name: 'Blackout', type: 'blackout', text: 'CLASSIFIED' },
  { index: '39', name: 'Magnetic', type: 'magnetic', text: 'MAGNET' },
  { index: '40', name: 'Luma-Mesh', type: 'mesh', text: 'MESH' },
  { index: '41', name: 'Iridescent', type: 'iridescent', text: 'IRIS' },
  { index: '42', name: 'Glass-Type', type: 'glass', text: 'GLASS' },
  { index: '43', name: 'Datastream', type: 'datastream', text: 'STREAM' },
  { index: '44', name: 'Orbitals', type: 'orbit', text: 'ORBIT' },
  { index: '45', name: 'Prism-Cut', type: 'prismcut', text: 'PRISM' },
  { index: '46', name: 'Soft-Blur', type: 'softblur', text: 'FOCUS' },
  { index: '47', name: 'Laser-Cut', type: 'laser', text: 'LASER' },
  { index: '48', name: 'Microchip', type: 'microchip', text: 'CIRCUIT' },
  { index: '49', name: 'Heatmap', type: 'heatmap', text: 'THERMAL' },
  { index: '50', name: 'Parallax', type: 'parallax', text: 'LAYERS' },
  { index: '51', name: 'Ink-Trap', type: 'inktrap', text: 'INK' },
  { index: '52', name: 'Topographic', type: 'topographic', text: 'TERRAIN' },
  { index: '53', name: 'Signal-Noise', type: 'signal', text: 'SIGNAL' },
  { index: '54', name: 'Portal', type: 'portal', text: 'PORTAL' },
  { index: '55', name: 'Tilt-Shift', type: 'tiltshift', text: 'SHIFT' },
  { index: '56', name: 'Duotone', type: 'duotone', text: 'DUO' },
  { index: '57', name: 'Glyph-Rain', type: 'glyphrain', text: 'GLYPHS' },
];

/** effects whose letters are wrapped in indexed <b> spans for per-letter animation */
export const perLetter = new Set<EffectType>([
  'focus',
  'wave',
  'spectrum',
  'flap',
  'pop',
  'ransom',
  'melt',
  'kinetic',
  'magnetic',
  'orbit',
  'parallax',
  'glyphrain',
]);

/** effects that duplicate their text into pseudo-elements via data-text */
export const usesDataText = new Set<EffectType>([
  'glitch',
  'sliced',
  'echo',
  'hologram',
  'pixel',
  'vapor',
  'blackout',
  'glass',
  'prismcut',
  'laser',
  'inktrap',
  'signal',
  'portal',
  'tiltshift',
  'duotone',
]);
