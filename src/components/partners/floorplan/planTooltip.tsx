"use client"

import type { CSSProperties } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Stand } from "./floorplanData"
import { CATEGORY_COLOR, CATEGORY_LABEL, PANEL_COPY, STATUS_COLOR, STATUS_COPY } from "./floorplanCopy"

interface PlanTooltipProps {
  stand?: Stand
  /** Counter-scale so the label keeps its size while the plan zooms under it. */
  zoom: number
}

const ANCHOR_CLASS = "pointer-events-none absolute z-30 w-max"
const GAP_Y = "-0.375rem"

/** Anchors the bubble to the stand's near edge once its centre gets close to a side, so
 *  the `overflow-hidden` plan container never clips the label it just opened. */
const anchorFor = (stand: Stand, zoom: number): CSSProperties => {
  const { x, w } = stand.geometry
  const centre = x + w / 2
  const counterScale = 1 / zoom
  if (centre > 68) {
    return {
      left: `${x + w}%`,
      transformOrigin: "bottom right",
      transform: `translate(-100%, -100%) translateY(${GAP_Y}) scale(${counterScale})`,
    }
  }
  if (centre < 32) {
    return {
      left: `${x}%`,
      transformOrigin: "bottom left",
      transform: `translate(0, -100%) translateY(${GAP_Y}) scale(${counterScale})`,
    }
  }
  return {
    left: `${centre}%`,
    transformOrigin: "bottom center",
    transform: `translate(-50%, -100%) translateY(${GAP_Y}) scale(${counterScale})`,
  }
}

export default function PlanTooltip({ stand, zoom }: PlanTooltipProps) {
  const reduced = useReducedMotion()

  return (
    // Two gates on touch: this media query and the `pointerType` check in planHotspot.
    // The wrapper stays mounted either way so hiding it costs no re-render.
    <div className="hidden lg:block" aria-hidden="true">
      <AnimatePresence>
        {stand ? (
          <motion.div
            key={stand.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15 }}
            style={{ top: `${stand.geometry.y}%` }}
            className={ANCHOR_CLASS}
          >
            {/* Anchoring and the counter-scale live on an inner node: framer-motion owns
                the outer `transform` for the fade, so the two cannot share one element. */}
            <div
              style={anchorFor(stand, zoom)}
              className="rounded-lg border border-[#03f5ff]/30 bg-black/80 px-3 py-2 backdrop-blur-sm"
            >
              <p className="text-sm font-semibold whitespace-nowrap text-white">{stand.label}</p>
              <p className="mt-1 flex items-center gap-2 text-xs whitespace-nowrap text-gray-300">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-sm border border-white/30"
                  style={{ backgroundColor: CATEGORY_COLOR[stand.category] }}
                />
                {CATEGORY_LABEL[stand.category]}
                <span className="text-gray-500">·</span>
                {stand.areaM2} {PANEL_COPY.areaUnit}
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs whitespace-nowrap text-gray-300">
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: STATUS_COLOR[stand.status] }}
                />
                {STATUS_COPY[stand.status].label}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
