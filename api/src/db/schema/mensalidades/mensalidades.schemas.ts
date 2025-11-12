import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { mensalidades } from './mensalidades'

export const insertMensalidadeSchema = createInsertSchema(mensalidades, {
  valor: z.number().positive('Valor deve ser positivo'),
  mesReferencia: z.string().regex(/^\d{4}-\d{2}$/, 'Formato deve ser YYYY-MM'),
}).omit({ id: true, dataCriacao: true })

export const selectMensalidadeSchema = createSelectSchema(mensalidades)

export type Mensalidade = typeof mensalidades.$inferSelect
export type InsertMensalidade = z.infer<typeof insertMensalidadeSchema>
