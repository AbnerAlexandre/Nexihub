import { MembrosRepository } from './membros.repository'
import type { InsertMembro } from '@/db/schema'

export class MembrosService {
  private repository: MembrosRepository

  constructor() {
    this.repository = new MembrosRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const membro = await this.repository.findById(id)
    if (!membro) {
      throw new Error('Membro não encontrado')
    }
    return membro
  }

  async getWithRelations(id: string) {
    const membro = await this.repository.findWithRelations(id)
    if (!membro) {
      throw new Error('Membro não encontrado')
    }
    return membro
  }

  async create(data: InsertMembro) {
    return await this.repository.create(data)
  }

  async update(id: string, data: Partial<InsertMembro>) {
    const membro = await this.repository.update(id, data)
    if (!membro) {
      throw new Error('Membro não encontrado')
    }
    return membro
  }
}
