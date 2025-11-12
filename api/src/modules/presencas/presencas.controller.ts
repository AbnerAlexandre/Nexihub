import type { FastifyReply, FastifyRequest } from 'fastify'
import { PresencasService } from './presencas.service'
import type { InsertPresenca } from '@/db/schema'

export class PresencasController {
  private service: PresencasService

  constructor() {
    this.service = new PresencasService()
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const presenca = await this.service.getById(request.params.id)
      return reply.status(200).send(presenca)
    } catch (error) {
      return reply.status(404).send({ error: 'Presença não encontrada' })
    }
  }

  async getByReuniao(request: FastifyRequest<{ Params: { reuniaoId: string } }>, reply: FastifyReply) {
    const presencas = await this.service.getByReuniao(request.params.reuniaoId)
    return reply.status(200).send(presencas)
  }

  async getByMembro(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const presencas = await this.service.getByMembro(request.params.membroId)
    return reply.status(200).send(presencas)
  }

  async getByReuniaoAndMembro(request: FastifyRequest<{ Params: { reuniaoId: string; membroId: string } }>, reply: FastifyReply) {
    const presenca = await this.service.getByReuniaoAndMembro(request.params.reuniaoId, request.params.membroId)
    return reply.status(200).send(presenca)
  }

  async getPresentes(request: FastifyRequest<{ Params: { reuniaoId: string } }>, reply: FastifyReply) {
    const presencas = await this.service.getPresentes(request.params.reuniaoId)
    return reply.status(200).send(presencas)
  }

  async getWithRelations(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const presenca = await this.service.getWithRelations(request.params.id)
      return reply.status(200).send(presenca)
    } catch (error) {
      return reply.status(404).send({ error: 'Presença não encontrada' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertPresenca }>, reply: FastifyReply) {
    const presenca = await this.service.create(request.body)
    return reply.status(201).send(presenca)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertPresenca> }>, reply: FastifyReply) {
    try {
      const presenca = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(presenca)
    } catch (error) {
      return reply.status(404).send({ error: 'Presença não encontrada' })
    }
  }

  async fazerCheckin(request: FastifyRequest<{ Params: { reuniaoId: string; membroId: string } }>, reply: FastifyReply) {
    try {
      const presenca = await this.service.fazerCheckin(request.params.reuniaoId, request.params.membroId)
      return reply.status(200).send(presenca)
    } catch (error) {
      return reply.status(404).send({ error: 'Presença não encontrada' })
    }
  }
}
