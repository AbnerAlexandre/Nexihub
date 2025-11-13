import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { IntencoesController } from './intencoes.controller'
import { insertIntencaoParticipacaoSchema, selectIntencaoParticipacaoSchema, selectIntencaoEssencialSchema } from '@/db/schema'

export const intencoesRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new IntencoesController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Lista todas as intenções de participação (dados essenciais)',
        response: {
          200: z.array(selectIntencaoEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Busca uma intenção por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectIntencaoParticipacaoSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/email',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Busca intenção por email',
        querystring: z.object({
          email: z.string().email(),
        }),
        response: {
          200: selectIntencaoParticipacaoSchema.nullable(),
        },
      },
    },
    controller.getByEmail.bind(controller)
  )

  app.get(
    '/token/:token',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Busca intenção por token de convite',
        params: z.object({
          token: z.string(),
        }),
        response: {
          200: selectIntencaoParticipacaoSchema,
        },
      },
    },
    controller.getByToken.bind(controller)
  )

  app.get(
    '/status/:status',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Lista intenções por status',
        params: z.object({
          status: z.enum(['pendente', 'aprovado', 'recusado']),
        }),
        response: {
          200: z.array(selectIntencaoParticipacaoSchema),
        },
      },
    },
    controller.getByStatus.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Cria uma nova intenção de participação',
        body: insertIntencaoParticipacaoSchema,
        response: {
          201: z.void(),
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Atualiza uma intenção',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertIntencaoParticipacaoSchema.partial(),
        response: {
          200: selectIntencaoParticipacaoSchema,
        },
      },
    },
    controller.update.bind(controller)
  )

  app.post(
    '/:id/aprovar',
    {
      schema: {
        tags: ['Intenções'],
        description: 'Aprova uma intenção e gera token de convite',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectIntencaoParticipacaoSchema,
        },
      },
    },
    controller.aprovar.bind(controller)
  )
}

