// Script para verificar se o usuário está logado e tem permissões
// Execute no console do navegador

async function verificarUsuarioLogado() {
  try {
    console.log('🔍 Verificando usuário logado...');
    
    // Verificar se há dados do usuário no localStorage
    const userData = localStorage.getItem('user');
    console.log('📊 Dados do usuário no localStorage:', userData);
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('✅ Usuário encontrado:', user);
        console.log('📊 Função do usuário:', user.funcao);
        
        const hasPermission = user.funcao === "ADMINISTRADOR_GERAL" || user.funcao === "SUPERVISOR";
        console.log('📊 Tem permissão para StatusSelector:', hasPermission);
        
        if (hasPermission) {
          console.log('✅ Usuário tem permissão para ver o StatusSelector');
        } else {
          console.log('❌ Usuário NÃO tem permissão para ver o StatusSelector');
          console.log('📝 Funções permitidas: ADMINISTRADOR_GERAL, SUPERVISOR');
          console.log('📝 Função atual:', user.funcao);
        }
      } catch (error) {
        console.log('❌ Erro ao parsear dados do usuário:', error);
      }
    } else {
      console.log('❌ Nenhum usuário encontrado no localStorage');
    }
    
    // Verificar se há dados do usuário no sessionStorage
    const sessionUserData = sessionStorage.getItem('user');
    console.log('📊 Dados do usuário no sessionStorage:', sessionUserData);
    
    // Verificar se há dados do usuário em outros locais
    const allKeys = Object.keys(localStorage);
    const userKeys = allKeys.filter(key => key.toLowerCase().includes('user'));
    console.log('📊 Chaves relacionadas ao usuário no localStorage:', userKeys);
    
    userKeys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`📊 ${key}:`, value);
    });
    
    // Verificar se há dados do usuário no sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    const sessionUserKeys = sessionKeys.filter(key => key.toLowerCase().includes('user'));
    console.log('📊 Chaves relacionadas ao usuário no sessionStorage:', sessionUserKeys);
    
    sessionUserKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      console.log(`📊 ${key}:`, value);
    });
    
    console.log('\n🛠️ Soluções possíveis:');
    console.log('1. 🔄 Faça logout e login novamente');
    console.log('2. 🔄 Verifique se está logado com a função correta');
    console.log('3. 🔄 Limpe o cache do navegador');
    console.log('4. 🔄 Verifique se o AuthContext está funcionando');
    
    // Verificar se há elementos de debug na página
    const debugElements = document.querySelectorAll('*');
    let encontrouDebug = false;
    
    debugElements.forEach(element => {
      if (element.textContent && element.textContent.includes('Debug:')) {
        encontrouDebug = true;
        console.log('✅ Elementos de debug encontrados na página');
        console.log('📊 Conteúdo:', element.textContent);
      }
    });
    
    if (!encontrouDebug) {
      console.log('❌ Elementos de debug não encontrados');
      console.log('📝 Isso pode indicar que o componente não está sendo renderizado');
    }
    
  } catch (error) {
    console.error('❌ Erro na verificação:', error);
  }
}

// Executar verificação
verificarUsuarioLogado(); 