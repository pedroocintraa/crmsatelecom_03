// Script para limpar usuários duplicados e corrigir o problema
// Execute no console do navegador

async function limparUsuariosDuplicados() {
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
    const { getDatabase, ref, get, set, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Buscar todos os usuários
    console.log('🔍 Buscando usuários...');
    const usuariosRef = ref(database, 'usuarios');
    const snapshot = await get(usuariosRef);
    
    if (!snapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }

    const usuarios = snapshot.val();
    console.log('📋 Usuários encontrados:', Object.keys(usuarios));

    // Agrupar usuários por email
    const usuariosPorEmail = {};
    
    for (const [userId, userData] of Object.entries(usuarios)) {
      const email = userData.email;
      if (!usuariosPorEmail[email]) {
        usuariosPorEmail[email] = [];
      }
      usuariosPorEmail[email].push({ userId, userData });
    }

    console.log('\n📧 Usuários agrupados por email:');
    for (const [email, users] of Object.entries(usuariosPorEmail)) {
      console.log(`\n${email}:`);
      users.forEach(({ userId, userData }) => {
        console.log(`  - ID: ${userId}`);
        console.log(`    Nome: ${userData.nome}`);
        console.log(`    Função: ${userData.funcao}`);
        console.log(`    Data: ${userData.dataCadastro}`);
      });
    }

    // Corrigir usuários duplicados
    console.log('\n🔧 Corrigindo usuários duplicados...');
    
    for (const [email, users] of Object.entries(usuariosPorEmail)) {
      if (users.length > 1) {
        console.log(`\n⚠️ Email duplicado encontrado: ${email}`);
        
        // Encontrar o usuário correto (com função ADMINISTRADOR_GERAL ou o mais recente)
        let usuarioCorreto = null;
        let usuarioParaRemover = [];
        
        for (const { userId, userData } of users) {
          if (userData.funcao === 'ADMINISTRADOR_GERAL') {
            usuarioCorreto = { userId, userData };
            break;
          }
        }
        
        // Se não encontrou administrador, usar o mais recente
        if (!usuarioCorreto) {
          usuarioCorreto = users[0];
        }
        
        // Marcar outros para remoção
        usuarioParaRemover = users.filter(u => u.userId !== usuarioCorreto.userId);
        
        console.log(`✅ Manter usuário: ${usuarioCorreto.userId} (${usuarioCorreto.userData.funcao})`);
        
        // Remover usuários duplicados
        for (const { userId } of usuarioParaRemover) {
          console.log(`🗑️ Removendo usuário duplicado: ${userId}`);
          await remove(ref(database, `usuarios/${userId}`));
        }
        
        // Garantir que o usuário correto tem dados corretos
        if (usuarioCorreto.userData.funcao === 'ADMINISTRADOR_GERAL') {
          const dadosCorretos = {
            ...usuarioCorreto.userData,
            nome: usuarioCorreto.userData.nome || 'Administrador Geral',
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
          
          await set(ref(database, `usuarios/${usuarioCorreto.userId}`), dadosCorretos);
          console.log(`✅ Dados do administrador corrigidos!`);
        }
      }
    }

    console.log('\n🎉 Limpeza concluída!');
    console.log('🔄 Agora faça logout e login novamente');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar limpeza
limparUsuariosDuplicados(); 