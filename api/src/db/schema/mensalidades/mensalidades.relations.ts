import { relations } from 'drizzle-orm'
import { mensalidades } from './mensalidades'
import { membros } from '../membros/membros'

export const mensalidadesRelations = relations(mensalidades, ({ one }) => ({
  membro: one(membros, {
    fields: [mensalidades.membroId],
    references: [membros.id],
  }),
}))
