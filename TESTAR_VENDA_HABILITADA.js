// Script para testar se vendas habilitadas não podem ser marcadas como perdidas
// Execute no console do navegador

async function testarVendaHabilitada() {
  try {
    console.log('🧪 Testando restrição de venda habilitada...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes da venda');
      console.log('📝 Vá para uma venda específica: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando status da venda...');
      
      // Verificar se há elementos com status da venda
      const statusElements = document.querySelectorAll('*');
      let encontrouStatus = false;
      let statusVenda = '';
      
      statusElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Status:')) {
          encontrouStatus = true;
          statusVenda = element.textContent;
          console.log('✅ Status da venda encontrado:', element.textContent);
        }
      });
      
      if (!encontrouStatus) {
        console.log('❌ Status da venda não encontrado');
      }
      
      // Verificar se há botões de ação
      const actionButtons = document.querySelectorAll('button');
      console.log(`📊 Botões de ação encontrados: ${actionButtons.length}`);
      
      let botaoPerdida = null;
      actionButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.length > 0) {
          console.log(`📊 Botão ${index + 1}: "${buttonText}"`);
          
          // Verificar se há botão "Perdida"
          if (buttonText.toLowerCase().includes('perdida') || buttonText.toLowerCase().includes('perdida')) {
            botaoPerdida = button;
            console.log('🔍 Botão "Perdida" encontrado');
          }
        }
      });
      
      // Verificar se a venda está habilitada
      const isHabilitada = statusVenda.toLowerCase().includes('habilitada');
      
      if (isHabilitada) {
        console.log('🔍 Venda está habilitada');
        
        if (botaoPerdida) {
          console.log('❌ PROBLEMA: Botão "Perdida" ainda aparece para venda habilitada');
          console.log('📝 Isso não deveria acontecer - vendas habilitadas não podem ser perdidas');
        } else {
          console.log('✅ CORRETO: Botão "Perdida" não aparece para venda habilitada');
        }
      } else {
        console.log('🔍 Venda não está habilitada');
        
        if (botaoPerdida) {
          console.log('✅ CORRETO: Botão "Perdida" aparece para venda não habilitada');
        } else {
          console.log('ℹ️ Botão "Perdida" não aparece (pode ser normal dependendo do status)');
        }
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
        
        // Resumo do teste
        console.log('\n📊 RESUMO DO TESTE:');
        console.log(`- Status da venda: ${statusVenda || 'Não encontrado'}`);
        console.log(`- Venda habilitada: ${isHabilitada ? 'Sim' : 'Não'}`);
        console.log(`- Botão "Perdida" presente: ${botaoPerdida ? 'Sim' : 'Não'}`);
        
        if (isHabilitada && !botaoPerdida) {
          console.log('\n🎉 SUCESSO: Restrição de venda habilitada funcionando corretamente!');
        } else if (isHabilitada && botaoPerdida) {
          console.log('\n❌ PROBLEMA: Venda habilitada ainda pode ser marcada como perdida');
        } else {
          console.log('\nℹ️ Teste inconclusivo - venda não está habilitada');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarVendaHabilitada(); 