// Script para debugar a estrutura dos documentos
// Execute no console do navegador na página de detalhes da venda

async function debugDocumentosEstrutura() {
  try {
    console.log('🔍 Debugando estrutura dos documentos...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página de detalhes de venda detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 INSTRUÇÕES:');
      console.log('1. Este script vai mostrar EXATAMENTE como os documentos estão estruturados');
      console.log('2. Vai ajudar a identificar por que "nenhum documento válido" é encontrado');
      console.log('3. Execute na página de uma venda que TEM documentos anexados');
      
      console.log('\n📋 VERIFICANDO VARIÁVEIS REACT...');
      
      // Tentar acessar os dados da venda através do React DevTools
      try {
        // Procurar elementos React
        const reactElements = document.querySelectorAll('[data-reactroot], #root *');
        let vendaData = null;
        
        for (let element of reactElements) {
          const reactInstance = element._reactInternalInstance || 
                               element.__reactInternalInstance || 
                               Object.keys(element).find(key => key.startsWith('__reactInternalInstance'));
          
          if (reactInstance) {
            console.log('🔍 Elemento React encontrado');
            break;
          }
        }
        
        console.log('⚠️ Não foi possível acessar dados React diretamente');
        console.log('📝 Vamos usar outros métodos...');
        
      } catch (reactError) {
        console.log('⚠️ Erro ao acessar React:', reactError);
      }
      
      console.log('\n📋 PROCURANDO DADOS NO HTML...');
      
      // Procurar por URLs do Firebase Storage no HTML
      const allElements = document.querySelectorAll('*');
      let firebaseUrls = [];
      let documentSections = [];
      
      allElements.forEach((element, index) => {
        const text = element.textContent || '';
        const html = element.innerHTML || '';
        
        // Procurar URLs do Firebase Storage
        if (text.includes('firebasestorage.googleapis.com') || html.includes('firebasestorage.googleapis.com')) {
          firebaseUrls.push({
            element: element.tagName,
            text: text.substring(0, 200),
            html: html.substring(0, 200)
          });
        }
        
        // Procurar seções de documentos
        if (text.toLowerCase().includes('documento') && text.length > 5 && text.length < 500) {
          documentSections.push({
            element: element.tagName,
            text: text.substring(0, 100)
          });
        }
      });
      
      console.log(`🔍 URLs do Firebase Storage encontradas: ${firebaseUrls.length}`);
      firebaseUrls.forEach((url, index) => {
        console.log(`📄 URL ${index + 1}:`, url);
      });
      
      console.log(`\n🔍 Seções de documentos encontradas: ${documentSections.length}`);
      documentSections.forEach((section, index) => {
        console.log(`📂 Seção ${index + 1}:`, section);
      });
      
      console.log('\n📋 SIMULANDO A FUNÇÃO baixarTodosDocumentos...');
      
      // Tentar encontrar dados através do localStorage
      try {
        const keys = Object.keys(localStorage);
        console.log('🔍 Chaves no localStorage:', keys);
        
        keys.forEach(key => {
          if (key.includes('venda') || key.includes('documento')) {
            const value = localStorage.getItem(key);
            console.log(`📝 ${key}:`, value?.substring(0, 200));
          }
        });
      } catch (storageError) {
        console.log('⚠️ Erro ao acessar localStorage:', storageError);
      }
      
      console.log('\n📋 VERIFICANDO NETWORK REQUESTS...');
      
      // Instruções para verificar Network tab
      console.log('🔍 INSTRUÇÕES PARA VERIFICAR DADOS:');
      console.log('1. Abra o DevTools (F12)');
      console.log('2. Vá na aba "Network"');
      console.log('3. Atualize a página (F5)');
      console.log('4. Procure por requisições que retornam dados da venda');
      console.log('5. Clique numa requisição e veja a "Response"');
      console.log('6. Procure pelo campo "documentos" na resposta');
      console.log('7. Copie a estrutura completa dos documentos aqui');
      
      console.log('\n📋 EXEMPLO DE ESTRUTURA ESPERADA:');
      console.log(`{
  "documentos": {
    "comprovanteEndereco": [
      {
        "id": "doc_123",
        "nome": "arquivo.jpeg",
        "tipo": "image/jpeg",
        "conteudo": "https://firebasestorage.googleapis.com/...",
        "dataUpload": "2025-01-01T00:00:00.000Z"
      }
    ],
    "documentoClienteFrente": [...],
    "documentoClienteVerso": [...],
    "fachadaCasa": [...],
    "selfieCliente": [...]
  }
}`);
      
      console.log('\n📋 PROBLEMAS POSSÍVEIS:');
      console.log('❌ Documentos podem estar undefined ou null');
      console.log('❌ Campo "conteudo" pode estar vazio');
      console.log('❌ Array de documentos pode estar vazio');
      console.log('❌ Estrutura pode estar diferente do esperado');
      console.log('❌ Dados podem não estar carregados ainda');
      
      console.log('\n📋 PRÓXIMOS PASSOS:');
      console.log('1. 📝 Execute o comando: JSON.stringify(venda.documentos, null, 2)');
      console.log('2. 📝 Se não funcionar, copie a estrutura da aba Network');
      console.log('3. 📝 Cole a estrutura aqui para eu analisar');
      console.log('4. 📝 Vou ajustar a função baixarTodosDocumentos conforme necessário');
      
      // Tentar executar a função diretamente se existir
      console.log('\n🧪 TENTANDO EXECUTAR FUNÇÃO DIRETAMENTE...');
      
      try {
        // Verificar se a função existe no escopo global
        if (typeof window.baixarTodosDocumentos === 'function') {
          console.log('🔍 Função baixarTodosDocumentos encontrada no escopo global');
        } else {
          console.log('⚠️ Função baixarTodosDocumentos não encontrada no escopo global');
        }
      } catch (funcError) {
        console.log('⚠️ Erro ao verificar função:', funcError);
      }
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugDocumentosEstrutura();