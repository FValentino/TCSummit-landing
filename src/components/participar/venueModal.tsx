"use client"

/**
 * M10 — Venue detail (brief §40, spec publics-depth modal inventory). A thin consumer of the
 * shared `DetailModal`; the trigger lives in `ParticiparV2` so the closing segment keeps
 * control of its layout.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { VENUE_DETAIL } from "./participarData"

interface VenueModalProps {
  open: boolean
  onClose: () => void
}

export default function VenueModal({ open, onClose }: VenueModalProps) {
  return <DetailModal open={open} onClose={onClose} content={VENUE_DETAIL} />
}