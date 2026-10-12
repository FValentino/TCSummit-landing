import { flags } from "@/config/flags"

import { CONICET_BLOCK } from "./scienceData"

/**
 * CONICET block (brief §14, spec legal-gates §56). The institutional authorization gate: below
 * stage 4 it renders the approved conceptual framing ("Ciencia argentina en TechnoCrypto Summit")
 * and never the name or logo; from stage 4 the authorized block replaces it. Server-rendered — the
 * decision is a build-time flag, so no client JS is needed. M5 (the gated detail modal) lands with
 * the rest of the M-series in S5.
 */
export default function ConicetBlock() {
  const { conicetAuthorized } = flags
  const copy = conicetAuthorized ? CONICET_BLOCK.authorized : CONICET_BLOCK.neutral

  return (
    <div className="rounded-3xl border border-[#03f5ff]/20 bg-white/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
        {conicetAuthorized ? "Institucional" : "Sistema científico-tecnológico"}
      </p>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{copy.title}</h3>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-300">{copy.body}</p>
    </div>
  )
}
