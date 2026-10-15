"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

import { assets } from "@/config/assets"

export default function HeroVideo() {
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
    const idle = window.setTimeout(() => setMountVideo(true), 250)
    return () => window.clearTimeout(idle)
  }, [video.src, reduced])

  return (
    <div ref={frameRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#001b3d]/60" aria-hidden="true" />
      {mountVideo && video.src !== "" ? (
        <video
          className="h-full w-full object-cover"
          poster={video.poster === "" ? undefined : video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={video.src} type="video/mp4" />
          {video.srcWebm !== undefined ? (
            <source src={video.srcWebm} type="video/webm" />
          ) : null}
        </video>
      ) : null}
    </div>
  )
}
