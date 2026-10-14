"use client"

/**
 * M7 — Asistente lead form (brief §51; conversion 1). Isolated public: it collects only the
 * asistente fields and submits through `leadAsistente`. Field-level validation is Spanish and
 * announced; on invalid submit react-hook-form moves focus to the first invalid field.
 */

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { leadAsistente } from "@/actions/leadForms"
import { asistenteSchema, type AsistenteFormInputs } from "@/schemas/asistenteSchema"
import { TIPOS_ASISTENTE } from "@/schemas/formOptions"

import {
  LeadError,
  LeadField,
  LeadFormModal,
  LeadSelect,
  LeadSubmit,
  LeadSuccess,
  type LeadStatus,
} from "./leadForm"

interface AsistenteFormProps {
  open: boolean
  onClose: () => void
}

const COPY = {
  kicker: "Conversión 1 · Asistente",
  title: "Quiero asistir",
  intro: "Dejanos tus datos y te contactamos con la información de entradas.",
  submit: "Enviar inscripción",
  success: "¡Listo! Te enviamos la información de entradas a la brevedad.",
  error: "No pudimos enviar el formulario. Intentá de nuevo en unos minutos.",
} as const

export default function AsistenteForm({ open, onClose }: AsistenteFormProps) {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AsistenteFormInputs>({ resolver: zodResolver(asistenteSchema) })

  const handleClose = () => {
    reset()
    setStatus("idle")
    onClose()
  }

  const onSubmit = handleSubmit(async (data) => {
    const result = await leadAsistente(data)
    setStatus(result.success ? "success" : "error")
  })

  return (
    <LeadFormModal
      open={open}
      onClose={handleClose}
      kicker={COPY.kicker}
      title={COPY.title}
      intro={COPY.intro}
    >
      {status === "success" ? (
        <LeadSuccess message={COPY.success} onClose={handleClose} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <LeadField
              id="asistente-nombre"
              label="Nombre"
              placeholder="Tu nombre"
              error={errors.firstName?.message}
              registration={register("firstName")}
            />
            <LeadField
              id="asistente-apellido"
              label="Apellido"
              placeholder="Tu apellido"
              error={errors.lastName?.message}
              registration={register("lastName")}
            />
          </div>
          <LeadField
            id="asistente-email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            error={errors.email?.message}
            registration={register("email")}
          />
          <LeadField
            id="asistente-telefono"
            label="Teléfono"
            type="tel"
            placeholder="+54 9 362 000 0000"
            error={errors.phone?.message}
            registration={register("phone")}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <LeadField
              id="asistente-ciudad"
              label="Ciudad"
              placeholder="Resistencia"
              error={errors.city?.message}
              registration={register("city")}
            />
            <LeadField
              id="asistente-provincia"
              label="Provincia"
              placeholder="Chaco"
              error={errors.province?.message}
              registration={register("province")}
            />
            <LeadField
              id="asistente-pais"
              label="País"
              placeholder="Argentina"
              error={errors.country?.message}
              registration={register("country")}
            />
          </div>
          <LeadSelect
            id="asistente-tipo"
            label="Tipo de asistente"
            placeholder="Seleccioná una opción"
            options={TIPOS_ASISTENTE}
            error={errors.attendeeType?.message}
            registration={register("attendeeType")}
          />
          {status === "error" ? <LeadError message={COPY.error} /> : null}
          <LeadSubmit submitting={isSubmitting} label={COPY.submit} />
        </form>
      )}
    </LeadFormModal>
  )
}
