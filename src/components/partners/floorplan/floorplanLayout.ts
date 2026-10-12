/** The hall as a set of rectangles. Nothing in this module prices a stand, labels it or
 *  knows what status it has — it declares the floor, and `floorplanData` builds the catalogue
 *  from what is declared here. Import direction is one way: data depends on layout, never the
 *  other way, so the guards can keep reading layout types without a cycle. The walls are
 *  declared in `floorplanWalls`, which is a one-way edge out of this module for the same
 *  reason: structure reads the floor, the floor knows nothing about structure. */

/** Two levels, one declaration. The hall is specified in **plata slots** — the user counts
 *  columns and rows in the footprint of one PLATA stand — while every internal coordinate is
 *  an integer **cell**, half a slot per side. Regions are declared in the user's units and
 *  converted once, at the declaration site; nothing downstream carries a fractional unit. */
export const PLATA_SLOT = 2
export const SLOT_COLUMNS = 33

/** The building's distance from the west edge of the grid, in slots: the ground the outer
 *  fence needs around it. Three slots is six cells, the room the user asked for between the
 *  building's side walls and the fence, and `SLOT_COLUMNS` grew by the same six cells, so the
 *  east side is given the same room out of the difference and the fence ends up three cells
 *  inside the grid on the west and on the east alike — the plan centres itself horizontally
 *  with no view offset, because the margin is in the model rather than in the projection.
 *
 *  Every west-anchored region reads it rather than repeating the number: the VIP strip and
 *  the stand origin below, and the table frame and the bronze strips in `floorplanStands`.
 *  Enlarging the recinto is one edit here plus the wall coordinates, not a sweep. */
export const PREDIO_LEFT_SLOTS = 3

export const STAND_CATEGORIES = ["platino", "oro", "plata", "bronce"] as const
export type StandCategory = (typeof STAND_CATEGORIES)[number]

export interface StandGeometry {
  x: number
  y: number
  w: number
  h: number
}

export interface GridSize {
  columns: number
  rows: number
}

/** A rectangle in cells. `column`/`row` are the top-left cell, 0-indexed, and the span is
 *  the full cells the rectangle occupies. The only coordinate system inside the app. */
export interface GridRect extends GridSize {
  column: number
  row: number
}

/** A rectangle as the hall is described: 1-indexed, in plata slots. Regions are declared in
 *  this shape so nobody has to do the cell arithmetic in the wrong unit. */
export interface SlotRect extends GridSize {
  column: number
  row: number
}

/** Slot to cell, 1-indexed slot to 0-indexed cells. The single conversion between the two
 *  levels, so a region cannot be declared half in one and half in the other. */
export const slotsToCells = ({ column, row, columns, rows }: SlotRect): GridRect => ({
  column: (column - 1) * PLATA_SLOT,
  row: (row - 1) * PLATA_SLOT,
  columns: columns * PLATA_SLOT,
  rows: rows * PLATA_SLOT,
})

/** Cell footprint per tier, in cells. Plata is the base unit — one slot is exactly one
 *  plata cell: oro is as wide as two plata side by side, platino holds the area of four. */
export const CELL_SIZE: Record<StandCategory, GridSize> = {
  platino: { columns: 4, rows: 4 },
  oro: { columns: 4, rows: 2 },
  plata: { columns: 2, rows: 2 },
  bronce: { columns: 1, rows: 1 },
}

/** Share of its cell a rendered stand fills. The gap is applied as a paint-time transform
 *  in the canvas, never to the coordinates: "plata is 2x2" has to keep meaning 2x2. */
export const CELL_FILL_RATIO = 0.85

const round2 = (value: number) => Math.round(value * 100) / 100

/** The only grid-to-percent conversion in the project, so no rendered rect can disagree
 *  with the data that declared it. There is no offset in it: the canvas shows the grid as it
 *  is, and what centres the drawing is the fence, which is a wall in the model — three cells
 *  inside the grid on the west and on the east, and on row 1 at the north, with the empty row
 *  0 above it as an equal margin to the one below the south fence. Translating the projection
 *  to re-centre what the geometry already centres would only be a second thing to keep in
 *  step. */
export const gridToPercent = ({ column, row, columns, rows }: GridRect): StandGeometry => ({
  x: round2((column / CELL_COLUMNS) * 100),
  y: round2((row / CELL_ROWS) * 100),
  w: round2((columns / CELL_COLUMNS) * 100),
  h: round2((rows / CELL_ROWS) * 100),
})

export type ZoneId = "vip"
export type ZoneKind = "vip" | "open"

export interface Zone extends GridRect {
  id: ZoneId
  kind: ZoneKind
}

type ZoneSlot = SlotRect & { id: ZoneId; kind: ZoneKind }

