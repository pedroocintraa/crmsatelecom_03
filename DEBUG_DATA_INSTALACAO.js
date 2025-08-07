// Script para debug da data de instalação
// Execute no console do navegador

async function debugDataInstalacao() {
  try {
    console.log('🔍 Debug da data de instalação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando vendas auditadas...');
      
      // Verificar se há vendas auditadas
      const vendasElements = document.querySelectorAll('*');
      let vendasAuditadas = [];
      
      vendasElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Auditada')) {
          vendasAuditadas.push(element);
        }
      });
      
      console.log(`📊 Vendas auditadas encontradas: ${vendasAuditadas.length}`);
      
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
        console.log('2. 🔄 Preencha a data de instalação no popup');
        console.log('3. 🔄 Confirme a ação');
        console.log('4. 🔄 Observe os logs detalhados no console');
        
        console.log('\n📋 LOGS ESPERADOS:');
        console.log('- handleInstallConfirm: { dataInstalacao, pendingAction }');
        console.log('- atualizarStatusVenda chamado: { status: "auditada", dadosAdicionais }');
        console.log('- ExtraData para processamento: { dataInstalacao: "..." }');
        console.log('- processExtraDataOnStatusChange: { newStatus: "auditada", extraData }');
        console.log('- Salvando dataInstalacao para auditada: "..."');
        console.log('- Updates processados: { dataInstalacao: "..." }');
        console.log('- Dados finais para atualização: { status, dataInstalacao }');
        console.log('- Venda atualizada: { dataInstalacao: "..." }');
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
        
        console.log('\n📊 RESUMO DO DEBUG:');
        console.log(`- Vendas auditadas: ${vendasAuditadas.length}`);
        console.log(`- Botões "Auditada": ${botoesAuditada.length}`);
        console.log(`- Erros: ${errors.length}`);
        
        if (botoesAuditada.length > 0) {
          console.log('\n🎉 PRONTO PARA TESTE!');
          console.log('📝 Clique em um botão "Auditada" e observe os logs detalhados');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugDataInstalacao(); 