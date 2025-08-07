// Script para criar dados do usuário no Realtime Database
// Execute este script no console do navegador (F12)

console.log('🚀 Iniciando criação de dados do usuário...');

// Verificar se o Firebase está disponível
if (typeof firebase === 'undefined') {
  console.error('❌ Firebase não está disponível. Certifique-se de estar na página do sistema.');
  return;
}

// Função para criar dados do usuário
async function createUserData() {
  try {
    // Verificar se há usuário logado
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error('❌ Nenhum usuário logado encontrado');
      return;
    }

    console.log('✅ Usuário encontrado:', currentUser.uid);
    console.log('📧 Email:', currentUser.email);

    // Determinar função baseada no email
    let funcao = 'VENDEDOR';
    let permissoes = {
      visualizarDashboard: true,
      gerenciarUsuarios: false,
      gerenciarEquipes: false,
      cadastrarVendas: true,
      visualizarVendas: true,
      editarVendas: false,
      excluirVendas: false,
      gerenciarConfiguracoes: false
    };

    if (currentUser.email?.includes('admin')) {
      funcao = 'ADMINISTRADOR';
      permissoes = {
        visualizarDashboard: true,
        gerenciarUsuarios: true,
        gerenciarEquipes: true,
        cadastrarVendas: true,
        visualizarVendas: true,
        editarVendas: true,
        excluirVendas: true,
        gerenciarConfiguracoes: true
      };
    } else if (currentUser.email?.includes('gerente')) {
      funcao = 'GERENTE';
      permissoes = {
        visualizarDashboard: true,
        gerenciarUsuarios: false,
        gerenciarEquipes: true,
        cadastrarVendas: true,
        visualizarVendas: true,
        editarVendas: true,
        excluirVendas: false,
        gerenciarConfiguracoes: false
      };
    }

    // Criar dados do usuário
    const userData = {
      id: currentUser.uid,
      nome: currentUser.displayName?.split(' ')[0] || 'Usuário',
      sobrenome: currentUser.displayName?.split(' ').slice(1).join(' ') || 'Sistema',
      email: currentUser.email || '',
      telefone: '(11) 00000-0000',
      funcao: funcao,
      permissoes: permissoes,
      ativo: true,
      dataCriacao: new Date().toISOString()
    };

    console.log('📝 Dados do usuário:', userData);

    // Salvar no Realtime Database
    const database = firebase.database();
    await database.ref(`usuarios/${currentUser.uid}`).set(userData);

    console.log('✅ Dados criados com sucesso no Realtime Database!');
    console.log('🎯 Função atribuída:', funcao);
    console.log('📋 Próximos passos:');
    console.log('   1. Faça logout');
    console.log('   2. Faça login novamente');
    console.log('   3. O sistema deve funcionar agora!');

  } catch (error) {
    console.error('❌ Erro ao criar dados:', error);
    console.log('🔧 Verifique:');
    console.log('   - Se as regras do Realtime Database permitem escrita');
    console.log('   - Se o Realtime Database está habilitado');
    console.log('   - Se há conexão com a internet');
  }
}

// Executar a função
createUserData(); 