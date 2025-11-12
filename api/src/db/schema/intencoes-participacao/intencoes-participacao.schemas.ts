import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { intencoesParticipacao } from './intencoes-participacao'

export const insertIntencaoParticipacaoSchema = createInsertSchema(intencoesParticipacao, {
  email: z.string().email('Email inválido'),
  celular: z.string().min(10, 'Celular deve ter no mínimo 10 dígitos'),
}).omit({ id: true, dataSolicitacao: true })

export const selectIntencaoParticipacaoSchema = createSelectSchema(intencoesParticipacao)

export type IntencaoParticipacao = typeof intencoesParticipacao.$inferSelect
export type InsertIntencaoParticipacao = z.infer<typeof insertIntencaoParticipacaoSchema>
