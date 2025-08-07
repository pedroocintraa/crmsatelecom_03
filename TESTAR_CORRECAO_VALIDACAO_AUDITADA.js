// Script para testar se a correção da validação para status auditada funcionou
// Execute no console do navegador

async function testarCorrecaoValidacaoAuditada() {
  try {
    console.log('🧪 Testando correção da validação para status auditada...');
    
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
      let vendasAuditadas = [];
      
      vendasElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Em Atendimento')) {
          vendasEmAtendimento.push(element);
        }
        if (element.textContent && element.textContent.includes('Auditada')) {
          vendasAuditadas.push(element);
        }
      });
      
      console.log(`📊 Vendas em atendimento encontradas: ${vendasEmAtendimento.length}`);
      console.log(`📊 Vendas auditadas encontradas: ${vendasAuditadas.length}`);
      
      // Verificar se há botões de ação
      const actionButtons = document.querySelectorAll('button');
      let botoesAuditada = [];
      let botoesPerdida = [];
      
      actionButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.toLowerCase().includes('auditada')) {
          botoesAuditada.push(button);
          console.log(`✅ Botão "Auditada" encontrado: "${buttonText}"`);
        }
        if (buttonText && buttonText.toLowerCase().includes('perdida')) {
          botoesPerdida.push(button);
          console.log(`✅ Botão "Perdida" encontrado: "${buttonText}"`);
        }
      });
      
      console.log(`📊 Botões "Auditada" encontrados: ${botoesAuditada.length}`);
      console.log(`📊 Botões "Perdida" encontrados: ${botoesPerdida.length}`);
      
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
        
        // Resumo do teste
        console.log('\n📊 RESUMO DO TESTE:');
        console.log(`- Vendas em atendimento: ${vendasEmAtendimento.length}`);
        console.log(`- Vendas auditadas: ${vendasAuditadas.length}`);
        console.log(`- Botões "Auditada": ${botoesAuditada.length}`);
        console.log(`- Botões "Perdida": ${botoesPerdida.length}`);
        console.log(`- Erros de validação: ${validacaoErrors.length}`);
        
        if (vendasEmAtendimento.length > 0 && botoesAuditada.length > 0 && validacaoErrors.length === 0) {
          console.log('\n🎉 SUCESSO: Correção da validação funcionou!');
          console.log('📝 Agora você pode testar:');
          console.log('1. 🔄 Clique no botão "Auditada" de uma venda em atendimento');
          console.log('2. 🔄 Verifique se o popup da data de instalação aparece');
          console.log('3. 🔄 Preencha a data e confirme');
          console.log('4. 🔄 Verifique se não há mais erro de validação');
        } else if (validacaoErrors.length > 0) {
          console.log('\n❌ Ainda há erros de validação');
          console.log('📝 A correção pode não ter sido aplicada completamente');
        } else {
          console.log('\nℹ️ Teste inconclusivo - verifique se há vendas em atendimento');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoValidacaoAuditada(); 