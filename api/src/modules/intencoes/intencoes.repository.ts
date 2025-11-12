import { db } from '@/db'
import { intencoesParticipacao, type InsertIntencaoParticipacao, type IntencaoParticipacao } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

type IntencaoEssencial = Pick<IntencaoParticipacao, 'id' | 'nome' | 'email' | 'status' | 'dataSolicitacao'>

export class IntencoesRepository {
  async findAll(): Promise<IntencaoEssencial[]> {
    const result = await db
      .select({
        id: intencoesParticipacao.id,
        nome: intencoesParticipacao.nome,
        email: intencoesParticipacao.email,
        status: intencoesParticipacao.status,
        dataSolicitacao: intencoesParticipacao.dataSolicitacao,
      })
      .from(intencoesParticipacao)
      .orderBy(desc(intencoesParticipacao.dataSolicitacao))

    return result
  }

  async findById(id: string): Promise<IntencaoParticipacao | undefined> {
    return await db.query.intencoesParticipacao.findFirst({
      where: eq(intencoesParticipacao.id, id),
    })
  }

  async findByEmail(email: string): Promise<IntencaoParticipacao | undefined> {
    return await db.query.intencoesParticipacao.findFirst({
      where: eq(intencoesParticipacao.email, email),
    })
  }

  async findByToken(token: string): Promise<IntencaoParticipacao | undefined> {
    return await db.query.intencoesParticipacao.findFirst({
      where: eq(intencoesParticipacao.tokenConvite, token),
    })
  }

  async findByStatus(status: 'pendente' | 'aprovado' | 'recusado'): Promise<IntencaoParticipacao[]> {
    return await db.query.intencoesParticipacao.findMany({
      where: eq(intencoesParticipacao.status, status),
    })
  }

  async create(data: InsertIntencaoParticipacao): Promise<IntencaoParticipacao> {
    const [intencao] = await db.insert(intencoesParticipacao).values(data).returning()
    return intencao
  }

  async update(id: string, data: Partial<InsertIntencaoParticipacao>): Promise<IntencaoParticipacao | undefined> {
    const [intencao] = await db
      .update(intencoesParticipacao)
      .set(data)
      .where(eq(intencoesParticipacao.id, id))
      .returning()
    return intencao
  }

}
