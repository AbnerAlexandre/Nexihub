import { uuidv7 } from 'uuidv7'
import { randomBytes } from 'node:crypto'
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
    const intencaoComId = {
      ...data,
      id: uuidv7(),
      status: 'pendente' as const,
      dataSolicitacao: new Date(),
      tokenConvite: null,
      tokenExpiraEm: null,
    }
    
    return await this.repository.create(intencaoComId)
  }

  async aprovar(id: string) {
    // Gerar token de convite único ao aprovar
    const tokenConvite = randomBytes(32).toString('hex')
    
    // Token expira em 7 dias
    const tokenExpiraEm = new Date()
    tokenExpiraEm.setDate(tokenExpiraEm.getDate() + 7)

    return await this.repository.update(id, {
      status: 'aprovado',
      tokenConvite,
      tokenExpiraEm,
    } as any)
  }

  async update(id: string, data: { status: 'pendente' | 'aprovado' | 'recusado' }) {
    // Se o status for 'aprovado', gera o token automaticamente
    if (data.status === 'aprovado') {
      const tokenConvite = randomBytes(32).toString('hex')
      const tokenExpiraEm = new Date()
      tokenExpiraEm.setDate(tokenExpiraEm.getDate() + 7)

      const intencao = await this.repository.update(id, {
        status: data.status,
        tokenConvite,
        tokenExpiraEm,
      } as any)
      
      if (!intencao) {
        throw new Error('Intenção não encontrada')
      }
      return intencao
    }

    // Para outros status, apenas atualiza o status
    const intencao = await this.repository.update(id, { status: data.status } as any)
    if (!intencao) {
      throw new Error('Intenção não encontrada')
    }
    return intencao
  }
}
