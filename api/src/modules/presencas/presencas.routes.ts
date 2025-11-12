import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { PresencasController } from './presencas.controller'
import { insertPresencaSchema, selectPresencaSchema, selectPresencaEssencialSchema } from '@/db/schema'

export const presencasRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new PresencasController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Lista todas as presenças (dados essenciais)',
        response: {
          200: z.array(selectPresencaEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Busca uma presença por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectPresencaSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/:id/relations',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Busca uma presença com todas as relações',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithRelations.bind(controller)
  )

  app.get(
    '/reuniao/:reuniaoId',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Lista presenças de uma reunião',
        params: z.object({
          reuniaoId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectPresencaSchema),
        },
      },
    },
    controller.getByReuniao.bind(controller)
  )

  app.get(
    '/reuniao/:reuniaoId/presentes',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Lista membros presentes em uma reunião (com check-in)',
        params: z.object({
          reuniaoId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectPresencaSchema),
        },
      },
    },
    controller.getPresentes.bind(controller)
  )

  app.get(
    '/membro/:membroId',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Lista presenças de um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectPresencaSchema),
        },
      },
    },
    controller.getByMembro.bind(controller)
  )

  app.get(
    '/reuniao/:reuniaoId/membro/:membroId',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Busca presença específica de um membro em uma reunião',
        params: z.object({
          reuniaoId: z.string().uuid(),
          membroId: z.string().uuid(),
        }),
        response: {
          200: selectPresencaSchema.nullable(),
        },
      },
    },
    controller.getByReuniaoAndMembro.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Cria uma nova presença',
        body: insertPresencaSchema,
        response: {
          201: selectPresencaSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Atualiza uma presença',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertPresencaSchema.partial(),
        response: {
          200: selectPresencaSchema,
        },
      },
    },
    controller.update.bind(controller)
  )

  app.post(
    '/reuniao/:reuniaoId/membro/:membroId/checkin',
    {
      schema: {
        tags: ['Presenças'],
        description: 'Registra check-in de um membro em uma reunião',
        params: z.object({
          reuniaoId: z.string().uuid(),
          membroId: z.string().uuid(),
        }),
        response: {
          200: selectPresencaSchema,
        },
      },
    },
    controller.fazerCheckin.bind(controller)
  )
}

