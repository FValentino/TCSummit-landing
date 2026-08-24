"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type CarouselNavigationAction = "prev" | "next" | "go"

export interface UseCarouselOptions {
  /** Total number of slides/items. */
  total: number
  /** Wrap around on next/prev (default false = clamp at the bounds). */
  wrap?: boolean
  /** Advance one item every autoPlayInterval ms. */
  autoPlay?: boolean
  autoPlayInterval?: number
  /** ArrowLeft/ArrowRight keyboard navigation. */
  keyboard?: boolean
  /**
   * Called right before the index changes with the resolved target.
   * Lets a consumer scroll its track or set an animation direction.
   */
  onNavigate?: (action: CarouselNavigationAction, target: number) => void
}

export interface UseCarouselReturn {
  index: number
  canPrev: boolean
  canNext: boolean
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  /** Raw index sync (e.g. an index derived from a scroll position). */
  setIndex: (index: number) => void
}

export function useCarousel({
  total,
  wrap = false,
  autoPlay = false,
  autoPlayInterval = 4000,
  keyboard = false,
  onNavigate,
}: UseCarouselOptions): UseCarouselReturn {
  const [index, setIndexState] = useState(0)
  const indexRef = useRef(0)
  const onNavigateRef = useRef(onNavigate)

  useEffect(() => {
    onNavigateRef.current = onNavigate
  }, [onNavigate])

  const resolve = useCallback(
    (target: number) => {
      if (total <= 0) return 0
      if (wrap) return ((target % total) + total) % total
      return Math.max(0, Math.min(total - 1, target))
    },
    [total, wrap],
  )

  const update = useCallback(
    (target: number, action: CarouselNavigationAction) => {
      const resolved = resolve(target)
      if (resolved !== indexRef.current) {
        indexRef.current = resolved
        setIndexState(resolved)
      }
      onNavigateRef.current?.(action, resolved)
    },
    [resolve],
  )

  const goTo = useCallback((target: number) => update(target, "go"), [update])
  const next = useCallback(() => update(indexRef.current + 1, "next"), [update])
  const prev = useCallback(() => update(indexRef.current - 1, "prev"), [update])

  const setIndex = useCallback(
    (target: number) => {
      const resolved = resolve(target)
      if (resolved === indexRef.current) return
      indexRef.current = resolved
      setIndexState(resolved)
    },
    [resolve],
  )

  // Keep the index inside bounds when the total shrinks (e.g. a responsive itemsPerView).
  useEffect(() => {
    if (indexRef.current > total - 1) {
      update(total - 1, "go")
    }
  }, [total, update])

  useEffect(() => {
    if (!autoPlay || total < 2) return
    const id = setInterval(() => {
      update((indexRef.current + 1) % total, "next")
    }, autoPlayInterval)
    return () => clearInterval(id)
  }, [autoPlay, total, autoPlayInterval, update])

  useEffect(() => {
    if (!keyboard) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev()
      else if (event.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keyboard, prev, next])

  const canPrev = total > 0 && (wrap || index > 0)
  const canNext = total > 0 && (wrap || index < total - 1)

  return { index, canPrev, canNext, goTo, next, prev, setIndex }
}
