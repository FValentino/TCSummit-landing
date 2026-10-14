"use client"

/**
 * `#educacion` chapter (spec homepage-narrative, brief §17–§21; spec publics-depth "Overlap —
 * /estudiantes disposition"). Client island: each teaser's "Conocé más" opens its §18–§21 detail
 * without navigating. The chapter is the fold target for `/estudiantes` content, which migrates in
 * S8 together with the `permanentRedirect('/#educacion')`; this module owns the narrative now so
 * that move is purely mechanical. Entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import EstudiantesModal from "./estudiantesModal"
import UniversitariosModal from "./universitariosModal"
import UniversidadesModal from "./universidadesModal"
import VocacionesModal from "./vocacionesModal"
import { EDUCACION, EDUCATION_TEASERS, type EducationModalId } from "./educationData"

export default function EducationV2() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<EducationModalId | null>(null)
  const close = () => setActive(null)

  return (
    <section
      id="educacion"
      aria-labelledby="educacion-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {EDUCACION.kicker}
      </p>
      <h2
        id="educacion-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {EDUCACION.headline}
      </h2>
      <p className="mt-2 text-lg font-medium text-[#9fd8ff]">{EDUCACION.subtitle}</p>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {EDUCACION.lead}
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {EDUCATION_TEASERS.map((teaser, index) => (
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

      <EstudiantesModal open={active === "estudiantes"} onClose={close} />
      <UniversitariosModal open={active === "universitarios"} onClose={close} />
      <UniversidadesModal open={active === "universidades"} onClose={close} />
      <VocacionesModal open={active === "vocaciones"} onClose={close} />
    </section>
  )
}
