"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Ticket, ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Actions() {
  const navigate = useRouter()
  const [loading, setLoading] = useState(false)

  function handleVerEntradas() {
    setLoading(true)
    setTimeout(() => {
      navigate.push("/tickets/mis-entradas")
    }, 600)
  }

  return (
    <section className="w-[90%] max-w-4xl mx-auto py-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(2, 66, 253, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVerEntradas}
          disabled={loading}
          className="w-full sm:w-auto bg-[#0242fd] hover:bg-[#012967] text-[#fcfef9] px-8 py-6 text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Cargando...</span>
              </motion.div>
            ) : (
              <motion.div
                key="ticket"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <Ticket className="w-5 h-5" />
                <span>Ver mis entradas</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#03f5ff]/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(2, 66, 253, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate.push("/")}
          className="w-full sm:w-auto border-2 border-[#0242fd] text-[#0242fd] hover:bg-[#0242fd] hover:text-white px-8 py-6 text-lg font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </motion.button>
      </motion.div>
    </section>
  )
}
