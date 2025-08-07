// Script para testar se o problema do CheckCircle nos detalhes da venda foi resolvido
// Execute no console do navegador

async function testarCorrecaoCheckCircleDetalhes() {
  try {
    console.log('🧪 Testando correção do CheckCircle nos detalhes da venda...');
    
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
      
      // Verificar se há elementos com "Instalação agendada"
      const agendadaElements = document.querySelectorAll('*');
      let encontrouAgendada = false;
      
      agendadaElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Instalação agendada')) {
          encontrouAgendada = true;
          console.log('✅ Elemento com "Instalação agendada" encontrado:', element.textContent);
        }
      });
      
      if (!encontrouAgendada) {
        console.log('❌ Nenhum elemento com "Instalação agendada" encontrado');
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
        
        if (encontrouAgendada && appElements.length > 0 && checkCircleErrors.length === 0) {
          console.log('\n🎉 SUCESSO: Problema do CheckCircle foi resolvido!');
          console.log('📝 A página de detalhes está funcionando corretamente');
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
testarCorrecaoCheckCircleDetalhes(); 