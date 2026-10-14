# Exploration: Interactive Exhibition / Stand Distribution Section (`/partners`)

Change: `add-partners-floor-plan` · Branch: `partners` · Artifact store: hybrid
Language: this artifact is English. Quoted product UI copy is Spanish (existing site convention).

---

## Current State

### 1. The floor plan image — measured, not assumed

`src/assets/images/stan/distribucion_stanes.png` — 1300×1300 RGBA, 540 KB, imported nowhere.

Measured with a pixel scan (PIL + numpy, per-channel masks, connected-component and
run-length analysis):

| Property | Measured value |
| --- | --- |
| Pixel composition | **50.2% pure white**, 26.2% cyan fill `#C8FFFF`, 21.5% mid-gray, 2.1% dark |
| Overall content bbox | x 46..1247, y 72..1246 |
| **Stand hall bbox** | **x 55..999, y 180..959** (945 × 780 px, aspect 1.21) |
| Hall position as % of image | left 4.23%, top 13.85%, width 72.69%, height 60.0% |
| Dead zone | right ~23% of the canvas is a separate annotation column; bottom bar y 1121..1246 is a gray `#F0F0F0` notes block |
| Baked-in text | Yes — labels on the stands (stroke ~6-7 px, cap height ~20 px), plus a top-centre text block at x 715..845, y 102..160, plus 2 paragraphs in the bottom bar |
| Text legibility | Heavily anti-aliased; **not OCR-readable** (glyphs merge at ~20 px). At a 700–900 px render it rasterises to ~11–17 px and reads as blur |

**The hall is a regular 5-band grid**, which is the good news — coordinates are derivable:

Row bands (separated by white aisles of 115–116 px, except an 11 px gap before E):

| Band | Source y | Height | top % | height % | Finest visible cells | Cyan column-spans |
| --- | --- | --- | --- | --- | --- | --- |
| A | 204..309 | 106 | 15.69 | 8.15 | 5 | 14 |
| B | 425..462 | 38 | 32.69 | 2.92 | 8 | 7 |
| C | 577..609 | 33 | 44.38 | 2.54 | 9 | 7 |
| D | 725..815 | 91 | 55.77 | 7.00 | 6 | 9 |
| E | 826..939 | 114 | 63.54 | 8.77 | 3 (only x 370..999 filled) | 1 |
| | | | | | **31** | **38** |

Macro columns (dominant separators at x = 174, 355, 540, 727, 996):

| Col | Source x | Width | left % | width % |
| --- | --- | --- | --- | --- |
| 1 | 60..173 | 114 | 4.62 | 8.77 |
| 2 | 174..354 | 181 | 13.38 | 13.92 |
| 3 | 355..539 | 185 | 27.31 | 14.23 |
| 4 | 540..726 | 187 | 41.54 | 14.38 |
| 5 | 727..995 | 269 | 55.92 | 20.69 |

Smallest measured stand is **20–25 px wide = 1.54–1.92% of the box**, which renders
**11–14 px at 700 px** and **14–17 px at 900 px** — under the 24 px WCAG 2.2 target-size floor.

### 2. Hard finding: the plan supports ~21–31 stands, not 70 and not 130

Counting what the image actually delineates: **~21 macro cells** (5 cols × 5 bands, minus the
empty band-E left side) or **31 finest visible cells** or **38 cyan column-spans**, depending on
how finely you subdivide. Adjacent stands inside a band touch — the only separators are the
5 dominant vertical lines and the 4 horizontal aisles.

This is the central scope fact. Three mutually inconsistent stand counts are now in play:

| Source | Count | Status |
| --- | --- | --- |
| Measured from the plan image | **~21–31** | Physical reality of the drawing |
| User's new spec, highlighted metrics | **70** | Not yet on the site |
| `hero.tsx` `HERO_STATS`, `sponsors.tsx` ×2, `page.tsx` metadata | **+130** | **Already live on `/partners`** |
| `participateData.ts` `STAND_PRICING.slots` | 10+20+76+24 = 130 | Committed, and the source of "+130" |
| `partners.txt` plan description (gitignored) | 8 Bronce modules (C–J) | Conflicts with its own tarifario (`slots: 24`) |

