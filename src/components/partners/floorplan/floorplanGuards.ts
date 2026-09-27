import { STAND_PRICING } from "@/components/partners/participate/participateData"
import type { GridRect, GridSize, Stand, StandCategory, Totem, Zone } from "./floorplanData"

/** One block's declared output next to the output it actually produced. Passed in rather than
 *  re-tiled here: `tileRect` lives in the data module, and a second copy of it would give this
 *  guard an answer to compare against that can drift from the real one. */
export interface BlockTally {
  id: string
  expected: number
  emitted: number
}

/** Everything the guards read, passed in so this module never imports floorplanData at
 *  runtime — the type-only import above is erased, which is what keeps the dependency a
 *  one-way edge and avoids a TDZ cycle with the data module's own import of this file. */
export interface FloorplanGuardInput {
  categories: readonly StandCategory[]
  cellSize: Record<StandCategory, GridSize>
  grid: GridSize
  stands: readonly Stand[]
  zones: readonly Zone[]
  totems: readonly Totem[]
  blocks: readonly BlockTally[]
}

/** Half-open overlap: touching edges do not collide, so two blocks that share a boundary
 *  cell line are legal. Only a cell genuinely covered twice is a collision. */
const overlaps = (a: GridRect, b: GridRect) =>
  a.column < b.column + b.columns &&
  b.column < a.column + a.columns &&
  a.row < b.row + b.rows &&
  b.row < a.row + a.rows

const describe = ({ column, row, columns, rows }: GridRect) =>
  `${column},${row} ${columns}x${rows}`

const assertInBounds = (label: string, rect: GridRect, grid: GridSize) => {
  if (rect.column + rect.columns > grid.columns || rect.row + rect.rows > grid.rows) {
    throw new Error(
      `Out of bounds: ${label} at ${describe(rect)} does not fit the ` +
        `${grid.columns}x${grid.rows} cell grid`,
    )
  }
}

/** Drift guards, run at the bottom of the data module on every build and on every page load.
 *  Every one of them catches a mistake that compiles, tiles and renders as a plausible-looking
 *  plan — the paint-time `CELL_FILL_RATIO` gap is a transform, not a collision check, so
 *  nothing in the runtime geometry can see an out-of-bounds or double-booked cell. A throw
 *  here is meant to fail the build: these are pure derivations, so a layout that throws while
 *  the route prerenders is a build that never ships and an error no user ever reaches. */
