import {
  CELL_SIZE,
  OPEN_BOTTOM_ROWS,
  type Block,
  type GridRect,
  type GridSize,
  type SlotRect,
  type StandCategory,
  PLATA_SLOT,
  PREDIO_LEFT_SLOTS,
  STAND_COLUMN_ROWS,
  STAND_MAIN_LAST_ROW,
  STAND_MAIN_ROW,
  STAND_ORIGIN_ROW,
  VIP_COLUMNS,
  slotsToCells,
} from "./floorplanLayout"

/** What is on the floor. `floorplanLayout` owns the shape of the hall — bands, sizes, the
 *  table frame — and this module owns its contents, so a stand is declared against the
 *  geometry rather than beside it. Nothing here computes a size: every rectangle is a region
 *  of a hall that already exists, and the guards in `floorplanData` prove the contents fit. */

type BlockSlot = SlotRect & { id: string; category: StandCategory; expected: number }

/** A block as the catalogue consumes it: the rectangle the tiler reads, plus the number of
 *  stands that rectangle is declared to emit. The two can drift apart — a span that is not a
 *  whole multiple of its tier's cell emits fewer cells than the rectangle claims — and every
 *  other guard still passes, because fewer cells cannot overlap, cannot leave the grid, are
 *  still the right size and are still under the tariff. The plan then renders as a hall with
 *  a rectangular hole in it, and the only party that notices is the sponsor whose stand
 *  vanished. `expected` is the declaration the tiler output is held to. */
export interface DeclaredBlock extends Block {
  expected: number
}

/** Stands a full rectangle emits, derived from its own declared span so the count cannot go
 *  stale against the geometry it describes. Measured in slots, which is the unit every
 *  slot-declared block is written in: the tier's cell is `PLATA_SLOT` cells per side, so a
 *  Bronce cell is half a slot per side and a bronze rectangle has no whole-slot form at all —
 *  that tier is declared in cells instead, and its count is written out by hand. */
const fullSlotRectangle = (category: StandCategory, { columns, rows }: GridSize): number => {
  const cell = CELL_SIZE[category]
  return (columns / (cell.columns / PLATA_SLOT)) * (rows / (cell.rows / PLATA_SLOT))
}

/** A tier and the slot rows of the stand column it occupies. The vertical unit: the hall is
 *  authored band by band, so a region is a column plus a list of these, not a set of
 *  hand-counted rectangles. */
type TierSpan = readonly [category: StandCategory, rows: number]

/** One main-floor column: tiers stacked top to bottom from the first main row, each band
 *  emitted as its own rectangle. Ids derive from the band's position, so moving a column
 *  renames its blocks instead of stranding a hand-written label — and two blocks of one tier
 *  cannot collide, since they may not share a start cell. The spans must sum to
 *  STAND_COLUMN_ROWS: a column that stops short leaves a gap the floor reads as a decision
 *  nobody made. The front row is not part of this — it is filled per column as raw blocks. */
const tierColumn = (column: number, columns: number, tiers: readonly TierSpan[]): BlockSlot[] => {
  const rows = tiers.reduce((sum, [, span]) => sum + span, 0)
  if (rows !== STAND_COLUMN_ROWS) {
    throw new Error(
      `Stand column at slot col ${column} fills ${rows} of ${STAND_COLUMN_ROWS} slot rows`,
    )
  }
  let row = STAND_MAIN_ROW
  return tiers.map(([category, span]) => {
    const block = {
      id: `${category}-c${column}r${row}`,
      category,
      column,
      row,
      columns,
      rows: span,
      expected: fullSlotRectangle(category, { columns, rows: span }),
    }
    row += span
    return block
  })
}

/** Six slot columns — the Plata wall at the west end, the middle column — and two, a bay of
 *  the east run. */
const wideColumn = (column: number, tiers: readonly TierSpan[]): BlockSlot[] =>
  tierColumn(column, 6, tiers)
const narrowColumn = (column: number, tiers: readonly TierSpan[]): BlockSlot[] =>
  tierColumn(column, 2, tiers)

/** The stand floor, in slots. Every region is a column of tiers, so the whole layout is seven
 *  columns and their band lists: adding a region is one line here, and nothing else in the app
 *  knows how the floor is laid out. A position may arrive in the user's frame — counted from
 *  the table, declared at table col 4 row 3 — in which case the hall slot is the table
 *  coordinate + VIP_COLUMNS + PREDIO_LEFT_SLOTS columns, + STAND_ORIGIN_ROW rows. The columns
 *  below are written in that same table frame, one for one, and `tableToSlot` is what puts the
 *  fence margin back in. */
