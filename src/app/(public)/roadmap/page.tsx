import type { Metadata } from "next"

import RoadmapTimeline from "@/components/roadmap/roadmapTimeline"
import DepthPage from "@/components/routes/depthPage"

export const metadata: Metadata = {
  title: "Roadmap | TechnoCrypto Summit 2027",
  description:
    "El camino de TechnoCrypto Summit: hitos alcanzados, alianzas en curso y los próximos pasos hacia el evento.",
}

/** `/roadmap` owns the long trajectory timeline that no longer sits inline on the homepage
 *  (spec publics-depth "Route inventory"). Linked from the footer's "Profundizar" column. */
export default function RoadmapPage() {
  return (
    <DepthPage
      kicker="Roadmap"
      title="De dónde venimos y hacia dónde vamos."
      lead="Un recorrido por los hitos que construyeron TechnoCrypto Summit y las etapas que estamos transitando para llegar al evento."
    >
      <div className="mt-12">
        <RoadmapTimeline />
      </div>
    </DepthPage>
  )
}
