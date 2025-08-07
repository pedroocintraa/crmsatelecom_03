// Script para debug completo da data de instalação
// Execute no console do navegador

async function debugCompletoDataInstalacao() {
  try {
    console.log('🔍 Debug completo da data de instalação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🎯 INSTRUÇÕES PARA TESTE:');
      console.log('1. 🔄 Encontre uma venda com status "em atendimento"');
      console.log('2. 🔄 Clique no botão "Auditada"');
      console.log('3. 🔄 Preencha a data de instalação no popup (ex: 2025-08-07)');
      console.log('4. 🔄 Confirme a ação');
      console.log('5. 🔄 Observe TODOS os logs detalhados no console');
      console.log('6. 🔄 Verifique se a data aparece no campo');
      
      console.log('\n📋 LOGS ESPERADOS (ORDEM):');
      console.log('1. handleInstallConfirm: { dataInstalacao: "2025-08-07", pendingAction: "auditada" }');
      console.log('2. handleStatusChange chamado: { novoStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('3. Incluindo dataInstalacao nos dados de atualização: "2025-08-07T00:00:00-03:00"');
      console.log('4. atualizarStatusVenda chamado: { status: "auditada", dadosAdicionais: { dataInstalacao: "..." } }');
      console.log('5. ExtraData para processamento: { dataInstalacao: "2025-08-07T00:00:00-03:00" }');
      console.log('6. processExtraDataOnStatusChange: { newStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('7. Salvando dataInstalacao para auditada: "2025-08-07T00:00:00-03:00"');
      console.log('8. Updates processados: { dataInstalacao: "..." }');
      console.log('9. Dados finais para atualização: { status: "auditada", dataInstalacao: "..." }');
      console.log('10. Venda atualizada: { dataInstalacao: "2025-08-07T00:00:00-03:00" }');
      console.log('11. dataInstalacao na venda atualizada: "2025-08-07T00:00:00-03:00"');
      console.log('12. Renderizando campo dataInstalacao: "2025-08-07T00:00:00-03:00"');
      console.log('13. formatarData chamado com: "2025-08-07T00:00:00-03:00"');
      console.log('14. formatarDataBrasil recebeu: "2025-08-07T00:00:00-03:00"');
      console.log('15. Extraindo parte da data: "2025-08-07"');
      console.log('16. Data formatada: "07/08/2025"');
      console.log('17. formatarData retornou: "07/08/2025"');
      
      console.log('\n🔍 Verificando vendas em atendimento...');
      
      // Verificar se há vendas em atendimento
      const vendasElements = document.querySelectorAll('*');
      let vendasEmAtendimento = [];
      
      vendasElements.forEach(element => {
        if (element.textContent && element.textContent.includes('em atendimento')) {
          vendasEmAtendimento.push(element);
        }
      });
      
      console.log(`📊 Vendas em atendimento encontradas: ${vendasEmAtendimento.length}`);
      
      if (vendasEmAtendimento.length === 0) {
        console.log('\n❌ Nenhuma venda em atendimento encontrada');
        console.log('📝 Crie uma venda e mude o status para "em atendimento" primeiro');
      } else {
        console.log('\n✅ Vendas em atendimento encontradas!');
        console.log('🎉 PRONTO PARA TESTE!');
        console.log('📝 Clique no botão "Auditada" de uma venda em atendimento');
        console.log('📝 Observe TODOS os logs detalhados no console');
      }
      
      // Verificar se há botões de ação
      const actionButtons = document.querySelectorAll('button');
      let botoesAuditada = [];
      
      actionButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.toLowerCase().includes('auditada')) {
          botoesAuditada.push(button);
        }
      });
      
      console.log(`📊 Botões "Auditada" encontrados: ${botoesAuditada.length}`);
      
      if (botoesAuditada.length > 0) {
        console.log('\n🎯 DEBUG COMPLETO IMPLEMENTADO!');
        console.log('📝 Agora você verá TODOS os logs detalhados');
        console.log('📝 Isso nos ajudará a identificar exatamente onde está o problema');
        console.log('📝 Execute o teste e copie TODOS os logs para análise');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Copie TODOS os logs que aparecem no console');
      console.log('2. ✅ Verifique se todos os 17 logs esperados aparecem');
      console.log('3. ✅ Se algum log não aparecer, isso indica onde está o problema');
      console.log('4. ✅ Se a data não aparecer no campo, verifique os logs de renderização');
      console.log('5. ✅ Se a data aparecer incorreta, verifique os logs de formatação');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugCompletoDataInstalacao(); 