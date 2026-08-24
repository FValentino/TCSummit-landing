"use client"

import { motion } from "framer-motion"

interface CarouselDotsProps {
  count: number
  activeIndex: number
  onSelect?: (index: number) => void
  accentColor?: string
  /** Per-dot accent override (e.g. each plan has its own color). */
  getAccent?: (index: number) => string
  variant?: "pill" | "circle"
  className?: string
  getLabel?: (index: number) => string
}

export default function CarouselDots({
  count,
  activeIndex,
  onSelect,
  accentColor = "#03f5ff",
  getAccent,
  variant = "pill",
  className = "",
  getLabel = (index) => `Ir a ${index + 1}`,
}: CarouselDotsProps) {
  if (variant === "circle") {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        {Array.from({ length: count }).map((_, index) => {
          const active = index === activeIndex
          const color = getAccent?.(index) ?? accentColor
          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => onSelect?.(index)}
              aria-label={getLabel(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={
                active
                  ? {
                      boxShadow: [
                        `0 0 10px ${color}80`,
                        `0 0 20px ${color}cc`,
                        `0 0 10px ${color}80`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300"
              style={{
                backgroundColor: active ? color : "transparent",
                borderColor: active ? color : `${color}80`,
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {Array.from({ length: count }).map((_, index) => {
        const active = index === activeIndex
        const color = getAccent?.(index) ?? accentColor
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={getLabel(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: active ? 28 : 10,
              height: 10,
              backgroundColor: active ? color : `${color}40`,
              boxShadow: active ? `0 0 8px ${color}` : "none",
            }}
          />
        )
      })}
    </div>
  )
}
