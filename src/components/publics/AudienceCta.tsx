"use client"

/**
 * Audience-aware primary CTA (spec audience-selection §CTA segmentation). Neutral default is
 * `[QUIERO SER PARTE]` → `#participar`; once a public is selected it renders that public's action
 * and opens the matching lead-form modal (M7 asistente, M8 empresa, M9 institución/gobierno).
 * The empresa form links on to `/partners` so the direct sponsorship route is preserved.
 */

import { useState } from "react"

import AsistenteForm from "@/components/forms/asistenteForm"
import EmpresaForm from "@/components/forms/empresaForm"
import InstitucionalForm from "@/components/forms/institucionalForm"

import { AUDIENCES, NEUTRAL_CTA, type AudienceMode } from "./audienceData"
import { useAudience } from "./useAudience"

const CTA_CLASS =
  "inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-[#F107CA] to-[#C5128E] px-8 py-4 text-lg font-bold text-[#2D0448] shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.97]"

const NEUTRAL_LABEL = NEUTRAL_CTA.label
const NEUTRAL_HREF = NEUTRAL_CTA.target

export default function AudienceCta() {
  const { mode } = useAudience()
  const [openModal, setOpenModal] = useState<AudienceMode | null>(null)

  const close = () => setOpenModal(null)

  // No selection (or an unknown one): the neutral CTA drives to the closing `#participar` segment.
  if (mode === null || !AUDIENCES.some((entry) => entry.id === mode)) {
    return (
      <a href={NEUTRAL_HREF} className={CTA_CLASS}>
        {NEUTRAL_LABEL}
      </a>
    )
  }

  const audience = AUDIENCES.find((entry) => entry.id === mode)

  return (
    <>
      <button type="button" onClick={() => setOpenModal(mode)} className={CTA_CLASS}>
        {audience?.cta}
      </button>

      <AsistenteForm open={openModal === "asistente"} onClose={close} />
      <EmpresaForm open={openModal === "empresa"} onClose={close} />
      <InstitucionalForm
        open={openModal === "institucion" || openModal === "gobierno"}
        variant={openModal === "gobierno" ? "gobierno" : "institucion"}
        onClose={close}
      />
    </>
  )
}
