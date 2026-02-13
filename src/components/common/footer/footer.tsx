'use client';

import { motion } from "framer-motion";

export default function Footer(){
  return(
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative z-30 bg-black/60 backdrop-blur-xl border-t border-[#03f5ff]/30 py-12"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(3, 245, 255, 0.5)",
                "0 0 40px rgba(3, 245, 255, 0.8)",
                "0 0 20px rgba(3, 245, 255, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-[#03f5ff] to-[#0090ff] rounded-full flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(3, 245, 255, 0.5)",
                  "0 0 40px rgba(3, 245, 255, 0.8)",
                  "0 0 20px rgba(3, 245, 255, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              role="img"
              aria-label="Logo de TCSummit"
            >
              <span className="text-white font-bold text-xl">T</span>
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-[#03f5ff]">TCSummit 2026</h2>
              <p className="text-gray-300">Conectando el Futuro</p>
            </div>
          </motion.div>

          <motion.div
            className="border-t border-[#03f5ff]/20 pt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                className="text-gray-400 text-sm"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                © 2026 TechnoCrypto Summit. Todos los derechos reservados.
              </motion.p>
              <motion.p
                className="text-[#03f5ff] text-sm font-semibold"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(3, 245, 255, 0.5)",
                    "0 0 20px rgba(3, 245, 255, 0.8)",
                    "0 0 10px rgba(3, 245, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                El futuro de la tecnología comienza aquí
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}