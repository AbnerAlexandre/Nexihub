import type { FastifyReply, FastifyRequest } from 'fastify'
import { ObrigadosService } from './obrigados.service'
import type { InsertObrigado } from '@/db/schema'

export class ObrigadosController {
  private service: ObrigadosService

  constructor() {
    this.service = new ObrigadosService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const obrigados = await this.service.getAll()
    return reply.status(200).send(obrigados)
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const obrigado = await this.service.getById(request.params.id)
      return reply.status(200).send(obrigado)
    } catch (error) {
      return reply.status(404).send({ error: 'Agradecimento não encontrado' })
    }
  }

  async getByIndicacao(request: FastifyRequest<{ Params: { indicacaoId: string } }>, reply: FastifyReply) {
    const obrigados = await this.service.getByIndicacao(request.params.indicacaoId)
    return reply.status(200).send(obrigados)
  }

  async getByMembroAgradecido(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const obrigados = await this.service.getByMembroAgradecido(request.params.membroId)
    return reply.status(200).send(obrigados)
  }

  async getByMembroRecebeu(request: FastifyRequest<{ Params: { membroId: string } }>, reply: FastifyReply) {
    const obrigados = await this.service.getByMembroRecebeu(request.params.membroId)
    return reply.status(200).send(obrigados)
  }

  async getWithRelations(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const obrigado = await this.service.getWithRelations(request.params.id)
      return reply.status(200).send(obrigado)
    } catch (error) {
      return reply.status(404).send({ error: 'Agradecimento não encontrado' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertObrigado }>, reply: FastifyReply) {
    const obrigado = await this.service.create(request.body)
    return reply.status(201).send(obrigado)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertObrigado> }>, reply: FastifyReply) {
    try {
      const obrigado = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(obrigado)
    } catch (error) {
      return reply.status(404).send({ error: 'Agradecimento não encontrado' })
    }
  }
}
