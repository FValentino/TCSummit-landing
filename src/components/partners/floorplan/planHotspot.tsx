'use client'

import type { CSSProperties } from "react"
import type { Stand } from "./floorplanData"
import { CATEGORY_COLOR, hotspotLabel, STATUS_COLOR } from "./floorplanCopy"

interface PlanHotspotProps {
  stand: Stand
  selected: boolean
  filteredOut: boolean
  onSelect: (id: string) => void
}

const FILL_ALPHA = "D9"

export default function PlanHotspot({
  stand,
  selected,
  filteredOut,
  onSelect,
}: PlanHotspotProps) {
  const { x, y, w, h } = stand.geometry
  const tierColor = CATEGORY_COLOR[stand.category]

  const isDefaultStatus = stand.status === "disponible"
  const standColor = isDefaultStatus ? tierColor : STATUS_COLOR[stand.status]

  const style = {
    "--tier": standColor,
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
    // A stand holding an explicit state is exempt from the fill alpha. `FILL_ALPHA` and the
    // `opacity-70` below compound to an effective 0.596, and over the near-black canvas that
    // lands `#EF4444` on roughly `#902f35` — a sold stand reads as a dim placeholder rather
    // than as gone. Measured on screen it is 2.41:1, under the 3:1 a graphic needs; at full
    // strength the same red is 5.08:1. The exemption is scoped rather than global because the
    // alpha exists so that 115 tier-coloured stands recede and the hover state still reads —
    // raising it everywhere would fix the two state stands and flatten the rest of the plan.
    backgroundColor: `${standColor}${isDefaultStatus ? FILL_ALPHA : "FF"}`,
  } as CSSProperties

  // `pointerType` used to gate this component's hover handlers, whose only job was to raise
  // a tooltip on desktop and stay quiet on touch — a tap fires pointerenter on iOS and left
  // the bubble stuck under the panel. The bubble is gone, and so are the handlers with it:
  // nothing here lifts React state on hover any more, so the stand's affordance is the
  // `hover:` utilities below, which are pointer-type agnostic by construction and cost no
  // re-render of the 115 buttons in the tree.

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
      : // Same exemption as the fill: the two curtains are independent, so exempting only the
        // hex alpha would still cap a state stand at 70% and leave it at 2.9:1. Tier-coloured
        // stands keep both curtains so that hover still separates them from 113 neighbours.
        isDefaultStatus
        ? "border-white/20 opacity-70 hover:scale-110 hover:opacity-100 hover:shadow-[0_0_12px_var(--tier)]"
        : "border-white/30 hover:scale-110 hover:shadow-[0_0_14px_var(--tier)]"

  return (
    <button
      type="button"
      aria-label={hotspotLabel(stand)}
      aria-pressed={selected}
      disabled={filteredOut}
      // The handle the stand dialog uses to hand focus back on close. A ref registry would
      // need a callback ref on all 115 buttons plus a channel up through the canvas; the DOM
      // already holds the one mapping the dialog needs, and reading it is exact where
      // remembering `document.activeElement` is not — iOS does not focus a button on tap.
      data-stand-id={stand.id}
      style={style}
      onClick={() => onSelect(stand.id)}
      className={`absolute rounded-[3px] border after:absolute after:-inset-1.5 after:content-[''] pointer-coarse:after:-inset-2 transition-[opacity,transform,box-shadow] duration-150 motion-reduce:duration-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b] ${state}`}
    />
  )
}
