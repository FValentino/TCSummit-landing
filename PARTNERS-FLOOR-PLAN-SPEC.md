# Partners Floor Plan — Build Handoff Spec

Interactive exhibition floor plan for the `/partners` page of `tcsummit-landing` (branch `partners`). 130 stands, clickable hotspots over an official plan image, a dynamic info panel, and a `?stand=` deep link.

This document is self-sufficient. An engineer with no memory of the originating discussion implements this section from this file alone.

---

## 0. Hard constraints — read before anything else

These are non-negotiable. Violating any of them produces a silent or a build-breaking failure.

| # | Constraint | Consequence if ignored |
|---|-----------|------------------------|
| C1 | The section lives **only** inside `src/app/partners/page.tsx` | A new route duplicates a public page. Explicitly rejected. |
| C2 | Every section root needs `relative z-30` | Clicks on the floor plan **silently die**. The particle canvas is not `pointer-events-none` and paints above unpainted siblings. |
| C3 | Max file size **300 lines**; healthy range 200–300 | `participateData.ts` is already 349. New data goes in a **new module**, never appended there. |
| C4 | Convention is `src/components/partners/<section>/` — **not** the global `src/features/` standard | Inconsistent with all 9 existing partners sections. |
| C5 | Imports must say `framer-motion`, never `motion` | The `motion` package is **not installed**. Build fails. |
| C6 | Brand hexes are hardcoded inline | `src/app/globals.css` is 34 lines with **no `@theme` block**. There are no design tokens to consume. |
| C7 | Stand count must sum to **130** | `participate.tsx` renders a column labeled `"Cupos"` with values 10/20/76/24. Any other total shows contradictory arithmetic. |
| C8 | Images must be local files | `next.config.ts` has `images.remotePatterns: []`. Any remote image breaks `next build`. |
| C9 | Runtime stand data lives in a committed `*Data.ts` | `partners.txt` is gitignored (`.gitignore:44`) and is not available at build time. |
| C10 | There is **no test runner** | No vitest/jest/playwright, no `test` script, no CI, no `.github/`. Verification is `tsc --noEmit` + `next build` + manual eyeball. |
| C11 | `npm run lint` already fails | 2 pre-existing errors + 4 warnings, unrelated to this work. See §12.3. |
| C12 | **The stand state system is swappable.** No component may branch on a stand id or a hardcoded status literal | The real interactivity is not designed yet. Status is a data field; colors, legend, panel, and filters all read the same enum. A `stand.id === "platino-01"` or `status === "vendido"` check in a component hardcodes an assumption that breaks the moment inventory arrives. See §4.1. |

**Verified stack** (from `package.json`): Next.js `16.3.5`, React `19.2.3`, TypeScript `^5` strict, `framer-motion@^12.34.0`, Tailwind v4 CSS-first (only `postcss.config.mjs` exists; there is **no** `tailwind.config.ts`).

**Verified brand constants** (hardcoded inline throughout the repo, no tokens):

| Role | Hex | Precedent |
|------|-----|-----------|
| Primary accent | `#03f5ff` | Most-used; borders, glows, chips |
| Mid accent | `#00c6ff` | Alternate particle/section accent |
| Deep accent | `#0090ff` | Gradient terminus |
| Page background | `#002c6b` | `globals.css:18` `body { background-color: #002c6b }` |

The section sits on a **deep blue** ground, not near-black. Any palette chosen must survive that.

---

## 1. Quick path

| Order | Action | Gate |
|-------|--------|------|
| 1 | Send the image request brief (§3.1) to the client/designer. **Non-blocking** — development proceeds on the accepted placeholder (§3.2) | Send when ready |
| 2 | Build `floorplanData.ts` + `floorplanCopy.ts` against parametrized percent coordinates (§4) | `tsc --noEmit` |
| 3 | Render the static plan: image, hotspots, legend, metrics (§6) | `next build` + eyeball |
| 4 | Add selection state + info panel (§7) | Manual click traversal |
| 5 | Mount, zoom/pan, tooltip, filters, deep link, copy alignment (§10) | Full §12 checklist |
| 6 | Recalibrate coordinates against the real image when it lands | §3.2 |

Nothing here blocks on the client. Every open question is closed (§13). Steps 2–5 build against the placeholder; step 6 is the only step that needs the real asset.

---

## 2. Context and current state

### 2.1 What exists today

`src/app/partners/page.tsx` (50 lines) composes 7 sections, each wrapped in `<ParticlesBackground dots={100} lines={120}>`. `src/app/partners/layout.tsx` (15 lines) adds `PartnersMenu` and `PartnersFooter`.

| File | Lines | Notes |
|------|-------|-------|
| `src/components/partners/hero/hero.tsx` | 232 | Contains `HERO_STATS` at **lines 22–27** — to be removed |
| `src/components/partners/sponsors/sponsors.tsx` | 134 | Prose at **line 19** — to be aligned |
| `src/components/partners/participate/participate.tsx` | 250 | Already has an `AnimatePresence` accordion (lines 199–201) |
| `src/components/partners/participate/participateData.ts` | **349** | Over the 300-line cap. Source of truth for tariffs |
| `src/app/partners/page.tsx` | 50 | Meta description at **line 15** — to be aligned |

### 2.2 Tariff source of truth

`src/components/partners/participate/participateData.ts:23-28` — this array is authoritative. Do not retype these numbers anywhere else; import them.

| Tier | `earlyBird` | `presale` | `normal` | `slots` |
|------|------------|-----------|----------|--------|
| Platino | 3500 | 4000 | 5000 | 10 |
| Oro | 2000 | 2500 | 3000 | 20 |
| Plata | 1100 | 1500 | 2000 | 76 |
| Bronce | 600 | 750 | 1000 | 24 |
| **Total** | | | | **130** |

Surface areas per tier, from the `NIVELES` benefits in the same file:

| Tier | Surface | Source line |
|------|---------|-------------|
| Platino | 36 m² ("hasta 36 m²") | `participateData.ts:37` |
| Oro | 18 m² | `participateData.ts:55` |
| Plata | 9 m² | `participateData.ts:71` |
| Bronce | Not stated ("Espacio de exhibición básico") | `participateData.ts:86` |

Bronce m² is **not defined in the source document**. `4 m²` is an explicitly provisional placeholder supplied by the client for now. Tag it in code as such (§4.1) so it stays greppable when the real figure arrives.

### 2.3 The current PNG — accepted development placeholder

`src/assets/images/stan/distribucion_stanes.png` — 1300×1300, 8-bit RGBA, **imported nowhere in the codebase** (verified: zero references). Measured by decoding the PNG pixel data:

| Measurement | Value | Consequence |
|-------------|-------|-------------|
| Canvas | 1300 × 1300 | Square |
| Pure white background | **48.8%** of all pixels | Opaque white box on a `#002c6b` page. Composites as a hard white square. |
| Transparent pixels | **1.7%** | Effectively opaque. Cannot be used as an overlay layer. |
| Stand hall bounding box | x `[47, 999]`, y `[175, 949]` = **73.2% W × 59.5% H** | The plan occupies under 3/4 of the frame. Cropping cannot help — see next row. |
| Baked-in right annotation column | x ≥ 1000, 300 px = **23.1% of width** | **Pixels, not an overlay.** It is part of the image and cannot be hidden or cropped out without also cutting the hall. |
| Baked-in bottom notes bar | y `[1121, 1247]`, 126 px = **9.7% of height** | Same problem: a gray bar burned into the pixels. |
| Delineated stand rectangles | **~50** at a `>300 px` area threshold (a coarser macro-cell pass yields 21–31) | The image does **not** delineate 130 positions. It cannot be reconciled with the 130-stand tariff — hence the interim strategy in §3.3. |
| Adjacent stands | **30 same-row pairs with a gap ≤ 1 px** | Stands **touch**. Zero dead space between them, so an overlaid hit target per stand is ambiguous. |
| Smallest stand rectangles | 18–19 px; typical 27–34 px × 22–28 px | Below the WCAG 2.2 SC 2.5.8 minimum target size of 24 × 24 CSS px. |

Cyan stand fill accounts for 28.8% of the canvas; gray (annotations + notes) 15.6%.

**Status: accepted as a development placeholder.** The client knows the file is provisional and will supply a proper image later. Build against it; it is not a blocker.

**What this forces you to know.** Two properties make the placeholder unusable for *final* coordinates, and both still apply when the real image arrives:

| Property | Why it matters for final coordinates |
|----------|------------------------------------|
| Baked-in annotation column (23.1% of width) and notes bar (9.7% of height) | These are pixels. The hall cannot be cropped to fill the frame, so the final image must be re-framed from the source, not cropped from this one |
| ~50 delineated positions vs 130 sold | Hotspots cannot be one-per-drawn-rectangle. The interim strategy in §3.3 exists solely to bridge this gap |

**Do not treat any coordinate calibrated against this file as final.**

---

## 3. Floor plan image — placeholder and request brief

The real image is a **known, accepted gap**, not a blocker. The client has committed to supplying it. Development uses the existing PNG; only the final coordinate pass (§3.2) requires the real asset.

| State | Meaning |
|-------|---------|
| **Placeholder** (now) | `src/assets/images/stan/distribucion_stanes.png` renders. Hotspots do not align to it and are not meant to (§3.3). Do not ship to production (§16) |
| **Real image** (later) | Client supplies the asset per §3.1. Recalibrate the band table, flip the flag, done |

### 3.1 Request brief for the real image — send when ready

Send this verbatim to the client/designer. It is the same brief as before; the only change is that it is no longer urgent.

| Requirement | Specification | Why |
|-------------|---------------|-----|
| Format | PNG with an **alpha channel**, or SVG | Alpha lets the plan sit on `#002c6b` without a white box |
| Background | **Transparent** (preferred) or solid `#002c6b` / `#0a1633` | Never white |
| Dimensions | **2400 × 2400 px minimum**, square, 1:1 aspect | Larger than the minimum on-screen render (~900 CSS px) so it stays crisp on large displays |
| Stroke weight | ≥ 6 px at 2400 px, or vector strokes | Below ~2 CSS px the plan reads as noise on large screens |
| **Gap between stands** | **≥ 8 px of empty space at 2400 px**, on every side of every stand | Non-negotiable. Touching stands make per-stand hit-testing ambiguous |
| Minimum stand size | ≥ 40 × 40 px at 2400 px | Preserves a 24 CSS px target after scaling to ~900 px |
| Baked-in annotations | **None** | No text, no legend, no labels, no dimension arrows, no zone captions |
| Baked-in notes bar | **None** | The current bottom bar is burned-in pixels |
| Legend / metrics | **None** | Rendered by us as DOM (§6.4) so they stay translatable and accessible |
| Hall framing | Hall centered with **≥ 6% empty margin on all four sides** | Reserves overlay space for our legend (top-left) and metrics (top-right) |
| Crop safety | Nothing meaningful within 4% of any edge | Survives `object-contain` letterboxing at any container aspect |

### 3.2 Coordinate recalibration when the real image lands

Every hotspot coordinate in §4 is **provisional**. The real image will be centered with a margin; the placeholder is not, and it carries baked-in pixels that shift the effective hall bounds. The percent convention (§4.3) is what makes recalibration a 4-row band-table edit rather than a rewrite of 130 offsets.

