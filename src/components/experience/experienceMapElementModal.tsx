"use client"

/**
 * M4 — Experience element detail (brief §30). A thin consumer of the shared `DetailModal`: the
 * scaffold (focus trap, Escape, scroll-lock) lives there, this file only binds whatever map
 * element is active in `#experiencia`. When nothing is selected the dialog stays mounted but
 * closed, so opening is a render, not a mount.
 */

import DetailModal, { type DetailContent } from "@/components/common/modals/detailModal"

import type { ExperienceElement } from "./experienceData"

/** Fallback for the closed state — a valid, empty detail keeps `aria-labelledby` stable. */
const EMPTY_DETAIL: DetailContent = { title: "Experiencia" }

interface ExperienceMapElementModalProps {
  element: ExperienceElement | null
  onClose: () => void
}

export default function ExperienceMapElementModal({
  element,
  onClose,
}: ExperienceMapElementModalProps) {
  return (
    <DetailModal open={element !== null} onClose={onClose} content={element?.detail ?? EMPTY_DETAIL} />
  )
}