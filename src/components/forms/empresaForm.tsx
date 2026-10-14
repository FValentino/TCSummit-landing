"use client"

/**
 * M8 — Empresa / sponsor lead form (brief §52; conversion 2). Isolated public (§50): it collects
 * only the empresa fields and submits through `leadEmpresa`. A link to `/partners` keeps the
 * full tier/benefit detail one click away from the modal.
 */

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { leadEmpresa } from "@/actions/leadForms"
import { empresaSchema, type EmpresaFormInputs } from "@/schemas/empresaSchema"
import { INTERESES_EMPRESA } from "@/schemas/formOptions"

import {
  LeadError,
  LeadField,
  LeadFormModal,
  LeadSelect,
  LeadSubmit,
  LeadSuccess,
  type LeadStatus,
} from "./leadForm"

interface EmpresaFormProps {
  open: boolean
  onClose: () => void
}

const COPY = {
  kicker: "Conversión 2 · Empresa",
  title: "Quiero ser sponsor",
  intro: "Contanos sobre tu empresa y te enviamos los planes de patrocinio.",
  submit: "Enviar solicitud",
  success: "¡Gracias! Un asesor del equipo corporativo te contactará a la brevedad.",
  error: "No pudimos enviar el formulario. Intentá de nuevo en unos minutos.",
} as const

export default function EmpresaForm({ open, onClose }: EmpresaFormProps) {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmpresaFormInputs>({ resolver: zodResolver(empresaSchema) })

  const handleClose = () => {
    reset()
    setStatus("idle")
    onClose()
  }

  const onSubmit = handleSubmit(async (data) => {
    const result = await leadEmpresa(data)
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
          <LeadField
            id="empresa-nombre"
            label="Empresa"
            placeholder="Nombre de tu empresa"
            error={errors.company?.message}
            registration={register("company")}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <LeadField
              id="empresa-contacto"
              label="Contacto"
              placeholder="Nombre y apellido"
              error={errors.contact?.message}
              registration={register("contact")}
            />
            <LeadField
              id="empresa-cargo"
              label="Cargo"
              placeholder="Tu cargo"
              error={errors.role?.message}
              registration={register("role")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <LeadField
              id="empresa-email"
              label="Email"
              type="email"
              placeholder="nombre@empresa.com"
              error={errors.email?.message}
              registration={register("email")}
            />
            <LeadField
              id="empresa-telefono"
              label="Teléfono"
              type="tel"
              placeholder="+54 9 362 000 0000"
              error={errors.phone?.message}
              registration={register("phone")}
            />
          </div>
          <LeadField
            id="empresa-sector"
            label="Sector"
            placeholder="Rubro o sector"
            error={errors.sector?.message}
            registration={register("sector")}
          />
          <LeadSelect
            id="empresa-interes"
            label="Interés"
            placeholder="Seleccioná una opción"
            options={INTERESES_EMPRESA}
            error={errors.interest?.message}
            registration={register("interest")}
          />
          {status === "error" ? <LeadError message={COPY.error} /> : null}
          <LeadSubmit submitting={isSubmitting} label={COPY.submit} />
          <Link
            href="/partners"
            className="text-center text-sm font-semibold text-[#9fd8ff] underline-offset-4 hover:underline"
          >
            Ver planes y beneficios de patrocinio
          </Link>
        </form>
      )}
    </LeadFormModal>
  )
}
