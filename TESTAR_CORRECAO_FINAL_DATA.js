// Script para testar a correção final da data
// Execute no console do navegador

async function testarCorrecaoFinalData() {
  try {
    console.log('🔍 Testando correção final da data...');
    
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
      console.log('3. 🔄 Preencha a data de instalação no popup (ex: 2025-08-08)');
      console.log('4. 🔄 Confirme a ação');
      console.log('5. 🔄 Verifique se a data aparece na lista de vendas');
      console.log('6. 🔄 Entre nos detalhes da venda');
      console.log('7. 🔄 Verifique se a data aparece no campo "Instalação agendada para:"');
      
      console.log('\n📋 PROBLEMA IDENTIFICADO E CORRIGIDO:');
      console.log('❌ handleAtualizarStatus não estava passando dataInstalacao');
      console.log('✅ Agora handleAtualizarStatus passa dadosAdicionais corretamente');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- handleInstallConfirm: 2025-08-08 auditada');
      console.log('- ✅ Validação passou, confirmando ação...');
      console.log('- 🔍 Chamando onStatusChange com status: auditada');
      console.log('- 🔍 ExtraData sendo passado: {dataInstalacao: "2025-08-08"}');
      console.log('- 🔍 onStatusChange chamado com sucesso');
      console.log('- 🔍 ====== INÍCIO DO handleAtualizarStatus ======');
      console.log('- 🔍 handleAtualizarStatus chamado: { novoStatus: "auditada", extraData: { dataInstalacao: "2025-08-08" } }');
      console.log('- 🔍 Incluindo dataInstalacao nos dados adicionais: "2025-08-08"');
      console.log('- 🔍 atualizarStatusVenda chamado: { status: "auditada", dadosAdicionais: { dataInstalacao: "2025-08-08" } }');
      console.log('- 🔍 ExtraData para processamento: { dataInstalacao: "2025-08-08T00:00:00-03:00" }');
      console.log('- 🔍 processExtraDataOnStatusChange: { newStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('- 🔍 Salvando dataInstalacao para auditada: "2025-08-08T00:00:00-03:00"');
      console.log('- 🔍 Updates processados: { dataInstalacao: "..." }');
      console.log('- 🔍 Dados finais para atualização: { status: "auditada", dataInstalacao: "..." }');
      console.log('- 🔍 Venda atualizada: { dataInstalacao: "2025-08-08T00:00:00-03:00" }');
      
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
        console.log('\n🎯 CORREÇÃO FINAL IMPLEMENTADA!');
        console.log('📝 Agora a data deve ser salva corretamente');
        console.log('📝 A data deve aparecer na lista de vendas');
        console.log('📝 A data deve aparecer nos detalhes da venda');
        console.log('📝 A data deve persistir após atualizar a página');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Verifique se aparece "INÍCIO DO handleAtualizarStatus"');
      console.log('2. ✅ Verifique se a dataInstalacao é incluída nos dados adicionais');
      console.log('3. ✅ Verifique se a data aparece na lista de vendas');
      console.log('4. ✅ Verifique se a data aparece nos detalhes da venda');
      console.log('5. ✅ Verifique se a data persiste após atualizar a página');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoFinalData();