"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import type { Stand } from "./floorplanData"
import StandDetail from "./standDetail"
import { useScrollLock } from "./useScrollLock"
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

/** Every element a `Tab` can land on inside the dialog. `[tabindex]:not([tabindex="-1"])` is
 *  what keeps the title heading, which is the entry point focus is moved to, out of the cycle. */
const FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"

const isContained = (parent: HTMLElement, child: EventTarget | null): boolean =>
  child instanceof Node && parent.contains(child)

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
  // The page behind the scrim is frozen, not the dialog: the card keeps its own
  // `overflow-y-auto`, so a stand with a long detail still scrolls while the plan behind it
  // stays exactly where the user left it.
  const releaseScroll = useScrollLock(open)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const pressOriginRef = useRef<EventTarget | null>(null)
  const navigatingRef = useRef(false)

  // The stand on screen, held past the close so the card fades out with its contents instead
  // of emptying first. State rather than a ref because the render reads it, and it doubles as
  // the record of what was open — which is what focus has to go back to. React's documented
  // "adjust state as a prop changes": the prop owns the value while the dialog is open and
  // the state only takes over once it stops arriving.
  const [shown, setShown] = useState<Stand | undefined>(stand)
  if (stand !== undefined && stand !== shown) setShown(stand)

  const transition = reduced ? { duration: 0 } : { duration: 0.18 }

  useEffect(() => {
    if (!open) return
    navigatingRef.current = false
    // `preventScroll` is what keeps §7.3's "no scroll-jump on plain click" true: a bare
    // `focus()` scrolls the viewport, which on mobile would yank the user off the plan they
    // just tapped. The deep-link path scrolls on purpose instead.
    headingRef.current?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (open || shown === undefined) return
    // The CTA is a navigation, not a dismissal: handing focus back to a hotspot at the far
    // end of the page would leave the user tabbing through 115 stands to reach the form the
    // link just sent them to.
    if (navigatingRef.current) return
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
  }, [open, shown])

  const requestContact = () => {
    navigatingRef.current = true
    // Ahead of `onRequestClose`, and ahead of the frame below: the effect cleanup that
    // normally unlocks the page cannot be relied on to have run by the time that
    // `scrollIntoView` fires, and a pinned body would swallow it.
    releaseScroll()
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // `defaultPrevented` means something nested already consumed the key — a control with an
    // Escape handler of its own, or a composition in flight. Dismissing there would cut the
    // interaction short rather than end it.
    if (event.key === "Escape") {
      if (event.defaultPrevented) return
      // `useFloorplan` also clears the selection on Escape, from a `window` listener. It would
      // bail on its own guard — focus is inside a `[role=dialog]` — but stopping propagation
      // makes the two handlers independent of that guard instead of merely agreeing today.
      event.stopPropagation()
      onRequestClose()
      return
    }

    if (event.key !== "Tab") return
    const dialog = dialogRef.current
    if (dialog === null) return
    const stops = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    if (stops.length === 0) return
    const first = stops[0]
    const last = stops[stops.length - 1]
    const active = document.activeElement
    if (event.shiftKey) {
      if (active === first || !isContained(dialog, active)) {
        event.preventDefault()
        last.focus()
      }
      return
    }
    if (active === last || !isContained(dialog, active)) {
      event.preventDefault()
      first.focus()
    }
  }

  // Both ends of the press have to be the scrim itself. A pointer-down on the scrim that
  // releases over the card is a drag or a text selection, not a dismiss, and a press that
  // starts inside the dialog never reaches the scrim as a target at all.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pressOriginRef.current = event.target
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const onScrim = event.target === event.currentTarget
    if (onScrim && pressOriginRef.current === event.currentTarget) onRequestClose()
    pressOriginRef.current = null
  }

  return (
    // `inert` rather than `aria-hidden`: it removes the background from the accessibility
    // tree *and* from focus and hit testing in one attribute, where `aria-hidden` alone
    // leaves the background focusable — the exact escape a focus trap then has to paper over.
    // The `z` is above `menu.tsx`'s navigation, or the menu would stay clickable on top of
    // an open dialog.
    <motion.div
      inert={!open}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={transition}
      // The paint and the blur are both dropped when closed rather than left at opacity 0:
      // `initial` is what puts `opacity: 0` into the prerendered HTML — without it the route
      // ships a closed dialog as a full-viewport black scrim over the whole page — and a
      // permanent `backdrop-blur` is a per-frame cost nobody asked to pay on a phone.
      // `items-start` + `overflow-y-auto` here, with `my-auto` on the card, rather than
      // `items-center` on both. Flex centring an item taller than its line box pushes the
      // top of that item *above* the scrim, where the scrim's own scroll cannot reach it, so
      // the card's top border disappears while its bottom is still on screen — a dialog that
      // reads as glued to the top of the page. `my-auto` centres the card when the viewport
      // has room for it and collapses to zero when it does not, so the scrim then scrolls
      // from the top and both borders are reachable. Centring on the parent alone cannot
      // express both behaviours at once.
      className={`fixed inset-0 z-[1100] flex items-center justify-center overflow-y-auto p-4 ${
        open ? "bg-black/60 backdrop-blur-sm" : "pointer-events-none"
      }`}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.96 }}
        transition={transition}
        // `dvh`, not `vh`: the standing URL bar on a phone is what makes `100vh` taller than
        // the visible viewport, and a dialog sized against it would hang off the bottom.
        // `my-auto` is what centres the card now that the scrim is `items-start` — see the
        // note on the scrim above for why the centring lives on the child and not the parent.
        className="mt-15 max-h-[80%] w-full max-w-lg shrink-0 overflow-y-auto rounded-2xl border border-[#03f5ff]/20 bg-black/40 p-6 backdrop-blur-sm"
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
      </motion.div>
    </motion.div>
  )
}