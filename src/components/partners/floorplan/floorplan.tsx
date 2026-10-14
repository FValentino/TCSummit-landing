'use client'

import { Suspense, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import PlanCanvas from "./planCanvas"
import PlanFilters from "./planFilters"
import InfoPanel from "./infoPanel"
import { useFloorplan } from "./useFloorplan"
import { SECTION_COPY } from "./floorplanCopy"
import { getStandById, TOTAL_STANDS } from "./floorplanData"

const STAND_PARAM = "stand"
const PANEL_ANCHOR_ID = "plano-panel"

/** `/partners` is statically rendered, so reading the query has to happen below a
 *  Suspense boundary or the build fails. Isolating it in this one component keeps the
 *  other 130 nodes in the prerendered HTML instead of handing the whole section to the
 *  client. The reducer lives above the boundary, so a `router.replace` cannot reset the
 *  selection it is syncing. */
function DeepLinkSync({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reduced = useReducedMotion()
  const param = searchParams.get(STAND_PARAM)
  const linkedStand = param === null ? undefined : getStandById(param)

  // `undefined` rather than the current value so the first pass always reads as a change
  // and a cold deep link gets adopted. After that, the two diffs below are the whole
  // precedence rule: the URL wins when it moves on its own, the selection wins when it
  // moves under a URL that held still. Without that split, `Esc` could not clear a stand
  // reached by deep link — the read effect would re-select it on every state change, and
  // rewriting the URL on every render would cancel Back.
  const lastParam = useRef<string | null | undefined>(undefined)
  const lastSelected = useRef<string | null>(selectedId)

  useEffect(() => {
    const paramChanged = lastParam.current !== param
    const selectionChanged = lastSelected.current !== selectedId
    lastParam.current = param
    lastSelected.current = selectedId

    if (paramChanged) {
      // An id the stand set does not contain is ignored, so a stale shared link degrades
      // to the initial panel instead of throwing — and its URL is left as the sender wrote
      // it, because the URL is what moved and the URL is the source of truth here.
      if (linkedStand && linkedStand.id !== selectedId) {
        onSelect(linkedStand.id)
        // The panel has to be populated before it can be scrolled to, and the dispatch
        // above has not committed yet.
        requestAnimationFrame(() => {
          document
            .getElementById(PANEL_ANCHOR_ID)
            ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" })
        })
      }
      return
    }

    if (!selectionChanged) return
    const params = new URLSearchParams(searchParams.toString())
    if (selectedId === null) params.delete(STAND_PARAM)
    else params.set(STAND_PARAM, selectedId)
    const query = params.toString()
    if (query === searchParams.toString()) return
    router.replace(query ? `${window.location.pathname}?${query}` : window.location.pathname, {
      scroll: false,
    })
  }, [param, selectedId, linkedStand, onSelect, reduced, searchParams, router])

  return null
}

export default function PartnersFloorplan() {
  const floorplan = useFloorplan()

  return (
    <section id="plano" className="relative z-30 w-full bg-black/20 py-24">
      <div className="mx-auto w-[90%] max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[#03f5ff] uppercase">
            {SECTION_COPY.eyebrow}
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl [text-shadow:0_0_20px_rgba(3,245,255,0.5)]">
            {SECTION_COPY.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {SECTION_COPY.subtitle(TOTAL_STANDS)}
          </p>
        </motion.div>

        <PlanFilters
          categoryFilter={floorplan.categoryFilter}
          availabilityFilter={floorplan.availabilityFilter}
          visibleCount={floorplan.visibleCount}
          hasActiveFilters={floorplan.hasActiveFilters}
          onCategoryFilter={floorplan.setCategoryFilter}
          onAvailabilityFilter={floorplan.setAvailabilityFilter}
          onReset={floorplan.resetFilters}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[70fr_30fr]">
          <div className="rounded-xl border border-[#03f5ff]/30 bg-black/40 p-4 backdrop-blur-sm lg:p-6">
            <PlanCanvas
              selectedId={floorplan.selectedId}
              hoveredStand={floorplan.hoveredStand}
              isFilteredOut={floorplan.isFilteredOut}
              onSelect={floorplan.select}
              onHover={floorplan.hover}
            />
          </div>
          <div id={PANEL_ANCHOR_ID} className="lg:sticky lg:top-24 lg:self-start">
            <InfoPanel selectedStand={floorplan.selectedStand} />
          </div>
        </div>

        <Suspense fallback={null}>
          <DeepLinkSync selectedId={floorplan.selectedId} onSelect={floorplan.select} />
        </Suspense>
      </div>
    </section>
  )
}
