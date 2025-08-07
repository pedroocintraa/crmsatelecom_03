// Script para testar as correções dos problemas de status
// Execute no console do navegador

async function testarCorrecoesStatus() {
  try {
    console.log('🧪 Testando correções dos problemas de status...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes da venda');
      console.log('📝 Vá para uma venda específica: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando se a página carregou corretamente...');
      
      // Verificar se há conteúdo na página
      const bodyContent = document.body.innerHTML;
      console.log('📊 Tamanho do conteúdo da página:', bodyContent.length);
      
      if (bodyContent.length < 1000) {
        console.log('❌ Página parece estar vazia ou com pouco conteúdo');
      } else {
        console.log('✅ Página tem conteúdo');
      }
      
      // Verificar se há elementos específicos da aplicação
      const appElements = document.querySelectorAll('[class*="Card"], [class*="Button"], [class*="Badge"]');
      console.log(`📊 Elementos da aplicação: ${appElements.length}`);
      
      // Verificar se há elementos com "Status"
      const statusElements = document.querySelectorAll('*');
      let encontrouStatus = false;
      
      statusElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Status')) {
          encontrouStatus = true;
          console.log('✅ Elemento com "Status" encontrado:', element.textContent.substring(0, 100));
        }
      });
      
      if (!encontrouStatus) {
        console.log('❌ Nenhum elemento com "Status" encontrado');
      }
      
      // Verificar se há botões de ação
      const actionButtons = document.querySelectorAll('button');
      console.log(`📊 Botões encontrados: ${actionButtons.length}`);
      
      actionButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.length > 0) {
          console.log(`📊 Botão ${index + 1}: "${buttonText}"`);
        }
      });
      
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
        
        // Verificar se há erros específicos relacionados a status
        const statusErrors = errors.filter(error => 
          error.includes('status') || error.includes('Status') || error.includes('handleAction')
        );
        
        if (statusErrors.length > 0) {
          console.log('\n❌ Ainda há erros relacionados a status:');
          statusErrors.forEach(error => {
            console.log(`- ${error}`);
          });
        } else {
          console.log('\n✅ Nenhum erro relacionado a status encontrado');
        }
        
        if (encontrouStatus && appElements.length > 0 && statusErrors.length === 0) {
          console.log('\n🎉 SUCESSO: Problemas de status foram resolvidos!');
          console.log('📝 A página está funcionando corretamente');
        } else {
          console.log('\n❌ Página ainda não está funcionando corretamente');
          console.log('📝 Verifique os logs de debug para identificar o problema');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecoesStatus(); 