import { get } from "@/lib/api"

export type MembroTipo = "admin" | "usuario"
export type MembroStatus = "ativo" | "inativo" | "pendente"

export type MembroEssencial = {
    id: string,
    nome: string,
    email: string,
    tipo: MembroTipo,
    celular: string,
    statusMembro: MembroStatus,
} 

export type Membro = {
  id: string,
  nome: string,
  email: string,
  tipo: MembroTipo,
  celular: string,
  senhaHash: string,
  ramo: string,
  descricao: string,
  statusMembro: MembroStatus,
  dataEntrada: string,
  agradecimentosPublicos: string,
  experiencias: string
}


export async function getMembros(): Promise<MembroEssencial[]> {
  // TODO: Implementar lógica
  const response = await get<MembroEssencial[]>('/membros')
  return response
}

export function getMembro(id: string) {
  // TODO: Implementar lógica
}

export function createMembro(data: unknown) {
  // TODO: Implementar lógica
}

export function updateMembro(id: string, data: unknown) {
  // TODO: Implementar lógica
}

export function deleteMembro(id: string) {
  // TODO: Implementar lógica
}
