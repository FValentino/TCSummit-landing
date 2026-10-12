import Link from "next/link"
import type { ReactNode } from "react"

import type { DepthSection } from "./routesData"

/**
 * Server-rendered shell for the depth routes (spec publics-depth). Owns the `main` landmark, one
 * `h1` per route, and the section cards from data, so each route page stays a thin content binding.
 */
interface DepthPageProps {
  kicker: string
  title: string
  lead: string
  sections?: readonly DepthSection[]
  cta?: { label: string; href: string }
  children?: ReactNode
}

export default function DepthPage({
  kicker,
  title,
  lead,
  sections = [],
  cta,
  children,
}: DepthPageProps) {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold text-[#F71ABF] hover:underline"
      >
        ← Volver al inicio
      </Link>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF] sm:text-sm">
        {kicker}
      </p>
      <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">{lead}</p>

      {children}

      {sections.length > 0 ? (
        <div className="mt-12 grid gap-6">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-3xl border border-[#F107CA]/25 bg-white/5 p-8"
            >
              <h2 className="text-xl font-bold text-white sm:text-2xl">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                {section.body}
              </p>

              {section.items !== undefined && section.items.length > 0 ? (
                <div className="mt-5">
                  {section.itemsLabel !== undefined ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF]">
                      {section.itemsLabel}
                    </p>
                  ) : null}
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[#F107CA]/30 bg-white/5 px-3 py-1 text-sm text-gray-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}

      {cta !== undefined ? (
        <div className="mt-12">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#F107CA] to-[#C5128E] px-6 py-3 font-bold text-[#2D0448]"
          >
            {cta.label}
          </Link>
        </div>
      ) : null}
    </main>
  )
}
