import type { IndicacaoEssencial } from '@/features/indicacoes/services/indicacoes-service'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/common'

interface IndicacaoCardProps {
  indicacao: IndicacaoEssencial
}

export function IndicacaoCard({ indicacao }: IndicacaoCardProps) {
  const router = useRouter()

  const statusLabels = {
    pendente: 'Pendente',
    em_prospeccao: 'Em Prospecção',
    fechado: 'Fechado',
    perdido: 'Perdido',
  }

  return (
    <div
      onClick={() => router.push(`/indicacoes/edit?id=${indicacao.id}`)}
      className="bg-background-secondary p-6 rounded-lg border border-white/5 hover:border-accent-primary/50 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold">{indicacao.nomeCliente}</h3>
        <Badge variant={indicacao.status}>
          {statusLabels[indicacao.status]}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{indicacao.emailCliente}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Indicado por:</span>
          <span className="text-white/70">{indicacao.nomeIndicador || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Recebido por:</span>
          <span className="text-white/70">{indicacao.nomeRecebeu || 'N/A'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Data:</span>
          <span className="text-white/70">
            {new Date(indicacao.dataCriacao).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  )
}
