import { db } from '@/db'
import { obrigados, type InsertObrigado, type Obrigado } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

type ObrigadoEssencial = Pick<Obrigado, 'id' | 'idMembroAgradecido' | 'idMembroRecebeu' | 'mensagem' | 'dataCriacao'>

export class ObrigadosRepository {
  async findAll(): Promise<ObrigadoEssencial[]> {
    const result = await db
      .select({
        id: obrigados.id,
        idMembroAgradecido: obrigados.idMembroAgradecido,
        idMembroRecebeu: obrigados.idMembroRecebeu,
        mensagem: obrigados.mensagem,
        dataCriacao: obrigados.dataCriacao,
      })
      .from(obrigados)
      .orderBy(desc(obrigados.dataCriacao))

    return result
  }

  async findById(id: string): Promise<Obrigado | undefined> {
    return await db.query.obrigados.findFirst({
      where: eq(obrigados.id, id),
    })
  }

  async findByIndicacao(indicacaoId: string): Promise<Obrigado[]> {
    return await db.query.obrigados.findMany({
      where: eq(obrigados.idIndicacao, indicacaoId),
    })
  }

  async findByMembroAgradecido(membroId: string): Promise<Obrigado[]> {
    return await db.query.obrigados.findMany({
      where: eq(obrigados.idMembroAgradecido, membroId),
    })
  }

  async findByMembroRecebeu(membroId: string): Promise<Obrigado[]> {
    return await db.query.obrigados.findMany({
      where: eq(obrigados.idMembroRecebeu, membroId),
    })
  }

  async create(data: InsertObrigado): Promise<Obrigado> {
    const [obrigado] = await db.insert(obrigados).values(data).returning()
    return obrigado
  }

  async update(id: string, data: Partial<InsertObrigado>): Promise<Obrigado | undefined> {
    const [obrigado] = await db
      .update(obrigados)
      .set(data)
      .where(eq(obrigados.id, id))
      .returning()
    return obrigado
  }

  async delete(id: string): Promise<void> {
    await db.delete(obrigados).where(eq(obrigados.id, id))
  }

  async findWithRelations(id: string) {
    return await db.query.obrigados.findFirst({
      where: eq(obrigados.id, id),
      with: {
        indicacao: true,
        membroAgradecido: true,
        membroRecebeu: true,
      },
    })
  }
}
