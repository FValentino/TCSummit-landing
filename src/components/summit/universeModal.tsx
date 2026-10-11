"use client"

/**
 * Universe detail modal (M1, spec publics-depth). Now a thin consumer of the shared `DetailModal`
 * (design §Modal Primitive) instead of its own dialog body: the scaffold, focus trap and
 * scroll-lock live there, M1 only maps a `Universe` to content. The public API is unchanged, so
 * `UniversesGrid` needs no edits. The CTA satisfies the spec scenario "M1 opens … and a CTA" and
 * resolves to `#participar` until S7 wires the lead modals.
 */

import DetailModal, { type DetailContent } from "@/components/common/modals/detailModal"

import type { Universe } from "./summitData"

interface UniverseModalProps {
  universe: Universe | null
  onClose: () => void
}

/** Rendered while closed (the scrim is inert and transparent); only `title` is required. */
const CLOSED: DetailContent = { title: "" }

export default function UniverseModal({ universe, onClose }: UniverseModalProps) {
  const content: DetailContent =
    universe === null
      ? CLOSED
      : {
          eyebrow: universe.number,
          title: universe.title,
          subtitle: universe.tagline,
          body: universe.detail,
          cta: { label: "Quiero ser parte", href: "#participar" },
        }

  return <DetailModal open={universe !== null} onClose={onClose} content={content} />
}
