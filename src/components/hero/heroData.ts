/**
 * Spanish copy for the `#hero` chapter (brief §9). Kept out of the component so the hero
 * stays presentational and the strings sit in one reviewable place.
 */

export const HERO = {
  eyebrow: "TECNOLOGÍA · IA · BLOCKCHAIN · CIENCIA · INNOVACIÓN · EDUCACIÓN",
  /** Split across four parts so the heading can glow "Crypto" and pop "2027"; read together
   *  they are the title, "TechnoCrypto Summit 2027". */
  title: {
    lead: "Techno",
    accent: "Crypto",
    mid: "Summit",
    year: "2027",
  },
  lead: "El gran encuentro de tecnología, inteligencia artificial, blockchain,  ciencia e innovación y educación del Nordeste argentino.",
  date: "13 · 14 · 15 de agosto 2027",
  location: "Resistencia · Chaco · Argentina",
  secondaryCta: "Descubrí el summit",
} as const
