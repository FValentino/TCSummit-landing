"use client"

/**
 * Team carousel (client island for `#equipo`). The roster grows over time, so it scrolls one
 * "page" at a time instead of laying out a grid: responsive 1/2/3 per view, autoplay that pauses
 * on hover/focus, prev/next buttons and dots. Autoplay and the slide transition are disabled
 * under `prefers-reduced-motion`.
 */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { teamData } from "./teamData"

const AUTOPLAY_MS = 4000

/** Single source for the breakpoint → slides-per-view and, via the same number, the slide width. */
function itemsForWidth(width: number): number {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

function subscribeToWidth(onChange: () => void) {
  window.addEventListener("resize", onChange)
  return () => window.removeEventListener("resize", onChange)
}

const NAV_BUTTON_CLASS =
  "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border-2 border-[#03f5ff]/50 bg-black/60 p-2 text-[#03f5ff] backdrop-blur-sm transition-colors hover:bg-[#03f5ff]/20"

export default function TeamCarousel() {
  const reduced = useReducedMotion()
  // Read the breakpoint via useSyncExternalStore (SSR-safe, defaults to 3 on the server) instead
  // of a resize effect — a synchronous setState inside an effect fails `react-hooks/set-state-in-effect`.
  const itemsPerView = useSyncExternalStore(
    subscribeToWidth,
    () => itemsForWidth(window.innerWidth),
    () => 3
  )
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const maxIndex = Math.max(0, teamData.length - itemsPerView)
  // Derived, so a resize that shrinks the range never needs a state-fixing effect.
  const current = Math.min(index, maxIndex)
  const slideWidth = 100 / itemsPerView

  const step = useCallback(
    (delta: number) => {
      setIndex(() => {
        if (maxIndex === 0) return 0
        const next = current + delta
        if (next < 0) return maxIndex
        if (next > maxIndex) return 0
        return next
      })
    },
    [current, maxIndex]
  )

  useEffect(() => {
    if (reduced || paused || maxIndex === 0) return
    const timer = setInterval(() => step(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [reduced, paused, maxIndex, step])

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label="Equipo organizador"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {maxIndex > 0 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Ver miembros anteriores"
            className={`${NAV_BUTTON_CLASS} left-0`}
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Ver más miembros"
            className={`${NAV_BUTTON_CLASS} right-0`}
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <div className="mx-10 overflow-hidden sm:mx-14">
        <ul
          className={`flex ${reduced ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(-${current * slideWidth}%)` }}
        >
          {teamData.map((member, i) => (
            <li
              key={member.id}
              aria-hidden={i >= current && i < current + itemsPerView ? undefined : "true"}
              className="shrink-0 px-3"
              style={{ width: `${slideWidth}%` }}
            >
              <div
                className="flex h-full flex-col items-center rounded-3xl border-2 bg-white/5 p-8 text-center"
                style={{ borderColor: member.neonColor }}
              >
                <div
                  className="relative h-28 w-28 overflow-hidden rounded-full border-4"
                  style={{ borderColor: member.neonColor }}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 80vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold" style={{ color: member.neonColor }}>
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {maxIndex > 0 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setIndex(dot)}
              aria-label={`Ir al grupo ${dot + 1}`}
              aria-current={dot === current ? "true" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                dot === current ? "bg-[#03f5ff]" : "bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
