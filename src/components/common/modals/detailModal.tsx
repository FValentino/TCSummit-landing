"use client"

/**
 * Data-driven detail modal for the short-depth disclosures M1–M6/M10 (design §Modal Primitive).
 * One scaffold: focus trap, Escape, focus restore and scroll-lock all come from `Modal`, and each
 * modal is only a `DetailContent` — a universe, a Science Hub area list, a Future Lab process. The
 * consumers keep their own triggers and state; this file owns the dialog body alone, so the M-series
 * never re-implements the primitive.
 */

import Link from "next/link"
import { useRef, useId } from "react"

import Modal from "@/components/common/modals/Modal"

export interface DetailContent {
  /** Small label above the title (universe number, section kicker). */
  eyebrow?: string
  title: string
  /** Optional line under the title (universe tagline, section subtitle). */
  subtitle?: string
  body?: string
  /** Optional detail list rendered as chips (areas, process steps, topics). */
  items?: readonly string[]
  itemsLabel?: string
  /** Closing line, visually set apart (a quote or footnote). */
  footnote?: string
  cta?: { label: string; href: string }
}

interface DetailModalProps {
  open: boolean
  onClose: () => void
  content: DetailContent
}

const PANEL_CLASS =
  "relative my-8 w-full max-w-xl rounded-2xl border border-[#03f5ff]/30 bg-[#001b3d] p-6 text-white shadow-2xl sm:p-8"

const CTA_CLASS =
  "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#03f5ff] to-[#0090ff] px-6 py-3 font-bold text-[#002c6b]"

export default function DetailModal({ open, onClose, content }: DetailModalProps) {
  const titleId = useId()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const releaseScrollRef = useRef<(() => void) | null>(null)
  const { cta } = content
  const ctaIsRoute = cta?.href.startsWith("/") ?? false

  // A CTA can close the dialog and scroll the page in the same tick; the primitive's synchronous
  // release is what stops the still-pinned body from swallowing that scroll.
  const handleCtaClick = () => {
    releaseScrollRef.current?.()
    onClose()
  }

  return (
    <Modal
      open={open}
      onRequestClose={onClose}
      labelledBy={titleId}
      initialFocusRef={titleRef}
      releaseScrollRef={releaseScrollRef}
      panelClassName={PANEL_CLASS}
    >
      {content.eyebrow !== undefined ? (
        <p className="text-sm font-semibold tracking-[0.2em] text-[#03f5ff]">{content.eyebrow}</p>
      ) : null}

      {content.title !== "" ? (
        <h2
          id={titleId}
          ref={titleRef}
          tabIndex={-1}
          className="mt-1 text-2xl font-bold text-white focus:outline-none sm:text-3xl"
        >
          {content.title}
        </h2>
      ) : null}

      {content.subtitle !== undefined ? (
        <p className="mt-2 text-sm font-medium text-[#9fd8ff]">{content.subtitle}</p>
      ) : null}

      {content.body !== undefined ? (
        <p className="mt-4 text-base leading-relaxed text-gray-300">{content.body}</p>
      ) : null}

      {content.items !== undefined && content.items.length > 0 ? (
        <div className="mt-5">
          {content.itemsLabel !== undefined ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
              {content.itemsLabel}
            </p>
          ) : null}
          <ul className="mt-3 flex flex-wrap gap-2">
            {content.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#03f5ff]/25 bg-white/5 px-3 py-1 text-sm text-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {content.footnote !== undefined ? (
        <p className="mt-5 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
          {content.footnote}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {cta !== undefined ? (
          ctaIsRoute ? (
            <Link href={cta.href} onClick={handleCtaClick} className={CTA_CLASS}>
              {cta.label}
            </Link>
          ) : (
            <a href={cta.href} onClick={handleCtaClick} className={CTA_CLASS}>
              {cta.label}
            </a>
          )
        ) : null}

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-xl border-2 border-[#03f5ff] px-6 py-3 font-bold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  )
}
