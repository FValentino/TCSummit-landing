"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { Stand } from "./floorplanData"
import {
  ACTIVE_STAGE,
  PRICE_STAGES,
  STAND_STATUSES,
  STATUS_COUNTS,
  TOTAL_STANDS,
  formatPrice,
  getTierPrice,
} from "./floorplanData"
import {
  A11Y_COPY,
  CATEGORY_COLOR,
  CATEGORY_LABEL,
  CTA_COPY,
  PANEL_COPY,
  PANEL_INITIAL_COPY,
  PRICE_COPY,
  STAGE_PREFIX,
  STAGE_LABEL,
  STAND_BENEFITS,
  STATS_COPY,
  STATUS_COLOR,
  STATUS_COPY,
  ctaLabel,
} from "./floorplanCopy"

interface InfoPanelProps {
  selectedStand?: Stand
}

const PANEL_CLASS = "rounded-2xl border border-[#03f5ff]/20 bg-black/40 p-6 backdrop-blur-sm"
const HEADING_CLASS = "text-2xl font-bold text-white [text-shadow:0_0_20px_rgba(3,245,255,0.5)]"
const LABEL_CLASS = "text-xs font-semibold tracking-widest text-[#03f5ff] uppercase"

/** Every state row always renders, including the two that read zero today, so the block
 *  cannot contradict the always-six legend sitting next to it. */
const STATS_ENTRIES: ReadonlyArray<{ key: string; label: string; value: number }> = [
  ...STAND_STATUSES.map((status) => ({
    key: status,
    label: STATS_COPY[status],
    value: STATUS_COUNTS[status],
  })),
  { key: "total", label: STATS_COPY.total, value: TOTAL_STANDS },
]

export default function InfoPanel({ selectedStand: stand }: InfoPanelProps) {
  const reduced = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // `preventScroll` is what keeps §7.3's "no scroll-jump on plain click" true: a bare
    // `focus()` scrolls the viewport, which on mobile would yank the user off the plan
    // they just tapped. The deep-link path scrolls on purpose instead.
    if (stand) headingRef.current?.focus({ preventScroll: true })
  }, [stand])

  return (
    <aside
      role="region"
      aria-live="polite"
      aria-label={A11Y_COPY.panelRegion}
      className={PANEL_CLASS}
    >
      {/* The heading sits outside AnimatePresence on purpose: with `mode="wait"` the
          outgoing panel is still mounted while it fades, so a heading inside the swap
          would receive focus and then be unmounted mid-animation. */}
      <h3 ref={headingRef} tabIndex={-1} className={HEADING_CLASS}>
        {stand ? stand.label : PANEL_INITIAL_COPY.title}
      </h3>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stand?.id ?? "initial"}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={reduced ? { duration: 0 } : { duration: 0.2 }}
          className="mt-5"
        >
          {!stand ? (
            <>
              <p className="text-base text-gray-300">{PANEL_INITIAL_COPY.body}</p>

              <section aria-label={STATS_COPY.label} className="mt-6">
                <h4 className={LABEL_CLASS}>{STATS_COPY.label}</h4>
                <dl className="mt-4 space-y-2">
                  {STATS_ENTRIES.map((row) => (
                    <div
                      key={row.key}
                      className={`flex items-center justify-between ${
                        row.key === "total" ? "border-t border-white/10 pt-2" : ""
                      }`}
                    >
                      <dt className="text-sm text-gray-300">{row.label}</dt>
                      <dd className="text-sm font-semibold text-white">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </>
          ) : (
            <>
              <dl className="space-y-4">
                <div>
                  <dt className={LABEL_CLASS}>{PANEL_COPY.category}</dt>
                  <dd className="mt-1 flex items-center gap-2 text-base text-white">
                    <span
                      aria-hidden
                      className="h-3 w-3 rounded-sm border border-white/30"
                      style={{ backgroundColor: CATEGORY_COLOR[stand.category] }}
                    />
                    {CATEGORY_LABEL[stand.category]}
                  </dd>
                </div>

                <div>
                  <dt className={LABEL_CLASS}>{PANEL_COPY.location}</dt>
                  <dd className="mt-1 text-base text-gray-200">{stand.location}</dd>
                </div>

                <div>
                  <dt className={LABEL_CLASS}>{PANEL_COPY.area}</dt>
                  <dd className="mt-1 text-base text-gray-200">
                    {stand.areaM2} {PANEL_COPY.areaUnit}
                  </dd>
                </div>

                <div>
                  <dt className={LABEL_CLASS}>{PANEL_COPY.status}</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    <span
                      className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm text-white"
                      style={
                        {
                          borderColor: `${STATUS_COLOR[stand.status]}33`,
                          backgroundColor: `${STATUS_COLOR[stand.status]}1A`,
                        } as CSSProperties
                      }
                    >
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: STATUS_COLOR[stand.status] }}
                      />
                      {STATUS_COPY[stand.status].label}
                    </span>
                    {/* Tested on the copy, not on a status literal: `disponible` ships an
                        empty note, and this renders nothing at all in that case. */}
                    {Boolean(STATUS_COPY[stand.status].note) && (
                      <p className="text-sm text-gray-300">{STATUS_COPY[stand.status].note}</p>
                    )}
                  </dd>
                </div>
              </dl>

              <section className="mt-6">
                <h4 className={LABEL_CLASS}>{PANEL_COPY.benefits}</h4>
                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  {STAND_BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span aria-hidden className="mt-0.5 text-[#03f5ff]">
                        •
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-6">
                <h4 className={LABEL_CLASS}>{PRICE_COPY.label}</h4>
                <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-black/30 p-4">
                  {PRICE_STAGES.map((stage) => {
                    const isActive = stage === ACTIVE_STAGE
                    return (
                      <div
                        key={stage}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors motion-reduce:transition-none ${
                          isActive ? "bg-white/10" : "bg-transparent"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <span className="text-sm font-medium text-white">
                            {STAGE_LABEL[stage]}
                          </span>
                          {isActive && (
                            <span className="mt-1 inline-flex w-fit rounded-full border border-[#03f5ff]/40 bg-[#03f5ff]/20 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-[#03f5ff] uppercase sm:mt-0">
                              {PRICE_COPY.active}
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1 text-right">
                          <span className="text-xs text-gray-400">{STAGE_PREFIX[stage]}</span>
                          <span className="text-base font-semibold text-white">
                            {formatPrice(getTierPrice(stand.category, stage))}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-2 text-xs text-gray-400">{PRICE_COPY.footnote}</p>
              </section>

              <a
                href="#contacto"
                aria-label={ctaLabel(stand)}
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#03f5ff] to-[#0090ff] px-6 py-3 text-center text-base font-bold text-[#002c6b] shadow-lg transition-transform hover:scale-[1.02] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b]"
              >
                {CTA_COPY.label}
              </a>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  )
}
