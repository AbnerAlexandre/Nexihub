import { uuidv7 } from 'uuidv7'
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

  async getAutenticate(email: string, senha: string) {
    const membro = await this.repository.authenticate(email, senha)
    if (!membro) {
      throw new Error('Credenciais inválidas')
    }
    return membro
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
    const membroComId = {
      ...data,
      id: uuidv7(),
    }
    return await this.repository.create(membroComId)
  }

  async update(id: string, data: Partial<InsertMembro>) {
    const membro = await this.repository.update(id, data)
    if (!membro) {
      throw new Error('Membro não encontrado')
    }
    return membro
  }
}
