import { STAND_PRICING } from "@/components/partners/participate/participateData"
import { CATEGORY_LABEL, LOCATIONS } from "./floorplanCopy"
import { assertFloorplanInvariants, type BlockTally } from "./floorplanGuards"
import { BLOCKS, TOTEMS } from "./floorplanStands"
import { WALLS } from "./floorplanWalls"
import {
  CELL_COLUMNS,
  CELL_ROWS,
  CELL_SIZE,
  STAND_CATEGORIES,
  type Block,
  type GridRect,
  type GridSize,
  type StandCategory,
  type StandGeometry,
  ZONES,
  gridToPercent,
} from "./floorplanLayout"

/** The catalogue: what a stand is, what it costs, whether it is taken. The floor itself lives
 *  in `floorplanLayout` and its structure in `floorplanWalls` — this module only turns
 *  rectangles into priced, labelled, filterable stands. Both are re-exported below so
 *  consumers keep one import site; the two export disjoint names, so the barrel has no
 *  collision to resolve and nothing to shadow. */
export * from "./floorplanLayout"
export * from "./floorplanWalls"
export { BLOCKS, TOTEMS, type Totem } from "./floorplanStands"

/** Mirrors the `name` of every `STAND_PRICING` entry. The tariff array is not `as const`,
 *  so `PricingTier["name"]` widens to `string` and cannot produce a literal union at the
 *  type level. This mirror is hand-written, so the `Exact<>` check below proves only that
 *  the two hand-written lists agree — it cannot detect a rename in the tariff itself. The
 *  runtime guard at the bottom of this file covers that case by matching on tier name. */
type TariffTierName = "Platino" | "Oro" | "Plata" | "Bronce"

export type StandCategoryName = StandCategory

export const STAND_STATUSES = ["disponible", "reservado", "vendido"] as const
export type StandStatus = (typeof STAND_STATUSES)[number]

export const DEFAULT_STATUS: StandStatus = "disponible"


export type PriceStage = "earlyBird" | "presale" | "normal"

/** Every stage the panel renders, in tariff order. Iterated so the price strip is
 *  driven by the type instead of a literal array in JSX. */
export const PRICE_STAGES = ["earlyBird", "presale", "normal"] as const satisfies readonly PriceStage[]

/** Bidirectional-extends equality. `never` in the type position fails assignment. */
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never
export const _categoriesMatchTariff: Exact<StandCategoryName, Lowercase<TariffTierName>> = true

export interface Stand {
  id: string
  label: string
  category: StandCategory
  status: StandStatus
  areaM2: number
  /** Whether `areaM2` is still the unconfirmed figure. Carried on the stand rather than
   *  re-derived by each of the three surfaces that print an area, so a surface cannot
   *  publish a provisional number without also being able to see that it is one. */
  areaProvisional: boolean
  location: string
  /** The stand's literal cell, in cells. The source of truth for its size. */
  cell: GridRect
  /** The same cell projected to percent. What the hotspot layer positions by. */
  geometry: StandGeometry
}

/** Areas the commercial team has not confirmed. Partial rather than folded into
 *  `TIER_AREA_M2` inline so the unconfirmed claim stays greppable and so the number a
 *  surface publishes and the fact that it is unconfirmed come from the *same* declaration —
 *  correcting the bronze figure is one edit to one constant, and confirming it is the
 *  deletion of the key. `bronce` is a quarter-slot stand, so `4` is a value copied from
 *  plata's cell rather than a genuine measurement, and the real number is the user's to
 *  give: nothing here may invent it. */
export const PROVISIONAL_AREA_M2: Partial<Record<StandCategory, number>> = { bronce: 4 }

const TIER_AREA_M2: Record<StandCategory, number> = {
  platino: 36,
  oro: 18,
  plata: 9,
  bronce: PROVISIONAL_AREA_M2.bronce ?? 0,
}

/** The master disclosure switch, and the only thing that arms a qualifier anywhere in the
 *  module. `false` withdraws every provisional caveat at once and no other edit. */
export const PLACEHOLDER_MODE = true

const isProvisionalArea = (category: StandCategory): boolean =>
  PLACEHOLDER_MODE && PROVISIONAL_AREA_M2[category] !== undefined

export const ACTIVE_STAGE: PriceStage = "earlyBird"

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

