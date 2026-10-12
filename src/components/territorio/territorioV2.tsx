"use client"

/**
 * `#territorio` chapter (spec homepage-narrative, brief §34–§38). Client island: static narrative
 * (Chaco, Argentina, Latinoamérica, Gobierno) plus the flag-gated §37 `ImpactCounters`. Entrance
 * motion is disabled under `prefers-reduced-motion`.
 */

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

import ImpactCounters from "./impactCounters"
import {
  ARGENTINA,
  CHACO,
  GOBIERNO,
  LATINOAMERICA,
  TERRITORIO,
} from "./territorioData"

const BLOCK_CLASS =
  "rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8"

function BlockMotion({
  reduced,
  delay = 0,
  className,
  children,
}: {
  reduced: boolean | null
  delay?: number
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: reduced ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function TerritorioV2() {
  const reduced = useReducedMotion()

  return (
    <section
      id="territorio"
      aria-labelledby="territorio-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
        {TERRITORIO.kicker}
      </p>
      <h2
        id="territorio-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {TERRITORIO.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {TERRITORIO.lead}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <BlockMotion reduced={reduced} className="h-full">
          <div className={`h-full ${BLOCK_CLASS}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
              {CHACO.title}
            </p>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{CHACO.headline}</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">{CHACO.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {CHACO.levels.map((level) => (
                <li
                  key={level}
                  className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-100"
                >
                  {level}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
              {CHACO.closing}
            </p>
          </div>
        </BlockMotion>

        <BlockMotion reduced={reduced} delay={0.05} className="h-full">
          <div className={`h-full ${BLOCK_CLASS}`}>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{ARGENTINA.headline}</h3>
            <p className="mt-2 text-sm font-medium text-[#9fd8ff]">{ARGENTINA.subtitle}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {ARGENTINA.nodes.map((node) => (
                <li
                  key={node}
                  className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >
                  {node}
                </li>
              ))}
            </ul>
          </div>
        </BlockMotion>

        <BlockMotion reduced={reduced} delay={0.05} className="h-full">
          <div className={`h-full ${BLOCK_CLASS}`}>
            <h3 className="text-xl font-bold text-white sm:text-2xl">{LATINOAMERICA.headline}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {LATINOAMERICA.countries.map((country) => (
                <li
                  key={country}
                  className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#03f5ff]"
                >
                  {country}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-gray-300">
              {LATINOAMERICA.message}
            </p>
          </div>
        </BlockMotion>

        <BlockMotion reduced={reduced} className="h-full">
          <div className={`h-full ${BLOCK_CLASS}`}>
            <ImpactCounters />
          </div>
        </BlockMotion>
      </div>

      <BlockMotion reduced={reduced} delay={0.05} className="mt-6">
        <div className={BLOCK_CLASS}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
            Gobierno · Ciencia · Empresa · Educación
          </p>
          <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{GOBIERNO.headline}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300">{GOBIERNO.body}</p>
          <p className="mt-5 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
            {GOBIERNO.quote}
          </p>
        </div>
      </BlockMotion>
    </section>
  )
}