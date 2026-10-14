"use client"

/**
 * §18 estudiantes secundarios detail. A thin consumer of the shared `DetailModal`: the scaffold
 * lives there, this file only binds the content. The trigger stays in `EducationV2`.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { ESTUDIANTES_DETAIL } from "./educationData"

interface EstudiantesModalProps {
  open: boolean
  onClose: () => void
}

export default function EstudiantesModal({ open, onClose }: EstudiantesModalProps) {
  return <DetailModal open={open} onClose={onClose} content={ESTUDIANTES_DETAIL} />
}
