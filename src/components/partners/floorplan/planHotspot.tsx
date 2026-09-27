'use client'

import type { CSSProperties, PointerEvent } from "react"
import type { Stand } from "./floorplanData"
import { CATEGORY_COLOR, hotspotLabel } from "./floorplanCopy"

interface PlanHotspotProps {
  stand: Stand
  selected: boolean
  filteredOut: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

const FILL_ALPHA = "D9"

export default function PlanHotspot({
  stand,
  selected,
  filteredOut,
  onSelect,
  onHover,
}: PlanHotspotProps) {
  const { x, y, w, h } = stand.geometry
  const tierColor = CATEGORY_COLOR[stand.category]

  const style = {
    "--tier": tierColor,
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
    backgroundColor: `${tierColor}${FILL_ALPHA}`,
  } as CSSProperties

  // `pointerType` is the only reliable way to keep the tooltip off touch: a tap fires
  // pointerenter on iOS and would otherwise leave the tooltip stuck under the panel.
  const trackHover = (event: PointerEvent<HTMLButtonElement>, hovering: boolean) => {
    if (event.pointerType !== "mouse") return
    onHover(hovering ? stand.id : null)
  }

  // The `::after` hit area is capped at the 19-column band's 3 px gap: a 44 px target is
  // physically unreachable there without swallowing the neighbour, and wrong stands beat
  // small ones. See the tradeoffs section of floorplan.md.

  const state = filteredOut
    ? "opacity-20 pointer-events-none"
    : selected
      ? "scale-105 border-[#03f5ff] opacity-100 shadow-[0_0_20px_2px_rgba(3,245,255,0.6)]"
      : "border-white/20 opacity-70 hover:scale-110 hover:opacity-100 hover:shadow-[0_0_12px_var(--tier)]"

  return (
    <button
      type="button"
      aria-label={hotspotLabel(stand)}
      aria-pressed={selected}
      style={style}
      onClick={() => onSelect(stand.id)}
      onPointerEnter={(event) => trackHover(event, true)}
      onPointerLeave={(event) => trackHover(event, false)}
      className={`absolute rounded-[3px] border after:absolute after:-inset-1.5 after:content-[''] pointer-coarse:after:-inset-2 transition-[opacity,transform,box-shadow] duration-150 motion-reduce:duration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b] ${state}`}
    />
  )
}
