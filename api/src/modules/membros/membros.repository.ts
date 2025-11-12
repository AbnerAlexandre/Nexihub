import { db } from '@/db'
import { membros, type InsertMembro, type Membro } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

type MembroEssencial = Pick<Membro, 'id' | 'nome' | 'email' | 'tipo' | 'celular' | 'statusMembro'>

export class MembrosRepository {
  async findAll(): Promise<MembroEssencial[]> {
    const result = await db
      .select({
        id: membros.id,
        nome: membros.nome,
        email: membros.email,
        tipo: membros.tipo,
        celular: membros.celular,
        statusMembro: membros.statusMembro,
      })
      .from(membros)
      .orderBy(desc(membros.id))

    return result
  }

  async findById(id: string): Promise<Membro | undefined> {
    return await db.query.membros.findFirst({
      where: eq(membros.id, id),
    })
  }

  async create(data: InsertMembro): Promise<Membro> {
    const [membro] = await db.insert(membros).values(data).returning()
    return membro
  }

  async update(id: string, data: Partial<InsertMembro>): Promise<Membro | undefined> {
    const [membro] = await db
      .update(membros)
      .set(data)
      .where(eq(membros.id, id))
      .returning()
    return membro
  }

  async findWithRelations(id: string) {
    return await db.query.membros.findFirst({
      where: eq(membros.id, id),
      with: {
        indicacoesFeitas: true,
        indicacoesRecebidas: true,
        obrigadosDados: true,
        obrigadosRecebidos: true,
        reunioesCriadas: true,
        reunioesConvidado: true,
        presencas: true,
        mensalidades: true,
      },
    })
  }
}
