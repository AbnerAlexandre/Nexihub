# API Nexihub

API REST para gestão de networking com Fastify, TypeScript, Drizzle ORM e PostgreSQL.

## 📋 Pré-requisitos

- Node.js 18+
- pnpm
- PostgreSQL
- Docker (opcional)

## 🚀 Como Executar

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nexihub
PORT=3333
```

### 3. Executar migrations

```bash
pnpm db:migrate
```

### 4. Popular o banco de dados (Seed)

O seed irá criar:
- ✅ 20 membros (incluindo admin)
- ✅ 5 intenções de participação
- ✅ 15+ indicações
- ✅ 4 mensalidades por membro
- ✅ 15+ obrigados
- ✅ 17 reuniões (15 passadas + 2 futuras)
- ✅ Convites e presenças para as reuniões

```bash
pnpm db:seed
```

**Credenciais do Admin após o seed:**
- Email: `admin@admin.com`
- Senha: `admin`

### 5. Iniciar o servidor

```bash
pnpm dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Scalar Docs**: http://localhost:3333/docs
- **Swagger UI**: http://localhost:3333/docs/swagger

## 🗄️ Banco de Dados

### Comandos úteis

```bash
# Gerar migrations após alterações no schema
pnpm db:generate

# Aplicar migrations
pnpm db:migrate

# Abrir Drizzle Studio (interface visual do banco)
pnpm db:studio

# Popular banco com dados de teste
pnpm db:seed
```

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── db/
│   │   ├── schema/           # Schemas do Drizzle ORM
│   │   ├── migrations/       # Migrações SQL
│   │   ├── index.ts          # Instância do DB
│   │   └── seed.ts           # Script de seed
│   ├── modules/
│   │   ├── membros/
│   │   │   ├── membros.repository.ts
│   │   │   ├── membros.service.ts
│   │   │   ├── membros.controller.ts
│   │   │   └── membros.routes.ts
│   │   ├── indicacoes/
│   │   ├── intencoes/
│   │   ├── mensalidades/
│   │   ├── obrigados/
│   │   ├── presencas/
│   │   ├── reunioes/
│   │   └── routes/
│   │       └── index.ts      # Registro centralizado de rotas
│   ├── app.ts                # Configuração do Fastify
│   ├── server.ts             # Inicialização do servidor
│   └── env.ts                # Validação de variáveis de ambiente
├── docker-compose.yml        # PostgreSQL com Docker
├── drizzle.config.ts         # Configuração do Drizzle Kit
└── package.json
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

1. **Routes** - Define rotas e validações (Zod)
2. **Controllers** - Handlers das requisições HTTP
3. **Services** - Lógica de negócio
4. **Repositories** - Acesso ao banco de dados (Drizzle)

## 🔧 Stack Tecnológica

- **Fastify** - Framework web de alta performance
- **TypeScript** - Tipagem estática
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **Zod** - Validação de schemas
- **PostgreSQL** - Banco de dados relacional
- **Faker** - Geração de dados falsos para seed
- **UUIDv7** - Geração de IDs ordenados temporalmente

## 📊 Dados do Seed

O script de seed (`pnpm db:seed`) cria um ambiente completo de testes com:

### Membros (20)
- 1 Administrador
- 19 membros aleatórios em diversos ramos
- Status: maioria ativo, alguns pendentes

### Intenções de Participação (5)
- Diferentes status: pendente, aprovado, recusado
- Tokens de convite únicos

### Indicações (15)
- Entre membros ativos
- Status variados: pendente, em prospecção, fechado, perdido
- Datas aleatórias no último ano

### Mensalidades (80)
- 4 por membro
- 3 pagas + 1 pendente (mais recente)
- Valor: R$ 150,00

### Obrigados (15)
- Relacionados com indicações fechadas
- Mensagens de agradecimento

### Reuniões (17)
- 15 reuniões passadas (semanais)
- 2 reuniões futuras
- Tipos: geral e selecionada
- Convites e presenças automáticos

## 🔐 Autenticação

⚠️ **Nota**: A autenticação completa não foi implementada neste escopo de teste. Use as credenciais do admin para testes.

## 📝 Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor em modo de desenvolvimento
pnpm start        # Inicia servidor em produção
pnpm db:generate  # Gera migrations
pnpm db:migrate   # Aplica migrations
pnpm db:studio    # Abre Drizzle Studio
pnpm db:seed      # Popula banco com dados de teste
```

## 🐳 Docker

Para rodar o PostgreSQL com Docker:

```bash
docker-compose up -d
```

Isso irá criar um container PostgreSQL na porta 5432.

## 📄 Licença

ISC
