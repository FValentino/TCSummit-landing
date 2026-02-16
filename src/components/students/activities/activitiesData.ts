import aiBlockchain from "@/assets/images/students/charlas_ai_blockchain.jpg"
import robotica from "@/assets/images/students/charlas_robotica.jpg"
import ciberseguridad from "@/assets/images/students/charlas_ciberseguridad.jpg"
import empleos from "@/assets/images/students/charlas_empleos.jpg"
import startups from "@/assets/images/students/charlas_startups.jpg"
import { Brain, Bot, Shield, Briefcase, Building2 } from 'lucide-react'

export const activities = [
  {
    id: 1,
    name: "Inteligencia Artificial y Blockchain",
    description: "Tecnologías disruptivas que están redefiniendo el presente y el futuro",
    img: aiBlockchain,
    icon: Brain,
    neonColor: "cyan",
  },
  {
    id: 2,
    name: "Robótica",
    description: "Tecnología al servicio de la automatización inteligente",
    img: robotica,
    icon: Bot, 
    neonColor: "lavender"
  },
  {
    id: 3,
    name: "Ciberseguridad y Web 3.0",
    description: "Protección digital y el futuro descentralizado de Internet",
    img: ciberseguridad,
    icon: Shield, 
    neonColor: "lightBlue"
  },
  {
    id: 4,
    name: "Empleos del futuro",
    description: "Nuevas oportunidades en un mundo en constante evolución",
    img: empleos,
    icon: Briefcase, 
    neonColor: "offWhite"
  },
  {
    id: 5,
    name: "Casos reales de startups y gobiernos innovadores",
    description: "Historias de impacto que están transformando el mundo",
    img: startups,
    icon: Building2, 
    neonColor: "royalBlue"
  }
]

export const neonColors = {
  cyan: { glow: "0 0 20px #03f5ff, 0 0 40px #03f5ff", border: "border-[#03f5ff]", bg: "bg-[#03f5ff]/10" },
  lavender: { glow: "0 0 20px #b5bbef, 0 0 40px #b5bbef", border: "border-[#b5bbef]", bg: "bg-[#b5bbef]/10" },
  lightBlue: { glow: "0 0 20px #99c4e9, 0 0 40px #99c4e9", border: "border-[#99c4e9]", bg: "bg-[#99c4e9]/10" },
  offWhite: { glow: "0 0 20px #fcfef9, 0 0 40px #fcfef9", border: "border-[#fcfef9]", bg: "bg-[#fcfef9]/10" },
  brightBlue: { glow: "0 0 20px #0090ff, 0 0 40px #0090ff", border: "border-[#0090ff]", bg: "bg-[#0090ff]/10" },
  royalBlue: { glow: "0 0 20px #0242fd, 0 0 40px #0242fd", border: "border-[#0242fd]", bg: "bg-[#0242fd]/10" },
}
