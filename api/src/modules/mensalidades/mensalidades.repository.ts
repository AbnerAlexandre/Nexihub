import { db } from '@/db'
import { membros, mensalidades, type InsertMensalidade, type Mensalidade } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

type MensalidadeEssencial = Pick<Mensalidade, 'id' | 'valor' | 'mesReferencia' | 'pago' | 'dataPagamento'> & {
  membroNome: string | null
}

export class MensalidadesRepository {
  async findAll(): Promise<MensalidadeEssencial[]> {
    const result = await db
      .select({
        id: mensalidades.id,
        valor: mensalidades.valor,
        mesReferencia: mensalidades.mesReferencia,
        pago: mensalidades.pago,
        dataPagamento: mensalidades.dataPagamento,
        membroNome: membros.nome,
      })
      .from(mensalidades)
      .leftJoin(membros, eq(mensalidades.membroId, membros.id))
      .orderBy(desc(mensalidades.mesReferencia))

    return result
  }

  async findById(id: string): Promise<Mensalidade | undefined> {
    return await db.query.mensalidades.findFirst({
      where: eq(mensalidades.id, id),
    })
  }

  async findByMembro(membroId: string): Promise<Mensalidade[]> {
    return await db.query.mensalidades.findMany({
      where: eq(mensalidades.membroId, membroId),
    })
  }

  async findByMembroAndMonth(membroId: string, mesReferencia: string): Promise<Mensalidade | undefined> {
    return await db.query.mensalidades.findFirst({
      where: and(
        eq(mensalidades.membroId, membroId),
        eq(mensalidades.mesReferencia, mesReferencia)
      ),
    })
  }

  async findPendentes(): Promise<Mensalidade[]> {
    return await db.query.mensalidades.findMany({
      where: eq(mensalidades.pago, false),
    })
  }

  async findPagas(): Promise<Mensalidade[]> {
    return await db.query.mensalidades.findMany({
      where: eq(mensalidades.pago, true),
    })
  }

  async create(data: InsertMensalidade): Promise<Mensalidade> {
    const [mensalidade] = await db.insert(mensalidades).values(data).returning()
    return mensalidade
  }

  async update(id: string, data: Partial<InsertMensalidade>): Promise<Mensalidade | undefined> {
    const [mensalidade] = await db
      .update(mensalidades)
      .set(data)
      .where(eq(mensalidades.id, id))
      .returning()
    return mensalidade
  }

  async delete(id: string): Promise<void> {
    await db.delete(mensalidades).where(eq(mensalidades.id, id))
  }

  async findWithMembro(id: string) {
    return await db.query.mensalidades.findFirst({
      where: eq(mensalidades.id, id),
      with: {
        membro: true,
      },
    })
  }
}
