"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import robot from "@/assets/images/hero/robot.webp"

/** Hero visual: the TCS robot floating with the three pulsing energy rings around it. The float
 *  and the ring pulses are infinite, so they are skipped under `prefers-reduced-motion`. */
export default function HeroMedia() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.4 }}
      className="relative mb-12 lg:mb-0"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
        className="relative"
      >
        <Image
          src={robot}
          alt="Robot TCSummit"
          className="w-full max-w-md mx-auto"
          priority
        />
      </motion.div>

      {/* Círculos de energía */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-[#03f5ff]/30 rounded-full"
          animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={
            reduced ? undefined : { duration: 4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.8 }
          }
        />
      ))}
    </motion.div>
  )
}
