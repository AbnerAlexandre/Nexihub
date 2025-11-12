import { relations } from 'drizzle-orm'
import { obrigados } from './obrigados'
import { indicacoes } from '../indicacoes/indicacoes'
import { membros } from '../membros/membros'

export const obrigadosRelations = relations(obrigados, ({ one }) => ({
  indicacao: one(indicacoes, {
    fields: [obrigados.idIndicacao],
    references: [indicacoes.id],
  }),
  membroAgradecido: one(membros, {
    fields: [obrigados.idMembroAgradecido],
    references: [membros.id],
    relationName: 'agradecido',
  }),
  membroRecebeu: one(membros, {
    fields: [obrigados.idMembroRecebeu],
    references: [membros.id],
    relationName: 'recebedorObrigado',
  }),
}))
