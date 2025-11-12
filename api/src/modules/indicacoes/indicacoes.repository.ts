import { db } from '@/db'
import { indicacoes, type InsertIndicacao, type Indicacao, membros } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { alias } from "drizzle-orm/pg-core";

type IndicacaoEssencial = Pick<Indicacao, 'id' | 'nomeCliente' | 'emailCliente' | 'status' | 'dataCriacao'> & {
  nomeIndicador: string | null
  nomeRecebeu: string | null
}

const membroIndicador = alias(membros, "membroIndicador");
const membroRecebeu = alias(membros, "membroRecebeu");
export class IndicacoesRepository {
  
  async findAll(): Promise<IndicacaoEssencial[]> {
    const result = await db
      .select({
        id: indicacoes.id,
        nomeCliente: indicacoes.nomeCliente,
        emailCliente: indicacoes.emailCliente,
        status: indicacoes.status,
        dataCriacao: indicacoes.dataCriacao,
        nomeIndicador: membroIndicador.nome,
        nomeRecebeu: membroRecebeu.nome,
      })
      .from(indicacoes)
      .leftJoin(membroIndicador, eq(indicacoes.idMembroIndicador, membroIndicador.id))
      .leftJoin(membroRecebeu, eq(indicacoes.idMembroRecebeu, membroRecebeu.id))
      .orderBy(desc(indicacoes.dataCriacao))

    return result
  }

  async findById(id: string): Promise<Indicacao | undefined> {
    return await db.query.indicacoes.findFirst({
      where: eq(indicacoes.id, id),
    })
  }

  async findByMembroIndicador(membroId: string): Promise<Indicacao[]> {
    return await db.query.indicacoes.findMany({
      where: eq(indicacoes.idMembroIndicador, membroId),
    })
  }

  async findByMembroRecebeu(membroId: string): Promise<Indicacao[]> {
    return await db.query.indicacoes.findMany({
      where: eq(indicacoes.idMembroRecebeu, membroId),
    })
  }

  async findByStatus(status: 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido'): Promise<Indicacao[]> {
    return await db.query.indicacoes.findMany({
      where: eq(indicacoes.status, status),
    })
  }

  async create(data: InsertIndicacao): Promise<Indicacao> {
    const [indicacao] = await db.insert(indicacoes).values(data).returning()
    return indicacao
  }

  async update(id: string, data: Partial<InsertIndicacao>): Promise<Indicacao | undefined> {
    const [indicacao] = await db
      .update(indicacoes)
      .set(data)
      .where(eq(indicacoes.id, id))
      .returning()
    return indicacao
  }

  async delete(id: string): Promise<void> {
    await db.delete(indicacoes).where(eq(indicacoes.id, id))
  }

  async findWithRelations(id: string) {
    return await db.query.indicacoes.findFirst({
      where: eq(indicacoes.id, id),
      with: {
        membroIndicador: true,
        membroRecebeu: true,
        obrigados: true,
      },
    })
  }
}
