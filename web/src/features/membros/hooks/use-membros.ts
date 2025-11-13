import { useQuery, useMutation } from "@tanstack/react-query";
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
  // TODO: Implementar lógica
}

export function useUpdateMembro() {
  // TODO: Implementar lógica
}

export function useDeleteMembro() {
  // TODO: Implementar lógica
}
