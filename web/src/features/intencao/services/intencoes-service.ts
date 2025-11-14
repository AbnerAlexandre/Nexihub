import { get, post, patch } from '@/lib/api'

export type IntencaoStatus = 'pendente' | 'aprovado' | 'recusado'

export type IntencaoEssencial = {
  id: string
  nome: string
  email: string
  celular: string
  status: IntencaoStatus
  dataSolicitacao: string
}

export type Intencao = {
  id: string
  nome: string
  email: string
  celular: string
  status: IntencaoStatus
  dataSolicitacao: string
  tokenConvite: string | null
  tokenExpiraEm: string | null
}

export type IntencaoCreate = {
  nome: string
  email: string
  celular: string
}

export type IntencaoUpdate = {
  status?: IntencaoStatus
}

export async function getIntencoes(): Promise<IntencaoEssencial[]> {
  return await get<IntencaoEssencial[]>('/intencoes')
}

export async function getIntencao(id: string): Promise<Intencao> {
  return await get<Intencao>(`/intencoes/${id}`)
}

export async function createIntencao(data: IntencaoCreate): Promise<void> {
  return await post<void>('/intencoes', data)
}

export async function updateIntencao(id: string, data: IntencaoUpdate): Promise<Intencao> {
  return await patch<Intencao>(`/intencoes/${id}`, data)
}

export async function aprovarIntencao(id: string): Promise<Intencao> {
  return await post<Intencao>(`/intencoes/${id}/aprovar`, {})
}

export async function getIntencaoByToken(token: string): Promise<Intencao> {
  return await get<Intencao>(`/intencoes/token/${token}`)
}
