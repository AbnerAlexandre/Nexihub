import type { IndicacaoEssencial } from '@/features/indicacoes/services/indicacoes-service'
import { IndicacaoCard } from './indicacao-card'

interface IndicacaoListProps {
  indicacoes: IndicacaoEssencial[]
}

export function IndicacaoList({ indicacoes }: IndicacaoListProps) {
  if (!indicacoes || indicacoes.length === 0) {
    return (
      <div className="text-center py-12 bg-background-secondary rounded-lg">
        <p className="text-muted-foreground">Nenhuma indicação encontrada</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicacoes.map((indicacao) => (
        <IndicacaoCard key={indicacao.id} indicacao={indicacao} />
      ))}
    </div>
  )
}