/** The hall as the user reads it: a table whose first three columns are the VIP strip, and
 *  whose rows run, top to bottom — the exterior `FRANJA_ROWS`, the entrance, the front row
 *  against it, the main floor, the open row, the margin.
 *
 *  The floor has two bands. `ENTRY_ROWS` is the row against the entrance — the front row the
 *  user fills first, sparsely and column by column, so it is declared as raw blocks rather
 *  than as tier columns. Everything below is the main floor: the six-band columns that fill
 *  their height exactly. Putting the front row in its own band is what lets the hall grow a
 *  row without moving a single stand that was already placed.
 *
 *  The franja sits above the entrance, so growing it pushes every band down — but the table
 *  frame is anchored to `STAND_ORIGIN`, not to the top of the grid. Adding rows above
 *  therefore renumbers the absolute slot rows and leaves every position the user has named
 *  meaning what it meant before — which only holds because the bands are derived, not written.
 *  `OPEN_BOTTOM_ROWS` is the row above the margin. It is unbuilt as columns — no tier column
 *  reaches it, which is what keeps the bottom band free for a later region — but it is not
 *  unclaimed: the 21 bronze cells take its first cell row. */
export const VIP_COLUMNS = 3
/** The hall is the sum of its bands, in the order the table comment above names them, so
 *  growing the franja is one edit here rather than two literals kept in step by hand. */
export const FRANJA_ROWS = 8
const ENTRANCE_ROWS = 1
const ENTRY_ROWS = 1
const MAIN_FLOOR_ROWS = 6
export const OPEN_BOTTOM_ROWS = 1
/** Two, not one: the bottom margin is the strip the building's south wall stands in and the
 *  outer fence closes at the far side of it, so it has to hold three cells of ground and the
 *  row the fence line is drawn on. It is the margin and not `OPEN_BOTTOM_ROWS` because the
 *  bronze strip sits in the open row — growing this leaves `BRONZE_CELL_ROW` and every
 *  bronze id untouched, and pushes the south wall and the fence down with them. */
const MARGIN_ROWS = 2
export const SLOT_ROWS =
  FRANJA_ROWS + ENTRANCE_ROWS + ENTRY_ROWS + MAIN_FLOOR_ROWS + OPEN_BOTTOM_ROWS + MARGIN_ROWS
export const CELL_COLUMNS = SLOT_COLUMNS * PLATA_SLOT
export const CELL_ROWS = SLOT_ROWS * PLATA_SLOT
export const GRID_ASPECT_RATIO = CELL_COLUMNS / CELL_ROWS

const FRANJA_FIRST_ROW = 1
const FRANJA_LAST_ROW = FRANJA_FIRST_ROW + FRANJA_ROWS - 1
const ENTRANCE_FIRST_ROW = FRANJA_LAST_ROW + 1
export const STAND_ORIGIN_COLUMN = VIP_COLUMNS + 1 + PREDIO_LEFT_SLOTS
export const STAND_ORIGIN_ROW = ENTRANCE_FIRST_ROW + ENTRANCE_ROWS
export const STAND_MAIN_ROW = STAND_ORIGIN_ROW + ENTRY_ROWS
export const STAND_MAIN_LAST_ROW = SLOT_ROWS - OPEN_BOTTOM_ROWS - MARGIN_ROWS
export const STAND_COLUMN_ROWS = STAND_MAIN_LAST_ROW - STAND_MAIN_ROW + 1

/** Regions of the hall that hold no stands, in slots, 1-indexed as the user reads them.
 *  They are rendered and announced, never selectable, so they take no part in filtering,
 *  selection or the panel. The stand area between them is implicit — it is the floor a
 *  stand column sits on, not a drawn shape. */
const ZONE_SLOTS: readonly ZoneSlot[] = [
  // The VIP is interior flooring only: it starts on the first stand row and covers exactly
  // the stand floor — never the entrance above it, never the bottom band below (the margin
  // zone is gone; the bottom band is still part of the slot budget, just not painted). The
  // top is STAND_ORIGIN_ROW and the height is derived from the same bands as the stands, so
  // growing the franja or adding a tier band moves the VIP with them: it re-derives from the
  // floor it sits on instead of drifting. A literal height would overflow the grid the moment
  // the bands above it change — the slot rect is converted to cells and the guard only checks
  // cells, so a zone that outgrew the floor would run off the end of the grid at build time.
  // The west edge is the same story: the strip is the first region the fence margin pushes,
  // so widening the recinto carries it along with the building instead of leaving it standing
  // in the yard.
  {
    id: "vip",
    kind: "vip",
    column: 1 + PREDIO_LEFT_SLOTS,
    row: STAND_ORIGIN_ROW,
    columns: VIP_COLUMNS,
    rows: SLOT_ROWS - STAND_ORIGIN_ROW - MARGIN_ROWS + 1,
  },
]

export const ZONES: readonly Zone[] = ZONE_SLOTS.map((zone) => ({
  id: zone.id,
  kind: zone.kind,
  ...slotsToCells(zone),
}))

export interface Block extends GridRect {
  id: string
  category: StandCategory
}
