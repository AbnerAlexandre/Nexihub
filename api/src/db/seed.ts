import { db } from '.'
import { faker } from '@faker-js/faker/locale/pt_BR'
import {
  membros,
  intencoesParticipacao,
  indicacoes,
  mensalidades,
  obrigados,
  reunioes,
  reunioesMembros,
  presencas,
} from './schema'

// Helper para hash de senha simples (em produção, usar bcrypt)
async function hashPassword(password: string): Promise<string> {
  // Simulando um hash - em produção usar bcrypt
  return `hashed_${password}`
}

// Helper para gerar data no formato YYYY-MM
function getMonthReference(monthsAgo: number): string {
  const date = new Date()
  date.setMonth(date.getMonth() - monthsAgo)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

// Helper para gerar data da reunião
function getReuniaoDate(weeksOffset: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + weeksOffset * 7)
  date.setHours(19, 0, 0, 0) // 19h
  return date
}

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // 1. CRIAR MEMBROS (20+ membros)
    console.log('👥 Criando membros...')
    
    const adminSenha = await hashPassword('admin')
    const membrosSeed: Array<typeof membros.$inferInsert> = [
      {
        nome: 'Administrador',
        email: 'admin@admin.com',
        tipo: 'admin',
        celular: '(11) 99999-9999',
        senhaHash: adminSenha,
        ramo: 'Tecnologia',
        descricao: 'Administrador do sistema',
        statusMembro: 'ativo',
        agradecimentosPublicos: 0,
        experiencias: ['Gestão', 'Tecnologia'],
      },
    ]

    // Gerar 19 membros aleatórios
    const ramos = [
      'Tecnologia',
      'Saúde',
      'Educação',
      'Consultoria',
      'Marketing',
      'Vendas',
      'Advocacia',
      'Arquitetura',
      'Engenharia',
      'Design',
      'Gastronomia',
      'Turismo',
      'Imobiliário',
      'Financeiro',
    ]

    for (let i = 0; i < 19; i++) {
      const nome = faker.person.fullName()
      const senha = await hashPassword('senha123')
      const statusAleatorio = faker.helpers.arrayElement(['ativo', 'ativo', 'ativo', 'pendente'])
      
      membrosSeed.push({
        nome,
        email: faker.internet.email({ firstName: nome.split(' ')[0], lastName: nome.split(' ')[1] }).toLowerCase(),
        tipo: 'membro',
        celular: faker.phone.number(),
        senhaHash: senha,
        ramo: faker.helpers.arrayElement(ramos),
        descricao: faker.company.catchPhrase(),
        statusMembro: statusAleatorio as 'ativo' | 'pendente',
        agradecimentosPublicos: faker.number.int({ min: 0, max: 50 }),
        experiencias: faker.helpers.arrayElements(
          ['Networking', 'Gestão', 'Vendas', 'Marketing', 'Liderança', 'Inovação'],
          { min: 1, max: 4 }
        ),
      })
    }

    const membrosInseridos = await db.insert(membros).values(membrosSeed).returning()
    console.log(`✅ ${membrosInseridos.length} membros criados`)

    // 2. CRIAR INTENÇÕES DE PARTICIPAÇÃO (5)
    console.log('📋 Criando intenções de participação...')
    
    const intencoesSeed: Array<typeof intencoesParticipacao.$inferInsert> = []
    for (let i = 0; i < 5; i++) {
      const nome = faker.person.fullName()
      const statusIntencao = faker.helpers.arrayElement(['pendente', 'pendente', 'aprovado', 'recusado'])
      
      intencoesSeed.push({
        nome,
        email: faker.internet.email({ firstName: nome.split(' ')[0] }).toLowerCase(),
        celular: faker.phone.number(),
        status: statusIntencao as 'pendente' | 'aprovado' | 'recusado',
        tokenConvite: faker.string.uuid(),
        tokenExpiraEm: faker.date.future(),
      })
    }

    const intencoesInseridas = await db.insert(intencoesParticipacao).values(intencoesSeed).returning()
    console.log(`✅ ${intencoesInseridas.length} intenções criadas`)

    // 3. CRIAR INDICAÇÕES (15+)
    console.log('🤝 Criando indicações...')
    
    const membrosAtivos = membrosInseridos.filter((m) => m.statusMembro === 'ativo')
    const indicacoesSeed: Array<typeof indicacoes.$inferInsert> = []

    for (let i = 0; i < 15; i++) {
      const indicador = faker.helpers.arrayElement(membrosAtivos)
      const recebedor = faker.helpers.arrayElement(membrosAtivos.filter((m) => m.id !== indicador.id))
      const nomeCliente = faker.person.fullName()
      const empresa = faker.company.name()
      const statusIndicacao = faker.helpers.arrayElement([
        'pendente',
        'em_prospeccao',
        'fechado',
        'fechado',
        'perdido',
      ])

      indicacoesSeed.push({
        idMembroIndicador: indicador.id,
        idMembroRecebeu: recebedor.id,
        nomeCliente,
        emailCliente: faker.internet.email({ firstName: nomeCliente.split(' ')[0] }).toLowerCase(),
        telefoneCliente: faker.phone.number(),
        motivo: `Indicação para ${empresa} - ${faker.company.catchPhrase()}`,
        status: statusIndicacao as 'pendente' | 'em_prospeccao' | 'fechado' | 'perdido',
        dataCriacao: faker.date.past({ years: 1 }),
        dataFechamento: faker.helpers.maybe(() => faker.date.recent({ days: 30 }), { probability: 0.5 }),
      })
    }

    const indicacoesInseridas = await db.insert(indicacoes).values(indicacoesSeed).returning()
    console.log(`✅ ${indicacoesInseridas.length} indicações criadas`)

    // 4. CRIAR MENSALIDADES (4 por membro)
    console.log('💰 Criando mensalidades...')
    
    const mensalidadesSeed: Array<typeof mensalidades.$inferInsert> = []
    
    for (const membro of membrosInseridos) {
      // 4 mensalidades: 3 pagas + 1 pendente
      for (let i = 3; i >= 0; i--) {
        const mesReferencia = getMonthReference(i)
        const pago = i > 0 // últimas 3 pagas, a mais recente (i=0) pendente
        
        mensalidadesSeed.push({
          membroId: membro.id,
          valor: 15000, // R$ 150,00 em centavos
          mesReferencia,
          pago,
          dataPagamento: pago ? faker.date.past({ years: 1 }) : null,
        })
      }
    }

    const mensalidadesInseridas = await db.insert(mensalidades).values(mensalidadesSeed).returning()
    console.log(`✅ ${mensalidadesInseridas.length} mensalidades criadas`)

    // 5. CRIAR OBRIGADOS (15+)
    console.log('🙏 Criando obrigados...')
    
    const indicacoesFechadas = indicacoesInseridas.filter((ind) => ind.status === 'fechado')
    const obrigadosSeed: Array<typeof obrigados.$inferInsert> = []

    for (let i = 0; i < Math.min(15, indicacoesFechadas.length); i++) {
      const indicacao = indicacoesFechadas[i]
      const agradecido = faker.helpers.arrayElement(membrosAtivos)
      const recebedor = faker.helpers.arrayElement(membrosAtivos.filter((m) => m.id !== agradecido.id))

      obrigadosSeed.push({
        idIndicacao: indicacao.id,
        idMembroAgradecido: agradecido.id,
        idMembroRecebeu: recebedor.id,
        mensagem: faker.helpers.arrayElement([
          'Muito obrigado pela indicação! Fechamos um excelente negócio.',
          'Gratidão pela oportunidade, o cliente ficou muito satisfeito.',
          'Obrigado pela confiança! Foi fundamental para fechar esse contrato.',
          'Agradeço imensamente pela indicação, resultou em uma grande parceria.',
          'Muito obrigado! A indicação foi perfeita e já estamos trabalhando juntos.',
        ]),
        dataCriacao: faker.date.recent({ days: 60 }),
      })
    }

    // Adicionar mais obrigados se necessário (até 15)
    while (obrigadosSeed.length < 15 && indicacoesInseridas.length > 0) {
      const indicacao = faker.helpers.arrayElement(indicacoesInseridas)
      const agradecido = faker.helpers.arrayElement(membrosAtivos)
      const recebedor = faker.helpers.arrayElement(membrosAtivos.filter((m) => m.id !== agradecido.id))

      obrigadosSeed.push({
        idIndicacao: indicacao.id,
        idMembroAgradecido: agradecido.id,
        idMembroRecebeu: recebedor.id,
        mensagem: faker.lorem.sentence(),
        dataCriacao: faker.date.recent({ days: 60 }),
      })
    }

    const obrigadosInseridos = await db.insert(obrigados).values(obrigadosSeed).returning()
    console.log(`✅ ${obrigadosInseridos.length} obrigados criados`)

    // 6. CRIAR REUNIÕES (15 passadas + 2 futuras)
    console.log('📅 Criando reuniões...')
    
    const reunioesSeed: Array<typeof reunioes.$inferInsert> = []
    const admin = membrosInseridos[0] // Admin como criador padrão

    // 15 reuniões passadas (uma por semana)
    for (let i = 15; i > 0; i--) {
      const criador = faker.helpers.arrayElement(membrosAtivos)
      reunioesSeed.push({
        titulo: faker.helpers.arrayElement([
          'Reunião Semanal de Networking',
          'Encontro de Negócios',
          'Café com Empreendedores',
          'Sessão de Indicações',
          'Workshop de Networking',
        ]),
        descricao: faker.company.catchPhrase(),
        dataHora: getReuniaoDate(-i),
        criadaPor: criador.id,
        tipo: faker.helpers.arrayElement(['geral', 'geral', 'geral', 'selecionada']) as 'geral' | 'selecionada',
      })
    }

      // 2 reuniões futuras
    for (let i = 1; i <= 2; i++) {
      reunioesSeed.push({
        titulo: 'Reunião Semanal de Networking',
        descricao: 'Encontro para troca de indicações e networking',
        dataHora: getReuniaoDate(i),
        criadaPor: admin.id,
        tipo: 'geral',
      })
    }    const reunioesInseridas = await db.insert(reunioes).values(reunioesSeed).returning()
    console.log(`✅ ${reunioesInseridas.length} reuniões criadas`)

    // 7. CRIAR CONVITES PARA REUNIÕES E PRESENÇAS
    console.log('📨 Criando convites e presenças...')
    
    const reunioesMembrosSeeds: Array<typeof reunioesMembros.$inferInsert> = []
    const presencasSeeds: Array<typeof presencas.$inferInsert> = []

    for (const reuniao of reunioesInseridas) {
      const isPast = reuniao.dataHora < new Date()
      
      // Determinar quantos membros serão convidados
      const numConvidados =
        reuniao.tipo === 'geral'
          ? membrosAtivos.length
          : faker.number.int({ min: 5, max: 10 })

      const convidados =
        reuniao.tipo === 'geral'
          ? membrosAtivos
          : faker.helpers.arrayElements(membrosAtivos, numConvidados)

      for (const membro of convidados) {
        // Adicionar à lista de convidados
        reunioesMembrosSeeds.push({
          reuniaoId: reuniao.id,
          membroId: membro.id,
        })

        // Se a reunião é passada, criar presença
        if (isPast) {
          const fezCheckin = faker.datatype.boolean(0.8) // 80% de presença
          presencasSeeds.push({
            reuniaoId: reuniao.id,
            membroId: membro.id,
            fezCheckin,
            horaCheckin: fezCheckin ? new Date(reuniao.dataHora.getTime() + faker.number.int({ min: -10, max: 30 }) * 60000) : null,
          })
        }
      }
    }

    await db.insert(reunioesMembros).values(reunioesMembrosSeeds)
    console.log(`✅ ${reunioesMembrosSeeds.length} convites criados`)

    await db.insert(presencas).values(presencasSeeds)
    console.log(`✅ ${presencasSeeds.length} presenças registradas`)

    console.log('\n🎉 Seed concluído com sucesso!')
    console.log('\n📊 Resumo:')
    console.log(`   - ${membrosInseridos.length} membros`)
    console.log(`   - ${intencoesInseridas.length} intenções de participação`)
    console.log(`   - ${indicacoesInseridas.length} indicações`)
    console.log(`   - ${mensalidadesInseridas.length} mensalidades`)
    console.log(`   - ${obrigadosInseridos.length} obrigados`)
    console.log(`   - ${reunioesInseridas.length} reuniões`)
    console.log(`   - ${reunioesMembrosSeeds.length} convites para reuniões`)
    console.log(`   - ${presencasSeeds.length} presenças registradas`)
    console.log('\n🔑 Credenciais do admin:')
    console.log('   Email: admin@admin.com')
    console.log('   Senha: admin')
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    throw error
  }
}

seed()
  .then(() => {
    console.log('\n✅ Processo finalizado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erro fatal:', error)
    process.exit(1)
  })
