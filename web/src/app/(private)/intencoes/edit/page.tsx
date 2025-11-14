'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useIntencao, useUpdateIntencao, useAprovarIntencao } from '@/features/intencao/hooks/use-intencoes'
import { PageTitle, AdminRoute, Badge } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import type { IntencaoStatus } from '@/features/intencao/services/intencoes-service'

export default function EditIntencaoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = searchParams.get('id')

  const { data: intencao, isLoading, isError } = useIntencao(id || '')
  const updateMutation = useUpdateIntencao()
  const aprovarMutation = useAprovarIntencao()

  const [status, setStatus] = useState<IntencaoStatus>('pendente')

  useEffect(() => {
    if (intencao) {
      setStatus(intencao.status)
    }
  }, [intencao])

  const handleSave = async () => {
    if (!intencao) return
    try {
      const result = await updateMutation.mutateAsync({
        id: intencao.id,
        data: { status },
      })
      
      if (status === 'aprovado' && result.tokenConvite) {
        const completeRegisterUrl = `${window.location.origin}/complete-register?token=${result.tokenConvite}`
        alert(`Cadastro aprovado com sucesso! Foi enviado um e-mail para ${intencao.email} com o link:\n\n${completeRegisterUrl}`)
      } else {
        alert('Status atualizado com sucesso!')
      }
      
      router.push('/intencoes')
    } catch (error) {
      console.error('Erro ao atualizar intenção:', error)
    }
  }

  const handleAprovar = async () => {
    if (!intencao) return
    try {
      const result = await aprovarMutation.mutateAsync(intencao.id)
      const completeRegisterUrl = `${window.location.origin}/complete-register?token=${result.tokenConvite}`
      alert(`Cadastro aprovado com sucesso! Foi enviado um e-mail para ${intencao.email} com o link:\n\n${completeRegisterUrl}`)
      router.push('/intencoes')
    } catch (error) {
      console.error('Erro ao aprovar intenção:', error)
      alert('Erro ao aprovar intenção. Tente novamente.')
    }
  }

  const statusOptions: { value: IntencaoStatus; label: string }[] = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'aprovado', label: 'Aprovado' },
    { value: 'recusado', label: 'Recusado' },
  ]

  if (!id) {
    return (
      <AdminRoute>
        <PageTitle title="Editar Intenção" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">ID da intenção não fornecido</p>
        </div>
      </AdminRoute>
    )
  }

  if (isLoading) {
    return (
      <AdminRoute>
        <PageTitle title="Editar Intenção" />
        <div className="bg-background-secondary p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
        </div>
      </AdminRoute>
    )
  }

  if (isError || !intencao) {
    return (
      <AdminRoute>
        <PageTitle title="Editar Intenção" />
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Erro ao carregar intenção</p>
        </div>
      </AdminRoute>
    )
  }

  return (
    <AdminRoute>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Editar Intenção" />
        <Button variant="outline" onClick={() => router.push('/intencoes')}>
          Voltar
        </Button>
      </div>

      <div className="bg-background-secondary p-6 rounded-lg space-y-6">
        {/* Informações do Solicitante */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Informações do Solicitante</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="text-lg">{intencao.nome}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-lg">{intencao.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Celular</label>
              <p className="text-lg">{intencao.celular}</p>
            </div>
          </div>
        </div>

        {/* Informações da Solicitação */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Detalhes da Solicitação</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Data da Solicitação</label>
              <p className="text-lg">
                {new Date(intencao.dataSolicitacao).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Status Atual</label>
              <p className="text-lg">
                <Badge variant={intencao.status} className="text-sm px-3">
                  {intencao.status === 'pendente'
                    ? 'Pendente'
                    : intencao.status === 'aprovado'
                    ? 'Aprovado'
                    : 'Recusado'}
                </Badge>
              </p>
            </div>
            {intencao.tokenConvite && (
              <div>
                <label className="text-sm text-muted-foreground">Token de Convite</label>
                <p className="text-sm font-mono bg-background-primary p-2 rounded break-all">
                  {intencao.tokenConvite}
                </p>
              </div>
            )}
            {intencao.tokenExpiraEm && (
              <div>
                <label className="text-sm text-muted-foreground">Token Expira Em</label>
                <p className="text-lg">
                  {new Date(intencao.tokenExpiraEm).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ações do Administrador */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ações do Administrador</h2>
          
          {intencao.status === 'pendente' && (
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500 p-4 rounded-lg">
                <p className="text-blue-500 text-sm mb-3">
                  ✨ Ao aprovar, um token de convite será gerado automaticamente e enviado para o email do solicitante.
                </p>
                <Button 
                  onClick={handleAprovar}
                  disabled={aprovarMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {aprovarMutation.isPending ? 'Aprovando...' : '✓ Aprovar e Gerar Token'}
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium block">Ou alterar status manualmente:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as IntencaoStatus)}
                  className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-primary focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Button 
                  onClick={handleSave}
                  disabled={updateMutation.isPending || status === intencao.status}
                  variant="outline"
                  className="w-full"
                >
                  {updateMutation.isPending ? 'Salvando...' : 'Salvar Alteração'}
                </Button>
              </div>
            </div>
          )}

          {intencao.status === 'aprovado' && (
            <div className="bg-green-500/10 border border-green-500 p-4 rounded-lg">
              <p className="text-green-500 text-sm">
                ✓ Esta intenção já foi aprovada e o token foi gerado.
              </p>
            </div>
          )}

          {intencao.status === 'recusado' && (
            <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg">
              <p className="text-red-500 text-sm">
                Esta intenção foi recusada.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  )
}
