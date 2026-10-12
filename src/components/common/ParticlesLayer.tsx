"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import ParticlesBackground from "@/components/utils/ParticlesBackground"

const MOBILE_QUERY = "(max-width: 767px)"
const MOBILE_COUNTS = { dots: 40, lines: 90 }
const DESKTOP_COUNTS = { dots: 50, lines: 100 }

/** The single capped particle canvas behind `/`.
 *
 *  Mobile-first default (`mobile: true`) so the server HTML and the first client render agree;
 *  the media query only refines the counts after hydration, which avoids both a hydration
 *  mismatch and a desktop-count flash on a phone. Under `prefers-reduced-motion` it renders a
 *  static gradient and mounts no canvas at all. */
export default function ParticlesLayer() {
  const reduced = useReducedMotion()
  const [mobile, setMobile] = useState(true)

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY)
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {reduced ? (
        <div className="h-full w-full bg-gradient-to-b from-[#F107CA]/10 via-transparent to-transparent" />
      ) : (
        <ParticlesBackground
          dots={mobile ? MOBILE_COUNTS.dots : DESKTOP_COUNTS.dots}
          lines={mobile ? MOBILE_COUNTS.lines : DESKTOP_COUNTS.lines}
        />
      )}
    </div>
  )
}
