import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import { useMemo } from "react";
import { neonColors } from "../activitiesData";

interface ActivityProps{
  id: number,
  name: string,
  description: string,
  img: string,
  icon: React.FC<LucideProps>, 
  neonColor: string
}

interface CardProps{
  activity: ActivityProps,
  index: number
}


export default function ActivityCard({activity, index}: CardProps){
  const IconComponent = activity.icon
  const neonStyle = neonColors[activity.neonColor as keyof typeof neonColors]
  const gridElements = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []); 

  return (
    <motion.div
      key={activity.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <motion.div
        className={`relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border-2 ${neonStyle.border} ${neonStyle.bg} min-h-[280px] flex flex-col`}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)",
        }}
        whileInView={{
          boxShadow: [neonStyle.glow, "0 0 10px currentColor", neonStyle.glow],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        viewport={{ once: false, margin: "-100px" }}
      >
        {/* Grid de fondo simplificado */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
            {gridElements.map((i) => (
              <motion.div
                key={i}
                className={`border-r border-b ${neonStyle.border} opacity-20`}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Imagen */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={activity.img}
            alt={activity.name}
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />

          {/* Línea de escaneo simplificada */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-8"
            animate={{ y: ["-2rem", "8rem"] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: index * 0.5,
            }}
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
          />

          {/* Esquinas simplificadas */}
          <div className={`absolute top-2 left-2 w-3 h-3 ${neonStyle.border} border-t-2 border-l-2`} />
          <div className={`absolute top-2 right-2 w-3 h-3 ${neonStyle.border} border-t-2 border-r-2`} />
          <div className={`absolute bottom-2 left-2 w-3 h-3 ${neonStyle.border} border-b-2 border-l-2`} />
          <div className={`absolute bottom-2 right-2 w-3 h-3 ${neonStyle.border} border-b-2 border-r-2`} />
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              whileInView={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              viewport={{ once: false }}
              className={`${neonStyle.bg} ${neonStyle.border} border p-2 rounded-lg`}
              style={{
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <IconComponent
                className="w-4 h-4"
                style={{
                  color:
                    activity.neonColor === "cyan"
                      ? "#03f5ff"
                      : activity.neonColor === "lavender"
                        ? "#b5bbef"
                        : "#99c4e9",
                }}
              />
            </motion.div>
            <h3 className="text-white font-bold text-sm">{activity.name}</h3>
          </div>

          <p className="text-gray-300 text-xs leading-relaxed">{activity.description}</p>

          {/* Barra de datos simplificada */}
          <div className="mt-3 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`flex-1 h-1 ${neonStyle.bg} rounded-full`}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
                style={{
                  willChange: "opacity",
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute top-2 left-2 text-xs font-mono text-white/60">
          ID: {String(activity.id).padStart(3, "0")}
        </div>
      </motion.div>
    </motion.div>
  )
}