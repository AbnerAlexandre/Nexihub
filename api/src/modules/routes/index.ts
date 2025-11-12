import type { FastifyInstance } from 'fastify'
import { membrosRoutes } from '../membros/membros.routes'
import { indicacoesRoutes } from '../indicacoes/indicacoes.routes'
import { intencoesRoutes } from '../intencoes/intencoes.routes'
import { mensalidadesRoutes } from '../mensalidades/mensalidades.routes'
import { obrigadosRoutes } from '../obrigados/obrigados.routes'
import { presencasRoutes } from '../presencas/presencas.routes'
import { reunioesRoutes } from '../reunioes/reunioes.routes'

export async function routes(app: FastifyInstance) {
  app.register(membrosRoutes, { prefix: '/membros' })
  app.register(indicacoesRoutes, { prefix: '/indicacoes' })
  app.register(intencoesRoutes, { prefix: '/intencoes' })
  app.register(mensalidadesRoutes, { prefix: '/mensalidades' })
  app.register(obrigadosRoutes, { prefix: '/obrigados' })
  app.register(presencasRoutes, { prefix: '/presencas' })
  app.register(reunioesRoutes, { prefix: '/reunioes' })
}
