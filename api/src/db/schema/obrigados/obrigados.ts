import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { indicacoes } from "../indicacoes/indicacoes";
import { membros } from "../membros/membros";

export const obrigados = pgTable('obrigados', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  idIndicacao: text('id_indicacao').notNull().references(() => indicacoes.id, { onDelete: 'cascade' }),
  idMembroAgradecido: text('id_membro_agradecido').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  idMembroRecebeu: text('id_membro_recebeu').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  mensagem: text().notNull(),
  dataCriacao: timestamp('data_criacao').notNull().defaultNow(),
})
