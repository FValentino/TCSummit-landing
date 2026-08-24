"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Check, Ticket, X } from "lucide-react"
import type { Plan } from "../plansData"

interface BuyModalProps {
  plan: Plan | null
  onClose: () => void
}

export default function BuyModal({ plan, onClose }: BuyModalProps) {
  const router = useRouter()

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!plan) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [plan])

  // Close on Escape.
  useEffect(() => {
    if (!plan) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [plan, onClose])

  const handleConfirm = () => {
    onClose()
    router.push("/tickets/post-compra")
  }

  // The modal renders through a portal into document.body so it escapes the
  // carousel section's z-10 stacking context and always paints above the page.
  // It only opens after a user click, so `document` is guaranteed client-side.
  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {plan && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#002c6b]/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border bg-white/5 p-6 backdrop-blur-md md:p-8"
            style={{
              borderColor: `${plan.accent}40`,
              boxShadow: `0 0 60px ${plan.accent}26, 0 25px 60px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 rounded-full p-2 text-[#fcfef9]/60 transition-colors hover:bg-white/10 hover:text-[#fcfef9]"
            >
              <X className="h-5 w-5" />
            </button>

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#002c6b]"
              style={{ backgroundColor: plan.accent, boxShadow: `0 0 16px ${plan.accent}66` }}
            >
              <Ticket className="h-3.5 w-3.5" />
              Ticket {plan.name}
            </span>

            <h2
              id="buy-modal-title"
              className="mt-4 text-2xl font-bold text-[#fcfef9] md:text-3xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              Confirmar compra
            </h2>

            <p className="mt-2 text-sm text-[#fcfef9]/70 md:text-base">{plan.description}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span
                className="text-4xl font-black md:text-5xl"
                style={{ color: plan.accent, textShadow: `0 0 20px ${plan.accent}66` }}
              >
                ${plan.price}
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-[#fcfef9]/60">USD</span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {plan.benefits
                .filter((benefit) => benefit.included)
                .map((benefit) => (
                  <li key={benefit.text} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: plan.accent }} />
                    <span className="text-sm text-[#fcfef9]/90">{benefit.text}</span>
                  </li>
                ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <motion.button
                autoFocus
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full rounded-xl px-6 py-3.5 text-base font-bold tracking-wide text-[#002c6b] outline-none transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fcfef9]"
                style={{
                  backgroundColor: plan.accent,
                  boxShadow: `0 0 28px ${plan.accent}59`,
                }}
              >
                Confirmar compra
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full rounded-xl border border-white/15 px-6 py-3 text-base font-semibold text-[#fcfef9]/80 transition-colors hover:bg-white/5 hover:text-[#fcfef9]"
              >
                Cancelar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
