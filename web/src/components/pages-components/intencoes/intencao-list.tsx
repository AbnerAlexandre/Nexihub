import type { IntencaoEssencial } from '@/features/intencao/services/intencoes-service'
import { IntencaoCard } from './intencao-card'

interface IntencaoListProps {
  intencoes: IntencaoEssencial[]
}

export function IntencaoList({ intencoes }: IntencaoListProps) {
  if (!intencoes || intencoes.length === 0) {
    return (
      <div className="text-center py-12 bg-background-secondary rounded-lg">
        <p className="text-muted-foreground">Nenhuma intenção de participação encontrada</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {intencoes.map((intencao) => (
        <IntencaoCard key={intencao.id} intencao={intencao} />
      ))}
    </div>
  )
}
