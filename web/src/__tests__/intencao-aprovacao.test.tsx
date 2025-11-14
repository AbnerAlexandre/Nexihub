import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIntencoes, useAprovarIntencao } from '@/features/intencao/hooks/use-intencoes';
import type { ReactNode } from 'react';

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock do serviço de intenções
jest.mock('@/features/intencao/services/intencoes-service', () => ({
  getIntencoes: jest.fn(() => Promise.resolve([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@test.com',
      celular: '11999999999',
      status: 'pendente',
      dataSolicitacao: new Date().toISOString(),
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@test.com',
      celular: '11988888888',
      status: 'aprovado',
      dataSolicitacao: new Date().toISOString(),
      tokenConvite: 'token123',
    },
  ])),
  aprovarIntencao: jest.fn((id: string) => 
    Promise.resolve({
      id,
      nome: 'João Silva',
      email: 'joao@test.com',
      celular: '11999999999',
      status: 'aprovado',
      dataSolicitacao: new Date().toISOString(),
      tokenConvite: 'novo-token-123',
      tokenExpiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
  ),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe('Intenções - Hooks de Listagem e Aprovação', () => {
  describe('useIntencoes - Listagem de Solicitações', () => {
    it('deve carregar lista de intenções pendentes e aprovadas', async () => {
      const { result } = renderHook(() => useIntencoes(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toHaveLength(2);
      expect(result.current.data?.[0]).toMatchObject({
        nome: 'João Silva',
        status: 'pendente',
      });
      expect(result.current.data?.[1]).toMatchObject({
        nome: 'Maria Santos',
        status: 'aprovado',
      });
    });

    it('deve retornar dados com estrutura esperada', async () => {
      const { result } = renderHook(() => useIntencoes(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const intencao = result.current.data?.[0];
      expect(intencao).toHaveProperty('id');
      expect(intencao).toHaveProperty('nome');
      expect(intencao).toHaveProperty('email');
      expect(intencao).toHaveProperty('celular');
      expect(intencao).toHaveProperty('status');
      expect(intencao).toHaveProperty('dataSolicitacao');
    });
  });

  describe('useAprovarIntencao - Aprovação de Solicitação', () => {
    it('deve aprovar intenção e gerar token', async () => {
      const { result } = renderHook(() => useAprovarIntencao(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);

      result.current.mutate('1');

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toMatchObject({
        id: '1',
        status: 'aprovado',
        tokenConvite: 'novo-token-123',
      });
    });

    it('deve retornar token com data de expiração', async () => {
      const { result } = renderHook(() => useAprovarIntencao(), {
        wrapper: createWrapper(),
      });

      result.current.mutate('1');

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toHaveProperty('tokenConvite');
      expect(result.current.data).toHaveProperty('tokenExpiraEm');
      expect(result.current.data?.tokenConvite).toBeTruthy();
    });

    it('deve mudar status para aprovado após aprovação', async () => {
      const { result } = renderHook(() => useAprovarIntencao(), {
        wrapper: createWrapper(),
      });

      result.current.mutate('1');

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.status).toBe('aprovado');
    });
  });
});
