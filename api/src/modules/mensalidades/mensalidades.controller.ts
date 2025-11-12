import type { FastifyReply, FastifyRequest } from 'fastify'
import { MensalidadesService } from './mensalidades.service'
import type { InsertMensalidade } from '@/db/schema'

export class MensalidadesController {
  private service: MensalidadesService

  constructor() {
    this.service = new MensalidadesService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const mensalidades = await this.service.getAll()
    return reply.status(200).send(mensalidades)
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const mensalidade = await this.service.getById(request.params.id)
      return reply.status(200).send(mensalidade)
    } catch (error) {
      return reply.status(404).send({ error: 'Mensalidade não encontrada' })
    }
  }

  async getByMembro(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const mensalidades = await this.service.getByMembro(request.params.membroId)
    return reply.status(200).send(mensalidades)
  }

  async getByMembroAndMonth(request: FastifyRequest<{ Params: { membroId: string; mesReferencia: string } }>, reply: FastifyReply) {
    const mensalidade = await this.service.getByMembroAndMonth(request.params.membroId, request.params.mesReferencia)
    return reply.status(200).send(mensalidade)
  }

  async getPendentes(request: FastifyRequest, reply: FastifyReply) {
    const mensalidades = await this.service.getPendentes()
    return reply.status(200).send(mensalidades)
  }

  async getPagas(request: FastifyRequest, reply: FastifyReply) {
    const mensalidades = await this.service.getPagas()
    return reply.status(200).send(mensalidades)
  }

  async getWithMembro(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const mensalidade = await this.service.getWithMembro(request.params.id)
      return reply.status(200).send(mensalidade)
    } catch (error) {
      return reply.status(404).send({ error: 'Mensalidade não encontrada' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertMensalidade }>, reply: FastifyReply) {
    const mensalidade = await this.service.create(request.body)
    return reply.status(201).send(mensalidade)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertMensalidade> }>, reply: FastifyReply) {
    try {
      const mensalidade = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(mensalidade)
    } catch (error) {
      return reply.status(404).send({ error: 'Mensalidade não encontrada' })
    }
  }
}
