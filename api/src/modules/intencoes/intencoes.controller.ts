import type { FastifyReply, FastifyRequest } from 'fastify'
import { IntencoesService } from './intencoes.service'
import type { InsertIntencaoParticipacao } from '@/db/schema'

export class IntencoesController {
  private service: IntencoesService

  constructor() {
    this.service = new IntencoesService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const intencoes = await this.service.getAll()
    return reply.status(200).send(intencoes)
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const intencao = await this.service.getById(request.params.id)
      return reply.status(200).send(intencao)
    } catch (error) {
      return reply.status(404).send({ error: 'Intenção não encontrada' })
    }
  }

  async getByEmail(request: FastifyRequest<{ Querystring: { email: string } }>, reply: FastifyReply) {
    const intencao = await this.service.getByEmail(request.query.email)
    return reply.status(200).send(intencao)
  }

  async getByToken(request: FastifyRequest<{ Params: { token: string } }>, reply: FastifyReply) {
    try {
      const intencao = await this.service.getByToken(request.params.token)
      return reply.status(200).send(intencao)
    } catch (error) {
      return reply.status(404).send({ error: 'Token inválido' })
    }
  }

  async getByStatus(request: FastifyRequest<{ Params: { status: string } }>, reply: FastifyReply) {
    const intencoes = await this.service.getByStatus(request.params.status as any)
    return reply.status(200).send(intencoes)
  }

  async create(request: FastifyRequest<{ Body: InsertIntencaoParticipacao }>, reply: FastifyReply) {
    try {
      await this.service.create(request.body)
      return reply.status(201).send(void 0)
    } catch (error) {
      console.log(error)
      return reply.status(500).send({ error: 'Erro ao criar intenção', errorDetails: error })
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: { status: 'pendente' | 'aprovado' | 'recusado' } }>, reply: FastifyReply) {
    try {
      const intencao = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(intencao)
    } catch (error) {
      return reply.status(404).send({ error: 'Intenção não encontrada' })
    }
  }

  async aprovar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const intencao = await this.service.aprovar(request.params.id)
      return reply.status(200).send(intencao)
    } catch (error) {
      return reply.status(404).send({ error: 'Intenção não encontrada' })
    }
  }
}
