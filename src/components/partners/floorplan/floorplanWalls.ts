import { type GridRect, type StandGeometry, gridToPercent } from "./floorplanLayout"

/** The built structure: the fence around the predio and the walls of the hall inside it. Kept
 *  in its own module because it is the one part of the plan that is authored on grid **lines**
 *  rather than in cells, and mixing the two coordinate systems in one file is what makes a
 *  wall look one cell further from a stand than it is.
 *
 *  Import direction is one way, out of `floorplanLayout`: structure reads the floor it stands
 *  on, the floor knows nothing about structure. `floorplanGuards` takes the clearance constant
 *  from here rather than from the `floorplanData` barrel, so the guard edge stays a leaf and
 *  no cycle appears through it. */

/** Walls are authored on grid **lines**, the boundaries between cells, not on the cells
 *  themselves — the same reason the hall has gaps between stands is the reason a wall has
 *  to be able to run along one. `at` is therefore the **left** edge of column `at` for a
 *  `"v"` wall and the **top** edge of row `at` for an `"h"` one, and `from`/`to` are a
 *  half-open span of cell indices along the other axis. */
export type WallOrientation = "v" | "h"

export interface WallSegment {
  id: string
  orientation: WallOrientation
  at: number
  from: number
  to: number
}

/** The outer fence's north line. One constant instead of a bare `1` in `WALLS` and a second
 *  bare `1` in the `ENTRIES` derivation, because the two must agree: the entrance cut out of
 *  that line is the mark that reads A rather than E. */
export const PREDIO_NORTH_ROW = 1

/** An entrance mark: the opening's rect plus the letter the badge renders. The label is part
 *  of the derived data — the hall's five openings read E and the property's north entrance
 *  reads A — so a badge cannot silently reuse the wrong letter when a new opening appears. */
export interface EntryMark extends GridRect {
  label: string
}

/** One predio, two nested fences, eighteen walls: six around the property, twelve around the
 *  building. The outer perimeter is `wall-13` along row 1 up to the first north entrance,
 *  `wall-13b` along row 1 from its far side to the second, `wall-13c` along row 1 from the
 *  second entrance's far side to the east corner, `wall-14` up the west edge, `wall-15` up
 *  the east and `wall-16` along row 37 — a rectangle closed on lines 3 to 63 horizontally and
 *  1 to 37 vertically, around cell rows 1 to 36, with two deliberate openings in it. Rows 0
 *  and 37 are the symmetric margin bands outside it, and row 0 carries nothing: the yard's
 *  own contents, the franja's two Platinos and two totems, start at row 6.
 *
 *  The north side is the one fence line that is not whole, and its two openings are the
 *  property's entrances: columns 9 to 14 and 35 to 40, six cells each. Their width is derived
 *  from the stands rather than chosen — `platino-09` occupies cells 10 to 13 and `platino-10`
 *  occupies cells 36 to 39, and each gate is its stand's span plus one cell of air at each
 *  side, on the stand's own column. The user asked for exactly that alignment, so each gate
 *  and its stand read as one gesture in plan: the entrances land on the yard, directly north
 *  of the fringe's two Platinos. The other three fence lines are still unbroken.
 *
 *  The fence is what centres the plan, in the model rather than in the projection: the grid is
 * 66 × 38, the fence is three cells inside it on the west and the east and one on the north
 *  and the south, so the drawing is symmetric in the canvas with no view offset. The margin
 *  being real ground rather than a half row of stroke is also what keeps the fence's own line
 *  fully drawn — a wall centred on row 0 would have had its top half clipped by the canvas.
 *  The fence holds hall and yard as one property, so those two Platinos and two totems sit
 *  above the building and inside it.
 *
 *  The building is that perimeter inset: three cells on the west (`wall-9` at column 6 against
 *  `wall-14` at 3), three on the east (`wall-12` at column 60 against `wall-15` at 63) and three
 *  rows at the south (`wall-10` and `wall-11` on row 34 against `wall-16` on 37) — the ground
 *  the user asked for, which is a consequence of these four numbers and not a rule anything
 *  checks: guard 8 holds walls off the stands and no guard measures the fence. The south gap
 *  exists because `MARGIN_ROWS` is two, which is why the bronze strip stayed on row 32 when
 *  the building moved down.
 *
 *  The building's own sides are not a full rectangle. The top is stepped — row 17 across the
 *  niche, row 18 across the body — and the openings in the row-18 band are the way from the
 *  yard above into the stand floor. `wall-1` and `wall-2` are the niche, at the east end of
 *  that top: the vertical at column 52 for one row of clearance against `plata-64`, whose top
 *  edge is row 18, and the horizontal on row 17 from the niche to the east wall.
 *
 *  The niche's bottom is **open on purpose**: the user specified a niche, not an enclosure, so
 *  the fourth side along row 18 across columns 52–60 is deliberately absent, exactly as
 *  `wall-3` stops at column 52. Adding it is not finishing the shape, it is a different shape.
 *
 *  A wall delimits the building, so it never sits flush on a stand — the clearance to the east
 *  and to the north is walkway, and the stands were not moved to accommodate it. Sizing those
 *  gaps from the stands that exist, rather than from the grid edge, is what lets the shape
 *  survive a layout change; anchoring the wall to the building instead would put the two back
 *  in conflict the moment a stand grows east.
 *
 *  `WALL_CLEARANCE_CELLS` is why the east wall is at column 60 and not 58. Its span crosses
 *  `plata-61`, `plata-62` and `plata-63`, whose east edge is column 58, so a wall there would
 *  run flush along three stands — legal to guard 7, which only forbids crossing a stand, and
 *  still wrong: flush is indistinguishable from a stand border at a glance. Clearance is a
 *  separate rule from penetration, and it is the stricter of the two. (`plata-64`, the front-row
 *  stand at the mouth of the niche, is four cells further in at column 56, so the niche's own
 *  clearance is not what fixes the wall.)
 *
 *  The body's top edge is the row-18 band, one row below the north wall: `wall-8` through
 *  `wall-3` run from column 6 east to column 52 as six segments with deliberate openings
 *  between them. The opening where the user had the original west entrance is the breadth
 *  between `wall-4` (ending at column 40) and `wall-3` (starting at column 44).
 *
 *  `wall-9` is the west edge at column 6, running from the body's top band down to the bottom
 *  corner; `wall-10` and `wall-11` are the south edge on row 34, meeting at column 29;
 *  `wall-12` is the east edge at column 60, carrying the niche's east side from row 17 and the
 *  building's own edge below it. */
export const WALLS: readonly WallSegment[] = [
  // Outer fence, one predio: hall and yard. The north side is three segments because two
  // property entrances are cut out of it — columns 9-14 over `platino-09` (cells 10-13) and
  // columns 35-40 over `platino-10` (cells 36-39), each the stand's width plus one cell of
  // air either side, on its own column.
  { id: "wall-13", orientation: "h", at: PREDIO_NORTH_ROW, from: 3, to: 9 },
  { id: "wall-13b", orientation: "h", at: PREDIO_NORTH_ROW, from: 15, to: 35 },
  { id: "wall-13c", orientation: "h", at: PREDIO_NORTH_ROW, from: 41, to: 63 },
  { id: "wall-14", orientation: "v", at: 3, from: 1, to: 37 },
  { id: "wall-15", orientation: "v", at: 63, from: 1, to: 37 },
  { id: "wall-16", orientation: "h", at: 37, from: 3, to: 63 },
  // Top wall, stepping down from the niche to the body.
  { id: "wall-1", orientation: "v", at: 52, from: 17, to: 18 },
  { id: "wall-2", orientation: "h", at: 17, from: 52, to: 60 },
  { id: "wall-3", orientation: "h", at: 18, from: 44, to: 52 },
  { id: "wall-4", orientation: "h", at: 18, from: 36, to: 40 },
  { id: "wall-5", orientation: "h", at: 18, from: 22, to: 32 },
  { id: "wall-6", orientation: "h", at: 18, from: 16, to: 20 },
  { id: "wall-7", orientation: "h", at: 18, from: 11, to: 14 },
  { id: "wall-8", orientation: "h", at: 18, from: 6, to: 8 },
  // Left wall.
  { id: "wall-9", orientation: "v", at: 6, from: 18, to: 34 },
  // Bottom wall.
  { id: "wall-10", orientation: "h", at: 34, from: 6, to: 29 },
  { id: "wall-11", orientation: "h", at: 34, from: 29, to: 60 },
  // Right wall.
  { id: "wall-12", orientation: "v", at: 60, from: 17, to: 34 },
]