### 3. Metrics copy already contradicts the requested metrics

`hero.tsx` (line 22-27) renders `+5.000 Asistentes`, `+130 Stands`, `+50 Expertos`, `3 Jornadas`.
`sponsors.tsx` renders `+130 stands` and "Más de 5.000 asistentes" and "Más de 130 stands disponibles".

The requested metric strip says **+2000 attendees** and **70 stands**. Placed in the same page,
that reads as `+5.000` at the top and `+2000` mid-page, and `+130` twice above `70`. This is a
commercial self-contradiction, not a code concern.

### 4. What `participateData.ts` actually contains (349 lines — already over the 300 cap)

- `STAND_PRICING` — 4 tiers, each `{ name, earlyBird, presale, normal, slots }`:
  Platino 3500/4000/5000 (10) · Oro 2000/2500/3000 (20) · Plata 1100/1500/2000 (76) · Bronce 600/750/1000 (24).
- `NIVELES` — 4 `ParticipateCard` = `{ id, name, icon, tagline, benefits[], gradient, borderColor, glow, featured }`.
- `SPONSORSHIP`, `SPONSORSHIP_PRICING`, `CORPORATE`, `CORPORATE_PRICING`, `GROUPS` (accordion metadata).

**There is no per-stand data model at all.** Specifically missing, all of which the requested
info panel needs:

- no stand ID or code
- no geometry (no x/y/w/h anywhere in the repo)
- no `status` field — **Disponible / Reservado / Vendido does not exist as data**
- no per-stand surface (m²); m² appears only inside benefit strings ("hasta 36 m²", "18 m²", "9 m²")
- no per-stand location description ("Sector central frente al Main Stage")
- no per-stand price; only 3 price windows per tier

The panel's data source has to be authored new, as a committed `*Data.ts`
(`partners.txt` is gitignored and unavailable at build time).

### 5. How `participate.tsx` is structured (250 lines)

`'use client'` · imports `GROUPS` from `./participateData`. Internal components:
`PricingTable` (AnimatePresence + `height: 0→auto`, the accordion), `ParticipateCard`
(`whileInView` y:40, `whileHover` y:-5, **infinite `boxShadow` pulse at 4 s**, **infinite icon
`rotate: 360` at 8 s**), `ParticipateGroupSection` (`useState showPricing`), default export.
Section root: `<section id="participar" className="w-full relative z-30 py-24">` inside
`<div className="w-[90%] max-w-7xl mx-auto">`.

Reusable CTA contract — a new section's primary action must reuse it, not invent a new one:

```ts
window.dispatchEvent(new CustomEvent("partners:prefill-contact", { detail: message }))
document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
```

### 6. `/partners` composition and the load-bearing `z-30`

`src/app/partners/page.tsx` (50 lines) composes 7 sections, each wrapped in
`<ParticlesBackground dots={100} lines={120}>`, alternating
`particleColor="#00c6ff" lineColor="rgba(0, 198, 255, 0.4)"` on every other section.
Import order: hero, sponsors, participate, assets, process, policy, contact.

**Verified, non-obvious, and load-bearing:** every one of the 7 partners section roots carries
`relative z-30`. `ParticlesBackground.tsx` renders
`<canvas className="absolute w-full h-full" />` with **no `pointer-events-none` and no z-index**.
Because the canvas is positioned with `z-index: auto` while each section root forms a stacking
context at `z-index: 30`, the sections paint *and hit-test* above the canvas. The new section
**must** carry `relative z-30` on its root or the particle canvas swallows every click on the plan.

`menu.tsx` `NAV_LINKS` = `#sponsors, #participar, #activos, #proceso, #politica, #contacto`.
The nav `href` must equal the section `id` or the link silently does nothing.

### 7. Environment facts that constrain the design

