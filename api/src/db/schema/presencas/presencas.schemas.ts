import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { presencas } from './presencas'

export const insertPresencaSchema = createInsertSchema(presencas).omit({ id: true })

export const selectPresencaSchema = createSelectSchema(presencas)

export type Presenca = typeof presencas.$inferSelect
export type InsertPresenca = z.infer<typeof insertPresencaSchema>
