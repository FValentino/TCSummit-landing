"use client"

/**
 * Sponsors detail disclosure (brief §39). Prompt-assigned as the S6.2 depth modal; spec-canonical
 * M10 is the venue detail in `#participar` (see `participar/venueModal.tsx`). A thin consumer of
 * the shared `DetailModal` — the trigger lives in `EmpresasV2`.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { SPONSORS_DETAIL } from "./empresasData"

interface SponsorsDetailModalProps {
  open: boolean
  onClose: () => void
}

export default function SponsorsDetailModal({ open, onClose }: SponsorsDetailModalProps) {
  return <DetailModal open={open} onClose={onClose} content={SPONSORS_DETAIL} />
}