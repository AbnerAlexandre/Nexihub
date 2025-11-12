import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ObrigadosController } from './obrigados.controller'
import { insertObrigadoSchema, selectObrigadoSchema, selectObrigadoEssencialSchema } from '@/db/schema'

export const obrigadosRoutes: FastifyPluginAsyncZod = async (app) => {
  const controller = new ObrigadosController()

  app.get(
    '/',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Lista todos os agradecimentos (dados essenciais)',
        response: {
          200: z.array(selectObrigadoEssencialSchema),
        },
      },
    },
    controller.getAll.bind(controller)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Busca um agradecimento por ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: selectObrigadoSchema,
        },
      },
    },
    controller.getById.bind(controller)
  )

  app.get(
    '/:id/relations',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Busca um agradecimento com todas as relações',
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    controller.getWithRelations.bind(controller)
  )

  app.get(
    '/indicacao/:indicacaoId',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Lista agradecimentos de uma indicação',
        params: z.object({
          indicacaoId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectObrigadoSchema),
        },
      },
    },
    controller.getByIndicacao.bind(controller)
  )

  app.get(
    '/agradecido/:membroId',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Lista agradecimentos feitos por um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectObrigadoSchema),
        },
      },
    },
    controller.getByMembroAgradecido.bind(controller)
  )

  app.get(
    '/recebedor/:membroId',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Lista agradecimentos recebidos por um membro',
        params: z.object({
          membroId: z.string().uuid(),
        }),
        response: {
          200: z.array(selectObrigadoSchema),
        },
      },
    },
    controller.getByMembroRecebeu.bind(controller)
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Cria um novo agradecimento',
        body: insertObrigadoSchema,
        response: {
          201: selectObrigadoSchema,
        },
      },
    },
    controller.create.bind(controller)
  )

  app.patch(
    '/:id',
    {
      schema: {
        tags: ['Obrigados'],
        description: 'Atualiza um agradecimento',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: insertObrigadoSchema.partial(),
        response: {
          200: selectObrigadoSchema,
        },
      },
    },
    controller.update.bind(controller)
  )
}

