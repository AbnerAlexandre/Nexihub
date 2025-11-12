import { relations } from 'drizzle-orm'
import { reunioes } from './reunioes'
import { membros } from '../membros/membros'
import { reunioesMembros } from '../reunioes-membros/reunioes-membros'
import { presencas } from '../presencas/presencas'

export const reunioesRelations = relations(reunioes, ({ one, many }) => ({
  criador: one(membros, {
    fields: [reunioes.criadaPor],
    references: [membros.id],
  }),
  membrosConvidados: many(reunioesMembros),
  presencas: many(presencas),
}))
