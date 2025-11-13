'use client'

import { useMembros } from '@/features'
import { PageTitle } from '@/components/common'
import { MembroList } from '@/components/pages-components/membros/membro-list'

export default function MembrosPage() {
  const { data: membros, isLoading, isError, error } = useMembros()

  if (isLoading) {
    return (
      <>
        <PageTitle title="Membros" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-background-secondary p-4 rounded-lg animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <PageTitle title="Membros" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Erro ao carregar membros</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <PageTitle 
        title="Membros" 
        subtitle={`${membros?.length || 0} ${membros?.length === 1 ? 'membro' : 'membros'}`}
      />
      <MembroList membros={membros || []} />
    </>
  )
}
