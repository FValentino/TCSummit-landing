import { MapPin, Users, Globe, UserCheck, Lightbulb, Palette, Building, Mic, Store, Tv, Coins } from 'lucide-react'

import { IconType } from "react-icons"; 

type Node = {
  id: number;
  year: string;
  description: string;
  icon: IconType; 
  status: string;
};

export const NODES: Node[] = [
  { id: 1, year: "2023", description: "1. Nace TechnoCrypto Summit", icon: Lightbulb, status: "completed" },
  { id: 2, year: "2024", description: "2. Registro Dominio y Publicación de página web", icon: Globe, status: "completed" },
  { id: 3, year: "2024", description: "3. Creación y Registro de Logo y Marca Registrada", icon: Palette, status: "completed" },
  { id: 4, year: "2024", description: "4. Creación de Equipo Organizador", icon: Users, status: "completed" },
  { id: 5, year: "2025", description: "5. Locación: Resistencia - Chaco, Argentina", icon: MapPin, status: "current" },
  { id: 6, year: "En ejecución", description: "6. Alianzas estratégicas", icon: UserCheck, status: "current" },
  { id: 7, year: "En ejecución", description: "7. Partners y Sponsors", icon: Building, status: "current" },
  { id: 8, year: "En ejecución", description: "8. Expansión de la comunidad", icon: Users, status: "current" },
  { id: 9, year: "En ejecución", description: "9. Presentación oficial. Conferencia de prensa", icon: Mic, status: "current" },
  { id: 10, year: "En ejecución", description: "10. Desarrollo y lanzamiento del Token Oficial TCST", icon: Coins, status: "current" },
  { id: 11, year: "En ejecución", description: "11. Stands en instituciones, shopping y sponsors", icon: Store, status: "current" },
  { id: 12, year: "En ejecución", description: "12. Programa de TV y Redes", icon: Tv, status: "current" },
  { id: 13, year: "En ejecución", description: "13. Conexiones para desarrollar evento en Paraguay, Uruguay y Chile", icon: Globe, status: "current" }  

];

