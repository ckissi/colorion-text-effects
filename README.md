# CSS Text Effects

A library of 57 animated text effects built with pure CSS — aurora gradients,
glitches, split-flap boards, liquid fills, CRT phosphor terminals and other
lesser-seen tricks. No JavaScript, no dependencies, MIT licensed.

Live at https://texteffects.colorion.co — part of the
[Colorion](https://www.colorion.co) network.

## How it works

- `src/data/effects.ts` — the catalogue: one entry per effect (index, name,
  CSS type key, and the word it renders).
- `src/styles/global.css` — the site styles plus every effect, each documented
  with a numbered marker comment (`/* 01 Borealis — … */`).
- `src/utils/effectCss.ts` — at build time, slices `global.css` on those
  markers, appends any shared `@keyframes` a block references, and produces
  self-contained copyable snippets and LLM prompts.
- `src/pages/effect-data.json.ts` — emits the snippets + prompts as a static
  `/effect-data.json`, fetched on demand when the copy modal first opens.
- `src/components/Effect.astro` — renders each effect's markup (plain word,
  per-letter `<b>` spans indexed with `--i`, `data-text` duplicates, or SVG).

Every effect paints with three colour tokens so a copied snippet can be
re-skinned by overriding them: `--ink` (main text colour), `--ink-2` and
`--ink-3` (accents). All animations respect `prefers-reduced-motion`.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the build locally                   |

## Adding an effect

1. Add its CSS to `global.css` inside the effects section with the next
   numbered marker comment; prefix keyframes with `fx-`.
2. Add the entry to `src/data/effects.ts` (and to `perLetter` / `usesDataText`
   if it needs indexed letters or a `data-text` duplicate).
3. If it needs bespoke markup, extend both `Effect.astro` and
   `effectMarkup()` in `effectCss.ts` — they must mirror each other.
