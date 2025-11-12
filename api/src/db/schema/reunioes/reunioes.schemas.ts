import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { reunioes } from './reunioes'

export const insertReuniaoSchema = createInsertSchema(reunioes).omit({ id: true })

export const selectReuniaoSchema = createSelectSchema(reunioes)

export type Reuniao = typeof reunioes.$inferSelect
export type InsertReuniao = z.infer<typeof insertReuniaoSchema>
