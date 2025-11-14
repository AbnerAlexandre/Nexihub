import type { MembroEssencial } from '@/features'
import { Badge } from '@/components/common'

interface MembroCardProps {
  membro: MembroEssencial
}

export function MembroCard({ membro }: MembroCardProps) {
  return (
    <div className="bg-background-secondary p-6 rounded-lg border border-white/5 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold">{membro.nome}</h3>
        <Badge variant={membro.statusMembro}>
          {membro.statusMembro}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{membro.email}</p>
      <p className="text-sm text-muted-foreground mb-3">{membro.celular}</p>
      <div className="flex items-center justify-between">
        <Badge variant={membro.tipo}>
          {membro.tipo}
        </Badge>
      </div>
    </div>
  )
}