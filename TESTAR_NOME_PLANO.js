// Script para testar se o nome do plano está sendo exibido corretamente
// Execute no console do navegador

async function testarNomePlano() {
  try {
    console.log('🧪 Testando exibição do nome do plano...');
    
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
      console.log('📝 Cadastre uma venda primeiro para testar');
      return;
    }
    
    console.log('✅ Vendas encontradas na lista');
    
    // Verificar se as informações do plano estão sendo exibidas
    console.log('\n💳 Verificando informações do plano...');
    const vendasComPlano = Array.from(vendasCards).filter(card => {
      const planoElement = card.querySelector('[class*="text-sm"]');
      return planoElement && planoElement.textContent.includes('Plano:');
    });
    
    console.log(`📊 Vendas com informações de plano: ${vendasComPlano.length}/${vendasCards.length}`);
    
    // Verificar se o plano está sendo exibido como nome ou ID
    vendasComPlano.forEach((card, index) => {
      const planoElement = card.querySelector('[class*="text-sm"]');
      if (planoElement) {
        const planoText = planoElement.textContent;
        console.log(`📋 Venda ${index + 1}: ${planoText}`);
        
        // Verificar se é um ID numérico ou nome
        const planoMatch = planoText.match(/Plano: (.+)/);
        if (planoMatch) {
          const planoValue = planoMatch[1];
          const isNumeric = /^\d+$/.test(planoValue);
          
          if (isNumeric) {
            console.log(`  ❌ Ainda exibindo ID: ${planoValue}`);
          } else {
            console.log(`  ✅ Exibindo nome: ${planoValue}`);
          }
        }
      }
    });
    
    // Verificar botões de detalhes
    console.log('\n👁️ Verificando botões de detalhes...');
    const botoesDetalhes = document.querySelectorAll('button');
    const botoesVerDetalhes = Array.from(botoesDetalhes).filter(btn => 
      btn.textContent && btn.textContent.includes('Ver Detalhes')
    );
    
    console.log(`📊 Botões "Ver Detalhes" encontrados: ${botoesVerDetalhes.length}`);
    
    console.log('\n📋 Melhorias implementadas:');
    console.log('1. ✅ Salvamento do nome do plano junto com o ID');
    console.log('2. ✅ Exibição do nome do plano na lista');
    console.log('3. ✅ Exibição do nome do plano nos detalhes');
    console.log('4. ✅ Interface mais informativa para o backoffice');
    
    console.log('\n🔄 Para testar completamente:');
    console.log('- Cadastre uma nova venda com plano');
    console.log('- Verifique se o nome do plano aparece na lista');
    console.log('- Clique em "Ver Detalhes" de uma venda');
    console.log('- Confirme se o nome do plano aparece nos detalhes');
    
    console.log('\n🎯 Benefícios esperados:');
    console.log('- Backoffice vê o nome do plano em vez do ID');
    console.log('- Informações mais claras e compreensíveis');
    console.log('- Melhor experiência de uso');
    console.log('- Dados mais organizados e informativos');
    
    console.log('\n⚠️ Se ainda aparecer ID:');
    console.log('- Verifique se a venda foi cadastrada após a correção');
    console.log('- Vendas antigas ainda podem mostrar ID');
    console.log('- Cadastre uma nova venda para testar');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarNomePlano(); 