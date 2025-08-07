// Script para debug detalhado da validação do status auditada
// Execute no console do navegador

async function debugValidacaoAuditada() {
  try {
    console.log('🔍 Debug detalhado da validação do status auditada...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando vendas em atendimento...');
      
      // Verificar se há vendas em atendimento
      const vendasElements = document.querySelectorAll('*');
      let vendasEmAtendimento = [];
      
      vendasElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Em Atendimento')) {
          vendasEmAtendimento.push(element);
        }
      });
      
      console.log(`📊 Vendas em atendimento encontradas: ${vendasEmAtendimento.length}`);
      
      // Verificar se há botões de ação
      const actionButtons = document.querySelectorAll('button');
      let botoesAuditada = [];
      
      actionButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.toLowerCase().includes('auditada')) {
          botoesAuditada.push(button);
          console.log(`✅ Botão "Auditada" encontrado: "${buttonText}"`);
        }
      });
      
      console.log(`📊 Botões "Auditada" encontrados: ${botoesAuditada.length}`);
      
      if (botoesAuditada.length > 0) {
        console.log('\n🎯 INSTRUÇÕES PARA TESTE:');
        console.log('1. 🔄 Clique no botão "Auditada" de uma venda em atendimento');
        console.log('2. 🔄 Observe os logs detalhados no console');
        console.log('3. 🔄 Verifique se o popup aparece ou se há erro');
        console.log('4. 🔄 Se houver erro, os logs mostrarão exatamente onde está o problema');
        
        console.log('\n📋 LOGS ESPERADOS:');
        console.log('- validateStatusTransition Debug: mostra dados da venda e target status');
        console.log('- Target Config: mostra configuração do status auditada');
        console.log('- Validando campos obrigatórios: lista campos a verificar');
        console.log('- Verificando campo: mostra cada campo sendo verificado');
        console.log('- Pulando validação de dataInstalacao: se a correção funcionou');
        console.log('- Resultado da validação: mostra se passou ou falhou');
      } else {
        console.log('\n❌ Nenhum botão "Auditada" encontrado');
        console.log('📝 Verifique se há vendas em atendimento na página');
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
        
        // Verificar se há erros específicos de validação
        const validacaoErrors = errors.filter(error => 
          error.includes('validação') || error.includes('obrigatória') || error.includes('obrigatório')
        );
        
        if (validacaoErrors.length > 0) {
          console.log('\n❌ Erros de validação encontrados:');
          validacaoErrors.forEach(error => {
            console.log(`- ${error}`);
          });
        } else {
          console.log('\n✅ Nenhum erro de validação encontrado');
        }
        
        console.log('\n📊 RESUMO DO DEBUG:');
        console.log(`- Vendas em atendimento: ${vendasEmAtendimento.length}`);
        console.log(`- Botões "Auditada": ${botoesAuditada.length}`);
        console.log(`- Erros de validação: ${validacaoErrors.length}`);
        
        if (botoesAuditada.length > 0) {
          console.log('\n🎯 PRONTO PARA TESTE!');
          console.log('📝 Clique em um botão "Auditada" e observe os logs detalhados');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugValidacaoAuditada(); 