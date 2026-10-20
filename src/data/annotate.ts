/**
 * Hand-drawn pen strokes for the Margin-Note effect. Kept in one place because
 * the same markup is produced by Effect.astro, effectMarkup() and the generator.
 * The SVG stretches with preserveAspectRatio="none"; vector-effect on the
 * strokes keeps the line weight constant at any word length.
 */
export const annotateRing =
  'M 104 8 C 58 5 22 18 12 36 C 2 56 30 82 78 90 C 126 98 178 88 190 68 C 202 48 170 20 122 10 C 108 7 92 6 78 8';
export const annotateLine = 'M 30 82 C 52 76 68 86 92 80 S 132 74 152 82 S 168 84 172 78';

export const annotateMarkup = (text: string) =>
  `<div class="fx-annotate" role="img" aria-label="${text}">${text}<svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><path class="fx-annotate-ring" pathLength="100" d="${annotateRing}"/><path class="fx-annotate-line" pathLength="100" d="${annotateLine}"/></svg></div>`;
