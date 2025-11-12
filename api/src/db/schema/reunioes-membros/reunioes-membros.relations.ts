import { relations } from 'drizzle-orm'
import { reunioesMembros } from './reunioes-membros'
import { reunioes } from '../reunioes/reunioes'
import { membros } from '../membros/membros'

export const reunioesMembroRelations = relations(reunioesMembros, ({ one }) => ({
  reuniao: one(reunioes, {
    fields: [reunioesMembros.reuniaoId],
    references: [reunioes.id],
  }),
  membro: one(membros, {
    fields: [reunioesMembros.membroId],
    references: [membros.id],
  }),
}))
