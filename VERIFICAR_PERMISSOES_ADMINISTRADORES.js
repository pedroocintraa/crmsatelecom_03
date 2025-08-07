// Script para verificar e corrigir permissões de todos os ADMINISTRADORES_GERAIS
// Execute no console do navegador

async function verificarECorrigirPermissoesAdministradores() {
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

    console.log('🔍 Buscando todos os usuários...');
    
    // Buscar todos os usuários
    const usuariosRef = ref(database, 'usuarios');
    const usuariosSnapshot = await get(usuariosRef);
    
    if (!usuariosSnapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }

    const usuarios = usuariosSnapshot.val();
    const administradores = [];

    // Filtrar apenas ADMINISTRADORES_GERAIS
    for (const [userId, userData] of Object.entries(usuarios)) {
      if (userData.funcao === 'ADMINISTRADOR_GERAL') {
        administradores.push({
          id: userId,
          ...userData
        });
      }
    }

    console.log(`📊 Encontrados ${administradores.length} administradores gerais:`);
    
    // Permissões corretas para ADMINISTRADOR_GERAL
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

    let corrigidos = 0;
    let erros = 0;

    for (const admin of administradores) {
      console.log(`\n👤 Verificando: ${admin.nome} (${admin.email})`);
      console.log('Função atual:', admin.funcao);
      console.log('Permissões atuais:', admin.permissoes);

      // Verificar se as permissões estão corretas
      const permissoesAtuais = admin.permissoes || {};
      const precisaCorrigir = !permissoesAtuais.podeAcessarDashboard || 
                             !permissoesAtuais.podeAcessarTodasVendas ||
                             !permissoesAtuais.podeGerenciarUsuarios ||
                             !permissoesAtuais.podeGerenciarEquipes ||
                             !permissoesAtuais.podeAcessarConfiguracoes;

      if (precisaCorrigir) {
        console.log('⚠️ Permissões incorretas detectadas. Corrigindo...');
        
        try {
          // Atualizar usuário com permissões corretas
          const dadosCorretos = {
            ...admin,
            permissoes: permissoesCorretas,
            ativo: true
          };

          await set(ref(database, `usuarios/${admin.id}`), dadosCorretos);
          
          console.log('✅ Permissões corrigidas com sucesso!');
          console.log('Novas permissões:', permissoesCorretas);
          corrigidos++;
        } catch (error) {
          console.error('❌ Erro ao corrigir permissões:', error);
          erros++;
        }
      } else {
        console.log('✅ Permissões já estão corretas!');
      }
    }

    console.log(`\n📋 RESUMO:`);
    console.log(`- Total de administradores: ${administradores.length}`);
    console.log(`- Corrigidos: ${corrigidos}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Já corretos: ${administradores.length - corrigidos - erros}`);

    if (corrigidos > 0) {
      console.log('\n🎯 Após a correção, todos os administradores devem ter acesso a:');
      console.log('- ✅ Dashboard');
      console.log('- ✅ Nova Venda');
      console.log('- ✅ Vendas');
      console.log('- ✅ Usuários (criar, editar, excluir)');
      console.log('- ✅ Equipes (criar, editar, excluir)');
      console.log('- ✅ Configurações (acesso completo)');
      
      console.log('\n🔄 Faça logout e login novamente para aplicar as mudanças');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar verificação
verificarECorrigirPermissoesAdministradores(); 