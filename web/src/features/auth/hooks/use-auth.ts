'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { login, logout, type LoginCredentials, type LoginResponse } from '../services/auth-service'


export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data: LoginResponse) => {

      console.log('useAuth', data)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data))
      }

      router.push('/') 
    },
    onError: (error: any) => {
      console.error('Erro ao fazer login:', error)
    },
  })
}


export function useLogout() {
  const router = useRouter()

  return useMutation({
    mutationFn: () => Promise.resolve(logout()),
    onSuccess: () => {

      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
      
      router.push('/login')
    },
  })
}


export function useCurrentUser() {
  if (typeof window === 'undefined') return null
  
  const userJson = localStorage.getItem('user')
  if (!userJson) return null
  
  try {
    return JSON.parse(userJson) as LoginResponse
  } catch {
    return null
  }
}
