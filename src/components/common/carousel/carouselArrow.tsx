"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselArrowProps {
  direction: "prev" | "next"
  onClick?: () => void
  disabled?: boolean
  accentColor?: string
  variant?: "default" | "glow"
  className?: string
  label?: string
}

export default function CarouselArrow({
  direction,
  onClick,
  disabled = false,
  accentColor = "#03f5ff",
  variant = "default",
  className = "",
  label = direction === "prev" ? "Anterior" : "Siguiente",
}: CarouselArrowProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight

  if (variant === "glow") {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={label}
        whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${accentColor}99`, backgroundColor: `${accentColor}33` }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            `0 0 10px ${accentColor}4d`,
            `0 0 20px ${accentColor}80`,
            `0 0 10px ${accentColor}4d`,
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: direction === "next" ? 0.5 : 0 }}
        className={`bg-black/60 backdrop-blur-sm border-2 rounded-full p-3 hover:cursor-pointer transition-all duration-300 ${className}`}
        style={{ borderColor: `${accentColor}80`, color: accentColor }}
      >
        <Icon className="w-6 h-6" />
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      initial={{ opacity: 0, x: direction === "prev" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-30 md:p-3 ${className}`}
      style={{ color: accentColor }}
    >
      <Icon className="h-5 w-5 md:h-8 md:w-8" />
    </motion.button>
  )
}
