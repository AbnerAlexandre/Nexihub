import { text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { statusIntencaoEnum } from "../enum";

export const intencoesParticipacao = pgTable('intencoes_participacao', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  nome: text().notNull(),
  email: text().notNull(),
  celular: text().notNull(),
  status: statusIntencaoEnum().notNull().default('pendente'),
  dataSolicitacao: timestamp('data_solicitacao').notNull().defaultNow(),
  tokenConvite: text('token_convite').unique(),
  tokenExpiraEm: timestamp('token_expira_em'),
})
