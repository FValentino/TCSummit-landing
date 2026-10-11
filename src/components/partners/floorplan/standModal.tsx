"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import type { Stand } from "./floorplanData"
import StandDetail from "./standDetail"
import Modal from "@/components/common/modals/Modal"
import { A11Y_COPY, CLOSE_GLYPH } from "./floorplanCopy"

const TITLE_ID = "plano-stand-detalle"
/** Where focus lands when the hotspot that opened the dialog cannot take it back — the one
 *  `<h2>` of the section, made focusable without becoming a tab stop. */
const SECTION_TITLE_ID = "plano-titulo"
/** The id the contact section already publishes on `/partners`; the same target the CTA
 *  anchor pointed at before this dialog existed. */
const CONTACT_ID = "contacto"

const CLOSE_BUTTON_CLASS =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg leading-none text-white transition-colors duration-150 motion-reduce:transition-none hover:bg-[#03f5ff]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03f5ff]"

/** The card surface, unchanged from when this file owned the whole dialog: `dvh`-safe height
 *  cap, and it keeps its own `overflow-y-auto` so a long stand detail scrolls while the plan
 *  behind it stays exactly where the user left it. */
const PANEL_CLASS =
  "mt-15 max-h-[80%] w-full max-w-lg shrink-0 overflow-y-auto rounded-2xl border border-[#03f5ff]/20 bg-black/40 p-6 backdrop-blur-sm"

interface StandModalProps {
  /** `undefined` means closed. The dialog is never conditionally mounted, because the scrim
   *  has to stay in the DOM to animate out and, more importantly, so that closing it is a
   *  render of this component rather than an unmount of the component that owns the state. */
  selectedStand?: Stand
  onRequestClose: () => void
}

export default function StandModal({
  selectedStand: stand,
  onRequestClose,
}: StandModalProps) {
  const reduced = useReducedMotion()
  const open = stand !== undefined
  const headingRef = useRef<HTMLHeadingElement>(null)
  const navigatingRef = useRef(false)
  const releaseScrollRef = useRef<(() => void) | null>(null)

  // The stand on screen, held past the close so the card fades out with its contents instead
  // of emptying first. State rather than a ref because the render reads it, and it doubles as
  // the record of what was open — which is what focus has to go back to. React's documented
  // "adjust state as a prop changes": the prop owns the value while the dialog is open and
  // the state only takes over once it stops arriving.
  const [shown, setShown] = useState<Stand | undefined>(stand)
  if (stand !== undefined && stand !== shown) setShown(stand)

  // Reset on the open edge, so the next dismissal is treated as a dismissal again.
  useEffect(() => {
    if (open) navigatingRef.current = false
  }, [open])

  const requestContact = () => {
    navigatingRef.current = true
    // Ahead of `onRequestClose`, and ahead of the frame below: the effect cleanup that
    // normally unlocks the page cannot be relied on to have run by the time that
    // `scrollIntoView` fires, and a pinned body would swallow it.
    releaseScrollRef.current?.()
    onRequestClose()
    requestAnimationFrame(() => {
      const target = document.getElementById(CONTACT_ID)
      if (target === null) return
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
      // `preventScroll` so the programmatic focus cannot cancel the scroll above.
      target.setAttribute("tabindex", "-1")
      target.focus({ preventScroll: true })
    })
  }

  const restoreFocus = () => {
    // The CTA is a navigation, not a dismissal: handing focus back to a hotspot at the far
    // end of the page would leave the user tabbing through 115 stands to reach the form the
    // link just sent them to.
    if (navigatingRef.current || shown === undefined) return
    const trigger = document.querySelector<HTMLButtonElement>(
      `[data-stand-id="${shown.id}"]`,
    )
    // A `disabled` button cannot be focused, and a stand the filters just dimmed is exactly
    // that — so the section heading is the floor rather than a silent drop to `<body>`.
    if (trigger !== null && !trigger.disabled) {
      trigger.focus({ preventScroll: true })
      return
    }
    document.getElementById(SECTION_TITLE_ID)?.focus({ preventScroll: true })
  }

  return (
    <Modal
      open={open}
      onRequestClose={onRequestClose}
      labelledBy={TITLE_ID}
      initialFocusRef={headingRef}
      restoreFocus={restoreFocus}
      releaseScrollRef={releaseScrollRef}
      panelClassName={PANEL_CLASS}
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id={TITLE_ID}
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-bold text-white [text-shadow:0_0_20px_rgba(3,245,255,0.5)]"
        >
          {shown?.label}
        </h2>
        <button
          type="button"
          onClick={onRequestClose}
          aria-label={A11Y_COPY.closeSelection}
          className={CLOSE_BUTTON_CLASS}
        >
          {CLOSE_GLYPH.close}
        </button>
      </div>

      {shown !== undefined && (
        <div className="mt-5">
          <StandDetail stand={shown} onRequestContact={requestContact} />
        </div>
      )}
    </Modal>
  )
}
