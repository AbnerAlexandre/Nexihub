import { z } from 'zod'

export const createIndicacaoSchema = z.object({
  idMembroRecebeu: z.string().uuid('Selecione um membro válido').min(1, 'Selecione um membro'),
  nomeCliente: z.string().min(1, 'Nome é obrigatório'),
  emailCliente: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  telefoneCliente: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine((val) => val.replace(/\D/g, '').length >= 10, {
      message: 'Telefone deve ter no mínimo 10 dígitos',
    }),
  motivo: z.string().optional(),
})

export type CreateIndicacaoFormData = z.infer<typeof createIndicacaoSchema>
