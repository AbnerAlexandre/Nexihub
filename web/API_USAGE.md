# 📚 Guia de Uso da API Client

## 🔧 Configuração Inicial

### 1. Adicionar variável de ambiente

Crie/edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### 2. Criar tipos (opcional, mas recomendado)

Crie `src/types/api.ts`:

```typescript
// Tipos baseados na sua API
export type Membro = {
  id: string
  nome: string
  email: string
  tipo: 'admin' | 'membro'
  celular: string
  statusMembro: 'ativo' | 'pendente' | 'recusado'
}

export type Indicacao = {
  id: string
  nomeCliente: string
  emailCliente: string
  status: 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido'
  dataCriacao: string
  nomeIndicador: string | null
  nomeRecebeu: string | null
}

// ... outros tipos
```

## 📖 Formas de Uso

### Opção 1: Funções Individuais (Recomendado)

```typescript
import { get, post, patch, del } from '@/lib/api'
import type { Membro } from '@/types/api'

// Buscar todos
const membros = await get<Membro[]>('/membros')

// Buscar um
const membro = await get<Membro>('/membros/123')

// Criar
const novoMembro = await post<Membro>('/membros', {
  nome: 'João Silva',
  email: 'joao@example.com',
  celular: '11999999999',
  // ...
})

// Atualizar (parcial)
const atualizado = await patch<Membro>('/membros/123', {
  statusMembro: 'ativo'
})

// Deletar
await del('/membros/123')
```

### Opção 2: Objeto API

```typescript
import api from '@/lib/api'
import type { Membro } from '@/types/api'

const membros = await api.get<Membro[]>('/membros')
const novoMembro = await api.post<Membro>('/membros', { ... })
```

## 🎯 Exemplos Práticos

### 1. Em Server Components (SSR/SSG)

```typescript
// app/membros/page.tsx
import { get } from '@/lib/api'
import type { Membro } from '@/types/api'

export default async function MembrosPage() {
  // Fetch no servidor (SSR)
  const membros = await get<Membro[]>('/membros')

  return (
    <div>
      <h1>Membros</h1>
      <ul>
        {membros.map(membro => (
          <li key={membro.id}>{membro.nome}</li>
        ))}
      </ul>
    </div>
  )
}
```

### 2. Com React Query (Client Components)

Crie um hook customizado em `src/hooks/use-membros.ts`:

```typescript
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, patch, del } from '@/lib/api'
import type { Membro } from '@/types/api'

// Hook para listar membros
export function useMembros() {
  return useQuery({
    queryKey: ['membros'],
    queryFn: () => get<Membro[]>('/membros'),
  })
}

// Hook para buscar um membro
export function useMembro(id: string) {
  return useQuery({
    queryKey: ['membros', id],
    queryFn: () => get<Membro>(`/membros/${id}`),
    enabled: !!id, // Só busca se tiver ID
  })
}

// Hook para criar membro
export function useCreateMembro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Membro>) => post<Membro>('/membros', data),
    onSuccess: () => {
      // Invalida a cache para refazer a busca
      queryClient.invalidateQueries({ queryKey: ['membros'] })
    },
  })
}

// Hook para atualizar membro
export function useUpdateMembro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Membro> }) =>
      patch<Membro>(`/membros/${id}`, data),
    onSuccess: (_, variables) => {
      // Invalida tanto a lista quanto o item específico
      queryClient.invalidateQueries({ queryKey: ['membros'] })
      queryClient.invalidateQueries({ queryKey: ['membros', variables.id] })
    },
  })
}

// Hook para deletar membro
export function useDeleteMembro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => del(`/membros/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membros'] })
    },
  })
}
```

### 3. Usando os Hooks no Component

```typescript
'use client'

import { useMembros, useCreateMembro } from '@/hooks/use-membros'

export default function MembrosComponent() {
  const { data: membros, isLoading, error } = useMembros()
  const createMembro = useCreateMembro()

  const handleCreate = async () => {
    try {
      await createMembro.mutateAsync({
        nome: 'Novo Membro',
        email: 'novo@example.com',
        celular: '11999999999',
        // ...
      })
      alert('Membro criado com sucesso!')
    } catch (error) {
      alert('Erro ao criar membro')
    }
  }

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar membros</div>

  return (
    <div>
      <button onClick={handleCreate}>Criar Membro</button>
      <ul>
        {membros?.map(membro => (
          <li key={membro.id}>{membro.nome}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 🎨 Opções Avançadas

### Cache e Revalidação (Next.js)

```typescript
// Revalidar a cada 60 segundos
const membros = await get<Membro[]>('/membros', {
  next: { revalidate: 60 }
})

// Sem cache
const membros = await get<Membro[]>('/membros', {
  cache: 'no-store'
})

// Force cache
const membros = await get<Membro[]>('/membros', {
  cache: 'force-cache'
})
```

### Headers Customizados

```typescript
const membros = await get<Membro[]>('/membros', {
  headers: {
    'X-Custom-Header': 'valor',
  }
})
```

### Tratamento de Erros

```typescript
import { ApiError } from '@/lib/api'

try {
  const membro = await get<Membro>('/membros/123')
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status)
    console.log('Mensagem:', error.statusText)
    console.log('Dados:', error.data)
  }
}
```

## 🔐 Autenticação (Para Implementar Futuramente)

Descomente as linhas no `buildHeaders()` em `api.ts`:

```typescript
function buildHeaders(customHeaders?: HeadersInit): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  // Adicione aqui
  const token = localStorage.getItem('token') // ou cookies
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}
```

## 📦 Setup do React Query Provider

Crie `src/components/providers/query-provider.tsx`:

```typescript
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        retry: 1,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

E adicione no `app/layout.tsx`:

```typescript
import { QueryProvider } from '@/components/providers/query-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
```

## 🎯 Resumo

1. **Server Components**: Use `get()` diretamente com `await`
2. **Client Components**: Use React Query hooks (`useQuery`, `useMutation`)
3. **Mutations**: Sempre invalide a cache após criar/atualizar/deletar
4. **Tipos**: Crie tipos TypeScript para ter autocomplete e type safety
