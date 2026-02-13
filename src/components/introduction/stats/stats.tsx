import { FaCalendarAlt, FaComments, FaCheckCircle, FaUserCheck } from "react-icons/fa"
import { FaUsers } from "react-icons/fa6"
import { PiStudentFill } from "react-icons/pi"
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
    { icon: <FaCalendarAlt className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0" />, label: "Días", value: "3" },
    { icon: <FaComments className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Charlas", value: "+50" },
    { icon: <FaUserCheck className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Expertos", value: "+50" },
    { icon: <PiStudentFill className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Estudiantes", value: "+10.000" },
    { icon: <FaUsers className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Visitantes", value: "+20.000" },
    { icon: <FaCheckCircle className="text-4xl me-4 lg:me-0 w-8 h-8 text-[#03f5ff] mx-auto md:mx-0"/>, label: "Empresas", value: "+100" },
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
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-2 border-[#03f5ff]/30"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    borderColor: ["rgba(3, 245, 255, 0.3)", "rgba(3, 245, 255, 0.6)", "rgba(3, 245, 255, 0.3)"],
                  }}
                  transition={{
                    borderColor: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
                  }}
                >
                  <motion.div
                    className="bg-[#03f5ff]/20 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(3, 245, 255, 0.3)",
                        "0 0 40px rgba(3, 245, 255, 0.6)",
                        "0 0 20px rgba(3, 245, 255, 0.3)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-white mb-2"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(3, 245, 255, 0.5)",
                        "0 0 20px rgba(3, 245, 255, 0.8)",
                        "0 0 10px rgba(3, 245, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {stat.value}
                  </motion.h3>
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
