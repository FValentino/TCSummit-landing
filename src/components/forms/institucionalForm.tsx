"use client"

/**
 * M9 — Institucional lead form (brief §53; conversion 3). One schema, two framings: `institucion`
 * (universities, research bodies) and `gobierno` (public sector), which differ only in copy. The
 * data collected is identical, so the modal reuses `leadInstitucional` in both variants.
 */

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { leadInstitucional } from "@/actions/leadForms"
import { INTERESES_INSTITUCION, TIPOS_INSTITUCION } from "@/schemas/formOptions"
import { institucionalSchema, type InstitucionalFormInputs } from "@/schemas/institucionalSchema"

import {
  LeadError,
  LeadField,
  LeadFormModal,
  LeadSelect,
  LeadSubmit,
  LeadSuccess,
  type LeadStatus,
} from "./leadForm"

export type InstitucionalVariant = "institucion" | "gobierno"

interface InstitucionalFormProps {
  open: boolean
  onClose: () => void
  variant?: InstitucionalVariant
}

const COPY: Record<InstitucionalVariant, Record<string, string>> = {
  institucion: {
    kicker: "Conversión 3 · Institución",
    title: "Vincular mi institución",
    intro: "Contanos sobre tu institución y te contactamos para coordinar la vinculación.",
  },
  gobierno: {
    kicker: "Conversión 3 · Sector público",
    title: "Articular con el Summit",
    intro: "Contanos sobre tu organismo y coordinamos la articulación con el Summit.",
  },
}

const SUBMIT_LABEL = "Enviar solicitud"
const SUCCESS_MESSAGE = "¡Gracias! Nos vamos a comunicar para coordinar la vinculación."
const ERROR_MESSAGE = "No pudimos enviar el formulario. Intentá de nuevo en unos minutos."

export default function InstitucionalForm({
  open,
  onClose,
  variant = "institucion",
}: InstitucionalFormProps) {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstitucionalFormInputs>({ resolver: zodResolver(institucionalSchema) })

  const copy = COPY[variant]

  const handleClose = () => {
    reset()
    setStatus("idle")
    onClose()
  }

  const onSubmit = handleSubmit(async (data) => {
    const result = await leadInstitucional(data)
    setStatus(result.success ? "success" : "error")
  })

  return (
    <LeadFormModal
      open={open}
      onClose={handleClose}
      kicker={copy.kicker}
      title={copy.title}
      intro={copy.intro}
    >
      {status === "success" ? (
        <LeadSuccess message={SUCCESS_MESSAGE} onClose={handleClose} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
          <LeadField
            id="institucional-institucion"
            label="Institución"
            placeholder="Nombre de la institución"
            error={errors.institution?.message}
            registration={register("institution")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <LeadField
              id="institucional-representante"
              label="Representante"
              placeholder="Nombre y apellido"
              error={errors.representative?.message}
              registration={register("representative")}
            />
            <LeadField
              id="institucional-cargo"
              label="Cargo"
              placeholder="Tu cargo"
              error={errors.role?.message}
              registration={register("role")}
            />
          </div>
          <LeadField
            id="institucional-email"
            label="Email"
            type="email"
            placeholder="nombre@institucion.org"
            error={errors.email?.message}
            registration={register("email")}
          />
          <LeadSelect
            id="institucional-tipo"
            label="Tipo de institución"
            placeholder="Seleccioná una opción"
            options={TIPOS_INSTITUCION}
            error={errors.institutionType?.message}
            registration={register("institutionType")}
          />
          <LeadSelect
            id="institucional-interes"
            label="Interés"
            placeholder="Seleccioná una opción"
            options={INTERESES_INSTITUCION}
            error={errors.interest?.message}
            registration={register("interest")}
          />
          {status === "error" ? <LeadError message={ERROR_MESSAGE} /> : null}
          <LeadSubmit submitting={isSubmitting} label={SUBMIT_LABEL} />
        </form>
      )}
    </LeadFormModal>
  )
}