| When the image arrives | Action |
|------------------------|--------|
| 1 | Re-run the §17 measurements on the new file to confirm the §3.1 requirements were met (gaps, min stand size, no baked-in text) |
| 2 | Measure the new hall bounding box and the drawn-position centers |
| 3 | Rewrite `BANDS` (§4.4) `top` / `height` values against the new hall bounds; adjust `perRow` if the real column count differs |
| 4 | If drawn positions must map 1:1 to real stands, set `PLACEHOLDER_MODE = false` and bind the generator to the measured position list (§3.3) |
| 5 | Re-run checklist #2 (hotspot alignment) and #3 (hit target) |

If the real image's hall proportions differ from the band table's 4 bands, the band count may change. Nothing outside `floorplanData.ts` depends on how many bands exist.

### 3.3 Interim placeholder strategy

While the placeholder is in use, 130 stands exist but only ~50 positions are drawn. Resolve this **in the data layer**, never in a component.

**Decision: hotspots are laid out by the band table across the whole plan container, and the placeholder's drawn rectangles are ignored entirely.** Do not snap hotspots to the drawn rectangles, and do not emit hotspots only on drawn positions.

| Option | Rejected because |
|--------|-----------------|
| Hotspots only on drawn positions (~50) | Leaves 80 stands unreachable — clicking nothing for 62% of inventory. Fails C7 and breaks the deep link for most ids |
| Remaining stands as "unassigned zone" aggregates | Invents a UI concept (a selectable non-stand) that does not exist in the commercial model, and the user has not asked for it |
| **Band table across the whole container** (chosen) | Hotspot count stays exactly 130, matching C7. Every stand is reachable and deep-linkable. Coordinates are meaningless against the placeholder — which is honest, because they are marked provisional |

**What you will see on screen, and why it is not a bug:**

| Observation | Explanation |
|-------------|-------------|
| 130 hotspots on a plan that shows ~50 drawn stands | Expected. The band table is authoritative; the image is not |
| Hotspots do not line up with the drawn cyan rectangles | Expected. The placeholder's hall is offset and cropped; alignment is calibrated in §3.2 step 4 |
| Some hotspots sit over the baked-in annotation column and notes bar | Expected. Percent coordinates span the whole container, including those regions. Disappears with the real image |
| Hotspots overlap where the drawn stands touch | Expected. The placeholder's stands have a ≤1 px gap; the band table needs its own gap. Disappears with the real image (§3.1 mandates ≥8 px) |
| Hovering a hotspot still shows a full panel | Correct behavior. Selection is data-driven (C12), independent of the image |

**Guard the placeholder so it cannot ship.** One flag drives the image path, the placement mode, and the draft notice (§9.11):

```ts
/** True while the provisional PNG is in use. MUST be false before production deploy. */
export const PLACEHOLDER_MODE = true
```

**The production guard must be runtime-scoped, or it breaks the build.** `next build` prerenders server-side with `NODE_ENV=production`, so an unguarded `if (process.env.NODE_ENV === "production") throw` fires during prerender and fails every build. The shipped guard adds a `typeof window` check:

```ts
// Fires in a deployed production bundle. `next build` prerenders server-side where
// `window` is undefined, so the placeholder build still compiles (spec 3.3).
if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
  throw new Error("PLACEHOLDER_MODE must be false in production (see spec 3.3)")
}
```

| What the guard does | What it does **not** do |
|--------------------|--------------------------|
| Fails loudly in a **deployed browser** if the placeholder reaches production | Catch a build-time or deploy-time mistake. A CI pipeline that builds and deploys with `PLACEHOLDER_MODE = true` **still succeeds**; the page breaks only when a real visitor loads it |

**The tradeoff, stated plainly:** this converts a build-blocking failure into a runtime one. That is the right trade here — a guard that breaks `next build` is a guard that gets deleted under deadline pressure, whereas a runtime throw is noticed immediately on first page load. But it means the placeholder **can** ship; this is a speed bump, not a gate. The real gate is checklist #19 and the code review in §12.2.

**Do not add a "coordinates are wrong" banner.** The draft-data notice already covers it. Two overlapping warnings read as a bug report.

---

## 4. Data model

New file: `src/components/partners/floorplan/floorplanData.ts`. Imports `STAND_PRICING` from the existing participate data; **adds nothing to it**.

### 4.1 Types

```ts
import { STAND_PRICING } from "@/components/partners/participate/participateData"

/** Mirrors the `name` of every `STAND_PRICING` entry. The tariff array is not `as const`,
 *  so `PricingTier["name"]` widens to `string` and cannot produce a literal union at the
 *  type level. This mirror is hand-written, so the `Exact<>` check below proves only that
 *  the two hand-written lists agree — it cannot detect a rename in the tariff itself. The
 *  runtime guard at the bottom of this file covers that case by matching on tier name. */
type TariffTierName = "Platino" | "Oro" | "Plata" | "Bronce"

export const STAND_CATEGORIES = ["platino", "oro", "plata", "bronce"] as const
export type StandCategory = (typeof STAND_CATEGORIES)[number]
export type StandCategoryName = StandCategory

export const STAND_STATUSES = ["disponible", "reservado", "vendido"] as const
export type StandStatus = (typeof STAND_STATUSES)[number]

export const DEFAULT_STATUS: StandStatus = "disponible"
export const LEGEND_STATUSES = STAND_STATUSES.filter((status) => status !== DEFAULT_STATUS)

export type PriceStage = "earlyBird" | "presale" | "normal"

/** Bidirectional-extends equality. `never` in the type position fails assignment. */
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never
export const _categoriesMatchTariff: Exact<StandCategoryName, Lowercase<TariffTierName>> = true

export interface StandGeometry {
  x: number
  y: number
  w: number
  h: number
}

export interface Stand {
  id: string
  label: string
  category: StandCategory
  status: StandStatus
  areaM2: number
  location: string
  geometry: StandGeometry
}

/** Bronce surface is not in the source document. PROVISIONAL client placeholder. */
export const PROVISIONAL_AREA_M2: Partial<Record<StandCategory, number>> = { bronce: 4 }
```

**Why the tariff cannot be derived at the type level.** The obvious derivation does not compile:

```ts
// DOES NOT COMPILE — do not write this
type PricingTier = (typeof STAND_PRICING)[number]
type StandCategory = Lowercase<PricingTier["name"]>
```

`STAND_PRICING` is declared as a plain array literal, not `as const`, so `PricingTier["name"]` is `string`, `Lowercase<string>` is `string` — not a literal union. The category union silently degrades to `string`, every `Record<StandCategory, …>` loses its key checking, and the `Exact<>` guard below evaluates to `never` (TS2322). Adding `as const` to `STAND_PRICING` would fix it at the source, but C3 forbids touching `participateData.ts` (already 349 lines). Hence the hand-written `TariffTierName` mirror.

**What `Exact<>` does and does not prove — read this before trusting it:**

| It proves | It does **not** prove |
|-----------|---------------------|
| `STAND_CATEGORIES` and `TariffTierName` list the same four tiers | That either list matches the **real** `STAND_PRICING` |
| A typo in either hand-written list fails `tsc` | That a rename in `participate.ts` is caught. Both sides are hand-written; a tariff rename leaves `Exact<>` green |

Both sides being hand-written is what makes this guard weaker than it looks. The actual protection against tariff drift is the **runtime name guard** in §4.4. Treat `Exact<>` as a typo-catcher, not a drift-detector.

`STAND_CATEGORIES` is hand-ordered (the legend needs premium-first order, not tariff order), which is the second reason the two lists are separate.

`STAND_STATUSES` is a tuple, not a bare union, so the **legend, filter options, and color map can all iterate it**. A bare `type StandStatus = "a" | "b"` cannot be iterated, which is what tempts a component into hardcoding a list. `DEFAULT_STATUS` and the derived `LEGEND_STATUSES` (§6.4) exist for the same reason.

`STAND_STATUSES` is a tuple, not a bare union, so the **legend, filter options, and color map can all iterate it**. A bare `type StandStatus = "a" | "b"` cannot be iterated, which is what tempts a component into hardcoding a list. Deriving the enum from an array is what makes C12 enforceable.

### 4.1.1 The swappable-state system (C12)

The real interactivity is not designed yet. State must be swappable without touching a component. Four rules, all enforceable by review:

| Rule | Where it lives | Prohibited |
|------|-----------------|------------|
| Status is a **field on the data**, not a component decision | `Stand.status` | Computing status from id, position, or index |
| Colors come from **one exported map** keyed by status | `STATUS_COLOR` in `floorplanCopy.ts` | A `switch` returning a hex inside a component |
| Legend and filter options **iterate** `STAND_STATUSES` | `planCanvas.tsx`, `planFilters.tsx` | A literal array of six strings in JSX |
| Status labels/notes come from **one map** | `STATUS_COPY` in `floorplanCopy.ts` | A ternary chain in the panel |

```ts
export const STATUS_COLOR: Record<StandStatus, string> = {
  disponible: "#22D3EE", // overridden per tier at render time
  reservado: "#475569",
  vendido: "#EF4444",
}

export const STATUS_COPY: Record<StandStatus, { label: string; note: string }> = {
  disponible: { label: "Disponible", note: "" },
  reservado: { label: "Reservado", note: "Este stand está reservado. Contactanos para evaluar espacios disponibles." },
  vendido:   { label: "Vendido",   note: "Este stand fue vendido. Contactanos para recibir el catálogo de espacios disponibles." },
}
```

**The single best test for C12:** grep the component directory for a non-default status literal. Hits must land only in the data and copy modules.

```bash
grep -rn "reservado\|vendido" src/components/partners/floorplan/ --include="*.ts" --include="*.tsx"
```

Expected: hits in `floorplanData.ts` and `floorplanCopy.ts` only — **2 files**. A hit in any `.tsx` is a C12 violation.

**On the `--include` flags.** They are there so a future contributor writing prose about the states into `floorplan.md` does not fail the audit. Today the companion doc deliberately paraphrases ("the two non-default state names") and the unfiltered grep already returns 2 files, so the flags are defensive rather than corrective. Naming a state in the companion `.md` is legitimate documentation, not a C12 violation — only `.tsx` branching is.

Today all 130 stands are `disponible`, so `reservado` and `vendido` have **zero instances**. That is a data fact, not a design constraint, and must not leak into components as a simplification.

### 4.2 Tier → price mapping (never per-stand)

Price is a property of the **tier**, never of an individual stand. There is no "price of Stand F". Look the tier up **by name**:

```ts
const findTier = (category: StandCategory) =>
  STAND_PRICING.find((tier) => tier.name.toLowerCase() === category)

/** Looks the tier up by name, never by position: reordering STAND_PRICING would
 *  otherwise silently pair every category with another tier's price, and the
 *  count-based drift guard would still pass because it matches on name. */
export const getTierPrice = (category: StandCategory, stage: PriceStage): number => {
  const tier = findTier(category)
  if (!tier) {
    throw new Error(`No tariff tier named "${category}" in STAND_PRICING`)
  }
  return tier[stage]
}

export const TOTAL_STANDS = STAND_PRICING.reduce((sum, tier) => sum + tier.slots, 0) // 130

const usd = new Intl.NumberFormat("es-AR", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
})
export const formatPrice = (amount: number) => usd.format(amount) // "US$ 3.500"
```

