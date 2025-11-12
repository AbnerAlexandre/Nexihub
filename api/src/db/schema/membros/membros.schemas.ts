import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { membros } from './membros'

export const insertMembroSchema = createInsertSchema(membros, {
  email: z.string().email('Email inválido'),
  celular: z.string().min(10, 'Celular deve ter no mínimo 10 dígitos'),
  experiencias: z.array(z.string()).default([]),
}).omit({ id: true, dataEntrada: true, agradecimentosPublicos: true })

export const selectMembroSchema = createSelectSchema(membros)

// Schema essencial para listagens (findAll)
export const selectMembroEssencialSchema = selectMembroSchema.pick({
  id: true,
  nome: true,
  email: true,
  tipo: true,
  celular: true,
  statusMembro: true,
})

export type Membro = typeof membros.$inferSelect
export type InsertMembro = z.infer<typeof insertMembroSchema>
export type MembroEssencial = z.infer<typeof selectMembroEssencialSchema>
