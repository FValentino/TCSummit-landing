import { z } from 'zod'

// Schema for the contact form
export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export type ContactFormInputs = z.infer<typeof contactSchema>
