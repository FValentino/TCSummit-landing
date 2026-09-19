import type { LucideIcon } from "lucide-react"
import {
  Crown, Star, Gem, Award, Medal, Rocket,
  Briefcase, Building2, Tag,
} from "lucide-react"

/* ── Common card shape ───────────────────────────────────────────── */

export interface ParticipateCard {
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

/* ── Group 1 — Niveles de patrocinio (exhibición) ────────────────── */

export const STAND_PRICING = [
  { name: "Platino", earlyBird: 3500, presale: 4000, normal: 5000, slots: 10 },
  { name: "Oro", earlyBird: 2000, presale: 2500, normal: 3000, slots: 20 },
  { name: "Plata", earlyBird: 1100, presale: 1500, normal: 2000, slots: 76 },
  { name: "Bronce", earlyBird: 600, presale: 750, normal: 1000, slots: 24 },
]

export const NIVELES: ParticipateCard[] = [
  {
    id: "platino",
    name: "Platino",
    icon: Crown,
    tagline: "La experiencia premium de visibilidad total.",
    benefits: [
      "Stand premium de hasta 36 m²",
      "Panel o conferencia en escenario principal",
      "Logo en escenario, streaming y acreditaciones",
      "Presencia en prensa y redes del evento",
      "10–20 acreditaciones VIP con acceso a networking empresarial",
      "Branding en merchandising y piezas oficiales",
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
      "Menciones en redes sociales y contenido editorial",
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
      "Presencia digital en el evento",
      "Logo en web y materiales oficiales",
      "Entradas para tu equipo",
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
      "Espacio de exhibición básico",
      "Logo en web y materiales oficiales",
      "Entradas para tu equipo",
      "Presencia en la comunidad del evento",
    ],
    gradient: "from-[#0090ff] to-[#0242fd]",
    borderColor: "border-[#0090ff]/40",
    glow: "0 0 30px rgba(0, 144, 255, 0.5)",
  },
]

/* ── Group 2 — Sponsorship (marca + contenidos) ──────────────────── */

export const SPONSORSHIP_PRICING = [
  { name: "Presenting Partner", price: 30000, slots: "1 empresa" },
  { name: "Main Partner", price: 17500, slots: "2 partners" },
  { name: "Platino Sponsor", price: 8500, slots: "10" },
  { name: "Oro Sponsor", price: 5000, slots: "20" },
  { name: "Plata Sponsor", price: 2900, slots: "Disponible" },
  { name: "Bronce / Startup", price: 1200, slots: "Disponible" },
]

export const SPONSORSHIP: ParticipateCard[] = [
  {
    id: "presenting",
    name: "Presenting Partner",
    icon: Crown,
    tagline: "Máxima visibilidad y exclusividad de categoría.",
    benefits: [
      'Naming: "TechnoCrypto Summit 2027 presentado por [MARCA]"',
      "Exclusividad de categoría",
      "Logo dominante en escenario, web, acreditaciones y piezas oficiales",
      "Stand Platino premium + activación de marca",
      "Panel o conferencia + spot en pantallas",
      "20–30 acreditaciones VIP con networking empresarial",
      "Entrevista institucional y contenido editorial",
      "Presencia en comunicaciones digitales y prensa",
    ],
    gradient: "from-[#03f5ff] to-[#0090ff]",
    borderColor: "border-[#03f5ff]/40",
    glow: "0 0 30px rgba(3, 245, 255, 0.5)",
    featured: true,
  },
  {
    id: "main",
    name: "Main Partner",
    icon: Star,
    tagline: "Partner principal con stand y contenidos incluidos.",
    benefits: [
      "Stand Platino incluido",
      "Branding destacado en el evento",
      "Participación en panel o bloque de contenidos",
      "10–15 acreditaciones con networking",
      "Pantallas + web + redes + entrevista",
      "Catálogo digital y comunicaciones",
      "Exclusividad de categoría disponible por contrato",
    ],
    gradient: "from-[#00c6ff] to-[#0090ff]",
    borderColor: "border-[#00c6ff]/40",
    glow: "0 0 30px rgba(0, 198, 255, 0.5)",
  },
  {
    id: "platino-sponsor",
    name: "Platino Sponsor",
    icon: Gem,
    tagline: "Stand Platino + branding + presencia digital.",
    benefits: [
      "Stand Platino incluido",
      "Branding en materiales del evento",
      "Panel o presencia en escenario",
      "Acreditaciones VIP",
      "Presencia digital y en pantallas",
    ],
    gradient: "from-[#03f5ff] to-[#0090ff]",
    borderColor: "border-[#03f5ff]/30",
    glow: "0 0 25px rgba(3, 245, 255, 0.4)",
  },
  {
    id: "oro-sponsor",
    name: "Oro Sponsor",
    icon: Award,
    tagline: "Stand Oro + branding + presencia digital.",
    benefits: [
      "Stand Oro incluido",
      "Branding en materiales del evento",
      "Presencia en pantallas y web",
      "Acreditaciones para tu equipo",
    ],
    gradient: "from-[#00c6ff] to-[#0090ff]",
    borderColor: "border-[#00c6ff]/30",
    glow: "0 0 25px rgba(0, 198, 255, 0.4)",
  },
  {
    id: "plata-sponsor",
    name: "Plata Sponsor",
    icon: Medal,
    tagline: "Stand Plata con presencia digital.",
    benefits: [
      "Stand Plata incluido",
      "Presencia digital en el evento",
      "Acreditaciones para tu equipo",
    ],
    gradient: "from-[#b5bbef] to-[#d7e8f9]",
    borderColor: "border-[#b5bbef]/30",
    glow: "0 0 25px rgba(181, 187, 239, 0.4)",
  },
  {
    id: "bronce-startup",
    name: "Bronce / Startup",
    icon: Rocket,
    tagline: "Espacio y presencia básica para startups.",
    benefits: [
      "Espacio de exhibición",
      "Presencia básica en el evento",
      "Acreditaciones para tu equipo",
    ],
    gradient: "from-[#0090ff] to-[#0242fd]",
    borderColor: "border-[#0090ff]/30",
    glow: "0 0 25px rgba(0, 144, 255, 0.4)",
  },
]

/* ── Group 3 — Corporativos (todo incluido) ──────────────────────── */

export const CORPORATE: ParticipateCard[] = [
  {
    id: "startup",
    name: "Startup",
    icon: Rocket,
    tagline: "Bronce + 2 acreditaciones + web + pantalla + redes",
    benefits: [
      "Stand Bronce incluido",
      "2 acreditaciones",
      "Presencia en web del evento",
      "Spot en pantallas",
      "Mención en redes sociales",
    ],
    gradient: "from-[#0090ff] to-[#0242fd]",
    borderColor: "border-[#0090ff]/30",
    glow: "0 0 25px rgba(0, 144, 255, 0.4)",
  },
  {
    id: "empresa",
    name: "Empresa",
    icon: Briefcase,
    tagline: "Oro + 6 acreditaciones + pantalla + web + networking",
    benefits: [
      "Stand Oro incluido",
      "6 acreditaciones",
      "Presencia en web y pantallas",
      "Acceso a networking empresarial",
      "Branding en materiales oficiales",
    ],
    gradient: "from-[#00c6ff] to-[#0090ff]",
    borderColor: "border-[#00c6ff]/30",
    glow: "0 0 25px rgba(0, 198, 255, 0.4)",
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: Building2,
    tagline: "Platino + 10 acreditaciones + panel + digital premium",
    benefits: [
      "Stand Platino incluido",
      "10 acreditaciones VIP",
      "Participación en panel o conferencia",
      "Presencia digital premium",
      "Branding destacado en el evento",
    ],
    gradient: "from-[#03f5ff] to-[#0090ff]",
    borderColor: "border-[#03f5ff]/30",
    glow: "0 0 25px rgba(3, 245, 255, 0.4)",
  },
  {
    id: "corporate-plus",
    name: "Corporate Plus",
    icon: Crown,
    tagline: "Main Partner + activación + panel + VIP + exclusividad",
    benefits: [
      "Stand Platino premium incluido",
      "Activación de marca en escenario",
      "Participación en panel o conferencia",
      "Acreditaciones VIP con networking",
      "Exclusividad de categoría disponible",
      "Presencia en prensa y comunicaciones",
    ],
    gradient: "from-[#03f5ff] to-[#0090ff]",
    borderColor: "border-[#03f5ff]/40",
    glow: "0 0 30px rgba(3, 245, 255, 0.5)",
    featured: true,
  },
]

export const CORPORATE_PRICING = [
  { name: "Startup", price: 1500 },
  { name: "Empresa", price: 6500 },
  { name: "Corporate", price: 11000 },
  { name: "Corporate Plus", price: 18000 },
]

/* ── Group metadata ──────────────────────────────────────────────── */

export interface ParticipateGroup {
  id: string
  title: string
  subtitle: string
  cards: ParticipateCard[]
  pricingColumns: { label: string; key: string }[]
  pricingRows: Record<string, string | number>[]
  accent: string
}

export const GROUPS: ParticipateGroup[] = [
  {
    id: "niveles",
    title: "Niveles de patrocinio",
    subtitle: "Elegí la categoría de stand que mejor se adapte a tu marca. Todos los precios en USD + IVA.",
    cards: NIVELES,
    pricingColumns: [
      { label: "Categoría", key: "name" },
      { label: "Early Bird", key: "earlyBird" },
      { label: "Preventa", key: "presale" },
      { label: "Normal", key: "normal" },
    ],
    pricingRows: STAND_PRICING.map((p) => ({
      ...p,
      earlyBird: `$${p.earlyBird.toLocaleString("en-US")}`,
      presale: `$${p.presale.toLocaleString("en-US")}`,
      normal: `$${p.normal.toLocaleString("en-US")}`,
    })),
    accent: "#03f5ff",
  },
  {
    id: "sponsorship",
    title: "Sponsorship",
    subtitle: "Paquetes de patrocinio con branding, stands y presencia digital. Todos los precios en USD + IVA.",
    cards: SPONSORSHIP,
    pricingColumns: [
      { label: "Paquete", key: "name" },
      { label: "Precio", key: "price" },
      { label: "Cupos", key: "slots" },
    ],
    pricingRows: SPONSORSHIP_PRICING.map((p) => ({
      ...p,
      price: `$${p.price.toLocaleString("en-US")}`,
    })),
    accent: "#00c6ff",
  },
  {
    id: "corporativos",
    title: "Corporativos",
    subtitle: "Soluciones integrales para empresas que buscan presencia completa. Todos los precios en USD + IVA.",
    cards: CORPORATE,
    pricingColumns: [
      { label: "Paquete", key: "name" },
      { label: "Precio", key: "price" },
    ],
    pricingRows: CORPORATE_PRICING.map((p) => ({
      ...p,
      price: `$${p.price.toLocaleString("en-US")}`,
    })),
    accent: "#b5bbef",
  },
]
