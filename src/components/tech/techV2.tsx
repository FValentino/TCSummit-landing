import BlockchainBlock from "./blockchainBlock"
import IaBlock from "./iaBlock"
import { TECH } from "./techData"

/**
 * `#tecnologia` chapter (spec homepage-narrative, brief §26–§27). Server-rendered — the two blocks
 * are static narrative, so the whole chapter ships without hydration. Interactive depth, if any,
 * would arrive as its own client island rather than by making the shell client.
 */
export default function TechV2() {
  return (
    <section
      id="tecnologia"
      aria-labelledby="tecnologia-title"
      className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F71ABF] sm:text-sm">
        {TECH.kicker}
      </p>
      <h2
        id="tecnologia-title"
        className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        {TECH.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
        {TECH.lead}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <IaBlock />
        <BlockchainBlock />
      </div>
    </section>
  )
}
