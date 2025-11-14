# NexiHub

Sistema de gestão de networking para grupos de negócios. Plataforma completa para gerenciar membros, indicações, reuniões, mensalidades e muito mais.

## 📋 Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
  - [Backend (API)](#backend-api)
  - [Frontend (Web)](#frontend-web)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Credenciais Padrão](#credenciais-padrão)

## 🔧 Pré-requisitos

- **Node.js** >= 18
- **pnpm** >= 10.20.0 (gerenciador de pacotes)
- **PostgreSQL** >= 14 (banco de dados)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd nexihub
```

2. Instale as dependências usando pnpm (workspace monorepo):
```bash
pnpm install
```

Isso instalará as dependências de todos os workspaces (api e web).

## ⚙️ Configuração

### Backend (API)

1. Navegue até a pasta da API:
```bash
cd api
```

2. Crie um arquivo `.env` na raiz da pasta `api` com as seguintes variáveis:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nexihub
```

3. Execute as migrations para criar as tabelas no banco de dados:
```bash
pnpm db:migrate
```

4. (Opcional) Execute o seed para popular o banco com dados de exemplo:
```bash
pnpm db:seed
```

O seed criará:
- 20 membros (incluindo 1 administrador)
- 5 intenções de participação
- 15+ indicações
- Mensalidades para todos os membros
- 15+ agradecimentos (obrigados)
- 17 reuniões (15 passadas + 2 futuras)
- Convites e presenças para as reuniões

### Frontend (Web)

Não requer configuração adicional. O frontend se conecta automaticamente à API rodando em `http://localhost:3333`.

## 🚀 Executando o Projeto

### Backend (API)

Navegue até a pasta `api` e execute:

**Modo desenvolvimento** (com hot reload):
```bash
cd api
pnpm dev
```

A API estará disponível em: `http://localhost:3333`

**Modo produção**:
```bash
cd api
pnpm start
```

### Frontend (Web)

Navegue até a pasta `web` e execute:

**Modo desenvolvimento**:
```bash
cd web
pnpm dev
```

O frontend estará disponível em: `http://localhost:3000`

**Build para produção**:
```bash
cd web
pnpm build
pnpm start
```

## 🗄️ Banco de Dados

### Drizzle Studio

Visualize e edite os dados do banco diretamente no navegador usando o Drizzle Studio:

```bash
cd api
pnpm db:studio
```

Acesse: `https://local.drizzle.studio`

### Migrations

**Gerar nova migration** (após alterar o schema):
```bash
cd api
pnpm db:generate
```

**Executar migrations pendentes**:
```bash
cd api
pnpm db:migrate
```

### Seed

Popula o banco de dados com dados fictícios para desenvolvimento e testes:

```bash
cd api
pnpm db:seed
```

**Importante sobre o usuário admin:**
- O seed cria um usuário administrador com email `admin@admin.com`
- A senha é **`admin`** (será armazenada como `hashed_admin` no banco)
- Use essas credenciais para fazer login no sistema após executar o seed

## 🧪 Testes

### Backend (API)

**Executar todos os testes**:
```bash
cd api
pnpm test
```

**Modo watch** (re-executa ao salvar arquivos):
```bash
cd api
pnpm test:watch
```

**Gerar relatório de cobertura**:
```bash
cd api
pnpm test:coverage
```

**Testes incluem:**
- 18 testes de integração cobrindo rotas de membros e indicações
- Validações de autenticação e autorização
- Testes de criação, atualização e listagem de recursos

### Frontend (Web)

**Executar todos os testes**:
```bash
cd web
pnpm test
```

**Modo watch** (re-executa ao salvar arquivos):
```bash
cd web
pnpm test:watch
```

**Gerar relatório de cobertura**:
```bash
cd web
pnpm test:coverage
```

**Testes incluem:**
- 30 testes cobrindo componentes, validações e hooks
- Testes do componente Badge (11 testes)
- Validações Zod de formulários (14 testes)
- Hooks React Query (5 testes)

## 📚 Documentação da API

A API utiliza **Swagger/OpenAPI** com interface do **Scalar** para documentação interativa.

Com a API rodando (`pnpm dev` na pasta `api`), acesse:

**Documentação Swagger UI (Scalar)**:
```
http://localhost:3333/docs
```

A documentação inclui:
- Todos os endpoints disponíveis
- Schemas de requisição e resposta
- Exemplos de uso
- Possibilidade de testar as rotas diretamente no navegador

### Principais Rotas

- **Membros**: `/membros` - CRUD de membros e autenticação
- **Indicações**: `/indicacoes` - Gerenciamento de indicações entre membros
- **Intenções**: `/intencoes` - Solicitações de participação no grupo
- **Mensalidades**: `/mensalidades` - Controle de pagamentos mensais
- **Reuniões**: `/reunioes` - Criação e gestão de reuniões
- **Presenças**: `/presencas` - Check-in em reuniões
- **Obrigados**: `/obrigados` - Agradecimentos públicos por indicações

## 📝 Scripts Disponíveis

### Raiz do Projeto

```bash
pnpm install        # Instala dependências de todos os workspaces
```

### API (Backend)

```bash
pnpm dev            # Inicia servidor em modo desenvolvimento
pnpm start          # Inicia servidor em modo produção
pnpm test           # Executa testes
pnpm test:watch     # Executa testes em modo watch
pnpm test:coverage  # Gera relatório de cobertura de testes
pnpm db:generate    # Gera migrations do Drizzle ORM
pnpm db:migrate     # Executa migrations pendentes
pnpm db:studio      # Abre Drizzle Studio (interface visual do banco)
pnpm db:seed        # Popula banco com dados de exemplo
```

### Web (Frontend)

```bash
pnpm dev            # Inicia aplicação em modo desenvolvimento
pnpm build          # Cria build otimizado para produção
pnpm start          # Inicia aplicação em modo produção (requer build)
pnpm lint           # Executa linter ESLint
pnpm test           # Executa testes
pnpm test:watch     # Executa testes em modo watch
pnpm test:coverage  # Gera relatório de cobertura de testes
```

## 🔑 Credenciais Padrão

Após executar o seed (`pnpm db:seed` na pasta `api`), você pode fazer login com:

**Usuário Administrador:**
- **Email**: `admin@admin.com`
- **Senha**: `hashed_admin`



## 🏗️ Estrutura do Projeto

```
nexihub/
├── api/                    # Backend (Fastify + Drizzle ORM)
│   ├── src/
│   │   ├── __tests__/      # Testes Jest
│   │   ├── db/             # Configuração do banco e schema
│   │   ├── modules/        # Módulos de features (rotas, controllers, services)
│   │   ├── app.ts          # Configuração do Fastify
│   │   ├── server.ts       # Entrada da aplicação
│   │   └── env.ts          # Validação de variáveis de ambiente
│   ├── drizzle.config.ts   # Configuração do Drizzle ORM
│   ├── jest.config.js      # Configuração dos testes
│   └── package.json
│
├── web/                    # Frontend (Next.js + React Query)
│   ├── src/
│   │   ├── __tests__/      # Testes React Testing Library
│   │   ├── app/            # Pages e rotas do Next.js
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── features/       # Lógica de features (hooks, services)
│   │   ├── lib/            # Utilitários e configurações
│   │   └── types/          # TypeScript types
│   ├── jest.config.ts      # Configuração dos testes
│   └── package.json
│
├── pnpm-workspace.yaml     # Configuração do monorepo
└── package.json            # Package raiz
```

## 🛠️ Tecnologias

### Backend
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **Jest + Supertest** - Testes

### Frontend
- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Jest + React Testing Library** - Testes

## 📄 Licença

ISC
