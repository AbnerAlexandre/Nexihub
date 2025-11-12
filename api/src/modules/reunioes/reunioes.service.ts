import { ReunioesRepository } from './reunioes.repository'
import type { InsertReuniao } from '@/db/schema'

export class ReunioesService {
  private repository: ReunioesRepository

  constructor() {
    this.repository = new ReunioesRepository()
  }

  async getAll() {
    return await this.repository.findAll()
  }

  async getById(id: string) {
    const reuniao = await this.repository.findById(id)
    if (!reuniao) {
      throw new Error('Reunião não encontrada')
    }
    return reuniao
  }

  async getByCriador(criadorId: string) {
    return await this.repository.findByCriador(criadorId)
  }

  async getByTipo(tipo: 'geral' | 'selecionada') {
    return await this.repository.findByTipo(tipo)
  }

  async getProximas() {
    return await this.repository.findProximas()
  }

  async getWithRelations(id: string) {
    const reuniao = await this.repository.findWithRelations(id)
    if (!reuniao) {
      throw new Error('Reunião não encontrada')
    }
    return reuniao
  }

  async create(data: InsertReuniao) {
    return await this.repository.create(data)
  }

  async update(id: string, data: Partial<InsertReuniao>) {
    const reuniao = await this.repository.update(id, data)
    if (!reuniao) {
      throw new Error('Reunião não encontrada')
    }
    return reuniao
  }
}
