import type { LucideIcon } from "lucide-react"
import { Crown, Gem, Medal, Award } from "lucide-react"

export interface SponsorTier {
  id: string
  name: string
  icon: LucideIcon
  tagline: string
  benefits: string[]
  gradient: string
  borderColor: string
  glow: string
  featured?: boolean
}

export const TIERS: SponsorTier[] = [
  {
    id: "platino",
    name: "Platino",
    icon: Crown,
    tagline: "La experiencia premium de visibilidad total.",
    benefits: [
      "Stand premium de hasta 36 m²",
      "Charla en el escenario principal",
      "Logo en escenario y streaming",
      "Presencia en prensa y redes del evento",
      "Entradas VIP para tu equipo",
      "Branding en merchandising oficial",
    ],
    gradient: "from-[#03f5ff] to-[#0090ff]",
    borderColor: "border-[#03f5ff]/40",
    glow: "0 0 30px rgba(3, 245, 255, 0.5)",
    featured: true,
  },
  {
    id: "oro",
    name: "Oro",
    icon: Gem,
    tagline: "Visibilidad destacada para marcas en crecimiento.",
    benefits: [
      "Stand de exhibición propio de 18 m²",
      "Menciones en redes sociales",
      "Entradas para tu equipo",
      "Logo en web y materiales oficiales",
      "Publicidad en pantallas del evento",
    ],
    gradient: "from-[#00c6ff] to-[#0090ff]",
    borderColor: "border-[#00c6ff]/40",
    glow: "0 0 30px rgba(0, 198, 255, 0.5)",
  },
  {
    id: "plata",
    name: "Plata",
    icon: Award,
    tagline: "El equilibrio perfecto entre costo y exposición.",
    benefits: [
      "Espacio de exhibición de 9 m²",
      "Logo en web y materiales oficiales",
      "Entradas para tu equipo",
      "Publicidad en pantallas del evento",
    ],
    gradient: "from-[#b5bbef] to-[#d7e8f9]",
    borderColor: "border-[#b5bbef]/40",
    glow: "0 0 30px rgba(181, 187, 239, 0.5)",
  },
  {
    id: "bronce",
    name: "Bronce",
    icon: Medal,
    tagline: "La puerta de entrada al ecosistema tech.",
    benefits: [
      "Logo en web y materiales oficiales",
      "Entradas para tu equipo",
      "Presencia en la comunidad del evento",
    ],
    gradient: "from-[#0090ff] to-[#0242fd]",
    borderColor: "border-[#0090ff]/40",
    glow: "0 0 30px rgba(0, 144, 255, 0.5)",
  },
]