'use client'

import { useIndicacoes } from '@/features/indicacoes/hooks/use-indicacoes'
import { PageTitle } from '@/components/common'
import { IndicacaoList } from '@/components/pages-components/indicacoes/indicacao-list'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function IndicacoesPage() {
  const { data: indicacoes, isLoading, isError, error } = useIndicacoes()
  const router = useRouter()

  if (isLoading) {
    return (
      <>
        <PageTitle title="Indicações" />
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
        <PageTitle title="Indicações" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Erro ao carregar indicações</p>
          <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle 
          title="Indicações" 
          subtitle={`${indicacoes?.length || 0} ${indicacoes?.length === 1 ? 'indicação' : 'indicações'}`}
        />
        <Button onClick={() => router.push('/indicacoes/new')}>
          Nova Indicação
        </Button>
      </div>
      <IndicacaoList indicacoes={indicacoes || []} />
    </>
  )
}
