// Script para corrigir permissões dos usuários SUPERVISOR_EQUIPE
// Remove acesso às equipes e adiciona acesso limitado aos usuários
// Execute no console do navegador

async function corrigirPermissoesSupervisorEquipe() {
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

    console.log('🔍 Buscando usuários SUPERVISOR_EQUIPE...');
    
    // Buscar todos os usuários
    const usuariosRef = ref(database, 'usuarios');
    const usuariosSnapshot = await get(usuariosRef);
    
    if (!usuariosSnapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }

    const usuarios = usuariosSnapshot.val();
    const supervisoresEquipe = [];

    // Filtrar apenas SUPERVISORES_EQUIPE
    for (const [userId, userData] of Object.entries(usuarios)) {
      if (userData.funcao === 'SUPERVISOR_EQUIPE') {
        supervisoresEquipe.push({
          id: userId,
          ...userData
        });
      }
    }

    console.log(`📊 Encontrados ${supervisoresEquipe.length} supervisores de equipe:`);
    
    if (supervisoresEquipe.length === 0) {
      console.log('❌ Nenhum SUPERVISOR_EQUIPE encontrado');
      return;
    }

    // Permissões corretas para SUPERVISOR_EQUIPE
    const permissoesCorretas = {
      podeAcessarDashboard: true,
      podeAcessarTodasVendas: false,
      podeAcessarApenasPropriaVendas: true,
      podeGerenciarUsuarios: true, // Pode ver usuários da sua equipe
      podeEditarVendas: true,
      podeGerenciarEquipes: false, // NÃO deve ter acesso às equipes
      podeCriarSupervisorEquipe: false,
      podeCriarVendedor: false,
      podeAcessarNovaVenda: true,
      podeAcessarConfiguracoes: false
    };

    let corrigidos = 0;
    let erros = 0;

    for (const supervisor of supervisoresEquipe) {
      console.log(`\n👤 Verificando: ${supervisor.nome} (${supervisor.email})`);
      console.log('Equipe:', supervisor.equipeId || 'Sem equipe');
      console.log('Permissões atuais:', supervisor.permissoes);

      // Verificar se as permissões estão corretas
      const permissoesAtuais = supervisor.permissoes || {};
      const precisaCorrigir = 
        permissoesAtuais.podeGerenciarEquipes !== false || // Deve ser false
        permissoesAtuais.podeGerenciarUsuarios !== true || // Deve ser true
        permissoesAtuais.podeAcessarTodasVendas !== false || // Deve ser false
        permissoesAtuais.podeAcessarApenasPropriaVendas !== true; // Deve ser true

      if (precisaCorrigir) {
        console.log('⚠️ Permissões incorretas detectadas. Corrigindo...');
        
        try {
          // Atualizar usuário com permissões corretas
          const dadosCorretos = {
            ...supervisor,
            permissoes: permissoesCorretas,
            ativo: true
          };

          await set(ref(database, `usuarios/${supervisor.id}`), dadosCorretos);
          
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
    console.log(`- Total de supervisores de equipe: ${supervisoresEquipe.length}`);
    console.log(`- Corrigidos: ${corrigidos}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Já corretos: ${supervisoresEquipe.length - corrigidos - erros}`);

    if (corrigidos > 0) {
      console.log('\n🎯 Após a correção, os SUPERVISORES_EQUIPE terão:');
      console.log('- ✅ Dashboard');
      console.log('- ✅ Nova Venda');
      console.log('- ✅ Vendas (apenas próprias)');
      console.log('- ✅ Usuários (apenas da sua equipe)');
      console.log('- ❌ Equipes (SEM acesso)');
      console.log('- ❌ Configurações (SEM acesso)');
      
      console.log('\n🔄 Faça logout e login novamente para aplicar as mudanças');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirPermissoesSupervisorEquipe(); 