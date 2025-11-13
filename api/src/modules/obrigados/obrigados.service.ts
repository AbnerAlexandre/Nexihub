import { uuidv7 } from 'uuidv7'
import { ObrigadosRepository } from './obrigados.repository'
import type { InsertObrigado } from '@/db/schema'

export class ObrigadosService {
  private repository: ObrigadosRepository

  constructor() {
    this.repository = new ObrigadosRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const obrigado = await this.repository.findById(id)
    if (!obrigado) {
      throw new Error('Agradecimento não encontrado')
    }
    return obrigado
  }

  async getByIndicacao(indicacaoId: string) {
    return await this.repository.findByIndicacao(indicacaoId)
  }

  async getByMembroAgradecido(membroId: string) {
    return await this.repository.findByMembroAgradecido(membroId)
  }

  async getByMembroRecebeu(membroId: string) {
    return await this.repository.findByMembroRecebeu(membroId)
  }

  async getWithRelations(id: string) {
    const obrigado = await this.repository.findWithRelations(id)
    if (!obrigado) {
      throw new Error('Agradecimento não encontrado')
    }
    return obrigado
  }

  async create(data: InsertObrigado) {
    const obrigadoComId = {
      ...data,
      id: uuidv7(),
    }
    return await this.repository.create(obrigadoComId)
  }

  async update(id: string, data: Partial<InsertObrigado>) {
    const obrigado = await this.repository.update(id, data)
    if (!obrigado) {
      throw new Error('Agradecimento não encontrado')
    }
    return obrigado
  }
}
