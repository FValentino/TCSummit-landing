"use client"

/**
 * M6 — Think Tank actor detail (brief §25). A thin consumer of the shared `DetailModal`: the
 * scaffold (focus trap, Escape, scroll-lock) lives there, this file only binds the M6 content. The
 * trigger stays in `InnovationV2` so the chapter keeps control of its layout.
 */

import DetailModal from "@/components/common/modals/detailModal"

import { THINK_TANK_DETAIL } from "./innovationData"

interface ThinkTankModalProps {
  open: boolean
  onClose: () => void
}

export default function ThinkTankModal({ open, onClose }: ThinkTankModalProps) {
  return <DetailModal open={open} onClose={onClose} content={THINK_TANK_DETAIL} />
}
