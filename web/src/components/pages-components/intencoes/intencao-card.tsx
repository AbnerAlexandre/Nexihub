import type { IntencaoEssencial } from '@/features/intencao/services/intencoes-service'
import { useRouter } from 'next/navigation'

interface IntencaoCardProps {
  intencao: IntencaoEssencial
}

export function IntencaoCard({ intencao }: IntencaoCardProps) {
  const router = useRouter()

  const statusColors = {
    pendente: 'bg-yellow-500/20 text-yellow-500',
    aprovado: 'bg-green-500/20 text-green-500',
    recusado: 'bg-red-500/20 text-red-500',
  }

  const statusLabels = {
    pendente: 'Pendente',
    aprovado: 'Aprovado',
    recusado: 'Recusado',
  }

  return (
    <div
      onClick={() => router.push(`/intencoes/edit?id=${intencao.id}`)}
      className="bg-background-secondary p-6 rounded-lg border border-white/5 hover:border-accent-primary/50 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold">{intencao.nome}</h3>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[intencao.status]}`}>
          {statusLabels[intencao.status]}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-1">{intencao.email}</p>
      <p className="text-sm text-muted-foreground mb-3">{intencao.celular}</p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Data da solicitação:</span>
        <span className="text-white/70">
          {new Date(intencao.dataSolicitacao).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  )
}
