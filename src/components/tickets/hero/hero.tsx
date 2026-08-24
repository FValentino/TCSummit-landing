"use client"

import { motion } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"

import { Saira } from "next/font/google"

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default function Hero() {
  return (
    <section className="relative z-10 w-full px-4 pt-28 pb-14 md:pt-36 md:pb-20">
      {/* Soft radial glow behind the title */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-72 w-[80%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(3,245,255,0.35), rgba(255,46,136,0.15), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl text-center">
        {/* Event chip */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`${saira.className} mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#fcfef9]/80 backdrop-blur-sm md:text-sm`}
        >
          <Calendar className="h-4 w-4 text-[#03f5ff]" />
          <span>15 y 16 de Agosto · Quorum, Buenos Aires</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-5xl leading-tight font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          <motion.span
            className="block text-white"
            animate={{
              filter: [
                "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
                "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
                "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            TECHNO CRYPTO
          </motion.span>
          <motion.span
            className="block text-white"
            animate={{
              filter: [
                "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
                "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
                "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            SUMMIT 2026
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`${saira.className} mx-auto mt-6 max-w-2xl text-base font-medium text-[#fcfef9]/85 md:text-xl lg:text-2xl`}
        >
          Asegura tu lugar en el evento tecnológico más importante de LatAm.
        </motion.p>

        {/* Reinforcement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={`${saira.className} mx-auto mt-4 flex items-center justify-center gap-2`}
        >
          <Sparkles className="h-4 w-4 text-[#f5b942]" />
          <span className="text-sm italic text-[#fcfef9]/60 md:text-base">
            Sumérgete en el futuro del ecosistema digital.
          </span>
          <Sparkles className="h-4 w-4 text-[#f5b942]" />
        </motion.div>
      </div>
    </section>
  )
}
