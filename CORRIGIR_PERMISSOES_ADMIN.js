// Script para corrigir permissões do administrador
// Execute no console do navegador

async function corrigirPermissoesAdmin() {
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

    // Buscar usuário que precisa ser corrigido
    const userId = 'fdd7ehJgy0dDum2gPH4dpo7iCo03';
    const userRef = ref(database, `usuarios/${userId}`);
    const userSnapshot = await get(userRef);
    
    if (!userSnapshot.exists()) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    const userData = userSnapshot.val();
    console.log('👤 Usuário atual:', userData);

    // Buscar usuário administrador de referência
    const adminRef = ref(database, `usuarios/MmKJUH5zgQN5TlGqe1iAMamBMkj1`);
    const adminSnapshot = await get(adminRef);
    
    if (!adminSnapshot.exists()) {
      console.log('❌ Usuário administrador de referência não encontrado');
      return;
    }

    const adminData = adminSnapshot.val();
    console.log('👑 Administrador de referência:', adminData);

    // Dados corretos para administrador geral
    const dadosCorretos = {
      ...userData,
      nome: userData.nome || 'Administrador Geral',
      funcao: 'ADMINISTRADOR_GERAL',
      permissoes: {
        podeAcessarDashboard: true,
        podeAcessarTodasVendas: true,
        podeAcessarApenasPropriaVendas: false,
        podeGerenciarUsuarios: true,
        podeEditarVendas: true,
        podeGerenciarEquipes: true,
        podeCriarSupervisorEquipe: true,
        podeCriarVendedor: true
      },
      ativo: true
    };

    // Atualizar dados do usuário
    await set(ref(database, `usuarios/${userId}`), dadosCorretos);
    
    console.log('✅ Permissões corrigidas!');
    console.log('📋 Dados atualizados:', dadosCorretos);
    console.log('\n🎯 Agora você deve ter acesso a:');
    console.log('- ✅ Dashboard');
    console.log('- ✅ Todas as vendas');
    console.log('- ✅ Gerenciamento de usuários');
    console.log('- ✅ Gerenciamento de equipes');
    console.log('- ✅ Edição de vendas');
    console.log('- ✅ Criação de supervisores');
    console.log('- ✅ Criação de vendedores');
    
    console.log('\n🔄 Faça logout e login novamente para aplicar as mudanças');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirPermissoesAdmin(); 