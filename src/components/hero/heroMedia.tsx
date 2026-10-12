"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { assets } from "@/config/assets"

export default function HeroMedia() {
  const poster = assets.heroPoster
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (frame !== null && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setVisible(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" },
      )
      observer.observe(frame)
      return () => observer.disconnect()
    }
    const idle = window.setTimeout(() => setVisible(true), 250)
    return () => window.clearTimeout(idle)
  }, [])

  return (
    <div
      ref={frameRef}
      className="relative aspect-video w-full overflow-hidden rounded-3xl h-full flex items-center justify-center"
    >
      {poster.src !== "" ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          priority
          className="h-[80%] w-full object-contain"
        />
      ) : (
        <motion.div
          role="img"
          aria-label={poster.alt}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.6 }}
          className="h-full w-full bg-gradient-to-br from-[#003a8c] via-[#001b3d] to-black"
        />
      )}
    </div>
  )
}
