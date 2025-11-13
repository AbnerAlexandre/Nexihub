'use client'

import { useRouter } from 'next/navigation'
import { useCreateIndicacao } from '@/features/indicacoes/hooks/use-indicacoes'
import { useMembros } from '@/features/membros/hooks/use-membros'
import { PageTitle } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function NewIndicacaoPage() {
  const router = useRouter()
  const createMutation = useCreateIndicacao()
  const { data: membros, isLoading: membrosLoading } = useMembros()

  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [formData, setFormData] = useState({
    idMembroRecebeu: '',
    nomeCliente: '',
    emailCliente: '',
    telefoneCliente: '',
    motivo: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Pegar ID do usuário logado
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setCurrentUserId(user.id)
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.idMembroRecebeu) {
      newErrors.idMembroRecebeu = 'Selecione um membro'
    }
    if (!formData.nomeCliente.trim()) {
      newErrors.nomeCliente = 'Nome é obrigatório'
    }
    if (!formData.emailCliente.trim()) {
      newErrors.emailCliente = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailCliente)) {
      newErrors.emailCliente = 'Email inválido'
    }
    if (!formData.telefoneCliente.trim()) {
      newErrors.telefoneCliente = 'Telefone é obrigatório'
    } else if (formData.telefoneCliente.replace(/\D/g, '').length < 10) {
      newErrors.telefoneCliente = 'Telefone deve ter no mínimo 10 dígitos'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!currentUserId) {
      alert('Usuário não autenticado')
      return
    }

    try {
      // Adicionar o ID do usuário logado como indicador
      await createMutation.mutateAsync({
        ...formData,
        idMembroIndicador: currentUserId,
      } as any)
      router.push('/indicacoes')
    } catch (error) {
      console.error('Erro ao criar indicação:', error)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Nova Indicação" />
        <Button variant="outline" onClick={() => router.push('/indicacoes')}>
          Cancelar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-background-secondary p-6 rounded-lg space-y-6">
        {/* Selecionar Membro */}
        <div>
          <label className="text-sm font-medium block mb-2">
            Colaborador que irá receber <span className="text-red-500">*</span>
          </label>
          {membrosLoading ? (
            <div className="bg-background-primary border border-white/10 rounded-lg px-4 py-2 text-muted-foreground">
              Carregando membros...
            </div>
          ) : (
            <select
              value={formData.idMembroRecebeu}
              onChange={(e) => handleChange('idMembroRecebeu', e.target.value)}
              className={`w-full bg-background-primary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                errors.idMembroRecebeu
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/10 focus:border-accent-primary'
              }`}
            >
              <option value="">Selecione um colaborador</option>
              {membros?.map((membro) => (
                <option key={membro.id} value={membro.id}>
                  {membro.nome} - {membro.email}
                </option>
              ))}
            </select>
          )}
          {errors.idMembroRecebeu && (
            <p className="text-red-500 text-sm mt-1">{errors.idMembroRecebeu}</p>
          )}
        </div>

        {/* Informações do Cliente */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Informações do Cliente</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Nome do Cliente <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nomeCliente}
                onChange={(e) => handleChange('nomeCliente', e.target.value)}
                placeholder="Digite o nome do cliente"
                className={`w-full bg-background-primary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.nomeCliente
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.nomeCliente && (
                <p className="text-red-500 text-sm mt-1">{errors.nomeCliente}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.emailCliente}
                onChange={(e) => handleChange('emailCliente', e.target.value)}
                placeholder="email@exemplo.com"
                className={`w-full bg-background-primary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.emailCliente
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.emailCliente && (
                <p className="text-red-500 text-sm mt-1">{errors.emailCliente}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Telefone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.telefoneCliente}
                onChange={(e) => handleChange('telefoneCliente', e.target.value)}
                placeholder="(00) 00000-0000"
                className={`w-full bg-background-primary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.telefoneCliente
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.telefoneCliente && (
                <p className="text-red-500 text-sm mt-1">{errors.telefoneCliente}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Motivo da Indicação (opcional)
              </label>
              <textarea
                value={formData.motivo}
                onChange={(e) => handleChange('motivo', e.target.value)}
                placeholder="Descreva o motivo da indicação..."
                rows={4}
                className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-primary focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={createMutation.isPending}
          className="w-full"
        >
          {createMutation.isPending ? 'Criando...' : 'Criar Indicação'}
        </Button>
      </form>
    </>
  )
}
