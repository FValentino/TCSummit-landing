import type { LucideIcon } from "lucide-react"
import { MessageSquare, ClipboardList, FileCheck2, Rocket, BarChart3 } from "lucide-react"

export interface ProcessStep {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Contáctenos",
    description:
      "Complete el formulario y cuéntenos su objetivo: con quién quiere conectar y qué busca lograr como sponsor.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Plan a medida",
    description:
      "Diseñamos el paquete de patrocinio que mejor se adapta a su marca, presupuesto y estrategia.",
    icon: ClipboardList,
  },
  {
    id: 3,
    title: "Contrato y facturación",
    description:
      "Cerramos las condiciones comerciales, el contrato de participación y la facturación correspondiente.",
    icon: FileCheck2,
  },
  {
    id: 4,
    title: "Activación de marca",
    description:
      "Preparamos su stand, materiales, presencia en escenario y toda la activación para el evento.",
    icon: Rocket,
  },
  {
    id: 5,
    title: "Reporte post-evento",
    description:
      "Reciba métricas de alcance, impacto y retorno de su participación para medir el éxito de la inversión.",
    icon: BarChart3,
  },
]