'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useIndicacao, useUpdateIndicacao } from '@/features/indicacoes/hooks/use-indicacoes'
import { PageTitle } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import type { IndicacaoStatus } from '@/features/indicacoes/services/indicacoes-service'

export default function EditIndicacaoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const { data: indicacao, isLoading, isError } = useIndicacao(id || '')
  const updateMutation = useUpdateIndicacao()

  const [status, setStatus] = useState<IndicacaoStatus>('pendente')
  const [currentUserId, setCurrentUserId] = useState<string>('')

  useEffect(() => {
    if (indicacao) {
      setStatus(indicacao.status)
    }
  }, [indicacao])

  useEffect(() => {
    // Pegar ID do usuário do localStorage
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setCurrentUserId(user.id)
      }
    }
  }, [])

  if (!id) {
    return (
      <>
        <PageTitle title="Editar Indicação" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">ID da indicação não fornecido</p>
        </div>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <PageTitle title="Editar Indicação" />
        <div className="bg-background-secondary p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
        </div>
      </>
    )
  }

  if (isError || !indicacao) {
    return (
      <>
        <PageTitle title="Editar Indicação" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Erro ao carregar indicação</p>
        </div>
      </>
    )
  }

  const canEdit = currentUserId === indicacao.idMembroIndicador

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        id: indicacao.id,
        data: {
          status,
        },
      })
      router.push('/indicacoes')
    } catch (error) {
      console.error('Erro ao atualizar indicação:', error)
    }
  }

  const statusOptions: { value: IndicacaoStatus; label: string }[] = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'em_prospeccao', label: 'Em Prospecção' },
    { value: 'fechado', label: 'Fechado' },
    { value: 'perdido', label: 'Perdido' },
  ]

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Editar Indicação" />
        <Button variant="outline" onClick={() => router.push('/indicacoes')}>
          Voltar
        </Button>
      </div>

      <div className="bg-background-secondary p-6 rounded-lg space-y-6">
        {/* Informações do Cliente */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="text-lg">{indicacao.nomeCliente}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-lg">{indicacao.emailCliente}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Telefone</label>
              <p className="text-lg">{indicacao.telefoneCliente}</p>
            </div>
            {indicacao.motivo && (
              <div>
                <label className="text-sm text-muted-foreground">Motivo</label>
                <p className="text-lg">{indicacao.motivo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Informações da Indicação */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Detalhes da Indicação</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Data de Criação</label>
              <p className="text-lg">
                {new Date(indicacao.dataCriacao).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            {indicacao.dataFechamento && (
              <div>
                <label className="text-sm text-muted-foreground">Data de Fechamento</label>
                <p className="text-lg">
                  {new Date(indicacao.dataFechamento).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status - Editável apenas pelo criador */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Status da Indicação</h2>
          {canEdit ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as IndicacaoStatus)}
                  className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-primary focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-4 rounded-lg">
              <p className="text-sm">
                Apenas o membro que criou esta indicação pode editar o status.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
