import type { LucideIcon } from "lucide-react"
import { Flag, MonitorSmartphone, Globe } from "lucide-react"

export interface AdAsset {
  id: string
  name: string
  category: "totem" | "pantalla" | "digital"
  price: number
  format: string
  icon: LucideIcon
  gradient: string
}

export const AD_ASSETS: AdAsset[] = [
  {
    id: "totem-standard",
    name: "Tótem Standard",
    category: "totem",
    price: 200,
    format: "Ubicación general",
    icon: Flag,
    gradient: "from-[#0090ff] to-[#0242fd]",
  },
  {
    id: "totem-premium",
    name: "Tótem Premium",
    category: "totem",
    price: 500,
    format: "Accesos / acreditaciones / zonas de alto tráfico",
    icon: Flag,
    gradient: "from-[#00c6ff] to-[#0090ff]",
  },
  {
    id: "totem-exclusivo",
    name: "Tótem Exclusivo",
    category: "totem",
    price: 800,
    format: "Ubicación premium + branding especial",
    icon: Flag,
    gradient: "from-[#03f5ff] to-[#0090ff]",
  },
  {
    id: "pantalla-standard",
    name: "Pantalla Standard",
    category: "pantalla",
    price: 650,
    format: "Spot 15s / loop",
    icon: MonitorSmartphone,
    gradient: "from-[#0090ff] to-[#0242fd]",
  },
  {
    id: "pantalla-premium",
    name: "Pantalla Premium",
    category: "pantalla",
    price: 1500,
    format: "Spot 30s + alta frecuencia",
    icon: MonitorSmartphone,
    gradient: "from-[#00c6ff] to-[#0090ff]",
  },
  {
    id: "banner-web",
    name: "Banner Web",
    category: "digital",
    price: 500,
    format: "Banner digital",
    icon: Globe,
    gradient: "from-[#0090ff] to-[#0242fd]",
  },
  {
    id: "home-premium",
    name: "Home Premium",
    category: "digital",
    price: 800,
    format: "Banner / takeover parcial",
    icon: Globe,
    gradient: "from-[#00c6ff] to-[#0090ff]",
  },
  {
    id: "partner-web",
    name: "Partner Web",
    category: "digital",
    price: 1500,
    format: "Presencia digital premium",
    icon: Globe,
    gradient: "from-[#03f5ff] to-[#0090ff]",
  },
]

export const ASSET_CATEGORIES = [
  { key: "totem", label: "Tótems" },
  { key: "pantalla", label: "Pantallas" },
  { key: "digital", label: "Digital" },
] as const
