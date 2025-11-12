import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { reunioesMembros } from './reunioes-membros'

export const insertReuniaoMembroSchema = createInsertSchema(reunioesMembros).omit({ id: true })

export const selectReuniaoMembroSchema = createSelectSchema(reunioesMembros)

export type ReuniaoMembro = typeof reunioesMembros.$inferSelect
export type InsertReuniaoMembro = z.infer<typeof insertReuniaoMembroSchema>
