import { z } from "zod"

import { INTERESES_EMPRESA } from "./formOptions"

/** Empresa / sponsor lead form (§52, conversion 2). Isolated from the other publics (§50). */
export const empresaSchema = z.object({
  company: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres"),
  contact: z.string().min(2, "El contacto debe tener al menos 2 caracteres"),
  role: z.string().min(2, "El cargo debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  sector: z.string().min(2, "El sector es requerido"),
  interest: z.enum(INTERESES_EMPRESA, { message: "Seleccioná un interés" }),
})

export type EmpresaFormInputs = z.infer<typeof empresaSchema>
