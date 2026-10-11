"use client"

/**
 * Interactive grid of the six universe cards (brief §12). Each card opens its M1 detail modal
 * via `UniverseModal`; the grid itself is the client island inside the server-rendered `#summit`
 * chapter. Entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { UNIVERSES, type Universe } from "./summitData"
import UniverseModal from "./universeModal"

export default function UniversesGrid() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<Universe | null>(null)

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {UNIVERSES.map((universe, index) => (
          <motion.li
            key={universe.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.05 }}
          >
            <article className="flex h-full flex-col rounded-2xl border border-[#03f5ff]/25 bg-white/5 p-6 transition-colors hover:border-[#03f5ff]/60">
              <span className="text-sm font-semibold tracking-[0.2em] text-[#03f5ff]">
                {universe.number}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white">{universe.title}</h3>
              <p className="mt-2 flex-1 text-sm text-gray-300">{universe.tagline}</p>
              <button
                type="button"
                onClick={() => setActive(universe)}
                className="mt-5 inline-flex w-fit items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
              >
                Conocé más
              </button>
            </article>
          </motion.li>
        ))}
      </ul>

      <UniverseModal universe={active} onClose={() => setActive(null)} />
    </>
  )
}
