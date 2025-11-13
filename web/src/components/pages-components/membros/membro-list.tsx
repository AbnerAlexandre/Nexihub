import type { MembroEssencial } from '@/features'
import { MembroCard } from './membro-card'

interface MembroListProps {
  membros: MembroEssencial[]
}

export function MembroList({ membros }: MembroListProps) {
  if (!membros || membros.length === 0) {
    return (
      <div className="text-center py-12 bg-background-secondary rounded-lg">
        <p className="text-muted-foreground">Nenhum membro encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {membros.map((membro) => (
        <MembroCard key={membro.id} membro={membro} />
      ))}
    </div>
  )
}