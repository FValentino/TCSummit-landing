"use client"

/**
 * §21 vocaciones científicas detail. A thin consumer of the shared `DetailModal`: the scaffold
 * lives there, this file only binds the content. The trigger stays in `EducationV2`.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { VOCACIONES_DETAIL } from "./educationData"

interface VocacionesModalProps {
  open: boolean
  onClose: () => void
}

export default function VocacionesModal({ open, onClose }: VocacionesModalProps) {
  return <DetailModal open={open} onClose={onClose} content={VOCACIONES_DETAIL} />
}
