'use client'

import { Button } from "@/components/ui/button"
import { useCreateIntencao } from "@/features"
import Link from "next/link"
import { useState } from "react"
import { registerSchema, type RegisterFormData } from '@/lib/validations/register'

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: '',
    email: '',
    celular: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate: handleCreateIntencao, isPending, error } = useCreateIntencao()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      registerSchema.parse(formData)
      setErrors({})
      handleCreateIntencao(formData)
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      error.errors?.forEach((err: any) => {
        if (err.path) {
          newErrors[err.path[0]] = err.message
        }
      })
      setErrors(newErrors)
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 bg-background-primary rounded-lg border-accent-primary-light border">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Cadastrar</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Preencha seus dados e espere o convite para acessar o sistema e fazer parte da nossa comunidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, nome: e.target.value }))
                  if (errors.nome) setErrors(prev => ({ ...prev, nome: '' }))
                }}
                className={`w-full px-4 py-3 bg-background-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors ${
                  errors.nome ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="seu nome"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                }}
                className={`w-full px-4 py-3 bg-background-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="celular" className="block text-sm font-medium mb-2">
                Celular
              </label>
              <input
                id="celular"
                name="celular"
                type="text"
                value={formData.celular}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, celular: e.target.value }))
                  if (errors.celular) setErrors(prev => ({ ...prev, celular: '' }))
                }}
                className={`w-full px-4 py-3 bg-background-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors ${
                  errors.celular ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="(99) 99999-9999"
              />
              {errors.celular && (
                <p className="text-red-500 text-sm mt-1">{errors.celular}</p>
              )}
            </div>

          </div>

          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              variant={"primary"}
              disabled={isPending}
            >
              {isPending ? 'Solicitando...' : 'Solicitar Acesso'}
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link href="/login" className="font-medium text-accent-primary hover:text-accent-primary/80">
              Entre aqui
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
