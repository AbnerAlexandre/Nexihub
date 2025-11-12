import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { presencas } from './presencas'

export const insertPresencaSchema = createInsertSchema(presencas).omit({ id: true })

export const selectPresencaSchema = createSelectSchema(presencas)

// Schema essencial para listagens (findAll)
export const selectPresencaEssencialSchema = selectPresencaSchema.pick({
  id: true,
  reuniaoId: true,
  membroId: true,
  fezCheckin: true,
  horaCheckin: true,
})

export type Presenca = typeof presencas.$inferSelect
export type InsertPresenca = z.infer<typeof insertPresencaSchema>
export type PresencaEssencial = z.infer<typeof selectPresencaEssencialSchema>
