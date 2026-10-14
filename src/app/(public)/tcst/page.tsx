import type { Metadata } from "next"

import DepthPage from "@/components/routes/depthPage"
import { TCST_CONTENT, TCST_DISCLAIMER, TCST_NEUTRAL } from "@/components/routes/routesData"
import { flags } from "@/config/flags"

export const metadata: Metadata = {
  title: "TCST | TechnoCrypto Summit 2027",
  description:
    "TCST: una propuesta tecnológica y educativa para explorar blockchain en TechnoCrypto Summit 2027.",
}

/**
 * `/tcst` owns every TCST mention (spec legal-gates §55). The disclaimer is always rendered; the
 * token framing only publishes while `tcstEnabled` is on.
 */
export default function TcstPage() {
  const content = flags.tcstEnabled ? TCST_CONTENT : TCST_NEUTRAL

  return (
    <DepthPage {...content}>
      <p
        role="note"
        className="mt-8 rounded-2xl border border-[#03f5ff]/30 bg-white/5 p-5 text-sm leading-relaxed text-gray-200"
      >
        {TCST_DISCLAIMER}
      </p>
    </DepthPage>
  )
}
