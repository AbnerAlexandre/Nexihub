import { post } from '@/lib/api'

export type LoginCredentials = {
  email: string
  senha: string
}

export type LoginResponse = {
  id: string
  nome: string
  email: string
  tipo: 'admin' | 'membro'
  
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await post<LoginResponse>('/membros/authenticate', credentials)

  const expires = new Date()
  expires.setDate(expires.getDate() + 7)
  document.cookie = `token=true; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
  
  return response
}

export function logout(): void {
  document.cookie = 'token=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find(c => c.trim().startsWith('token='))
  
  return tokenCookie?.includes('true') ?? false
}
