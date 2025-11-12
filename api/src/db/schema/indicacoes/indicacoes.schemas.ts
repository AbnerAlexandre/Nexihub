import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { indicacoes } from './indicacoes'

export const insertIndicacaoSchema = createInsertSchema(indicacoes, {
  emailCliente: z.string().email('Email inválido'),
  telefoneCliente: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
}).omit({ id: true, dataCriacao: true })

export const selectIndicacaoSchema = createSelectSchema(indicacoes)

export type Indicacao = typeof indicacoes.$inferSelect
export type InsertIndicacao = z.infer<typeof insertIndicacaoSchema>
