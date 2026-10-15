"use client"

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react"
import { createPortal } from "react-dom"
import { motion, useReducedMotion } from "framer-motion"
import { useScrollLock } from "@/components/common/hooks/useScrollLock"

/** Every element a `Tab` can land on inside the dialog. `[tabindex]:not([tabindex="-1"])` is
 *  what keeps a heading that exists only as the entry point out of the tab cycle. */
const FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"

const isContained = (parent: HTMLElement, child: EventTarget | null): boolean =>
  child instanceof Node && parent.contains(child)

/** `document.body` only exists on the client, but the server render and the first client render
 *  have to agree or hydration mismatches. `useSyncExternalStore` is the hydration-safe read: the
 *  server snapshot is `false`, so the scrim is withheld until the client has committed. */
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false
const useHydrated = (): boolean =>
  useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

export type ModalVariant = "center" | "slide-over"

/** Per-variant scrim layout. The dialog surface itself belongs to the consumer, so each
 *  modal keeps full control of its own width, padding and chrome. */
const SCRIM_LAYOUT: Record<ModalVariant, string> = {
  // Centred in the full viewport; the `min-h-full` wrapper below lets a tall dialog grow and
  // scroll from the top instead of being clipped, so no fixed-menu offset is needed.
  center: "items-center justify-center px-4",
  "slide-over": "items-stretch justify-end",
}

export interface ModalProps {
  open: boolean
  onRequestClose: () => void
  /** id of the element that names the dialog; wired to `aria-labelledby`. */
  labelledBy: string
  variant?: ModalVariant
  /** Focused when the dialog opens. */
  initialFocusRef?: RefObject<HTMLElement | null>
  /** Extra classes for the dialog surface (width, padding, background). */
  panelClassName?: string
  /** Called once after the dialog closes, to return focus. When omitted, focus goes back to
   *  whatever held it when the dialog opened. */
  restoreFocus?: () => void
  /** Receives the scroll-lock's synchronous release, for the one path that closes the dialog
   *  and scrolls the page in the same tick (e.g. a "go to contact" CTA). */
  releaseScrollRef?: RefObject<(() => void) | null>
  children: ReactNode
}

/** Shared dialog primitive: scrim, `role="dialog"` + `aria-modal`, focus trap, Escape,
 *  focus restore and background scroll-lock. Extracted from the proven `/partners`
 *  `standModal` so future modals reuse one behaviour instead of re-implementing it. It is
 *  never unmounted while open — `open` alone drives the enter/leave animation, and the
 *  scrim stays in the DOM so closing is a render, not an unmount. */
export default function Modal({
  open,
  onRequestClose,
  labelledBy,
  variant = "center",
  initialFocusRef,
  panelClassName = "",
  restoreFocus,
  releaseScrollRef,
  children,
}: ModalProps) {
  const reduced = useReducedMotion()
  const releaseScroll = useScrollLock(open)
  const hydrated = useHydrated()
  const dialogRef = useRef<HTMLDivElement>(null)
  const pressOriginRef = useRef<EventTarget | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (releaseScrollRef === undefined) return
    releaseScrollRef.current = releaseScroll
    return () => {
      releaseScrollRef.current = null
    }
  }, [releaseScrollRef, releaseScroll])

  useEffect(() => {
    // Only the open/close edge acts; `restoreFocus` and `initialFocusRef` identities change
    // every render, and re-running on those would steal focus mid-interaction.
    if (open === wasOpenRef.current) return
    wasOpenRef.current = open
    if (open) {
      openerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      // `preventScroll` keeps a plain open from yanking the viewport off the page behind.
      initialFocusRef?.current?.focus({ preventScroll: true })
      return
    }
    if (restoreFocus !== undefined) restoreFocus()
    else openerRef.current?.focus({ preventScroll: true })
    openerRef.current = null
  }, [open, restoreFocus, initialFocusRef])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // `defaultPrevented` means something nested already consumed the key — a control with an
    // Escape handler of its own, or a composition in flight. Dismissing there would cut the
    // interaction short rather than end it.
    if (event.key === "Escape") {
      if (event.defaultPrevented) return
      // Stopping propagation keeps this independent of any window-level Escape listener that
      // bails on its own `[role=dialog]` guard, instead of merely agreeing with it today.
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
  // releases over the panel is a drag or a text selection, not a dismiss, and a press that
  // starts inside the dialog never reaches the scrim as a target at all.
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pressOriginRef.current = event.target
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const onScrim = event.target === event.currentTarget
    if (onScrim && pressOriginRef.current === event.currentTarget) onRequestClose()
    pressOriginRef.current = null
  }

  const transition = reduced ? { duration: 0 } : { duration: 0.18 }

  // Before hydration there is no portal target; rendering the scrim inline here would also
  // mismatch the server output and re-introduce the stacking-context bug below.
  if (!hydrated) return null

  // Portalled to `body` on purpose. Consumers mount the dialog inside `section` roots that
  // establish their own stacking context (`relative z-10`), so a `z-[1100]` left inline is
  // trapped under the root-level fixed menu (`z-1000`) and the menu paints over the dialog's
  // top edge. Detaching to `body` lets the scrim's z-index compete with the menu in the root
  // context, where it wins. `inert` rather than `aria-hidden`: it removes the background from
  // the accessibility tree *and* from focus and hit testing in one attribute.
  return createPortal(
    <motion.div
      inert={!open}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={transition}
      // `initial` puts `opacity: 0` into the prerendered HTML — without it a closed dialog
      // ships as a full-viewport scrim over the whole page — and the blur is dropped when
      // closed rather than paid for every frame on a phone.
      className={`fixed inset-0 z-[1100] overflow-y-auto ${
        open ? "bg-black/60 backdrop-blur-sm" : "pointer-events-none"
      }`}
    >
      {/* The flex wrapper is a full viewport tall so a short dialog is centred while a tall one
       *  grows past the fold instead of being clipped at the top and becoming unreachable. */}
      <div className={`flex h-auto ${SCRIM_LAYOUT[variant]}`}>
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.96 }}
          transition={transition}
          className={panelClassName}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  )
}
