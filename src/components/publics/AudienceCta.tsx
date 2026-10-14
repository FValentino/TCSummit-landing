"use client"

/**
 * Audience-aware primary CTA (spec audience-selection §CTA segmentation). Neutral default is
 * `[QUIERO SER PARTE]`; once a public is selected it renders that public's action and target.
 * Modal-backed CTAs (M7–M9) are wired in S7 — until then they resolve to the `#participar`
 * closing segment so no trigger is dead.
 */

import Link from "next/link"

import { AUDIENCES, NEUTRAL_CTA, type AudienceMode } from "./audienceData"
import { useAudience } from "./useAudience"

interface ResolvedCta {
  label: string
  href: string
}

const MODAL_CTA_FALLBACK = "#participar"
const NEUTRAL: ResolvedCta = { label: NEUTRAL_CTA.label, href: NEUTRAL_CTA.target }

function resolveCta(mode: AudienceMode | null): ResolvedCta {
  if (mode === null) return NEUTRAL
  const audience = AUDIENCES.find((entry) => entry.id === mode)
  if (audience === undefined) return NEUTRAL
  const routeHref = audience.ctaHref
  const hasRoute = routeHref !== undefined && routeHref !== "#"
  return { label: audience.cta, href: hasRoute ? routeHref : MODAL_CTA_FALLBACK }
}

const CTA_CLASS =
  "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#03f5ff] to-[#0090ff] px-8 py-4 text-lg font-bold text-[#002c6b] shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.97]"

export default function AudienceCta() {
  const { mode } = useAudience()
  const cta = resolveCta(mode)

  if (cta.href.startsWith("/")) {
    return (
      <Link href={cta.href} className={CTA_CLASS}>
        {cta.label}
      </Link>
    )
  }

  return (
    <a href={cta.href} className={CTA_CLASS}>
      {cta.label}
    </a>
  )
}
