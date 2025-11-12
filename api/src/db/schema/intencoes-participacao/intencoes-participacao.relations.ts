import { relations } from 'drizzle-orm'
import { intencoesParticipacao } from './intencoes-participacao'

export const intencoesParticipacaoRelations = relations(intencoesParticipacao, ({ }) => ({}))
