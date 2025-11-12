import { relations } from 'drizzle-orm'
import { indicacoes } from './indicacoes'
import { membros } from '../membros/membros'
import { obrigados } from '../obrigados/obrigados'

export const indicacoesRelations = relations(indicacoes, ({ one, many }) => ({
  membroIndicador: one(membros, {
    fields: [indicacoes.idMembroIndicador],
    references: [membros.id],
    relationName: 'indicador',
  }),
  membroRecebeu: one(membros, {
    fields: [indicacoes.idMembroRecebeu],
    references: [membros.id],
    relationName: 'recebedor',
  }),
  obrigados: many(obrigados),
}))
