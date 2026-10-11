"use client"

/**
 * Universe detail modal (M1, spec publics-depth). Renders the selected universe over the shared
 * `Modal` primitive, which owns focus trap, Escape, focus restore and scroll-lock. Entry point
 * for the six universe cards; the trigger never navigates.
 */

import { useRef } from "react"

import Modal from "@/components/common/modals/Modal"

import type { Universe } from "./summitData"

const TITLE_ID = "universe-modal-title"

interface UniverseModalProps {
  universe: Universe | null
  onClose: () => void
}

export default function UniverseModal({ universe, onClose }: UniverseModalProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const open = universe !== null

  return (
    <Modal
      open={open}
      onRequestClose={onClose}
      labelledBy={TITLE_ID}
      initialFocusRef={titleRef}
      panelClassName="relative my-8 w-full max-w-lg rounded-2xl border border-[#03f5ff]/30 bg-[#001b3d] p-6 text-white shadow-2xl sm:p-8"
    >
      <p className="text-sm font-semibold tracking-[0.2em] text-[#03f5ff]">
        {universe?.number ?? ""}
      </p>
      <h2
        id={TITLE_ID}
        ref={titleRef}
        tabIndex={-1}
        className="mt-1 text-3xl font-bold text-white focus:outline-none"
      >
        {universe?.title ?? ""}
      </h2>
      <p className="mt-2 text-sm font-medium text-[#9fd8ff]">{universe?.tagline ?? ""}</p>
      <p className="mt-4 text-base leading-relaxed text-gray-300">{universe?.detail ?? ""}</p>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-xl border-2 border-[#03f5ff] px-6 py-3 font-bold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
      >
        Cerrar
      </button>
    </Modal>
  )
}
