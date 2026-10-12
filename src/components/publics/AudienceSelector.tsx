"use client"

/**
 * Four-public segmented selector (spec audience-selection). Exposed as an ARIA radiogroup:
 * roving tabindex, Arrow/Home/End keys move selection, Spanish labels, neutral by default.
 * Selecting the active chip clears back to neutral.
 */

import { useRef, type KeyboardEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { AUDIENCES, type AudienceDescriptor } from "./audienceData"
import { useAudience } from "./useAudience"

const CHIP_BASE =
  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F107CA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#001b3d]"
const CHIP_IDLE = "border-[#F107CA]/40 text-gray-200 hover:border-[#F107CA] hover:text-white"
const CHIP_ACTIVE = "border-transparent bg-gradient-to-r from-[#F107CA] to-[#C5128E] text-[#2D0448]"

export default function AudienceSelector() {
  const { mode, select } = useAudience()
  const reduced = useReducedMotion()
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeIndex = mode === null ? -1 : AUDIENCES.findIndex((audience) => audience.id === mode)
  // No selection yet → the first chip is the tab stop; otherwise the selected one is.
  const tabbableIndex = activeIndex >= 0 ? activeIndex : 0

  function moveTo(index: number) {
    const count = AUDIENCES.length
    const next = (index + count) % count
    select(AUDIENCES[next].id)
    chipRefs.current[next]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault()
        moveTo(index + 1)
        break
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault()
        moveTo(index - 1)
        break
      case "Home":
        event.preventDefault()
        moveTo(0)
        break
      case "End":
        event.preventDefault()
        moveTo(AUDIENCES.length - 1)
        break
      default:
        break
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="¿Cómo querés participar?"
      className="flex flex-wrap justify-center gap-2 md:justify-start"
    >
      {AUDIENCES.map((audience: AudienceDescriptor, index) => {
        const checked = mode === audience.id
        return (
          <motion.button
            key={audience.id}
            ref={(element) => {
              chipRefs.current[index] = element
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={index === tabbableIndex ? 0 : -1}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            onClick={() => select(checked ? null : audience.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`${CHIP_BASE} ${checked ? CHIP_ACTIVE : CHIP_IDLE}`}
          >
            {audience.label}
          </motion.button>
        )
      })}
    </div>
  )
}
