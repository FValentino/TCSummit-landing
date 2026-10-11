"use client"

import { useCallback, useEffect } from "react"

/** `overflow: hidden` on the root is enough on desktop and does nothing on iOS Safari, where
 *  the page still scrolls under the dialog and drags the content with it. Pinning the body
 *  with `position: fixed` and an inverted offset is the half that works on both, and the
 *  scroll position is stored so that unlocking can put the viewport back exactly where the
 *  user left it — without the restore, every close would snap the page to the top.
 *
 *  The state is module-level rather than per-hook so the lock is a single idempotent
 *  resource: React 18's StrictMode mounts, unmounts and remounts effects in development,
 *  and a lock keyed to component identity would unlock on the throwaway pass and leave the
 *  page unpinned under a dialog that is still open. Both entry points check for null, so
 *  locking twice and unlocking twice are both no-ops. */
interface SavedStyles {
  htmlOverflow: string
  htmlPaddingRight: string
  bodyPosition: string
  bodyTop: string
  bodyLeft: string
  bodyRight: string
  bodyWidth: string
}

let saved: { x: number; y: number; styles: SavedStyles } | null = null

const lockPageScroll = (): void => {
  if (saved !== null) return
  const html = document.documentElement
  const body = document.body
  const { scrollX, scrollY } = window
  saved = {
    x: scrollX,
    y: scrollY,
    styles: {
      htmlOverflow: html.style.overflow,
      htmlPaddingRight: html.style.paddingRight,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    },
  }

  // Measured before the overflow change, because after it `clientWidth` already equals
  // `innerWidth` and the scrollbar is invisible. Without this the content behind the scrim
  // widens by the scrollbar width and the whole page jumps sideways as the dialog opens.
  const scrollbar = window.innerWidth - html.clientWidth

  html.style.overflow = "hidden"
  if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
  body.style.position = "fixed"
  body.style.top = `-${scrollY}px`
  body.style.left = `-${scrollX}px`
  body.style.right = "0"
  body.style.width = "100%"
}

const unlockPageScroll = (): void => {
  if (saved === null) return
  const { x, y, styles } = saved
  saved = null
  const html = document.documentElement
  const body = document.body
  html.style.overflow = styles.htmlOverflow
  html.style.paddingRight = styles.htmlPaddingRight
  body.style.position = styles.bodyPosition
  body.style.top = styles.bodyTop
  body.style.left = styles.bodyLeft
  body.style.right = styles.bodyRight
  body.style.width = styles.bodyWidth
  // Restored last and from the stored offset: the styles above put the body back in flow at
  // the document origin, so the viewport has to be put back too or the page is left reading
  // from the top no matter where the user was.
  window.scrollTo(x, y)
}

/** `active` is the dialog's own open state, so the lock and the scrim can never disagree.
 *
 *  Returns a synchronous `release` for the one path that cannot wait for the effect cleanup:
 *  the contact CTA closes the dialog and scrolls to the form in the same tick, and React does
 *  not guarantee that a passive effect's cleanup runs before a `requestAnimationFrame`
 *  callback. Releasing from the effect alone would leave the body pinned when that scroll
 *  fires, and "Ir al contacto" would silently do nothing. Every other close — Escape, the
 *  scrim, the close button — has no scroll of its own to protect, so the cleanup covers it. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lockPageScroll()
    return unlockPageScroll
  }, [active])

  return useCallback(() => unlockPageScroll(), [])
}
