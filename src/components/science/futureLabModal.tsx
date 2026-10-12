"use client"

/**
 * M3 — Future Lab process detail (brief §16). A thin consumer of the shared `DetailModal`: the
 * scaffold lives there, this file only binds the M3 content. The trigger stays in `CienciaTeaser`
 * so the teaser card keeps control of its layout.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { FUTURE_LAB_DETAIL } from "./scienceData"

interface FutureLabModalProps {
  open: boolean
  onClose: () => void
}

export default function FutureLabModal({ open, onClose }: FutureLabModalProps) {
  return <DetailModal open={open} onClose={onClose} content={FUTURE_LAB_DETAIL} />
}
