import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-7xl">
      {children}
    </div>
  )
}
