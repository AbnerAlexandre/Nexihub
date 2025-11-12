import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { reunioes } from './reunioes'

export const insertReuniaoSchema = createInsertSchema(reunioes).omit({ id: true })

export const selectReuniaoSchema = createSelectSchema(reunioes)

// Schema essencial para listagens (findAll)
export const selectReuniaoEssencialSchema = selectReuniaoSchema.pick({
  id: true,
  titulo: true,
  dataHora: true,
  tipo: true,
  criadaPor: true,
})

export type Reuniao = typeof reunioes.$inferSelect
export type InsertReuniao = z.infer<typeof insertReuniaoSchema>
export type ReuniaoEssencial = z.infer<typeof selectReuniaoEssencialSchema>
