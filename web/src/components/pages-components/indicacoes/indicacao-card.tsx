import type { IndicacaoEssencial } from '@/features/indicacoes/services/indicacoes-service'
import { useRouter } from 'next/navigation'

interface IndicacaoCardProps {
  indicacao: IndicacaoEssencial
}

export function IndicacaoCard({ indicacao }: IndicacaoCardProps) {
  const router = useRouter()

  const statusColors = {
    pendente: 'bg-yellow-500/20 text-yellow-500',
    em_prospeccao: 'bg-blue-500/20 text-blue-500',
    fechado: 'bg-green-500/20 text-green-500',
    perdido: 'bg-red-500/20 text-red-500',
  }

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
        <span className={`text-xs px-2 py-1 rounded ${statusColors[indicacao.status]}`}>
          {statusLabels[indicacao.status]}
        </span>
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
