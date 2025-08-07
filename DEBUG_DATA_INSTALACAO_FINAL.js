// Script para debug final da data de instalação
// Execute no console do navegador

async function debugDataInstalacaoFinal() {
  try {
    console.log('🔍 Debug final da data de instalação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
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
      console.log('5. 🔄 Verifique se a data aparece no campo "Instalação agendada para:"');
      console.log('6. 🔄 Atualize a página (F5)');
      console.log('7. 🔄 Verifique se a data ainda aparece');
      
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
      
      console.log('\n🔍 Verificando campo de data de instalação...');
      
      // Verificar se há o campo de data de instalação
      const dataInstalacaoElements = document.querySelectorAll('*');
      let campoDataInstalacao = null;
      
      dataInstalacaoElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Instalação agendada para:')) {
          campoDataInstalacao = element;
        }
      });
      
      if (campoDataInstalacao) {
        console.log('✅ Campo "Instalação agendada para:" encontrado');
        console.log('📊 Conteúdo:', campoDataInstalacao.textContent);
        
        // Verificar se há data ou "Não agendada"
        if (campoDataInstalacao.textContent.includes('Não agendada')) {
          console.log('❌ Campo mostra "Não agendada"');
          console.log('📝 A data não está sendo salva ou exibida corretamente');
        } else if (campoDataInstalacao.textContent.match(/\d{2}\/\d{2}\/\d{4}/)) {
          console.log('✅ Campo mostra uma data válida');
          console.log('📝 A data está sendo exibida corretamente');
        } else {
          console.log('⚠️ Campo mostra algo diferente');
          console.log('📊 Valor atual:', campoDataInstalacao.textContent);
        }
      } else {
        console.log('❌ Campo "Instalação agendada para:" não encontrado');
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
        console.log('\n🎯 PRONTO PARA TESTE!');
        console.log('📝 Clique no botão "Auditada" e observe os logs detalhados');
        console.log('📝 Verifique se a data aparece no campo após salvar');
      } else {
        console.log('\n❌ Nenhum botão "Auditada" encontrado');
        console.log('📝 Verifique se há vendas em atendimento');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ A data deve aparecer no campo "Instalação agendada para:"');
      console.log('2. ✅ A data deve persistir após atualizar a página');
      console.log('3. ✅ A data deve estar no formato DD/MM/YYYY');
      console.log('4. ✅ O campo não deve mostrar "Não agendada" após salvar');
      console.log('5. ✅ Os logs devem mostrar a data sendo processada corretamente');
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugDataInstalacaoFinal(); 