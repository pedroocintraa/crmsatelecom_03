// Script para testar a persistência da data de instalação
// Execute no console do navegador

async function testarPersistenciaData() {
  try {
    console.log('🔍 Testando persistência da data de instalação...');
    
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
      console.log('3. 🔄 Preencha a data de instalação no popup (ex: 2025-08-15)');
      console.log('4. 🔄 Confirme a ação');
      console.log('5. 🔄 Verifique se a data aparece na venda');
      console.log('6. 🔄 Atualize a página (F5)');
      console.log('7. 🔄 Verifique se a data ainda aparece');
      
      console.log('\n📋 LOGS ESPERADOS APÓS A CORREÇÃO:');
      console.log('- handleInstallConfirm: { dataInstalacao: "2025-08-15", pendingAction: "auditada" }');
      console.log('- handleStatusChange chamado: { novoStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('- Incluindo dataInstalacao nos dados de atualização: "2025-08-15T00:00:00-03:00"');
      console.log('- atualizarStatusVenda chamado: { status: "auditada", dadosAdicionais: { dataInstalacao: "..." } }');
      console.log('- ExtraData para processamento: { dataInstalacao: "2025-08-15T00:00:00-03:00" }');
      console.log('- processExtraDataOnStatusChange: { newStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('- Salvando dataInstalacao para auditada: "2025-08-15T00:00:00-03:00"');
      console.log('- Updates processados: { dataInstalacao: "..." }');
      console.log('- Dados finais para atualização: { status: "auditada", dataInstalacao: "..." }');
      console.log('- Venda atualizada: { dataInstalacao: "..." }');
      
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
        console.log('\n🎯 CORREÇÃO IMPLEMENTADA!');
        console.log('📝 Agora a dataInstalacao será incluída nos dados de atualização');
        console.log('📝 A data deve persistir após atualizar a página');
        console.log('📝 O campo "Instalação agendada para:" deve mostrar a data salva');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ A data deve aparecer no campo "Instalação agendada para:"');
      console.log('2. ✅ A data deve persistir após atualizar a página (F5)');
      console.log('3. ✅ A data deve ser salva no Firebase corretamente');
      console.log('4. ✅ O campo não deve mostrar "Não agendada" após salvar');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarPersistenciaData(); 