/** Table frame to hall slot. This is the only conversion between the two, so widening the
 *  franja or moving the entrance renumbers the absolute slot rows once, here, instead of
 *  silently shifting positions that were already placed. `PREDIO_LEFT_SLOTS` rides along on the
 *  column, because the user's frame starts at the west wall of the building and the fence is
 *  west of that. Every position the user named goes through it — a stand block, a totem —
 *  because a hand-written `column: 6, row: 4` is the mistake this module exists to prevent. */
const tableToSlot = (tableColumn: number, tableRow: number) => ({
  column: tableColumn + VIP_COLUMNS + PREDIO_LEFT_SLOTS,
  row: tableRow + STAND_ORIGIN_ROW,
})

/** A stand block declared in the user's frame: table column, table row, and its size in table
 *  units — a Platino is 2 × 2, a Plata 1 × 1. Id keeps the absolute slot so it stays unique and
 *  ordered against `tierColumn`'s ids. The franja's two Platinos are full rectangles, so their
 *  count is derived like the rest. */
const frontBlock = (
  category: StandCategory,
  tableColumn: number,
  tableRow: number,
  columns: number,
  rows: number,
): BlockSlot => {
  const { column, row } = tableToSlot(tableColumn, tableRow)
  return {
    id: `${category}-c${column}r${row}`,
    category,
    column,
    row,
    columns,
    rows,
    expected: fullSlotRectangle(category, { columns, rows }),
  }
}

/** The one-stand block the two partial regions use: the east-edge column, whose empty table
 *  rows are a spec rather than a remainder, and the front row, which is still being specified
 *  one stand at a time. Each of those is a full 1 × 1 rectangle, so a derived count would
 *  agree with them today — it is written out because what it protects is the *column* around
 *  them, and because a derived count would also follow a later edit that widened one of these
 *  to two slot columns, which is the quiet version of the same mistake. */
const frontPlata = (tableColumn: number, tableRow: number): BlockSlot => ({
  ...frontBlock("plata", tableColumn, tableRow, 1, 1),
  expected: 1,
})

const BLOCK_SLOTS: readonly BlockSlot[] = [
  // West end: one all-Plata wall, full column height.
  ...wideColumn(7, [["plata", 6]]),
  // East run: one narrow bay every two slot columns, tiers stacked top to bottom.
  ...narrowColumn(13, [
    ["oro", 2],
    ["platino", 2],
    ["oro", 2],
  ]),
  ...narrowColumn(15, [
    ["oro", 2],
    ["platino", 2],
    ["oro", 2],
  ]),
  ...narrowColumn(17, [
    ["platino", 2],
    ["oro", 4],
  ]),
  ...narrowColumn(19, [
    ["oro", 2],
    ["platino", 2],
    ["oro", 2],
  ]),
  ...narrowColumn(21, [
    ["oro", 2],
    ["platino", 2],
    ["oro", 2],
  ]),
  // Middle: one wide column, Plata / Platino / Plata down the bands.
  ...wideColumn(23, [
    ["plata", 2],
    ["platino", 2],
    ["plata", 2],
  ]),
  // East edge, first bay: table column 23. Three Plata in table rows 1, 3 and 4 — row 2 is
  // left empty on purpose — and nothing in rows 5–6. Declared as raw blocks rather than
  // through tierColumn, whose spans must sum to STAND_COLUMN_ROWS: a column that stops short
  // is the one case that helper refuses, and it refuses it for a reason that does not apply
  // here, since these rows are specified, not left over.
  frontPlata(23, 1),
  frontPlata(23, 3),
  frontPlata(23, 4),
  // Front row, against the entrance: table col 22, table row 0 — the first stand of this band.
  frontPlata(22, 0),
  // First Platino of the franja, centred: table rows −6 and −5, leaving three rows of franja
  // above and three below.
  //
  // Table col 0 is the one deliberate out-of-range coordinate in this module. The stand
  // straddles the VIP/common boundary, so it takes the last VIP column and the first common
  // one — in the user's frame that pair is columns 0 and 1, because the frame starts at
  // column 1 for the stand area and column 0 is the VIP strip beside it. The alternative,
  // table col 1, would put the stand two columns further into the common zone and leave the
  // boundary it exists to straddle empty.
  frontBlock("platino", 0, -6, 2, 2),
  // Second Platino of the franja: the same two rows, 13 columns to the right of the first.
  // Table col 13 is visual col 16, so the two stands are 13 apart on the band the user asked
  // for, with eleven columns between them (visual cols 5–15), one of which carries a totem.
  // A third Platino does not fit this row: the tarifa has two, and the band is wide enough for
  // two with room to spare, but it was specified as a pair.
  frontBlock("platino", 13, -6, 2, 2),
]

const SLOT_BLOCKS: readonly DeclaredBlock[] = BLOCK_SLOTS.map((block) => ({
  id: block.id,
  category: block.category,
  ...slotsToCells(block),
  expected: block.expected,
}))

