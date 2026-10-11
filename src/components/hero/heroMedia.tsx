"use client"

/**
 * Hero media (spec immersive-quality §LCP/CLS). The poster reserves its box with explicit
 * dimensions and is the LCP candidate; the 14 MB video is never in the first paint — it mounts
 * only after the block scrolls near the viewport, with `preload="none"`. Under reduced motion
 * the video is not mounted at all. Placeholder-first: with no real asset yet, the poster slot
 * renders a reserved gradient block instead of a broken image.
 */

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { assets } from "@/config/assets"

export default function HeroMedia() {
  const poster = assets.heroPoster
  const video = assets.heroVideo
  const reduced = useReducedMotion()
  const [mountVideo, setMountVideo] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (video.src === "" || reduced) return
    const frame = frameRef.current
    if (frame !== null && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setMountVideo(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px" },
      )
      observer.observe(frame)
      return () => observer.disconnect()
    }
    // Idle fallback for browsers without IntersectionObserver — still deferred, never in paint.
    const idle = window.setTimeout(() => setMountVideo(true), 250)
    return () => window.clearTimeout(idle)
  }, [video.src, reduced])

  return (
    <div
      ref={frameRef}
      className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[#03f5ff]/30 bg-[#001b3d] shadow-2xl"
    >
      {poster.src !== "" ? (
        <Image
          src={poster.src}
          alt={poster.alt}
          width={poster.width}
          height={poster.height}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover"
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

      {mountVideo && video.src !== "" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={video.poster === "" ? undefined : video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : null}
    </div>
  )
}