export const assertFloorplanInvariants = ({
  categories,
  cellSize,
  grid,
  stands,
  zones,
  totems,
  blocks,
}: FloorplanGuardInput): void => {
  // Guard 1 — name level. The `Exact<>` check at the top of the data module proves only
  // that two hand-written lists agree; this proves the mirror still matches the tariff.
  const tariffNames = STAND_PRICING.map((tier) => tier.name.toLowerCase()).sort()
  const categoryNames = [...categories].sort()
  if (tariffNames.join("|") !== categoryNames.join("|")) {
    throw new Error(
      `Category names drifted from the tariff: STAND_CATEGORIES has [${categoryNames}], ` +
        `STAND_PRICING has [${tariffNames}]`,
    )
  }

  // Guard 2 — count level. The hall is specified region by region, so a tier is
  // legitimately under-built until its blocks exist; only overselling the tariff is a bug.
  // `>`, not `===`, until the layout is final.
  const byCategory = stands.reduce<Record<string, number>>((acc, stand) => {
    acc[stand.category] = (acc[stand.category] ?? 0) + 1
    return acc
  }, {})
  for (const tier of STAND_PRICING) {
    const built = byCategory[tier.name.toLowerCase()] ?? 0
    if (built > tier.slots) {
      throw new Error(`Block table drift: ${tier.name} builds ${built}, tariff allows ${tier.slots}`)
    }
  }

  // Guard 3 — cell size, so a tiler bug cannot emit an `oro` at 2x2.
  for (const stand of stands) {
    const size = cellSize[stand.category]
    if (stand.cell.columns !== size.columns || stand.cell.rows !== size.rows) {
      throw new Error(
        `Cell size drift: ${stand.id} is ${stand.cell.columns}x${stand.cell.rows}, ` +
          `${stand.category} is ${size.columns}x${size.rows}`,
      )
    }
  }

  // Guard 4 — bounds. A region past the grid edge still compiles, still tiles and still
  // renders; the hotspot is simply positioned off the plan, where it cannot be seen or
  // clicked. Growing the hall is one constant, and a block declared against the old width
  // is exactly how that constant goes stale.
  for (const stand of stands) assertInBounds(stand.id, stand.cell, grid)
  for (const zone of zones) assertInBounds(`zone ${zone.id}`, zone, grid)
  for (const totem of totems) assertInBounds(totem.id, totem.cell, grid)

  // Guard 5 — overlap. Nothing outside the layout module compares regions, so two entries
  // covering the same cells render two layers of hotspots stacked on one spot. The layout is
  // far past the size where that stops being hypothetical, and the count keeps growing.
  for (let i = 0; i < stands.length; i += 1) {
    for (let j = i + 1; j < stands.length; j += 1) {
      if (overlaps(stands[i].cell, stands[j].cell)) {
        throw new Error(
          `Stand overlap: ${stands[i].id} at ${describe(stands[i].cell)} and ` +
            `${stands[j].id} at ${describe(stands[j].cell)} share a cell`,
        )
      }
    }
  }

  for (const stand of stands) {
    for (const zone of zones) {
      if (overlaps(stand.cell, zone)) {
        throw new Error(
          `Zone overlap: ${stand.id} at ${describe(stand.cell)} overlaps zone ` +
            `${zone.id} at ${describe(zone)}`,
        )
      }
    }
  }

  // A totem is a region too, so it takes part in the same comparisons: it is painted where a
  // stand or a zone is painted, and a collision would read as one of them being double-drawn
  // rather than as a mistake. There is deliberately no category or tariff check for it — a
  // totem is not inventory, so there is no count to hold to and a tier it cannot be would be
  // a second way of saying it is not a stand.
  for (let i = 0; i < totems.length; i += 1) {
    const totem = totems[i]
    for (const stand of stands) {
      if (overlaps(totem.cell, stand.cell)) {
        throw new Error(
          `Totem overlap: ${totem.id} at ${describe(totem.cell)} overlaps stand ` +
            `${stand.id} at ${describe(stand.cell)}`,
        )
      }
    }
    for (const zone of zones) {
      if (overlaps(totem.cell, zone)) {
        throw new Error(
          `Totem overlap: ${totem.id} at ${describe(totem.cell)} overlaps zone ` +
            `${zone.id} at ${describe(zone)}`,
        )
      }
    }
    for (let j = i + 1; j < totems.length; j += 1) {
      if (overlaps(totem.cell, totems[j].cell)) {
        throw new Error(
          `Totem overlap: ${totem.id} at ${describe(totem.cell)} and ` +
            `${totems[j].id} at ${describe(totems[j].cell)} share a cell`,
        )
      }
    }
  }

  // Guard 6 — declared emission, and the only guard that reads the declaration instead of its
  // output. The other five inspect `stand.cell`, which is what the tiler produced, so all of
  // them sit downstream of the block: a span that does not tile evenly into its tier's cell
  // emits fewer stands than the rectangle claims, and fewer cells cannot overlap, cannot leave
  // the grid, are still the right size and are still under the tariff. Every one of them
  // passes, and the plan renders as a hall with a rectangular hole in it that the remaining
  // 15 tariffed stands read as an ordinary partial build-out. It is an equality and never a
  // ceiling — a ceiling holds for every under-built region, so it catches nothing — and a
  // block that emits nothing at all is a mistake whatever the arithmetic says, because a
  // block in `BLOCKS` is a region that holds stands. A partial has to be partial of something.
  for (const block of blocks) {
    if (block.emitted !== block.expected || block.emitted < 1) {
      throw new Error(
        `Block emission drift: ${block.id} declares ${block.expected} stands, ` +
          `emitted ${block.emitted}`,
      )
    }
  }
}
