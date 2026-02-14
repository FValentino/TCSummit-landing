import {
  Brain,
  Bus,
  Target,
  Briefcase,
  Users,
  Rocket,
  TrendingUp,
  Award,
  Globe,
  Zap,
} from "lucide-react"

export const benefits = [
  {
    icon: Brain,
    title: "Aprendizaje + Futuro Laboral",
    description: "Vas a tener acceso a una bolsa de trabajo con empresas tecnológicas, la posibilidad de hacer cursos acelerados con certificado gratuito, generar vínculos con mentores y referentes del sector, y participar en incubadoras o programas de financiamiento para impulsar tus ideas.",
    gradient: "from-[#03f5ff] to-[#00c6ff]",
    bgGradient: "from-[#03f5ff]/10 to-[#00c6ff]/5",
    borderColor: "border-[#03f5ff]/30",
    slides: [
      {
        icon: Briefcase,
        title: "Bolsa de Trabajo Tech",
        content: "Conectate con +200 empresas tecnológicas que buscan talento joven",
        stats: "200+ empresas",
      },
      {
        icon: Award,
        title: "Certificaciones Gratuitas",
        content: "Cursos acelerados en IA, Cloud Computing, Desarrollo Web y más",
        stats: "15+ cursos disponibles",
      },
      {
        icon: Users,
        title: "Red de Mentores",
        content: "Acceso directo a líderes tech de diversas empresas",
        stats: "50+ mentores",
      },
      {
        icon: TrendingUp,
        title: "Programas de Financiamiento",
        content: "Incubadoras y aceleradoras para impulsar tus proyectos",
        stats: "$100K+ disponibles",
      },
    ],
  },
  {
    icon: Bus,
    title: "Transporte gratuito",
    description:
      "Coordiná con tu institución. El traslado está incluido para estudiantes. Las instituciones ya están siendo contactadas para gestionar la logística.",
    gradient: "from-[#0090ff] to-[#99c4e9]",
    bgGradient: "from-[#0090ff]/10 to-[#99c4e9]/5",
    borderColor: "border-[#0090ff]/30",
    slides: [
      {
        icon: Bus,
        title: "Transporte Coordinado",
        content: "Buses modernos y seguros desde tu institución educativa",
        stats: "100% gratuito",
      },
      {
        icon: Globe,
        title: "Cobertura provincial",
        content: "Llegamos a todas las localidades de la provincia",
        stats: "24 provincias",
      },
      {
        icon: Zap,
        title: "Logística Optimizada",
        content: "Horarios coordinados para maximizar tu experiencia",
        stats: "Puntualidad garantizada",
      },
    ],
  },
  {
    icon: Target,
    title: "¿Por qué tenés que estar ahí?",
    description:
      "Porque vas a tener tu primer acercamiento al mundo laboral, formar parte de una comunidad global de estudiantes tech como vos, y acceder a recursos y plataformas totalmente gratuitas que te van a potenciar.",
    gradient: "from-[#b5bbef] to-[#d7e8f9]",
    bgGradient: "from-[#b5bbef]/10 to-[#d7e8f9]/5",
    borderColor: "border-[#b5bbef]/30",
    slides: [
      {
        icon: Target,
        title: "Primer Paso Profesional",
        content: "Tu entrada al mundo laboral tech con oportunidades reales",
        stats: "85% consigue trabajo",
      },
      {
        icon: Globe,
        title: "Comunidad",
        content: "Conectate con estudiantes, mentores y diversos profesionales del mundo tech",
        stats: "5000+ estudiantes",
      },
      {
        icon: Rocket,
        title: "Recursos Premium",
        content: "Acceso gratuito a plataformas y herramientas para apoyar tu crecimiento",
        stats: "$10K+ en recursos",
      },
    ],
  },
]