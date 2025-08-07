// Script para corrigir permissões de TODOS os usuários existentes
// Aplica permissões corretas baseadas na função de cada usuário
// Execute no console do navegador

async function corrigirPermissoesTodosUsuarios() {
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
    const usuariosArray = [];

    // Converter para array
    for (const [userId, userData] of Object.entries(usuarios)) {
      usuariosArray.push({
        id: userId,
        ...userData
      });
    }

    console.log(`📊 Encontrados ${usuariosArray.length} usuários:`);
    
    // Função para obter permissões corretas baseadas na função
    function obterPermissoesCorretas(funcao) {
      switch (funcao) {
        case 'ADMINISTRADOR_GERAL':
          return {
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
        
        case 'SUPERVISOR':
          return {
            podeAcessarDashboard: true,
            podeAcessarTodasVendas: true,
            podeAcessarApenasPropriaVendas: false,
            podeGerenciarUsuarios: false,
            podeEditarVendas: true,
            podeGerenciarEquipes: true,
            podeCriarSupervisorEquipe: false,
            podeCriarVendedor: true,
            podeAcessarNovaVenda: true,
            podeAcessarConfiguracoes: false
          };
        
        case 'BACKOFFICE':
          return {
            podeAcessarDashboard: true,
            podeAcessarTodasVendas: true,
            podeAcessarApenasPropriaVendas: false,
            podeGerenciarUsuarios: false,
            podeEditarVendas: true,
            podeGerenciarEquipes: false,
            podeCriarSupervisorEquipe: false,
            podeCriarVendedor: false,
            podeAcessarNovaVenda: false,
            podeAcessarConfiguracoes: false
          };
        
        case 'SUPERVISOR_EQUIPE':
          return {
            podeAcessarDashboard: true,
            podeAcessarTodasVendas: false,
            podeAcessarApenasPropriaVendas: true,
            podeGerenciarUsuarios: false,
            podeEditarVendas: true,
            podeGerenciarEquipes: false,
            podeCriarSupervisorEquipe: false,
            podeCriarVendedor: false,
            podeAcessarNovaVenda: true,
            podeAcessarConfiguracoes: false
          };
        
        case 'VENDEDOR':
          return {
            podeAcessarDashboard: true,
            podeAcessarTodasVendas: false,
            podeAcessarApenasPropriaVendas: true,
            podeGerenciarUsuarios: false,
            podeEditarVendas: true,
            podeGerenciarEquipes: false,
            podeCriarSupervisorEquipe: false,
            podeCriarVendedor: false,
            podeAcessarNovaVenda: true,
            podeAcessarConfiguracoes: false
          };
        
        default:
          return {
            podeAcessarDashboard: false,
            podeAcessarTodasVendas: false,
            podeAcessarApenasPropriaVendas: false,
            podeGerenciarUsuarios: false,
            podeEditarVendas: false,
            podeGerenciarEquipes: false,
            podeCriarSupervisorEquipe: false,
            podeCriarVendedor: false,
            podeAcessarNovaVenda: false,
            podeAcessarConfiguracoes: false
          };
      }
    }

    let corrigidos = 0;
    let erros = 0;
    let jaCorretos = 0;

    for (const usuario of usuariosArray) {
      console.log(`\n👤 Verificando: ${usuario.nome} (${usuario.email})`);
      console.log('Função:', usuario.funcao);
      
      const permissoesAtuais = usuario.permissoes || {};
      const permissoesCorretas = obterPermissoesCorretas(usuario.funcao);
      
      // Verificar se as permissões estão corretas
      const precisaCorrigir = !permissoesAtuais.podeAcessarDashboard || 
                             !permissoesAtuais.podeAcessarTodasVendas ||
                             !permissoesAtuais.podeGerenciarUsuarios ||
                             !permissoesAtuais.podeGerenciarEquipes ||
                             !permissoesAtuais.podeAcessarConfiguracoes ||
                             !permissoesAtuais.podeAcessarNovaVenda ||
                             !permissoesAtuais.podeEditarVendas ||
                             !permissoesAtuais.podeCriarSupervisorEquipe ||
                             !permissoesAtuais.podeCriarVendedor ||
                             !permissoesAtuais.podeAcessarApenasPropriaVendas;

      if (precisaCorrigir) {
        console.log('⚠️ Permissões incorretas detectadas. Corrigindo...');
        console.log('Permissões atuais:', permissoesAtuais);
        
        try {
          // Atualizar usuário com permissões corretas
          const dadosCorretos = {
            ...usuario,
            permissoes: permissoesCorretas,
            ativo: true
          };

          await set(ref(database, `usuarios/${usuario.id}`), dadosCorretos);
          
          console.log('✅ Permissões corrigidas com sucesso!');
          console.log('Novas permissões:', permissoesCorretas);
          corrigidos++;
        } catch (error) {
          console.error('❌ Erro ao corrigir permissões:', error);
          erros++;
        }
      } else {
        console.log('✅ Permissões já estão corretas!');
        jaCorretos++;
      }
    }

    console.log(`\n📋 RESUMO FINAL:`);
    console.log(`- Total de usuários: ${usuariosArray.length}`);
    console.log(`- Corrigidos: ${corrigidos}`);
    console.log(`- Já corretos: ${jaCorretos}`);
    console.log(`- Erros: ${erros}`);

    if (corrigidos > 0) {
      console.log('\n🎯 Após a correção, todos os usuários terão permissões corretas baseadas em suas funções:');
      console.log('- ✅ ADMINISTRADOR_GERAL: Acesso completo');
      console.log('- ✅ SUPERVISOR: Gerenciamento de equipes e vendedores');
      console.log('- ✅ BACKOFFICE: Visualização e edição de vendas');
      console.log('- ✅ SUPERVISOR_EQUIPE: Acesso limitado à equipe');
      console.log('- ✅ VENDEDOR: Acesso básico às próprias vendas');
      
      console.log('\n🔄 Faça logout e login novamente para aplicar as mudanças');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirPermissoesTodosUsuarios(); 