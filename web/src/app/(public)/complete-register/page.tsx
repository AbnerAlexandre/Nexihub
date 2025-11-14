'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useIntencaoByToken } from '@/features/intencao/hooks/use-intencoes'
import { useCreateMembro } from '@/features/membros/hooks/use-membros'
import { PageTitle } from '@/components/common'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { completeRegisterSchema, type CompleteRegisterFormData } from '@/lib/validations/complete-register'

export default function CompleteRegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const { data: intencao, isLoading, isError } = useIntencaoByToken(token || '')
  const createMembroMutation = useCreateMembro()

  const [formData, setFormData] = useState<CompleteRegisterFormData>({
    senha: '',
    confirmarSenha: '',
    ramo: '',
    descricao: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Verificar se o token expirou
    if (intencao?.tokenExpiraEm) {
      const dataExpiracao = new Date(intencao.tokenExpiraEm)
      if (dataExpiracao < new Date()) {
        alert('Token expirado! Solicite um novo convite.')
        router.push('/register')
      }
    }

    // Verificar se já foi aprovado
    if (intencao && intencao.status !== 'aprovado') {
      alert('Este convite ainda não foi aprovado ou foi recusado.')
      router.push('/register')
    }
  }, [intencao, router])

  const validateForm = () => {
    try {
      completeRegisterSchema.parse(formData)
      setErrors({})
      return true
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      error.errors?.forEach((err: any) => {
        if (err.path) {
          newErrors[err.path[0]] = err.message
        }
      })
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !intencao) {
      return
    }

    try {
      await createMembroMutation.mutateAsync({
        nome: intencao.nome,
        email: intencao.email,
        celular: intencao.celular,
        senhaHash: formData.senha, // O backend deve fazer hash
        ramo: formData.ramo,
        descricao: formData.descricao,
      })
    } catch (error) {
      console.error('Erro ao completar cadastro:', error)
    }
  }

  const handleChange = (field: keyof CompleteRegisterFormData, value: string) => {
    setFormData((prev: CompleteRegisterFormData) => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
          <p className="font-medium">Token não fornecido</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-background-secondary p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-white/10 rounded w-64 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-48"></div>
        </div>
      </div>
    )
  }

  if (isError || !intencao) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg max-w-md">
          <p className="font-medium">Token inválido ou intenção não encontrada</p>
          <Button 
            variant="outline" 
            onClick={() => router.push('/register')}
            className="mt-4 w-full"
          >
            Solicitar Novo Acesso
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md h-[600px] flex flex-col p-8 bg-background-primary rounded-lg border-accent-primary-light border overflow-hidden">
        <div className="text-center mb-6 shrink-0">
          <h2 className="text-3xl font-bold tracking-tight">Complete seu Cadastro</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Olá, {intencao.nome}! Complete os dados abaixo
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[#60efff] [&::-webkit-scrollbar-thumb]:to-[#00ff87] [&::-webkit-scrollbar-thumb]:rounded hover:[&::-webkit-scrollbar-thumb]:from-[#00ff87] hover:[&::-webkit-scrollbar-thumb]:to-[#60efff]">
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <p className="text-green-500 text-sm">
              ✓ Seu convite foi aprovado!
            </p>
          </div>

          {/* Dados já preenchidos */}
          <div className="mb-6 space-y-3 p-4 bg-background-secondary rounded-lg">
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground">Dados do Convite</h3>
            <div>
              <label className="text-xs text-muted-foreground">Nome</label>
              <p className="text-sm">{intencao.nome}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <p className="text-sm">{intencao.email}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Celular</label>
              <p className="text-sm">{intencao.celular}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Senha */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => handleChange('senha', e.target.value)}
                placeholder="Digite sua senha"
                className={`w-full bg-background-secondary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.senha
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Confirmar Senha <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.confirmarSenha}
                onChange={(e) => handleChange('confirmarSenha', e.target.value)}
                placeholder="Confirme sua senha"
                className={`w-full bg-background-secondary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.confirmarSenha
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.confirmarSenha && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
              )}
            </div>

            {/* Ramo */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Ramo de Atuação <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.ramo}
                onChange={(e) => handleChange('ramo', e.target.value)}
                placeholder="Ex: Tecnologia, Consultoria"
                className={`w-full bg-background-secondary border rounded-lg px-4 py-2 text-white focus:outline-none ${
                  errors.ramo
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.ramo && (
                <p className="text-red-500 text-sm mt-1">{errors.ramo}</p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Sobre Você <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Conte um pouco sobre você..."
                rows={4}
                className={`w-full bg-background-secondary border rounded-lg px-4 py-2 text-white focus:outline-none resize-none ${
                  errors.descricao
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-accent-primary'
                }`}
              />
              {errors.descricao && (
                <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={createMembroMutation.isPending}
              className="w-full"
            >
              {createMembroMutation.isPending ? 'Finalizando...' : 'Finalizar Cadastro'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
