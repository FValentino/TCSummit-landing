"use client";
// react
import { NODES } from "@/components/roadmap/roadmapData"

import { motion } from "framer-motion"

export default function Roadmap() {


  return (
    <section id="roadmap" className="w-full min-h-screen overflow-y-hidden overflow-x-hidden relative z-30">
      <div className="w-[90%] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white "
          >
            Roadmap
          </motion.h2>
        </motion.div>
        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-linear-to-b from-[#03f5ff] via-[#0090ff] to-[#03f5ff] opacity-30"></div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {NODES.map((node, index) => {
            const IconComponent = node.icon
            const isCompleted = node.status === "completed"
            const isCurrent = node.status === "current"
            const isLeft = index % 2 === 0
            
            const getStatusColor = () => {
              if (isCompleted) return "#10b981" // green
              if (isCurrent) return "#f59e0b" // amber
              return "#6b7280" // gray
            }

            const statusColor = getStatusColor()

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                }}
                viewport={{ once: true }}
                className={`relative w-full flex items-center justify-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <motion.div
                  className={`w-1/2 md:w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                    whileHover={{
                      borderColor: statusColor,
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {/* Year Badge */}
                    <motion.span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                        isLeft ? 'float-right ml-4' : 'float-left mr-4'
                      }`}
                      style={{
                        backgroundColor: `${statusColor}20`,
                        color: statusColor,
                        border: `1px solid ${statusColor}40`,
                      }}
                    >
                      {node.year}
                    </motion.span>

                    {/* Description */}
                    <p className="text-white text-center font-medium leading-relaxed clear-both">
                      {node.description}
                    </p>

                    {/* Status */}
                    <motion.div
                      className={`mt-3 inline-flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-bold ${
                        isLeft ? 'float-right' : 'float-left'
                      }`}
                      style={{
                        backgroundColor: `${statusColor}15`,
                        color: statusColor,
                      }}
                    >
                      <span>
                        {isCompleted ? "✓ Completado" : isCurrent ? "⚡ En curso" : "⏳ Pendiente"}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Central Icon */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-12 h-12 rounded-full border-4 border-[#002c6b] flex items-center justify-center"
                    style={{
                      backgroundColor: statusColor,
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Node Number */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#03f5ff] border-2 border-[#002c6b] flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">{node.id}</span>
                  </div>
                </motion.div>

                {/* Empty space for alignment */}
                <div className="w-5/12"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