export const TOTAL_STANDS = STAND_PRICING.reduce((sum, tier) => sum + tier.slots, 0)

const usd = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export const formatPrice = (amount: number) => usd.format(amount)

/** Row-major: top to bottom, then left to right within each row of cells. A cell is
 *  emitted only where its whole size fits the block, so a span that is not a multiple of
 *  the cell leaves the remainder as open floor instead of squeezing a smaller stand in. */
const tileRect = ({ column, row, columns, rows }: Block, size: GridSize): GridRect[] => {
  const cells: GridRect[] = []
  for (let y = row; y + size.rows <= row + rows; y += size.rows) {
    for (let x = column; x + size.columns <= column + columns; x += size.columns) {
      cells.push({ column: x, row: y, columns: size.columns, rows: size.rows })
    }
  }
  return cells
}

const buildStands = (): { stands: Stand[]; blocks: BlockTally[] } => {
  const sequence: Record<StandCategory, number> = { platino: 0, oro: 0, plata: 0, bronce: 0 }
  const stands: Stand[] = []
  const blocks: BlockTally[] = []
  for (const block of BLOCKS) {
    const cells = tileRect(block, CELL_SIZE[block.category])
    blocks.push({ id: block.id, expected: block.expected, emitted: cells.length })
    for (const cell of cells) {
      sequence[block.category] += 1
      const number = String(sequence[block.category]).padStart(2, "0")
      stands.push({
        id: `${block.category}-${number}`,
        label: `Stand ${CATEGORY_LABEL[block.category]} ${number}`,
        category: block.category,
        status: DEFAULT_STATUS,
        areaM2: TIER_AREA_M2[block.category],
        areaProvisional: isProvisionalArea(block.category),
        location: LOCATIONS[block.category],
        cell,
        geometry: gridToPercent(cell),
      })
    }
  }
  return { stands, blocks }
}

const built = buildStands()

export const STANDS: Stand[] = built.stands

export const getStandById = (id: string): Stand | undefined =>
  STANDS.find((stand) => stand.id === id)

const groupByCategory = (): Record<StandCategory, Stand[]> => {
  const grouped: Record<StandCategory, Stand[]> = { platino: [], oro: [], plata: [], bronce: [] }
  for (const stand of STANDS) grouped[stand.category].push(stand)
  return grouped
}

export const STANDS_BY_CATEGORY = groupByCategory()

export const CATEGORY_TOTALS: Record<StandCategory, number> = {
  platino: STANDS_BY_CATEGORY.platino.length,
  oro: STANDS_BY_CATEGORY.oro.length,
  plata: STANDS_BY_CATEGORY.plata.length,
  bronce: STANDS_BY_CATEGORY.bronce.length,
}

const countByStatus = (): Record<StandStatus, number> => {
  const counts: Record<StandStatus, number> = { disponible: 0, reservado: 0, vendido: 0 }
  for (const stand of STANDS) counts[stand.status] += 1
  return counts
}

export const STATUS_COUNTS = countByStatus()

/** Unconditional, and deliberately so. This used to sit behind `if (DEV)`, where
 *  `DEV = process.env.NODE_ENV === "development"` is inlined to `false` by the bundler in
 *  both graphs — so the call, its import and this whole module were dead-code-eliminated and
 *  `next build`, which runs with `NODE_ENV=production`, validated no geometry at all. The
 *  guards now ship to the browser and run 7,482 comparisons once per page load, in
 *  microseconds. That is the right trade: a false-positive build failure costs one line of
 *  layout arithmetic, a silent wrong sales page costs a sponsor contract, and a throw here
 *  blocks the deploy instead of shipping it. A `prebuild` script was the alternative and was
 *  rejected because the only runtime dependency is `STAND_PRICING`, which drags in nine
 *  `lucide-react` icons and uses the `@/` alias — a zero-dependency runner needs a
 *  leaf-module extraction that is out of scope here. */
assertFloorplanInvariants({
  categories: STAND_CATEGORIES,
  cellSize: CELL_SIZE,
  grid: { columns: CELL_COLUMNS, rows: CELL_ROWS },
  stands: STANDS,
  zones: ZONES,
  totems: TOTEMS,
  blocks: built.blocks,
  walls: WALLS,
})
