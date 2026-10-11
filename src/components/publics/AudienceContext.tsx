"use client"

/**
 * Client audience boundary (spec audience-selection): holds the selected
 * public, mirrors it to `?publico=` and `localStorage tcs:publico`, and
 * restores it on load. No server state; invalid input falls back neutral
 * without throwing. Renders no UI — chapters and CTAs consume the value.
 */

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react"
import {
  AUDIENCE_PARAM,
  AUDIENCE_STORAGE_KEY,
  parseAudienceMode,
  type AudienceMode,
} from "./audienceData"

export interface AudienceContextValue {
  mode: AudienceMode | null
  select: (mode: AudienceMode | null) => void
}

export const AudienceContext = createContext<AudienceContextValue | null>(null)

/** URL param wins, then localStorage; invalid or absent → neutral (null). */
function readInitialMode(): AudienceMode | null {
  if (typeof window === "undefined") return null
  const fromUrl = new URLSearchParams(window.location.search).get(AUDIENCE_PARAM)
  const fromUrlMode = parseAudienceMode(fromUrl)
  if (fromUrlMode) return fromUrlMode
  return parseAudienceMode(window.localStorage.getItem(AUDIENCE_STORAGE_KEY))
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AudienceMode | null>(readInitialMode)

  const select = useCallback((next: AudienceMode | null) => {
    setMode(next)
    const url = new URL(window.location.href)
    if (next === null) {
      window.localStorage.removeItem(AUDIENCE_STORAGE_KEY)
      url.searchParams.delete(AUDIENCE_PARAM)
    } else {
      window.localStorage.setItem(AUDIENCE_STORAGE_KEY, next)
      url.searchParams.set(AUDIENCE_PARAM, next)
    }
    // replaceState keeps the shareable URL without polluting history.
    window.history.replaceState(null, "", url)
  }, [])

  const value = useMemo(() => ({ mode, select }), [mode, select])

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}