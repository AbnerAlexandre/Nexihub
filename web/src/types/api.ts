// Tipos baseados na sua API Backend

export type TipoMembro = 'admin' | 'membro'
export type StatusMembro = 'ativo' | 'pendente' | 'recusado'
export type StatusIndicacao = 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido'
export type StatusIntencao = 'pendente' | 'aprovado' | 'recusado'
export type TipoReuniao = 'geral' | 'selecionada'

// ============================================
// MEMBROS
// ============================================

export type Membro = {
  id: string
  nome: string
  email: string
  tipo: TipoMembro
  celular: string
  senhaHash: string
  ramo: string
  descricao: string
  statusMembro: StatusMembro
  dataEntrada: string
  agradecimentosPublicos: number
  experiencias: string[]
}

export type MembroEssencial = Pick<
  Membro,
  'id' | 'nome' | 'email' | 'tipo' | 'celular' | 'statusMembro'
>

// ============================================
// INDICAÇÕES
// ============================================

export type Indicacao = {
  id: string
  idMembroIndicador: string
  idMembroRecebeu: string
  nomeCliente: string
  emailCliente: string
  telefoneCliente: string
  motivo: string | null
  status: StatusIndicacao
  dataCriacao: string
  dataFechamento: string | null
}

export type IndicacaoEssencial = Pick<
  Indicacao,
  'id' | 'nomeCliente' | 'emailCliente' | 'status' | 'dataCriacao'
> & {
  nomeIndicador: string | null
  nomeRecebeu: string | null
}

// ============================================
// INTENÇÕES DE PARTICIPAÇÃO
// ============================================

export type IntencaoParticipacao = {
  id: string
  nome: string
  email: string
  celular: string
  status: StatusIntencao
  dataSolicitacao: string
  tokenConvite: string
  tokenExpiraEm: string
}

export type IntencaoEssencial = Pick<
  IntencaoParticipacao,
  'id' | 'nome' | 'email' | 'status' | 'dataSolicitacao'
>

// ============================================
// MENSALIDADES
// ============================================

export type Mensalidade = {
  id: string
  membroId: string
  valor: number
  mesReferencia: string
  dataPagamento: string | null
  dataCriacao: string
  pago: boolean
}

export type MensalidadeEssencial = Pick<
  Mensalidade,
  'id' | 'membroId' | 'valor' | 'mesReferencia' | 'pago' | 'dataPagamento'
>

// ============================================
// OBRIGADOS
// ============================================

export type Obrigado = {
  id: string
  idIndicacao: string
  idMembroAgradecido: string
  idMembroRecebeu: string
  mensagem: string
  dataCriacao: string
}

export type ObrigadoEssencial = Pick<
  Obrigado,
  'id' | 'idMembroAgradecido' | 'idMembroRecebeu' | 'mensagem' | 'dataCriacao'
>

// ============================================
// REUNIÕES
// ============================================

export type Reuniao = {
  id: string
  titulo: string
  descricao: string | null
  dataHora: string
  criadaPor: string
  tipo: TipoReuniao
}

export type ReuniaoEssencial = Pick<
  Reuniao,
  'id' | 'titulo' | 'dataHora' | 'tipo' | 'criadaPor'
>

// ============================================
// PRESENÇAS
// ============================================

export type Presenca = {
  id: string
  reuniaoId: string
  membroId: string
  fezCheckin: boolean
  horaCheckin: string | null
}

export type PresencaEssencial = Pick<
  Presenca,
  'id' | 'reuniaoId' | 'membroId' | 'fezCheckin' | 'horaCheckin'
>

// ============================================
// TIPOS DE INPUT (para POST/PATCH)
// ============================================

export type CreateMembroInput = Omit<
  Membro,
  'id' | 'dataEntrada' | 'agradecimentosPublicos'
>

export type UpdateMembroInput = Partial<CreateMembroInput>

export type CreateIndicacaoInput = Omit<Indicacao, 'id' | 'dataCriacao'>

export type UpdateIndicacaoInput = Partial<CreateIndicacaoInput>

export type CreateIntencaoInput = Omit<
  IntencaoParticipacao,
  'id' | 'dataSolicitacao'
>

export type UpdateIntencaoInput = Partial<CreateIntencaoInput>

export type CreateMensalidadeInput = Omit<Mensalidade, 'id' | 'dataCriacao'>

export type UpdateMensalidadeInput = Partial<CreateMensalidadeInput>

export type CreateObrigadoInput = Omit<Obrigado, 'id' | 'dataCriacao'>

export type UpdateObrigadoInput = Partial<CreateObrigadoInput>

export type CreateReuniaoInput = Omit<Reuniao, 'id'>

export type UpdateReuniaoInput = Partial<CreateReuniaoInput>

export type CreatePresencaInput = Omit<Presenca, 'id'>

export type UpdatePresencaInput = Partial<CreatePresencaInput>

// ============================================
// TIPOS COM RELAÇÕES (para rotas /:id/relations)
// ============================================

export type MembroComRelacoes = Membro & {
  indicacoesFeitas: Indicacao[]
  indicacoesRecebidas: Indicacao[]
  obrigadosDados: Obrigado[]
  obrigadosRecebidos: Obrigado[]
  reunioesCriadas: Reuniao[]
  reunioesConvidado: any[] // Ajustar tipo conforme necessário
  presencas: Presenca[]
  mensalidades: Mensalidade[]
}

export type IndicacaoComRelacoes = Indicacao & {
  membroIndicador: Membro
  membroRecebeu: Membro
  obrigados: Obrigado[]
}

export type ReuniaoComRelacoes = Reuniao & {
  criador: Membro
  membrosConvidados: any[] // Ajustar tipo conforme necessário
  presencas: Array<
    Presenca & {
      membro: Membro
    }
  >
}
