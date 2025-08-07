// Script para verificar e corrigir permissões do usuário
// Execute no console do navegador

async function verificarPermissoesUsuario() {
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

    // Verificar se as permissões estão corretas
    const permissoesCorretas = {
      podeAcessarDashboard: true,
      podeAcessarTodasVendas: true,
      podeAcessarApenasPropriaVendas: false,
      podeGerenciarUsuarios: true,
      podeEditarVendas: true,
      podeGerenciarEquipes: true,
      podeCriarSupervisorEquipe: true,
      podeCriarVendedor: true
    };

    console.log('\n🎯 Permissões que devem estar ativas:');
    console.log('- podeAcessarDashboard:', permissoesCorretas.podeAcessarDashboard);
    console.log('- podeAcessarTodasVendas:', permissoesCorretas.podeAcessarTodasVendas);
    console.log('- podeGerenciarUsuarios:', permissoesCorretas.podeGerenciarUsuarios);
    console.log('- podeGerenciarEquipes:', permissoesCorretas.podeGerenciarEquipes);
    console.log('- podeEditarVendas:', permissoesCorretas.podeEditarVendas);
    console.log('- podeCriarSupervisorEquipe:', permissoesCorretas.podeCriarSupervisorEquipe);
    console.log('- podeCriarVendedor:', permissoesCorretas.podeCriarVendedor);

    // Verificar se precisa corrigir
    const precisaCorrigir = !userData.permissoes || 
      userData.funcao !== 'ADMINISTRADOR_GERAL' ||
      !userData.permissoes.podeGerenciarUsuarios ||
      !userData.permissoes.podeGerenciarEquipes;

    if (precisaCorrigir) {
      console.log('\n⚠️ Usuário precisa ser corrigido!');
      
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
      
      console.log('✅ Usuário corrigido!');
      console.log('📋 Dados atualizados:', dadosCorretos);
    } else {
      console.log('\n✅ Usuário já está correto!');
    }

    console.log('\n🔄 Próximos passos:');
    console.log('1. Faça logout do sistema');
    console.log('2. Faça login novamente');
    console.log('3. Verifique se as páginas de usuários e equipes aparecem');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar verificação
verificarPermissoesUsuario(); 