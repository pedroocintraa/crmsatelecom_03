// Script para debugar o problema da página branca
// Execute no console do navegador

async function debugPaginaBranca() {
  try {
    console.log('🔍 Debugando problema da página branca...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há conteúdo na página
    const bodyContent = document.body.innerHTML;
    console.log('📊 Tamanho do conteúdo da página:', bodyContent.length);
    
    if (bodyContent.length < 1000) {
      console.log('❌ Página parece estar vazia ou com pouco conteúdo');
    } else {
      console.log('✅ Página tem conteúdo');
    }
    
    // Verificar se há elementos de React
    const reactElements = document.querySelectorAll('[data-reactroot], [data-reactid]');
    console.log(`📊 Elementos React encontrados: ${reactElements.length}`);
    
    // Verificar se há elementos com classes do Tailwind
    const tailwindElements = document.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="p-"]');
    console.log(`📊 Elementos com classes Tailwind: ${tailwindElements.length}`);
    
    // Verificar se há elementos específicos da aplicação
    const appElements = document.querySelectorAll('[class*="Card"], [class*="Button"], [class*="Badge"]');
    console.log(`📊 Elementos da aplicação: ${appElements.length}`);
    
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
    
    console.log('\n🔍 Possíveis causas da página branca:');
    console.log('1. ❌ Erro de JavaScript que quebra a renderização');
    console.log('2. ❌ Problema na atualização de estado após mudança de status');
    console.log('3. ❌ Loop infinito de re-renderização');
    console.log('4. ❌ Problema na busca de dados do Firebase');
    console.log('5. ❌ Problema no AuthContext após mudança de status');
    
    console.log('\n🛠️ Soluções possíveis:');
    console.log('1. 🔄 Recarregue a página (F5)');
    console.log('2. 🔄 Limpe o cache do navegador');
    console.log('3. 🔄 Verifique o console para erros');
    console.log('4. 🔄 Tente acessar uma URL diferente e voltar');
    console.log('5. 🔄 Faça logout e login novamente');
    
    // Verificar se há elementos de erro
    const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"], [class*="destructive"]');
    console.log(`📊 Elementos de erro: ${errorElements.length}`);
    
    errorElements.forEach((element, index) => {
      console.log(`📊 Elemento de erro ${index + 1}:`, element.textContent?.substring(0, 100));
    });
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugPaginaBranca(); 