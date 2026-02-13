import { z } from 'zod'

// Schema for the contact form
export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo inválido'),
  phone: z.string().regex(/^\+?[0-9\s-]{10,15}$/,"El teléfono debe tener entre 10 y 15 dígitos"),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export type ContactFormInputs = z.infer<typeof contactSchema>
