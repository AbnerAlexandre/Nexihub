// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

type RequestOptions = {
  headers?: HeadersInit
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`)
    this.name = 'ApiError'
  }
}

function buildHeaders(customHeaders?: HeadersInit): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  return headers
}

async function handleResponse<T>(response: Response): Promise<T> {

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }
    throw new ApiError(response.status, response.statusText, errorData)
  }


  if (response.status === 204) {
    return null as T
  }

  try {
    return await response.json()
  } catch {
    return null as T
  }
}

/**
 * Faz uma requisição GET
 * @param path - Caminho da API (ex: '/membros', '/membros/123')
 * @param options - Opções adicionais da requisição
 * @returns Promise com os dados tipados
 * 
 * @example
 * const membros = await get<Membro[]>('/membros')
 * const membro = await get<Membro>('/membros/123')
 */
export async function get<T>(
  path: string,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: buildHeaders(options?.headers),
    cache: options?.cache,
    next: options?.next,
  })

  return handleResponse<T>(response)
}

/**
 * Faz uma requisição POST
 * @param path - Caminho da API
 * @param data - Dados a serem enviados no body
 * @param options - Opções adicionais da requisição
 * @returns Promise com os dados da resposta tipados
 * 
 * @example
 * const novoMembro = await post<Membro>('/membros', {
 *   nome: 'João Silva',
 *   email: 'joao@example.com'
 * })
 */
export async function post<T>(
  path: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: buildHeaders(options?.headers),
    body: data ? JSON.stringify(data) : undefined,
    cache: options?.cache,
    next: options?.next,
  })

  return handleResponse<T>(response)
}

/**
 * Faz uma requisição PUT
 * @param path - Caminho da API
 * @param data - Dados a serem enviados no body
 * @param options - Opções adicionais da requisição
 * @returns Promise com os dados da resposta tipados
 * 
 * @example
 * const membroAtualizado = await put<Membro>('/membros/123', {
 *   nome: 'João Silva Updated'
 * })
 */
export async function put<T>(
  path: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: buildHeaders(options?.headers),
    body: data ? JSON.stringify(data) : undefined,
    cache: options?.cache,
    next: options?.next,
  })

  return handleResponse<T>(response)
}

/**
 * Faz uma requisição PATCH
 * @param path - Caminho da API
 * @param data - Dados parciais a serem atualizados
 * @param options - Opções adicionais da requisição
 * @returns Promise com os dados da resposta tipados
 * 
 * @example
 * const membroAtualizado = await patch<Membro>('/membros/123', {
 *   statusMembro: 'ativo'
 * })
 */
export async function patch<T>(
  path: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PATCH',
    headers: buildHeaders(options?.headers),
    body: data ? JSON.stringify(data) : undefined,
    cache: options?.cache,
    next: options?.next,
  })

  return handleResponse<T>(response)
}

/**
 * Faz uma requisição DELETE
 * @param path - Caminho da API
 * @param options - Opções adicionais da requisição
 * @returns Promise void (sem retorno)
 * 
 * @example
 * await del('/membros/123')
 */
export async function del(
  path: string,
  options?: RequestOptions
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    headers: buildHeaders(options?.headers),
    cache: options?.cache,
    next: options?.next,
  })

  await handleResponse<void>(response)
}

// ============================================
// OBJETO API (alternativa de uso)
// ============================================

/**
 * Objeto API com todos os métodos HTTP
 * Pode ser usado como alternativa às funções individuais
 * 
 * @example
 * import api from '@/lib/api'
 * const membros = await api.get<Membro[]>('/membros')
 */
const api = {
  get,
  post,
  put,
  patch,
  delete: del,
}

export default api
