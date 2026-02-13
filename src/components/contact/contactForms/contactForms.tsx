"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { contactSchema, type ContactFormInputs } from "@/schemas/contactSchema";
import { contactEmail } from "@/actions/contactEmail";

export default function ContactForms(){
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormInputs) => {
    const res = await contactEmail(data);
    if (res.success) {
      alert('Email enviado correctamente');
    } else {
      alert('Error al enviar el mail');
    }
  };

  return (
    <motion.div
      className="h-full w-full place-self-center flex flex-col justify-center  bg-linear-to-r from-[#03f5ff]/20 to-[#0090ff]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#03f5ff]/30 mt-8"
      animate={{ borderColor: ["rgba(3, 245, 255, 0.3)", "rgba(0, 144, 255, 0.3)", "rgba(3, 245, 255, 0.3)"] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    >
      <h4 className="text-white font-bold text-lg mb-4">¿Que contactarte con nosotros?</h4>
      <p className="text-gray-300 text-sm mb-4">Ingresa tu correo electronico y nos comunicaremos contigo</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4">
        <div className="flex w-full flex-col space-y-2">
          <input {...register('name')} placeholder="Nombre" className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff]" />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          <input type="email" {...register('email')} placeholder="tu@email.com" className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff]" />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <input type="text" {...register('phone')} placeholder="3624123456" className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff]" />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          <textarea {...register('message')} placeholder="tu mensaje" className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff]" rows={4} />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
        </div>
        <motion.button type="submit" className=" mt-4 md:mt-0 bg-linear-to-r from-[#03f5ff] to-[#0090ff]" disabled={isSubmitting}>
          Enviar
        </motion.button>
      </form>
    </motion.div>
  )
}
