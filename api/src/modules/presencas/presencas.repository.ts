import { db } from '@/db'
import { presencas, type InsertPresenca, type Presenca } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

type PresencaEssencial = Pick<Presenca, 'id' | 'reuniaoId' | 'membroId' | 'fezCheckin' | 'horaCheckin'>

export class PresencasRepository {
  async findAll(): Promise<PresencaEssencial[]> {
    const result = await db
      .select({
        id: presencas.id,
        reuniaoId: presencas.reuniaoId,
        membroId: presencas.membroId,
        fezCheckin: presencas.fezCheckin,
        horaCheckin: presencas.horaCheckin,
      })
      .from(presencas)
      .orderBy(desc(presencas.horaCheckin))

    return result
  }

  async findById(id: string): Promise<Presenca | undefined> {
    return await db.query.presencas.findFirst({
      where: eq(presencas.id, id),
    })
  }

  async findByReuniao(reuniaoId: string): Promise<Presenca[]> {
    return await db.query.presencas.findMany({
      where: eq(presencas.reuniaoId, reuniaoId),
    })
  }

  async findByMembro(membroId: string): Promise<Presenca[]> {
    return await db.query.presencas.findMany({
      where: eq(presencas.membroId, membroId),
    })
  }

  async findByReuniaoAndMembro(reuniaoId: string, membroId: string): Promise<Presenca | undefined> {
    return await db.query.presencas.findFirst({
      where: and(
        eq(presencas.reuniaoId, reuniaoId),
        eq(presencas.membroId, membroId)
      ),
    })
  }

  async findPresentes(reuniaoId: string): Promise<Presenca[]> {
    return await db.query.presencas.findMany({
      where: and(
        eq(presencas.reuniaoId, reuniaoId),
        eq(presencas.fezCheckin, true)
      ),
    })
  }

  async create(data: InsertPresenca): Promise<Presenca> {
    const [presenca] = await db.insert(presencas).values(data).returning()
    return presenca
  }

  async update(id: string, data: Partial<InsertPresenca>): Promise<Presenca | undefined> {
    const [presenca] = await db
      .update(presencas)
      .set(data)
      .where(eq(presencas.id, id))
      .returning()
    return presenca
  }

  async findWithRelations(id: string) {
    return await db.query.presencas.findFirst({
      where: eq(presencas.id, id),
      with: {
        reuniao: true,
        membro: true,
      },
    })
  }
}
