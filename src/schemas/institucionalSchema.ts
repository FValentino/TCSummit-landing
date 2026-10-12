import { z } from "zod"

import { INTERESES_INSTITUCION, TIPOS_INSTITUCION } from "./formOptions"

/** Institucional lead form (§53, conversion 3). Shared by the institución and gobierno variants. */
export const institucionalSchema = z.object({
  institution: z.string().min(2, "El nombre de la institución debe tener al menos 2 caracteres"),
  representative: z.string().min(2, "El representante debe tener al menos 2 caracteres"),
  role: z.string().min(2, "El cargo debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  institutionType: z.enum(TIPOS_INSTITUCION, { message: "Seleccioná un tipo de institución" }),
  interest: z.enum(INTERESES_INSTITUCION, { message: "Seleccioná un interés" }),
})

export type InstitucionalFormInputs = z.infer<typeof institucionalSchema>