`es-AR` + `maximumFractionDigits: 0` yields `US$ 3.500` — matches the repo's Rioplatense voice and avoids a `.00` tail.

**Never key this by array position.** An earlier revision of this spec used a `TIER_INDEX: Record<StandCategory, number>` map and indexed `STAND_PRICING` with it. That was a real latent bug, and it is worth understanding rather than just avoiding:

| Property | Index-based (`TIER_INDEX`) | Name-based (shipped) |
|----------|---------------------------|----------------------|
| Reordering `STAND_PRICING` | **Silently wrong.** `platino` would resolve to Oro's row and every stand would show another tier's price | Unaffected — the lookup is by name |
| Guard coverage | The §4.4 count guard matches on **name**, so it would still **pass** while every price was wrong | Same, and consistent — both guards read the same key |
| Failure mode | Silent. No error, no test, plausible-looking numbers | Throws with the offending tier name |

This is the worst class of bug in this project: silent, arithmetically plausible, and invisible to every check available (C10 — no tests). The only reason it was caught is that the lookup shape was reviewed. **When matching an array element to a key, match on the element's own identity, never on its position.**

The `throw` covers a tier present in `STAND_CATEGORIES` but absent from the tariff — the one case the dev-only name guard (§4.4) would otherwise surface only in development.

### 4.3 Geometry convention: percent, not pixels

All coordinates are **percent of the plan container** (`0`–`100`), on both axes.

**Rationale.** The plan container's size and aspect ratio are owned by the layout, not by the image. Percent coordinates therefore survive an image swap: replacing the 1300×1300 placeholder with the 2400×2400 final asset — or a differently-framed crop — requires rescaling a 4-entry band table, not rewriting 130 pixel offsets. Pixel coordinates would encode the placeholder's baked-in annotation column (the 300 px right strip and 126 px bottom bar) into the data model, so the data could never outlive the placeholder.

The container MUST be the exact bounds of the rendered image: `next/image` with `fill` + `object-contain` inside an `aspect-square` wrapper. If the container is ever wider than the image, hotspots drift. Never let that happen.

### 4.4 Band table and generator

Provisional layout: four horizontal bands, front (fewer, larger) to back (more, smaller). The per-row count is a function of the band, so a band with 19 columns yields smaller cells than a band with 5 — matching how real halls work.

```ts
interface Band {
  category: StandCategory
  rows: number
  perRow: number
  top: number
  height: number
}

const BANDS = [
  { category: "platino", rows: 2, perRow: 5,  top: 8,  height: 18 },
  { category: "oro",     rows: 2, perRow: 10, top: 28, height: 20 },
  { category: "plata",   rows: 4, perRow: 19, top: 50, height: 28 },
  { category: "bronce",  rows: 2, perRow: 12, top: 80, height: 16 },
] as const satisfies readonly Band[]
```

| Band | Tier | `rows × perRow` | Count | Required |
|------|------|-----------------|-------|----------|
| A | Platino | 2 × 5 | 10 | 10 |
| B | Oro | 2 × 10 | 20 | 20 |
| C | Plata | 4 × 19 | 76 | 76 |
| D | Bronce | 2 × 12 | 24 | 24 |
| | | | **130** | **130** |

**The table has no horizontal span, so the span is derived, not stored.** A 5-field table (`category`, `rows`, `perRow`, `top`, `height`) says nothing about where a band starts or ends left-to-right — yet §4.6 requires concrete `x` values. Adding `left`/`width` fields would fix the gap and break the symmetry that makes the two ratios work. Instead the span comes from two constants:

```ts
const BAND_INSET_RATIO = 0.6   // outer margin, as a fraction of one cell step
const CELL_FILL_RATIO = 0.8    // how much of that step the cell fills; the rest is the gap

const round2 = (value: number) => Math.round(value * 100) / 100

const bandGeometry = (band: Band, row: number, column: number): StandGeometry => {
  const inset = Math.round((100 / band.perRow) * BAND_INSET_RATIO)
  const span = 100 - inset * 2
  const w = Math.round((span / band.perRow) * CELL_FILL_RATIO)
  const h = round2(band.height / band.rows)
  return {
    x: round2(inset + (column * (span - w)) / (band.perRow - 1)),
    y: round2(band.top + row * h),
    w,
    h,
  }
}
```

| Step | Formula | Purpose |
|------|---------|---------|
| `inset` | `round((100 / perRow) * 0.6)` | Symmetric outer margin, one 0.6-cell step from each edge |
| `span` | `100 - inset * 2` | Usable width, centered |
| `w` | `round((span / perRow) * 0.8)` | The cell; the remaining 0.2 of each step is the gap between stands |
| `x` | `inset + column * (span - w) / (perRow - 1)` | Distributes `span - w` of slack across `perRow - 1` gaps — flush left, flush right, even gaps |
| `h`, `y` | `height / rows`, `top + row * h` | Rows fill the band's height exactly |

This **reproduces both §4.6 worked examples exactly** — verified by running the shipped formula:

| Band | `perRow` | `inset` | `span` | `w` | `x` (col 0) | `y` (row 0) | `h` | Last `x` (right edge) |
|------|----------|---------|--------|-----|-------------|-------------|-----|----------------------|
| A Platino | 5 | 12 | 76 | 12 | **12** | **8** | **9** | 76 (12 + 12 + 76 = 100) |
| C Plata | 19 | 3 | 94 | 4 | **3** | **50** | **7** | 93 (3 + 4 + 93 = 100) |

Both bands are symmetric and every cell stays inside 0–100. If you change either ratio, re-verify this table — it is the only place the two constants are pinned to concrete numbers.

`id` is `` `${band.category}-${String(n).padStart(2, "0")}` `` → `platino-01` … `bronce-24`. Readable in a URL and collision-free.

**Dev-only guards — two of them, both required.** The name guard is the one that actually protects against tariff drift (§4.1); the count guard protects the band table.

```ts
if (process.env.NODE_ENV === "development") {
  // Guard 1 — name level. Catches a rename or added/removed tier in STAND_PRICING.
  const tariffNames = STAND_PRICING.map((tier) => tier.name.toLowerCase()).sort()
  const categoryNames = [...STAND_CATEGORIES].sort()
  if (tariffNames.join("|") !== categoryNames.join("|")) {
    throw new Error(
      `Category names drifted from the tariff: STAND_CATEGORIES has [${categoryNames}], ` +
        `STAND_PRICING has [${tariffNames}]`,
    )
  }

  // Guard 2 — count level. Catches a band table that builds the wrong number of stands.
  const byCategory = STANDS.reduce<Record<string, number>>((acc, stand) => {
    acc[stand.category] = (acc[stand.category] ?? 0) + 1
    return acc
  }, {})
  for (const tier of STAND_PRICING) {
    const built = byCategory[tier.name.toLowerCase()] ?? 0
    if (built !== tier.slots) {
      throw new Error(`Band table drift: ${tier.name} builds ${built}, tariff says ${tier.slots}`)
    }
  }
}
```

> `tier.name.toLowerCase()`, **not** `Lowercase<string>(tier.name)`. `Lowercase` is a **type**, not a function; calling it is TS2693. An earlier revision of this spec contained that exact call.

| Guard | Catches | Misses |
|-------|---------|--------|
| 1 — name | A tier renamed, added, or removed in `STAND_PRICING` | Wrong `slots` for a tier |
| 2 — count | A band table building the wrong number of stands per tier | A renamed tier (it would also throw, but as a count error) |

Both are `NODE_ENV === "development"` only, so neither ships. In production, `getTierPrice`'s `throw` (§4.2) is the backstop.

### 4.5 Status assignment — all 130 available

**Every stand is `disponible`.** None is `reservado`, none is `vendido`.

Confirmed as shipped: the generator assigns `status: DEFAULT_STATUS` on every stand (`buildBandStands` in `floorplanData.ts`), and `DEFAULT_STATUS` is `"disponible"`. `STATUS_COUNTS` therefore reads `{ disponible: 130, reservado: 0, vendido: 0 }`.

| Category | Total | `disponible` | `reservado` | `vendido` |
|----------|-------|--------------|-------------|-----------|
| Platino | 10 | 10 | 0 | 0 |
| Oro | 20 | 20 | 0 | 0 |
| Plata | 76 | 76 | 0 | 0 |
| Bronce | 24 | 24 | 0 | 0 |
| **Total** | **130** | **130** | **0** | **0** |

This is a deliberate, accepted state. The two zero rows are **not** a defect and **not** a reason to remove anything:

| Must still exist | Where | Why |
|------------------|-------|-----|
| The three status values | `STAND_STATUSES` (§4.1) | Type system |
| `reservado` / `vendido` colors | `STATUS_COLOR` (§4.1.1) | Color map |
| `reservado` / `vendido` labels + notes | `STATUS_COPY` (§4.1.1) | Panel copy |
| Both in the legend, **always** | §6.4 | Legend is enum-driven, not count-driven |
| Both as filter options | §9.8 | Filters iterate the enum |

The states matter later, when inventory or booking arrives. Building them now means that feature is additive rather than a rewrite.

**Do not** seed fake `reservado` / `vendido` stands to make the states "demonstrable". Publishing stands as sold that are not sold is a commercial-accuracy bug. To exercise those code paths locally, change a stand's `status` by hand in a devtools breakpoint or a temporary local edit — never in committed data.

**Filtering consequence:** with 130/0/0, selecting `Reservados` or `Vendidos` returns an empty result set. The empty state (§9.8) must therefore be reachable and correct from day one — test it, and expect it to look intentional rather than broken.

**Stats block consequence:** `Reservados` and `Vendidos` render as `0`. Keep them visible. Hiding zero-value states would contradict the always-six legend (§6.4) on the same screen.

### 4.6 Worked examples

Two real entries the generator emits. Both were **verified against the shipped `bandGeometry`** by running the formula — the ratios in §4.4 reproduce these exact numbers.

```ts
// First cell of band A (Platino, 2 rows x 5 = 5 cells per row)
{
  id: "platino-01", label: "Stand Platino 01",
  category: "platino", status: "disponible",
  areaM2: 36,
  location: "Sector central frente al Main Stage",
  geometry: { x: 12.0, y: 8.0, w: 12.0, h: 9.0 },
}

// First cell of band C (Plata, 4 rows x 19 = 19 cells per row -> narrow cells)
{
  id: "plata-01", label: "Stand Plata 01",
  category: "plata", status: "disponible",
  areaM2: 9,
  location: "Aisles lateral - fondo de sala",
  geometry: { x: 3.0, y: 50.0, w: 4.0, h: 7.0 },
}
```

Band A cells are `12% × 9%`; band C cells are `4% × 7%`. At a 900 px container, band C cells are 36 × 63 px — **above the 24 px floor**. Band C is the tightest case and drives §12.2's hit-target check.

### 4.7 Location strings

`location` is free text per stand. Draft by band, all drawn from the `LOCATIONS` table in `floorplanCopy.ts`: band A → "Sector central frente al Main Stage"; band B → "Anillo central - pasillos de circulación"; band C → "Aisles laterales"; band D → "Fondo de sala - zona de respaldo".

