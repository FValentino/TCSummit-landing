import type { Metadata } from "next"

import DepthPage from "@/components/routes/depthPage"
import { HACKATHON_CONTENT } from "@/components/routes/routesData"

export const metadata: Metadata = {
  title: "Hackathon | TechnoCrypto Summit 2027",
  description:
    "Una idea, un equipo, un desafío, un prototipo: la Hackathon de TechnoCrypto Summit 2027.",
}

export default function HackathonPage() {
  return <DepthPage {...HACKATHON_CONTENT} />
}
