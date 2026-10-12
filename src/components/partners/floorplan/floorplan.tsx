'use client'

import { Suspense, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import PlanCanvas from "./planCanvas"
import PlanFilters from "./planFilters"
import PlanLegend from "./planLegend"
import StandModal from "./standModal"
import { useFloorplan } from "./useFloorplan"
import { SECTION_COPY } from "./floorplanCopy"
import { STANDS, getStandById } from "./floorplanData"

const STAND_PARAM = "stand"
/** What a deep link scrolls to. It was the panel, because the panel used to be the thing a
 *  shared link was pointing at; the dialog is fixed and centred, so it is in view whatever
 *  the page scroll is, and the plan is what the user wants framed behind it. */
const PLAN_ANCHOR_ID = "plano-mapa"
const SECTION_TITLE_ID = "plano-titulo"

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
            .getElementById(PLAN_ANCHOR_ID)
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
  const isStandOpen = floorplan.selectedStand !== undefined

  return (
    <section id="plano" className="relative z-30 w-full bg-black/20 py-24">
      {/* `inert` for as long as the dialog is open: it takes the whole section — heading,
          filters, plan, legend — out of focus, out of hit testing and out of the
          accessibility tree in one attribute, so a keyboard user cannot tab out of an open
          dialog and a pointer user cannot reach the plan behind the scrim. */}
      <div className="mx-auto w-[90%] max-w-7xl" inert={isStandOpen}>
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
          <h2
            id={SECTION_TITLE_ID}
            tabIndex={-1}
            className="mb-6 text-4xl font-bold text-white lg:text-5xl [text-shadow:0_0_20px_rgba(3,245,255,0.5)]"
          >
            {SECTION_COPY.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {/* `STANDS.length`, not `TOTAL_STANDS`: 115 drawn against 130 declared in the
                tariff. The legend directly below sums its four category rows to the drawn
                figure, so quoting the tariff here put 15 places in the copy that no one can
                select. The count stays an argument so the copy module keeps its one-way
                import from the data module. */}
            {SECTION_COPY.subtitle(STANDS.length)}
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
          <div
            id={PLAN_ANCHOR_ID}
            className="rounded-xl border border-[#03f5ff]/30 bg-black/40 p-4 backdrop-blur-sm lg:p-6"
          >
            <PlanCanvas
              selectedId={floorplan.selectedId}
              isFilteredOut={floorplan.isFilteredOut}
              onSelect={floorplan.select}
            />
          </div>
          {/* Still sticky, and now for a different reason. The panel it replaced changed
              height as stands were selected and had to stay pinned through that; the dialog
              is `position: fixed`, so it changes no column's height at all. What is left is
              that the legend is what the user asked to always have in view, and it has the
              whole column to itself — nothing here can collide with it. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PlanLegend />
          </div>
        </div>
      </div>

      {/* Outside the `inert` subtree on purpose: the dialog has to be reachable while the
          section it describes is not. */}
      <StandModal
        selectedStand={floorplan.selectedStand}
        onRequestClose={floorplan.clear}
      />

      <Suspense fallback={null}>
        <DeepLinkSync selectedId={floorplan.selectedId} onSelect={floorplan.select} />
      </Suspense>
    </section>
  )
}
