import { z } from 'zod'

// Schema for the partners contact form
export const partnersContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  company: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export type PartnersContactFormInputs = z.infer<typeof partnersContactSchema>