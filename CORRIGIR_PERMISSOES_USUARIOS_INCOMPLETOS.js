// Script para corrigir permissões de usuários ADMINISTRADOR_GERAL incompletos
// Baseia-se no usuário que está funcionando 100% como referência
// Execute no console do navegador

async function corrigirPermissoesUsuariosIncompletos() {
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
    
    if (administradores.length === 0) {
      console.log('❌ Nenhum ADMINISTRADOR_GERAL encontrado');
      return;
    }

    // Identificar o usuário que está funcionando 100%
    let usuarioReferencia = null;
    const usuariosParaCorrigir = [];

    for (const admin of administradores) {
      const permissoes = admin.permissoes || {};
      
      // Verificar se tem todas as permissões corretas
      const temTodasPermissoes = 
        permissoes.podeAcessarDashboard === true &&
        permissoes.podeAcessarTodasVendas === true &&
        permissoes.podeGerenciarUsuarios === true &&
        permissoes.podeGerenciarEquipes === true &&
        permissoes.podeAcessarConfiguracoes === true &&
        permissoes.podeEditarVendas === true &&
        permissoes.podeCriarSupervisorEquipe === true &&
        permissoes.podeCriarVendedor === true &&
        permissoes.podeAcessarNovaVenda === true;

      if (temTodasPermissoes) {
        if (!usuarioReferencia) {
          usuarioReferencia = admin;
          console.log(`✅ Usuário de referência encontrado: ${admin.nome} (${admin.email})`);
        }
      } else {
        usuariosParaCorrigir.push(admin);
        console.log(`⚠️ Usuário para corrigir: ${admin.nome} (${admin.email})`);
      }
    }

    if (!usuarioReferencia) {
      console.log('❌ Nenhum usuário com permissões completas encontrado como referência');
      console.log('🔧 Aplicando permissões padrão para ADMINISTRADOR_GERAL...');
      
      // Aplicar permissões padrão para todos
      const permissoesPadrao = {
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
      for (const admin of administradores) {
        try {
          const dadosCorretos = {
            ...admin,
            permissoes: permissoesPadrao,
            ativo: true
          };

          await set(ref(database, `usuarios/${admin.id}`), dadosCorretos);
          console.log(`✅ ${admin.nome} corrigido com permissões padrão`);
          corrigidos++;
        } catch (error) {
          console.error(`❌ Erro ao corrigir ${admin.nome}:`, error);
        }
      }

      console.log(`\n📋 RESUMO: ${corrigidos} usuários corrigidos com permissões padrão`);
      return;
    }

    // Usar o usuário de referência para corrigir os outros
    const permissoesReferencia = usuarioReferencia.permissoes;
    console.log('\n📋 PERMISSÕES DE REFERÊNCIA:');
    console.log(permissoesReferencia);

    let corrigidos = 0;
    let erros = 0;

    for (const admin of usuariosParaCorrigir) {
      console.log(`\n🔧 Corrigindo: ${admin.nome} (${admin.email})`);
      console.log('Permissões atuais:', admin.permissoes);
      
      try {
        // Atualizar usuário com permissões de referência
        const dadosCorretos = {
          ...admin,
          permissoes: permissoesReferencia,
          ativo: true
        };

        await set(ref(database, `usuarios/${admin.id}`), dadosCorretos);
        
        console.log('✅ Permissões corrigidas com sucesso!');
        console.log('Novas permissões:', permissoesReferencia);
        corrigidos++;
      } catch (error) {
        console.error('❌ Erro ao corrigir permissões:', error);
        erros++;
      }
    }

    console.log(`\n📋 RESUMO FINAL:`);
    console.log(`- Usuário de referência: ${usuarioReferencia.nome}`);
    console.log(`- Usuários corrigidos: ${corrigidos}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Total de administradores: ${administradores.length}`);

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

// Executar correção
corrigirPermissoesUsuariosIncompletos(); 