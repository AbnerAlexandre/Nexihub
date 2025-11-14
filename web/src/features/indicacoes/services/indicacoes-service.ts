import { get, post, patch } from '@/lib/api'

export type IndicacaoStatus = 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido'

export type IndicacaoEssencial = {
  id: string
  nomeCliente: string
  emailCliente: string
  status: IndicacaoStatus
  dataCriacao: string
  nomeIndicador: string | null
  nomeRecebeu: string | null
}

export type Indicacao = {
  id: string
  idMembroIndicador: string
  idMembroRecebeu: string
  nomeCliente: string
  emailCliente: string
  telefoneCliente: string
  motivo: string | null
  status: IndicacaoStatus
  dataCriacao: string
  dataFechamento: string | null
}

export type IndicacaoCreate = {
  idMembroIndicador: string
  idMembroRecebeu: string
  nomeCliente: string
  emailCliente: string
  telefoneCliente: string
  motivo?: string
}

export type IndicacaoUpdate = {
  status: IndicacaoStatus
}

export async function getIndicacoes(): Promise<IndicacaoEssencial[]> {
  return await get<IndicacaoEssencial[]>('/indicacoes')
}

export async function getIndicacao(id: string): Promise<Indicacao> {
  return await get<Indicacao>(`/indicacoes/${id}`)
}

export async function createIndicacao(data: IndicacaoCreate): Promise<Indicacao> {
  return await post<Indicacao>('/indicacoes', data)
}

export async function updateIndicacao(id: string, data: IndicacaoUpdate): Promise<Indicacao> {
  return await patch<Indicacao>(`/indicacoes/${id}`, data)
}
