import { z } from 'zod'

export const completeRegisterSchema = z
  .object({
    senha: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(1, 'Confirmação de senha é obrigatória'),
    ramo: z.string().min(1, 'Ramo de atuação é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  })

export type CompleteRegisterFormData = z.infer<typeof completeRegisterSchema>
