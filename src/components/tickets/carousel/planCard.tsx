"use client"

import { motion } from "framer-motion"
import { Check, Lock, Ticket } from "lucide-react"
import type { Plan } from "../plansData"
import Countdown from "../countdown/countdown"

interface PlanCardProps {
  plan: Plan
  className?: string
  onBuy: (plan: Plan) => void
}

export default function PlanCard({ plan, className = "", onBuy }: PlanCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
      style={{ boxShadow: `0 0 40px ${plan.accent}1f` }}
    >
      <div
        className="h-1.5 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${plan.accent}, rgba(255,255,255,0.1))` }}
      />

      <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${plan.badgeClass}`}
          >
            {plan.name}
          </span>
          <Ticket className="h-5 w-5 shrink-0" style={{ color: plan.accent }} />
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl font-black leading-none md:text-5xl"
              style={{ color: plan.accent, textShadow: `0 0 20px ${plan.accent}66` }}
            >
              ${plan.price}
            </span>
            <span className="text-sm font-medium uppercase tracking-wider text-[#fcfef9]/60">USD</span>
          </div>
          <p className="mt-3 text-sm text-[#fcfef9]/70 md:text-base">{plan.description}</p>
        </div>

        <ul className="space-y-2.5">
          {plan.benefits.map((benefit) => (
            <li key={benefit.text} className={`flex items-start gap-2.5 ${benefit.included ? "" : "opacity-50"}`}>
              {benefit.included ? (
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: plan.accent }} />
              ) : (
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#fcfef9]/40" />
              )}
              <span
                className={`text-sm ${benefit.included ? "text-[#fcfef9]/90" : "text-[#fcfef9]/50 line-through"}`}
              >
                {benefit.text}
              </span>
            </li>
          ))}
        </ul>

        {plan.countdownTarget && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#fcfef9]/50">
              Cierre en:
            </p>
            <Countdown target={plan.countdownTarget} />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onBuy(plan)}
          className={`mt-auto w-full rounded-xl px-6 py-3.5 text-base font-bold tracking-wide outline-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${plan.buttonClass}`}
          style={{ outlineColor: plan.accent }}
        >
          {plan.buttonLabel}
        </motion.button>
      </div>
    </motion.article>
  )
}
