import { relations } from 'drizzle-orm'
import { presencas } from './presencas'
import { reunioes } from '../reunioes/reunioes'
import { membros } from '../membros/membros'

export const presencasRelations = relations(presencas, ({ one }) => ({
  reuniao: one(reunioes, {
    fields: [presencas.reuniaoId],
    references: [reunioes.id],
  }),
  membro: one(membros, {
    fields: [presencas.membroId],
    references: [membros.id],
  }),
}))
