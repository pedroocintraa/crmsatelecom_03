// Script para testar se o problema da página branca foi resolvido
// Execute no console do navegador

async function testarCorrecaoPaginaBranca() {
  try {
    console.log('🧪 Testando correção da página branca...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para os logs aparecerem
    setTimeout(() => {
      console.log('\n🔍 Verificando logs de debug...');
      
      // Verificar se há elementos de debug na página
      const debugElements = document.querySelectorAll('*');
      let encontrouDebug = false;
      
      debugElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Carregando vendas')) {
          encontrouDebug = true;
          console.log('✅ Logs de debug encontrados na página');
        }
      });
      
      if (!encontrouDebug) {
        console.log('❌ Logs de debug não encontrados');
        console.log('📝 Isso pode indicar que o componente não está sendo renderizado');
      }
      
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
      
      // Verificar se há elementos de loading
      const loadingElements = document.querySelectorAll('[class*="loading"], [class*="spinner"], [class*="Loading"]');
      console.log(`📊 Elementos de loading: ${loadingElements.length}`);
      
      // Verificar se há elementos com "Carregando"
      const carregandoElements = document.querySelectorAll('*');
      let encontrouCarregando = false;
      
      carregandoElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Carregando')) {
          encontrouCarregando = true;
          console.log('✅ Elemento com "Carregando" encontrado:', element.textContent);
        }
      });
      
      if (!encontrouCarregando) {
        console.log('❌ Nenhum elemento com "Carregando" encontrado');
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
        
        if (encontrouVendas && appElements.length > 0) {
          console.log('\n🎉 SUCESSO: Página está funcionando corretamente!');
          console.log('📝 O problema da página branca foi resolvido');
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
testarCorrecaoPaginaBranca(); 