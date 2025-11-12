import { text, pgTable } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { reunioes } from "../reunioes/reunioes";
import { membros } from "../membros/membros";

export const reunioesMembros = pgTable('reunioes_membros', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  reuniaoId: text('reuniao_id').notNull().references(() => reunioes.id, { onDelete: 'cascade' }),
  membroId: text('membro_id').notNull().references(() => membros.id, { onDelete: 'cascade' }),
})
