import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { obrigados } from './obrigados'

export const insertObrigadoSchema = createInsertSchema(obrigados, {
  mensagem: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
}).omit({ id: true, dataCriacao: true })

export const selectObrigadoSchema = createSelectSchema(obrigados)

export type Obrigado = typeof obrigados.$inferSelect
export type InsertObrigado = z.infer<typeof insertObrigadoSchema>
