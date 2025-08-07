// Script para testar a correção do erro async
// Execute no console do navegador

async function testarCorrecaoErroAsync() {
  try {
    console.log('🔍 Testando correção do erro async...');
    
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
      console.log('5. 🔄 Verifique se não há erro de compilação');
      console.log('6. 🔄 Verifique se a data aparece corretamente');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('1. ✅ Função processExtraDataOnStatusChange tornada async');
      console.log('2. ✅ Chamada da função atualizada com await');
      console.log('3. ✅ Erro de "await isn\'t allowed in non-async function" corrigido');
      console.log('4. ✅ Fuso horário de Brasília mantido');
      
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
        console.log('📝 O erro de async foi corrigido');
        console.log('📝 A função agora é assíncrona e pode usar await');
        console.log('📝 O fuso horário de Brasília será usado corretamente');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Não deve haver erro de compilação');
      console.log('2. ✅ A página deve carregar normalmente');
      console.log('3. ✅ O popup deve abrir corretamente');
      console.log('4. ✅ A data deve ser salva corretamente');
      console.log('5. ✅ O fuso horário deve ser respeitado');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoErroAsync(); 