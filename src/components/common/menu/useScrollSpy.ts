"use client"

import { useEffect, useState } from "react"

/** The band that decides the active anchor: the middle 10% of the viewport, with 45% trimmed
 *  off the top and bottom. A section is "active" while it crosses that band, so exactly one
 *  label lights up at a time instead of every section on screen. */
const ROOT_MARGIN = "-45% 0px -45% 0px"

/** Tracks which of `ids` is currently crossing the middle of the viewport.
 *
 *  `ids` must be referentially stable (a module constant) — it is an effect dependency.
 *  Anchors that are not on the page are skipped, and the last active id sticks when nothing
 *  occupies the band (the very top and bottom of the document). */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            return
          }
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
