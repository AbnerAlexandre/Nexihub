import { db } from '@/db'
import { membros, obrigados, type InsertObrigado, type Obrigado } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'

type ObrigadoEssencial = Pick<Obrigado, 'id' | 'mensagem' | 'dataCriacao'> & {
  nomeMembroAgradecido: string | null
  nomeMembroRecebeu: string | null
}

const membroAgradecido = alias(membros, "membroAgradecido");
const membroRecebeu = alias(membros, "membroRecebeu");

export class ObrigadosRepository {
  async findAll(): Promise<ObrigadoEssencial[]> {
    const result = await db
      .select({
        id: obrigados.id,
        mensagem: obrigados.mensagem,
        dataCriacao: obrigados.dataCriacao,
        nomeMembroAgradecido: membroAgradecido.nome,
        nomeMembroRecebeu: membroRecebeu.nome,
      })
      .from(obrigados)
      .leftJoin(membroAgradecido, eq(obrigados.idMembroAgradecido, membroAgradecido.id))
      .leftJoin(membroRecebeu, eq(obrigados.idMembroRecebeu, membroRecebeu.id))
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
