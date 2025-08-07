// Script para debugar o problema do StatusSelector
// Execute no console do navegador

async function debugStatusSelector() {
  try {
    console.log('🔍 Debugando StatusSelector...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há seção "Ações do Backoffice"
    const acoesBackoffice = document.querySelectorAll('[class*="Card"]');
    let encontrouAcoesBackoffice = false;
    
    acoesBackoffice.forEach(card => {
      if (card.textContent && card.textContent.includes('Ações do Backoffice')) {
        encontrouAcoesBackoffice = true;
        console.log('✅ Seção "Ações do Backoffice" encontrada');
      }
    });
    
    if (!encontrouAcoesBackoffice) {
      console.log('❌ Seção "Ações do Backoffice" não encontrada');
      return;
    }
    
    // Verificar se há StatusManager
    const statusManager = document.querySelectorAll('[class*="space-y-4"]');
    let encontrouStatusManager = false;
    
    statusManager.forEach(element => {
      if (element.textContent && element.textContent.includes('Status da Venda')) {
        encontrouStatusManager = true;
        console.log('✅ StatusManager encontrado');
      }
    });
    
    if (!encontrouStatusManager) {
      console.log('⚠️ StatusManager não encontrado');
    }
    
    // Verificar se há StatusSelector
    const statusSelector = document.querySelectorAll('[class*="Controle Administrativo"]');
    let encontrouStatusSelector = false;
    
    statusSelector.forEach(element => {
      if (element.textContent && element.textContent.includes('Controle Administrativo')) {
        encontrouStatusSelector = true;
        console.log('✅ StatusSelector encontrado');
      }
    });
    
    if (!encontrouStatusSelector) {
      console.log('❌ StatusSelector não encontrado');
      
      // Verificar se há elementos com "Crown" (ícone do StatusSelector)
      const crownElements = document.querySelectorAll('[class*="Crown"]');
      console.log(`📊 Elementos com Crown encontrados: ${crownElements.length}`);
      
      // Verificar se há selects
      const selects = document.querySelectorAll('select, [role="combobox"]');
      console.log(`📊 Selects encontrados: ${selects.length}`);
      
      selects.forEach((select, index) => {
        console.log(`📊 Select ${index + 1}:`, select.textContent?.substring(0, 100));
      });
      
      // Verificar se há elementos com "Alterar status"
      const alterarStatusElements = document.querySelectorAll('*');
      let encontrouAlterarStatus = false;
      
      alterarStatusElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Alterar status')) {
          encontrouAlterarStatus = true;
          console.log('✅ Elemento com "Alterar status" encontrado:', element);
        }
      });
      
      if (!encontrouAlterarStatus) {
        console.log('❌ Nenhum elemento com "Alterar status" encontrado');
      }
    }
    
    // Verificar se há erros no console
    console.log('\n🔍 Verificando possíveis problemas:');
    console.log('1. ✅ Verificar se o usuário está logado');
    console.log('2. ✅ Verificar se o usuário tem função ADMINISTRADOR_GERAL ou SUPERVISOR');
    console.log('3. ✅ Verificar se há erros de JavaScript');
    console.log('4. ✅ Verificar se o componente está sendo renderizado');
    
    // Verificar se há elementos com "pt-4 border-t" (div do StatusSelector)
    const divsComBorder = document.querySelectorAll('[class*="pt-4 border-t"]');
    console.log(`📊 Divs com "pt-4 border-t" encontrados: ${divsComBorder.length}`);
    
    divsComBorder.forEach((div, index) => {
      console.log(`📊 Div ${index + 1}:`, div.textContent?.substring(0, 100));
    });
    
    // Verificar se há elementos com "space-y-3" (div do StatusSelector)
    const divsComSpaceY3 = document.querySelectorAll('[class*="space-y-3"]');
    console.log(`📊 Divs com "space-y-3" encontrados: ${divsComSpaceY3.length}`);
    
    divsComSpaceY3.forEach((div, index) => {
      console.log(`📊 Div ${index + 1}:`, div.textContent?.substring(0, 100));
    });
    
    console.log('\n🛠️ Possíveis soluções:');
    console.log('1. 🔄 Recarregue a página (F5)');
    console.log('2. 🔄 Verifique se está logado como ADMINISTRADOR_GERAL ou SUPERVISOR');
    console.log('3. 🔄 Verifique o console do navegador para erros');
    console.log('4. 🔄 Tente acessar uma venda diferente');
    
    // Verificar se há erros no console
    const originalError = console.error;
    const errors = [];
    
    console.error = function(...args) {
      errors.push(args.join(' '));
      originalError.apply(console, args);
    };
    
    // Aguardar um pouco e verificar erros
    setTimeout(() => {
      if (errors.length > 0) {
        console.log('\n❌ Erros encontrados no console:');
        errors.forEach(error => {
          console.log(`- ${error}`);
        });
      } else {
        console.log('\n✅ Nenhum erro encontrado no console');
      }
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugStatusSelector(); 