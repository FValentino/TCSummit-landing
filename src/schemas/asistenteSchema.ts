import { z } from "zod"

import { TIPOS_ASISTENTE } from "./formOptions"

/** Asistente lead form (§51, conversion 1). Owns only its public's fields — never merged. */
export const asistenteSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(6, "El teléfono debe tener al menos 6 caracteres"),
  city: z.string().min(2, "La ciudad es requerida"),
  province: z.string().min(2, "La provincia es requerida"),
  country: z.string().min(2, "El país es requerido"),
  attendeeType: z.enum(TIPOS_ASISTENTE, { message: "Seleccioná un tipo de asistente" }),
})

export type AsistenteFormInputs = z.infer<typeof asistenteSchema>
