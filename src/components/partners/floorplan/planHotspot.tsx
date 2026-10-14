'use client'

import type { CSSProperties, PointerEvent } from "react"
import type { Stand } from "./floorplanData"
import { CATEGORY_COLOR, hotspotLabel, STATUS_COLOR } from "./floorplanCopy"

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

  const standColor = stand.status === "disponible" ? tierColor : STATUS_COLOR[stand.status]

  const style = {
    "--tier": standColor,
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
    backgroundColor: `${standColor}${FILL_ALPHA}`,
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

  // `disabled` is the whole of the keyboard/a11y answer, and `pointer-events-none` alone was
  // not one: it removes the stand from hit-testing and from nothing else. A dimmed stand
  // stayed in the tab order and stayed activatable, so a keyboard user could select a stand
  // the pointer can no longer reach — the panel would then hold a stand that cannot be
  // re-selected, and pointer and keyboard disagree about what is available. `disabled`
  // rather than `tabIndex={-1}` + `aria-hidden` because those are two attributes that have
  // to move together forever: drop one and `aria-hidden` is left on a still-focusable
  // element, which is a worse state than either half. One attribute here cannot desync.
  // `pointer-events-none` stays regardless, and is now load-bearing rather than cosmetic —
  // a disabled button is still hit-tested, and this one's `::after` reaches 6 px past its
  // cell, so without it a dimmed stand would swallow its neighbour's click.
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
      disabled={filteredOut}
      style={style}
      onClick={() => onSelect(stand.id)}
      onPointerEnter={(event) => trackHover(event, true)}
      onPointerLeave={(event) => trackHover(event, false)}
      className={`absolute rounded-[3px] border after:absolute after:-inset-1.5 after:content-[''] pointer-coarse:after:-inset-2 transition-[opacity,transform,box-shadow] duration-150 motion-reduce:duration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b] ${state}`}
    />
  )
}
