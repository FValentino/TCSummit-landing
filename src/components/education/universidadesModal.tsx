"use client"

/**
 * §20 universidades detail. A thin consumer of the shared `DetailModal`: the scaffold lives there,
 * this file only binds the content. The trigger stays in `EducationV2`.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { UNIVERSIDADES_DETAIL } from "./educationData"

interface UniversidadesModalProps {
  open: boolean
  onClose: () => void
}

export default function UniversidadesModal({ open, onClose }: UniversidadesModalProps) {
  return <DetailModal open={open} onClose={onClose} content={UNIVERSIDADES_DETAIL} />
}
