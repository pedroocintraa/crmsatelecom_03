// Script para testar o cadastro de vendas com documentos (base64)
// Execute no console do navegador

async function testarCadastroVendaComDocumentos() {
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

    console.log('\n📝 Criando venda com documentos (base64)...');
    
    // Criar documentos de exemplo (base64 simulado)
    const documentosExemplo = {
      documentoClienteFrente: [
        {
          id: `${Date.now()}_0`,
          nome: "documento_cliente_frente.jpg",
          tipo: "image/jpeg",
          tamanho: 102400,
          dataUpload: new Date().toISOString(),
          conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Base64 mínimo
        }
      ],
      documentoClienteVerso: [
        {
          id: `${Date.now()}_1`,
          nome: "documento_cliente_verso.jpg",
          tipo: "image/jpeg",
          tamanho: 102400,
          dataUpload: new Date().toISOString(),
          conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Base64 mínimo
        }
      ],
      comprovanteEndereco: [
        {
          id: `${Date.now()}_2`,
          nome: "comprovante_endereco.jpg",
          tipo: "image/jpeg",
          tamanho: 102400,
          dataUpload: new Date().toISOString(),
          conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Base64 mínimo
        }
      ]
    };
    
    const vendaComDocumentos = {
      id: Date.now().toString(),
      cliente: {
        nome: "MARIA SILVA SANTOS",
        telefone: "62985886876",
        email: "maria.silva@email.com",
        cpf: "22233344455",
        dataNascimento: "1990-05-15",
        endereco: {
          cep: "74000000",
          logradouro: "RUA DAS FLORES",
          numero: "456",
          complemento: "APTO 101",
          bairro: "SETOR CENTRAL",
          localidade: "GOIÂNIA",
          uf: "GO"
        }
      },
      status: "pendente",
      dataVenda: new Date().toISOString(),
      observacoes: "Cliente interessado no plano premium. Documentos anexados em base64.",
      vendedorId: vendedor.id,
      vendedorNome: vendedor.nome,
      equipeId: vendedor.equipeId || null,
      equipeNome: vendedor.nomeEquipe || null,
      planoId: "plano_premium",
      diaVencimento: 15,
      documentos: documentosExemplo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Salvar venda no Firebase
    await set(ref(database, `vendas/${vendaComDocumentos.id}`), vendaComDocumentos);
    
    console.log('✅ Venda com documentos criada com sucesso!');
    console.log(`📋 Detalhes da venda:`);
    console.log(`- ID: ${vendaComDocumentos.id}`);
    console.log(`- Cliente: ${vendaComDocumentos.cliente.nome}`);
    console.log(`- CPF: ${vendaComDocumentos.cliente.cpf}`);
    console.log(`- Telefone: ${vendaComDocumentos.cliente.telefone}`);
    console.log(`- Endereço: ${vendaComDocumentos.cliente.endereco.logradouro}, ${vendaComDocumentos.cliente.endereco.numero}`);
    console.log(`- Bairro: ${vendaComDocumentos.cliente.endereco.bairro}, ${vendaComDocumentos.cliente.endereco.localidade}/${vendaComDocumentos.cliente.endereco.uf}`);
    console.log(`- Vendedor: ${vendaComDocumentos.vendedorNome}`);
    console.log(`- Equipe: ${vendaComDocumentos.equipeNome || 'Sem equipe'}`);
    console.log(`- Status: ${vendaComDocumentos.status}`);
    console.log(`- Data: ${new Date(vendaComDocumentos.dataVenda).toLocaleDateString()}`);
    console.log(`- Documentos: ${Object.keys(vendaComDocumentos.documentos).length} categorias`);
    
    // Mostrar detalhes dos documentos
    Object.entries(vendaComDocumentos.documentos).forEach(([categoria, docs]) => {
      console.log(`  📄 ${categoria}: ${docs.length} documento(s)`);
      docs.forEach((doc, index) => {
        console.log(`    - ${doc.nome} (${doc.tipo}, ${doc.tamanho} bytes)`);
      });
    });
    
    console.log('\n🔄 Recarregue a página de acompanhamento de vendas para ver a venda');
    console.log('\n📝 Para testar no formulário:');
    console.log('1. Acesse a página "Nova Venda"');
    console.log('2. Preencha os dados do cliente');
    console.log('3. Anexe documentos usando as câmeras/upload');
    console.log('4. Clique em "Cadastrar Venda"');
    console.log('5. Os documentos serão salvos como base64 (temporariamente)');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar teste
testarCadastroVendaComDocumentos(); 