- **Tailwind v4 CSS-first, no `tailwind.config.ts`.** `globals.css` has no `@theme` block — just
  `body { background-color: #002c6b }` and a global `button:hover { cursor: pointer }`. Brand
  hexes are hardcoded inline everywhere. Colour values in the spec
  (`#60A5FA`, `#84CC16`, `#FACC15`, `#22D3EE`, `#475569`, `#EF4444`) are **light/pastel and
  warm-leaning** — they are off the established cyan/blue token set (`#03f5ff`, `#00c6ff`,
  `#0090ff`, `#0242fd`, `#b5bbef`, `#d7e8f9`), and `#84CC16`/`#FACC15` are olive/yellow, which
  directly conflicts with the "avoid oversaturated colours, technological blue palette" brief.
- **No pan/zoom dependency exists.** `package.json` has no gesture library. `framer-motion`
  12.34.0 *is* installed. The existing `src/components/location/map/maps.tsx` is 15 lines with no
  transform/zoom/drag — **there is no pan/zoom precedent in this repo to copy.**
- `next.config.ts` has `images.remotePatterns: []` → the plan must be a local import (it is).
- No `/exposicion` route exists. Adding the deep link creates a **new public route** with its own
  layout and metadata decision, duplicating the section.
- `src/components/common/ui/button.tsx` is themed `#0242fd` / `#fcfef9` — off the cyan accent.
  Existing partners sections hand-roll gradient buttons instead. The primitive is a poor fit
  for this section's look; reusing it will fight the design.
- Verification rests only on `npx tsc --noEmit`, `npm run lint` (2 pre-existing errors + 4
  warnings), and `npm run build`. No test runner, no CI. `strict_tdd: false`.

---

## Affected Areas

- `src/app/partners/page.tsx` — import + mount the section; wrapped in `ParticlesBackground`
- `src/app/partners/layout.tsx` — chrome; only if the section needs different page-level treatment
- `src/components/partners/menu/menu.tsx` — `NAV_LINKS` entry, `href` must equal the section `id`
- `src/components/partners/exhibition/**` — new folder (8 files, see split below)
- `src/components/partners/participate/participateData.ts` — reusable tier pricing/surfaces;
  **already 349 lines, over the cap.** The new data module should read from it, not extend it.
- `src/assets/images/stan/distribucion_stanes.png` — read-only base layer
- `src/components/utils/ParticlesBackground.tsx` — **must not be modified in this change.**
  It affects every page; the missing `aria-hidden` / `pointer-events-none` / reduced-motion /
  RAF-cancel is a separate follow-up change.
- `src/components/partners/hero/hero.tsx`, `sponsors/sponsors.tsx` — only if the metrics
  reconciliation changes the live `+130` / `+5.000` copy

---

## Approaches — coordinate strategy

The geometry question is forced by two facts: the image is **square** (so the box is
`aspect-square` and percentages are resolution-independent), and the hall occupies only
**4.23%..76.85% horizontally and 13.85%..73.77% vertically** of that square.

### Option A — Percentage-absolute hotspots over the full 1300² box (recommended)

Stands live in the data module as **source pixels** (`x, y, w, h` in the 1300 space) and the
renderer converts: `left = x / 1300 * 100%`. Geometry constants live in a `floorPlanGeometry.ts`.

- Pros: zero dependencies; percentages are inherently responsive and need no re-computation on
  resize; the plan can scale freely under a zoom transform; the data stays human-verifiable
  against the PNG because the numbers *are* the PNG's numbers; Tailwind classes and framer-motion
  (`whileHover`/`whileTap`) work on the same element.
- Cons: the hall renders into the upper-left ~73% × 60% of the frame, so the map looks off-centre
  with a large dead right/bottom zone occupied by the baked-in legend and notes bar; coordinate
  drift is invisible until visual QA, so the data table must be reviewed against the image;
  smallest hotspots land at 11–17 px and need an inflated hit area.
- Effort: **Low.**

### Option B — SVG overlay with `viewBox="0 0 1300 1300"`

