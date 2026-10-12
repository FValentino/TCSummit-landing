import type { Metadata } from "next"

import DepthPage from "@/components/routes/depthPage"
import { SPEAKERS_CONTENT } from "@/components/routes/routesData"

export const metadata: Metadata = {
  title: "Speakers | TechnoCrypto Summit 2027",
  description:
    "Investigadores, especialistas, fundadores y referentes que comparten lo que saben en TechnoCrypto Summit 2027.",
}

export default function SpeakersPage() {
  return <DepthPage {...SPEAKERS_CONTENT} />
}
