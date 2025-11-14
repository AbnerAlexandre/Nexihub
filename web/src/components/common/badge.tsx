import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-block px-2 py-1 rounded text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white/70',
        // Intenções
        pendente: 'bg-yellow-500/20 text-yellow-500',
        aprovado: 'bg-green-500/20 text-green-500',
        recusado: 'bg-red-500/20 text-red-500',
        // Indicações
        em_prospeccao: 'bg-blue-500/20 text-blue-500',
        fechado: 'bg-green-500/20 text-green-500',
        perdido: 'bg-red-500/20 text-red-500',
        // Membros - Status
        ativo: 'bg-green-500/20 text-green-500',
        inativo: 'bg-red-500/20 text-red-500',
        suspenso: 'bg-yellow-500/20 text-yellow-500',
        // Membros - Tipo
        admin: 'bg-accent-primary/20 text-accent-primary',
        usuario: 'bg-white/10 text-white/70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className, 'uppercase')} {...props} />
  )
}