---

## 5. Component architecture

Directory: `src/components/partners/floorplan/` (C4). **Shipped** in slices 1–2: 6 files, 425 lines total. Slices 3–4 add 3 more.

| File | Shipped | Projected (slices 3–4) | Responsibility |
|------|---------|------------------------|----------------|
| `floorplanData.ts` | **189** | 189 | Types, state enums, `Exact<>` guard, name-based price lookup, band table + `bandGeometry`, generator, lookups, two dev guards. §4. |
| `floorplanCopy.ts` | **85** | 85 | Every Spanish string, `CATEGORY_LABEL`, `CATEGORY_COLOR`, `STATUS_COLOR`, `STATUS_COPY`, `LOCATIONS`, the `aria-label` builder. §9. |
| `planCanvas.tsx` | **83** | 83 + ~60 (zoom) | Plan surface: `next/image`, hotspot layer, legend, metrics, draft notice. Zoom/pan lands in slice 4. |
| `floorplan.tsx` | **33** | 33 + ~110 (70/30) | Section root, `relative z-30`, heading block, glass card. 70/30 split lands in slice 4. |
| `planHotspot.tsx` | **35** | 35 + ~50 | One stand `<button>`, positioned by percent, hover/focus treatment. Selection state in slice 3. |
| `floorplan.md` | **89** | 89 | Companion doc: purpose, state shape, C12 chain, geometry derivation, tradeoffs. |
| `useFloorplan.ts` | — | ~165 | Slice 3. `useReducer`: `selectedId`, `hoveredId`, `categoryFilter`, `availabilityFilter`. `?stand=` sync, `useReducedMotion`. |
| `infoPanel.tsx` | — | ~200 | Slice 3. Initial + selected state, benefits, price strip, CTA. |
| `planTooltip.tsx` | — | ~105 | Slice 4. |
| `planFilters.tsx` | — | ~90 | Slice 4. |

**The projections were wrong, and the error was one-directional.** `floorplanData.ts` was projected at 310 — over its own 300 cap, which would have forced a helper extraction under C3. `planCanvas.tsx` was projected at 280 against an actual 83.

| Why the projections missed | Detail |
|---------------------------|--------|
| `planCanvas.tsx` was over-counted | The 280 estimate bundled **zoom/pan and the reset control**, which are slice 4 work and not yet written. The static surface — image, hotspot map, legend, metrics, draft notice — is 83 lines |
| `floorplanData.ts` was over-counted | The 310 figure assumed each concept needed its own interface, guard block, and lookup helper. Tightening `bandGeometry` into one function and folding the two dev guards into a single `NODE_ENV` block kept it at 189 |

**No file breached the 300-line cap**, so no helper extraction was needed — a non-obvious outcome, since the spec predicted it would be required. **Nothing should be refactored on the basis of the old projections; re-measure with `wc -l` before believing any number in this table.** Slices 3–4 projections are still estimates and are more likely to be low than high.

`planTooltip.tsx` and `planFilters.tsx` are added in slice 4 only. **Do not create them preemptively.**

**Companion doc.** Per the collocated-documentation rule, add `floorplan.md` next to the code documenting purpose, state shape, side effects, and tradeoffs. Code files carry no explanatory comments.

**`participateData.ts` is 349 lines and must not grow.** Import `STAND_PRICING` from it; change nothing in it. The 4 pre-existing lint warnings (§12.3) include one in that file — leave it alone unless the client asks.

---

## 6. Visual specification

### 6.1 Client palette — shipped default

These six hexes are what the client supplied and what ships. Do not substitute.

| Key | Client hex | Tailwind | Notes |
|-----|-----------|----------|-------|
| Platino | `#60A5FA` | blue-400 | Sits naturally on `#002c6b` |
| Oro | `#84CC16` | lime-400 | **Adjacent hue to Plata — see 6.2** |
| Plata | `#FACC15` | yellow-400 | **Adjacent hue to Oro — see 6.2** |
| Bronce | `#22D3EE` | cyan-400 | Adjacent hue to Platino |
| Reservado | `#475569` | slate-600 | Correctly recedes |
| Vendido | `#EF4444` | red-500 | Reads as unavailable |

```ts
export const CATEGORY_COLOR: Record<StandCategory, string> = {
  platino: "#60A5FA",
  oro: "#84CC16",
  plata: "#FACC15",
  bronce: "#22D3EE",
}

export const STATUS_COLOR: Record<StandStatus, string> = {
  disponible: "#22D3EE",
  reservado: "#475569",
  vendido: "#EF4444",
}
```

### 6.2 Known hue tension — documented, accepted, not acted on

The four tier colors sit in **two hue families**, not four: Oro `#84CC16` (hue ≈ 84°) and Plata `#FACC15` (hue ≈ 50°) are adjacent high-chroma yellow-greens; Platino `#60A5FA` (hue ≈ 214°) and Bronce `#22D3EE` (hue ≈ 189°) collapse into one cyan-blue family. At hotspot size the four tiers can read as two.

**This is accepted.** Two reasons:

1. **Silently overriding client-supplied brand colors is a business risk.** These are the client's values. Substituting them without sign-off is not an engineering call to make.
2. **The ambiguity is mitigated by redundant text encoding.** The tier is named in text in three independent places — the hover tooltip, the info panel, and the legend — so color is a secondary signal, never the sole carrier of meaning. A user who cannot distinguish lime from yellow still reads "Oro" or "Plata". This is also the better accessibility practice: never encode meaning in color alone.

**Requirement that follows:** because color carries less weight, the **text labels must be always present and never color-only**. Legend entries, tooltip, and panel all name the tier. Do not build a future state that shows a bare colored dot with no label.

**If visual sign-off later favors a change,** the metallic ramp below is a six-line edit to `CATEGORY_COLOR` and `STATUS_COLOR` with no component change. It is retained for that purpose only — it is **not** the recommendation.

| Key | Client (shipping) | Alternative (not shipping) | Shift |
|-----|-------------------|---------------------------|-------|
| Platino | `#60A5FA` | `#93C5FD` | blue-300, lighter |
| Oro | `#84CC16` | `#E8B341` | lime → muted gold (84° → 40°) |
| Plata | `#FACC15` | `#C7D2DE` | saturated yellow → cool silver |
| Bronce | `#22D3EE` | `#D08C5A` | cyan → copper (189° → 26°) |
| Reservado | `#475569` | `#64748B` | slate-500, one step lighter |
| Vendido | `#EF4444` | `#F87171` | red-400, softer against the blue |

The four tier names are literally metals, so a metal ramp would be semantically exact and would resolve the two-family collapse. Recorded for a future decision, not for this build.

### 6.3 Glassmorphism

Match the existing repo idiom exactly — verified in `assets.tsx:75`, `hero.tsx:186`, `policy.tsx:88`:

```
bg-black/40 backdrop-blur-sm border border-[#03f5ff]/30 rounded-xl
```

