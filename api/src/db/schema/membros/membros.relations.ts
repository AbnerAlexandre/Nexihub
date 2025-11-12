import { relations } from 'drizzle-orm'
import { membros } from './membros'
import { indicacoes } from '../indicacoes/indicacoes'
import { obrigados } from '../obrigados/obrigados'
import { reunioes } from '../reunioes/reunioes'
import { reunioesMembros } from '../reunioes-membros/reunioes-membros'
import { presencas } from '../presencas/presencas'
import { mensalidades } from '../mensalidades/mensalidades'

export const membrosRelations = relations(membros, ({ many }) => ({
  indicacoesFeitas: many(indicacoes, { relationName: 'indicador' }),
  indicacoesRecebidas: many(indicacoes, { relationName: 'recebedor' }),
  obrigadosDados: many(obrigados, { relationName: 'agradecido' }),
  obrigadosRecebidos: many(obrigados, { relationName: 'recebedorObrigado' }),
  reunioesCriadas: many(reunioes),
  reunioesConvidado: many(reunioesMembros),
  presencas: many(presencas),
  mensalidades: many(mensalidades),
}))
