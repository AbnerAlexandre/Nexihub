import { pgEnum } from "drizzle-orm/pg-core"

export const tipoMembroEnum = pgEnum('tipo_membro', ['admin', 'membro'])
export const statusMembroEnum = pgEnum('status_membro', ['ativo', 'pendente', 'recusado'])
export const statusIntencaoEnum = pgEnum('status_intencao', ['pendente', 'aprovado', 'recusado'])
export const statusIndicacaoEnum = pgEnum('status_indicacao', ['pendente', 'em_prospeccao', 'fechado', 'perdido'])
export const tipoReuniaoEnum = pgEnum('tipo_reuniao', ['geral', 'selecionada'])

