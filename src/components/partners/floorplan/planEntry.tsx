'use client'

import type { EntryMark } from "./floorplanData"
import { gridToPercent } from "./floorplanData"

/** An entrance mark: the letter the opening carries in a small badge centred on the opening
 *  it marks, in the band just inside the wall line — where the Entrada zone used to be
 *  painted. It is a mark, not a region — so like a wall it carries no label, no focus and no
 *  hit area; the entrance band itself is no longer painted as a zone, which is what makes
 *  this badge the plan's only statement that the opening is a door. The hall's five openings
 *  read E, the property's north entrance reads A; cyan on the
 *  plan's dark fields matches the zoom cluster and the focus rings, the two other
 *  interactive affordances, which is what makes "you can pass through here" read as a cue
 *  rather than as decoration. `pointer-events-none` is structural for the same reason
 *  `WALL_CLASS` carries it: a badge that hosted a click could never be selected, so a
 *  stand's edge under it would lose that stand's click. */
const ENTRY_CLASS =
  "pointer-events-none absolute flex items-center justify-center rounded-full border border-[#03f5ff]/50 bg-black/70 text-[9px] leading-none font-bold text-[#03f5ff]"

export default function PlanEntry({ entry }: { entry: EntryMark }) {
  const { x, y, w, h } = gridToPercent(entry)
  return (
    <div
      aria-hidden
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      className={ENTRY_CLASS}
    >
      {entry.label}
    </div>
  )
}