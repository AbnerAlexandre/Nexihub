import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getIndicacoes, 
  getIndicacao, 
  createIndicacao, 
  updateIndicacao,
  type IndicacaoCreate,
  type IndicacaoUpdate
} from '../services/indicacoes-service'

export function useIndicacoes() {
  return useQuery({
    queryKey: ['indicacoes'],
    queryFn: getIndicacoes,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useIndicacao(id: string) {
  return useQuery({
    queryKey: ['indicacao', id],
    queryFn: () => getIndicacao(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useCreateIndicacao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IndicacaoCreate) => createIndicacao(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['indicacoes'] })
    },
  })
}

export function useUpdateIndicacao() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IndicacaoUpdate }) => 
      updateIndicacao(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['indicacoes'] })
      queryClient.invalidateQueries({ queryKey: ['indicacao', variables.id] })
    },
  })
}
