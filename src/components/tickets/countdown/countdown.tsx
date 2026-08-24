"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  target: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const UNITS: { label: string; key: keyof TimeLeft }[] = [
  { label: "DÍAS", key: "days" },
  { label: "HORAS", key: "hours" },
  { label: "MIN", key: "minutes" },
  { label: "SEG", key: "seconds" },
]

function getTimeLeft(targetTime: number): TimeLeft | null {
  const diff = targetTime - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

export default function Countdown({ target }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const targetTime = new Date(target).getTime()
    const tick = () => {
      const left = getTimeLeft(targetTime)
      if (left) {
        setTimeLeft(left)
        setExpired(false)
      } else {
        setExpired(true)
      }
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [target])

  if (expired) {
    return (
      <div className="rounded-xl border border-[#ff2e88]/40 bg-[#ff2e88]/10 px-3 py-2 text-center">
        <span className="text-sm font-bold text-[#ff2e88]">¡Oferta cerrada!</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-1.5 md:gap-2">
      {UNITS.map((unit) => (
        <div
          key={unit.label}
          className="rounded-lg border border-[#03f5ff]/30 bg-[#03f5ff]/10 px-1 py-1.5 text-center"
        >
          <div
            className="text-lg font-bold text-[#03f5ff] tabular-nums md:text-xl"
            style={{ textShadow: "0 0 12px rgba(3, 245, 255, 0.6)" }}
          >
            {pad(timeLeft[unit.key])}
          </div>
          <div className="text-[9px] font-semibold tracking-widest text-[#fcfef9]/50 md:text-[10px]">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}