Variants: legend and metrics `bg-black/50 backdrop-blur-md`; info panel `bg-black/40 backdrop-blur-sm border border-[#03f5ff]/20 rounded-2xl`. Section background `bg-black/20` (matches `sponsors.tsx:47`). No heavy card shadows — depth comes from `border` + `backdrop-blur` + a `box-shadow` glow of `0 0 30px rgba(3, 245, 255, 0.5)` (the repo's existing glow value from `participateData.ts:46`).

### 6.4 Legend and metrics placement

Both are DOM overlays inside the plan container (`absolute`, `pointer-events-none` on the wrapper, `pointer-events-auto` on the legend so its filter swatches stay clickable).

| Overlay | Position | Content |
|---------|----------|---------|
| Legend | top-left, `top-4 left-4` | 6 entries: 4 tiers + Reservado + Vendido |
| Metrics | top-right, `top-4 right-4` | 3 metrics, horizontal |
| Draft notice | bottom-center, `bottom-4 left-1/2 -translate-x-1/2` | Data-provisional warning (§9.11) |

This is exactly why §3.1 requires ≥ 6% empty margin on all sides of the hall: the overlays must not cover stands.

**The legend always renders all six entries, unconditionally.** Not four, not six-when-in-use. Two entries having zero instances is an accepted, expected state (§4.5).

| Property | Value |
|----------|-------|
| Source of truth | `[...STAND_CATEGORIES, ...LEGEND_STATUSES]` — §4.1. **Not** `STAND_STATUSES` |
| Entries | **6** = 4 categories + `LEGEND_STATUSES` (2 non-default statuses) |
| Conditional hiding | **None. Do not add any.** A count-based filter on the legend is a bug |
| Ordering | Tiers first (Platino → Bronce), then statuses (Reservado, Vendido) |
| Zero-count entries | Render at full opacity with their normal color. No graying, no dimming, no `(0)` suffix |

**Why the legend needs its own derived array.** `disponible` is the default state of every stand, not a categorical distinction — it is what all 130 stands are. Listing it in the legend would imply stands can be "not disponible", which is a fourth state the model does not have. So the legend is four tiers plus the two states that *deviate* from the default:

```ts
const LEGEND_ENTRIES = [
  ...STAND_CATEGORIES.map((category) => ({ kind: "category" as const, value: category, ... })),
  ...LEGEND_STATUSES.map((status) => ({ kind: "status" as const, value: status, ... })),
]
```

> An earlier revision of this spec gave the source of truth as `[...STAND_CATEGORIES, ...STAND_STATUSES]` — 4 + 3 = **7 entries**, contradicting the "six entries" stated two paragraphs above it in the same section. `LEGEND_STATUSES` exists precisely so the count cannot be recomputed by hand and get wrong.

Rationale: the legend declares the **state vocabulary the user must be able to read**, not a census of current inventory. A legend that changes shape as data changes is a legend that cannot be trusted as a key — and here two of six entries would flicker out of existence on day one, then back when inventory arrives. Every legend entry must also carry a **text label**, not just a swatch, for the reason in §6.2.

**Metrics:** `+2000` Asistentes · `130` Stands · `3` Jornadas. "15 sponsors estratégicos" is **dropped** — no precedent in the repo, unconfirmed by the client.

### 6.5 State treatments

| State | Treatment | Duration |
|-------|-----------|----------|
| Rest | `opacity-70`, tier fill at 85%, 1 px `border-white/20` | — |
| Hover | `opacity-100`, `scale-110`, `box-shadow: 0 0 12px` in the tier color, `cursor-pointer` | 150 ms |
| Focus-visible | `outline-none ring-2 ring-[#03f5ff] ring-offset-2 ring-offset-[#002c6b]` | 100 ms |
| Selected | `opacity-100`, `scale-105`, 2 px `border-[#03f5ff]`, persistent cyan glow | 200 ms |
| Filtered out | `opacity-20 pointer-events-none` | 200 ms |

`cursor: pointer` on buttons is already global via `globals.css:25-27`; do not re-add it per element. All transitions go through `transition-[opacity,transform,box-shadow] duration-150`. Under reduced motion, durations collapse to 0 (§8.4).

---

## 7. Interaction and accessibility

### 7.1 Interactions

| Interaction | Behavior |
|-------------|----------|
| Hover (pointer devices only) | Subtle glow + opacity 70→100 + `scale-110` + hover tooltip |
| Click / tap | Toggle selection, update panel, animate with `AnimatePresence` (pattern already in `participate.tsx:199-201`) |
| Click again on the selected stand | Deselect, return to the initial panel state |
| Keyboard | `Tab` to move, `Enter`/`Space` to select, `Esc` to clear |
| Deep link | `?stand=platino-01` auto-selects and scrolls the panel into view |

`aria-pressed` reflects selection — it is a toggle button, not a tab.

### 7.2 ARIA

| Element | Attributes |
|---------|-----------|
| Plan container | `role="group"`, `aria-label="Mapa de stands"` |
| Each hotspot | `<button type="button">`, `aria-pressed`, `aria-label` (full Spanish description, §10) |
| Info panel | `role="region"`, `aria-live="polite"`, `aria-label="Detalle del stand"` |
| Legend | `<ul>` inside a labelled `<section>`; all 6 entries always present (§6.4); swatches are non-interactive unless filtering |
| Filters | Grouped in `role="group"` with `aria-label`; each is a real `<button>` with `aria-pressed` |
| Tooltip | Rendered but `aria-hidden="true"` — the `aria-label` already carries the same information, so the tooltip is a visual duplicate only |

The `aria-label` is the accessible name, and the tooltip is decorative. Do not put interactive content in the tooltip.

### 7.3 Focus management

- Focus is visible on every hotspot (`ring-2 ring-[#03f5ff]`), never suppressed.
- On selection, move focus to the info panel heading (`tabIndex={-1}`) so a keyboard or screen-reader user lands on the content that changed. Do **not** scroll-jump on plain click — only on deep-link entry.
- The 70/30 desktop layout puts the panel after the plan in DOM order, so `Tab` order matches visual order: plan → panel. On mobile the panel is visually below the plan, which keeps DOM and visual order aligned. Do not use `tabindex` > 0 anywhere.

### 7.4 Reduced motion — mandatory for this section

`ParticlesBackground.tsx` animates forever with no `prefers-reduced-motion` guard, no `aria-hidden`, no `pointer-events-none`, and never cancels its `requestAnimationFrame` — its cleanup only removes the resize listener. It is **out of scope** to fix (it affects every page). But this section must carry its own path.

Verified: `useReducedMotion` has **zero hits across `src/`** — no precedent, and no precedent means no inherited behavior. It **is** exported by `framer-motion@12.34.0` (verified at runtime), so the guard costs no new dependency:

```ts
import { useReducedMotion } from "framer-motion" // framer-motion, never "motion" (C5)
const reduced = useReducedMotion()
```

Fallback if that import ever breaks: `window.matchMedia("(prefers-reduced-motion: reduce)")` in an effect. Tailwind v4 also ships `motion-reduce:` and `motion-safe:` variants for the pure-CSS path — either is acceptable, not both.

| Behavior | Normal | Reduced |
|----------|--------|---------|
| Hover glow | 150 ms tween | instant |
| Selection transition | 200 ms slide/fade | instant, no transform |
| Tooltip | 150 ms fade | instant, no fade |
| Panel content swap | `AnimatePresence` fade | no `AnimatePresence`, direct render |
| Zoom/pan | animated | direct, no spring |

**Disable the idle pulse.** If any loop animation is added, it must be gated on `!reduced`. Hotspots must remain real `<button>`s in both modes.

**Shipped state: there is no idle animation, so there is nothing to gate yet.** `planHotspot.tsx` ships a static `box-shadow` glow and a `transition-[opacity,transform,box-shadow]` set. The animated `text-shadow` loop originally sketched here was deliberately deferred — a `framer-motion` `animate` loop on 130 simultaneous elements is 130 concurrent animation timelines on a mobile device, and there was no evidence the effect justified that cost before the real floor-plan image exists.

| Animation | When it lands | Gating rule when it does |
|------------|---------------|--------------------------|
| Static tier glow | **Shipped** | None — static by definition |
| Idle `text-shadow` pulse | Slice 4, optional | `animate={reduced ? undefined : {...}}`; never an ungated `whileHover`/`animate` loop |
| Hover / focus / selected | **Shipped** | CSS transitions; durations collapse to 0 under reduced motion (§8.4) |

If the idle pulse is ever added, re-verify the frame cost on a low-end Android device with all 130 hotspots mounted, not just one. That is the same reasoning that put it in slice 4: **a decorative effect on 130 elements needs measurement, not taste.**

---

## 8. Responsive behavior

### 8.1 Desktop (≥ 1024 px) — 70/30

```
grid grid-cols-1 lg:grid-cols-[70fr_30fr] gap-8
```

Left column (70%) = the plan. Right column (30%) = the info panel, `lg:sticky lg:top-24` so it stays in view while the plan is panned. Use `70fr 30fr`, not `grid-cols-7/3` — arbitrary fractions keep the gap from shifting the ratio.

### 8.2 Proportions

The plan is always `aspect-square` with `object-contain`. It never stretches. The container is the image's exact bounds so percent hotspots stay aligned (§4.3).

### 8.3 Mobile (< 1024 px)

| Requirement | Implementation |
|-------------|----------------|
| Plan full width | Single column; the grid collapses to one track |
| Detail panel below | Natural DOM order — no reordering needed |
| Touch zoom | Native pinch on the container. Add `touch-action: pan-y pinch-zoom` so vertical page scroll still works while pinching is allowed |
| Tooltips | **Disabled** below `lg`. The info panel is the substitute — this is the brief's explicit rule, and it also removes the hover-stuck state that touch devices exhibit |
| CTA always visible | `sticky bottom-4` within the panel column, `z-40` (above the plan's zoom layer) |
| Hotspot hit area | ≥ 44 px on coarse pointers. **Deferred to slice 4** — see below |

**`min-h-11 min-w-11` does not work here, and was removed rather than shipped.** Tailwind's `min-*` utilities compile to `min-width: 2.75rem; min-height: 2.75rem`, but §6.1/§6.2 already set the hotspot's `width` and `height` to **percentage** inline styles for geometry. CSS resolves `min-width` against the containing block, and a 44 px floor is reached by the 19-column Plata band long before the container is wide — so `min-w-11` silently overrides the percent width and the band no longer lines up with the image. On the tightest band (4% wide cells) the result is overlapping buttons, which breaks selection for the stands a client is most likely to click.

**Slice 4 resolves it with a hit target that does not fight the geometry**, in this order of preference:

1. An `::after` overlay that is `position: absolute`, `inset: -Npx`, and `w-full h-full` — extends the tappable box without touching the positioned element's own box. Preferred: geometry stays authoritative.
2. A `min-w`/`min-h` pair applied **only** under `@media (pointer: coarse)`, and only if the cell is already ≥ 44 px at the smallest supported container width.
3. If neither is viable, ship the visual box and accept the documented WCAG 2.5.8 (Target Size Minimum, AA) exception for a dense spatial map — but record the decision, do not silently ship a broken layout.

Do not reinstate `min-h-11 min-w-11` on the button itself. The 44 px target is required; the two-class solution for it is not.

### 8.4 Zoom / pan

Zoom via `framer-motion` `drag` plus the `scale` preset. **No new dependency.** Note `drag` is a **prop** on `<motion.div>`, not a named import — importing it from `framer-motion` fails.

- Desktop: `drag` with `dragConstraints` clamped to the container; wheel/pinch zoom in `[1, 2.5]`.
- Reset control, keyboard-reachable, top-right of the canvas.
- Under reduced motion, `drag` still works (it is direct manipulation, not animation) but all `transition`/`spring` props are dropped.
- Zoom must not break percent hotspot alignment: hotspots live **inside** the transformed element, so they scale with it. Never apply a CSS `transform` to the image alone.

---

## 9. Copy deck

All Spanish (neutral, mildly Rioplatense, matching the existing repo's "podés" / "Seleccioná" register). Every string below is final — do not invent alternatives. Lives in `floorplanCopy.ts`.

### 9.1 Section and headings

| Key | Copy |
|-----|------|
| Section eyebrow | `Mapa de stands` |
| Section title | `Explorá el plano del recinto` |
| Section subtitle | `130 espacios de exhibición listos para tu marca. Seleccioná cualquier stand para ver su ubicación, superficie y disponibilidad.` |

### 9.2 Initial panel state

| Key | Copy |
|-----|------|
| Title | `Seleccioná un stand` |
| Body | `Explorá el mapa interactivo para conocer la ubicación, características y disponibilidad de cada espacio.` |

### 9.3 Overall stats block

| Key | Copy |
|-----|------|
| Label | `Resumen del recinto` |
| Available | `Disponibles` |
| Reserved | `Reservados` |
| Sold | `Vendidos` |
| Total | `Total de stands` |

All four rows render **always**, including the two that currently read `0`. See §4.5 — a stats block that hides zero states contradicts the always-six legend (§6.4) on the same screen.

### 9.4 Selected stand

| Key | Copy |
|-----|------|
| Category label | `Categoría` |
| Location label | `Ubicación` |
| Surface label | `Superficie` |
| Status label | `Estado` |
| Benefits label | `Qué incluye` |
| Price label | `Precio del nivel` |
| Surface unit | `m²` |
| Status values | `Disponible` · `Reservado` · `Vendido` |
| Reserved note | `Este stand está reservado. Contactanos para evaluar espacios disponibles.` |
| Sold note | `Este stand fue vendido. Contactanos para recibir el catálogo de espacios disponibles.` |

The reserved/sold notes have **zero instances today** (all 130 stands are `disponible`, §4.5). They ship anyway, sourced from `STATUS_COPY` (§4.1.1). The panel must never special-case "always disponible" — it reads `STATUS_COPY[stand.status]` and renders whatever note is there, empty string included.

### 9.5 Benefits checklist

Shared by every tier (from the brief):

- `Inclusión en el sitio oficial del evento`
- `Presencia en el catálogo del evento`
- `Acceso para staff durante el montaje`
- `Conectividad WiFi`
- `Energía eléctrica`

### 9.6 Price strip

**Early Bird is the live stage.** `ACTIVE_STAGE = "earlyBird"` is confirmed, not provisional.

| Key | Copy |
|-----|------|
| Stage labels | `Early Bird` · `Preventa` · `Valor full` |
| Live stage | `Early Bird` — highlighted with the `Activo` marker |
| Active marker | `Activo` |
| From label | `Desde` |
| Footnote | `El precio corresponde al nivel completo, no a un stand individual.` |

All three stages still render, with Early Bird marked active, so the client can see the full tariff. The highlight is driven by one exported constant, so moving to Preventa later is a one-line change:

```ts
export const ACTIVE_STAGE: PriceStage = "earlyBird"
```

Active Early Bird prices, for verification against `STAND_PRICING`:

| Tier | Early Bird | Panel shows |
|------|-----------|-------------|
| Platino | 3500 | `Desde US$ 3.500` |
| Oro | 2000 | `Desde US$ 2.000` |
| Plata | 1100 | `Desde US$ 1.100` |
| Bronce | 600 | `Desde US$ 600` |

### 9.7 CTA

| Key | Copy |
|-----|------|
| Button | `Solicitar información` |
| Aria label | `Solicitar información sobre el stand Platino 01` |
| Anchor | `#contacto` — plain anchor, **no pre-fill** |

The anchor is verified precedent: `contact.tsx:54` declares `<section id="contacto">`, and `hero.tsx:139` already links to it with `href="#contacto"`. Follow that pattern exactly.

**Known future improvement, not an open question:** a richer CTA (pre-filled form, stand id passed through, per-stand inquiry) is desired later. Do not build it now. Keep the CTA a single anchor in a single place so it can be upgraded without touching the panel.

### 9.8 Filters

| Key | Copy |
|-----|------|
| Group label | `Filtros` |
| Category label | `Categoría` |
| Availability label | `Disponibilidad` |
| All (category) | `Todas` |
| All (availability) | `Todas` |
| Options (availability) | `Disponibles` · `Reservados` · `Vendidos` |
| Reset | `Limpiar filtros` |
| Empty state | `No hay stands que coincidan con los filtros aplicados.` |
| Result count | `{n} de 130 stands` |

Options iterate `STAND_CATEGORIES` and `STAND_STATUSES` (§4.1) — never a literal array in JSX (C12).

**All three availability options are always present**, matching the legend. With 130/0/0 (§4.5), selecting `Reservados` or `Vendidos` yields `No hay stands que coincidan con los filtros aplicados.` and a result count of `0 de 130 stands`. That empty state is the **expected** result, not a defect — do not add logic that hides zero-count options, and do not disable them.

### 9.9 Legend

| Key | Copy |
|-----|------|
| Legend title | `Leyenda` |
| Tier labels | `Platino` · `Oro` · `Plata` · `Bronce` |
| Status labels | `Reservado` · `Vendido` |

All six entries render **unconditionally** (§6.4). Two of them describe states with zero instances today; that is accepted.

**Tier labels come from `CATEGORY_LABEL`, never from a transform on the data value.** `StandCategory` is lowercase (`"platino"`) because it is a lookup key; the user-facing label is capitalized (`"Platino"`) because the tier names are proper nouns. A `titleCase()` call would produce both correctly today, so the bug is invisible until it isn't — a new tier with an internal abbreviation would be silently mangled. The shipped map in `floorplanCopy.ts` is the single source:

```ts
export const CATEGORY_LABEL: Record<StandCategory, string> = {
  platino: "Platino",
  oro: "Oro",
  plata: "Plata",
  bronce: "Bronce",
}
```

| Where the label is needed | Source |
|---------------------------|--------|
| Legend swatch text (§6.4) | `CATEGORY_LABEL[category]` |
| Info panel heading (slice 3) | `CATEGORY_LABEL[stand.category]` |
| Hotspot `aria-label` (§9.12) | `CATEGORY_LABEL[stand.category]` |

`Record<StandCategory, string>` rather than `Partial<Record<…>>`: a new tier added to `STAND_CATEGORIES` without a label is a **compile error**, which is the point. Status labels come from `STATUS_COPY[status].label` by the same mechanism (§4.1.1) — there is no third source.

### 9.10 Metrics

| Key | Copy |
|-----|------|
| Asistentes | `+2000` / `Asistentes` |
| Stands | `130` / `Stands` |
| Jornadas | `3` / `Jornadas` |

### 9.11 Draft-data warning

| Key | Copy |
|-----|------|
| Notice | `Datos de referencia en revisión. La asignación y la disponibilidad de cada stand se confirman con el equipo comercial.` |

Gated on `PLACEHOLDER_MODE` (§3.3) — it exists because the plan image and the coordinates are provisional. It disappears in the same change that calibrates the real image, which makes it a useful signal that calibration actually happened.

### 9.12 Accessibility labels

| Key | Copy |
|-----|------|
| Plan group | `Mapa de stands` |
| Panel region | `Detalle del stand` |
| Hotspot template | `Stand {label}, categoría {category}, {areaM2} m², {status}` |
| Zoom in | `Acercar el mapa` |
| Zoom out | `Alejar el mapa` |
| Zoom reset | `Restablecer la vista del mapa` |
| Close selection | `Cerrar detalle del stand` |

Interpolate with `aria-label`, never with JSX children.

### 9.13 Copy alignment outside the section

| File:line | Current | New |
|-----------|---------|-----|
| `hero.tsx:22-27` | `HERO_STATS` — `+5.000` Asistentes, `+130` Stands, `+50` Expertos, `3` Jornadas | **Remove the block entirely.** The duplicated stats move into the floor plan section; keeping both shows two different figures on one page. |
| `sponsors.tsx:19` | `Más de 5.000 asistentes y 50 expertos se reúnen durante 3 jornadas en un mismo lugar: tu marca frente a una audiencia que no podés ignorar.` | `Más de 2.000 asistentes y 50 expertos se reúnen durante 3 jornadas en un mismo lugar: tu marca frente a una audiencia que no podés ignorar.` |
| `page.tsx:15` | `...y más de 130 stands disponibles para empresas y sponsors.` | `...y 2.000 asistentes y 130 stands disponibles para empresas y sponsors.` ("más de" implies scarcity beyond a fixed 130) |

**Confirmed figures.** `+2000` asistentes replaces `+5.000` **everywhere on the page**, including the `sponsors.tsx:19` prose. `+50` expertos is **retained as-is** — it is unaffected by the attendee change and stays in the `sponsors.tsx:19` sentence.

Only these three edits. Do not touch other copy across the page.

**Lint consequence — required, not optional.** All four icons imported at `hero.tsx:4` (`Users`, `Building2`, `Presentation`, `Calendar`) are used **only** inside `HERO_STATS` at lines 23–26 (verified). Removing the block orphans all four, and `npm run lint` will report **4 new `@typescript-eslint/no-unused-vars` warnings**, moving the baseline from 6 problems to 10. Prune the import line in the same commit:

```ts
// hero.tsx:4 — after removing HERO_STATS
import { motion } from "framer-motion"
import Image from "next/image"
```

Leaving the import behind does not fail the build, but it breaks the §12.3 baseline, which is the only regression signal this project has (C10, no tests).

---

## 10. Implementation slices

| Slice | Status | Measured | Projection |
|-------|--------|----------|------------|
| 1 — Data, state, copy | **SHIPPED** (with slice 2) | 274 | ~430 |
| 2 — Static plan surface | **SHIPPED** (with slice 1) | 151 + 5 (`page.tsx`) | ~400 |
| 3 — Selection and info panel | Pending | — | ~365 |
| 4 — Integration, zoom, filters, deep link | Pending | — | ~360 |

### Slices 1 and 2 shipped as one change — deliberate deviation

The original plan was four chained PRs, each under the ~400-line review ceiling. **Slices 1 and 2 shipped together in a single pass of ~430 lines, exceeding that ceiling by explicit request** so the client could see the section rendered end to end rather than reviewing invisible data modules on trust.

| Consequence | Handling |
|-------------|----------|
| Review covered 2 slices at once | The 10 defects in §13 were found by reading the diff against the spec, and **all 10 were spec defects, not code defects.** The code shipped clean; the document was wrong |
| Planned revert independence lost | Single `git revert`. Acceptable because nothing else in the app depends on the section yet |
| Slices 3 and 4 remain separate | Unchanged. They are still the natural PR boundaries |

Slices 1–2 measured: `floorplanData.ts` 189 + `floorplanCopy.ts` 85 = **274** (projection: 430, −39%). `planCanvas.tsx` 83 + `planHotspot.tsx` 35 + `floorplan.tsx` 33 = **151**, plus a 5-line `page.tsx` mount. Total 430 — consistent with "over the ceiling" and well under the projected ~830 for the pair.

### Slice 1 — Data, state system, and copy foundation — **SHIPPED**

| Item | Detail |
|------|--------|
| Files | `floorplanData.ts` (**189**, not 310), `floorplanCopy.ts` (**85**, not 120) |
| Finish | Both files exist, export typed data, and are imported by the section. Includes `STAND_CATEGORIES`, `STAND_STATUSES`, `DEFAULT_STATUS`, `LEGEND_STATUSES`, the `Exact<>` guard, the **name**-based dev guard, `CATEGORY_LABEL`, `STATUS_COLOR`, `STATUS_COPY`, `PLACEHOLDER_MODE`, and all 130 stands `disponible` |
| Verify | `npx tsc --noEmit` → exit 0. `STANDS.length === 130`, all `disponible`; both dev guards silent |
| Risk | None at ship time — no UI depended on it until slice 2 landed alongside |
| Note | The name-level guard in §4.4 was **added during implementation**, after the count-only guard proved insufficient (§4.1). It is the reason `floorplanData.ts` is 189 and not the ~175 originally measured |

### Slice 2 — Static plan surface — **SHIPPED**

| Item | Detail |
|------|--------|
| Files | `planCanvas.tsx` (**83**, not 280), `planHotspot.tsx` (**35**, not 90), `floorplan.tsx` minimal (**33**, not 30), `page.tsx` (**+5**, not +3), `floorplan.md` (89, doc) |
| Finish | Plan renders full width: placeholder image, all 130 hotspots as buttons, legend (**6** entries), metrics (3). Clicking a hotspot does nothing yet — `aria-pressed={false}` and inert |
| Verify | `npx tsc --noEmit` → exit 0. `npm run build` → succeeded. `npm run lint` → 6 problems (2E/4W), zero delta. Eyeball: **hotspots do NOT align to the placeholder and that is correct** (§3.3); 130 hotspots present; legend shows all 6 entries including the two zero-instance statuses; metrics in the top-right; draft notice visible at the bottom |
| Rollback | `git revert` removes the section and the `page.tsx` wiring together |
| Note | The 70/30 split lands in slice 4, when a panel exists to sit in the second column. `planCanvas.tsx` is 83 rather than 280 because zoom/pan and the reset control were never part of this slice |

### Slice 3 — Selection and info panel (~365 lines)

| Item | Detail |
|------|--------|
| Files | `useFloorplan.ts` (165), `infoPanel.tsx` (200) |
| Start | Slice 2 merged |
| Finish | Click a hotspot → panel shows name, category, location, m², status, benefits, derived price, CTA. Initial state renders. Status label and note come from `STATUS_COPY[stand.status]`, never a conditional |
| Verify | `npx tsc --noEmit`, `npm run build`. Eyeball: price matches tier × Early Bird (Platino = `US$ 3.500`); CTA anchors to `#contacto`; stats block shows 130 / 130 / 0 / 0. **Force a `reservado` and a `vendido` locally** (hand-edit, do not commit) to confirm the notes and colors work |
| Rollback | `git revert`. The plan stays static and visible |
| Risk | Medium. The `useReducer` shape lands here and slice 4 extends it — extend, do not redesign |

### Slice 4 — Integration, zoom, filters, deep link, copy alignment (~360 lines)

| Item | Detail |
|------|--------|
| Files | `floorplan.tsx` (+110), `planTooltip.tsx` (105), `planFilters.tsx` (90), `hero.tsx` / `sponsors.tsx` / `page.tsx` copy diffs (~55) |
| Start | Slice 3 merged |
| Finish | 70/30 desktop split, mobile stack, zoom/pan, desktop-only tooltip, both filters, `?stand=` deep link, reduced-motion path, all §9.13 copy alignment |
| Verify | Full §12 checklist. Confirm `npm run lint` still reports exactly **2 errors, 4 warnings** — the `hero.tsx:4` icon import must be pruned in this same commit (§9.13) |
| Rollback | `git revert`. Two independent reverts are safe: one for the section, one for the copy edits. They are separate concerns in one PR — split the commit if review prefers |
| Note | The copy edits are the only change visible to someone who never opens the floor plan. Say so in the PR description |

### Not a slice — recalibration when the real image lands

A fifth, separate change (§3.2 steps 1–5). Deliberately **not** bundled into slice 4: it cannot be written until the asset exists, and bundling a placeholder fix would block the section. Flips `PLACEHOLDER_MODE` to `false`, removes the draft notice, and removes the production guard.

---

## 11. Deep link

`/partners?stand=platino-01` auto-selects the stand and scrolls the panel into view.

```ts
const searchParams = useSearchParams()
const router = useRouter()
```

**Gotcha — Suspense is mandatory.** `/partners` has no dynamic APIs, so it is statically rendered. `next build` **fails** with *"useSearchParams() should be wrapped in a suspense boundary"* unless the component using it sits inside `<Suspense>`. There is no `Suspense` precedent anywhere in `src/`, so this is easy to miss. Wrap the interactive part of `floorplan.tsx` in `<Suspense fallback={null}>`.

**Gotcha — avoid a render loop.** Read the param once in an effect keyed on the param value, and only `router.replace` when the value actually changes. Writing on every render re-triggers the search-params subscription and can loop. Always pass `{ scroll: false }`.

`useRouter` from `next/navigation` has precedent in the repo (`header/hero/hero.tsx:23`); `useSearchParams` does not.

---

## 12. Verification plan

There is no test runner (C10). Verification is `tsc` + `next build` + a manual checklist. Run both commands per slice that changes types or adds files.

### 12.1 Commands and recorded results

| Command | Result | Recorded |
|---------|--------|----------|
| `npx tsc --noEmit` | **exit 0**, no output | After slices 1–2 |
| `npm run build` | **succeeded** | After slices 1–2. Confirms the §3.3 production guard does not break prerender, and that no `useSearchParams` was used ahead of slice 4 |
| `npm run lint` | **6 problems (2 errors, 4 warnings)** | After slices 1–2. **Zero delta** from the pre-existing baseline; the three offending files are all outside `src/components/partners/floorplan/` |

```bash
npx tsc --noEmit
npm run build
npm run lint
```

**No floorplan file appears in the lint output.** The 2 errors are `no-explicit-any` in `introductionDescription.tsx`; the 4 warnings are two more `<img>` hits in that same file, the unused `Tag` in `participateData.ts`, and one `<img>` in `activityCard.tsx` — see §12.3 for the full table. The build succeeding is the load-bearing result: it is what proves the `typeof window` guard in §3.3 is correctly scoped, since an unguarded production throw would have failed prerender.

### 12.2 Manual checklist

| # | Check | Pass condition |
|---|-------|----------------|
| 1 | `npm run build` | Succeeds. A Suspense error means §11 was skipped |
| 2 | Hotspot count | Exactly **130** hotspots, matching the 130 drawn stands. Do **not** expect them to align to the placeholder image — misalignment is correct right now (§3.3) |
| 3 | Hit target | DevTools: the narrowest band-C hotspot is ≥ 24 × 24 CSS px on desktop and ≥ 44 px on touch. At a 900 px container, `4% × 7%` = 36 × 63 px |
| 4 | Status states | All 130 stands read `disponible` (§4.5). Hand-edit two stands to `reservado` and `vendido` locally — **do not commit** — and confirm the panel note, color, and label all change |
| 5 | Price integrity | The price shown equals `STAND_PRICING[tier]["earlyBird"]` (§9.6). Spot-check Platino = `US$ 3.500`, Bronce = `US$ 600` |
| 6 | Sum | The stats block reads 130 total, available 130, reserved 0, sold 0. All four rows visible (§9.3) |
| 7 | Keyboard | `Tab` through hotspots; focus ring visible at every stop. `Enter` selects. `Esc` clears. Focus lands on the panel heading after selection |
| 8 | Reduced motion | DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`. Hover/select/tooltip become instant; no looping animation runs |
| 9 | Tooltip | Shown on desktop hover, **never** on mobile (`< 1024 px`) |
| 10 | Mobile zoom | On a real device, pinch-zoom the plan; vertical page scroll still works (`touch-action`) |
| 11 | CTA reachability | On mobile the CTA is visible without scrolling the whole page (`sticky bottom-4`) |
| 12 | Deep link | Load `/partners?stand=plata-42` cold — stand selected, panel populated. Load an invalid id — initial state, no crash |
| 13 | Hit-test | Click a hotspot. If nothing happens, check C2: the section root needs `relative z-30` |
| 14 | Copy | Diff every §9 string against the rendered page. Zero invented text |
| 15 | File sizes | Every file under 300 lines. `participateData.ts` still 349 and unmodified |
| 16 | Legend is unconditional | All 6 entries render, including `Reservado` and `Vendido` at zero instances. Grep the components for a conditional on stand count — there must be none (§6.4) |
| 17 | Zero-instance filters | Filter by `Reservados` → empty state shows and reads as intentional, not broken (§9.8) |
| 18 | C12 audit | `grep -rn "reservado\|vendido" src/components/partners/floorplan/` returns hits **only** in `floorplanData.ts` and `floorplanCopy.ts`. A hit in any `.tsx` is a violation (§4.1.1) |
| 19 | Placeholder guard | `PLACEHOLDER_MODE` is `true` in dev. **Code review, not a runtime check:** confirm the guard in §3.3 still carries its `typeof window !== "undefined"` condition. It is browser-scoped, so `npm run build` **succeeds** with `PLACEHOLDER_MODE = true` — the build passing is no longer evidence that the placeholder is safe. Someone must open a production build and load `/partners` |
| 20 | `PLACEHOLDER_MODE` is **not** `false` yet | If someone flipped it, the section is claiming calibrated coordinates it does not have |

### 12.3 Pre-existing lint noise — ignore these

`npm run lint` currently reports **6 problems (2 errors, 4 warnings)**. All pre-date this work:

| File | Line | Severity | Rule |
|------|------|----------|------|
| `src/components/introduction/description/introductionDescription.tsx` | 47:55 | error | `@typescript-eslint/no-explicit-any` |
| `src/components/introduction/description/introductionDescription.tsx` | 67:76 | error | `@typescript-eslint/no-explicit-any` |
| `src/components/introduction/description/introductionDescription.tsx` | 46:11 | warning | `@next/next/no-img-element` |
| `src/components/introduction/description/introductionDescription.tsx` | 66:11 | warning | `@next/next/no-img-element` |
| `src/components/partners/participate/participateData.ts` | 4:25 | warning | `@typescript-eslint/no-unused-vars` (unused `Tag`) |
| `src/components/students/activities/card/activityCard.tsx` | 78:11 | warning | `@next/next/no-img-element` |

**Baseline is `2 errors, 4 warnings`.** Any *other* count means this work introduced a regression. The `participateData.ts:4` warning is in the partners domain but in a file this work does not modify — leave it.

---

## 13. Resolved questions

**All nine questions are closed. No blocking question remains.** Kept as a record so the rationale behind each decision survives; the decisions themselves are in §14.

| # | Question | Answer | Where it lands |
|---|----------|--------|----------------|
| Q1 | Client palette or the metallic ramp? | **Client hexes.** Overriding client brand colors without sign-off is a business risk; the hue collapse is mitigated by text naming the tier in tooltip, panel, and legend | §6.1, §6.2 |
| Q2 | Which price stage is live? | **Early Bird.** `ACTIVE_STAGE = "earlyBird"`, confirmed not provisional | §9.6 |
| Q3 | Bronce surface in m²? | **`4 m²`, explicitly provisional** — the client supplied an example value pending the real figure | §2.2, §4.1 |
| Q4 | Which stands are `vendido` / `reservado`? | **None. All 130 are `disponible`.** The states must still exist in the type system, colors, legend, panel, and filters; zero instances is accepted | §4.5, §6.4 |
| Q5 | Does `+2000 asistentes` replace `+5.000` everywhere? | **Yes, everywhere**, including `sponsors.tsx:19` | §9.13 |
| Q6 | Is `+50 expertos` still accurate? | **Yes, retained as-is.** Unaffected by the attendee change | §9.13 |
| Q7 | Should `?stand=` deep links be gated? | **No gate.** Publicly shareable | §11 |
| Q8 | CTA pre-fill or plain anchor? | **Plain anchor to `#contacto`**, no pre-fill. A richer CTA is a known future improvement, not an open question | §9.7 |
| Q9 | Confirm the 130 stand count. | **Confirmed at 130.** Matches `STAND_PRICING` slots (10/20/76/24) | §2.2, C7 |

Two follow-ups are **known and accepted, not open questions**:

| Item | Status |
|------|--------|
| The real floor plan image | Committed by the client, supplied later. Non-blocking; interim strategy in §3.3 |
| A richer per-stand CTA | Desired later. Do not build now; keep the CTA in one place so it can be upgraded |

One item is **provisional by client instruction** and must be revisited when real data arrives: the Bronce `4 m²` surface (§2.2, tracked in `PROVISIONAL_AREA_M2`).

### 13.1 Defects found in this spec during implementation (slices 1–2)

Ten defects were found by reading the shipped diff against this document. **All ten were errors in the spec. None was a code defect** — the implementation compiled clean and behaved correctly; the document described a program that did not exist. All ten are now corrected above, in place.

| # | Section | Defect | Correction |
|---|---------|--------|------------|
| 1 | §3.3 | Production guard had no `typeof window` check, so `next build` prerender threw and **every build failed** | Added `&& typeof window !== "undefined"`, with the tradeoff documented: it is a runtime brake, not a build gate |
| 2 | §4.1 | `Lowercase<PricingTier["name"]>` does not compile — `STAND_PRICING` is not `as const`, so it widens to `string` and `Exact<>` evaluates to `never` (TS2322) | Hand-written `TariffTierName` mirror; the spec now explains why derivation is impossible under C3 |
| 3 | §4.1 | The `Exact<>` guard was presented as drift protection against the tariff | Documented its real scope: two hand-written lists only. A tariff rename leaves it green; §4.4's name guard is the real protection |
| 4 | §4.2 | Index-based `TIER_INDEX` lookup: reordering `STAND_PRICING` would **silently** return the wrong price per tier, with every available check still passing | Name-based `.find()` with a `throw`; the reorder failure mode is documented as a table |
| 5 | §4.4 | `Lowercase<string>(tier.name)` — `Lowercase` is a type, not a function (TS2693) | `tier.name.toLowerCase()` |
| 6 | §4.4 | Dev guard checked counts only, so a renamed tier surfaced as a confusing count error | Added the name-level guard; §4.4 now documents both guards and what each misses |
| 7 | §4.6 | Geometry was asserted but no formula existed — a reader could not reproduce the numbers | `BAND_INSET_RATIO` / `CELL_FILL_RATIO` and `bandGeometry` documented, with both worked examples **verified by running the shipped formula** |
| 8 | §5 | Line projections were wrong: `floorplanData.ts` 310 → **189**, `planCanvas.tsx` 280 → **83** | Measured table. No file breached 300, so no helper extraction was needed. The `planCanvas` overestimate bundled slice-4 zoom/pan |
| 9 | §6.4 | Source of truth given as `[...STAND_CATEGORIES, ...STAND_STATUSES]` = **7 entries**, contradicting the "six entries" stated two paragraphs earlier | `[...STAND_CATEGORIES, ...LEGEND_STATUSES]` = 6; the need for a derived array is now explained |
| 10 | §8.3 | `min-h-11 min-w-11` for the 44 px hit target: `min-width` overrides the percent geometry on the 19-column Plata band, breaking alignment and overlapping buttons | Deferred to slice 4 with three ordered options, the `::after` overlay preferred. WCAG 2.5.8 note added |

**Two of these were load-bearing: #1 broke the build and #4 was a silent data-corruption bug.** The other eight would have surfaced as confusing errors or wrong documentation. The common thread is that every one of them is a defect a *type checker* should have caught and did not — either because the snippet was never compiled (§4.4's `Lowercase<string>`, §4.1's derived union) or because it compiled and was still wrong (§4.2's index lookup). **This project has no test runner (C10), so the spec's own code blocks are part of the test surface. Anything in a code block here must be copy-pasteable and must compile.**

---

## 14. Decisions already locked

Do not re-litigate these. They are settled and confirmed by the client.

1. **130 stands**, split 10 Platino / 20 Oro / 76 Plata / 24 Bronce per `STAND_PRICING`. Count confirmed.
2. **The current PNG is an accepted development placeholder**, not a blocker. The client will supply the real image later. Only the final coordinate pass (§3.2) needs it. Guarded by `PLACEHOLDER_MODE` (§3.3).
3. **Price derives from the tier, never per stand.** Early Bird is the live stage (`ACTIVE_STAGE = "earlyBird"`); all three stages render with Early Bird marked active.
4. **Data is agent-generated and marked as draft** for client review, gated on `PLACEHOLDER_MODE`.
5. **All 130 stands are `disponible`.** `reservado` and `vendido` exist in the type system, color map, copy map, legend, panel, and filters with zero instances. Accepted; not a defect (§4.5).
6. **Section metrics: `+2000` asistentes, `130` stands, `3` jornadas.** "15 sponsors estratégicos" is dropped. `+2000` replaces `+5.000` page-wide; `+50` expertos is retained.
7. **The duplicated stats block in `hero.tsx` is removed** (with its now-orphaned icon import, §9.13); `sponsors.tsx:19` and `page.tsx:15` are aligned.
8. **No `/exposicion` route.** Deep-linking uses `?stand=` on `/partners`, publicly shareable.
9. **Zoom/pan via `framer-motion` `drag` + `scale`. No new dependency.**
10. **Client hexes ship as the palette.** No silent substitution. Text labels carry the tier name so color is never the sole signal.
11. **The legend always renders all six states, unconditionally.** No count-based hiding, ever (§6.4).
12. **The stand state system is swappable (C12).** Status is a data field; colors, labels, legend, and filters all read one enum. No component branches on a stand id or a hardcoded status literal.
13. **CTA anchors to `#contacto` with no pre-fill.** A richer CTA is a known future improvement.

### 14.1 Locked during implementation (slices 1–2)

These were decided while writing the code and are settled. They are not in the client-approved list above, but re-deciding any of them would churn shipped code.

| # | Decision | Why |
|---|----------|-----|
| 14 | **Price lookup matches tier by name, never by array position** (§4.2) | Index lookup is silent-wrong on reorder and no available check catches it |
| 15 | **A dev-only name guard exists in addition to the `Exact<>` type guard** (§4.4) | The type guard compares two hand-written lists and cannot see the tariff |
| 16 | **The production placeholder guard is browser-scoped, not build-scoped** (§3.3) | A guard that fails `next build` gets deleted under deadline pressure; this one is noticed on first page load |
| 17 | **Band horizontal span is derived from `BAND_INSET_RATIO` and `CELL_FILL_RATIO`, not stored per band** (§4.4) | Keeps the band table at 5 fields and makes spacing proportional; verified against both §4.6 examples |
| 18 | **`CATEGORY_LABEL` is a `Record<StandCategory, string>` map, not a `titleCase()` call** (§9.9) | Adding a tier without a label becomes a compile error instead of a runtime surprise |
| 19 | **No idle `text-shadow` animation ships**; glow is static (§7.4) | 130 concurrent animation timelines is unmeasured cost for a decorative effect. Revisit in slice 4 with real hardware |
| 20 | **The 44 px hit target is deferred, not faked with `min-*` classes** (§8.3) | `min-width` overrides the percent geometry and breaks the tight bands; a real solution is required |
| 21 | **Slices 1–2 shipped as one ~430-line change**, over the 400-line review ceiling, **by explicit request** (§10) | The client wanted to see the rendered section rather than review invisible data modules. Slices 3–4 remain separate PRs |

---

## 15. Scope and non-goals

### In scope

The interactive floor plan section inside `/partners`: data model, plan surface, hotspots, legend, metrics, info panel, filters, tooltip, deep link, reduced-motion path, and the three copy alignments in §9.13.

### Explicitly out of scope

| Non-goal | Why |
|----------|-----|
| A `/exposicion` route | Considered and rejected — duplicates a public page |
| Fixing `ParticlesBackground` | Affects every page; needs its own change |
| Fixing the 2 pre-existing lint errors | Unrelated files, out of scope |
| Adding a test runner | No CI, no runner, out of scope |
| Per-stand pricing | Contradicts the per-tier commercial model |
| Editing `participateData.ts` | Already over the line cap; only imported from |
| Stand reservation / checkout | This is a marketing page, not a booking system |
| Real backend stand inventory | All 130 are hardcoded `disponible` in a committed module. The state system is built to be swapped later (C12) |
| Mobile tooltips | Replaced by the info panel by design (§8.3) |
| Calibrating against the real image | Not possible yet — the asset does not exist. Interim strategy in §3.3, recalibration in §3.2 |
| Snapping hotspots to the placeholder's drawn rectangles | Would break the 130-stand total and C7 (§3.3) |
| A pre-filled or per-stand CTA | Confirmed as a plain `#contacto` anchor. Richer CTA is a later improvement (§9.7) |
| Hiding zero-instance states | Legend, stats, and filters all render them regardless (§6.4, §9.3, §9.8) |

---

## 16. Risk register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **The placeholder image ships to production by mistake** | Medium | High — public page showing uncalibrated hotspots over a 48.8%-white PNG | `PLACEHOLDER_MODE` flag with a `process.env.NODE_ENV === "production"` throw (§3.3). Gate the draft notice on the same flag so it and the calibration state cannot diverge. Checklists #19, #20 |
| **Interim hotspot distribution mistaken for final** | High | Wasted engineering time | §3.3 states explicitly that misalignment is expected and why. Checklist #2 is written to assert the count, **not** alignment. Slices 2 and 4 say so in their own verify rows |
| **A component hardcodes a status or stand id** | Medium | Breaks the future inventory feature (C12) | Single source of truth per concern (§4.1.1). Checklist #18 is a literal `grep` that fails the review. No status string literal may appear in any `.tsx` |
| **Zero-instance states get "cleaned up"** | Medium | Removes work the client explicitly asked for | Legend is enum-driven and unconditional (§6.4); stats and filters render all rows (§9.3, §9.8). Checklists #16, #17. Recorded in §14 items 5 and 11 |
| **Clicks die silently** — section root missing `relative z-30` | Medium | Total | C2. Verified against all 7 existing section roots. Checklist #13 catches it in one click |
| **`next build` fails on the `useSearchParams` Suspense boundary** | High | Slice 4 blocked | §11. Wrap in `<Suspense fallback={null}>`. No precedent in the repo, so it will not be caught by mimicking existing code |
| **Coordinates don't survive the real image** | Certain | Visual | Expected and planned for, not a failure. Percent convention (§4.3) makes recalibration a 4-row band-table edit (§3.2) |
| **Stands touch in the real image** | Medium | Ambiguous hit-testing | §3.1 mandates ≥ 8 px gaps at 2400 px. Re-run the §17 measurements on delivery **before** wiring coordinates |
| **Hit targets under 24 px** on the narrowest band | Medium | WCAG 2.2 AA fail | §4.6 math: 36 × 63 px at a 900 px container. Add `min-h-11 min-w-11` on touch. Checklist #3 |
| **`participateData.ts` grows past 349** | Low | Convention break | All new data in `floorplanData.ts`; import `STAND_PRICING` read-only |
| **130-stand total drifts from the tariff** | Low | Contradictory arithmetic on a public page | Category union derived from `STAND_PRICING`; `Exact<>` compile-time guard (§4.1); dev-only drift guard (§4.4); checklist #6 |
| **Two different attendee figures on one page** | Medium | Credibility | §9.13 removes `hero.tsx` stats and aligns `sponsors.tsx:19` to `+2000` |
| **Removing `HERO_STATS` breaks the lint baseline** | **Certain if unhandled** | False regression signal | All 4 icons at `hero.tsx:4` are used only inside `HERO_STATS`; prune the import in the same commit (§9.13). Baseline is 6 problems, the only regression signal this project has |
| **The two lime/yellow tiers are hard to tell apart** | Medium | Low — mitigated | Accepted (§6.2). Mitigated by redundant text encoding in tooltip, panel, and legend. Text labels must never be color-only |
| **`useReducedMotion` unused anywhere in the repo** | Low | No inherited pattern to copy | Verified exported by `framer-motion@12.34.0`. `matchMedia` fallback documented in §7.4 |
| **A file creeps past 300 lines** | Medium | Convention break | File split in §5 with per-file line targets; checklist #15 |
| **No test coverage** | Certain | Regression risk | Accepted — C10. Mitigation is the 20-item manual checklist and the 4 revertable slices |
| **Section adds a 6th particle canvas** to the page | Medium | Render cost | Reuse an existing `<ParticlesBackground>` wrapper; do not add a new one |

---

## 17. Appendix — measurement method

The image findings in §2.3 were produced by decoding `distribucion_stanes.png` directly (IHDR + IDAT inflate + PNG defilter) and analyzing the pixel buffer, not by eyeballing. Thresholds used, so results are reproducible:

| Measurement | Method |
|--------------|--------|
| White / transparent share | Per-pixel classification; white = `r,g,b > 245`; transparent = `alpha < 128` |
| Hall bounding box | Bounding box of all non-white, non-transparent pixels, restricted to `x < 1000` to exclude the annotation column |
| Annotation strip width | Column of pixels at `x ≥ 1000`; the hall's right edge lands at `x = 999` |
| Notes bar height | Row-density scan; the isolated band `y ∈ [1121, 1247]` below the hall |
| Stand rectangles | 4-connected component labeling of non-white pixels inside the hall, keeping components with `area > 300 px` |
| Touching stands | Counted same-row component pairs with a horizontal gap `≤ 1 px` |

Re-run the same thresholds when the real image arrives, to confirm the gap and size requirements in §3.1 **before** recalibrating coordinates (§3.2 step 1).

Both stand-count figures are retained deliberately: ~50 is the component count at the `>300 px` area threshold, and 21–31 is the count at a coarser macro-cell pass. They differ because the image contains stands at more than one level of detail. Both are far below 130, which is the only property that matters for the interim strategy (§3.3).
