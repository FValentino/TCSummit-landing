"use client"

/**
 * `#experiencia` chapter (spec homepage-narrative, brief §30). Client island: the event map is a
 * set of cards, and each card's "Conocé más" opens its own M4 detail from `experienceData`
 * without navigating. Entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import ExperienceMapElementModal from "./experienceMapElementModal"
import { EXPERIENCIA, EXPERIENCE_ELEMENTS } from "./experienceData"

export default function ExperienceV2() {
  const reduced = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)
  const activeElement =
    EXPERIENCE_ELEMENTS.find((element) => element.id === openId) ?? null

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {EXPERIENCIA.kicker}
      </p>
      <h2
        id="experiencia-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {EXPERIENCIA.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {EXPERIENCIA.lead}
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERIENCE_ELEMENTS.map((element, index) => (
          <motion.li
            key={element.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.05 }}
          >
            <button
              type="button"
              onClick={() => setOpenId(element.id)}
              className="flex h-full w-full flex-col items-start rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-6 text-left transition-colors hover:border-[#03f5ff]/60"
            >
              <span className="text-[#03f5ff]">{element.label}</span>
              <span className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">
                {element.teaser}
              </span>
              <span className="mt-4 inline-flex items-center rounded-lg border border-[#03f5ff]/40 px-3 py-1 text-xs font-semibold text-[#03f5ff]">
                Conocé más
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <ExperienceMapElementModal
        element={activeElement}
        onClose={() => setOpenId(null)}
      />
    </section>
  )
}