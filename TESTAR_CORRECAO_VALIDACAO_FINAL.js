// Script para testar se a correção final da validação funcionou
// Execute no console do navegador

async function testarCorrecaoValidacaoFinal() {
  try {
    console.log('🧪 Testando correção final da validação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando elementos da página...');
      
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
        console.log('2. 🔄 Verifique se o popup da data de instalação aparece (SEM erro de validação)');
        console.log('3. 🔄 Se aparecer, preencha a data e confirme');
        console.log('4. 🔄 Verifique se o status é alterado corretamente');
        
        console.log('\n📋 LOGS ESPERADOS:');
        console.log('- Debug processamento: { needsInstallDate: true, action: "auditada" }');
        console.log('- Abrindo diálogo de data de instalação');
        console.log('- Diálogo definido como true');
        console.log('- (Popup aparece para preencher data)');
        console.log('- handleInstallConfirm: { dataInstalacao, pendingAction }');
        console.log('- Resultado da validação: { valid: true, errors: [] }');
        console.log('- Chamando onStatusChange com status: auditada');
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
          console.log('\n❌ Ainda há erros de validação:');
          validacaoErrors.forEach(error => {
            console.log(`- ${error}`);
          });
        } else {
          console.log('\n✅ Nenhum erro de validação encontrado');
        }
        
        console.log('\n📊 RESUMO DO TESTE:');
        console.log(`- Vendas em atendimento: ${vendasEmAtendimento.length}`);
        console.log(`- Botões "Auditada": ${botoesAuditada.length}`);
        console.log(`- Erros de validação: ${validacaoErrors.length}`);
        
        if (botoesAuditada.length > 0 && validacaoErrors.length === 0) {
          console.log('\n🎉 PRONTO PARA TESTE!');
          console.log('📝 Clique em um botão "Auditada" - o popup deve aparecer sem erro');
        } else if (validacaoErrors.length > 0) {
          console.log('\n❌ Ainda há problemas de validação');
        } else {
          console.log('\nℹ️ Verifique se há vendas em atendimento');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoValidacaoFinal(); 