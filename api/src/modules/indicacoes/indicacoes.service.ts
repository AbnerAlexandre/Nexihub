import { uuidv7 } from 'uuidv7'
import { IndicacoesRepository } from './indicacoes.repository'
import type { InsertIndicacao } from '@/db/schema'

export class IndicacoesService {
  private repository: IndicacoesRepository

  constructor() {
    this.repository = new IndicacoesRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const indicacao = await this.repository.findById(id)
    if (!indicacao) {
      throw new Error('Indicação não encontrada')
    }
    return indicacao
  }

  async getByMembroIndicador(membroId: string) {
    return await this.repository.findByMembroIndicador(membroId)
  }

  async getByMembroRecebeu(membroId: string) {
    return await this.repository.findByMembroRecebeu(membroId)
  }

  async getByStatus(status: 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido') {
    return await this.repository.findByStatus(status)
  }

  async getWithRelations(id: string) {
    const indicacao = await this.repository.findWithRelations(id)
    if (!indicacao) {
      throw new Error('Indicação não encontrada')
    }
    return indicacao
  }

  async create(data: InsertIndicacao) {
    const indicacaoComId = {
      ...data,
      id: uuidv7(),
    }
    return await this.repository.create(indicacaoComId)
  }

  async update(id: string, data: Partial<InsertIndicacao>) {
    const indicacao = await this.repository.update(id, data)
    if (!indicacao) {
      throw new Error('Indicação não encontrada')
    }
    return indicacao
  }
}
