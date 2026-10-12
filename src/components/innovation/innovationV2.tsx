"use client"

/**
 * `#innovacion` chapter (spec homepage-narrative, brief §23–§25). Client island: the Think Tank
 * trigger opens M6 from data, so the chapter hydrates as one unit rather than splitting off a
 * separate teaser file (the requested file set is `innovationData` + `thinkTankModal`). The §23/§24
 * blocks are static; entrance motion is disabled under `prefers-reduced-motion`.
 */

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import ThinkTankModal from "./thinkTankModal"
import {
  CIENCIA_EMPRESA,
  INNOVACION,
  INTERDISCIPLINARIEDAD,
  THINK_TANK,
} from "./innovationData"

export default function InnovationV2() {
  const reduced = useReducedMotion()
  const [thinkTankOpen, setThinkTankOpen] = useState(false)

  return (
    <section
      id="innovacion"
      aria-labelledby="innovacion-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {INNOVACION.kicker}
      </p>
      <h2
        id="innovacion-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {INNOVACION.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {INNOVACION.lead}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex h-full flex-col rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
            {CIENCIA_EMPRESA.kicker}
          </p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{CIENCIA_EMPRESA.title}</h3>

          <ol className="mt-5 flex flex-wrap items-center gap-2">
            {CIENCIA_EMPRESA.flow.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-[#03f5ff]/25 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-100">
                  {step}
                </span>
                {index < CIENCIA_EMPRESA.flow.length - 1 ? (
                  <span aria-hidden className="text-sm text-[#03f5ff]">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-6 flex-1 space-y-3 border-l-2 border-[#03f5ff]/50 pl-4">
            {CIENCIA_EMPRESA.lines.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-gray-300">
                {line}
              </p>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.05 }}
          className="flex h-full flex-col rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
            {INTERDISCIPLINARIEDAD.kicker}
          </p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
            {INTERDISCIPLINARIEDAD.title}
          </h3>

          <ul className="mt-5 flex flex-wrap gap-2">
            {INTERDISCIPLINARIEDAD.disciplines.map((discipline) => (
              <li
                key={discipline}
                className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-xs text-gray-300"
              >
                {discipline}
              </li>
            ))}
          </ul>

          <p className="mt-6 flex-1 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
            {INTERDISCIPLINARIEDAD.message}
          </p>
        </motion.article>
      </div>

      <motion.article
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
          {THINK_TANK.kicker}
        </p>
        <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{THINK_TANK.title}</h3>
        <p className="mt-2 max-w-3xl text-sm font-medium text-[#9fd8ff]">{THINK_TANK.subtitle}</p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THINK_TANK.actors.map((actor) => (
            <li
              key={actor.name}
              className="rounded-2xl border border-[#03f5ff]/20 bg-white/5 px-4 py-3"
            >
              <p className="text-sm font-bold text-[#03f5ff]">{actor.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-300">{actor.role}</p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setThinkTankOpen(true)}
          className="mt-6 inline-flex w-fit items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
        >
          Conocé más
        </button>
      </motion.article>

      <ThinkTankModal open={thinkTankOpen} onClose={() => setThinkTankOpen(false)} />
    </section>
  )
}
