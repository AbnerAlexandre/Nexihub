import type { FastifyReply, FastifyRequest } from 'fastify'
import { IndicacoesService } from './indicacoes.service'
import type { InsertIndicacao } from '@/db/schema'

export class IndicacoesController {
  private service: IndicacoesService

  constructor() {
    this.service = new IndicacoesService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const indicacoes = await this.service.getAll()
    return reply.status(200).send(indicacoes)
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const indicacao = await this.service.getById(request.params.id)
      return reply.status(200).send(indicacao)
    } catch (error) {
      return reply.status(404).send({ error: 'Indicação não encontrada' })
    }
  }

  async getByMembroIndicador(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const indicacoes = await this.service.getByMembroIndicador(request.params.membroId)
    return reply.status(200).send(indicacoes)
  }

  async getByMembroRecebeu(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const indicacoes = await this.service.getByMembroRecebeu(request.params.membroId)
    return reply.status(200).send(indicacoes)
  }

  async getByStatus(request: FastifyRequest<{ Params: { status: string } }>, reply: FastifyReply) {
    const indicacoes = await this.service.getByStatus(request.params.status as any)
    return reply.status(200).send(indicacoes)
  }

  async getWithRelations(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const indicacao = await this.service.getWithRelations(request.params.id)
      return reply.status(200).send(indicacao)
    } catch (error) {
      return reply.status(404).send({ error: 'Indicação não encontrada' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertIndicacao }>, reply: FastifyReply) {
    const indicacao = await this.service.create(request.body)
    return reply.status(201).send(indicacao)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertIndicacao> }>, reply: FastifyReply) {
    try {
      const indicacao = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(indicacao)
    } catch (error) {
      return reply.status(404).send({ error: 'Indicação não encontrada' })
    }
  }
}
