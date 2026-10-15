"use client"

/**
 * Roadmap timeline (spec publics-depth). Client island for the standalone `/roadmap` route — the
 * legacy timeline, adapted to the v2 conventions: no section id / `min-h-screen` / `z-30` (it owns
 * no anchor), reduced-motion aware, mobile-first left-rail layout, and TCST nodes filtered by flag.
 */

import { motion, useReducedMotion } from "framer-motion"

import { flags } from "@/config/flags"

import { roadmapNodes } from "./roadmapData"

const STATUS_COLOR: Record<string, string> = {
  completed: "#10b981",
  current: "#f59e0b",
}

export default function RoadmapTimeline() {
  const reduced = useReducedMotion()
  const nodes = roadmapNodes(flags.tcstEnabled)

  return (
    <ol className="relative space-y-6 border-l-2 border-[#03f5ff]/25 pl-8">
      {nodes.map((node, index) => {
        const IconComponent = node.icon
        const isCompleted = node.status === "completed"
        const statusColor = isCompleted ? STATUS_COLOR.completed : STATUS_COLOR.current

        return (
          <motion.li
            key={node.id}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.05 }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -left-8 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#002c6b]"
              style={{ backgroundColor: statusColor }}
            >
              <IconComponent className="h-5 w-5 text-white" />
            </span>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                    border: `1px solid ${statusColor}40`,
                  }}
                >
                  {node.year}
                </span>
                <span
                  className="rounded-full px-2 py-1 text-xs font-bold"
                  style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
                >
                  {isCompleted ? "✓ Completado" : "⚡ En curso"}
                </span>
              </div>
              <p className="mt-3 font-medium leading-relaxed text-white">{node.description}</p>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
