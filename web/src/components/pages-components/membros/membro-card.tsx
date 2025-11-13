import type { MembroEssencial } from '@/features'

interface MembroCardProps {
  membro: MembroEssencial
}

export function MembroCard({ membro }: MembroCardProps) {
  return (
    <div className="bg-background-secondary p-6 rounded-lg border border-white/5 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold">{membro.nome}</h3>
        <span
          className={`text-xs px-2 py-1 rounded ${
            membro.statusMembro === 'ativo'
              ? 'bg-green-500/20 text-green-500'
              : membro.statusMembro === 'inativo'
              ? 'bg-red-500/20 text-red-500'
              : 'bg-yellow-500/20 text-yellow-500'
          }`}
        >
          {membro.statusMembro}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{membro.email}</p>
      <p className="text-sm text-muted-foreground mb-3">{membro.celular}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded ${
            membro.tipo === 'admin'
              ? 'bg-accent-primary/20 text-accent-primary'
              : 'bg-white/10 text-white/70'
          }`}
        >
          {membro.tipo}
        </span>
      </div>
    </div>
  )
}