'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Mail, Clock, Handshake } from "lucide-react"

import { partnersContactSchema, type PartnersContactFormInputs } from "@/schemas/partnersContactSchema"
import { partnersContactEmail } from "@/actions/partnersContactEmail"

const inputClasses = `
  w-full
  bg-black/40
  border
  border-[#03f5ff]/30
  rounded-lg
  px-4
  py-2
  text-white
  placeholder-gray-400
  focus:outline-none
  focus:border-[#03f5ff]
  transition-colors
  duration-200
`

export default function PartnersContact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PartnersContactFormInputs>({
    resolver: zodResolver(partnersContactSchema),
  })

  const onSubmit = async (data: PartnersContactFormInputs) => {
    const res = await partnersContactEmail(data)
    if (res.success) {
      alert('Email enviado correctamente')
    } else {
      alert('Error al enviar el mail')
    }
  }

  return (
    <section id="contacto" className="w-[90%] mx-auto relative z-30 py-20">
      <div className="w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            animate={{
              textShadow: [
                "0 0 20px rgba(3, 245, 255, 0.5)",
                "0 0 40px rgba(3, 245, 255, 0.8)",
                "0 0 20px rgba(3, 245, 255, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Contacto{" "}
            <span className="text-[#03f5ff]">corporativo</span>
          </motion.h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Nuestro equipo de sponsors le responderá a la brevedad con el
            detalle de planes, disponibilidad de stands y condiciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.h3
              className="text-3xl lg:text-4xl font-bold text-[#03f5ff]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(3, 245, 255, 0.8)",
                  "0 0 40px rgba(3, 245, 255, 1)",
                  "0 0 20px rgba(3, 245, 255, 0.8)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Hablemos de su patrocinio
            </motion.h3>
            <p className="text-white text-xl leading-relaxed">
              Cuéntenos sobre su empresa y le enviaremos el detalle de planes,
              beneficios y espacios disponibles para el TechnoCrypto Summit 2027.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#03f5ff]/10 border border-[#03f5ff]/30 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#03f5ff]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email de sponsors</p>
                  <p className="text-[#03f5ff] font-semibold text-lg">sponsors@tcsummit.net</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0090ff]/10 border border-[#0090ff]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#0090ff]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tiempo de respuesta</p>
                  <p className="text-white font-semibold text-lg">Menos de 48 horas hábiles</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#b5bbef]/10 border border-[#b5bbef]/30 flex items-center justify-center shrink-0">
                  <Handshake className="w-6 h-6 text-[#b5bbef]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">¿Prefiere una reunión?</p>
                  <p className="text-white font-semibold text-lg">La coordinamos por correo electrónico</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full w-full place-self-center"
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="h-full w-full flex flex-col justify-center bg-linear-to-r from-[#03f5ff]/20 to-[#0090ff]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#03f5ff]/30"
              animate={{
                borderColor: ["rgba(3, 245, 255, 0.3)", "rgba(0, 144, 255, 0.3)", "rgba(3, 245, 255, 0.3)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
            <h4 className="text-white font-bold text-lg mb-2">Solicitud de información</h4>
            <p className="text-gray-300 text-sm mb-5">
              Un asesor del equipo corporativo lo contactará con el detalle de los planes.
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="partners-name" className="font-bold text-white">Nombre:</label>
                <input
                  id="partners-name"
                  {...register("name")}
                  placeholder="Nombre y apellido"
                  className={inputClasses}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="partners-company" className="font-bold text-white">Empresa:</label>
                <input
                  id="partners-company"
                  {...register("company")}
                  placeholder="Nombre de su empresa"
                  className={inputClasses}
                />
                {errors.company && <span className="text-red-500 text-sm">{errors.company.message}</span>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="partners-email" className="font-bold text-white">Email corporativo:</label>
                <input
                  id="partners-email"
                  type="email"
                  {...register("email")}
                  placeholder="nombre@empresa.com"
                  className={inputClasses}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="partners-message" className="font-bold text-white">Mensaje:</label>
                <textarea
                  id="partners-message"
                  {...register("message")}
                  placeholder="Cuéntenos sobre su empresa y sus objetivos de patrocinio"
                  rows={4}
                  className={inputClasses}
                />
                {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? "Enviando..." : "Quiero ser sponsor"}
            </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}