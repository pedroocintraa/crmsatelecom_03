// Script para testar especificamente as transições problemáticas
// Execute no console do navegador

async function testarTransicoesProblematicas() {
  try {
    console.log('🧪 Testando transições problemáticas (Gerada e Perdida)...');
    
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
      return;
    }
    
    // Verificar status das vendas
    console.log('\n📊 Status das vendas encontradas:');
    const vendasPorStatus = {};
    
    vendasCards.forEach((card, index) => {
      const statusElement = card.querySelector('[class*="badge"]');
      if (statusElement) {
        const status = statusElement.textContent.trim();
        if (!vendasPorStatus[status]) {
          vendasPorStatus[status] = [];
        }
        vendasPorStatus[status].push(index + 1);
        console.log(`📋 Venda ${index + 1}: ${status}`);
      }
    });
    
    console.log('\n📈 Vendas por status:');
    Object.entries(vendasPorStatus).forEach(([status, indices]) => {
      console.log(`  ${status}: ${indices.length} vendas (${indices.join(', ')})`);
    });
    
    // Verificar se há vendas auditadas
    if (vendasPorStatus['Auditada'] || vendasPorStatus['auditada']) {
      console.log('\n✅ Vendas auditadas encontradas!');
      console.log('📝 Para testar transição para "Gerada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda auditada');
      console.log('2. Verifique se o botão "Marcar como Gerada" aparece');
      console.log('3. Se não aparecer, verifique o console para erros');
      console.log('4. Se aparecer, clique e preencha as observações');
    } else {
      console.log('\n❌ Nenhuma venda auditada encontrada');
      console.log('📝 Para testar "Gerada", primeiro precisa ter vendas em status "Auditada"');
    }
    
    // Verificar se há vendas pendentes
    if (vendasPorStatus['Pendente'] || vendasPorStatus['pendente']) {
      console.log('\n✅ Vendas pendentes encontradas!');
      console.log('📝 Para testar transição para "Perdida":');
      console.log('1. Clique em "Ver Detalhes" de uma venda pendente');
      console.log('2. Verifique se o botão "Marcar como Perdida" aparece');
      console.log('3. Se não aparecer, verifique o console para erros');
      console.log('4. Se aparecer, clique e preencha o motivo');
    } else {
      console.log('\n❌ Nenhuma venda pendente encontrada');
      console.log('📝 Para testar "Perdida", primeiro precisa ter vendas em status "Pendente"');
    }
    
    // Verificar botões de ação
    console.log('\n🔧 Verificando botões de ação disponíveis:');
    const botoesAcao = document.querySelectorAll('button');
    const botoesStatus = Array.from(botoesAcao).filter(btn => 
      btn.textContent && (
        btn.textContent.includes('Iniciar') ||
        btn.textContent.includes('Auditada') ||
        btn.textContent.includes('Gerada') ||
        btn.textContent.includes('Habilitação') ||
        btn.textContent.includes('Habilitada') ||
        btn.textContent.includes('Perdida')
      )
    );
    
    console.log(`📊 Botões de ação encontrados: ${botoesStatus.length}`);
    botoesStatus.forEach((btn, index) => {
      console.log(`  ${index + 1}. ${btn.textContent.trim()}`);
    });
    
    // Verificar botões de detalhes
    const botoesDetalhes = Array.from(botoesAcao).filter(btn => 
      btn.textContent && btn.textContent.includes('Ver Detalhes')
    );
    
    console.log(`📊 Botões "Ver Detalhes" encontrados: ${botoesDetalhes.length}`);
    
    console.log('\n🔍 Problemas Identificados:');
    console.log('1. ❌ Transição para "Gerada" não funcionando');
    console.log('   - Possível causa: Validação muito rigorosa');
    console.log('   - Possível causa: Permissões incorretas');
    console.log('   - Possível causa: Dados extras obrigatórios');
    
    console.log('2. ❌ Transição para "Perdida" não funcionando');
    console.log('   - Possível causa: Validação muito rigorosa');
    console.log('   - Possível causa: Permissões incorretas');
    console.log('   - Possível causa: Dados extras obrigatórios');
    
    console.log('\n🛠️ Para debugar:');
    console.log('1. Abra o console do navegador (F12)');
    console.log('2. Clique em "Ver Detalhes" de uma venda');
    console.log('3. Verifique os logs de debug no console');
    console.log('4. Procure por erros de validação');
    console.log('5. Verifique se os diálogos aparecem');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- Quantos documentos estão anexados? (mínimo 3 para "Gerada")');
    console.log('- Qual é a função do usuário logado?');
    console.log('- Os campos obrigatórios estão preenchidos?');
    console.log('- Os diálogos estão aparecendo corretamente?');
    console.log('- Há erros no console do navegador?');
    
    console.log('\n📋 Próximos Passos:');
    console.log('1. Execute este script na página de acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda');
    console.log('3. Verifique os logs de debug no console');
    console.log('4. Teste clicar nos botões de ação');
    console.log('5. Verifique se os diálogos aparecem');
    console.log('6. Preencha os dados obrigatórios');
    console.log('7. Confirme as mudanças');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarTransicoesProblematicas(); 