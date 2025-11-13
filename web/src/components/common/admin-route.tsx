'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      
      if (!userData) {
        router.push('/login')
        return
      }

      const user = JSON.parse(userData)
      
      if (user.tipo !== 'admin') {
        router.push('/')
        return
      }

      setIsAdmin(true)
      setChecking(false)
    }
  }, [router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-primary"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
