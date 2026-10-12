"use client"

/**
 * §19 universitarios detail. A thin consumer of the shared `DetailModal`: the scaffold lives
 * there, this file only binds the content. The trigger stays in `EducationV2`.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { UNIVERSITARIOS_DETAIL } from "./educationData"

interface UniversitariosModalProps {
  open: boolean
  onClose: () => void
}

export default function UniversitariosModal({ open, onClose }: UniversitariosModalProps) {
  return <DetailModal open={open} onClose={onClose} content={UNIVERSITARIOS_DETAIL} />
}
