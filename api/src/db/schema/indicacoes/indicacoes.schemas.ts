import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { indicacoes } from './indicacoes'

export const insertIndicacaoSchema = createInsertSchema(indicacoes, {
  emailCliente: z.string().email('Email inválido'),
  telefoneCliente: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
}).omit({ id: true, dataCriacao: true })

export const selectIndicacaoSchema = createSelectSchema(indicacoes)

// Schema essencial para listagens (findAll)
export const selectIndicacaoEssencialSchema = selectIndicacaoSchema.pick({
  id: true,
  nomeCliente: true,
  emailCliente: true,
  status: true,
  dataCriacao: true,
}).extend({
  nomeIndicador: z.string().nullable(),
  nomeRecebeu: z.string().nullable(),
})

export const updateIndicacaoSchema = z.object({
  status: z.enum(['pendente', 'em_prospeccao', 'fechado', 'perdido']),
})

export type Indicacao = typeof indicacoes.$inferSelect
export type InsertIndicacao = z.infer<typeof insertIndicacaoSchema>
export type IndicacaoEssencial = z.infer<typeof selectIndicacaoEssencialSchema>
export type UpdateIndicacao = z.infer<typeof updateIndicacaoSchema>
