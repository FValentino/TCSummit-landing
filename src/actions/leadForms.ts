"use server"

/**
 * Lead-form server actions for the immersive homepage conversions (brief §50–§53; spec
 * lead-forms). Three isolated actions — one per public — each validating its own schema
 * server-side before sending via Mailjet. They are deliberately separate from the legacy
 * `contactEmail`/`partnersContactEmail` actions: §50 forbids merging the publics into one form,
 * so the payloads, recipients and copy stay independent.
 */

import { asistenteSchema, type AsistenteFormInputs } from "@/schemas/asistenteSchema"
import { empresaSchema, type EmpresaFormInputs } from "@/schemas/empresaSchema"
import {
  institucionalSchema,
  type InstitucionalFormInputs,
} from "@/schemas/institucionalSchema"
import { sendEmail } from "@/lib/email"
import { escapeHtml } from "@/lib/html"

const ASISTENTE_TO = process.env.CONTACT_TO_EMAIL ?? "contacto@tcsummit.net"
const EMPRESA_TO = process.env.PARTNERS_TO_EMAIL ?? "sponsors@tcsummit.net"
const INSTITUCIONAL_TO = process.env.INSTITUCIONAL_TO_EMAIL ?? "contacto@tcsummit.net"

function row(label: string, value: string): string {
  return `<p><b>${label}:</b> ${escapeHtml(value)}</p>`
}

export async function leadAsistente(data: AsistenteFormInputs) {
  const parsed = asistenteSchema.safeParse(data)
  if (!parsed.success) return { success: false }

  const d = parsed.data
  return sendEmail({
    to: ASISTENTE_TO,
    subject: "[Web] Conversión — Asistente",
    html: `
      <h2>Nueva conversión: Asistente</h2>
      ${row("Nombre", d.firstName)}
      ${row("Apellido", d.lastName)}
      ${row("Email", d.email)}
      ${row("Teléfono", d.phone)}
      ${row("Ciudad", d.city)}
      ${row("Provincia", d.province)}
      ${row("País", d.country)}
      ${row("Tipo de asistente", d.attendeeType)}
    `,
    replyTo: d.email,
  })
}

export async function leadEmpresa(data: EmpresaFormInputs) {
  const parsed = empresaSchema.safeParse(data)
  if (!parsed.success) return { success: false }

  const d = parsed.data
  return sendEmail({
    to: EMPRESA_TO,
    subject: "[Web] Conversión — Empresa / Sponsor",
    html: `
      <h2>Nueva conversión: Empresa / Sponsor</h2>
      ${row("Empresa", d.company)}
      ${row("Contacto", d.contact)}
      ${row("Cargo", d.role)}
      ${row("Email", d.email)}
      ${row("Teléfono", d.phone)}
      ${row("Sector", d.sector)}
      ${row("Interés", d.interest)}
    `,
    replyTo: d.email,
  })
}

export async function leadInstitucional(data: InstitucionalFormInputs) {
  const parsed = institucionalSchema.safeParse(data)
  if (!parsed.success) return { success: false }

  const d = parsed.data
  return sendEmail({
    to: INSTITUCIONAL_TO,
    subject: "[Web] Conversión — Institucional",
    html: `
      <h2>Nueva conversión: Institucional</h2>
      ${row("Institución", d.institution)}
      ${row("Representante", d.representative)}
      ${row("Cargo", d.role)}
      ${row("Email", d.email)}
      ${row("Tipo de institución", d.institutionType)}
      ${row("Interés", d.interest)}
    `,
    replyTo: d.email,
  })
}
