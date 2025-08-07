// Script para testar a correção do StatusSelector
// Execute no console do navegador

async function testarCorrecaoStatusSelector() {
  try {
    console.log('🔍 Testando correção do StatusSelector...');
    
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
      console.log('1. 🔄 Verifique se a página carrega sem erro');
      console.log('2. 🔄 Verifique se o StatusSelector aparece (para ADMINISTRADOR_GERAL/SUPERVISOR)');
      console.log('3. 🔄 Teste o dropdown de status');
      console.log('4. 🔄 Selecione "Auditada" e preencha a data');
      console.log('5. 🔄 Confirme a ação');
      console.log('6. 🔄 Verifique se a data é salva corretamente');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('1. ✅ Função handleConfirm tornada async');
      console.log('2. ✅ await import() agora funciona corretamente');
      console.log('3. ✅ Erro de sintaxe corrigido');
      console.log('4. ✅ Fuso horário de Brasília mantido');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- handleConfirm: processando status "auditada"');
      console.log('- Importando converterDataParaBrasilISO');
      console.log('- dataInstalacaoISO: "2025-08-07T00:00:00-03:00"');
      console.log('- onStatusChange chamado com extraData');
      console.log('- Venda atualizada com sucesso');
      
      console.log('\n🔍 Verificando StatusSelector...');
      
      // Verificar se há o StatusSelector na página
      const statusSelectorElements = document.querySelectorAll('*');
      let statusSelectorFound = false;
      
      statusSelectorElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Controle Administrativo')) {
          statusSelectorFound = true;
        }
      });
      
      if (statusSelectorFound) {
        console.log('✅ StatusSelector encontrado na página');
        console.log('📝 Você deve ter permissões de ADMINISTRADOR_GERAL ou SUPERVISOR');
      } else {
        console.log('❌ StatusSelector não encontrado');
        console.log('📝 Verifique se você tem permissões de ADMINISTRADOR_GERAL ou SUPERVISOR');
        console.log('📝 Ou se a venda está em um status que permite mudanças');
      }
      
      // Verificar se há dropdown de status
      const selectElements = document.querySelectorAll('select, [role="combobox"]');
      console.log(`📊 Elementos de seleção encontrados: ${selectElements.length}`);
      
      if (selectElements.length > 0) {
        console.log('✅ Dropdown de status encontrado');
        console.log('🎉 PRONTO PARA TESTE!');
        console.log('📝 Teste o dropdown de status');
      } else {
        console.log('❌ Dropdown de status não encontrado');
        console.log('📝 Verifique se o StatusSelector está sendo renderizado');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ A página deve carregar sem erro 500');
      console.log('2. ✅ O StatusSelector deve aparecer (se tiver permissão)');
      console.log('3. ✅ O dropdown deve funcionar corretamente');
      console.log('4. ✅ A data deve ser salva no fuso horário correto');
      console.log('5. ✅ Não deve haver erros de sintaxe');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoStatusSelector(); 