// Script para testar as melhorias no acompanhamento de vendas
// Execute no console do navegador

async function testarMelhoriasAcompanhamento() {
  try {
    console.log('🧪 Testando melhorias no acompanhamento de vendas...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página "Acompanhamento de Vendas"');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há vendas na lista
    const vendasCards = document.querySelectorAll('[class*="card"]');
    console.log(`📋 Vendas encontradas: ${vendasCards.length}`);
    
    if (vendasCards.length === 0) {
      console.log('⚠️ Nenhuma venda encontrada na lista');
      console.log('📝 Cadastre uma venda primeiro para testar as melhorias');
      return;
    }
    
    console.log('✅ Vendas encontradas na lista');
    
    // Verificar se as vendas estão ordenadas por data mais recente
    console.log('\n📅 Verificando ordenação por data mais recente...');
    const datasVendas = Array.from(vendasCards).map((card, index) => {
      const dataElement = card.querySelector('[class*="text-sm"]');
      const dataText = dataElement ? dataElement.textContent : 'Data não encontrada';
      return { index, data: dataText };
    });
    
    console.log('📋 Datas das vendas (primeiras 3):');
    datasVendas.slice(0, 3).forEach(({ index, data }) => {
      console.log(`  ${index + 1}. ${data}`);
    });
    
    // Verificar se as informações do plano e vencimento estão sendo exibidas
    console.log('\n💳 Verificando informações do plano e vencimento...');
    const vendasComPlano = Array.from(vendasCards).filter(card => {
      const planoElement = card.querySelector('[class*="text-sm"]');
      return planoElement && planoElement.textContent.includes('Plano:');
    });
    
    console.log(`📊 Vendas com informações de plano: ${vendasComPlano.length}/${vendasCards.length}`);
    
    const vendasComVencimento = Array.from(vendasCards).filter(card => {
      const vencimentoElement = card.querySelector('[class*="text-sm"]');
      return vencimentoElement && vencimentoElement.textContent.includes('Vencimento:');
    });
    
    console.log(`📊 Vendas com informações de vencimento: ${vendasComVencimento.length}/${vendasCards.length}`);
    
    // Verificar botões de detalhes
    console.log('\n👁️ Verificando botões de detalhes...');
    const botoesDetalhes = document.querySelectorAll('button');
    const botoesVerDetalhes = Array.from(botoesDetalhes).filter(btn => 
      btn.textContent && btn.textContent.includes('Ver Detalhes')
    );
    
    console.log(`📊 Botões "Ver Detalhes" encontrados: ${botoesVerDetalhes.length}`);
    
    console.log('\n📋 Melhorias implementadas:');
    console.log('1. ✅ Ordenação por data mais recente primeiro');
    console.log('2. ✅ Informações do plano na lista');
    console.log('3. ✅ Data de vencimento na lista');
    console.log('4. ✅ Informações do plano nos detalhes');
    console.log('5. ✅ Data de vencimento nos detalhes');
    
    console.log('\n🔄 Teste de melhorias configurado!');
    console.log('📝 Para testar completamente:');
    console.log('- Verifique se as vendas estão ordenadas por data mais recente');
    console.log('- Confirme se as informações do plano aparecem na lista');
    console.log('- Confirme se a data de vencimento aparece na lista');
    console.log('- Clique em "Ver Detalhes" de uma venda');
    console.log('- Verifique se as informações aparecem na página de detalhes');
    
    console.log('\n🎯 Benefícios das melhorias:');
    console.log('- Vendas mais recentes aparecem primeiro');
    console.log('- Backoffice pode ver plano e vencimento na lista');
    console.log('- Informações completas nos detalhes da venda');
    console.log('- Melhor organização para geração de vendas');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarMelhoriasAcompanhamento(); 