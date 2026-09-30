'use client'

import type { CSSProperties } from "react"
import type { WallSegment } from "./floorplanData"
import { WALL_STROKE_CELLS, gridToPercent, wallToPercent } from "./floorplanData"

/** The plan's one neutral mark. Stands are the only saturated shapes on it and zones are
 *  near-invisible, so a desaturated near-white stroke reads as structure rather than as a
 *  fifth tier — and the brand cyan is already spoken for by the VIP zone, the focus rings and
 *  the section heading, so reusing it here would make structure look like a region. Square
 *  ended, where every stand is `rounded-[3px]`: the shape difference is what stops a run of
 *  them reading as another category. `pointer-events-none` is structural rather than tidy, for
 *  the reason `TOTEM_CLASS` in `planCanvas.tsx` carries it — a wall is never selectable, and a
 *  stroke painted across a stand's edge would otherwise take that stand's click. */
const WALL_CLASS = "pointer-events-none absolute bg-white/55"

/** Stroke weight projected through the same one conversion as everything else on the plan, so
 *  a wall cannot disagree with the stands it is drawn between. */
const WALL_STROKE = gridToPercent({
  column: 0,
  row: 0,
  columns: WALL_STROKE_CELLS,
  rows: WALL_STROKE_CELLS,
})

/** One declared line, painted as a stroke. `wallToPercent` returns a degenerate rect — zero
 *  width for a `"v"` wall, zero height for an `"h"` one — so the stroke takes over the axis
 *  the line does not have and is centred on the line by the half-stroke translate. Centring
 *  in CSS rather than in the model is the point: guard 7 reads the bare line, and a wall that
 *  grew a thickness in grid space would straddle the very outer edge it is legal on. */
export default function PlanWall({ wall }: { wall: WallSegment }) {
  const { x, y, w, h } = wallToPercent(wall)
  const vertical = wall.orientation === "v"
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${vertical ? WALL_STROKE.w : w}%`,
    height: `${vertical ? h : WALL_STROKE.h}%`,
    transform: vertical ? "translateX(-50%)" : "translateY(-50%)",
  } as CSSProperties
  return <div style={style} className={WALL_CLASS} />
}
