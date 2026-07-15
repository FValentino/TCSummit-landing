"use client"

import { motion } from "framer-motion"
import { Ticket, ArrowLeft } from "lucide-react"
import { Button } from "@/components/common/ui/button"
import { useRouter } from "next/navigation"

export default function Actions() {
  const navigate = useRouter()

  return (
    <section className="w-[90%] max-w-4xl mx-auto py-12 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <Button
            onClick={() => navigate.push("/mis-entradas")}
            className="w-full bg-[#0242fd] hover:bg-[#012967] text-[#fcfef9] px-8 py-6 text-lg font-semibold rounded-xl flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(2,66,253,0.4)]"
          >
            <Ticket className="w-5 h-5" />
            Ver mis entradas
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => navigate.push("/")}
            className="w-full border-[#0242fd] text-[#0242fd] hover:bg-[#0242fd] hover:text-white px-8 py-6 text-lg font-semibold rounded-xl flex items-center gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al catálogo
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
