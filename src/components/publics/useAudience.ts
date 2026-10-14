"use client"

import { useContext } from "react"
import { AudienceContext, type AudienceContextValue } from "./AudienceContext"

export function useAudience(): AudienceContextValue {
  const context = useContext(AudienceContext)
  if (context === null) {
    throw new Error("useAudience must be used within an AudienceProvider")
  }
  return context
}