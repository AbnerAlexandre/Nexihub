import type { FastifyReply, FastifyRequest } from 'fastify'
import { MembrosService } from './membros.service'
import type { InsertMembro } from '@/db/schema'

export class MembrosController {
  private service: MembrosService

  constructor() {
    this.service = new MembrosService()
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const membros = await this.service.getAll()
    return reply.status(200).send(membros)
  }

  async getAutenticate(request: FastifyRequest<{ Body: { email: string; senha: string } }>, reply: FastifyReply) {
    try {
      const membros = await this.service.getAutenticate(request.body.email, request.body.senha)
      return reply.status(200).send(membros)
    } catch (error) {
      return reply.status(401).send({ error: 'Credenciais inválidas' })
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const membro = await this.service.getById(request.params.id)
      return reply.status(200).send(membro)
    } catch (error) {
      return reply.status(404).send({ error: 'Membro não encontrado' })
    }
  }

  async getWithRelations(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const membro = await this.service.getWithRelations(request.params.id)
      return reply.status(200).send(membro)
    } catch (error) {
      return reply.status(404).send({ error: 'Membro não encontrado' })
    }
  }

  async create(request: FastifyRequest<{ Body: InsertMembro }>, reply: FastifyReply) {
    const membro = await this.service.create(request.body)
    return reply.status(201).send(membro)
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: Partial<InsertMembro> }>, reply: FastifyReply) {
    try {
      const membro = await this.service.update(request.params.id, request.body)
      return reply.status(200).send(membro)
    } catch (error) {
      return reply.status(404).send({ error: 'Membro não encontrado' })
    }
  }
}
