"use client"

/**
 * `#empresas` chapter (spec homepage-narrative, brief §22 + §39). Client island: the six §22
 * participation verbs render as cards with an Empresa CTA, and the §39 sponsors block opens its
 * detail disclosure via `SponsorsDetailModal` before routing to `/partners`. Entrance motion is
 * disabled under `prefers-reduced-motion`.
 */

import Link from "next/link"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import SponsorsDetailModal from "./sponsorsDetailModal"
import {
  EMPRESA_BENEFITS,
  EMPRESA_CTA,
  EMPRESAS,
  SPONSORS,
  SPONSOR_BENEFITS,
  SPONSORS_CTA,
} from "./empresasData"

const CARD_CLASS =
  "rounded-3xl border border-[#F107CA]/25 bg-white/5 p-6 transition-colors hover:border-[#F107CA]/60"

export default function EmpresasV2() {
  const reduced = useReducedMotion()
  const [sponsorsOpen, setSponsorsOpen] = useState(false)

  return (
    <section
      id="empresas"
      aria-labelledby="empresas-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF] sm:text-sm">
        {EMPRESAS.kicker}
      </p>
      <h2
        id="empresas-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {EMPRESAS.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {EMPRESAS.lead}
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EMPRESA_BENEFITS.map((benefit, index) => (
          <motion.li
            key={benefit.verb}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.05 }}
            className="h-full"
          >
            <article className={`h-full ${CARD_CLASS}`}>
              <p className="text-2xl font-bold text-[#F71ABF]">{benefit.verb}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{benefit.body}</p>
            </article>
          </motion.li>
        ))}
      </ul>

      <div className="mt-8">
        <a
          href={EMPRESA_CTA.href}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#F107CA] to-[#C5128E] px-6 py-3 font-bold text-[#2D0448] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {EMPRESA_CTA.label}
        </a>
      </div>

      <motion.article
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mt-16 rounded-3xl border border-[#F107CA]/25 bg-white/5 p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF]">
          {SPONSORS.kicker}
        </p>
        <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{SPONSORS.headline}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-300">{SPONSORS.lead}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {SPONSOR_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-full border border-[#F107CA]/30 bg-white/5 px-3 py-1 text-xs text-gray-300"
            >
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSponsorsOpen(true)}
            className="inline-flex items-center rounded-lg border border-[#F107CA]/40 px-4 py-2 text-sm font-semibold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
          >
            Conocé más
          </button>
          <Link
            href={SPONSORS_CTA.href}
            className="inline-flex items-center rounded-lg border border-[#F107CA]/40 px-4 py-2 text-sm font-semibold text-[#F71ABF] transition-colors hover:bg-[#F107CA]/10"
          >
            {SPONSORS_CTA.label}
          </Link>
        </div>
      </motion.article>

      <SponsorsDetailModal open={sponsorsOpen} onClose={() => setSponsorsOpen(false)} />
    </section>
  )
}