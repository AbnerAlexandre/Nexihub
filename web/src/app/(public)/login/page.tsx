'use client'

import { Button } from "@/components/ui/button"
import { useLogin } from "@/features"
import Link from "next/link"
import { useState } from "react"
import { loginSchema, type LoginFormData } from '@/lib/validations/login'

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    senha: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const { mutate: handleLogin, isPending, error } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      loginSchema.parse(formData)
      setErrors({})
      handleLogin(formData)
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
          <h2 className="text-3xl font-bold tracking-tight">Fazer Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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
              <label htmlFor="senha" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, senha: e.target.value }))
                  if (errors.senha) setErrors(prev => ({ ...prev, senha: '' }))
                }}
                className={`w-full px-4 py-3 bg-background-secondary border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors ${
                  errors.senha ? 'border-red-500' : 'border-white/10'
                }`}
                placeholder="••••••••"
              />
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="lembrar"
                name="lembrar"
                type="checkbox"
                className="h-4 w-4 rounded border-white/10 bg-background-secondary text-accent-primary focus:ring-accent-primary"
              />
              <label htmlFor="lembrar" className="ml-2 block text-sm">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-accent-primary hover:text-accent-primary/80">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-accent-error/10 border border-accent-error/20 rounded-md">
              <p className="text-sm text-accent-error">
                Erro ao fazer login. Verifique suas credenciais.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              variant={"primary"}
              disabled={isPending}
            >
              {isPending ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link href="/register" className="font-medium text-accent-primary hover:text-accent-primary/80">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
