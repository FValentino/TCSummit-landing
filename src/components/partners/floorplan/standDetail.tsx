"use client"

import type { CSSProperties, MouseEvent } from "react"
import type { Stand } from "./floorplanData"
import {
  ACTIVE_STAGE,
  PLACEHOLDER_MODE,
  PRICE_STAGES,
  formatPrice,
  getTierPrice,
} from "./floorplanData"
import {
  CATEGORY_COLOR,
  CATEGORY_LABEL,
  CTA_COPY,
  DRAFT_NOTICE,
  PANEL_COPY,
  PRICE_COPY,
  STAGE_LABEL,
  STAGE_PREFIX,
  STAND_BENEFITS,
  STATUS_COLOR,
  STATUS_COPY,
  areaText,
  ctaLabel,
} from "./floorplanCopy"

interface StandDetailProps {
  stand: Stand
  /** The dialog owns the close-and-navigate sequence; this only hands the intent over. */
  onRequestContact: () => void
}

const LABEL_CLASS = "text-xs font-semibold tracking-widest text-[#03f5ff] uppercase"

/** The body of the stand dialog. Split out of the chrome so the focus trap, the scrim and
 *  the dismissal rules stay readable on their own — this is the half that is pure content and
 *  the half that is pure mechanism, and merging them is what pushed `infoPanel.tsx` to
 *  carry two unrelated responsibilities at once. */
export default function StandDetail({ stand, onRequestContact }: StandDetailProps) {
  const handleCta = (event: MouseEvent<HTMLAnchorElement>) => {
    // The dialog closes in the same tick as this click, and React detaches this anchor
    // before the browser runs the default action for the event — so the native fragment
    // navigation cannot be trusted to fire. Taking it over by hand is also what lets it
    // happen one frame later, which is the first frame where `#plano` is no longer inert and
    // the contact section is able to take focus.
    event.preventDefault()
    onRequestContact()
  }

  return (
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
          <dd className="mt-1 text-base text-gray-200">{areaText(stand)}</dd>
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
        <h3 className={LABEL_CLASS}>{PANEL_COPY.benefits}</h3>
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
        <h3 className={LABEL_CLASS}>{PRICE_COPY.label}</h3>
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
                  <span className="text-sm font-medium text-white">{STAGE_LABEL[stage]}</span>
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
        onClick={handleCta}
        aria-label={ctaLabel(stand)}
        className="mt-6 flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#03f5ff] to-[#0090ff] px-6 py-3 text-center text-base font-bold text-[#002c6b] shadow-lg transition-transform hover:scale-[1.02] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#002c6b]"
      >
        {CTA_COPY.label}
      </a>

      {/* The standing disclosure, gated on `PLACEHOLDER_MODE` rather than on a second flag:
          the same switch that arms the per-area qualifier, so the caveat and the disclosure
          cannot be withdrawn one without the other. It has no live region any more — the
          dialog is focus-trapped rather than announced, so nothing re-reads it on a change. */}
      {PLACEHOLDER_MODE && (
        <p className="mt-5 border-t border-white/10 pt-4 text-xs text-gray-400">{DRAFT_NOTICE}</p>
      )}
    </>
  )
}