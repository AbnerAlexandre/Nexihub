import { z } from 'zod'

export const registerSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  celular: z
    .string()
    .min(1, 'Celular é obrigatório')
    .refine((val) => val.replace(/\D/g, '').length >= 10, {
      message: 'Celular deve ter no mínimo 10 dígitos',
    }),
})

export type RegisterFormData = z.infer<typeof registerSchema>
