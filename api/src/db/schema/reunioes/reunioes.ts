import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { tipoReuniaoEnum } from "../enum";
import { membros } from "../membros/membros";

export const reunioes = pgTable('reunioes', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  titulo: text().notNull(),
  descricao: text(),
  dataHora: timestamp('data_hora').notNull(),
  criadaPor: text('criada_por').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  tipo: tipoReuniaoEnum().notNull().default('geral'),
})
