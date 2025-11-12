import { text, pgTable, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { statusMembroEnum, tipoMembroEnum } from "../enum";

export const membros = pgTable('membros', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  nome: text().notNull(),
  email: text().notNull().unique(),
  tipo: tipoMembroEnum().notNull().default('membro'),
  celular: text().notNull(),
  senhaHash: text('senha_hash').notNull(),
  ramo: text().notNull(),
  descricao: text().notNull(),
  statusMembro: statusMembroEnum('status_membro').notNull().default('pendente'),
  dataEntrada: timestamp('data_entrada').notNull().defaultNow(),
  agradecimentosPublicos: integer('agradecimentos_publicos').notNull().default(0),
  experiencias: jsonb().$type<string[]>().notNull().default([]),
})
