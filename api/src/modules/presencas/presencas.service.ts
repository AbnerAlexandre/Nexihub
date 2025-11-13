import { uuidv7 } from 'uuidv7'
import { PresencasRepository } from './presencas.repository'
import type { InsertPresenca } from '@/db/schema'

export class PresencasService {
  private repository: PresencasRepository

  constructor() {
    this.repository = new PresencasRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const presenca = await this.repository.findById(id)
    if (!presenca) {
      throw new Error('Presença não encontrada')
    }
    return presenca
  }

  async getByReuniao(reuniaoId: string) {
    return await this.repository.findByReuniao(reuniaoId)
  }

  async getByMembro(membroId: string) {
    return await this.repository.findByMembro(membroId)
  }

  async getByReuniaoAndMembro(reuniaoId: string, membroId: string) {
    return await this.repository.findByReuniaoAndMembro(reuniaoId, membroId)
  }

  async getPresentes(reuniaoId: string) {
    return await this.repository.findPresentes(reuniaoId)
  }

  async getWithRelations(id: string) {
    const presenca = await this.repository.findWithRelations(id)
    if (!presenca) {
      throw new Error('Presença não encontrada')
    }
    return presenca
  }

  async create(data: InsertPresenca) {
    const presencaComId = {
      ...data,
      id: uuidv7(),
    }
    return await this.repository.create(presencaComId)
  }

  async update(id: string, data: Partial<InsertPresenca>) {
    const presenca = await this.repository.update(id, data)
    if (!presenca) {
      throw new Error('Presença não encontrada')
    }
    return presenca
  }

  async fazerCheckin(reuniaoId: string, membroId: string) {
    const presenca = await this.repository.findByReuniaoAndMembro(reuniaoId, membroId)
    if (!presenca) {
      throw new Error('Presença não encontrada')
    }
    return await this.repository.update(presenca.id, {
      fezCheckin: true,
      horaCheckin: new Date(),
    })
  }
}
