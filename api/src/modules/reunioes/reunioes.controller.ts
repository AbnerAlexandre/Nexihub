import type { FastifyReply, FastifyRequest } from 'fastify'
import { ReunioesService } from './reunioes.service'
import type { InsertReuniao } from '@/db/schema'

export class ReunioesController {
  private service: ReunioesService

  constructor() {
    this.service = new ReunioesService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const reunioes = await this.service.getAll()
    return reply.status(200).send(reunioes)
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const reuniao = await this.service.getById(request.params.id)
      return reply.status(200).send(reuniao)
    } catch (error) {
      return reply.status(404).send({ error: 'Reunião não encontrada' })
    }
  }

  async getByCriador(request: FastifyRequest<{ Params: { criadorId: string } }>, reply: FastifyReply) {
    const reunioes = await this.service.getByCriador(request.params.criadorId)
    return reply.status(200).send(reunioes)
  }

  async getByTipo(request: FastifyRequest<{ Params: { tipo: string } }>, reply: FastifyReply) {
    const reunioes = await this.service.getByTipo(request.params.tipo as any)
    return reply.status(200).send(reunioes)
  }

  async getProximas(request: FastifyRequest, reply: FastifyReply) {
    const reunioes = await this.service.getProximas()
    return reply.status(200).send(reunioes)
  }

  async getWithRelations(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const reuniao = await this.service.getWithRelations(request.params.id)
      return reply.status(200).send(reuniao)
    } catch (error) {
      return reply.status(404).send({ error: 'Reunião não encontrada' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertReuniao }>, reply: FastifyReply) {
    const reuniao = await this.service.create(request.body)
    return reply.status(201).send(reuniao)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertReuniao> }>, reply: FastifyReply) {
    try {
      const reuniao = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(reuniao)
    } catch (error) {
      return reply.status(404).send({ error: 'Reunião não encontrada' })
    }
  }
}
