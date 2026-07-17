"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactSchema, type ContactFormInputs } from "@/schemas/contactSchema";
import { contactEmail } from "@/actions/contactEmail";

export default function ContactForms() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setSubmitStatus("idle");
    const res = await contactEmail(data);
    if (res.success) {
      setSubmitStatus("success");
      reset();
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="h-full w-full place-self-center flex flex-col justify-center bg-linear-to-r from-[#03f5ff]/20 to-[#0090ff]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#03f5ff]/30 mt-8">
      <h4 className="text-white font-bold text-lg mb-4">¿Que contactarte con nosotros?</h4>
      <p className="text-gray-300 text-sm mb-4">Ingresa tu correo electronico y nos comunicaremos contigo</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4">
        <div className="flex w-full flex-col space-y-2">
          <input
            {...register("name")}
            placeholder="Nombre"
            disabled={isSubmitting}
            className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff] disabled:opacity-50"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

          <input
            type="email"
            {...register("email")}
            placeholder="tu@email.com"
            disabled={isSubmitting}
            className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff] disabled:opacity-50"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <textarea
            {...register("message")}
            placeholder="tu mensaje"
            disabled={isSubmitting}
            rows={4}
            className="flex-1 bg-black/40 border border-[#03f5ff]/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#03f5ff] disabled:opacity-50"
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 md:mt-0 bg-linear-to-r from-[#03f5ff] to-[#0090ff] text-[#002c6b] font-bold py-3 px-6 rounded-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
          whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#002c6b]/30 border-t-[#002c6b] rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center"
          >
            ¡Mensaje enviado correctamente! Te contactaremos pronto.
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center"
          >
            Error al enviar el mensaje. Intentá de nuevo.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
