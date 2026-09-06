# ROAND — A Scent Beyond Ordinary

A scroll-driven flagship site for a fictional maison de parfum, built directly
on the cinematic-scroll design contract: named motion roles, transform +
opacity-only hot paths, pinned chapters with a release viewport between them,
and a complete reduced-motion / mobile degrade path.

No build step, no framework, no dependencies except two Google Fonts (which
degrade gracefully to system serif/sans if offline). Open `index.html` in any
modern browser, or double-click it.

## Files

- **index.html** — structure, copy, and the shared SVG defs (the bottle
  illustration and monogram mark are drawn once as `<symbol>`s and reused
  everywhere via `<use>`).
- **styles.css** — the whole design contract in one place: tokens (§0),
  reset (§1), fixed chrome (§2), the generic reveal/kinetic-headline
  primitives every chapter reuses (§3), then one section per chapter (§4–11),
  and a single consolidated reduced-motion block (§12) so the full
  accessibility contract is auditable in one place.
- **script.js** — the behavior layer. Each scroll-driven scene owns exactly
  one `requestAnimationFrame` clock and writes only CSS custom properties or
  toggles a class on threshold-cross; it never fights another module for the
  same property. See the file header for the full module list.

## The world & the motif system

A private atelier where a single suspended bottle catches raking light as
darkness resolves into ivory paper. Five motifs recur everywhere rather than
inventing new imagery per section: the bottle itself, a fine gold thread
(grows into the scent-pyramid diagram in "The Notes"), an aperture/spotlight
glow (the atmosphere layer in the Hero, the glow dots in "The Bottle"), warm
grain/light, and a small monogram mark.

Chapters alternate temperature on purpose (void → ivory → void → …) so no two
adjacent sections share the same palette — Hero ends ivory, Essence is void,
Notes is ivory, Bottle is void, Experience is ivory, Philosophy is void, CTA
is ivory, Footer is void.

## How the motion works

Every scroll-linked property is a **pure function of scroll position** —
that's what makes scrolling back up reverse everything for free, with no
special-case "reverse" logic anywhere:

- **Hero** — one clock computes `p` (0→1 across a 320vh pin) and derives five
  named sub-values (`--bx` bottle rise, `--wx` wordmark recede, `--dx`
  void→ivory crossfade, `--ax` atmosphere glow, `--cue` scroll-hint fade).
  CSS reads these directly; JS never touches `transform` or `opacity`
  strings itself.
- **The Notes** — one clock drives `--p` (the gold thread's `scaleY`) and a
  discrete "active third" index (Top/Heart/Base), so the text gets a stable
  read instead of scrubbing mid-sentence.
- **The Bottle** — same pattern: `--p` drives a continuous scale/rotate on
  the bottle, a discrete "active quarter" swaps the caption + glow together.
- **Essence line / Experience layers** — a shared lerped-parallax engine
  (one `[data-parallax]` attribute, one reusable module) rather than a
  bespoke script per section.

Four signature easing curves are the only ones used anywhere — reveal
(decel), exit (accel), playful (overshoot, CTA magnetic button only), cut
(the scroll-cue draw). Never a bare `ease`/`linear`.

## Accessibility & degrade paths

- `prefers-reduced-motion: reduce` fully disables all three scroll-progress
  engines and the parallax/magnetic modules; CSS forces every scene to its
  most-informative static state (see styles.css §12).
- Below 768px, the three pinned scenes (Hero, Notes, Bottle) collapse from
  `position: sticky` scrubbing into normal stacked flow — the JS keeps
  running harmlessly in the background, but CSS owns the actual layout, so
  nothing depends on JS detecting the breakpoint.
- Skip-link, semantic landmarks, `aria-label`s on every kinetic/split-word
  heading (the visual word-spans are `aria-hidden`, screen readers get the
  clean sentence instead).

## Customizing

- **Copy**: everything is plain text in index.html — no CMS/data layer.
- **Palette**: edit the hex values at the top of styles.css (§0). The two
  `[data-theme]` blocks are the only place light/dark roles are defined;
  every section just references `var(--bg)`, `var(--fg)`, `var(--accent)`.
- **The bottle**: one `<symbol id="sym-bottle">` in index.html. Recolor via
  the four gradients defined just above it (`glassGrad`, `liquidGrad`,
  `capGrad`, `hairGrad`).
- **Pin lengths**: `.hero`, `.notes-scene`, `.bottle-scene` each set their
  own height in vh — that's the pacing budget (150–400vh) mentioned in the
  motion comments.

## A note on the artwork

There's no photography in this build — the bottle and every atmospheric
visual are original SVG/CSS compositions (gradients, not raster images),
since stock perfume photography would clash with "a global maison, not a
template." Swap in real product photography by replacing the `<symbol>`
with an `<img>`/`<picture>` — the surrounding scroll engines only care about
the wrapping element's box, not its contents.