/** Entrances, derived from the walls: every horizontal opening between two collinear
 *  segments is an entrance, so the marks cannot drift from the walls the way a hand-written
 *  list can. The rect spans the opening's columns and the two rows of ground the line
 *  encloses, so the badge reads as part of the exterior corridor, not as a tag on the stand
 *  floor. This is a rule, not a row number: it is exactly the row-18 band's five openings plus
 *  the north fence's two. The bottom walls meet at a point (open span 0) and the niche's open
 *  bottom is not between two segments, so neither produces a mark. The remaining three fence
 *  lines are still mute — one per row, with no neighbour to leave a gap against — while the
 *  north side now carries the property's two entrances, cut out at columns 9 to 14 and 35 to
 *  40. */
export const ENTRIES: readonly EntryMark[] = (() => {
  const byRow = new Map<number, WallSegment[]>()
  const entries: EntryMark[] = []
  for (const wall of WALLS) {
    if (wall.orientation !== "h") continue
    const segments = byRow.get(wall.at)
    if (segments) segments.push(wall)
    else byRow.set(wall.at, [wall])
  }
  for (const [at, segments] of byRow) {
    const sorted = [...segments].sort((a, b) => a.from - b.from)
    // The badge always lands inside the grid, on the two rows of ground the line encloses.
    // Above the hall's top band that ground is north of the wall, the entrance corridor; but
    // row 0 is canvas margin, so for a line at the top of the grid the enclosed ground is the
    // two rows below it instead. The north fence sits on `PREDIO_NORTH_ROW`, so `at - 2` would
    // leave it. The label follows the same line: the opening on the property's north fence is
    // the access to the predio, so it reads A; every opening in the hall's top band is an
    // entrance to the hall, so those read E. Both north entrances share the single fence row,
    // so the rule stamps A on each without having to know how many gates exist.
    const row = at - 2 < 1 ? at : at - 2
    const label = at === PREDIO_NORTH_ROW ? "A" : "E"
    for (let i = 0; i < sorted.length - 1; i++) {
      const open = sorted[i + 1].from - sorted[i].to
      if (open > 0) {
        entries.push({ column: sorted[i].to, row, columns: open, rows: 2, label })
      }
    }
  }
  return entries
})()

/** Minimum cells of empty grid between a wall and any stand its span crosses. One, not zero:
 *  zero is what guard 7 tolerates and is exactly what "flush" means, which is the thing the
 *  user ruled out — "the wall does not have to be stuck to the stands". One is also what the
 *  north wall is drawn against, since the user chose one row of air over `plata-64` over two,
 *  and a larger minimum would silently overrule that choice the next time the wall is moved. */
export const WALL_CLEARANCE_CELLS = 1

/** Stroke weight in cells, on both axes. One number for two axes because the plan's aspect
 *  ratio is fixed, so a square cell count is a visually even stroke; expressed in cells so
 *  the wall scales with the drawing rather than with the viewport. */
export const WALL_STROKE_CELLS = 0.3

/** A wall projected to the same percent space as everything else it is drawn between. The
 *  rectangle is degenerate on purpose — one dimension is zero, and the zero is the drawing
 *  instruction: the line carries no width in grid space, so the canvas centres the stroke
 *  on it. Routing through `gridToPercent` is what stops a second grid-to-percent mapping
 *  from appearing in the project beside the one every stand is positioned by. */
export const wallToPercent = ({ orientation, at, from, to }: WallSegment): StandGeometry =>
  gridToPercent(
    orientation === "v"
      ? { column: at, row: from, columns: 0, rows: to - from }
      : { column: from, row: at, columns: to - from, rows: 0 },
  )
