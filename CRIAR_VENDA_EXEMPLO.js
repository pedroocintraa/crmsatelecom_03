// Script para criar uma venda de exemplo
// Execute no console do navegador

async function criarVendaExemplo() {
  try {
    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAFXCcg6zSv8Q6Q7NfEwp4fx-E6Y1zaics",
      authDomain: "crm-s-a-telecom.firebaseapp.com",
      databaseURL: "https://crm-s-a-telecom-default-rtdb.firebaseio.com",
      projectId: "crm-s-a-telecom",
      storageBucket: "crm-s-a-telecom.firebasestorage.app",
      messagingSenderId: "295341609951",
      appId: "1:295341609951:web:b970e1b4cc422d5dbfaa6a",
      measurementId: "G-RG1KV3DF87"
    };

    // Importar Firebase
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getDatabase, ref, get, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    console.log('🔍 Verificando usuários disponíveis...');
    
    // Buscar usuários para usar como vendedor
    const usuariosRef = ref(database, 'usuarios');
    const usuariosSnapshot = await get(usuariosRef);
    
    if (!usuariosSnapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado. Crie usuários primeiro.');
      return;
    }

    const usuarios = usuariosSnapshot.val();
    const vendedores = Object.values(usuarios).filter(u => u.funcao === 'VENDEDOR' || u.funcao === 'SUPERVISOR_EQUIPE');
    
    if (vendedores.length === 0) {
      console.log('❌ Nenhum vendedor encontrado. Crie usuários vendedores primeiro.');
      return;
    }

    const vendedor = vendedores[0];
    console.log(`✅ Usando vendedor: ${vendedor.nome} (${vendedor.email})`);

    // Verificar equipes
    const equipesRef = ref(database, 'equipes');
    const equipesSnapshot = await get(equipesRef);
    
    let equipeId = null;
    let equipeNome = null;
    
    if (equipesSnapshot.exists()) {
      const equipes = equipesSnapshot.val();
      const equipe = Object.values(equipes)[0];
      if (equipe) {
        equipeId = equipe.id;
        equipeNome = equipe.nome;
        console.log(`✅ Usando equipe: ${equipeNome}`);
      }
    }

    console.log('\n📝 Criando venda de exemplo...');
    
    const vendaExemplo = {
      id: Date.now().toString(),
      cliente: {
        nome: "JOÃO SILVA SANTOS",
        telefone: "62985886875",
        email: "joao.silva@email.com",
        cpf: "12345678901",
        dataNascimento: "1985-03-15",
        endereco: {
          cep: "74000000",
          logradouro: "RUA DAS FLORES",
          numero: "123",
          complemento: "APTO 45",
          bairro: "CENTRO",
          localidade: "GOIÂNIA",
          uf: "GO"
        }
      },
      status: "pendente",
      dataVenda: new Date().toISOString(),
      observacoes: "Cliente interessado no plano básico. Agendou visita técnica para próxima semana.",
      vendedorId: vendedor.id,
      vendedorNome: vendedor.nome,
      equipeId: equipeId,
      equipeNome: equipeNome,
      planoId: "plano_basico",
      diaVencimento: 15,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar venda no Firebase
    await set(ref(database, `vendas/${vendaExemplo.id}`), vendaExemplo);
    
    console.log('✅ Venda criada com sucesso!');
    console.log(`📋 Detalhes da venda:`);
    console.log(`- ID: ${vendaExemplo.id}`);
    console.log(`- Cliente: ${vendaExemplo.cliente.nome}`);
    console.log(`- CPF: ${vendaExemplo.cliente.cpf}`);
    console.log(`- Telefone: ${vendaExemplo.cliente.telefone}`);
    console.log(`- Endereço: ${vendaExemplo.cliente.endereco.logradouro}, ${vendaExemplo.cliente.endereco.numero}`);
    console.log(`- Bairro: ${vendaExemplo.cliente.endereco.bairro}, ${vendaExemplo.cliente.endereco.localidade}/${vendaExemplo.cliente.endereco.uf}`);
    console.log(`- Vendedor: ${vendaExemplo.vendedorNome}`);
    console.log(`- Equipe: ${vendaExemplo.equipeNome || 'Sem equipe'}`);
    console.log(`- Status: ${vendaExemplo.status}`);
    console.log(`- Data: ${new Date(vendaExemplo.dataVenda).toLocaleDateString()}`);
    
    console.log('\n🔄 Recarregue a página de acompanhamento de vendas para ver a venda');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar criação de venda
criarVendaExemplo(); 