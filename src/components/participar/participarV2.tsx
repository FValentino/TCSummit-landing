"use client"

/**
 * `#participar` closing segment (spec homepage-narrative anchor order; brief §40 Gala and §42
 * CTA Final). Client island: the venue block opens M10 via `VenueModal`, and the final CTA is
 * the audience-segmented `AudienceCta` (forms M7–M9 land in S7). §41 countdown is deferred.
 * Entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import AudienceCta from "@/components/publics/AudienceCta"

import VenueModal from "./venueModal"
import { GALA, PARTICIPAR } from "./participarData"

export default function ParticiparV2() {
  const reduced = useReducedMotion()
  const [venueOpen, setVenueOpen] = useState(false)

  return (
    <section
      id="participar"
      aria-labelledby="participar-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF] sm:text-sm">
          {PARTICIPAR.kicker}
        </p>
        <h2
          id="participar-title"
          className="mt-3 mx-auto max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          {PARTICIPAR.headline}
        </h2>
        <p className="mt-6 mx-auto max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
          {PARTICIPAR.lead}
        </p>

        <div className="mt-12 rounded-3xl border border-[#F107CA]/25 bg-white/5 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF]">
            {GALA.kicker}
          </p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{GALA.title}</h3>
          <p className="mt-2 text-lg font-medium text-[#F71ABF]">{GALA.headline}</p>
          <p className="mt-3 mx-auto max-w-2xl text-sm leading-relaxed text-gray-300">
            {GALA.body}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {GALA.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-[#F107CA]/20 bg-white/5 px-3 py-1 text-xs text-gray-300"
              >
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-5 border-l-2 border-[#F107CA]/50 pl-4 text-base italic text-gray-200">
            {GALA.closing}
          </p>

          <button
            type="button"
            onClick={() => setVenueOpen(true)}
            className="mt-6 inline-flex items-center rounded-lg border border-[#F107CA]/40 px-4 py-2 text-sm font-semibold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
          >
            Conocé más
          </button>
        </div>

        <p className="mt-16 mx-auto max-w-2xl text-xl font-semibold text-white sm:text-2xl">
          {PARTICIPAR.punchline}
        </p>
        <div className="mt-8 flex justify-center">
          <AudienceCta />
        </div>
      </motion.div>

      <VenueModal open={venueOpen} onClose={() => setVenueOpen(false)} />
    </section>
  )
}