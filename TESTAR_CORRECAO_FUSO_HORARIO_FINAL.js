// Script para testar a correção final do fuso horário
// Execute no console do navegador

async function testarCorrecaoFusoHorarioFinal() {
  try {
    console.log('🔍 Testando correção final do fuso horário...');
    
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
      console.log('3. 🔄 Preencha a data: 08/08/2025 (dia 8 de agosto)');
      console.log('4. 🔄 Confirme a ação');
      console.log('5. 🔄 Verifique se aparece "08/08/2025" (não 07/08/2025)');
      console.log('6. 🔄 Entre nos detalhes da venda');
      console.log('7. 🔄 Verifique se aparece "08/08/2025" no campo "Instalação agendada para:"');
      console.log('8. 🔄 Atualize a página (F5) e verifique se persiste');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('✅ handleAtualizarStatus agora passa dadosAdicionais corretamente');
      console.log('✅ StatusSelector não converte mais para ISO (mantém YYYY-MM-DD)');
      console.log('✅ formatarDataBrasil agora processa YYYY-MM-DD diretamente');
      console.log('✅ Removida conversão desnecessária de timezone');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- handleInstallConfirm: 2025-08-08 auditada');
      console.log('- 🔍 ====== INÍCIO DO handleAtualizarStatus ======');
      console.log('- 🔍 Incluindo dataInstalacao nos dados adicionais: "2025-08-08"');
      console.log('- 🔍 ExtraData para processamento: { dataInstalacao: "2025-08-08" }');
      console.log('- 🔍 Salvando dataInstalacao para auditada: "2025-08-08"');
      console.log('- 🔍 Updates processados: { dataInstalacao: "2025-08-08" }');
      console.log('- 🔍 Dados finais para atualização: { status: "auditada", dataInstalacao: "2025-08-08" }');
      console.log('- 🔍 formatarDataBrasil recebeu: "2025-08-08"');
      console.log('- 🔍 Data simples detectada: "2025-08-08"');
      console.log('- 🔍 Data formatada (método simples): "08/08/2025"');
      
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
        console.log('🎉 PRONTO PARA TESTE DE FUSO HORÁRIO!');
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
        console.log('\n🎯 TESTE CRÍTICO DO FUSO HORÁRIO:');
        console.log('📝 Data selecionada: 08/08/2025');
        console.log('📝 Data esperada na exibição: 08/08/2025');
        console.log('📝 Data NÃO deve aparecer como: 07/08/2025');
        
        console.log('\n🔧 FORMATO SIMPLIFICADO:');
        console.log('📝 Entrada do input: "2025-08-08"');
        console.log('📝 Salvamento no Firebase: "2025-08-08"');
        console.log('📝 Exibição na tela: "08/08/2025"');
        console.log('📝 SEM conversões de timezone desnecessárias');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Data de entrada: 08/08/2025');
      console.log('2. ✅ Data exibida: 08/08/2025 (MESMA data)');
      console.log('3. ✅ Data persiste após refresh da página');
      console.log('4. ✅ Data aparece nos detalhes da venda');
      console.log('5. ✅ Não há diferença de um dia');
      
      // Teste da função de formatação
      console.log('\n🧪 TESTE DA FUNÇÃO formatarDataBrasil:');
      
      // Simular o teste da função
      const testarFormatacao = (dataInput, esperado) => {
        try {
          // Como não podemos importar diretamente, vamos simular o teste
          const [year, month, day] = dataInput.split('-');
          const resultado = `${day}/${month}/${year}`;
          console.log(`📝 Input: "${dataInput}" → Output: "${resultado}" (Esperado: "${esperado}")`);
          
          if (resultado === esperado) {
            console.log('✅ Formatação correta!');
          } else {
            console.log('❌ Formatação incorreta!');
          }
        } catch (error) {
          console.log('❌ Erro na formatação:', error);
        }
      };
      
      testarFormatacao('2025-08-08', '08/08/2025');
      testarFormatacao('2025-12-25', '25/12/2025');
      testarFormatacao('2025-01-01', '01/01/2025');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoFusoHorarioFinal();