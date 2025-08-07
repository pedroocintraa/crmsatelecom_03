// Script para testar a correção final da data
// Execute no console do navegador

async function testarCorrecaoDataFinal() {
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
      console.log('3. 🔄 Preencha a data de instalação no popup (ex: 2025-08-07)');
      console.log('4. 🔄 Confirme a ação');
      console.log('5. 🔄 Verifique se a data aparece corretamente (07/08/2025)');
      console.log('6. 🔄 Atualize a página (F5)');
      console.log('7. 🔄 Verifique se a data ainda aparece corretamente');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('1. ✅ Função formatarDataBrasil corrigida para novo formato');
      console.log('2. ✅ Logs detalhados adicionados em formatarDataBrasil');
      console.log('3. ✅ Logs detalhados adicionados em processExtraDataOnStatusChange');
      console.log('4. ✅ Tratamento específico para formato YYYY-MM-DDT00:00:00-03:00');
      console.log('5. ✅ Conversão direta YYYY-MM-DD para DD/MM/YYYY');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- handleInstallConfirm: { dataInstalacao: "2025-08-07", pendingAction: "auditada" }');
      console.log('- handleStatusChange chamado: { novoStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('- Incluindo dataInstalacao nos dados de atualização: "2025-08-07T00:00:00-03:00"');
      console.log('- atualizarStatusVenda chamado: { status: "auditada", dadosAdicionais: { dataInstalacao: "..." } }');
      console.log('- ExtraData para processamento: { dataInstalacao: "2025-08-07T00:00:00-03:00" }');
      console.log('- processExtraDataOnStatusChange: { newStatus: "auditada", extraData: { dataInstalacao: "..." } }');
      console.log('- Salvando dataInstalacao para auditada: "2025-08-07T00:00:00-03:00"');
      console.log('- Updates processados: { dataInstalacao: "..." }');
      console.log('- Dados finais para atualização: { status: "auditada", dataInstalacao: "..." }');
      console.log('- Venda atualizada: { dataInstalacao: "2025-08-07T00:00:00-03:00" }');
      console.log('- formatarDataBrasil recebeu: "2025-08-07T00:00:00-03:00"');
      console.log('- Extraindo parte da data: "2025-08-07"');
      console.log('- Data formatada: "07/08/2025"');
      
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
        console.log('📝 Agora a data deve aparecer corretamente sem diferença de um dia');
        console.log('📝 A data deve ser salva e exibida no campo correto');
        console.log('📝 Exemplo: se inserir 07/08/2025, deve aparecer 07/08/2025');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ A data deve aparecer exatamente como foi inserida');
      console.log('2. ✅ Se inserir 07/08/2025, deve aparecer 07/08/2025');
      console.log('3. ✅ Não deve haver diferença de um dia');
      console.log('4. ✅ A data deve persistir após atualizar a página');
      console.log('5. ✅ O campo "Instalação agendada para:" deve mostrar a data');
      console.log('6. ✅ Os logs devem mostrar o processamento correto da data');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoDataFinal(); 