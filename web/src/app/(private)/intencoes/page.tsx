'use client'

import { useIntencoes } from '@/features/intencao/hooks/use-intencoes'
import { PageTitle, AdminRoute } from '@/components/common'
import { IntencaoList } from '@/components/pages-components/intencoes'

export default function IntencoesPage() {
  const { data: intencoes, isLoading, isError, error } = useIntencoes()

  if (isLoading) {
    return (
      <AdminRoute>
        <PageTitle title="Intenções de Participação" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-background-secondary p-4 rounded-lg animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </AdminRoute>
    )
  }

  if (isError) {
    return (
      <AdminRoute>
        <PageTitle title="Intenções de Participação" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Erro ao carregar intenções</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </AdminRoute>
    )
  }

  return (
    <AdminRoute>
      <PageTitle 
        title="Intenções de Participação" 
        subtitle={`${intencoes?.length || 0} ${intencoes?.length === 1 ? 'solicitação' : 'solicitações'}`}
      />
      <IntencaoList intencoes={intencoes || []} />
    </AdminRoute>
  )
}
