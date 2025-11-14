'use client'

import { ActiveLink, Logo } from "@/components/common";
import { useEffect, useState } from "react";
import { useLogout } from "@/features/auth/hooks/use-auth";
import { User } from "lucide-react";

export function Header() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const logoutMutation = useLogout()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setIsAdmin(user.tipo === 'admin')
        const fullName = user.nome || user.email
        // Pega apenas o primeiro nome e limita a 10 caracteres
        const firstName = fullName.split(' ')[0]
        setUserName(firstName.length > 10 ? firstName.substring(0, 15) : firstName)
      }
    }
  }, [])

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className="fixed top-0 z-50 w-full h-16 border-b border-white/5 bg-background-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Logo />
          <nav className="flex items-center gap-6">
            <ActiveLink href="/">
              Home
            </ActiveLink>

            <ActiveLink href="/membros">
              Membros
            </ActiveLink>

            <ActiveLink href="/indicacoes">
              Indicações
            </ActiveLink>

            {isAdmin && (
              <ActiveLink href="/intencoes">
                Intenções
              </ActiveLink>
            )}

            {/* Dropdown de usuário */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary hover:bg-white/5 transition-colors border border-white/10 max-w-40"
              >
                <User className="w-4 h-4 shrink-0 text-accent-primary" />
                <span className="text-xs truncate">{userName}</span>
                <svg
                  className={`w-4 h-4 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 py-1 bg-background-secondary rounded-lg border border-white/10 shadow-lg z-20">
                    <button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-2 text-red-500"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