One `<svg viewBox="0 0 1300 1300">` holding the base `<image>` and one `<rect>` per stand.

- Pros: the viewBox *is* the coordinate system, so the same pixel numbers author both the base
  image and the hotspots — alignment is self-evident and reviewable; vector hotspots stay crisp
  at any zoom; `vector-effect` available.
- Cons: SVG shapes are **not focusable buttons** — keyboard and screen-reader support then
  requires either `<foreignObject>` (awkward with React) or a parallel layer of real HTML
  buttons, which reintroduces the percentage problem; hover/focus styling in SVG is far less
  ergonomic than Tailwind; more verbose for ~31 interactive nodes.
- Effort: **Medium.**

### Option C — Hand-redraw the plan as a CSS grid, drop the image

- Pros: the only option that simultaneously solves the blurred baked-in text, the white-plan-on-
  dark-section clash, and native HTML-button accessibility. Real `<button>` hotspots for free.
- Cons: **violates an explicit user requirement** ("use the official plan image as the base,
  preserve original proportions"). Requires the client to supply real vector geometry.
  Named for completeness, not recommended.
- Effort: **High**, out of contract.

### Recommendation

**Option A**, with the geometry authored in source-pixel space and converted to percentages at
render time. This takes Option A's zero-dependency responsiveness and keeps Option B's
self-documenting, reviewable coordinates, and lets the design phase publish a pixel→% table a
human can check against the PNG.

Two consequences the specs must carry:

1. **Cropping to the hall is not available.** The right annotation column and the bottom notes
   bar are baked into the pixels; there is no transparent margin to crop into. Options are
   (a) show them, (b) `overflow-hidden` + a scale/translate to push the hall to fill the frame and
   accept that the baked-in legend is cut, or (c) obtain a clean source file. **This is a user
   decision (open question 4).**
2. **The white plan on a dark section.** The plan is a white-background drawing. Dropped into a
   dark, glassmorphic section it becomes a bright hole. Needs an explicit decision (open
   question 3): accept it inside a light "plan viewport" panel, or apply a CSS filter
   (invert/hue-rotate) — which would wreck the cyan and the baked-in labels.

### On hotspot resolution and alignment

The plan has **enough** structure to align hotspots: the 5×5 macro grid is unambiguous and the
per-band separators are detectable. It does **not** have enough resolution to *individually
delineate* 70 stands. If the spec still says 70, roughly 40 overlays would have to invent
boundaries the drawing does not show, and they would be visibly misaligned against the baked-in
labels.

---

## Approaches — zoom / pan

Requirement is "light zoom support" on desktop and "keep touch zoom" on mobile, and zoom must
never break the 30% side panel.

### Option 1 — CSS `transform: scale()` on the plan wrapper

- Pros: no dependency, trivial, `transform` composited on the GPU.
- Cons: free pan/zoom is not expressible; **pinch-zoom is impossible** without tracking two
  touch points yourself.
- Effort: Low.

### Option 2 — framer-motion `drag` + `scale` + `dragConstraints` (recommended)

- Pros: `framer-motion` 12.34.0 is **already installed**; `drag` gives bounded pan, `scale` gives
  preset zoom, and `useReducedMotion()` is built in. Keeps the 400-line review budget and the
  dependency list untouched.
- Cons: still no pinch-zoom. Desktop zoom is preset buttons (1× / 1.5× / 2×), not free zoom.
- Effort: **Low–Medium.**

### Option 3 — New gesture dependency (`@use-gesture/react`, `react-zoom-pan-pinch`)

- Pros: real wheel + pinch + pan with inertia, which is the only way to satisfy a literal
  "free pinch-zoom inside the plan" requirement.
- Cons: adds a dependency to a repo with **zero gesture libraries and no precedent**; heavier
  options need their own a11y wrapper; the new dep must be justified in the proposal and it is
  a real review-cost line item.
- Effort: Medium, plus dependency decision.

### Recommendation

**Option 2.** Desktop "light zoom" is 3 preset levels — that is exactly what the brief asks for
and it does not need a library. For mobile, the honest answer is that **native page-level
pinch-zoom already works as long as the section does not swallow touch**: do not set
`touch-action: none` and do not `preventDefault` on `touchmove`. Give the container
`touch-action: pan-y` and preset zoom buttons, and let the browser own the pinch. A gesture
library is justified only if free in-plan pinch is a hard requirement — that is open question 10,
and the default is **no**.

### The panel-safety requirement

Transforms do not affect layout, so the 30% column will not reflow. But `overflow` defaults to
`visible`, so a 2×-scaled square plan **will visually spill over the side panel**. Therefore:

- the plan viewport MUST be `overflow-hidden` (plus `contain: paint`) — this is a correctness
  requirement, not cosmetic;
- the side panel MUST be a sibling grid column, never a descendant of the transformed element;
- the hotspot layer and the zoom control row MUST be siblings *inside* the viewport so they do
  not scale with the plan.

---

## Accessibility and reduced-motion

**Verified absences in the repo (grep across `src/`, zero hits):** `prefers-reduced-motion`,
`useReducedMotion`, `aria-hidden` on the canvas, `pointer-events-none` on the canvas.

`ParticlesBackground.tsx` (107 lines):
- runs a `requestAnimationFrame` loop that is **never cancelled** — the cleanup function only
  removes the `resize` listener, so the loop outlives unmount;
- has no `aria-hidden`, so a screen reader may announce a decorative canvas;
- has no `pointer-events-none` (mitigated only by the `z-30` convention described above);
- animates infinitely with no opt-out.

Adding this section produces **two competing full-screen animation loops** with no reduced-motion
path, on top of an existing repo-wide pattern of `repeat: Number.POSITIVE_INFINITY` (hero `h2`
`textShadow` 3 s, `ParticipateCard` `boxShadow` 4 s and icon `rotate` 8 s, `sponsors` icon
`boxShadow` 3 s).

`ParticlesBackground.tsx` is **out of scope** — it affects every page. Log it as a separate
follow-up change. But the new section's spec **MUST** require its own reduced-motion path:
`useReducedMotion()` from framer-motion, driving off both the hover glow pulse and the
zoom transition, plus a static rendering of the plan when reduced motion is requested.

**Minimum viable hotspot accessibility.** A `<div onClick>` hotspot is not reachable by keyboard
and is invisible to assistive tech. The floor is:

- each hotspot is a real `<button type="button">` (inherently focusable and activatable) with an
  `aria-label` carrying name + category + m² + status;
- `aria-pressed` (or `aria-current`) reflects selection;
- a visible `focus-visible` ring in the category colour — never rely on the glow alone;
- the hotspot layer is a labelled group, e.g. `role="group"` + `aria-label`, and the panel is
  wired with `aria-live="polite"` so a selection change is announced;
- the mobile requirement already replaces the tooltip with the panel, so tooltips must be
  `aria-hidden` decorative duplicates, never the only place information exists;
- hit areas inflated beyond the visual rectangle to clear the 24 px target floor that the
  11–17 px smallest stands would otherwise violate.

---

## File split (300-line cap)

`participateData.ts` is already 349 lines and `participate.tsx` is 250. This section must ship
pre-split. Proposed, following the as-built `src/components/{domain}/{component}/` convention:

| File | Responsibility | Est. lines |
| --- | --- | --- |
| `exhibition/exhibition.tsx` | Section shell: header, metrics strip, 70/30 grid, owns selection state | ~120 |
| `exhibition/exhibitionData.ts` | Types + `STAND_CATALOG` + category/status style maps + derived aggregates | ~180 |
| `exhibition/floorPlanGeometry.ts` | Verified 1300-space band/column constants + px→% conversion | ~60 |
| `exhibition/floorPlan.tsx` | `aspect-square` viewport, base image, hotspot layer, zoom controls | ~150 |
| `exhibition/standHotspot.tsx` | One `<button>` hotspot: category colour, hover glow, focus ring, tooltip | ~70 |
| `exhibition/standPanel.tsx` | 30% panel: initial state, selected state, benefits checklist, CTA | ~150 |
| `exhibition/exhibitionLegend.tsx` | 6-state legend overlaid on the plan viewport | ~60 |
| `exhibition/useExhibitionState.ts` | Selection, category filter, availability filter, reduced-motion | ~90 |

8 files, ~880 lines. Every file sits inside the 200–300 healthy range; none approaches the cap.
Because the new data module must **read** tier pricing from `participateData.ts` rather than
extend it, the pre-existing 349-line violation is inherited, not worsened.

---

## Review Workload Forecast

Not the tasks phase, but `force-chained` with a 400-line budget needs boundaries now.
Total realistic output **~1,300–1,500 changed lines** → **4 chained PR slices**.

| Slice | Content | Est. lines | 400-line risk |
| --- | --- | --- | --- |
| 1 | `floorPlanGeometry.ts` + `exhibitionData.ts` + `standHotspot.tsx` + `floorPlan.tsx` (presentational plan, no selection) + section shell + `page.tsx` mount + `menu.tsx` anchor | ~400 | **High** — at the ceiling, split if the catalog grows |
| 2 | `useExhibitionState.ts` + `standPanel.tsx` + `exhibitionLegend.tsx` (selection → panel, benefits, CTA reusing the `partners:prefill-contact` contract) | ~330 | Medium |
| 3 | Zoom/pan (framer-motion `drag` + preset `scale`), tooltips, `overflow-hidden` panel-safety, `prefers-reduced-motion` path, mobile stacking, `relative z-30` | ~300 | Medium |
| 4 *(optional)* | Category + availability filters, `/exposicion` deep-link route | ~250 | Low |

`Decision needed before apply: Yes` · `Chained PRs recommended: Yes` · `400-line budget risk: High`

If the answer to open question 1 is "fewer stands", the catalog shrinks and slice 1 may fit under
budget on its own. If it is 70, the catalog alone is ~250 lines of data and the split must grow.

---

## Risks

- **The plan does not contain 70 stands.** Measured ~21–31 delineated positions. Rendering 70
  hotspots would put ~40 of them on boundaries the drawing does not show.
- **Self-contradictory numbers on a live page.** `+5.000 asistentes` and `+130 stands` are already
  published in `hero.tsx`, `sponsors.tsx` (×2) and the page metadata. The requested `+2000` and
  `70` would contradict them on the same screen.
- **A white plan image in a dark section.** The plan is 50% pure white. It will read as a bright
  hole in the intended dark, glassmorphic, cyan-accented design.
- **Uncroppable baked-in content.** The right annotation column and the bottom notes bar are
  pixels; the hall cannot be cropped out without losing them.
- **Blurred baked-in labels.** ~6–7 px strokes render at 11–17 px and read as blur at target size.
- **Missing data model.** No per-stand ID, geometry, status, surface, location or price exists
  anywhere. The panel's entire content must be authored, and its commercial accuracy is
  unverifiable from the repo.
- **Particle canvas click interception** if the new section omits `relative z-30` on its root.
- **Two competing infinite animation loops** with no reduced-motion path anywhere in the repo.
- **Off-brand palette.** The six specified colours are light/warm (`#84CC16` olive, `#FACC15`
  yellow) against an established cyan/blue token set, and against an explicit "no oversaturated
  colours, technological blue" brief.
- **Deep link creates a new public route** (`/exposicion`) duplicating the section, with its own
  layout and metadata decision.
- **No tests.** `strict_tdd: false`; only `tsc --noEmit`, `lint` and `next build`. For a
  coordinate-data-driven interactive section, visual alignment and hit-target size are
  **unverifiable by the available checks** and need human review.
- **Hotspots below the target-size floor.** Smallest stands render at 11–17 px.

---

## Ready for Proposal

**No — not until the commercial numbers and the data source are resolved.**

The technical shape is settled and low-risk: Option A coordinate strategy, Option 2 zoom, an
8-file pre-split component, and 4 chained PR slices. What blocks specs is not technical.

The specs cannot be written without the user answering, at minimum:

1. **Which stand count is real** — ~21–31 (the image), 70 (the brief), or +130 (already live)?
   And does the correction propagate to `hero.tsx` and `sponsors.tsx`?
2. **Which attendee figure is real** — the live `+5.000` or the requested `+2000`?
3. **Who authors the per-stand data** (ID, category, m², status, price, location) for each
   position, and who signs off on it?
4. **How to treat the white plan on a dark section**, and whether the baked-in right legend and
   bottom notes bar may be cropped or hidden.

The orchestrator should ask these as four questions, then loop back for the proposal phase.

---

## Open Questions

### Blocking — specs cannot be written without these

1. **Stand count.** ~21–31 physically delineated, 70 in the brief, +130 already live in three
   places. Which is authoritative, and should the section's metric agree with `hero.tsx` and
   `sponsors.tsx`?
2. **Attendee count.** Brief says `+2000`; `hero.tsx` and `sponsors.tsx` say `+5.000`. Also:
   `15 strategic sponsors` is a new metric with no precedent on the site — is it real?
3. **Per-stand data ownership.** No per-stand record exists. Who supplies stand ID, name,
   category, surface (m²), location text, status and price for each position?
4. **White plan on a dark section.** Approve (a) a light "plan viewport" panel on the dark
   section, (b) a CSS filter treatment, or (c) a new dark-background source file?
5. **Baked-in legend / notes bar.** Show it, crop it away with `overflow-hidden` + scale, or
   request a clean source image?

### Defaultable — proposed defaults, proceed unless overridden

6. **Insertion point:** after `#participar`, before `#activos` — the section explains *where*
   stands are, so it belongs after pricing and before the assets section.
7. **Nav anchor:** add `"Exhibición"` → `#exposicion` in slice 1, since a 7-link menu is already
   crowded. Default: yes, but flag it.
8. **Stand ID scheme:** `A1…A12`, `B1…B8` (band letter + index) — mirrors the plan's own banding.
9. **Initial statuses:** all `Disponible` as a documented seed, so `Reservado`/`Vendido` render
   for demonstration.
10. **Free in-plan pinch-zoom:** **no** — preset 1×/1.5×/2× buttons plus native page pinch.
    Avoids a new dependency. Override only if in-plan pinch is a hard requirement.
11. **Benefits checklist:** reuse `NIVELES[].benefits` per category instead of authoring 31 lists.
12. **Price display:** show the tier's `presale` window, or a "desde USD X" — do not invent
    per-stand prices.
13. **Category colours:** keep the six specified hexes as the functional/status encoding (they are
    a legitimate categorical scale) but confirm the olive/yellow against the blue brief; suggest
    cyan-family alternatives for Platino/Oro/Plata/Bronce that keep the six states separable.
14. **Tooltip on desktop only**; mobile relies on the panel, per the brief.
15. **Legend placement:** overlaid top-left of the plan viewport on desktop, below the plan on
    mobile.
16. **Deep links `/exposicion`:** defer to an optional slice 4 — it creates a new public route
    that duplicates the section.

---

## Verification Notes

- `strict_tdd: false` — no test runner, no CI. Verification is `npx tsc --noEmit`,
  `npm run lint` (2 pre-existing errors in `introductionDescription.tsx`, 1 pre-existing unused
  import `Tag` in `participateData.ts`, 4 warnings — none are regressions), `npm run build`.
- **Not machine-verifiable:** hotspot alignment against the plan, hit-target size, dark/light
  harmony, and the commercial accuracy of stand data. These require human review and should be
  an explicit acceptance step per slice.
- The plan image was analysed programmatically (PIL + numpy). This model cannot view images, so
  all geometric claims above come from measured pixel statistics, not visual inspection. The
  baked-in label *text* could not be read (blurred, not OCR-able) — the design phase should
  confirm the nomenclature with a human who can see the file.
