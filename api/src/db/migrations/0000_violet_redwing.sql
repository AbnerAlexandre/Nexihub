CREATE TYPE "public"."status_indicacao" AS ENUM('pendente', 'em_prospeccao', 'fechado', 'perdido');--> statement-breakpoint
CREATE TYPE "public"."status_intencao" AS ENUM('pendente', 'aprovado', 'recusado');--> statement-breakpoint
CREATE TYPE "public"."status_membro" AS ENUM('ativo', 'pendente', 'recusado');--> statement-breakpoint
CREATE TYPE "public"."tipo_membro" AS ENUM('admin', 'membro');--> statement-breakpoint
CREATE TYPE "public"."tipo_reuniao" AS ENUM('geral', 'selecionada');--> statement-breakpoint
CREATE TABLE "membros" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"tipo" "tipo_membro" DEFAULT 'membro' NOT NULL,
	"celular" text NOT NULL,
	"senha_hash" text NOT NULL,
	"ramo" text NOT NULL,
	"descricao" text NOT NULL,
	"status_membro" "status_membro" DEFAULT 'pendente' NOT NULL,
	"data_entrada" timestamp DEFAULT now() NOT NULL,
	"agradecimentos_publicos" integer DEFAULT 0 NOT NULL,
	"experiencias" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "membros_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "intencoes_participacao" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"celular" text NOT NULL,
	"status" "status_intencao" DEFAULT 'pendente' NOT NULL,
	"data_solicitacao" timestamp DEFAULT now() NOT NULL,
	"token_convite" text NOT NULL,
	"token_expira_em" timestamp NOT NULL,
	CONSTRAINT "intencoes_participacao_token_convite_unique" UNIQUE("token_convite")
);
--> statement-breakpoint
CREATE TABLE "indicacoes" (
	"id" text PRIMARY KEY NOT NULL,
	"id_membro_indicador" text NOT NULL,
	"id_membro_recebeu" text NOT NULL,
	"nome_cliente" text NOT NULL,
	"email_cliente" text NOT NULL,
	"telefone_cliente" text NOT NULL,
	"motivo" text,
	"status" "status_indicacao" DEFAULT 'pendente' NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL,
	"data_fechamento" timestamp
);
--> statement-breakpoint
CREATE TABLE "obrigados" (
	"id" text PRIMARY KEY NOT NULL,
	"id_indicacao" text NOT NULL,
	"id_membro_agradecido" text NOT NULL,
	"id_membro_recebeu" text NOT NULL,
	"mensagem" text NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reunioes" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"descricao" text,
	"data_hora" timestamp NOT NULL,
	"criada_por" text NOT NULL,
	"tipo" "tipo_reuniao" DEFAULT 'geral' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reunioes_membros" (
	"id" text PRIMARY KEY NOT NULL,
	"reuniao_id" text NOT NULL,
	"membro_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presencas" (
	"id" text PRIMARY KEY NOT NULL,
	"reuniao_id" text NOT NULL,
	"membro_id" text NOT NULL,
	"fez_checkin" boolean DEFAULT false NOT NULL,
	"hora_checkin" timestamp
);
--> statement-breakpoint
CREATE TABLE "mensalidades" (
	"id" text PRIMARY KEY NOT NULL,
	"membro_id" text NOT NULL,
	"valor" integer NOT NULL,
	"mes_referencia" text NOT NULL,
	"data_pagamento" timestamp,
	"data_criacao" timestamp DEFAULT now() NOT NULL,
	"pago" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "indicacoes" ADD CONSTRAINT "indicacoes_id_membro_indicador_membros_id_fk" FOREIGN KEY ("id_membro_indicador") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "indicacoes" ADD CONSTRAINT "indicacoes_id_membro_recebeu_membros_id_fk" FOREIGN KEY ("id_membro_recebeu") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "obrigados" ADD CONSTRAINT "obrigados_id_indicacao_indicacoes_id_fk" FOREIGN KEY ("id_indicacao") REFERENCES "public"."indicacoes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "obrigados" ADD CONSTRAINT "obrigados_id_membro_agradecido_membros_id_fk" FOREIGN KEY ("id_membro_agradecido") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "obrigados" ADD CONSTRAINT "obrigados_id_membro_recebeu_membros_id_fk" FOREIGN KEY ("id_membro_recebeu") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reunioes" ADD CONSTRAINT "reunioes_criada_por_membros_id_fk" FOREIGN KEY ("criada_por") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reunioes_membros" ADD CONSTRAINT "reunioes_membros_reuniao_id_reunioes_id_fk" FOREIGN KEY ("reuniao_id") REFERENCES "public"."reunioes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reunioes_membros" ADD CONSTRAINT "reunioes_membros_membro_id_membros_id_fk" FOREIGN KEY ("membro_id") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presencas" ADD CONSTRAINT "presencas_reuniao_id_reunioes_id_fk" FOREIGN KEY ("reuniao_id") REFERENCES "public"."reunioes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presencas" ADD CONSTRAINT "presencas_membro_id_membros_id_fk" FOREIGN KEY ("membro_id") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mensalidades" ADD CONSTRAINT "mensalidades_membro_id_membros_id_fk" FOREIGN KEY ("membro_id") REFERENCES "public"."membros"("id") ON DELETE cascade ON UPDATE no action;