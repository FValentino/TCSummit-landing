# Partners Floor Plan

Interactive exhibition map for `/partners`. The hall is an explicit **30 × 18 grid of
plata slots**, which is 60 × 36 **cells** internally; regions are declared in the user's
table units, converted to cells at the declaration site, projected to percent once, and
rendered as percent-positioned hotspots. The VIP holds the first 3 columns, so the stand
area is **27 columns wide** (cols 4–30) — the VIP columns double as the aisles, so
aisles do not consume the stand budget.

**Current state: the layout is being specified region by region.** Eight stand regions exist
today — eight region columns, two bronze strips, one front-row stand and two Platinos of
the franja — so `STANDS` holds 115 entries: 64 plata, 20 oro, 10 platino, 21 bronce. The
franja also carries two **totems**, which are floor furniture and not stands at all: they are
a separate `TOTEMS` collection, so they are in none of those numbers — see
[Totems](#totems-are-furniture-not-inventory). The published copy still says 130 — see
[the count drift](#the-count-drift-is-deliberate) below.

Spec: `PARTNERS-FLOOR-PLAN-SPEC.md` (repo root, gitignored). §4 of it describes the
superseded percent band generator; the grid model in this file is the current contract.

## Files

| File | Role |
|------|------|
| `floorplanLayout.ts` | The floor as geometry: the slot→cell constants, cell sizes, percent projection, the hall frame and the `ZONES`. Knows no price, label, status — or what stands on it |
| `floorplanStands.ts` | What is on the floor: the tier-column helpers, the table-frame block helpers, `BLOCKS` and the `expected` stand count every block declares, and `TOTEMS` — the advertising totems, which are floor furniture and deliberately not stands. Imports the geometry, so the two modules point one way and only the contents change when a stand moves |
| `floorplanData.ts` | The catalogue: what a stand is, what it costs, whether it is taken. Types, the swappable state enums, tariff derivation, the cell tiler, lookups, aggregations; calls the drift guards on every import. Re-exports the layout and `TOTEMS` so consumers keep one import site |
| `floorplanGuards.ts` | The drift guards: category-name drift, tariff count ceiling, cell size, bounds, overlap — stand×stand, stand×zone, totem×stand, totem×zone, totem×totem — and declared block emission |
| `floorplanCopy.ts` | Every Spanish string, color maps, status copy, location strings, zone and totem labels, the `aria-label` builder |
| `planHotspot.tsx` | One stand, a toggle `<button>`, positioned by percent, rest/hover/focus/selected/dimmed treatment, expanded touch area |
| `planCanvas.tsx` | Plan surface: grid aspect, zone and totem layer, hotspot layer, zoom/pan transform, zoom controls |
| `planFilters.tsx` | Category and availability chip groups, reset, live result count, zero-result state |
| `planTooltip.tsx` | Desktop-only hover label for the hovered stand, counter-scaled against the zoom |
| `infoPanel.tsx` | `role="region"` + `aria-live="polite"`; initial state, stand detail, price strip, CTA |
| `useFloorplan.ts` | `useReducer` owning selection, hover and both filters; derives the matching set |
| `floorplan.tsx` | Section root, `relative z-30`, heading block, 70/30 grid, `PlanFilters` + `PlanCanvas` + `InfoPanel`, `?stand=` sync |

## State shape

```ts
interface FloorplanState {
  selectedId: string | null
  hoveredId: string | null
  categoryFilter: CategoryTierName | null
  availabilityFilter: StandStatus | null
}
```

`useFloorplan()` returns the state, the actions (`select`, `clear`, `setHover`, `setCategoryFilter`, `setAvailabilityFilter`, `resetFilters`), and the derived values the components read: `selectedStand`, `hoveredStand`, `visibleIds`, `visibleCount`, `hasActiveFilters`, `isFilteredOut`.

Decisions worth keeping:

- **`selectedId` is an id, not a `Stand`.** The reducer cannot produce a panel for a stand
  that does not exist, so the deep link sets an id it does not have to validate. Resolution
  is `getStandById` at read time, and an unknown id degrades to the initial panel instead of
  throwing.
- **`select` toggles.** Selecting the already-selected id returns the empty state, which is
  §7.1's "click again to deselect" implemented in one place rather than at each call site.
- **`clear` returns the identical state object when nothing is selected**, so `Esc` on an
  empty plan is a no-op instead of a re-render.
- **`assign` is a deliberate no-op action.** Reassigning whole state is exactly the branch
  C12 warns about, so the state is only ever narrowed field by field.
- **Filters are two nullable fields, never a combined enum.** `categoryFilter` and
  `availabilityFilter` compose by intersection, which is what makes the zero-result state
  reachable (a category with no reserved stands) without a third state.
- **`visibleIds` is `null` while no filter is active** and a `Set<StandId>` otherwise. The
  null case lets `isFilteredOut` return a bare `false` without a set lookup on every
  hotspot render pass.
- **Filtering never unmounts a stand.** §8.1 wants every node in the prerendered HTML and
  wants the counts to stay honest, so a filtered-out stand is dimmed and made
  `pointer-events-none` instead of being removed from the DOM.


## Zoom and pan

`planCanvas.tsx` owns one transform: `translate(x, y) scale(s)` on a single `motion.div`
that wraps the zone layer, the hotspots and the tooltip. The zoom
controls sit **outside** it, so they neither scale nor pan with the plan.

- **Range 1 → 2.5, step 1.25**, clamped in `applyZoom`. The two constraints are ordinary
  buttons with `disabled` at each bound, so a keyboard user learns the range from state
  rather than by trial.
- **`drag` is a `pointer: fine` affordance only.** Framer Motion writes `touch-action: none`
  on whichever element owns `drag`, which would cancel the native pinch-zoom and page scroll
  §8.3 requires on touch. `useFinePointer()` gates it, and touch keeps the browser's own
  gestures on the `[touch-action:pan-y_pinch-zoom]` container.
- **`dragConstraints` are divided by the zoom.** `transform: translate(x) scale(s)` moves the
  element `x * s` px on screen, so a visual pan limit of `n` px is `n / s` in the local units
  `dragConstraints` works in. Without the division the map can be dragged twice as far as the
  zoom allows.
- **Panning is a `useMotionValue`, zoom is React state.** The pan values change on every
  pointer move; routing them through `setState` would re-render every hotspot per frame.
- **The wheel listener is native and non-passive.** React registers `onWheel` passively at
  the root, where `preventDefault()` cannot stop the browser from zooming the page as well,
  so `ctrl`/`⌘` + wheel is handled with `addEventListener("wheel", …, { passive: false })`.
  A plain wheel is deliberately left alone: it is the page scroll.
- **The tooltip lives inside the transform and counter-scales** by `1 / zoom`, so a label
  keeps its size while the plan zooms under it.
- **The zoom controls are bottom-right.** They moved off the top-right corner when the legend
  and the metrics box shared it and two cards there collided at the mobile breakpoint. Both of
  those overlays are gone, so the corner is empty again and this is now the neutral corner
  rather than the only free one. It stays where it is because moving it would be a change with
  no problem left to solve.
- **Zooming does not auto-recentre.** The plan is cropped by `overflow-hidden` at every zoom
  above 1, so the edge bands are reachable by panning (or by pinning back to 1:1). Letting
  the transform run to its pan limits would move the plan under the pointer on every
  keystroke of the zoom buttons.

## Deep link (`?stand=`)

`DeepLinkSync` is a separate component inside its own `<Suspense fallback={null}>` in
`floorplan.tsx`; `page.tsx` also wraps the section. Only the sync component calls
`useSearchParams`, which is what keeps the hotspots in the prerendered HTML instead of
deopting the whole section to client rendering.

One effect, two `useRef` sentinels, and the direction of the change is what picks the branch:

| Situation | Effect |
|-----------|--------|
| `?stand` changed, id valid | adopt it through `select`, then `scrollIntoView({ block: "nearest" })` on the panel |
| `?stand` changed, id unknown | ignore it; the plan stays on the initial panel and the URL is left as the sender wrote it |
| Selection changed under a stable `?stand` | `router.replace(…, { scroll: false })` |
| Selection cleared under a stable `?stand` | drop the param, keep every other query param |

- **`router.replace`, not `push`.** The URL mirrors state, so Back should leave the page, not
  walk back through every hotspot click.
- **`scroll: false` plus a manual `scrollIntoView`.** A `?stand=` that arrives from a shared
  link should bring the panel into view, but a click the user just made must not yank the
  page. The panel wrapper carries `id={PANEL_ANCHOR_ID}` for the deep-link scroll.
- **The two sentinels exist because the effect re-runs on every render** (`onSelect` and the
  search params are fresh objects). `lastParam`/`lastSelected` make the effect a no-op unless
  one of the two inputs actually moved. Without them, the first effect run adopts the
  deep-linked id, the resulting state change re-runs the effect, and the write branch
  immediately re-asserts the `?stand` that `Esc` had just removed.

## Filters

`planFilters.tsx` renders two chip groups above the canvas, in the left column, so the plan
never moves when a filter is applied.

- **Both groups iterate the enums** (`STAND_CATEGORIES`, `STAND_STATUSES`) and read their
  labels from `floorplanCopy.ts`. A fourth status is one array edit, and no `.tsx` file names
  a status literal (C12).
- **Availability always lists all three states** plus `Todas`, even when a state has zero
  instances today. Hiding an empty option would make the filter set change under the user.
- **The count is announced through `aria-live="polite"`** in the same node as the zero-result
  sentence, so a screen reader hears the outcome of a filter without a second live region.
- **`Limpiar filtros` renders only when a filter is active.** A reset button that is always
  there is a control that is usually wrong.

## Tooltip

`planTooltip.tsx` is a hover affordance, not a touch one, and it is gated twice on purpose:
`hidden lg:block` on the wrapper (below `lg` the map is full width and the panel sits under
it) and a `pointerType === "mouse"` check in the hotspot (a pen would otherwise raise it).
The wrapper stays mounted when nothing is hovered, so hiding it costs no re-render.

- **Anchoring is side-aware** (`anchorFor`): once the stand's centre passes ~32% or ~68% of
  the container, the label anchors to the near edge instead of its centre. A centred label
  on an edge stand would be clipped by the container's `overflow-hidden` — the very clipping
  that stops the plan from escaping the card.
- **The bubble is `pointer-events-none`.** It follows the pointer and can overlap a
  neighbouring stand; if it took hits, the stand under it would become unclickable.
- **`aria-hidden`.** The label repeats what the hotspot's own `aria-label` and the panel
  already announce, so it is decoration for sighted mouse users.

## Focus and keyboard

- `Esc` is a `useEffect` `keydown` listener on `window` with a matching
  `removeEventListener` cleanup, registered once with `[]`.
- On selection, focus moves to the panel `<h3>` (`tabIndex={-1}` + ref). The heading lives
  **outside** `AnimatePresence`: under `mode="wait"` the outgoing panel is still mounted
  while it fades, so a heading inside the swap would take focus and then be unmounted
  mid-animation. The fade covers the body; the heading is the stable focus anchor.
- `focus({ preventScroll: true })` is deliberate. A bare `focus()` scrolls, which would yank
  a mobile user off the plan they just tapped — §7.3 allows a scroll only on deep-link entry.
  The price is that a sighted mobile user gets no scroll; the selected hotspot's own
  treatment (2 px cyan border, `scale-105`, glow) is the visible feedback at the point of
  contact.
- DOM order is plan → panel on both breakpoints, so `Tab` order matches visual order. No
  `tabindex` above 0 anywhere.

## Reduced motion

`useReducedMotion` from `framer-motion` (never `motion` — C5) gates the panel swap: normal
mode renders `AnimatePresence`, reduced mode renders the same `motion.div` with no
`initial`/`exit` and a zeroed transition, so the content still mounts but nothing animates.
`useReducedMotion()` returns `null` before hydration, which is falsy and matches the server
render, so there is no hydration mismatch.

The CSS transitions take the pure-CSS path instead: `motion-reduce:duration-0` on the hotspot,
`motion-reduce:transition-none` on the filter chips and zoom buttons. §7.4 says the JS and
CSS paths should not both cover the same behavior, and they do not here — `useReducedMotion`
gates the JS animation lifecycle, `motion-reduce:` gates `transition-duration`. Under reduced
motion the hotspot's `scale-105` still applies, it just lands in a single frame; removing the
transform as well would drop the only visual carrier of the selected state.

The slice-4 additions follow the same split: `PlanTooltip` and the canvas zoom read
`useReducedMotion()` for their Framer Motion transitions (0.15 s fade, 0.2 s scale, `0` under
reduced motion), and the deep-link scroll is skipped when the user asked for reduced motion —
scrolling is the one animation here that JavaScript owns end to end.

**No idle loop animation ships.** A `framer-motion` `animate` loop over every hotspot is one
concurrent animation timeline per stand on a mobile device, and §7.4 defers it pending
measurement on real hardware.

## The swappable state system (C12)

`Stand.status` is a data field. Nothing in a `.tsx` file may branch on a stand id or name a
status literal. The chain that makes that enforceable:

| Concern | Single source |
|---------|---------------|
| Status enum | `STAND_STATUSES` in `floorplanData.ts` |
| Default state | `DEFAULT_STATUS` in `floorplanData.ts` |
| Legend rows | `LEGEND_STATUSES` — the enum minus the default, derived not listed |
| Colors | `STATUS_COLOR`, `CATEGORY_COLOR` in `floorplanCopy.ts` |
| Labels and notes | `STATUS_COPY`, `CATEGORY_LABEL` in `floorplanCopy.ts` |
| Panel note | `STATUS_COPY[stand.status].note`, empty string included |

The C12 audit from spec §12.2 #18 greps this directory for the two non-default state names and
must hit only `floorplanData.ts` and `floorplanCopy.ts` — including this file, which is why
the states are described in prose and the audit command is paraphrased here rather than
quoted. Every stand is `disponible` today; the other two states ship with zero instances
on purpose, so the future inventory feature is additive rather than a rewrite.

## Geometry

Coordinates are **percent of the plan container**, never pixels, so they are independent of
anything drawn beneath them. But the percent values are never *authored* — they are
projected from a grid.

### Two levels: slots and cells

The hall is described in **plata slots** — the user counts columns and rows in the
footprint of one PLATA stand — and the app works in **cells**, half a slot per side. One
named constant connects them, at the top of `floorplanLayout.ts`:

| | Declaration | Value |
|---|-----------|-------|
| Cells per slot side | `PLATA_SLOT` | 2 |
| Hall in slots | `SLOT_COLUMNS` × `SLOT_ROWS` | 30 × **18** — derived, see below |
| Stand columns | `SLOT_COLUMNS - 3` | **27** — cols 4–30, right of the VIP |
| Hall in cells | `CELL_COLUMNS` × `CELL_ROWS` | `SLOT_COLUMNS * PLATA_SLOT` = **60 × 36** |
| Canvas shape | `GRID_ASPECT_RATIO` | `CELL_COLUMNS / CELL_ROWS` = **1.67** |

Slot row N occupies cells `2N-2, 2N-1`, and slot column N the same pair horizontally. The
canvas is 5:3 (it replaces the old `aspect-square`; it was 3:1 at ten rows and 2:1 at
fifteen). Nothing downstream hardcodes the aspect, 30 or 60, and the only consumer of the
shape is `planCanvas.tsx` reading `GRID_ASPECT_RATIO` straight from the data module.

**`SLOT_ROWS` is a sum, not a number.** It used to be the literal `15` sitting next to
`FRANJA_ROWS = 5`, two values kept in step by hand. Growing the franja to 8 would have
produced a hall that still claimed 15 rows, and the only thing that caught it was
`tierColumn` refusing a column that "fills 3 of 6 slot rows" — a symptom three bands away
from the cause. It is now `FRANJA_ROWS + ENTRANCE_ROWS + ENTRY_ROWS + MAIN_FLOOR_ROWS +
OPEN_BOTTOM_ROWS + MARGIN_ROWS`, so the franja is the one number a band change touches.

### The top franja, and why the user's frame is the stable one

Slot rows are absolute and they move. The rows added at the top pushed everything down, so
the same stand the user calls *"fila 7"* has changed slot row twice: 9, then 14, then
**17**. Had the blocks been written in absolute slot rows, each insertion would have been a
hand-edited `+N` across every declaration, and a missed one would not look like a mistake —
it would look like a stand that had been placed slightly wrong.

So the user's table frame is the source of truth and absolute slots are derived from it:

| Table frame | Slot | Cells |
|-------------|------|-------|
| col `N` | `N + 3` | `2 * (N + 2)`, `+1` |
| fila `N` | `N + STAND_ORIGIN_ROW` (`10`) | `2 * (N + 9)`, `+1` |
| franja | filas **−9 … −2** → slots 1–8 | 0–15 |
| entrance | fila −1 → slot 9 | 16–17 |
| frente | fila 0 → slot 10 | 18–19 |
| piso principal | filas 1–6 → slots 11–16 | 20–31 |
| bronce | fila 7 → slot 17 | 32–33 |
| margen | fila 8 → slot 18 | 34–35 |

The franja is **negative table rows**. That is the whole trick: it is new space that already
has coordinates, so adding it moves no coordinate the user has already given, and the
documented table frame keeps meaning what it meant when the user wrote it down. The partial
blocks are declared through `frontPlata(tableColumn, tableRow)`, the one function that
converts a table coordinate to a slot, so widening the franja or moving the entrance
renumbers the absolute slot rows in exactly one place.

| | Before the franja | 5 rows | Now, 8 rows |
|---|---|---|---|
| offset, col | +3 | +3 | **+3** |
| offset, fila | +2 | +7 | **+10** |
| stands the frame moved | 113 | 113 | **113** |
| stands added to the franja | 0 | 0 | **2** |
| `STANDS` after any edit | — | identical | identical |

Regions are declared in the user's units — **1-indexed, in slots** — and converted once at
the declaration site by `slotsToCells`, which maps slot `column` to cell `(column - 1) *
PLATA_SLOT`. Everything downstream of that map is integer cells; there is no fractional
unit anywhere in the app. `gridToPercent` divides by `CELL_COLUMNS` / `CELL_ROWS`.

### The region table

| Region | Table frame (as the user reads them) | Cells (0-indexed) | Model |
|--------|------------------|------------------|-------|
| Zona VIP | cols 1–3, filas −1…8 — **desde la entrada hacia abajo** | `0, 16, 6, 20` | `ZONES` entry, kind `vip` |
| Franja | filas −9…−2, cols 4–30 | `6, 0, 54, 16` | **eight reserved rows, two stands and two totems in them** |
| Entrance | fila −1, cols 4–30 | `6, 16, 54, 2` | `ZONES` entry, kind `open` |
| Stand area | filas −9…6, cols 4–30 | cells cols 6–59, rows 0–31 | **implicit** — the floor a block sits on, not a drawn shape |
| Bottom band | fila 7, cols 4–30 | `6, 32, 54, 2` | the two bronze strips, part-claimed |
| Bottom margin | fila 8, cols 4–30 | `6, 34, 54, 2` | `ZONES` entry, kind `open` |
| Front row | col 22, fila 0 | `48, 18, 2, 2` | `frontPlata(22, 0)` → `plata-c25r10` |
| Franja's Platinos | **table cols 0–1** and **13–14**, filas −6…−5 | `4, 6, 4, 4` and `30, 6, 4, 4` | `frontBlock("platino", 0, -6, 2, 2)` and `frontBlock("platino", 13, -6, 2, 2)` |
| Publicidad totems | **table cols 5** and **17**, fila −6 | `14, 6, 2, 2` and `38, 6, 2, 2` | `TOTEMS` — `frontTotem(5, -6)` and `frontTotem(17, -6)`, one slot square each — see [Totems](#totems-are-furniture-not-inventory) |
| Plata wall | cols 4–9, filas 1–6 | `6, 20, 12, 12` | `BLOCKS` entry `plata-c4r11` |
| Oro east, top | cols 10–11, filas 1–2 | `18, 20, 4, 4` | `BLOCKS` entry `oro-c10r11` |
| Platino east, middle | cols 10–11, filas 3–4 | `18, 24, 4, 4` | `BLOCKS` entry `platino-c10r13` |
| Oro east, bottom | cols 10–11, filas 5–6 | `18, 28, 4, 4` | `BLOCKS` entry `oro-c10r15` |
| Bronze strip A | fila 7, at cells 6/8/10/11/13/15/17/19/21 | `6, 32, 1, 1` each | `bronce-cell6r32` … — see [Cells are 0-based](#cells-are-0-indexed) |
| Bronze strip B | fila 7, at cells 28/30/31/33/35/36/38/40/41/43/45/46 | `28, 32, 1, 1` each | same, cells 28–46 |
| East edge, partial | col 23, filas 1/3/4, at cell rows 20/24/26 | `50, 20, 1, 1` each | `frontPlata(23, 1/3/4)` → `plata-c26r11`/`r13`/`r14` — see [Partial columns](#partial-columns-are-declared-as-raw-blocks) |

Block ids are **derived, not written**: `${category}-c${slotColumn}r${slotRow}`. Moving a
column renames its blocks instead of stranding a hand-written label, and two blocks of one
tier cannot collide, because they may not share a start cell. The ids on cell-declared blocks
say `cell` instead, because their coordinates are cells while every other block's are slots —
see below.

**The VIP is zone 2, and it starts at the entrance — it is the one region whose top is not
the top of the hall.** It occupies table filas −1…8, slot rows 9–18, cells `0, 16, 6, 20`:
the entrance row and everything below it, to the bottom margin. It does **not** reach up
into the franja, because the franja is zone 1 — the exterior — and a VIP painted across
exterior floor would claim space that is not the VIP's.

Both mistakes were mine, in opposite directions, and both looked right in a render. First I
gave it the full height `SLOT_ROWS`, which claimed a 3 × 9-cell strip below the entrance
that nobody sold. Then, reading "hasta la entrada" as a top edge, I flipped it to stop at
the entrance — which put the VIP in the franja instead and emptied it from the hall. The
sentence is about which zone the VIP belongs to, and the answer fixes both ends at once:
top at `ENTRANCE_FIRST_ROW`, height `SLOT_ROWS - ENTRANCE_FIRST_ROW + 1`.

`row: 1` is the tempting default here and it is wrong, because the franja is the only thing
in this hall that sits above row 1, and the VIP is the only region that is not in it.

Unchanged by any of that is the reason the first three columns were never subtracted from
the stand budget: the stands live in cols 4–30. 115 stands, 149.25 used, and the margin is
a function of the floor, not of the stands — it has moved with the hall every time.

Slot row 17 (cells 32–33) is the bottom band — the two bronze strips claim 21 cells of it, and
the rest is left as open floor.

**The 3 VIP columns are the aisles.** Widening the hall from 27 to 30 columns did not take
three columns out of the stand budget — it added three. The aisles a visitor walks are the
VIP band itself, so the stand area is the full `SLOT_COLUMNS - 3` = **27 columns**, not
24. That is why only the right-hand `ZONES` entries widen: they are written
`SLOT_COLUMNS - 3`, so they track the hall while every `BLOCK_SLOTS` entry stays exactly
where it is.

**Adding a region is one array entry, in the unit it occupies.** A non-stand region is a
`ZONE_SLOTS` entry; a stand region is a `BLOCK_SLOTS` entry in slots, or a `CELL_BLOCKS`
entry when it is smaller than a slot; all are converted to `ZONES` / `BLOCKS` as they are
declared. Neither the canvas nor any other file knows the layout. The right
edge is written `SLOT_COLUMNS - 3` rather than the literal 27, so "columns 4 to the end of
the hall" cannot drift when the hall grows. This is what made the 27 → 30 widening a
one-constant change: the two right-hand zones widened, the four blocks did not move, and
`STANDS` came out identical.

### Cells are 0-indexed

Slot row N occupies cells `2N-2, 2N-1`; the cell indices themselves run **0-based**, `0` to
`CELL_ROWS - 1`. Both facts have to be held at once, and confusing them is a one-slot error
that every guard catches only as an overlap.

The bottom band made that concrete. The user asked for bronze in *"fila 7, columnas 1 a 8"* —
table frame, so **tabla fila 7** (slot row 17 now, slot row 14 at five franja rows, slot row 9
before the franja existed). The obvious conversion, slot row 7, lands three bands too high — on
the front row:

| Table fila | Slot | Cells | Occupied by |
|-----------|------|-------|-------------|
| 1–6 | 11–16 | 20–31 | the seven tier columns |
| **7** | **17** | **32–33** | **the two bronze strips; the un-claimed cells stay open floor** |
| 8 | 18 | 34–35 | the `margin` zone |

The bottom band is part-claimed, not open: 21 bronce stands occupy cell row 32 inside it, and only
the cells they skip are open floor. A block declared against the wrong *band* is invisible to
every geometric check — a bronce at cell row 18 would be in bounds, in no zone and clear of
every stand, because the front row holds one stand and it sits at cells 48–49. The declared
`expected` count is what sees a mistake of that shape, and it is the only guard here that reads
the declaration rather than the tiler's output.

**Bronze is the one tier the slot vocabulary cannot express.** A bronze stand is a single
cell, a quarter of a slot, so it has no whole-slot rectangle: nine of them are 2.25 slots,
and `slotsToCells` cannot turn a fraction of a slot into an integer cell. Rather than let a
tier break the unit convention, cell-sized regions are declared in `CELL_BLOCKS`, in cells,
and merged into `BLOCKS` alongside the converted slot blocks. `tileRect` and every consumer
downstream are unchanged — a cell block is still an ordinary `Block`, just declared in the
unit it actually occupies.

This was anticipated rather than discovered by accident: `SlotRect` and `GridRect` are
structurally identical, so TypeScript cannot catch a region declared in the wrong unit, and
the earlier note here said such a change has to be made "deliberately, with a spec, not as a
side effect of one awkward region". It was one awkward region, and it was forced — there is
no way to add bronze without it.

**Nine bronze across eight table columns cannot both hold.** A bronze is half a table column
wide, so eight columns are sixteen cells, and nine stands fill neither the span nor the row.
Asked, the user chose one bronze per column reaching column 8, plus a ninth — which leaves
exactly one adjacent pair, because nine stands in sixteen cells with a stride of two need
one cell of slack. The slack was then placed deliberately: the user asked for the touching
pair to be stands 3 and 4 rather than the 8 and 9 that a left-aligned fill produces.

```
celda fila 32  b.b.bb.b.b.b.b.b..........   cells 6-21
              ^ ^ ^^ ^ ^ ^ ^ ^  ^
              1 2 34 5 6 7 8 9
                  ^^
                  unico par: bronce-03 + bronce-04
```

Getting the pair onto stands 3 and 4 constrains the run from both ends. Stand 2 has to clear
stand 3, so the pair cannot start at cell 9 — that would fuse stands 2, 3 and 4 into a run of
three. Placing the pair at cells 10 and 11 instead puts both cells inside table column 3
rather than straddling a column boundary, leaves the stride of two on either side, and keeps
the row anchored at column 1 and reaching column 8. Column 3 therefore carries two stands and
each other column carries one.

The cost is that a quarter-slot stand cannot be verified by eye at slot scale, so this is
asserted rather than eyeballed: one adjacent pair, at indices 3 and 4, on a row that starts
at cell 6 and ends at cell 21.

**Twelve bronze across ten table columns cannot both hold either.** Ten columns are twenty
cells and twelve stands fill neither the span nor the row. The arithmetic is tighter than the
first strip's: nineteen cells of span across eleven gaps averages 1.73, so with gaps of one and
two, `1 + 2×11 − p = 19` gives **p = 4 pairs** — the first strip needed only one, because nine
stands in sixteen cells is the same density reached from the other side. Offered a periodic
texture, a minimum-pair fill and a left-anchored fill, the user chose the texture.

```
celda fila 32  b.b.bb.b.b.b.b.b......b.bb.b.bb.b.bb.b.bb
              strip A, cols 1-8         strip B, cols 12-21
```

Strip B is `b.bb.` repeated four times — 12 stands, 4 pairs, four pairs being the floor for
any periodic pattern at this density. It ends at cell 46, leaving the second cell of column
21 free, which is the cost of a pattern whose period is 5 against columns whose period is 2:
every other adjacency lands on a column boundary rather than inside a column. That is a real
tradeoff, chosen over filling to cell 47.

**The gap between the strips is requested, not leftover.** Cells 22 to 27 — table columns 9,
10 and 11 — are empty because the second strip was asked for "desde la columna 12". The two
strips are declared as two named arrays for that reason; a single flat list would read as one
run with an unexplained three-column hole in it.

### The stand floor has two bands, which is what let it grow a row

The entrance is one slot row, not two, and the franja above it does not change that: the stand
floor starts at slot row 11 — `STAND_ORIGIN_ROW` plus the front row — and runs to slot row 16,
six rows. Table row 0, the row against the entrance, is the front row, on slot row 10.

The obvious implementation was to make the floor seven rows and add a seventh band to each of
the seven tier columns. That would have moved all 115 stands, broken the `tierColumn` invariant
in every region at once, and required a decision about seven bands nobody had specified. So
the floor is split instead:

| band | slot rows | how it is declared | invariant |
| --- | --- | --- | --- |
| front row | 10 | raw `BlockSlot`s | none — filled column by column, deliberately sparse |
| main floor | 11–16 | `tierColumn` | spans must sum to `STAND_COLUMN_ROWS`, the full column height |

`STAND_COLUMN_ROWS` still evaluates to 6, `tierColumn` still stacks from `STAND_MAIN_ROW`, and
**not one previously placed stand moved**: the stands that existed before this band was added
keep their exact cell rows and columns, and the bronze stays on cell row 32. The main floor did
not grow — a band was added *above* it, and the bands below it were already where they
belonged.

The front row has no completeness invariant, and that is the point. A tier column that stops
short leaves a gap the floor reads as an unmade decision, so `tierColumn` refuses one. The
front row is a different animal: it is being specified one stand at a time, in whatever order
the user names them, and a partial row there is progress rather than an omission. Table col
23's rows 1/3/4 and the front row's col 22 are both partial on purpose, and both are declared
as raw blocks for that reason. A partial still has to be partial *of something*, so each of
those blocks declares `expected: 1` — the column around them is the spec, the block is one
stand, and the two are separate claims the guards check separately.

### Partial columns are declared as raw blocks

`tierColumn` refuses a column whose tiers do not sum to `STAND_COLUMN_ROWS`, and the reason
is good: a tier column that stops short leaves a gap the floor reads as a decision nobody
made. That reason does not hold for a column that is *specified* as partial. Table column 23
holds three Plata in rows 1, 3 and 4 — row 2 empty on purpose — and nothing in rows 5–6. Not
a gap, a spec. So the three are
declared as raw `BLOCK_SLOTS` entries, one per row, with ids on the same
`{category}-c{column}r{row}` derivation `tierColumn` uses so they stay ordered and readable.

Widening the helper instead would have been the wrong move. Its throw is a genuine invariant
for the *tier* grammar, and loosening it to accept a sum of 3 would have let a mistyped band
list — 6 rows declared as 3, or two bands overlapping — pass silently in every future
region. A raw block is opt-in and says so: you can only get a partial column by writing one
yourself, never by accident.

**Block ids do not reach the visitor.** `STANDS` is generated by expanding blocks, and a
stand's id is `{category}-{nn}` by position within its tier — `plata-61`, not
`plata-c26r11`. Every assertion about a region has to be made against cell geometry, not
against block ids. This has now broken a harness twice.

### The margin is an invariant, and asserting it against a stale number invents a change

`margin = free - need`, where `need` is what the *remaining* tariff still demands. Placing N
stands of a tier the tariff already counts reduces `free` by N **and** `need` by N, so the
margin does not move. That is the whole claim, and it is a claim about *placements*: it says
nothing about a figure computed over a different floor.

It is **270** now — 282.75 free against 12.75 still to place. The earlier series in this file
read 24.75, 21.75, 20.75 and then 27, and **it is not comparable to today's figure**: it was
computed against a stand area that excluded the bottom band, which was empty then and holds
the 21 bronze cells now. Counting the band adds 27 slots, and the band is the only reason the
number is not 243. The series is left here as the record of what was believed and when, not
as a trend — see the corrected derivation under
[the count drift](#the-count-drift-is-deliberate).

Adding the franja was the one change that was not a placement at all: it did not consume area,
it *created* 8 × 27 = 216 slots of it, so `free` rose by 216 while `need` fell. The two
Platinos the franja has since received took `need` from 20.75 to 12.75, and the rule itself
is untouched: a placement leaves the margin exactly where it was. The invariant is about moving
stands around inside a fixed floor; growing
the floor is outside its claim, and a margin that cannot move when the room gets bigger is
a margin measuring the wrong thing.

That makes the margin a weak constraint for the next region: with 282.75 free against
12.75 to place, area is no longer what decides where the remaining 15 stands go. The
tariff is, and so is whatever shape the franja is meant to take.

It moved twice in this document, and both times the error was mine rather than the floor's.

The first was a stale input: adding three
Plata, I recomputed `need` with the *pre-addition* Plata remainder — 16 instead of 13 — which
produced a margin of 24, and then asserted `margen 24` in the same harness. The assertion
passed because it was handed the same wrong number the code had produced, so the check could
only ever confirm itself. I then wrote 24 into this file and into memory.

The second was subtler and survived much longer: the numerator and the denominator were
derived separately and never reconciled, so a stand was subtracted from an area that did not
contain it. Nothing about that is stale — both numbers were correct in isolation and wrong
together, and each was internally consistent, which is exactly why reviewing either one alone
did not catch it.

Two rules came out of them, both about making a check able to fail:

- **Derive the expectation from the data, never from the previous run's figure.** The harness
  recomputes the remainder as `TARIFF[tier] - CATEGORY_TOTALS[tier]` and builds `need`
  from that, so a stale constant cannot survive. A literal in this file is a claim to be
  re-derived, not a value to be copied forward.
- **Never assert a value the same expression just computed, and never combine two figures
  that were derived by different routes without checking they share a definition.** The first
  is a tautology wearing a check's clothes. The second is what let 149.25 be subtracted from
  405: both were right, and `free` was wrong. A check that reports the floor has changed when
  nothing has is at least harmless; a figure no check ever touches is simply a guess with
  decimal places.

### The user's frame is the plata table, not the hall

Positions for the east region arrived **described against the plata table**, not against the
hall: "immediately to its right, two columns wide, six rows tall, tiers oro/oro/platino/
platino/oro/oro from the top". `BLOCK_SLOTS` is declared in hall slots, so that frame has to
be converted once, on the way in.

The plata block is declared at slot `column: 4, row: 11`, which fixes the origin. The rule, stated
once and repeated as a comment on `BLOCK_SLOTS`:

> **hall slot column = table column + `VIP_COLUMNS` (3) · hall slot row = table row +
> `STAND_ORIGIN_ROW` (10)**

The two offsets are the whole frame, and they are *not* interchangeable: the column offset counts
the VIP strip the user already owns, while the row offset counts the franja and the entrance
above table row 1. The row offset is derived, because the franja grew twice and each time it
took a row instead of moving a coordinate the user had written down.

| Frame | Columns | Rows |
|-------|---------|------|
| The hall | 1–30 | 1–18 |
| The plata table (the origin) | 1–6 | 1–6 |
| The east region, in the table's frame | 7–8 | 1–6 |
| The east region, in hall slots — what `BLOCK_SLOTS` holds | **10–11** | **11–16** |

Table columns run out at 6, so "immediately to the right of the table" is table column 7,
which is hall slot column 10 — the slot the blocks start at. The tiers then split the six
table rows into three 2-row bands.

### A region is a column of tiers, not a stack of rectangles

**A mixed-tier region is three rectangles, not a new concept.** Each `BLOCKS` entry is a
single rectangle of a single category, and the east region's oro → platino → oro stack is
exactly expressible as three of them. A block that carried a per-row tier list would have put
tier knowledge into the tiler, where `CELL_SIZE` already holds all of it. If a future region
really cannot be tiled by rectangles, the model has to change deliberately — with a spec, not
as a side effect of one awkward region.

That reasoning still holds, and it is why the tiler is untouched. But the declaration side
was revised: once every region turned out to be a *vertical column of tiers*, writing them as
hand-computed rectangles meant restating the same arithmetic seven times and hard-coding a
label per band. `tierColumn` now takes a column and its band list and emits the rectangles:

| | Before | After |
|---|---|---|
| Author a 6 × 6 Plata wall | compute the rect, write an id | `wideColumn(4, [["plata", 6]])` |
| Author the east run | three rects + three ids | `narrowColumn(10, [["oro", 2], ["platino", 2], ["oro", 2]])` |
| Catch a column that stops short | nothing | throws on import if the spans miss `STAND_COLUMN_ROWS` |
| Labels | 18 hand-written ids | derived from position |

The tier knowledge stayed in the *declaration*, where the user already speaks in tiers and
rows, and never reached the tiler. The cost is honest: the helper is longer than the
repetition it replaced, which is why the layout moved into its own module rather than pushing
`floorplanData.ts` past the line limit.

**This offset is worth stating as a rule rather than as arithmetic per entry.** A mistake here
is a one-slot (two-cell) shift: it still compiles, still tiles, still lands in bounds, and
still produces a plausible-looking plan, so nothing catches it. It has already cost one full
round trip this way.

### Cell sizes

| Tier | Slots (w × h) | Cell (w × h) | Cell area |
|------|---------------|--------------|-----------|
| Bronce | 0.5 × 0.5 | 1 × 1 | 1 |
| Plata | 1 × 1 | 2 × 2 | 4 — the base unit, and one slot |
| Oro | 2 × 1 | 4 × 2 | 8 — as wide as two plata side by side |
| Platino | 2 × 2 | 4 × 4 | 16 — the area of four plata |

`CELL_SIZE` is in **cells** and holds that table's `Cell (w × h)` column. Plata is the
base unit at exactly one slot, so a slot is the smallest whole thing a stand can occupy;
`bronce` is the only tier smaller than a slot, at half a slot per side.

A cell's footprint is `columns / CELL_COLUMNS` of the width by `rows / CELL_ROWS` of the height —
that is, `columns/60 × rows/36` of the container today. It is why plata and platino render as
squares and oro as a wide one, with no per-tier tuning, and why the denominators are named
constants rather than the 30 and 60 written out: the hall is 5:3, so a cell is a 60th of the
width and a thirty-sixth of the height, and quoting one number for both axes is wrong by 40%.

### Tiling

`tileRect` walks **row-major**: top to bottom, then left to right across each row of cells.
A cell is emitted only where its whole size fits the block, so a span that is not a
multiple of the cell leaves the remainder as open floor rather than squeezing a smaller
stand into it. That rule is the reason a block needs a declared `expected` count: the
remainder it drops is not an error, so nothing upstream of the tiler notices that it dropped
one. The plata block is 6 × 6 **slots** — `6, 20, 12, 12` cells — against a
2 × 2 cell, so it tiles exactly: **36 stands** over cells cols 6–17 × rows 20–31, six rows
of six. There is no remainder and therefore no gap to justify.

The three east blocks tile the same way, and each one lands on its own cell because each is
declared as a 2 × 2 **slot** span:

| Block | Cells | Own cell | Tiled | Stands | Stand cells |
|-------|-------|----------|-------|--------|-------------|
| `oro-c10r11` | `18, 20, 4, 4` | 4 × 2 | 2 wide × 2 deep | **2** | `18,20` and `18,22` |
| `platino-c10r13` | `18, 24, 4, 4` | 4 × 4 | 1 × 1 | **1** | `18,24` |
| `oro-c10r15` | `18, 28, 4, 4` | 4 × 2 | 2 wide × 2 deep | **2** | `18,28` and `18,30` |

A 4 × 4 **cell** block is where the tiers earn their keep: it is two 4 × 2 cells deep, so
`oro` yields 2 stands and `platino` yields 1 from the identical rectangle. The two oro blocks
are not adjacent — `platino-c10r13` sits between them, at cells rows 24–27, so the east
region reads as five stacked tiers with no shared edge.

An earlier reading of the hall ("columna 4 hasta la columna 6", three columns wide) was
**wrong on the horizontal axis** and produced 3 stands instead of 36. It came from reading
the then-27-column hall as cells when the user counts slots: at half the resolution a 6 × 6
block cannot fit at all, and the tiler's "does the whole cell fit" rule silently dropped
every stand that did not, which is what made it look like a plausible layout.

Stands are numbered per category across all blocks (`plata-01`, `plata-02`, …), which keeps
ids and labels unique when a second block of the same tier is added, and keeps the
`?stand=` ids stable.

### The drift guards

The guards live in `floorplanGuards.ts`, not in the layout or data module, because the data
module was at the 300-line cap and the next region would not have fit. `floorplanData.ts` ends
with a single unconditional call, so the checks and the messages are unchanged — only the file
moved, and the environment gate is gone (see [why there is no `DEV`](#why-there-is-no-dev)).

The one structural constraint is the import direction: the guard module may only `import
type` from `floorplanLayout.ts` / `floorplanData.ts`, and takes everything it reads —
categories, cell sizes, grid size, stands, zones, totems, block tallies — as arguments. A
type-only import is erased, so the edge stays one-way and there is no TDZ cycle with the data
module's own import of the guard. Passing the data
in rather than importing it also means a caller cannot forget an argument and silently skip
a guard.

Six guards, in this order:

| # | Invariant | Failure it catches |
|---|-----------|--------------------|
| 1 | Category names match `STAND_PRICING` | A rename in the tariff array — which `Exact<>` cannot see, since the mirror is hand-written |
| 2 | `built > tier.slots` per tier | Overselling the tariff. `>`, **not** `===`, while the layout is partial |
| 3 | `stand.cell` matches `CELL_SIZE[tier]` | A tiler bug emitting an `oro` at 2 × 2 |
| 4 | Every stand, zone and totem fits `CELL_COLUMNS` × `CELL_ROWS` | A block declared against a stale hall width, or a coordinate typo |
| 5 | No overlap between any two regions: stand×stand, stand×zone, totem×stand, totem×zone, totem×totem | Two `BLOCK_SLOTS` entries covering the same cells, or a totem painted over something |
| 6 | Every block emits exactly the `expected` stands it declares | A span that tiles to fewer cells than the rectangle claims, or a block that tiles to nothing |

Overlap is **half-open**: blocks that merely share a boundary cell line are legal, only a
genuinely double-covered cell throws. Both overlap guards were proved to fire by constructing an
out-of-bounds stand and an overlapping pair and checking the thrown message, and every guard is
verified on the real data once per build and once per page load — 6,555 stand pairs, 345
stand × zone pairs, and for the two totems 230 totem × stand, 6 totem × zone and 1
totem × totem, zero collisions in every one. (The two figures this paragraph used to quote,
820 and 6,368, were both stale — they were written when the hall held far fewer stands and
neither was ever re-derived. The counts above come from `C(115, 2)` and `115 × 3` on the
current `STANDS`. The 7,137 is their sum.)

### Guard 6 reads the declaration, because the other five cannot

Guards 1 to 5 all inspect `stand.cell`, which is what `tileRect` produced. They are therefore
all *downstream* of the declaration, and a declaration that does not tile evenly produces fewer
cells — and fewer cells pass every one of them, because fewer cells cannot overlap, cannot
leave the grid, are still the tier's own size and are still under the tariff. The plan then
renders as a hall with a rectangular hole in it, and the count still reads as an ordinary
partial build-out, with the 15 unplaced tariffed stands to explain the shortfall.

A ceiling would have caught none of that: `emitted <= expected` is true of every under-built
region on earth, which is every region in this hall. So `expected` is asserted as an
**equality**, and a block that emits nothing at all is a mistake whatever the arithmetic says —
a block in `BLOCKS` is a region that holds stands, and a partial has to be partial *of
something*. The first row below is the real, correct declaration; the three after it are the
corruptions, and all four numbers come from `tileRect` on the real `narrowColumn` bands:

| Declaration | Emitted | Guards 1–5 | Guard 6 |
|---|---|---|---|
| `narrowColumn(10, [["oro", 2], …])` — 2 slots wide, 2 tall, `oro` cell 2 × 1 slots | **2** | pass | pass |
| the same band one character narrower, 1 slot wide | **0** — two stands gone, block gone | **all pass** | throws: declares 1, emitted 0 |
| the same band three slots wide | **2** against a declared 3 | **all pass** | throws: declares 3, emitted 2 |
| any band declared `rows: 0` | **0** | **all pass** | throws: declares 0, emitted 0 |

The 3-wide case is worth reading closely, because the message is more specific than the
summary suggests. Widening the bay to 3 leaves the `oro` bands arithmetically valid — a
declared 3, an emitted 2 — and fails. The `platino` band in the same column fails *harder*:
2 × 2 slots of Platino divided by a 2 × 2-slot cell is **1.5**, and the thrown message says
`declares 1.5 stands, emitted 1`. A fraction is not a rounding problem to be tolerated, it is
a rectangle that does not divide into its own tile, and the derived formula is what makes it
visible instead of silently flooring. The build stops on the first block it reaches —
`oro-c10r11` — and never gets to the Platino one behind it.

`expected` is set two ways, and which one is used is the design decision:

- **Derived, for a full rectangle.** `tierColumn` and `frontBlock` compute it from the band's
  own span and the tier's own `CELL_SIZE`, both in slots, so it cannot drift from the geometry
  it describes. The Plata wall declares 6 × 6 slots against a 1 × 1 slot cell and the count
  follows to 36. Widening the wall is a one-constant edit and the count moves with it.
- **Hand-written, where the count is an intent the rectangle cannot express.** `frontPlata` is
  `expected: 1` — not because 1 × 1 divided by a 1 × 1 slot cell is anything other than 1, but
  because the east-edge column's empty rows and the front row's unfinished state are the spec,
  and a derived number would also follow a later edit that widened the block. The bronze strips
  are `expected: 1` each for the same reason from the other direction: the strip is a list of
  cells, not a rectangle to be filled, and dividing a 1 × 1 cell by a half-slot bronze footprint
  would produce a fraction that says nothing about the intent.

That hand-written literal is the protection. It looks redundant on the day it is written — the
derived value already agrees — and it is what makes a later accidental change to the block's
geometry fail instead of quietly changing the count.

**What it does not catch, stated so it is not a surprise:** a wholesale width change on a block
whose tier cell is exactly one slot, where the new span still tiles evenly. `wideColumn`'s
`6` becoming `5` emits 30 instead of 36, and both the derived `expected` and every other guard
agree, because a Plata block *is* a 6 × 6 array of slots and a 5 × 6 one is a legitimate
different array. That is a geometry decision made in one named place, not a silent corruption,
and catching it would mean hand-writing a literal on every full rectangle — which is the thing
this design deliberately refused to do.

### Why there is no `DEV`

Every guard used to sit behind `if (DEV)`, where `DEV` was
`process.env.NODE_ENV === "development"`. That gate was read as "cheap, keep the fast path
clean" and it was actually **"off in production"** — the shipping bundle. A guard that only
runs in development is a comment with an `if` in it: the PRD's floor plan is static data, not
a user session, so the data is authored and reviewed days before anyone deploys it, and the
moment it matters is the build. The gates were removed and there is no build-time cost worth
keeping.

**Why that is not a build-performance argument:** Next.js inlines `process.env.NODE_ENV` at
compile time, so a `false`-valued `DEV` was dead-code-eliminated from the production bundle
anyway. The gate saved nothing there — it only removed the checks from the one environment
where a change of this kind can be made.

The guards therefore run **unconditionally, on every import, in every environment**:
`next build`, `next start`, a server render and a browser load. The work is bounded and
happens once per module evaluation — six guards over 115 stands, 3 zones and 2 totems, 7,137
pairwise comparisons, a few microseconds. The guarantee is worth far more than the microseconds,
and a guard that can be switched off by an environment variable is not a guard.

The counter-argument, for completeness: a throwing guard now takes the whole route down instead
of only the dev server. That is why `src/app/partners/error.tsx` exists, and why it is scoped
to the section rather than the app. A guard is not a recovery path — the two are complementary,
and neither replaces the other.

The proof that the checks survived bundling is in
[Verified, not assumed](#verified-not-assumed).

### Numeric claims are re-derived, not re-typed

This file quotes a lot of numbers — 115 stands, 64/20/10/21, 130 tariff, 15 unplaced, 12.75
slots, 282.75 free, 270 margin, 7,137 comparisons, module line counts, totem columns. Each one
was a transcription at some point, and transcription is exactly the failure this module's
guards were written to catch. The rule that replaces transcription:

- **Geometry figures** come from `STANDS`, `CATEGORY_TOTALS` and `STAND_PRICING`, which guards
  1, 2 and 3 already tie to the tariff. Write the formula in this file, not the total.
- **Anything derived from a declaration** — a block's stand count, a totem's slot, a cell rect
  — is written in the frame the declaration uses and converted on the way in, never converted
  by hand in prose. `TOTEM_SLOTS` and `BLOCK_SLOTS` are the single sources; a cell rect here is
  always a citation of one of them, and if the two disagree, the code is right.
- **`TOTEMS` are re-synced by hand on every totem move**, and this file is the checklist. There
  is no `Expected<>` trick that covers a cell rect against a 2 × 2-cell totem footprint the way
  the `Exact<>` category mirror works, so the review is the mechanism: a totem edit is not done
  until the placement table above, the count arithmetic and the strip-B formula all agree.
- **Module line counts** are the weakest number here and are labelled with the file they belong
  to (`floorplanStands.ts:279`), because the point is not the figure but the headroom against
  the 300-line cap.

If a figure in this file cannot be re-derived from one of those sources on demand, it should be
deleted rather than kept, on the grounds that an unre-derivable number in a design document is
worse than no number.

### The gap is paint-time, not grid arithmetic

Every stand is stored at its **exact full cell** — `Stand.cell` in cells, with
`Stand.geometry` derived from it in percent. Nothing shrinks a rect to fake a gutter: the
15% gap is a `transform: scale(0.85)` on the rendered element, fed by `CELL_FILL_RATIO`
through a `--cell-fill` custom property on the hotspot layer. If the gap were baked into the
coordinates, "plata is 2 × 2" would stop meaning 2 × 2.

Two details make that safe:

- **`transform`, not `scale`.** Tailwind v4's `scale-*` utility sets the `scale:` property,
  which the hotspot uses for its hover and selected treatments. `transform` and `scale` are
  independent properties that compose, so the fill ratio and the state scale multiply
  instead of the higher-specificity rule overwriting the state.
- **A descendant rule, not a wrapper.** `planHotspot` is frozen and positions itself from
  `geometry`, so a per-stand wrapper would either double-offset it or — being a
  full-size box — swallow the pointer events of the stands painted before it. The gap is one
  rule on the layer that already existed: `[&>button]:transform-[scale(var(--cell-fill))]`.

### Zones

Zones are rendered behind the stands, are never selectable, and take no part in filtering,
selection or the panel. The VIP reads as a distinct region through a faint brand tint plus
a dashed border; the open zones stay near the floor. Styling is a `ZoneKind` map in
`planCanvas.tsx` — two entries, no invented gradients. Each zone is a `role="group"` with
an `aria-label` from `ZONE_LABEL`, and the same string is its visible label, so the drawn
and announced identities cannot disagree. A screen reader gets three named regions where
the sighted layout shows two empty bands and one tinted column.

There is **no floor-plan image**. The placeholder PNG (`distribucion_stanes.png`) was
removed rather than calibrated: it drew roughly 50 positions, carried a baked-in annotation
column and notes bar, and its stands touched, so the hotspots never lined up with it
anyway. The plan is an abstract arrangement of cells, which makes the distribution a
**data** decision rather than a pixel-accuracy exercise — and it is responsive for free.

### Totems are furniture, not inventory

Two advertising totems sit on the franja band, on the same table row the two Platinos are
declared on, and each is exactly the footprint of a Plata stand — one slot square, `2, 2`
cells. That last part is the whole problem: **a totem is one declaration away from being
`plata`, and it must not take that step.**

| | A fifth `StandCategory` | A totem in `plata` | `TOTEMS` |
|---|---|---|---|
| `_categoriesMatchTariff` (compile time) | **fails** — `Exact<>` collapses to `never` | passes | unaffected |
| Guard 1 (names vs `STAND_PRICING`) | **throws** | passes | unaffected |
| Guard 2 (`built > tier.slots`) | passes — it iterates the *tariff*, so an extra key is never read | passes | deliberately absent |
| Guard 3 (`cell` vs `CELL_SIZE`) | passes, but only by adding a `CELL_SIZE` entry for a non-tier | passes | no cell-size check, and needs none |
| `CATEGORY_TOTALS.plata` | — | **66**, not 64 | untouched at 64 |
| Panel `Disponibles` | 117 | **117**, with nothing thrown | untouched at 115 |
| Remaining sponsor Plata | 12 | 10 | untouched at 12 |
| In the category filter | a fifth chip nobody can buy | a Plata stand that is not one | **no** |

Both wrong columns reach the same **117**, which is the point: the difference is not the
number, it is whether anything tells you. A fifth category is a mistake you make once and
find out about immediately — a type error and a thrown guard, in the same build. `plata` is a
mistake you make and never find out about, because the only thing it breaks is the number a
sponsor reads as "what is left for me", and nothing in the app derives that number from
anything but itself. Two advertising structures that nobody is selling would quietly consume
two of the twelve Plata still owed to sponsors. **The panel numbers are the product here**, so
they have to keep meaning "sponsor stands sold and held" — which is worth saying plainly
because the guard set cannot enforce it. Guards check what is *declared*; the thing being
protected here is a number nobody declared.

So `TOTEMS` is a collection of `{ id, cell }` and nothing else — no `category`, no `price`, no
`status`, and therefore no path into `STANDS`, `CATEGORY_TOTALS`, `STATUS_COUNTS`, the
filters, the panel or the deep link. The absence is the feature: a totem is a thing that is
on the floor, and the type is the reason it can never be counted as one that is for sale. The
only enforcement it needs is that nothing is *missing* — so Guard 4 checks its bounds and
Guard 5 checks it against stands, zones and the other totem, and there is no tariff guard,
because a guard asserting what a non-sponsor is not worth would be the second way of saying
the same thing.

**Placement, in both frames.** Offsets are counted from a Platino's **left** column — one base
for both totems, which is the whole point of stating it. The same convention put the second
Platino 13 columns after the first (`3 + 13 = 16`):

| | Table frame | Visual column | Slot | Cells |
|---|---|---|---|---|
| First Platino | cols 0–1, filas −6…−5 | 3–4 | `c3r4` | `4, 6, 4, 4` |
| **First totem** | **col 5, fila −6** — 5 to the right | **8** | `c8r4` | `14, 6, 2, 2` |
| Second Platino | cols 13–14, filas −6…−5 | 16–17 | `c16r4` | `30, 6, 4, 4` |
| **Second totem** | **col 17, fila −6** — 4 to the right | **20** | `c20r4` | `38, 6, 2, 2` |

The second totem is a human placement, not a computed one: it was moved from table col 16 to 17
after this table was first written, and the doc was the thing that failed to follow. `TOTEM_SLOTS`
is the only place either totem's column is written, and the rule that keeps this table honest
is in [Numeric claims are re-derived, not re-typed](#numeric-claims-are-re-derived-not-re-typed).

Both are declared through `frontTotem`, which is `tableToSlot` — the same single conversion
`frontBlock` uses, extracted so the two share it rather than each restating
`+ VIP_COLUMNS / + STAND_ORIGIN_ROW`. Writing `column: 8, row: 4` by hand is the mistake this
module exists to prevent, and a totem is not an exemption from that.

**Why `Totem` has no `geometry` field.** `Stand` stores one because the tiler emits 115 of
them from a handful of blocks, so projecting once at build time is real work saved on every
render. A totem is one rectangle declared once, and `PlanTotem` calls `gridToPercent(totem.cell)`
exactly as `PlanZone` calls `gridToPercent(zone)`. Storing a second copy of a rect that is
already the first would be a field to keep in sync for no gain, and the one piece of this
render the doc's own rule is aimed at is two rects that disagree. `Totem` therefore lives in
`floorplanStands.ts` and not `floorplanLayout.ts`: it is a thing on the floor, not a shape of
the hall, and the layout module's contract is that it knows nothing about what stands on it.

**Rendering.** `PlanTotem` follows `PlanZone`'s structure — absolutely positioned, `gridToPercent`
- driven — with five deliberate differences. It is `role="img"`, not `role="group"`: a zone is
a region to be read, a totem is a marked object standing on it. It carries no visible text,
because two cells is a thirtieth of the plan's width and the label would be unreadable at every zoom
the canvas offers, so `TOTEM_LABEL` is the accessible name and nothing more. And it takes no
handlers at all — no `onClick`, no hover, no tooltip, no focus ring — because everything a
pointer responds to reads as *reservable*, which is the one thing a totem is not. It carries
`pointer-events-none` as well, which is structural rather than tidy: it keeps the layout
honest in the two states a guard cannot cover at all. A totem that overlaps a stand is a
build-time failure (guard 5), but a totem that only *looks* like it overlaps after a responsive
re-scale would ship, because the grid is fixed and the container is not — and a totem that
swallowed a stand's hit area would take that stand's click with it. The `pointer-events-none`
is the rendering-level half of a check that has no rendering-level half in code. Its colour is
the only violet on the plan, so it cannot be mistaken
for a tier colour or for a zone's near-invisible field.

## Tradeoffs and known limits

### The count drift is deliberate

`STANDS.length` is **115**, not 130, and that is correct for the regions specified so far. The
copy was deliberately **not** made to follow:

| Surface | Reads | Source |
|---------|-------|--------|
| Panel stats, total row | `130` | `TOTAL_STANDS`, tariff-derived |
| Panel stats, `Disponibles` | `115` | `STATUS_COUNTS`, data-derived |
| Filter count line | `115 de 130 stands` | `visibleCount` / `TOTAL_STANDS` |
| Section subtitle | `130 espacios` | a literal |

The panel therefore shows `Disponibles 115` right above `Total de stands 130`. **Leave it.**
The hall is being specified region by region; showing a visitor "115 stands" mid-build is
worse than a known drift, and the two numbers reconcile when the remaining regions land.
Both literals stay literals — nothing here should start deriving the metric from the data.

The running total across the regions specified so far:

| Tier | Built | Tariff | Remaining |
|------|-------|--------|-----------|
| Platino | 10 | 10 | **0** |
| Oro | 20 | 20 | **0** |
| Plata | 64 | 76 | 12 |
| Bronce | 21 | 24 | 3 |
| **Total** | **115** | **130** | **15** |

**Oro and Platino are both finished.** The rest of the tarifa is 15 stands, 12.75 slots. The stand area is
cells cols 6–59 × rows 0–31 with the entrance row at 16–17 left out — so the regions that follow
are bounded by the tariff and by the shape asked for, not by the floor.

**Free stand area: 282.75 slots.** The stand floor is 27 columns × 16 rows = **432 slots** —
8 of franja, 1 of front row, 6 of main floor and 1 of bottom band. It excludes the entrance row
and the margin row, which are circulation, and the 3 VIP columns, which are a zone. The seven
tier columns use 132
(60 plata + 20 oro × 2 + 8 platino × 4), the east-edge partial column adds 3, the front row
adds 1, the two bronze strips add 5.25 (twenty-one cells) and the franja's two Platinos add
  8, for **149.25 used** and **282.75 free**. Every figure here is
  asserted from `STANDS` rather than written by hand, so it cannot go stale the way the
  numbers it replaced did.

**This file previously said 405 / 255.75 / 243, and all three were wrong, in one specific
way.** The old stand area was 27 × 15 = 405 — it excluded the bottom band — while the 149.25
"used" figure included the 21 bronze cells that sit *in* that band. The bronze was subtracted
from an area that never contained it, which understated free by exactly the band's 27 slots.
The error survived because the two figures were derived by different routes and nothing
compared them. The bottom band holds 5.25 slots of stands, so it is stand floor by the
definition used everywhere else here; excluding it was the mistake, and the honest number is
the one that counts it. A previous revision had the same shape of error one step further back,
when the band was genuinely empty — the arithmetic was right by accident and stopped being
right the moment a stand landed in it.

The two totems take **two slots of franja floor that these figures do not count**, and that
is deliberate rather than an oversight. `free` is derived from `STANDS` and means *floor not
yet committed to a stand*; `need` is what the remaining tariff still demands, and a totem is in
neither, because it is in no tariff. The margin rule above assumes every placement is a
tariffed stand, so it does not cover this case and does not apply to it — the question it
answers is whether the 12.75 slots still owed can be placed, and 2 slots against a 270 margin
cannot change that answer. The honest phrasing is "280.75 slots of unclaimed floor, 282.75 of
which are also tariffable"; anyone who needs the physical number should count the totems
rather than read them out of this one.

The remaining tariff is **15 stands — 0 platino, 0 oro, 12 plata, 3 bronce — which is 12.75
slots, not 15** (12 × 1 + 3 × ¼). Against 282.75 free that leaves a **margin of 270 slots**,
which moved not at all while two Platinos were placed, exactly as the rule above requires.
Both expensive tiers are now closed out, so what is left is a single tier that fits
27-to-a-row: the 12 Plata go down as full rows and the three Bronce take the cell-level
row they already have at the bottom. The two totems are outside this arithmetic entirely —
see [the note above](#totems-are-furniture-not-inventory) — so none of these figures moved.

### The franja's two Platinos, and why they are where they are

Rows **−6 and −5**, and the vertical arithmetic is the whole reason it reads the way it
does: `FRANJA_ROWS` is 8, the stand takes 2, and three rows above plus three below is the
entire franja.

Horizontally it straddles the boundary between the VIP strip and the common floor — visual
column 3, the last of the three VIP columns, and visual column 4, the first common one. In
the table frame that pair is **columns 0 and 1**, because the frame's column 1 is the first
stand column and column 0 is the VIP strip beside it. So this is the one block in the
module declared at an out-of-frame table column, and it is deliberate: table column 1 would
be two columns further into the common zone and would leave the boundary it exists to
straddle standing empty.

That stand therefore occupies two of the six cells in the VIP strip's third column. The
strip is documented as doubling as the aisles, so this is a real cost — half a column of
circulation — and it is why only one stand sits on the boundary: there is one boundary to
straddle and it is taken.

The second one is on the **same two rows, 13 columns to the right** — table col 13, visual
column 16 — leaving eleven columns between the two, visual columns 5 to 15, one of which
carries a totem. Both sit on the band the user
asked for, so the 3/3 above and below describes the pair, not each stand alone.

Both being on one row is what the geometry allows rather than what the room asks for: a
Platino is two rows deep and the franja is eight, so a second row of Platinos would leave
either one row above or one row below instead of three and three. Putting them side by side
keeps the 3/3 and costs eleven free columns, which the area figures already had spare.

It is declared as `frontBlock("platino", 0, -6, 2, 2)` rather than as raw slot coordinates,
because `tableToSlot` is the only place a table coordinate becomes a slot. Writing
`column: 6, row: 4` by hand would be the mistake this module is built to prevent — the
numbers would look right today and silently mean something else the first time the franja
changes height.

`frontPlata` is a `frontBlock("plata", …, 1, 1)` plus a hand-written `expected: 1`, so both the
single-plata and the two-by-two case go through the same conversion — see
[Guard 6](#guard-6-reads-the-declaration-because-the-other-five-cannot) for why that one number
is written rather than derived. The two **totems** on this same band go
through `frontTotem`, which is the other wrapper over that one conversion — see
[Totems](#totems-are-furniture-not-inventory).

### Why the catalogue left `floorplanLayout.ts`

The file hit the 300-line cap the moment a second helper went in, which it had four lines
of headroom left. So the module was cut along the one seam that already existed: **the
shape of the hall** (bands, sizes, the table frame, `ZONES`) stays in `floorplanLayout.ts`,
and **what stands on it** (tier columns, block helpers, `BLOCKS`) moved to
`floorplanStands.ts`. `floorplanStands` imports the geometry and the geometry never imports
the stands, so the arrow points one way and a stand moving cannot drag the hall with it.
`floorplanData` imports `BLOCKS` from the new module and re-exports it, so no consumer's
import changed.

163 and 279 lines today, against the same 300-line cap. The cap was not the reason the seam is
here — the seam was already there — but it stopped being optional. `floorplanStands.ts` has about
twenty lines of headroom left, so the next region is the one that will force a second seam;
`floorplanStands.ts:279` is the number to re-check when that happens, not a fact to trust.

### Other limits

- **`SlotRect` and `GridRect` are structurally identical, so TypeScript cannot catch a
  region declared in the wrong unit.** They differ only in convention — 1-indexed slots vs
  0-indexed cells — and both are `{ column, row, columns, rows }`, so passing a cell rect
  to `slotsToCells` compiles and silently shifts the region by one slot. That is exactly
  the bug the slot vocabulary exists to prevent, so it is worth restating the rule on every
  edit: **`ZONE_SLOTS`, `BLOCK_SLOTS` and `TOTEM_SLOTS` are slot coordinates, 1-indexed;
  `CELL_BLOCKS` is cell coordinates, 0-indexed.** If a future refactor wants the compiler to
  enforce it, brand the two shapes with a literal tag field and convert on a `switch`.

- **The count guard is an upper bound, not an equality.** It used to throw when a
  tier built anything other than `tier.slots`, which was correct for a fully generated
  layout and is wrong for a partially specified one — it would have failed the build on every
  run. It now throws only when a tier builds **more** stands than the tariff
  sells, which is the half of the invariant that is still real. **It must stay `>` and not
  become `===` until the layout is final**, at which point the two halves are the same
  assertion. A second guard checks the other thing the old one could not see: that every
  stand's cell matches its tier's `CELL_SIZE`, so a tiler bug cannot emit an `oro` at 2 × 2.
- **Bounds and overlap are now guarded, after being script-only.** Both were real gaps: with
  more than a handful of `BLOCK_SLOTS` rectangles — the layout is well past that — two entries
  sharing cells compile, tile and render as two layers of hotspots stacked on one spot, and
  the 15% `CELL_FILL_RATIO` gap is a paint-time transform that cannot see it. The 27 → 30
  widening made bounds a live risk too — a block declared against the old width is now out of
  bounds, and it would have rendered as a hotspot positioned off the plan where nothing could
  see or click it. Two guards close
  this: every stand, zone and totem is
  checked against `CELL_COLUMNS` × `CELL_ROWS`, and every region is checked against every
  other region. The pairwise part is 7,137 comparisons on 115 stands, 3 zones and 2 totems — a
  few microseconds, once, at module evaluation.
- **No declaration was guarded at all, until Guard 6.** The five guards above all read the
  tiler's output, so the one mistake they structurally cannot see is a rectangle that does not
  tile into the number of stands it occupies — the failure is in the *declaration*, and the
  declaration was never compared to anything. See
  [Guard 6](#guard-6-reads-the-declaration-because-the-other-five-cannot).
- **The `/partners` segment has an error boundary; the app has no root one.**
  `src/app/partners/error.tsx` covers the section only, because `getTierPrice` throws during
  render when a tier name stops matching and an uncaught client error on a statically
  prerendered marketing route would otherwise replace hero, sponsors, participate, assets,
  process, policy and the contact form. A root `error.tsx` or `global-error.tsx` is
  deliberately absent: those would trade a failed section for a failed page. A real guard is
  not a recovery path, which is why both exist. The boundary's copy is inline, not in
  `floorplanCopy.ts`, because the fallback must not import from the module graph that may have
  thrown.
- **`PLACEHOLDER_MODE` is `true` and the draft notice has been removed from the map.** It
  used to also arm a `throw` in production, because shipping the mismatched PNG would have
  drawn a floor plan that did not exist. With the image gone there was nothing to
  misrepresent, so the guard was removed. The notice then went the other way: the user asked
  for a clean map surface, and it was the last disclosure saying the distribution was
  provisional. **`PLACEHOLDER_MODE` and `DRAFT_NOTICE` are still exported but no longer
  imported by anything** — the string is kept so the disclosure comes back in one edit
  rather than being rewritten, and the flag is kept so restoring it is a single flip. Delete
  both once the distribution is real. **The consequence, stated plainly: nothing in the app
  now marks the layout as provisional, while 15 tariffed stands are still unplaced.** That
  is a commercial decision, not an engineering one, and it reverses with one flag.
- **The plan is an abstraction, not a venue map.** With no image, a sponsor cannot match a
  square to a physical position in the hall. If the venue ships a real map, re-adding an
  image layer means the grid must be calibrated against it — see the grid section above.
- **`Lowercase<PricingTier["name"]>` cannot be used here.** `STAND_PRICING` is not
  `as const`, so `name` widens to `string` and the derived union collapses to `string`,
  which would also make `Exact<>` evaluate to `never`. `TariffTierName` mirrors the tariff
  for the compile-time `Exact<>` check, and the guard at the bottom of
  `floorplanData.ts` checks that mirror against the real `STAND_PRICING` on every import.
- **The metrics box that carried a literal `"130"` is gone from the map.** Spec §9.10 asked
  for exact value/label pairs, and `floorplanCopy.ts` must not import from `floorplanData.ts`
  at runtime or the two modules form a TDZ cycle. The tariff-derived `TOTAL_STANDS` is the
  numeric invariant.
- **No idle pulse in the heading.** The other sections animate `text-shadow` forever;
  §7.4 requires any loop to be gated on reduced motion, and a loop per hotspot on a phone is
  the wrong trade for a decorative glow, so the glow here is a static text shadow.
- **The touch target is a `::after` pseudo-element, and it is still under 44 px.** §8.3
  rejects `min-h-11 min-w-11` on the button because the percent widths are cell geometry — a
  minimum would widen a stand past its cell. The expansion is therefore
  `after:absolute after:-inset-1.5 pointer-coarse:after:-inset-2`, which adds 6 px on
  desktop and 8 px on touch. A plata cell at a 360 px viewport is ~12 px wide, and `bronce`
  is ~6 px, so the pseudo-element is the only thing keeping those tappable at all. The slot
  correction halved both, and the 27 → 30 widening halved them again: the hall is now 60
  cells wide, so every cell is a sixtieth of the container width — a sixtieth horizontally and
  a thirty-sixth vertically, which is what the 5:3 aspect means. Reaching 44 px there needs a
  ±16 px inset, which would overlap
  neighbouring stands and steal their taps. Left as a documented exception, and it worsens
  as the grid gets denser: raising it needs either a coarser grid or a smaller cell.
- **A 5:3 canvas still scrolls on a phone.** Following the grid first made the plan 3:1, then
  the franja brought it to 2:1 and then to 5:3 — eighteen rows against fifteen is 20% taller,
  so eight bands are legible without zooming.
  That is the better half of the trade and the worse one is unchanged: overlays are sized
  against the canvas, so a taller aspect moves the zoom cluster and the tooltip down with
  the stands. Removing the legend, the metrics box and the draft notice resolved the
  collision that used to push the notice over the stand rows, so what is left is the zoom
  cluster and the tooltip. The grid aspect is not negotiable, but the chrome has room to
  breathe, and a responsive pass is cheap rather than load-bearing.
- **The tooltip is a mouse affordance only**, so `hoveredId` exists for it alone. Touch users
  get the same information from the panel on tap, and the alternative — a tap-and-hold bubble
  — collides with the page scroll that the same gesture is expected to perform.
- **Zoom is not reachable by touch pinch at 1 → 2.5.** §8.4 lists wheel/pinch together, and
  the two cannot both hold here: panning by drag requires Framer Motion, which claims
  `touch-action: none`, and §8.3 requires `pan-y pinch-zoom` to survive. Desktop gets
  `ctrl`/`⌘` + wheel and drag; touch gets the browser's own pinch on the container. The
  buttons cover zoom for everyone, including keyboard and touch.
- **The 70/30 split landed in slice 3, not slice 4.** §10's slice-2 note deferred it until
  "a panel exists to sit in the second column", but the panel *is* slice 3, so following
  that literally would have shipped a panel in a placeholder position and moved it next
  slice. `grid-cols-[70fr_30fr]` with `gap-8`, the panel column `lg:sticky lg:top-24`, and
  the panel at its natural content height — a stretched card taller than the viewport would
  pin its own bottom out of reach, which defeats the sticky.
- **The panel's stats block iterates `STAND_STATUSES`,** not a hand-written row list, so a
  fourth state is one array edit. The `total` row is the only one that is not a state, and
  it is compared by key rather than by status.
- **The price strip's `Desde` prefix renders on all three stages,** not only the active one.
  It is a price floor at every stage, and special-casing the active row would be exactly the
  kind of branch C12 exists to prevent.
- **`?stand=` cannot be honoured in the prerendered HTML.** The route is static, and
  `useSearchParams` resolves on the client, so a shared link renders the initial panel and
  then selects the stand after hydration. Making it server-visible would mean reading
  `searchParams` in `page.tsx` and giving up the static route.
- **The CTA is a single plain anchor** to `#contacto`, following the `hero.tsx:139`
  precedent. It is deliberately not pre-filled or per-stand; §9.7 records a richer CTA as a
  known future improvement, and keeping it in one place is what makes that upgrade a
  one-line change.
- **Dependency direction:** `floorplanData` → `floorplanLayout`, `floorplanStands` and →
  `floorplanCopy` at runtime (rectangles, locations, labels); `floorplanLayout` imports
  neither, and neither does `floorplanStands` — the arrow between them points one way, from
  geometry to contents. `floorplanCopy` → `floorplanData` type-only, which is erased.
  `floorplanGuards` → layout and data type-only, also erased. **Never invert any of them:**
  the layout must stay ignorant of price and status, the guards must stay ignorant of the
  data, and **`floorplanStands` must stay ignorant of both** — that is the constraint the
  totem collection exists to satisfy, and the first thing to break if someone imports a tier
  or a status into that module is the sponsor counts.

### Verified, not assumed

A guard that has never been seen to fire is a claim. Each of these was checked by making it
fail on purpose, not by reading the source and agreeing with it.

| Check | How it was proved |
|---|---|
| Guards survive bundling | Each of the seven distinct thrown messages was grepped in the production build output. Baseline was zero JS hits; after the change each is present, which is what "ungated" has to mean in practice. Exclude `.next/dev` — those are stale dev-server artefacts, not the bundle. |
| Guard 6 catches a narrow band | `narrowColumn(10, …)`'s `2` temporarily changed to `1`. The build fails with `Block emission drift: narrow-b10 declares 1, emitted 0`, which also proves guards 1–5 passed first — they run earlier in the same call. |
| Guard 6 catches a wide band | The same constant changed to `3`: `oro-c10r11 declares 3 stands, emitted 2`. The Platino band behind it drifts to a fractional `1.5`. |
| Guard 6 alone is what fails | With the corruption still in place, guard 6's throw replaced by a log, the build succeeds and prints 15 drifting blocks — so nothing else in the module is coincidentally sensitive to that width, and the failure is attributable to guard 6 and not to a side effect of the edit. |
| Bounds guard runs in production | A narrow block's column temporarily moved out of `CELL_COLUMNS`. `next build` fails, rather than shipping a hotspot nobody can see or click. |
| Counts are unchanged | The aggregates were printed from a temporary `console.log` at module scope and removed: 115 stands, 64 Plata / 20 Oro / 10 Platino / 21 Bronce, 115 against 130 tariff, 15 unplaced, 12.75 slots, 149.25 used, 27 × 16 = 432 stand floor, 282.75 free, 270 margin, totems at cells `14, 6` and `38, 6`, both 2 × 2. |
| The area figures were not | The same printout reported the bottom band as 5.25 used slots while the stand-floor formula excluded it, which is what caught the 405 / 255.75 / 243 error above. The numbers in this file are the corrected ones. |
| Lint baseline unchanged | `npm run lint` reports the same 6 pre-existing problems (2 errors, 4 warnings), none in this module. |
| Types | `npx tsc --noEmit` passes. |

Every one of those temporary edits was reverted, and `git diff` is the record of that: the only
floorplan code in it is the ungating, guard 6, the `expected` declarations and the new error
boundary. A proof that leaves its evidence in the diff is not a proof.
