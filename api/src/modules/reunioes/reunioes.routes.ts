import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ReunioesController } from './reunioes.controller'
import { insertReuniaoSchema, selectReuniaoSchema, selectReuniaoEssencialSchema } from '@/db/schema'

export const reunioesRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new ReunioesController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Lista todas as reuniões (dados essenciais)',
        response: {
          200: z.array(selectReuniaoEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Busca uma reunião por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectReuniaoSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/:id/relations',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Busca uma reunião com todas as relações (criador, convidados, presenças)',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithRelations.bind(controller)
  )

  app.get(
    '/criador/:criadorId',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Lista reuniões criadas por um membro',
        params: z.object({
          criadorId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectReuniaoSchema),
        },
      },
    },
    controller.getByCriador.bind(controller)
  )

  app.get(
    '/tipo/:tipo',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Lista reuniões por tipo',
        params: z.object({
          tipo: z.enum(['geral', 'selecionada']),
        }),
        response: {
          200: z.array(selectReuniaoSchema),
        },
      },
    },
    controller.getByTipo.bind(controller)
  )

  app.get(
    '/proximas',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Lista reuniões futuras (agendadas)',
        response: {
          200: z.array(selectReuniaoSchema),
        },
      },
    },
    controller.getProximas.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Cria uma nova reunião',
        body: insertReuniaoSchema,
        response: {
          201: selectReuniaoSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Reuniões'],
        description: 'Atualiza uma reunião',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertReuniaoSchema.partial(),
        response: {
          200: selectReuniaoSchema,
        },
      },
    },
    controller.update.bind(controller)
  )
}

