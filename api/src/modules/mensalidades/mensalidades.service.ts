import { MensalidadesRepository } from './mensalidades.repository'
import type { InsertMensalidade } from '@/db/schema'

export class MensalidadesService {
  private repository: MensalidadesRepository

  constructor() {
    this.repository = new MensalidadesRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const mensalidade = await this.repository.findById(id)
    if (!mensalidade) {
      throw new Error('Mensalidade não encontrada')
    }
    return mensalidade
  }

  async getByMembro(membroId: string) {
    return await this.repository.findByMembro(membroId)
  }

  async getByMembroAndMonth(membroId: string, mesReferencia: string) {
    return await this.repository.findByMembroAndMonth(membroId, mesReferencia)
  }

  async getPendentes() {
    return await this.repository.findPendentes()
  }

  async getPagas() {
    return await this.repository.findPagas()
  }

  async getWithMembro(id: string) {
    const mensalidade = await this.repository.findWithMembro(id)
    if (!mensalidade) {
      throw new Error('Mensalidade não encontrada')
    }
    return mensalidade
  }

  async create(data: InsertMensalidade) {
    return await this.repository.create(data)
  }

  async update(id: string, data: Partial<InsertMensalidade>) {
    const mensalidade = await this.repository.update(id, data)
    if (!mensalidade) {
      throw new Error('Mensalidade não encontrada')
    }
    return mensalidade
  }
}
