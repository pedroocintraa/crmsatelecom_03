// Script para transformar usuário em Administrador Geral
// Execute este script no console do navegador

const userId = 'MmKJUH5zgQN5TlGqe1iAMamBMkj1';

async function transformarEmAdministrador() {
  try {
    console.log('🔄 Iniciando transformação do usuário em Administrador Geral...');
    
    // Importar Firebase
    const { getDatabase, ref, update, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
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

    // Inicializar Firebase
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    console.log('✅ Firebase inicializado');

    // Verificar se o usuário existe
    const usuarioRef = ref(database, `usuarios/${userId}`);
    const snapshot = await get(usuarioRef);
    
    if (!snapshot.exists()) {
      console.error('❌ Usuário não encontrado no Realtime Database');
      return;
    }

    const usuarioAtual = snapshot.val();
    console.log('👤 Usuário atual:', usuarioAtual);

    // Dados do Administrador Geral
    const dadosAdmin = {
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
      }
    };

    // Atualizar usuário
    await update(usuarioRef, dadosAdmin);
    
    console.log('✅ Usuário transformado em Administrador Geral!');
    console.log('📋 Novos dados:', {
      ...usuarioAtual,
      ...dadosAdmin
    });

    // Verificar se foi atualizado
    const snapshotAtualizado = await get(usuarioRef);
    const usuarioAtualizado = snapshotAtualizado.val();
    
    console.log('🎉 Verificação final:', usuarioAtualizado);
    console.log('🔑 Função:', usuarioAtualizado.funcao);
    console.log('🔐 Permissões:', usuarioAtualizado.permissoes);

  } catch (error) {
    console.error('❌ Erro ao transformar usuário:', error);
  }
}

// Executar a transformação
transformarEmAdministrador(); 