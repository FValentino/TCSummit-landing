"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/common/ui/card"
import { ownersData } from "./ownersData"

export default function Owners() {
  return (
    <section className="w-[90%] max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#03f5ff] mb-8 text-center lg:text-left">
          Propietarios de las entradas
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {ownersData.map((owner, index) => (
            <motion.div
              key={owner.email}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="bg-black/20 backdrop-blur-sm border-[#03f5ff]/20 rounded-2xl hover:border-[#03f5ff]/40 transition-all duration-300 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-[#002c6b] font-bold text-lg shrink-0"
                      style={{ backgroundColor: owner.color }}
                    >
                      {owner.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[#fcfef9] font-semibold text-lg truncate">{owner.name}</h3>
                      <p className="text-[#fcfef9]/60 text-sm truncate">{owner.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#fcfef9]/60">Entrada:</span>
                    <span className="text-[#0090ff] font-medium">{owner.ticketName}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[#10b981] text-sm font-medium">ENTRADA ENVIADA</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