/** Rectangles declared in cells, not in slots. A Bronce stand is one cell — a quarter of a
 *  slot — so it has no whole-slot rectangle to declare: nine of them are 2.25 slots, and
 *  `slotsToCells` cannot turn a fraction of a slot into an integer cell. This is the one tier
 *  the slot vocabulary cannot express, and it is declared here instead, in the same integer
 *  cells the rest of the app uses. Ids are marked `cell` because their coordinates are cells
 *  while every other block's are slots, and reading one as the other is exactly the mistake
 *  the two shapes invite. The bottom band is part-claimed rather than open: the tier columns
 *  stop at `STAND_MAIN_LAST_ROW` and these strips occupy the open row above the margin, so
 *  the cells they skip stay open floor and the ones they take are sold. The row is derived
 *  from the bands, so widening the franja at the top carries the bronze down with everything
 *  else instead of stranding it; the columns are written out, because the pattern is a list
 *  of cells and not a rectangle. */
/** The bottom band, in the two strips the user specified. The gap between them — cells 28 to
 *  33, table cols 9 to 11 — is requested empty, not leftover: the right strip was asked for
 *  "desde la columna 12". Each strip is a repeated texture rather than a plain stride, so the
 *  adjacency is part of the pattern and not a rounding remainder. The columns are cells and
 *  they are written out, so they carry the fence margin themselves: the left strip starts six
 *  cells further in than it used to, at cell 12, the first cell of the west Plata wall. */
const BRONZE_STRIP_LEFT = [12, 14, 16, 17, 19, 21, 23, 25, 27] as const
const BRONZE_STRIP_RIGHT = [34, 36, 37, 39, 41, 42, 44, 46, 47, 49, 51, 52] as const

const BRONZE_ROW_CELLS = [...BRONZE_STRIP_LEFT, ...BRONZE_STRIP_RIGHT]

const BRONZE_CELL_ROW = (STAND_MAIN_LAST_ROW + OPEN_BOTTOM_ROWS - 1) * PLATA_SLOT

/** `expected` is the literal 1 because the strip is a list of cells, not a rectangle to be
 *  filled: the pattern *is* the declaration, and one stand per listed cell is the only claim
 *  being made. A derived count would divide this 1 × 1 cell by a half-slot bronze footprint
 *  and produce a fraction, which says nothing about the intent. */
const CELL_BLOCKS: readonly DeclaredBlock[] = BRONZE_ROW_CELLS.map((column) => ({
  id: `bronce-cell${column}r${BRONZE_CELL_ROW}`,
  category: "bronce",
  column,
  row: BRONZE_CELL_ROW,
  columns: 1,
  rows: 1,
  expected: 1,
}))

export const BLOCKS: readonly DeclaredBlock[] = [...SLOT_BLOCKS, ...CELL_BLOCKS]

type TotemSlot = SlotRect & { id: string }

/** Advertising furniture on the floor, and deliberately not a `StandCategory`. A totem is one
 *  declaration away from being `plata` — same footprint, same cell — and it must not take
 *  that step. `STAND_CATEGORIES` is mirrored against the sponsor tariff at the type level and
 *  re-checked at runtime, every stand's cell is asserted against `CELL_SIZE`, and every tier's
 *  built count is held to the tariff the sponsors are sold against. A fifth category breaks
 *  all three; modelling it as `plata` breaks none of them and quietly spends two of the twelve
 *  Plata the tariff still owes a sponsor, so the panel would report 64+2 built and 117
 *  available for a count nobody sold. Those numbers are the product. So the type carries what
 *  a drawn rectangle needs and nothing else — no price, no status, no category — which is
 *  also what makes it impossible for a totem to reach the filters, the panel or `STANDS`. */
export interface Totem {
  id: string
  cell: GridRect
}

/** One slot square, always: a totem is the footprint of a Plata stand without being one, and
 *  the sizes are not a variable because no totem has ever been another size. */
const frontTotem = (tableColumn: number, tableRow: number): TotemSlot => {
  const { column, row } = tableToSlot(tableColumn, tableRow)
  return { id: `totem-c${column}r${row}`, column, row, columns: 1, rows: 1 }
}

/** The two totems, on the top row of the franja band the Platinos occupy — table row −6, the
 *  row the two Platinos are declared on, so the offsets read against them directly. Both are
 *  counted from a Platino's **left** column, one base for both: the first totem is 5 to the
 *  right of the one at table col 0, and the second is 4 to the right of the one at table
 *  col 13. */
const TOTEM_SLOTS: readonly TotemSlot[] = [frontTotem(5, -6), frontTotem(17, -6)]

/** Converted through `slotsToCells` like every other slot declaration, so a totem claims
 *  whole cells and lands on the same grid as the stands it shares the franja with. */
export const TOTEMS: readonly Totem[] = TOTEM_SLOTS.map((totem) => ({
  id: totem.id,
  cell: slotsToCells(totem),
}))
