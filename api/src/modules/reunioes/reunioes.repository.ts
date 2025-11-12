import { db } from '@/db'
import { reunioes, type InsertReuniao, type Reuniao } from '@/db/schema'
import { eq, gte, desc } from 'drizzle-orm'

type ReuniaoEssencial = Pick<Reuniao, 'id' | 'titulo' | 'dataHora' | 'tipo' | 'criadaPor'>

export class ReunioesRepository {
  async findAll(): Promise<ReuniaoEssencial[]> {
    const result = await db
      .select({
        id: reunioes.id,
        titulo: reunioes.titulo,
        dataHora: reunioes.dataHora,
        tipo: reunioes.tipo,
        criadaPor: reunioes.criadaPor,
      })
      .from(reunioes)
      .orderBy(desc(reunioes.dataHora))

    return result
  }

  async findById(id: string): Promise<Reuniao | undefined> {
    return await db.query.reunioes.findFirst({
      where: eq(reunioes.id, id),
    })
  }

  async findByCriador(criadorId: string): Promise<Reuniao[]> {
    return await db.query.reunioes.findMany({
      where: eq(reunioes.criadaPor, criadorId),
    })
  }

  async findByTipo(tipo: 'geral' | 'selecionada'): Promise<Reuniao[]> {
    return await db.query.reunioes.findMany({
      where: eq(reunioes.tipo, tipo),
    })
  }

  async findProximas(): Promise<Reuniao[]> {
    return await db.query.reunioes.findMany({
      where: gte(reunioes.dataHora, new Date()),
    })
  }

  async create(data: InsertReuniao): Promise<Reuniao> {
    const [reuniao] = await db.insert(reunioes).values(data).returning()
    return reuniao
  }

  async update(id: string, data: Partial<InsertReuniao>): Promise<Reuniao | undefined> {
    const [reuniao] = await db
      .update(reunioes)
      .set(data)
      .where(eq(reunioes.id, id))
      .returning()
    return reuniao
  }

  async findWithRelations(id: string) {
    return await db.query.reunioes.findFirst({
      where: eq(reunioes.id, id),
      with: {
        criador: true,
        membrosConvidados: {
          with: {
            membro: true,
          },
        },
        presencas: {
          with: {
            membro: true,
          },
        },
      },
    })
  }
}
