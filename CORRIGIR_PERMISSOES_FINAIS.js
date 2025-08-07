// Script para corrigir permissões do administrador com especificações finais
// Execute no console do navegador

async function corrigirPermissoesFinais() {
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

    // Buscar usuário atual
    const userId = 'fdd7ehJgy0dDum2gPH4dpo7iCo03';
    const userRef = ref(database, `usuarios/${userId}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    const userData = userSnapshot.val();
    console.log('👤 Dados atuais do usuário:');
    console.log('Nome:', userData.nome);
    console.log('Email:', userData.email);
    console.log('Função:', userData.funcao);
    console.log('Permissões:', userData.permissoes);

    // Permissões corretas para ADMINISTRADOR_GERAL conforme especificações
    const permissoesCorretas = {
      podeAcessarDashboard: true,
      podeAcessarTodasVendas: true,
      podeAcessarApenasPropriaVendas: false,
      podeGerenciarUsuarios: true,
      podeEditarVendas: true,
      podeGerenciarEquipes: true,
      podeCriarSupervisorEquipe: true,
      podeCriarVendedor: true,
      podeAcessarNovaVenda: true,
      podeAcessarConfiguracoes: true
    };

    console.log('\n🎯 Permissões que serão aplicadas (ADMINISTRADOR_GERAL):');
    console.log('- Dashboard:', permissoesCorretas.podeAcessarDashboard);
    console.log('- Todas as vendas:', permissoesCorretas.podeAcessarTodasVendas);
    console.log('- Gerenciar usuários:', permissoesCorretas.podeGerenciarUsuarios);
    console.log('- Gerenciar equipes:', permissoesCorretas.podeGerenciarEquipes);
    console.log('- Editar vendas:', permissoesCorretas.podeEditarVendas);
    console.log('- Criar supervisores:', permissoesCorretas.podeCriarSupervisorEquipe);
    console.log('- Criar vendedores:', permissoesCorretas.podeCriarVendedor);
    console.log('- Nova venda:', permissoesCorretas.podeAcessarNovaVenda);
    console.log('- Configurações:', permissoesCorretas.podeAcessarConfiguracoes);

    // Dados corretos para administrador geral
    const dadosCorretos = {
      ...userData,
      nome: userData.nome || 'Administrador Geral',
      funcao: 'ADMINISTRADOR_GERAL',
      permissoes: permissoesCorretas,
      ativo: true
    };

    // Atualizar dados do usuário
    await set(ref(database, `usuarios/${userId}`), dadosCorretos);
    
    console.log('\n✅ Usuário corrigido com permissões de ADMINISTRADOR_GERAL!');
    console.log('📋 Dados atualizados:', dadosCorretos);
    
    console.log('\n🎯 Agora você deve ter acesso a:');
    console.log('- ✅ Dashboard');
    console.log('- ✅ Nova Venda');
    console.log('- ✅ Vendas');
    console.log('- ✅ Usuários (criar, editar, excluir)');
    console.log('- ✅ Equipes (criar, editar, excluir)');
    console.log('- ✅ Configurações (acesso completo)');
    
    console.log('\n🔄 Faça logout e login novamente para aplicar as mudanças');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirPermissoesFinais(); 