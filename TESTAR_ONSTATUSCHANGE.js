// Script para testar se o onStatusChange está sendo chamado
// Execute no console do navegador

async function testarOnStatusChange() {
  try {
    console.log('🔍 Testando se onStatusChange está sendo chamado...');
    
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
      console.log('5. 🔄 Observe os logs do onStatusChange');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- handleInstallConfirm: 2025-08-07 auditada');
      console.log('- ✅ Validação passou, confirmando ação...');
      console.log('- 🔍 Chamando onStatusChange com status: auditada');
      console.log('- 🔍 ExtraData sendo passado: { dataInstalacao: "2025-08-07" }');
      console.log('- 🔍 onStatusChange chamado com sucesso');
      console.log('- 🔍 handleStatusChange chamado: { novoStatus: "auditada", extraData: { dataInstalacao: "2025-08-07" } }');
      console.log('- 🔍 Incluindo dataInstalacao nos dados de atualização: "2025-08-07T00:00:00-03:00"');
      
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
        console.log('\n🎯 TESTE IMPLEMENTADO!');
        console.log('📝 Agora você verá se o onStatusChange está sendo chamado');
        console.log('📝 Se não aparecer o log "onStatusChange chamado com sucesso", há um problema');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Verifique se aparece "onStatusChange chamado com sucesso"');
      console.log('2. ✅ Verifique se aparece "handleStatusChange chamado"');
      console.log('3. ✅ Se não aparecer, o problema está na comunicação entre componentes');
      console.log('4. ✅ Se aparecer, o problema está no processamento da data');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarOnStatusChange(); 