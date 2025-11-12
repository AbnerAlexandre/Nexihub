import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { MensalidadesController } from './mensalidades.controller'
import { insertMensalidadeSchema, selectMensalidadeSchema } from '@/db/schema'

export const mensalidadesRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new MensalidadesController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Lista todas as mensalidades',
        response: {
          200: z.array(selectMensalidadeSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Busca uma mensalidade por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectMensalidadeSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/:id/membro',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Busca mensalidade com dados do membro',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithMembro.bind(controller)
  )

  app.get(
    '/membro/:membroId',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Lista mensalidades de um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectMensalidadeSchema),
        },
      },
    },
    controller.getByMembro.bind(controller)
  )

  app.get(
    '/membro/:membroId/:mesReferencia',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Busca mensalidade específica de um membro por mês',
        params: z.object({
          membroId: z.string().uuid(),
          mesReferencia: z.string().regex(/^\d{4}-\d{2}$/),
        }),
        response: {
          200: selectMensalidadeSchema.nullable(),
        },
      },
    },
    controller.getByMembroAndMonth.bind(controller)
  )

  app.get(
    '/pendentes',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Lista mensalidades pendentes',
        response: {
          200: z.array(selectMensalidadeSchema),
        },
      },
    },
    controller.getPendentes.bind(controller)
  )

  app.get(
    '/pagas',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Lista mensalidades pagas',
        response: {
          200: z.array(selectMensalidadeSchema),
        },
      },
    },
    controller.getPagas.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Cria uma nova mensalidade',
        body: insertMensalidadeSchema,
        response: {
          201: selectMensalidadeSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Mensalidades'],
        description: 'Atualiza uma mensalidade',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertMensalidadeSchema.partial(),
        response: {
          200: selectMensalidadeSchema,
        },
      },
    },
    controller.update.bind(controller)
  )
}

