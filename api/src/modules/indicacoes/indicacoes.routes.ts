import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { IndicacoesController } from './indicacoes.controller'
import { insertIndicacaoSchema, selectIndicacaoSchema, selectIndicacaoEssencialSchema, updateIndicacaoSchema } from '@/db/schema'

export const indicacoesRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new IndicacoesController()

  // Rotas de listagem geral
  app.get(
    '/',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Lista todas as indicações (dados essenciais)',
        response: {
          200: z.array(selectIndicacaoEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  // Rotas de criação e atualização (antes das rotas GET com parâmetros)
  app.post(
    '/',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Cria uma nova indicação',
        body: insertIndicacaoSchema,
        response: {
          201: selectIndicacaoSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Atualiza uma indicação (status e data de fechamento)',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: updateIndicacaoSchema,
        response: {
          200: selectIndicacaoSchema,
        },
      },
    },
    controller.update.bind(controller)
  )

  // Rotas GET específicas com prefixos literais
  app.get(
    '/indicador/:membroId',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Lista indicações feitas por um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectIndicacaoSchema),
        },
      },
    },
    controller.getByMembroIndicador.bind(controller)
  )

  app.get(
    '/recebedor/:membroId',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Lista indicações recebidas por um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectIndicacaoSchema),
        },
      },
    },
    controller.getByMembroRecebeu.bind(controller)
  )

  app.get(
    '/status/:status',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Lista indicações por status',
        params: z.object({
          status: z.enum(['pendente', 'em_prospeccao', 'fechado', 'perdido']),
        }),
        response: {
          200: z.array(selectIndicacaoSchema),
        },
      },
    },
    controller.getByStatus.bind(controller)
  )

  app.get(
    '/:id/relations',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Busca uma indicação com todas as relações',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithRelations.bind(controller)
  )

  // Rota GET por ID (deve vir por último, após todas as rotas com prefixos literais)
  app.get(
    '/:id',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Busca uma indicação por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectIndicacaoSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )
}

