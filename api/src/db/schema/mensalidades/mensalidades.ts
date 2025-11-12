import { text, pgTable, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'
import { membros } from "../membros/membros";

export const mensalidades = pgTable('mensalidades', {
  id: text().primaryKey().$defaultFn(() => uuidv7()),
  membroId: text('membro_id').notNull().references(() => membros.id, { onDelete: 'cascade' }),
  valor: integer().notNull(),
  mesReferencia: text('mes_referencia').notNull(), // formato: 'YYYY-MM'
  dataPagamento: timestamp('data_pagamento'),
  dataCriacao: timestamp('data_criacao').notNull().defaultNow(),
  pago: boolean().notNull().default(false),
})
