import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'
import { getMembros } from "../services/membros-service";

export function useMembros() {
  return useQuery({
    queryKey: ['membros'],
    queryFn: getMembros,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useMembro(id: string) {
  // TODO: Implementar lógica
}

export function useCreateMembro() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: any) => {
      const { createMembro } = await import('../services/membros-service')
      return createMembro(data)
    },
    onSuccess: () => {
      alert('Cadastro concluído com sucesso!')
      router.push('/login')
    },
    onError: (error: any) => {
      console.error('Erro ao criar membro:', error)
      alert('Erro ao concluir cadastro. Tente novamente.')
    },
  })
}

export function useUpdateMembro() {
  // TODO: Implementar lógica
}

export function useDeleteMembro() {
  // TODO: Implementar lógica
}
