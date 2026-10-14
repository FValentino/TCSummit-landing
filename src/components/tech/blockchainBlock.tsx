import Link from "next/link"

import { flags } from "@/config/flags"

import { BLOCKCHAIN, TCST_TEASER } from "./techData"

/**
 * Blockchain block (brief §27). Server-rendered: the topic list and the closing message. Kept
 * intentionally free of investment framing — blockchain as technology to understand and apply.
 * The §28 TCST teaser only renders while `tcstEnabled` is on (spec legal-gates §55).
 */
export default function BlockchainBlock() {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#03f5ff]/25 bg-white/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
        {BLOCKCHAIN.kicker}
      </p>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{BLOCKCHAIN.title}</h3>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03f5ff]">
          {BLOCKCHAIN.topicsLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {BLOCKCHAIN.topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-[#03f5ff]/20 bg-white/5 px-3 py-1 text-sm text-gray-200"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 flex-1 border-l-2 border-[#03f5ff]/50 pl-4 text-base italic text-gray-200">
        {BLOCKCHAIN.message}
      </p>

      {flags.tcstEnabled ? (
        <Link
          href={TCST_TEASER.href}
          className="mt-6 inline-flex w-fit items-center rounded-lg border border-[#03f5ff]/40 px-4 py-2 text-sm font-semibold text-[#03f5ff] transition-colors hover:bg-[#03f5ff]/10"
        >
          {TCST_TEASER.label}
        </Link>
      ) : null}
    </article>
  )
}