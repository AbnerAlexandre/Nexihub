import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { intencoesParticipacao } from './intencoes-participacao'

export const insertIntencaoParticipacaoSchema = createInsertSchema(intencoesParticipacao, {
  email: z.string().email('Email inválido'),
  celular: z.string().min(10, 'Celular deve ter no mínimo 10 dígitos'),
}).pick({
  nome: true,
  celular: true,
  email: true,
})

export const selectIntencaoParticipacaoSchema = createSelectSchema(intencoesParticipacao)

// Schema essencial para listagens (findAll)
export const selectIntencaoEssencialSchema = selectIntencaoParticipacaoSchema.pick({
  id: true,
  nome: true,
  email: true,
  status: true,
  dataSolicitacao: true,
})

export type IntencaoParticipacao = typeof intencoesParticipacao.$inferSelect
export type InsertIntencaoParticipacao = z.infer<typeof insertIntencaoParticipacaoSchema>
export type IntencaoEssencial = z.infer<typeof selectIntencaoEssencialSchema>
