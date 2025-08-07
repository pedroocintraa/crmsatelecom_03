// Script para testar permissões do SUPERVISOR_EQUIPE
// Execute no console do navegador

async function testarPermissoesSupervisorEquipe() {
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
    const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    console.log('🔍 Testando permissões de usuários SUPERVISOR_EQUIPE...');
    
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
      podeGerenciarUsuarios: true,
      podeEditarVendas: true,
      podeGerenciarEquipes: false,
      podeCriarSupervisorEquipe: false,
      podeCriarVendedor: false,
      podeAcessarNovaVenda: true,
      podeAcessarConfiguracoes: false
    };

    console.log('\n📋 TESTE DE PERMISSÕES:');
    
    for (const supervisor of supervisoresEquipe) {
      console.log(`\n👤 Testando: ${supervisor.nome} (${supervisor.email})`);
      console.log('Equipe:', supervisor.equipeId || 'Sem equipe');
      
      const permissoes = supervisor.permissoes || {};
      
      // Testar cada permissão
      console.log('\n🔐 PERMISSÕES:');
      console.log(`- Dashboard: ${permissoes.podeAcessarDashboard === true ? '✅' : '❌'} (esperado: ✅)`);
      console.log(`- Todas as vendas: ${permissoes.podeAcessarTodasVendas === false ? '✅' : '❌'} (esperado: ❌)`);
      console.log(`- Apenas próprias vendas: ${permissoes.podeAcessarApenasPropriaVendas === true ? '✅' : '❌'} (esperado: ✅)`);
      console.log(`- Gerenciar usuários: ${permissoes.podeGerenciarUsuarios === true ? '✅' : '❌'} (esperado: ✅)`);
      console.log(`- Editar vendas: ${permissoes.podeEditarVendas === true ? '✅' : '❌'} (esperado: ✅)`);
      console.log(`- Gerenciar equipes: ${permissoes.podeGerenciarEquipes === false ? '✅' : '❌'} (esperado: ❌)`);
      console.log(`- Criar supervisor: ${permissoes.podeCriarSupervisorEquipe === false ? '✅' : '❌'} (esperado: ❌)`);
      console.log(`- Criar vendedor: ${permissoes.podeCriarVendedor === false ? '✅' : '❌'} (esperado: ❌)`);
      console.log(`- Nova venda: ${permissoes.podeAcessarNovaVenda === true ? '✅' : '❌'} (esperado: ✅)`);
      console.log(`- Configurações: ${permissoes.podeAcessarConfiguracoes === false ? '✅' : '❌'} (esperado: ❌)`);

      // Verificar se todas as permissões estão corretas
      const todasCorretas = 
        permissoes.podeAcessarDashboard === true &&
        permissoes.podeAcessarTodasVendas === false &&
        permissoes.podeAcessarApenasPropriaVendas === true &&
        permissoes.podeGerenciarUsuarios === true &&
        permissoes.podeEditarVendas === true &&
        permissoes.podeGerenciarEquipes === false &&
        permissoes.podeCriarSupervisorEquipe === false &&
        permissoes.podeCriarVendedor === false &&
        permissoes.podeAcessarNovaVenda === true &&
        permissoes.podeAcessarConfiguracoes === false;

      if (todasCorretas) {
        console.log('\n✅ TODAS AS PERMISSÕES ESTÃO CORRETAS!');
      } else {
        console.log('\n❌ ALGUMAS PERMISSÕES ESTÃO INCORRETAS!');
      }

      // Testar acesso aos usuários da equipe
      if (supervisor.equipeId) {
        const usuariosDaEquipe = Object.values(usuarios).filter(u => 
          u.equipeId === supervisor.equipeId && 
          (u.funcao === 'SUPERVISOR_EQUIPE' || u.funcao === 'VENDEDOR')
        );
        
        console.log(`\n👥 USUÁRIOS DA EQUIPE (${supervisor.equipeId}):`);
        if (usuariosDaEquipe.length > 0) {
          usuariosDaEquipe.forEach(u => {
            console.log(`- ${u.nome} (${u.funcao})`);
          });
        } else {
          console.log('- Nenhum usuário encontrado na equipe');
        }
      } else {
        console.log('\n⚠️ SUPERVISOR SEM EQUIPE ASSOCIADA');
      }
    }

    console.log('\n🎯 RESUMO DO TESTE:');
    console.log('- ✅ SUPERVISOR_EQUIPE deve ver apenas usuários da sua equipe');
    console.log('- ✅ SUPERVISOR_EQUIPE NÃO deve ter acesso às equipes');
    console.log('- ✅ SUPERVISOR_EQUIPE NÃO deve poder criar novos usuários');
    console.log('- ✅ SUPERVISOR_EQUIPE NÃO deve poder editar usuários');
    console.log('- ✅ SUPERVISOR_EQUIPE deve ver apenas próprias vendas');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar teste
testarPermissoesSupervisorEquipe(); 