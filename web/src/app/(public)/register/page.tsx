'use client'

import { Button } from "@/components/ui/button"
import { useCreateIntencao } from "@/features"
import Link from "next/link"
import { useState } from "react"

export default function RegisterPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [celular, setCelular] = useState('')
  const { mutate: handleCreateIntencao, isPending, error } = useCreateIntencao()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCreateIntencao({ nome, email, celular })
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
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors"
                placeholder="seu nome"
              />
            </div>

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
              <label htmlFor="celular" className="block text-sm font-medium mb-2">
                Celular
              </label>
              <input
                id="celular"
                name="celular"
                type="text"
                required
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full px-4 py-3 bg-background-secondary border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-colors"
                placeholder="(99) 99999-9999"
              />
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
