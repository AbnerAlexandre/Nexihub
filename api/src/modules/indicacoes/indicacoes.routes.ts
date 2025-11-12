import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { IndicacoesController } from './indicacoes.controller'
import { insertIndicacaoSchema, selectIndicacaoSchema } from '@/db/schema'

export const indicacoesRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new IndicacoesController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Indicações'],
        description: 'Lista todas as indicações',
        response: {
          200: z.array(selectIndicacaoSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

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
        description: 'Atualiza uma indicação',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertIndicacaoSchema.partial(),
        response: {
          200: selectIndicacaoSchema,
        },
      },
    },
    controller.update.bind(controller)
  )
}

