'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import PlanHotspot from "./planHotspot"
import PlanTooltip from "./planTooltip"
import PlanWall from "./planWall"
import PlanEntry from "./planEntry"
import { A11Y_COPY, TOTEM_LABEL, ZONE_LABEL, ZOOM_GLYPH } from "./floorplanCopy"
import type { Stand, Totem, Zone, ZoneKind } from "./floorplanData"
import {
  CELL_FILL_RATIO,
  ENTRIES,
  GRID_ASPECT_RATIO,
  STANDS,
  TOTEMS,
  WALLS,
  ZONES,
  gridToPercent,
} from "./floorplanData"

const ZOOM_MIN = 1
const ZOOM_MAX = 2.5
const ZOOM_STEP = 1.25

const ZOOM_BUTTON_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#03f5ff]/20"

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Restrained on purpose: a zone is context, not a feature. The VIP gets the brand tint so
 *  it reads as a region, the open zones stay near the floor. */
const ZONE_CLASS: Record<ZoneKind, string> = {
  vip: "border-[#03f5ff]/30 bg-[#03f5ff]/[0.07] text-[#03f5ff]",
  open: "border-white/10 bg-white/[0.02] text-gray-500",
}

/** The only violet on the plan, which is what keeps a totem from reading as a stand: stands
 *  are solid in one of four tier colours, zones are near-invisible dashed fields, and a totem
 *  is a solid slab in neither vocabulary. `pointer-events-none` is structural, not tidiness —
 *  a totem is never selectable, and a future edit that moved one over a stand would otherwise
 *  eat that stand's click without any guard being able to see it in production. */
const TOTEM_CLASS = "pointer-events-none border-violet-300/70 bg-violet-400/25"

/** The gap between stands is a transform on the rendered element, not a smaller rect: the
 *  data keeps every stand at its exact cell, and `transform` is an independent property
 *  from the `scale:` the hotspot's own hover and selected states use, so the two compose
 *  instead of overwriting each other. */
const HOTSPOT_LAYER_CLASS =
  "absolute inset-0 [&>button]:transform-[scale(var(--cell-fill))]"

const hotspotLayerStyle = { "--cell-fill": CELL_FILL_RATIO } as CSSProperties

function PlanZone({ zone }: { zone: Zone }) {
  const { x, y, w, h } = gridToPercent(zone)
  return (
    <div
      role="group"
      aria-label={ZONE_LABEL[zone.id]}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      className={`absolute rounded-lg border border-dashed ${ZONE_CLASS[zone.kind]}`}
    >
      <span className="flex h-full w-full items-center justify-center px-1 text-center text-[9px] leading-tight tracking-widest uppercase sm:text-[10px]">
        {ZONE_LABEL[zone.id]}
      </span>
    </div>
  )
}

/** `role="img"` rather than `PlanZone`'s `role="group"`: a zone is a region of the hall to be
 *  read, a totem is a marked object standing on it, and it carries no visible text because two
 *  cells is a thirtieth of the plan's width. No handlers, no focus ring, no tooltip — the whole
 *  treatment is that it is not inventory. */
function PlanTotem({ totem }: { totem: Totem }) {
  const { x, y, w, h } = gridToPercent(totem.cell)
  return (
    <div
      role="img"
      aria-label={TOTEM_LABEL}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      className={`absolute rounded-[3px] border ${TOTEM_CLASS}`}
    />
  )
}

interface PlanCanvasProps {
  selectedId: string | null
  hoveredStand?: Stand
  isFilteredOut: (stand: Stand) => boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

/** `drag` writes `touch-action: none` on the element it owns, which would cancel the
 *  native pinch-zoom and page scroll §8.3 requires on touch. Panning is therefore a
 *  pointer:fine affordance only; touch keeps the browser's own gestures. */
function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)")
    const update = () => setFine(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return fine
}

