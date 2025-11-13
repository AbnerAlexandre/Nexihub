'use client'

import { ActiveLink, Logo } from "@/components/common";
import { useEffect, useState } from "react";

export function Header() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setIsAdmin(user.tipo === 'admin')
      }
    }
  }, [])

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
          </nav>
        </div>
      </div>
    </div>
  );
}
