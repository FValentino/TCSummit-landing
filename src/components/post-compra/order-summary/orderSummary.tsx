"use client"

import { motion } from "framer-motion"
import { Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/common/ui/card"
import { orderData } from "./orderSummaryData"

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export default function OrderSummary() {
  const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="w-[90%] max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#03f5ff] mb-8 text-center lg:text-left">
          Resumen de tu compra
        </h2>

        <Card className="bg-black/20 backdrop-blur-sm border-[#03f5ff]/20 rounded-2xl overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#fcfef9]/5 border border-[#fcfef9]/10"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#03f5ff]/10 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-[#03f5ff]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#fcfef9] font-semibold text-lg">{item.name}</h3>
                    <p className="text-[#fcfef9]/60 text-sm">{item.description}</p>
                    <p className="text-[#fcfef9]/80 text-sm mt-1">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="shrink-0 text-[#fcfef9] font-semibold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-[#03f5ff]/20 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[#fcfef9]/80 text-lg">Total facturado</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-[#03f5ff] text-2xl md:text-3xl font-bold"
                >
                  {formatPrice(total)}
                </motion.span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
