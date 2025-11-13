'use client'

import { Button } from "@/components/ui/button"
import { useLogin } from "@/features"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  
  const { mutate: handleLogin, isPending, error } = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin({ email, senha })
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
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
