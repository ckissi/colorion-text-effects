import type { EffectType } from './effects';
import type { Category } from './seo';

interface CategoryGuide {
  choosing: string;
  comparisons: { type: EffectType; bestFor: string; tradeoff: string }[];
  example: { title: string; explanation: string; markup: string; css: string };
  questions: { question: string; answer: string }[];
}

/** Selection advice and small standalone examples, distinct from the catalogue. */
export const categoryGuides: Record<Category, CategoryGuide> = {
  gradient: {
    choosing: 'Choose a whole-word gradient when you want colour to travel continuously through a heading. Choose per-letter colour motion when you want each character to have its own phase. Keep the most important words readable at both the lightest and darkest points of the animation.',
    comparisons: [
      { type: 'aurora', bestFor: 'A flowing hero headline', tradeoff: 'The original also rotates hue, so its colours drift beyond the initial palette.' },
      { type: 'spectrum', bestFor: 'A rainbow that ripples letter by letter', tradeoff: 'Each character needs its own indexed element; preserve an accessible whole-word label.' },
      { type: 'mesh', bestFor: 'A softer, layered colour field', tradeoff: 'Overlapping gradients need enough contrast to keep small letters distinct.' },
    ],
    example: {
      title: 'Start with a readable static gradient',
      explanation: 'The normal colour is the fallback. Only make the letters transparent after the browser confirms text clipping. Once this static fill works, an oversized background and background-position keyframes can add movement.',
      markup: '<span class="example-gradient">COLOUR IN MOTION</span>',
      css: `.example-gradient {
  color: #8b3bcc;
  font: 600 2rem/1.2 system-ui, sans-serif;
}
@supports ((background-clip: text) or (-webkit-background-clip: text)) {
  .example-gradient {
    background: linear-gradient(90deg, #b42aa8, #147c99);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}`,
    },
    questions: [
      { question: 'Should the gradient move or stay still?', answer: 'A static fill is useful for headings people must read immediately. A moving fill works for a short decorative headline. Keep the fill itself outside the animation, so reduced-motion visitors still see the gradient when keyframes are disabled.' },
      { question: 'How do I keep my brand colours unchanged?', answer: 'Animate background-position rather than hue-rotate(). The aurora guide includes a fixed-palette variation. In a per-letter rainbow, set explicit colour stops instead of relying on a full hue cycle.' },
    ],
  },
  glitch: {
    choosing: 'Match the distortion to the message: a brief RGB split suggests a signal fault, a sliced effect gives larger geometric cuts, and whole-word jitter adds shake with simpler markup. Keep the original text visible beneath decorative copies and leave room for their offsets.',
    comparisons: [
      { type: 'glitch', bestFor: 'Short cyberpunk or signal-error headings', tradeoff: 'The visible word and data-text copies must match; continuous tearing can distract from reading.' },
      { type: 'sliced', bestFor: 'A strong geometric cut across a title', tradeoff: 'Clipped layers need space around the word so displaced edges are not trimmed.' },
      { type: 'jitter', bestFor: 'A small label that shakes as one unit', tradeoff: 'Whole-word motion is simpler but moves the text the reader is trying to focus on.' },
    ],
    example: {
      title: 'Make one coloured signal tear',
      explanation: 'The pseudo-element repeats the same word, clips its upper half and moves it briefly. The original stays still. Keep data-text equal to the visible text; reduced motion hides the decorative layer.',
      markup: '<span class="example-glitch" data-text="SIGNAL">SIGNAL</span>',
      css: `.example-glitch {
  position: relative;
  font: 700 2rem/1.2 monospace;
}
.example-glitch::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: #ff4fd8;
  clip-path: inset(0 0 50% 0);
  opacity: 0;
  animation: example-signal 2s steps(1) infinite;
}
@keyframes example-signal {
  12%, 16% { opacity: .8; transform: translateX(-3px); }
  0%, 20%, 100% { opacity: 0; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .example-glitch::before { animation: none; opacity: 0; }
}`,
    },
    questions: [
      { question: 'Can I use a glitch effect on body text?', answer: 'Continuous clipping and shaking make paragraphs harder to follow. Reserve the effect for a short heading or decorative label, and keep instructions, links and error explanations in stable text.' },
      { question: 'Should I use duplicated text or one moving element?', answer: 'Duplicated layers let the original remain readable while colour channels tear independently. One moving element is easier to maintain but moves the whole word. Use the one-shot variation on the glitch guide when the heading should settle after its entrance.' },
    ],
  },
  glow: {
    choosing: 'A steady neon halo works well for an important label on a dark surface. Flicker makes a sign feel electrical, while fire and pulse effects suggest heat or rhythm. Choose the least movement that communicates the intended mood, and check the word without relying on its halo for readability.',
    comparisons: [
      { type: 'neon', bestFor: 'A bright sign with brief outages', tradeoff: 'The original removes the glow during flicker; its guide includes a steady alternative.' },
      { type: 'ember', bestFor: 'A warm, flame-like display heading', tradeoff: 'Warm gradients and blur need sufficient contrast and room beyond the glyph edges.' },
      { type: 'heartbeat', bestFor: 'A short rhythmic accent', tradeoff: 'Pulsing is better suited to decorative text than persistent instructions.' },
    ],
    example: {
      title: 'Build a steady neon tube',
      explanation: 'Start with a bright text colour and stack a tight shadow over two wider ones. This example has no animation, so it also provides a useful stationary alternative to a flickering sign.',
      markup: '<span class="example-glow">OPEN LATE</span>',
      css: `.example-glow {
  color: #fff2fb;
  font: 600 2rem/1.2 system-ui, sans-serif;
  text-shadow:
    0 0 3px #fff2fb,
    0 0 12px #e72ab5,
    0 0 28px #e72ab5;
}`,
    },
    questions: [
      { question: 'Why does neon look weaker on a white background?', answer: 'A pale core and soft halo have little contrast against white. Use darker text, a tighter halo or a dark backing panel. Preview the actual surface where the code will run rather than choosing colours only on this site’s dark canvas.' },
      { question: 'Does removing the animation preserve the glow?', answer: 'Only if text-shadow is defined on the element itself. Neon-Haus puts its glow inside keyframes, so use the steady variation in its guide. Shadow blur can still require painting even when transforms elsewhere are composited.' },
    ],
  },
  reveal: {
    choosing: 'Use a typewriter for a known short string, a shimmer or wipe when the full heading should stay readable, and a word rotator for a small set of fixed phrases. Decide first whether the text should appear once or loop; that changes both the timing and the final state you need to preserve.',
    comparisons: [
      { type: 'typewriter', bestFor: 'A fixed monospace phrase typed one character at a time', tradeoff: 'Character count, ch width and steps() must agree; a proportional font breaks the shortcut.' },
      { type: 'shimmer', bestFor: 'A highlight travelling over an existing word', tradeoff: 'The subdued base text still needs contrast when the bright band is elsewhere.' },
      { type: 'rotator', bestFor: 'Cycling through several predetermined words', tradeoff: 'The replacement wording lives in CSS keyframes and needs editing there.' },
    ],
    example: {
      title: 'Reveal a nine-character phrase once',
      explanation: 'HELLO CSS contains nine characters including the space. A content-box width keeps the caret border outside those nine character cells. forwards preserves the final frame, and reduced motion displays the whole phrase immediately.',
      markup: '<span class="example-typing">HELLO CSS</span>',
      css: `.example-typing {
  display: inline-block;
  box-sizing: content-box;
  font: 600 2rem/1.2 monospace;
  white-space: nowrap;
  overflow: hidden;
  width: 9ch;
  border-right: 2px solid currentColor;
  animation: example-type 2s steps(9) 1 forwards;
}
@keyframes example-type {
  from { width: 0; }
  to { width: 9ch; }
}
@media (prefers-reduced-motion: reduce) {
  .example-typing { animation: none; border-right: 0; }
}`,
    },
    questions: [
      { question: 'How do I stop a reveal from looping?', answer: 'Use one iteration and forwards fill mode, then give the element a readable non-animated state. The typewriter guide separates the typing cycle from the blinking caret, so you can stop one without changing the other.' },
      { question: 'What should I choose for text supplied by a CMS?', answer: 'A wipe or opacity reveal does not need a hard-coded character count. A CSS typewriter can still work if your template calculates width and steps() from the fixed phrase, but emoji and variable-width glyphs need extra care.' },
    ],
  },
  depth: {
    choosing: 'Shadow stacks make simple extruded lettering without extra elements. Perspective and 3D transforms are better when the word should rotate through space. A reflection adds a second visual plane, but its appearance depends on the background and, for box-reflect, browser support.',
    comparisons: [
      { type: 'extrude', bestFor: 'A solid-looking display heading', tradeoff: 'Its depth is a text-shadow stack; the rocking motion is a 2D transform.' },
      { type: 'zoetrope', bestFor: 'Letters rotating on a 3D drum', tradeoff: 'Per-letter markup and perspective need room to avoid clipping the moving faces.' },
      { type: 'mirror', bestFor: 'A word reflected beneath a headline', tradeoff: '-webkit-box-reflect works in Chromium and Safari; other browsers show the unreflected word.' },
    ],
    example: {
      title: 'Create depth that scales with the text',
      explanation: 'Each shadow adds another offset layer. Using em instead of px makes the depth scale with font-size. This static example uses literal colours, so it does not require color-mix() or 3D transform support.',
      markup: '<span class="example-depth">DEPTH</span>',
      css: `.example-depth {
  color: #f5f2ff;
  font: 800 2rem/1.2 system-ui, sans-serif;
  text-shadow:
    .03em .03em 0 #c539a4,
    .06em .06em 0 #a02b83,
    .09em .09em 0 #7b2164,
    .12em .12em .16em #08070f;
}`,
    },
    questions: [
      { question: 'Do I need perspective for extruded text?', answer: 'Not for a shadow stack. It makes the front face appear thick while keeping one ordinary text element. Perspective is useful when an actual rotateX or rotateY transformation should change how the word projects onto the screen.' },
      { question: 'Why does a reflection disappear in Firefox?', answer: 'The reflection effect uses the non-standard -webkit-box-reflect property. Treat that mirror as decoration and keep the real heading readable without it. Choose an explicit duplicated layer if the reflection must be consistent across your supported browsers.' },
    ],
  },
  retro: {
    choosing: 'Pick a reference era before choosing the CSS: warm offset shadows suggest printed 1970s lettering, scanlines suggest a CRT, and indexed letter flips suggest mechanical departure boards. The font and background do much of the work; stronger movement is not always a better imitation.',
    comparisons: [
      { type: 'groovy', bestFor: 'A warm 70s poster headline', tradeoff: 'The offset colour layers need space around the text and a suitable display font.' },
      { type: 'crt', bestFor: 'A terminal or broadcast-style word', tradeoff: 'Scanlines and flicker are decorative; keep small interface labels sharp and stable.' },
      { type: 'flap', bestFor: 'A departure-board label with mechanical timing', tradeoff: 'Each character has indexed markup, so adapt the whole-word accessible label too.' },
    ],
    example: {
      title: 'Make a warm retro print shadow',
      explanation: 'Three solid offsets create cream, orange and brown plates behind the same live text. This is a static poster treatment; changing the font or the layer spacing has more influence on its period feel than adding a loop.',
      markup: '<span class="example-retro">GOOD TIMES</span>',
      css: `.example-retro {
  color: #fff1d4;
  font: 800 2rem/1.2 Georgia, serif;
  text-shadow:
    2px 2px 0 #ed8b42,
    4px 4px 0 #b64932,
    6px 6px 0 #63342c;
}`,
    },
    questions: [
      { question: 'How do I make the lettering feel printed rather than digital?', answer: 'Use a warm limited palette, a suitable heavy font and static offset plates. Choose the retro 70s effect instead of CRT scanlines or stepped character motion; they imitate different materials and eras.' },
      { question: 'Can these effects be used in a real terminal interface?', answer: 'Use them for decorative headings around the interface. Persistent scanlines, flicker and flipping characters can interfere with reading changing values. Keep commands, error messages and live status values in plain stable text.' },
    ],
  },
  motion: {
    choosing: 'Per-letter motion suits a short word with a clear rhythm. A marquee suits a repeating phrase inside a window, while a loading-style label suggests ongoing activity. Give the movement a purpose and keep its static state readable when animation is disabled.',
    comparisons: [
      { type: 'wave', bestFor: 'A short heading with a travelling letter wave', tradeoff: 'Indexed letter elements need a whole-word accessible label; ordinary spaces need preserving.' },
      { type: 'ticker', bestFor: 'A repeating phrase moving horizontally', tradeoff: 'Repetition count and percentage translation must match for a continuous loop.' },
      { type: 'loader', bestFor: 'A decorative activity indicator', tradeoff: 'The animation does not represent actual task progress; provide real status text separately.' },
    ],
    example: {
      title: 'Stagger four letters into a wave',
      explanation: 'Every letter uses the same vertical movement with a different delay. The whole-word label is exposed once, while the decorative letter elements are hidden from assistive technology. Reduced motion removes the transforms.',
      markup: '<span class="example-wave" role="img" aria-label="WAVE">\n  <b aria-hidden="true" style="--i:0">W</b><b aria-hidden="true" style="--i:1">A</b><b aria-hidden="true" style="--i:2">V</b><b aria-hidden="true" style="--i:3">E</b>\n</span>',
      css: `.example-wave {
  font: 600 2rem/1.2 monospace;
}
.example-wave b {
  display: inline-block;
  font: inherit;
  animation: example-wave 1.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * .12s);
}
@keyframes example-wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-.2em); }
}
@media (prefers-reduced-motion: reduce) {
  .example-wave b { animation: none; }
}`,
    },
    questions: [
      { question: 'Why do spaces disappear in per-letter text?', answer: 'A space inside its own inline element may collapse when HTML whitespace is processed. Preserve it with a non-breaking space or a deliberate gap element, and keep the readable phrase in the wrapper’s accessible label.' },
      { question: 'Should a marquee run continuously?', answer: 'For optional decoration, consider playing once or pausing until interaction. For continuously moving content, provide a way to pause it. The marquee guide includes hover and keyboard-focus pausing, plus a reduced-motion override.' },
    ],
  },
  texture: {
    choosing: 'A metallic fill comes from light and dark gradient bands inside the letters. Glass needs something behind it to blur or refract, while liquid uses a moving fill boundary. Choose the background together with the effect: a material cannot be judged in isolation from its surface and lighting.',
    comparisons: [
      { type: 'chrome', bestFor: 'A metallic heading with a moving specular highlight', tradeoff: 'Text clipping and gradient contrast define the material; a flat fill loses the chrome look.' },
      { type: 'glass', bestFor: 'Frosted lettering over a textured backdrop', tradeoff: 'The backdrop and blur support affect the appearance; keep a readable base layer.' },
      { type: 'liquid', bestFor: 'A word that fills and drains like a vessel', tradeoff: 'The transparent fill and outline need contrasting colours when the liquid is low.' },
    ],
    example: {
      title: 'Build a metal fill from light and dark bands',
      explanation: 'Alternating light and dark stops suggest reflections across a polished surface. The fallback keeps ordinary text visible when text clipping is unavailable. Once the static material reads clearly, animate a wider highlight band for a passing sheen.',
      markup: '<span class="example-metal">CHROME</span>',
      css: `.example-metal {
  color: #b7bbc8;
  font: 800 2rem/1.2 system-ui, sans-serif;
}
@supports ((background-clip: text) or (-webkit-background-clip: text)) {
  .example-metal {
    background: linear-gradient(180deg,
      #fff 0%, #a8adbc 35%, #42495c 49%,
      #fff 51%, #747d93 78%, #d8deeb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}`,
    },
    questions: [
      { question: 'Why does glass look flat on a solid background?', answer: 'A blur needs changing detail behind the letters to make its effect visible. Try a gradient, a pattern or an image behind the word. Keep the real text legible if the backdrop filter is unsupported or too subtle to notice.' },
      { question: 'Can I use material text for small labels?', answer: 'Fine stripes, low-contrast reflections and transparent areas become harder to resolve at small sizes. Use material fills for larger display headings, then choose a plain solid colour for the surrounding instructions and controls.' },
    ],
  },
};
