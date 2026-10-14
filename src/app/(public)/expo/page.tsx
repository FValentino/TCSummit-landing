import type { Metadata } from "next"

import DepthPage from "@/components/routes/depthPage"
import { EXPO_CONTENT } from "@/components/routes/routesData"

export const metadata: Metadata = {
  title: "Expo | TechnoCrypto Summit 2027",
  description:
    "Expo TechnoCrypto Summit 2027: tecnología que se puede ver, tocar y experimentar.",
}

export default function ExpoPage() {
  return <DepthPage {...EXPO_CONTENT} />
}
