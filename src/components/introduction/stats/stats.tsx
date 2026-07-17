import { Calendar, MessageSquare, CheckCircle, UserCheck, Users, GraduationCap } from "lucide-react"
import { useEffect} from "react"
import "./participnatsInfo.css"
import { motion } from "framer-motion"

export default function ParticipantInfo() {

  useEffect(() => {
    const elements = document.querySelectorAll(".hidden-item")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-item")
          }
        })
      },
      { threshold: 0.2 } 
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const items = [
    { icon: <Calendar className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0" />, label: "Días", value: "4" },
    { icon: <MessageSquare className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Charlas", value: "+50" },
    { icon: <UserCheck className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Expertos", value: "+50" },
    { icon: <GraduationCap className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Estudiantes", value: "+10.000" },
    { icon: <Users className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Visitantes", value: "+20.000" },
    { icon: <CheckCircle className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Empresas", value: "+200" },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full text-center mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {items.map((stat, index) => {
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-2 border-[#03f5ff]/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="bg-[#03f5ff]/20 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  >
                    {stat.icon}
                  </div>
                  <h3
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {stat.value}
                  </h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}
