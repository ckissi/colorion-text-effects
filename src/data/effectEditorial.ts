import type { EffectType } from './effects';

interface Editorial {
  walkthrough: string[];
  variation: { title: string; description: string; markup: string; css: string };
  troubleshooting: { question: string; answer: string }[];
  browserNote: string;
  reference: { label: string; href: string };
}

/** Hand-written guidance for the priority effects, checked against their CSS. */
export const effectEditorial: Partial<Record<EffectType, Editorial>> = {
  glitch: {
    walkthrough: [
      'Glitchcore keeps the real word still and draws two coloured copies with ::before and ::after. The first copy exposes the top 45% of the word; the second exposes the bottom 55%. Their different clipping edges make the distortion look like a torn video signal rather than a whole-word shake.',
      'Both copies run for 2.6 seconds with steps(1). The first layer jumps at 13%, 16%, 48% and 51%; the second follows at 15%, 18%, 52% and 56%. At the quiet keyframes their opacity returns to zero, leaving the original readable word. The offset timing is what separates the two colour channels.',
      'For a gentler version, reduce the translate distances in both keyframes. Changing only the animation duration changes how often the fault happens, not how far the letters tear. Keep this effect on a short heading rather than a paragraph that someone needs to read continuously.',
    ],
    variation: {
      title: 'Run the glitch once, then leave readable text',
      description: 'Keep the original CSS, replace its markup with this word, and add the override below. Each colour layer finishes at an invisible keyframe, so the final frame is the undistorted heading.',
      markup: '<div class="fx-glitch fx-glitch-once" data-text="SIGNAL">SIGNAL</div>',
      css: `.fx-glitch-once::before,
.fx-glitch-once::after {
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@media (prefers-reduced-motion: reduce) {
  .fx-glitch-once::before,
  .fx-glitch-once::after { animation: none; opacity: 0; }
}`,
    },
    troubleshooting: [
      { question: 'Why do the coloured copies show a different word?', answer: 'The pseudo-elements read data-text, not the text node. Change both together, including spaces and punctuation. In a component, derive the attribute and the visible text from the same value.' },
      { question: 'Why are the torn edges cut off?', answer: 'The copies move up to 5px sideways and 2px vertically. An ancestor with overflow: hidden can trim them. Leave room around the heading or move clipping to a larger wrapper; do not remove the clip-path on the two colour layers.' },
      { question: 'How do I make the glitch less distracting?', answer: 'Reduce the translate values and keep the one-shot variation. A longer duration alone spreads the distortion over more time. For reduced-motion visitors, hide both animated copies and keep the original word.' },
    ],
    browserNote: 'The core uses CSS pseudo-elements, inset clip-path and stepped animations. Without clipping support, use the original text with both pseudo-elements hidden. The one-shot variation explicitly removes those layers for reduced motion.',
    reference: { label: 'MDN: clip-path and browser compatibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path' },
  },
  typewriter: {
    walkthrough: [
      'Teletype reveals a fixed string by animating an overflow-hidden box from 0 to 10ch. The word TYPEWRITER contains ten characters, and the monospace font gives each character the same advance width. steps(10) turns that width change into ten discrete reveals.',
      'The 3.6-second typing cycle holds the box closed until 8%, reaches its full width at 55%, and leaves the word visible until the cycle restarts. A separate 0.65-second animation changes only the right-border colour, so the caret can blink at its own speed.',
      'When changing the text, update all three linked values: the final element width, the width in the typing keyframes, and the steps() count. Preserve white-space: nowrap and use a monospace font. This fixed-width approach suits a known label; text that changes at runtime needs its counts recalculated.',
    ],
    variation: {
      title: 'Type a two-word heading once',
      description: 'HELLO CSS has nine characters, including the space. Add this override after the original CSS. The typing animation runs once and keeps the final width; the independent caret still blinks.',
      markup: '<div class="fx-typewriter fx-typewriter-once">HELLO CSS</div>',
      css: `.fx-typewriter-once {
  width: 9ch;
  animation: fx-type-once 2s steps(9) 1 forwards,
             fx-caret .65s steps(1) infinite;
}
@keyframes fx-type-once {
  from { width: 0; }
  to { width: 9ch; }
}
@media (prefers-reduced-motion: reduce) {
  .fx-typewriter-once {
    animation: none;
    width: 9ch;
    border-right-color: transparent;
  }
}`,
    },
    troubleshooting: [
      { question: 'Why does the last letter disappear or the cursor overshoot?', answer: 'Count spaces as well as letters, then match width and steps() to that number. A proportional font or extra letter-spacing breaks the one-character-per-ch assumption. The example sets letter-spacing to zero.' },
      { question: 'Why does the text disappear after playing once?', answer: 'The animation needs forwards fill mode to retain its final width. Keep the element’s non-animated width at the full character count as well, so it remains readable when animation is disabled.' },
      { question: 'Can I use emoji or several lines?', answer: 'Not reliably with this character-count shortcut. Emoji and combined characters can occupy different widths, and nowrap deliberately keeps one line. Use a short monospace heading or a different reveal effect for variable-width content.' },
    ],
    browserNote: 'Width animations, steps() and animation-fill-mode are established CSS features. The important constraint is the font’s character width, not a special browser API. The reduced-motion override shows the complete phrase and removes the caret animation.',
    reference: { label: 'MDN: animation-fill-mode', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode' },
  },
  neon: {
    walkthrough: [
      'Neon-Haus builds its bright tube from four text-shadow layers. The 4px shadow uses the main text colour for a sharp core; the 11px, 24px and 48px shadows use the accent colour to spread the halo. The shadow sits outside the glyphs, so the letters themselves remain crisp.',
      'The 3.2-second cycle deliberately drops opacity and removes the shadows at 19%, 22% and 62%. At 63% and 64.5% it restores only a small shadow before the full glow returns. Those brief outages make this a flickering sign, rather than a continuously pulsing light.',
      'Use a dark surface so the halo has room to contrast with its background. For a light surface, choose a dark main text colour and a smaller shadow radius; a pale glowing word on white may be difficult to read. A steady version is better for navigation or any label that must stay legible.',
    ],
    variation: {
      title: 'Keep the glow and remove the flicker',
      description: 'Add this override after the original CSS. The shadows move out of the keyframes into the element’s normal style, so disabling animation does not remove the glow.',
      markup: '<div class="fx-neon fx-neon-steady">OPEN</div>',
      css: `.fx-neon-steady {
  animation: none;
  opacity: 1;
  text-shadow:
    0 0 4px var(--ink),
    0 0 11px var(--ink-2),
    0 0 24px var(--ink-2),
    0 0 48px var(--ink-2);
}`,
    },
    troubleshooting: [
      { question: 'Why does my neon text lose its glow when I turn animation off?', answer: 'The original glow is defined inside keyframes. Use the steady override to define text-shadow on the element itself; animation: none alone does not preserve a keyframe’s styling.' },
      { question: 'Why is the halo clipped at the edge of a card?', answer: 'The largest blur reaches well beyond the word. Give its wrapper padding and check ancestor overflow rules. If space is tight, reduce the 48px halo before reducing the bright 4px core.' },
      { question: 'Can I change the sign colour without changing the word?', answer: 'Override --ink for the tube and --ink-2 for the halo on this element. This effect does not use --ink-3. Keep the main colour bright enough to distinguish the glyphs from the surrounding glow.' },
    ],
    browserNote: 'The glow uses ordinary text-shadow and opacity rather than SVG filters or external images. Large blurred shadows still require painting work. Prefer the steady variation for persistent labels and when continuous flicker would interfere with reading.',
    reference: { label: 'MDN: text-shadow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow' },
  },
  aurora: {
    walkthrough: [
      'Borealis paints a repeating pink/cyan linear gradient across a background three times wider than the word. background-clip: text limits the paint to the glyphs, and color: transparent exposes the fill. The gradient needs that extra width so its colours can travel through the letters.',
      'Over seven seconds, background-position moves from 0% to 300% while hue-rotate() completes one turn. Position creates the travelling bands; the filter changes their hues. A linear timing curve keeps both motions moving at a constant rate.',
      'To keep a brand palette fixed, remove the hue rotation rather than changing only the gradient stops. If you change background-size, check the loop boundary too: the first and last gradient samples need to line up to avoid a colour jump when the animation restarts.',
    ],
    variation: {
      title: 'A fixed-palette gradient for a longer heading',
      description: 'Add this override after the original CSS. It preserves the two accent colours, removes hue rotation, and lets the heading wrap. The background spans four text widths, and the animation travels three complete colour cycles for a continuous loop.',
      markup: '<div class="fx-aurora fx-aurora-brand">BUILD SOMETHING</div>',
      css: `.fx-aurora-brand {
  max-width: 100%;
  overflow-wrap: anywhere;
  background-image: linear-gradient(90deg,
    var(--ink-2), var(--ink-3), var(--ink-2));
  background-size: 400% 100%;
  animation: fx-aurora-brand 8s linear infinite;
}
@keyframes fx-aurora-brand {
  from { background-position: 0% 50%; }
  to { background-position: 400% 50%; }
}
@supports not ((background-clip: text) or (-webkit-background-clip: text)) {
  .fx-aurora-brand { background: none; color: var(--ink); }
}
@media (prefers-reduced-motion: reduce) {
  .fx-aurora-brand { animation: none; }
}`,
    },
    troubleshooting: [
      { question: 'Why is the text invisible?', answer: 'Transparent text relies on the clipped background. Check that background-image has not been reset by another rule and keep both prefixed and unprefixed background-clip declarations. Use the @supports fallback when text clipping is unavailable.' },
      { question: 'Why do my brand colours change?', answer: 'The original keyframes animate hue-rotate() through 360 degrees. Use the fixed-palette variation, which changes only background-position. Updating the gradient’s colour stops alone does not stop the filter from changing their hues.' },
      { question: 'How do I pause the effect without losing the gradient?', answer: 'Set animation-play-state: paused to hold the current position, or animation: none for a static initial gradient. The fill lives on the element itself, so it remains visible without animation.' },
    ],
    browserNote: 'Text clipping needs background-clip: text or its prefixed equivalent. Keep a normal text-colour fallback, and check contrast at every part of the gradient. The variation includes a feature query and keeps a static gradient for reduced motion.',
    reference: { label: 'MDN: background-clip and accessible fallbacks', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip' },
  },
  ticker: {
    walkthrough: [
      'Tickertape is a single max-content track containing five identical copies of a phrase and separator. Its nine-second animation moves the track by -20% of its own width: exactly one fifth, or the width of one repeated unit.',
      'When all five units match, the end of the animation shows the same arrangement as the start, just one copy further along. Changing the repetition count without changing the translate percentage breaks that alignment. A clipping wrapper creates the visible window; the track itself must remain one unwrapped line.',
      'The repeated track also needs enough content to fill the window throughout the movement. For a short phrase in a wide container, lengthen the repeated unit or increase the number of copies and adjust the distance. Keep one accessible label so assistive technology does not read the phrase five times.',
    ],
    variation: {
      title: 'A marquee that pauses on hover or keyboard focus',
      description: 'Reuse the original .fx-ticker CSS and add this wrapper. The five repeated units stay identical, and the wrapper is focusable so keyboard visitors can pause it too. For a viewport wider than the repeated content, add copies and update the -20% distance.',
      markup: '<div class="fx-ticker-window" tabindex="0" role="group" aria-label="Latest news; focus to pause">\n  <div class="fx-ticker" aria-hidden="true">LATEST NEWS&nbsp;✦&nbsp;LATEST NEWS&nbsp;✦&nbsp;LATEST NEWS&nbsp;✦&nbsp;LATEST NEWS&nbsp;✦&nbsp;LATEST NEWS&nbsp;✦&nbsp;</div>\n</div>',
      css: `.fx-ticker-window {
  width: 100%;
  max-width: 32rem;
  overflow: hidden;
}
.fx-ticker-window:hover .fx-ticker,
.fx-ticker-window:focus-within .fx-ticker {
  animation-play-state: paused;
}
.fx-ticker-window:focus-visible {
  outline: 2px solid var(--ink-2);
  outline-offset: 4px;
}
@media (prefers-reduced-motion: reduce) {
  .fx-ticker-window .fx-ticker { animation: none; }
}`,
    },
    troubleshooting: [
      { question: 'Why does the loop jump at the end?', answer: 'The original contains five equal units, so it moves by -20%. Four equal units need -25%; six need approximately -16.6667%. Use the same text, spacing and separator in every unit, including the final separator.' },
      { question: 'Why does the marquee leave an empty gap?', answer: 'The track is too short to cover the window after translating. Increase the repeated content or reduce the wrapper width. Do not stretch the track to width: 100%, because that changes the percentage distance from a repeated-unit width to a viewport width.' },
      { question: 'Why is it moving even when reduced motion is enabled?', answer: 'Check that your override targets .fx-ticker and comes after the animation declaration. The variation stops the track completely; it does not merely slow the movement down.' },
    ],
    browserNote: 'The movement uses a standard 2D transform. Percentage translation is relative to the track’s own box, not the parent’s width. Pause-on-focus and reduced-motion rules make the demonstration easier to inspect, but continuously moving production content may also need an explicit pause control.',
    reference: { label: 'MDN: translateX percentage behavior', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateX' },
  },
  extrude: {
    walkthrough: [
      'Deep-Type creates depth with six sharp text-shadow layers, offset by one extra pixel each time. Each layer mixes progressively more black into --ink-2, so the extrusion darkens away from the face. A seventh blurred black shadow separates the block from its background.',
      'The three-second rocking animation rotates the whole word between -3.5 and 3.5 degrees while moving it vertically. This is a 2D transform of shaded text; it does not use perspective, rotateX or separate 3D letter faces. The shadows make the word appear extruded even when it is stationary.',
      'Shadow offsets are measured in pixels, so increasing only font-size makes the extrusion look shallower relative to the letters. Increase the offsets and blur radius proportionally for a large heading, or keep them small for a crisp compact label.',
    ],
    variation: {
      title: 'A stationary extrusion for a readable heading',
      description: 'Add this override after the original CSS. The six depth layers remain, but the heading stops rocking. A smaller responsive font size keeps longer text manageable in narrow containers.',
      markup: '<div class="fx-extrude fx-extrude-static">DEPTH</div>',
      css: `.fx-extrude-static {
  animation: none;
  transform: none;
  font-size: clamp(24px, 5vw, 48px);
}`,
    },
    troubleshooting: [
      { question: 'Why does the 3D depth shrink when I enlarge the text?', answer: 'The six shadow offsets remain 1px to 6px while the glyphs become larger. Scale all offsets together, or convert them to em units if you want the extrusion depth to follow font-size.' },
      { question: 'Why does the effect disappear in an older browser?', answer: 'The original shadow colours use color-mix(). A browser without it may discard the entire text-shadow declaration. Add a plain hex-colour text-shadow declaration before the color-mix() version as a fallback; the text colour itself should remain readable.' },
      { question: 'Can I rotate the letters through real 3D space?', answer: 'This shadow-stack effect cannot reveal side faces during rotation. Choose the 3D rotating text effect for perspective and rotateX motion. Keep Deep-Type when you need a simple extruded heading that stays easy to read.' },
    ],
    browserNote: 'The transforms and text shadows are established features, but the original colour calculations require color-mix(). Use literal shadow colours as an older-browser fallback. Removing animation retains the extrusion because its shadow stack is a normal element style.',
    reference: { label: 'MDN: color-mix() compatibility', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix' },
  },
};