export default function PlanCanvas({
  selectedId,
  hoveredStand,
  isFilteredOut,
  onSelect,
  onHover,
}: PlanCanvasProps) {
  const reduced = useReducedMotion()
  const canDrag = useFinePointer()
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(ZOOM_MIN)
  const [box, setBox] = useState({ width: 0, height: 0 })
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const zoomRef = useRef(zoom)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (rect) setBox({ width: rect.width, height: rect.height })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  /** `transform: translate(x) scale(s)` moves the element `x * s` px on screen, so a
   *  visual pan limit of `n` px is `n / zoom` in the local units `dragConstraints` uses.
   *  Without the division the map can be dragged twice as far as the zoom allows. */
  const panLimitsFor = useCallback(
    (scale: number) => ({
      x: box.width / 2 - box.width / (2 * scale),
      y: box.height / 2 - box.height / (2 * scale),
    }),
    [box],
  )

  const applyZoom = useCallback(
    (next: number) => {
      const target = clamp(next, ZOOM_MIN, ZOOM_MAX)
      const limits = panLimitsFor(target)
      panX.set(clamp(panX.get(), -limits.x, limits.x))
      panY.set(clamp(panY.get(), -limits.y, limits.y))
      zoomRef.current = target
      setZoom(target)
    },
    [panLimitsFor, panX, panY],
  )

  const resetView = () => {
    panX.set(0)
    panY.set(0)
    zoomRef.current = ZOOM_MIN
    setZoom(ZOOM_MIN)
  }

  // Registered natively because React marks `onWheel` passive at the root, where
  // `preventDefault()` cannot stop the browser from zooming the page as well.
  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      applyZoom(zoomRef.current * (event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP))
    }
    element.addEventListener("wheel", onWheel, { passive: false })
    return () => element.removeEventListener("wheel", onWheel)
  }, [applyZoom])

  const limits = panLimitsFor(zoom)
  const dragConstraints = { left: -limits.x, right: limits.x, top: -limits.y, bottom: limits.y }

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={A11Y_COPY.planGroup}
      style={{ aspectRatio: GRID_ASPECT_RATIO }}
      className="relative w-full overflow-hidden rounded-xl [touch-action:pan-y_pinch-zoom]"
    >
      <motion.div
        initial={false}
        animate={{ scale: zoom }}
        transition={{ duration: reduced ? 0 : 0.2 }}
        style={{ x: panX, y: panY }}
        drag={canDrag}
        dragConstraints={dragConstraints}
        dragElastic={0}
        dragMomentum={false}
        className="absolute inset-0"
      >
        <div className="absolute inset-0">
          {ZONES.map((zone) => (
            <PlanZone key={zone.id} zone={zone} />
          ))}
          {TOTEMS.map((totem) => (
            <PlanTotem key={totem.id} totem={totem} />
          ))}
        </div>

        <div className={HOTSPOT_LAYER_CLASS} style={hotspotLayerStyle}>
          {STANDS.map((stand) => (
            <PlanHotspot
              key={stand.id}
              stand={stand}
              selected={selectedId === stand.id}
              filteredOut={isFilteredOut(stand)}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))}
        </div>

        {/* Above the hotspots, not beside them: a wall is structure and a stand is
            inventory, so a stand's hover scale must not be able to paint over the line that
            bounds it. `aria-hidden` because a wall carries no label, no state and no
            behaviour — a screen reader gets three anonymous regions it can do nothing
            with, and a region to be read is what `PlanZone` already announces.
            `pointer-events-none` on the wrapper, not only on each wall: an absolutely
            positioned `inset-0` div is hit-testable whether or not it paints, and this one
            sits above the hotspot layer, so leaving it `auto` swallows all 115 stand clicks
            while every child already sets `pointer-events-none` and the intent looks served. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {WALLS.map((wall) => (
            <PlanWall key={wall.id} wall={wall} />
          ))}
          {ENTRIES.map((entry) => (
            <PlanEntry key={`${entry.column}:${entry.row}`} entry={entry} />
          ))}
        </div>

        <PlanTooltip stand={hoveredStand} zoom={zoom} />
      </motion.div>

      {/* Bottom-right: the zoom cluster, nothing else. The legend, the metrics box and the
          draft notice were removed from the map surface — the filter chips in
          `planFilters.tsx` carry the category and status keys, and `infoPanel.tsx` carries
          the data-derived counts, so none of those three were load-bearing. */}
      <div className="absolute right-4 bottom-4 flex gap-1 rounded-xl border border-[#03f5ff]/20 bg-black/50 p-1 backdrop-blur-md">
        <button
          type="button"
          aria-label={A11Y_COPY.zoomIn}
          disabled={zoom >= ZOOM_MAX}
          onClick={() => applyZoom(zoom * ZOOM_STEP)}
          className={ZOOM_BUTTON_CLASS}
        >
          {ZOOM_GLYPH.in}
        </button>
        <button
          type="button"
          aria-label={A11Y_COPY.zoomOut}
          disabled={zoom <= ZOOM_MIN}
          onClick={() => applyZoom(zoom / ZOOM_STEP)}
          className={ZOOM_BUTTON_CLASS}
        >
          {ZOOM_GLYPH.out}
        </button>
        <button
          type="button"
          aria-label={A11Y_COPY.zoomReset}
          disabled={zoom === ZOOM_MIN}
          onClick={resetView}
          className={`${ZOOM_BUTTON_CLASS} w-12 text-[11px]`}
        >
          {ZOOM_GLYPH.reset}
        </button>
      </div>
    </div>
  )
}
