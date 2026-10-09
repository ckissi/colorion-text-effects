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
  waxseal: {
    "walkthrough": [
      "Wax-Seal combines an irregular wax pool, an inset double ring and recessed serif lettering. Three animations coordinate the impact, wax compression and delayed impression.",
      "The word arrives at a larger scale, compresses at 17%, then settles at a slight angle. Highlights and dark lower edges give the wax depth."
    ],
    "variation": {
      "title": "Keep a permanent wax impression",
      "description": "Stop all three animations and retain the settled angle. This variation suits an invitation or certificate.",
      "markup": "<div class=\"fx-waxseal fx-waxseal-fixed\">SEALED</div>",
      "css": ".fx-waxseal-fixed { animation: none; transform: rotate(-8deg); opacity: 1; }\n.fx-waxseal-fixed::before, .fx-waxseal-fixed::after { animation: none; }"
    },
    "troubleshooting": [
      {
        "question": "Why does a long word widen the seal?",
        "answer": "The wrapper grows with the text. Use a short label for a round seal or accept an oval shape for longer words."
      },
      {
        "question": "Why is the wax behind the page?",
        "answer": "Keep isolation: isolate on the wrapper. It contains the wax layer with its negative z-index."
      }
    ],
    "browserNote": "The wax uses CSS gradients, border radii and shadows. Reduced motion shows the complete seal without an impact or fade.",
    "reference": {
      "label": "MDN: text-shadow",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow"
    }
  },
  ticket: {
    "walkthrough": [
      "Ticket-Punch draws a cyan ticket body with a separate pink stub. Radial gradients cut semicircular notches into the outside edges.",
      "A dashed seam marks the tear line. The stub pivots from its lower left corner, moves down and right, then disappears while the ticket remains."
    ],
    "variation": {
      "title": "Keep the ticket and stub attached",
      "description": "Stop the tear animation while the ticket still enters and exits. The perforation and barcode texture remain.",
      "markup": "<div class=\"fx-ticket fx-ticket-intact\">ADMIT ONE</div>",
      "css": ".fx-ticket-intact::after { animation: none; }"
    },
    "troubleshooting": [
      {
        "question": "Why do the notches have square corners?",
        "answer": "Keep the radial gradient and its transparent center. A solid background behind the gradient fills the notch."
      },
      {
        "question": "How can I widen the stub?",
        "answer": "Change its width, the body background width and the right padding together. The current stub uses 36px."
      }
    ],
    "browserNote": "The perforations use gradients and a dashed border. Reduced motion retains an intact ticket with a slight static angle.",
    "reference": {
      "label": "MDN: transform-origin",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
    }
  },
  carbon: {
    "walkthrough": [
      "Carbon-Copy prints the word onto three overlapping sheets. The original has pale ruled paper, while the lower impressions use cyan and pink surfaces.",
      "The stack absorbs a short vertical impact. Two delayed rotations then separate the lower sheets around their bottom left corners."
    ],
    "variation": {
      "title": "Make a two-sheet carbon copy",
      "description": "Hide the lowest sheet. The original and cyan impression keep their impact and separation.",
      "markup": "<div class=\"fx-carbon fx-carbon-pair\" data-text=\"COPY\">COPY</div>",
      "css": ".fx-carbon-pair::before { display: none; }"
    },
    "troubleshooting": [
      {
        "question": "Why do the copies contain the wrong word?",
        "answer": "Set data-text to the same value as the visible text. Both lower sheets read that attribute."
      },
      {
        "question": "Why are the lower sheets hidden?",
        "answer": "Keep isolation: isolate and allow space below the wrapper. The fanned sheets extend beyond its layout box."
      }
    ],
    "browserNote": "Pseudo-elements supply the two impressions without extra markup. Reduced motion shows the separated sheets and keeps the original readable.",
    "reference": {
      "label": "MDN: transform-origin",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
    }
  },
  typehammer: {
    "walkthrough": [
      "Type-Hammer wraps each character in an indexed metal block. Perspective and a transform origin below the block make each letter swing like a typewriter arm.",
      "Each arm strikes, rebounds and settles with a 0.12-second delay between letters. A brief expanding ring marks the impact, while a narrow stem suggests the mechanism."
    ],
    "variation": {
      "title": "Strike every letter at once",
      "description": "Remove the delays from the blocks and impact rings. The whole word now strikes as a single mechanical plate.",
      "markup": "<div class=\"fx-typehammer fx-typehammer-sync\" role=\"img\" aria-label=\"INK\"><b aria-hidden=\"true\" style=\"--i:0\">I</b><b aria-hidden=\"true\" style=\"--i:1\">N</b><b aria-hidden=\"true\" style=\"--i:2\">K</b></div>",
      "css": ".fx-typehammer-sync b, .fx-typehammer-sync b::after { animation-delay: 0s; }"
    },
    "troubleshooting": [
      {
        "question": "Why do the letters move together?",
        "answer": "Give each b element its own --i value, starting at zero. That index controls the block and impact delays."
      },
      {
        "question": "Why do the blocks look flat?",
        "answer": "Keep perspective on the parent and rotateX in the keyframes. The transform origin below each block creates the swinging arm."
      }
    ],
    "browserNote": "The mechanism uses CSS perspective and 3D transforms. Reduced motion shows upright metal blocks and hides the impact rings.",
    "reference": {
      "label": "MDN: transform-origin",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin"
    }
  },
  labelmaker: {
    "walkthrough": [
      "Label-Maker uses a ridged colored tape with serrated ends. Opposing text shadows make pale letters appear pressed into raised plastic.",
      "An expanding clip reveals the tape from left to right. Individual letters appear in discrete steps, with a 0.13-second delay between impressions."
    ],
    "variation": {
      "title": "Use a finished archive label",
      "description": "Stop the feed and character animations. The embossed lettering, tape ridges and cut edges remain.",
      "markup": "<div class=\"fx-labelmaker fx-labelmaker-fixed\" role=\"img\" aria-label=\"FILE\"><b aria-hidden=\"true\" style=\"--i:0\">F</b><b aria-hidden=\"true\" style=\"--i:1\">I</b><b aria-hidden=\"true\" style=\"--i:2\">L</b><b aria-hidden=\"true\" style=\"--i:3\">E</b></div>",
      "css": ".fx-labelmaker-fixed, .fx-labelmaker-fixed b { animation: none; }"
    },
    "troubleshooting": [
      {
        "question": "Why does the tape disappear between cycles?",
        "answer": "The feed animation fades the completed label before the next pass. Use the fixed variation for a permanent label."
      },
      {
        "question": "Why do very long labels finish late?",
        "answer": "Letter delays increase with --i. Reduce the 0.13-second delay or increase the duration for a long line."
      }
    ],
    "browserNote": "The tape uses polygon clips and stepped letter timing. Reduced motion shows the finished label with every character visible.",
    "reference": {
      "label": "MDN: clip-path",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path"
    }
  },
  inkroller: {
    "walkthrough": [
      "Ink-Roller begins with a faint outline. A text duplicate supplies a colored ink face with narrow streaks from a repeating gradient.",
      "The brayer crosses the word as a matching clip reveals the ink. It then lifts away, leaving the complete impression before the next cycle."
    ],
    "variation": {
      "title": "Use a single ink color",
      "description": "Set the secondary accent to the primary accent. The roller still reveals the streaked face from left to right.",
      "markup": "<div class=\"fx-inkroller fx-inkroller-single\" data-text=\"PRINT\">PRINT</div>",
      "css": ".fx-inkroller-single { --ink-3: var(--ink-2); }"
    },
    "troubleshooting": [
      {
        "question": "Why is only the outline visible?",
        "answer": "Keep data-text equal to the visible word. The ink layer reads that attribute and clips its background to the duplicated text."
      },
      {
        "question": "Why is the roller cut off?",
        "answer": "Allow at least 15px above and below the word. The roller extends beyond the text box before it lifts away."
      }
    ],
    "browserNote": "The print uses a clipped gradient and an animated pseudo-element. Reduced motion hides the roller and displays the complete ink face.",
    "reference": {
      "label": "MDN: clip-path",
      "href": "https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path"
    }
  },
  halftone: {
    walkthrough: [
      'Ben-Day combines a solid accent fill with a contrasting outline. A cyan copy sits 4px right and 5px down, like an offset print plate.',
      'The top copy clips a repeating radial gradient to the letters. Its 4px background shift matches one full dot tile, keeping the three-second loop continuous.',
    ],
    variation: {
      title: 'Use a coarser comic-book dot screen',
      description: 'Increase both dot size and tile spacing. The new animation moves by one 6px tile so the larger pattern loops without a jump.',
      markup: '<div class="fx-halftone fx-halftone-coarse" data-text="PRINT">PRINT</div>',
      css: `.fx-halftone-coarse::after {
  background-image: radial-gradient(circle, var(--ink) 0 1.5px, transparent 1.8px);
  background-size: 6px 6px;
  animation-name: fx-halftone-coarse-drift;
}
@keyframes fx-halftone-coarse-drift { to { background-position: 6px 6px; } }`,
    },
    troubleshooting: [
      { question: 'Why do the dots cover the whole rectangle?', answer: 'Keep background-clip: text and its prefixed declaration on the top pseudo-element. The transparent text color lets the clipped dot pattern show through.' },
      { question: 'How is this different from dot-matrix text?', answer: 'The solid letter face remains visible under the print dots. Dot-matrix lettering uses dots to form the entire character, like a printer display.' },
    ],
    browserNote: 'This effect uses radial gradients, text clipping and paint-order. The reduced-motion rule stops the dots and retains all three print layers.',
    reference: { label: 'MDN: background-clip', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip' },
  },
  risograph: {
    walkthrough: [
      'Riso-Press keeps a magenta text face above a cyan copy. Small transparent holes in the cyan plate and pale dots above simulate uneven ink coverage.',
      'The lower plate drifts smoothly between three offsets over four seconds. This imitates print misregistration while the original word stays still and readable.',
    ],
    variation: {
      title: 'Make a single-color overprint',
      description: 'Use the same ink for both plates and reduce the texture opacity. The moving registration offset still separates their edges.',
      markup: '<div class="fx-risograph fx-risograph-single" data-text="EDITION">EDITION</div>',
      css: `.fx-risograph-single { --ink-3: var(--ink-2); }
.fx-risograph-single::after { opacity: .2; }`,
    },
    troubleshooting: [
      { question: 'Why is the lower print plate missing?', answer: 'Keep isolation: isolate on the wrapper. It contains the negative z-index copy, so the cyan plate remains above the surrounding page background.' },
      { question: 'Can I make the printing look less precise?', answer: 'Increase the translate distances slightly or enlarge the dot tiles. Leave the original face stationary so the heading remains readable.' },
    ],
    browserNote: 'The effect uses native gradients, pseudo-elements and 2D transforms. Reduced motion keeps the lower plate at its normal 4px by 3px offset.',
    reference: { label: 'MDN: isolation', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/isolation' },
  },
  sticker: {
    walkthrough: [
      'Peel-Off draws each letter with a thick light stroke. paint-order: stroke fill places that stroke beneath the colored face, preserving the letter shape.',
      'Sharp cyan shadows create the die-cut edge. Each letter lifts and tilts on a delayed cycle, suggesting individual stickers peeling from a sheet.',
    ],
    variation: {
      title: 'Keep the sticker outline without the bounce',
      description: 'This variation keeps the die-cut border and offset shadow. Alternate letter angles add a pasted-on look with no animation.',
      markup: '<div class="fx-sticker fx-sticker-static" role="img" aria-label="YES"><b aria-hidden="true" style="--i:0">Y</b><b aria-hidden="true" style="--i:1">E</b><b aria-hidden="true" style="--i:2">S</b></div>',
      css: `.fx-sticker-static b { animation: none; transform: rotate(-5deg); }
.fx-sticker-static b:nth-child(even) { transform: rotate(5deg); }`,
    },
    troubleshooting: [
      { question: 'Why does the thick outline hide the fill?', answer: 'Keep paint-order: stroke fill. If the browser does not support it on text, reduce the stroke width so the colored face remains visible.' },
      { question: 'Why do the outside edges get cut off?', answer: 'Allow space for the 6px stroke, shadow and 8px lift. A tightly clipped parent can trim all three.' },
    ],
    browserNote: 'Modern browsers support text strokes and paint-order. Reduced motion stops the letter lifts and keeps a slight static tilt.',
    reference: { label: 'MDN: paint-order', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order' },
  },
  papercut: {
    walkthrough: [
      'Paper-Stack uses six sharp text shadows to imitate stacked sheets. The first two form a cyan edge, followed by pink and darker pink layers.',
      'Each letter floats on a different phase of the same animation. Unlike folding text, these letter faces remain visible throughout the cycle.',
    ],
    variation: {
      title: 'Use a pink paper face',
      description: 'Change only the face colors. The cyan and pink cut edges still use the original shadow stack.',
      markup: '<div class="fx-papercut fx-papercut-pink" role="img" aria-label="CUT"><b aria-hidden="true" style="--i:0">C</b><b aria-hidden="true" style="--i:1">U</b><b aria-hidden="true" style="--i:2">T</b></div>',
      css: `.fx-papercut-pink b { color: var(--ink-2); }
.fx-papercut-pink b:nth-child(even) { color: var(--ink); }`,
    },
    troubleshooting: [
      { question: 'Why do large headings have thin paper edges?', answer: 'The shadow offsets use pixels. Increase the six offsets together when increasing font-size, or use em units to make the depth scale with the letters.' },
      { question: 'How do I keep all the letters still?', answer: 'Set animation: none on .fx-papercut b. The colored layers remain because text-shadow belongs to the normal style, outside the keyframes.' },
    ],
    browserNote: 'This uses 2D transforms and layered text shadows, with color-mix() for the darker edges. Reduced motion retains the complete paper stack.',
    reference: { label: 'MDN: text-shadow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow' },
  },
  letterpress: {
    walkthrough: [
      'Impression places a dark shadow above the letters and a light edge below. That reversed lighting makes the serif text appear pressed into the surface.',
      'A clipped gradient sweeps across a duplicate of the word. Its low opacity suggests grazing light without removing the recessed face.',
    ],
    variation: {
      title: 'Make a steady engraved label',
      description: 'Remove the moving highlight and brighten the recessed fill. Use this for a label that needs consistent contrast.',
      markup: '<div class="fx-letterpress fx-letterpress-steady" data-text="TYPE">TYPE</div>',
      css: `.fx-letterpress-steady { color: var(--ink-2); }
.fx-letterpress-steady::after { display: none; }`,
    },
    troubleshooting: [
      { question: 'Why does the word look raised instead of recessed?', answer: 'Keep the dark shadow above and the pale edge below. Reversing those two directions makes the lighting suggest raised lettering.' },
      { question: 'Why is the pressed face too dark?', answer: 'Increase the accent proportion in the color-mix() fill or use the steady variation. Match the ink to the surface where the label will appear.' },
    ],
    browserNote: 'The indentation is an optical effect made with text shadows. It does not require a real inset text mask. Reduced motion leaves a faint stationary highlight.',
    reference: { label: 'MDN: text-shadow', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow' },
  },
  embroidery: {
    walkthrough: [
      'Satin-Stitch clips narrow diagonal stripes to bold lettering. Alternating light and dark pink strands imitate the direction and sheen of satin embroidery.',
      'A fine cyan stroke and two drop shadows define the sewn edge. A separate text copy supplies the moving highlight without shifting the thread pattern.',
    ],
    variation: {
      title: 'Make a matte embroidered patch',
      description: 'Hide the sheen layer for a steady thread texture. The stitched fill, border and raised edge remain.',
      markup: '<div class="fx-embroidery fx-embroidery-matte" data-text="PATCH">PATCH</div>',
      css: `.fx-embroidery-matte::after { display: none; }`,
    },
    troubleshooting: [
      { question: 'Why do thin fonts lose the thread texture?', answer: 'Use a heavy font with enough area inside each letter. Small or thin lettering leaves too little space for the 3px repeating thread pattern.' },
      { question: 'How do I change the thread direction?', answer: 'Change the 120deg angle in repeating-linear-gradient. The highlight uses its own angle, so it can still cross the threads independently.' },
    ],
    browserNote: 'The stitch texture is a CSS approximation, made from gradients rather than a fabric image. Reduced motion stops the sheen and keeps the threads visible.',
    reference: { label: 'MDN: repeating-linear-gradient()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient' },
  },
  stretch: {
    walkthrough: [
      'Stretch-Club scales each letter from its bottom edge. The tall phase narrows the letter while increasing its height to 1.8 times its original size.',
      'A short squash follows the tall hold, then the letter returns to normal. The 0.1-second delays move this rhythm through the word.',
    ],
    variation: {
      title: 'Use a smaller stretch for compact headings',
      description: 'Replace the tall phase with a 1.35 scale. The original timing, bottom pivot and reduced-motion rule still apply.',
      markup: '<div class="fx-stretch fx-stretch-small" role="img" aria-label="UP"><b aria-hidden="true" style="--i:0">U</b><b aria-hidden="true" style="--i:1">P</b></div>',
      css: `.fx-stretch-small b { animation-name: fx-stretch-small-rise; }
@keyframes fx-stretch-small-rise {
  0%, 12%, 70%, 100% { transform: scale(.85, 1); }
  34%, 42% { transform: scale(.75, 1.35); }
  55% { transform: scale(1.05, .9); }
}`,
    },
    troubleshooting: [
      { question: 'Why are the taller letters cut off?', answer: 'CSS transforms do not increase layout height. Reserve space above the baseline for the 1.8 scale or use the smaller-stretch variation.' },
      { question: 'How can all the letters stretch together?', answer: 'Set animation-delay: 0s on every letter. Keep the individual wrappers because the transform origin belongs to each character.' },
    ],
    browserNote: 'This effect uses native scale transforms without variable fonts or JavaScript. Reduced motion stops the animation and shows the full word at its normal height.',
    reference: { label: 'MDN: transform-origin', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin' },
  },
  candystripe: {
    walkthrough: [
      'Candy-Stripe clips diagonal pink, pale and cyan bands to rounded lettering. A second vertical gradient adds a glossy cap and a darker lower edge.',
      'Only the stripe background moves. The 90.51px shift covers two diagonal pattern periods, so the four-second loop returns to matching stripes.',
    ],
    variation: {
      title: 'Use classic two-color candy stripes',
      description: 'Set both accents to the same color. The pale separating bands and glossy surface remain.',
      markup: '<div class="fx-candystripe fx-candystripe-duo">SWEET</div>',
      css: `.fx-candystripe-duo { --ink-3: var(--ink-2); }`,
    },
    troubleshooting: [
      { question: 'Why does the stripe loop jump after I edit it?', answer: 'The horizontal travel must match a whole diagonal pattern period. Changing stripe widths or the angle also changes that distance.' },
      { question: 'Why does the font look different on another device?', answer: 'Arial Rounded MT Bold is a local font. Devices without it use Arial. Supply your own rounded web font if an identical letter shape is required.' },
    ],
    browserNote: 'The stripes use repeating linear gradients and text clipping. No image or external font is required. Reduced motion keeps the gloss and diagonal fill stationary.',
    reference: { label: 'MDN: repeating-linear-gradient()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient' },
  },
  disco: {
    walkthrough: [
      'Mirrorball builds a four-tone mosaic with a repeating conic gradient. Two linear gradients add the horizontal and vertical seams between mirrored tiles.',
      'A clipped highlight crosses a duplicate of the text. The tile pattern stays fixed while the reflection brightens and fades over 3.8 seconds.',
    ],
    variation: {
      title: 'Use a cooler mirrorball palette',
      description: 'Replace the pink facets with the cyan accent. The dark seams still separate the mirror tiles.',
      markup: '<div class="fx-disco fx-disco-cool" data-text="DANCE">DANCE</div>',
      css: `.fx-disco-cool { --ink-2: var(--ink-3); }`,
    },
    troubleshooting: [
      { question: 'Why does the text look like ordinary chrome?', answer: 'Keep both 6px seam gradients above the 12px conic tile pattern. Those visible square divisions distinguish mirrorball lettering from smooth chrome.' },
      { question: 'Can I make the mirror tiles larger?', answer: 'Increase the seam spacing and the conic background size together. The conic tile should remain twice the seam spacing to preserve the four-tone grid.' },
    ],
    browserNote: 'The mirrored finish uses native gradients and a small drop shadow. Reduced motion keeps a stationary reflection over the complete mosaic.',
    reference: { label: 'MDN: repeating-conic-gradient()', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-conic-gradient' },
  },
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
