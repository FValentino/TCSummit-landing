import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Closing CTA for the homepage's "project info" block (Summit + Equipo): sends the reader to the
 * standalone `/roadmap` timeline before the thematic axes begin. Lives in the page shell — not
 * inside a chapter — so `TeamV2` stays unaware that the roadmap exists.
 *
 * Not a chapter: it has no anchor id and is not part of `ANCHOR_ORDER`/the sticky menu, so it never
 * enters the scrollspy. The lead-in line keeps it from reading as an orphan button ("roadmap del
 * equipo" instead of "roadmap del proyecto").
 */
export default function RoadmapCta() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff] sm:text-sm">
          El camino del proyecto
        </p>
        <p className="mt-3 text-base leading-relaxed text-gray-300 sm:text-lg">
          Los hitos que construyeron TechnoCrypto Summit y las etapas que estamos transitando.
        </p>
        <Link
          href="/roadmap"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#03f5ff] px-8 py-4 text-lg font-bold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10 sm:w-1/2"
        >
          Ver el Roadmap
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
