"use client"

/**
 * M2 — Science Hub area detail (brief §15). A thin consumer of the shared `DetailModal`: the
 * scaffold lives there, this file only binds the M2 content. The trigger stays in `CienciaTeaser`
 * so the teaser card keeps control of its layout.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { SCIENCE_HUB_DETAIL } from "./scienceData"

interface ScienceHubModalProps {
  open: boolean
  onClose: () => void
}

export default function ScienceHubModal({ open, onClose }: ScienceHubModalProps) {
  return <DetailModal open={open} onClose={onClose} content={SCIENCE_HUB_DETAIL} />
}
