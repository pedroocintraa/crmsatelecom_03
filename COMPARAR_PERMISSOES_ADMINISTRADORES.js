// Script para comparar permissões entre usuários ADMINISTRADOR_GERAL
// Execute no console do navegador

async function compararPermissoesAdministradores() {
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

    console.log('🔍 Buscando todos os usuários ADMINISTRADOR_GERAL...');
    
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
    
    if (administradores.length < 2) {
      console.log('⚠️ É necessário ter pelo menos 2 usuários ADMINISTRADOR_GERAL para comparação');
      return;
    }

    // Comparar permissões entre os administradores
    console.log('\n📋 COMPARAÇÃO DETALHADA:');
    
    for (let i = 0; i < administradores.length; i++) {
      const admin = administradores[i];
      console.log(`\n👤 ADMINISTRADOR ${i + 1}:`);
      console.log(`Nome: ${admin.nome}`);
      console.log(`Email: ${admin.email}`);
      console.log(`ID: ${admin.id}`);
      console.log(`Função: ${admin.funcao}`);
      console.log(`Ativo: ${admin.ativo}`);
      
      const permissoes = admin.permissoes || {};
      console.log('\n🔐 PERMISSÕES:');
      console.log(`- Dashboard: ${permissoes.podeAcessarDashboard ? '✅' : '❌'}`);
      console.log(`- Todas as vendas: ${permissoes.podeAcessarTodasVendas ? '✅' : '❌'}`);
      console.log(`- Apenas próprias vendas: ${permissoes.podeAcessarApenasPropriaVendas ? '✅' : '❌'}`);
      console.log(`- Gerenciar usuários: ${permissoes.podeGerenciarUsuarios ? '✅' : '❌'}`);
      console.log(`- Editar vendas: ${permissoes.podeEditarVendas ? '✅' : '❌'}`);
      console.log(`- Gerenciar equipes: ${permissoes.podeGerenciarEquipes ? '✅' : '❌'}`);
      console.log(`- Criar supervisor: ${permissoes.podeCriarSupervisorEquipe ? '✅' : '❌'}`);
      console.log(`- Criar vendedor: ${permissoes.podeCriarVendedor ? '✅' : '❌'}`);
      console.log(`- Nova venda: ${permissoes.podeAcessarNovaVenda ? '✅' : '❌'}`);
      console.log(`- Configurações: ${permissoes.podeAcessarConfiguracoes ? '✅' : '❌'}`);
    }

    // Identificar diferenças
    console.log('\n🔍 IDENTIFICANDO DIFERENÇAS:');
    
    const admin1 = administradores[0];
    const admin2 = administradores[1];
    const permissoes1 = admin1.permissoes || {};
    const permissoes2 = admin2.permissoes || {};

    const camposPermissoes = [
      'podeAcessarDashboard',
      'podeAcessarTodasVendas',
      'podeAcessarApenasPropriaVendas',
      'podeGerenciarUsuarios',
      'podeEditarVendas',
      'podeGerenciarEquipes',
      'podeCriarSupervisorEquipe',
      'podeCriarVendedor',
      'podeAcessarNovaVenda',
      'podeAcessarConfiguracoes'
    ];

    let diferencasEncontradas = false;

    for (const campo of camposPermissoes) {
      const valor1 = permissoes1[campo];
      const valor2 = permissoes2[campo];
      
      if (valor1 !== valor2) {
        if (!diferencasEncontradas) {
          console.log('⚠️ DIFERENÇAS ENCONTRADAS:');
          diferencasEncontradas = true;
        }
        
        console.log(`- ${campo}:`);
        console.log(`  ${admin1.nome}: ${valor1 ? '✅' : '❌'}`);
        console.log(`  ${admin2.nome}: ${valor2 ? '✅' : '❌'}`);
      }
    }

    if (!diferencasEncontradas) {
      console.log('✅ Nenhuma diferença encontrada nas permissões!');
    }

    // Verificar se as permissões estão corretas para ADMINISTRADOR_GERAL
    console.log('\n🎯 VERIFICAÇÃO DE CONFORMIDADE:');
    
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

    for (let i = 0; i < administradores.length; i++) {
      const admin = administradores[i];
      const permissoes = admin.permissoes || {};
      
      console.log(`\n👤 ${admin.nome}:`);
      
      let conformidade = true;
      for (const [campo, valorCorreto] of Object.entries(permissoesCorretas)) {
        const valorAtual = permissoes[campo];
        if (valorAtual !== valorCorreto) {
          console.log(`  ❌ ${campo}: esperado ${valorCorreto ? 'true' : 'false'}, atual ${valorAtual ? 'true' : 'false'}`);
          conformidade = false;
        }
      }
      
      if (conformidade) {
        console.log('  ✅ Todas as permissões estão corretas!');
      } else {
        console.log('  ⚠️ Permissões precisam ser corrigidas');
      }
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar comparação
compararPermissoesAdministradores(); 