// Script para testar se o problema do CheckCircle foi resolvido
// Execute no console do navegador

async function testarCorrecaoCheckCircle() {
  try {
    console.log('🧪 Testando correção do CheckCircle...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
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
      
      // Verificar se há elementos com "Vendas"
      const vendasElements = document.querySelectorAll('*');
      let encontrouVendas = false;
      
      vendasElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Vendas')) {
          encontrouVendas = true;
          console.log('✅ Elemento com "Vendas" encontrado:', element.textContent.substring(0, 100));
        }
      });
      
      if (!encontrouVendas) {
        console.log('❌ Nenhum elemento com "Vendas" encontrado');
      }
      
      // Verificar se há elementos com "Instalada em"
      const instaladaElements = document.querySelectorAll('*');
      let encontrouInstalada = false;
      
      instaladaElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Instalada em')) {
          encontrouInstalada = true;
          console.log('✅ Elemento com "Instalada em" encontrado:', element.textContent);
        }
      });
      
      if (!encontrouInstalada) {
        console.log('❌ Nenhum elemento com "Instalada em" encontrado');
      }
      
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
        
        // Verificar se há erros específicos do CheckCircle
        const checkCircleErrors = errors.filter(error => 
          error.includes('CheckCircle') || error.includes('not defined')
        );
        
        if (checkCircleErrors.length > 0) {
          console.log('\n❌ Ainda há erros relacionados ao CheckCircle:');
          checkCircleErrors.forEach(error => {
            console.log(`- ${error}`);
          });
        } else {
          console.log('\n✅ Nenhum erro relacionado ao CheckCircle encontrado');
        }
        
        if (encontrouVendas && appElements.length > 0 && checkCircleErrors.length === 0) {
          console.log('\n🎉 SUCESSO: Problema do CheckCircle foi resolvido!');
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
testarCorrecaoCheckCircle(); 