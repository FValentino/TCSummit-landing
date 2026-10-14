/**
 * Feature flags and authorization gates for the immersive multi-public
 * homepage (spec §37 metrics, §55 TCST, §56 CONICET stages).
 *
 * NEXT_PUBLIC_* values are inlined at build time, so this module is safe to
 * import from server and client components alike. Every gate defaults to
 * closed: the feature only ships when the environment opts in.
 */

export type ConicetStage = 1 | 2 | 3 | 4 | 5

/** Placeholder audience feature flags — wired by S7 (selector + persistence). */
export interface AudienceFlags {
  selectorEnabled: boolean
  persistenceEnabled: boolean
}

export interface Flags {
  /** Gates the immersive `/` shell. Disabled → legacy page keeps serving. */
  homepageFeatureEnabled: boolean
  /** Design-name alias of `homepageFeatureEnabled` (same env source). */
  homepageV2: boolean
  /** CONICET authorization stage, 1..5 (spec §56 stages 1–5). */
  conicetStage: ConicetStage
  /** True only when `conicetStage` ≥ 4 — logo/name may render. Default: false. */
  conicetAuthorized: boolean
  /** Gates TCST mentions — copy resolves only to `/tcst` when enabled. */
  tcstEnabled: boolean
  /** Metrics counters data gate (§37). False → counters render hidden/empty. */
  metricsConfirmed: boolean
  /** Placeholder audience feature flags (S7 wires these). */
  audience: AudienceFlags
}

function parseBoolean(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined) return fallback
  return raw === "1" || raw.toLowerCase() === "true"
}

function parseConicetStage(raw: string | undefined): ConicetStage {
  const parsed = Number.parseInt(raw ?? "", 10)
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 5) return parsed as ConicetStage
  return 1
}

const conicetStage = parseConicetStage(process.env.NEXT_PUBLIC_CONICET_STAGE)
const homepageFeatureEnabled = parseBoolean(process.env.NEXT_PUBLIC_HOMEPAGE_V2, false)

export const flags: Flags = {
  homepageFeatureEnabled,
  homepageV2: homepageFeatureEnabled,
  conicetStage,
  conicetAuthorized: conicetStage >= 4,
  tcstEnabled: parseBoolean(process.env.NEXT_PUBLIC_TCST_ENABLED, false),
  metricsConfirmed: false, // §37 — no confirmed data source yet; never invent counters
  audience: {
    selectorEnabled: true,
    persistenceEnabled: true,
  },
}