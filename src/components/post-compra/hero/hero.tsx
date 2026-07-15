"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full pt-24 pb-12 relative z-30">
      <div className="w-[90%] max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <CheckCircle className="w-24 h-24 lg:w-32 lg:h-32 text-[#10b981]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(3, 245, 255, 0.5)",
                "0 0 40px rgba(3, 245, 255, 0.8)",
                "0 0 20px rgba(3, 245, 255, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            ¡Entradas{" "}
            <span className="text-[#03f5ff]">enviadas!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#fcfef9]/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Recibirás un email con cada entrada
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
