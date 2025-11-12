import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { MembrosController } from './membros.controller'
import { insertMembroSchema, selectMembroSchema, selectMembroEssencialSchema } from '@/db/schema'

export const membrosRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new MembrosController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Membros'],
        description: 'Lista todos os membros (dados essenciais)',
        response: {
          200: z.array(selectMembroEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Membros'],
        description: 'Busca um membro por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectMembroSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/:id/relations',
    {
      schema: {
        tags: ['Membros'],
        description: 'Busca um membro com todas as relações',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithRelations.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Membros'],
        description: 'Cria um novo membro',
        body: insertMembroSchema,
        response: {
          201: selectMembroSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Membros'],
        description: 'Atualiza um membro',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertMembroSchema.partial(),
        response: {
          200: selectMembroSchema,
        },
      },
    },
    controller.update.bind(controller)
  )
}
