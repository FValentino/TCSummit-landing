"use client"

/**
 * Science Hub (§15) + Future Lab (§16) teaser cards. The client island of the `#ciencia` chapter:
 * each card's "Conocé más" opens its short-depth modal (M2/M3) without navigating (spec
 * publics-depth). Entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import FutureLabModal from "./futureLabModal"
import ScienceHubModal from "./scienceHubModal"
import { SCIENCE_TEASERS, type ScienceTeaser } from "./scienceData"

type ActiveModal = ScienceTeaser["id"] | null

export default function CienciaTeaser() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<ActiveModal>(null)

  return (
    <>
      <ul className="grid gap-6 lg:grid-cols-2">
        {SCIENCE_TEASERS.map((teaser, index) => (
          <motion.li
            key={teaser.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.05 }}
          >
            <article className="flex h-full flex-col rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8 transition-colors hover:border-[#03f5ff]/60">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
                {teaser.kicker}
              </p>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{teaser.headline}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">{teaser.body}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {teaser.preview.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-xs text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setActive(teaser.id)}
                className="mt-6 inline-flex w-fit items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
              >
                Conocé más
              </button>
            </article>
          </motion.li>
        ))}
      </ul>

      <ScienceHubModal open={active === "hub"} onClose={() => setActive(null)} />
      <FutureLabModal open={active === "lab"} onClose={() => setActive(null)} />
    </>
  )
}
