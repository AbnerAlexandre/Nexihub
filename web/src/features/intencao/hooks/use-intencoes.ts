import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { 
  getIntencoes, 
  getIntencao, 
  createIntencao, 
  updateIntencao,
  aprovarIntencao,
  type IntencaoCreate,
  type IntencaoUpdate
} from '../services/intencoes-service'

export function useIntencoes() {
  return useQuery({
    queryKey: ['intencoes'],
    queryFn: getIntencoes,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useIntencao(id: string) {
  return useQuery({
    queryKey: ['intencao', id],
    queryFn: () => getIntencao(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateIntencao() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: IntencaoCreate) => createIntencao(data),
    onSuccess: () => {
      alert('Solicitação de acesso enviada! Aguarde a aprovação por e-mail.')
      router.push('/')
    },
  })
}

export function useUpdateIntencao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IntencaoUpdate }) => 
      updateIntencao(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['intencoes'] })
      queryClient.invalidateQueries({ queryKey: ['intencao', variables.id] })
    },
  })
}

export function useAprovarIntencao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => aprovarIntencao(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['intencoes'] })
      queryClient.invalidateQueries({ queryKey: ['intencao', id] })
    },
  })
}

export function useIntencaoByToken(token: string) {
  return useQuery({
    queryKey: ['intencao', 'token', token],
    queryFn: async () => {
      const { getIntencaoByToken } = await import('../services/intencoes-service')
      return getIntencaoByToken(token)
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  })
}
