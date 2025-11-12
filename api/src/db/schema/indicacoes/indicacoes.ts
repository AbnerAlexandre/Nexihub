import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { statusIndicacaoEnum } from "../enum";
import { membros } from "../membros/membros";

export const indicacoes = pgTable('indicacoes', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  idMembroIndicador: text('id_membro_indicador').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  idMembroRecebeu: text('id_membro_recebeu').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  nomeCliente: text('nome_cliente').notNull(),
  emailCliente: text('email_cliente').notNull(),
  telefoneCliente: text('telefone_cliente').notNull(),
  motivo: text(),
  status: statusIndicacaoEnum().notNull().default('pendente'),
  dataCriacao: timestamp('data_criacao').notNull().defaultNow(),
  dataFechamento: timestamp('data_fechamento'),
})
