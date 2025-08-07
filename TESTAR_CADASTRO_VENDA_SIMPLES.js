// Script para testar o cadastro de vendas simples (sem documentos)
// Execute no console do navegador

async function testarCadastroVendaSimples() {
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

    console.log('\n📝 Criando venda simples (sem documentos)...');
    
    const vendaSimples = {
      id: Date.now().toString(),
      cliente: {
        nome: "CARLOS ALMEIDA SANTOS",
        telefone: "62985886875",
        email: "carlos.almeida@email.com",
        cpf: "11122233344",
        dataNascimento: "1988-12-10",
        endereco: {
          cep: "74000000",
          logradouro: "RUA DAS PALMEIRAS",
          numero: "789",
          complemento: "CASA",
          bairro: "SETOR BUENO",
          localidade: "GOIÂNIA",
          uf: "GO"
        }
      },
      status: "pendente",
      dataVenda: new Date().toISOString(),
      observacoes: "Cliente interessado no plano básico. Sem documentos anexados.",
      vendedorId: vendedor.id,
      vendedorNome: vendedor.nome,
      equipeId: vendedor.equipeId || null,
      equipeNome: vendedor.nomeEquipe || null,
      planoId: "plano_basico",
      diaVencimento: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar venda no Firebase
    await set(ref(database, `vendas/${vendaSimples.id}`), vendaSimples);
    
    console.log('✅ Venda simples criada com sucesso!');
    console.log(`📋 Detalhes da venda:`);
    console.log(`- ID: ${vendaSimples.id}`);
    console.log(`- Cliente: ${vendaSimples.cliente.nome}`);
    console.log(`- CPF: ${vendaSimples.cliente.cpf}`);
    console.log(`- Telefone: ${vendaSimples.cliente.telefone}`);
    console.log(`- Endereço: ${vendaSimples.cliente.endereco.logradouro}, ${vendaSimples.cliente.endereco.numero}`);
    console.log(`- Bairro: ${vendaSimples.cliente.endereco.bairro}, ${vendaSimples.cliente.endereco.localidade}/${vendaSimples.cliente.endereco.uf}`);
    console.log(`- Vendedor: ${vendaSimples.vendedorNome}`);
    console.log(`- Equipe: ${vendaSimples.equipeNome || 'Sem equipe'}`);
    console.log(`- Status: ${vendaSimples.status}`);
    console.log(`- Data: ${new Date(vendaSimples.dataVenda).toLocaleDateString()}`);
    console.log(`- Documentos: Nenhum anexado`);
    
    console.log('\n🔄 Recarregue a página de acompanhamento de vendas para ver a venda');
    console.log('\n📝 Para testar com documentos:');
    console.log('1. Acesse a página "Nova Venda"');
    console.log('2. Preencha os dados do cliente');
    console.log('3. Anexe documentos usando as câmeras/upload');
    console.log('4. Clique em "Cadastrar Venda"');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar teste
testarCadastroVendaSimples(); 