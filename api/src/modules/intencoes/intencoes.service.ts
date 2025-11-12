import { IntencoesRepository } from './intencoes.repository'
import type { InsertIntencaoParticipacao } from '@/db/schema'

export class IntencoesService {
  private repository: IntencoesRepository

  constructor() {
    this.repository = new IntencoesRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const intencao = await this.repository.findById(id)
    if (!intencao) {
      throw new Error('Intenção não encontrada')
    }
    return intencao
  }

  async getByEmail(email: string) {
    return await this.repository.findByEmail(email)
  }

  async getByToken(token: string) {
    const intencao = await this.repository.findByToken(token)
    if (!intencao) {
      throw new Error('Token inválido')
    }
    return intencao
  }

  async getByStatus(status: 'pendente' | 'aprovado' | 'recusado') {
    return await this.repository.findByStatus(status)
  }

  async create(data: InsertIntencaoParticipacao) {
    return await this.repository.create(data)
  }

  async update(id: string, data: Partial<InsertIntencaoParticipacao>) {
    const intencao = await this.repository.update(id, data)
    if (!intencao) {
      throw new Error('Intenção não encontrada')
    }
    return intencao
  }
}
