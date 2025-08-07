// Script para testar a nova lógica de status
// Execute no console do navegador

async function testarNovaLogicaStatus() {
  try {
    console.log('🧪 Testando nova lógica de status...');
    
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
    
    // Verificar vendas pendentes (que podem ir para "Em Atendimento")
    if (vendasPorStatus['Pendente'] || vendasPorStatus['pendente']) {
      console.log('\n✅ Vendas pendentes encontradas!');
      console.log('📝 Para testar transição para "Em Atendimento":');
      console.log('1. Clique em "Ver Detalhes" de uma venda pendente');
      console.log('2. Verifique se o botão "Iniciar Processo" aparece');
      console.log('3. Clique no botão para mudar para "Em Atendimento"');
    } else {
      console.log('\n❌ Nenhuma venda pendente encontrada');
      console.log('📝 Para testar "Em Atendimento", primeiro precisa ter vendas em status "Pendente"');
    }
    
    // Verificar vendas em atendimento (que podem ir para "Auditada")
    if (vendasPorStatus['Em Atendimento'] || vendasPorStatus['em_atendimento']) {
      console.log('\n✅ Vendas em atendimento encontradas!');
      console.log('📝 Para testar transição para "Auditada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda em atendimento');
      console.log('2. Verifique se o botão "Marcar como Auditada" aparece');
      console.log('3. Clique no botão e preencha a data de instalação');
      console.log('4. Confirme a mudança');
    } else {
      console.log('\n❌ Nenhuma venda em atendimento encontrada');
      console.log('📝 Para testar "Auditada", primeiro precisa ter vendas em status "Em Atendimento"');
    }
    
    // Verificar vendas auditadas (que podem ir para "Gerada")
    if (vendasPorStatus['Auditada'] || vendasPorStatus['auditada']) {
      console.log('\n✅ Vendas auditadas encontradas!');
      console.log('📝 Para testar transição para "Gerada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda auditada');
      console.log('2. Verifique se o botão "Marcar como Gerada" aparece');
      console.log('3. Clique no botão para mudar para "Gerada"');
      console.log('4. Se a venda tem data de instalação, ela deve ir automaticamente para "Aguardando Habilitação"');
    } else {
      console.log('\n❌ Nenhuma venda auditada encontrada');
      console.log('📝 Para testar "Gerada", primeiro precisa ter vendas em status "Auditada"');
    }
    
    // Verificar vendas geradas (que podem ficar vermelhas após 2 dias)
    if (vendasPorStatus['Gerada'] || vendasPorStatus['gerada']) {
      console.log('\n✅ Vendas geradas encontradas!');
      console.log('📝 Verificações para vendas geradas:');
      console.log('1. Vendas geradas com data de instalação devem ir automaticamente para "Aguardando Habilitação"');
      console.log('2. Vendas geradas sem data de instalação ficam como "Gerada"');
      console.log('3. Vendas geradas há mais de 2 dias devem aparecer em vermelho');
      console.log('4. Verifique se há vendas destacadas em vermelho');
    } else {
      console.log('\n❌ Nenhuma venda gerada encontrada');
      console.log('📝 Para testar funcionalidades de "Gerada", primeiro precisa ter vendas nesse status');
    }
    
    // Verificar vendas aguardando habilitação
    if (vendasPorStatus['Aguardando Habilitação'] || vendasPorStatus['aguardando_habilitacao']) {
      console.log('\n✅ Vendas aguardando habilitação encontradas!');
      console.log('📝 Para testar transição para "Habilitada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda aguardando habilitação');
      console.log('2. Verifique se o botão "Marcar como Habilitada" aparece');
      console.log('3. Clique no botão para mudar para "Habilitada"');
    } else {
      console.log('\n❌ Nenhuma venda aguardando habilitação encontrada');
      console.log('📝 Para testar "Habilitada", primeiro precisa ter vendas em status "Aguardando Habilitação"');
    }
    
    // Verificar vendas habilitadas
    if (vendasPorStatus['Habilitada'] || vendasPorStatus['habilitada']) {
      console.log('\n✅ Vendas habilitadas encontradas!');
      console.log('📝 Para testar transição para "Instalada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda habilitada');
      console.log('2. Verifique se o botão "Marcar como Instalada" aparece');
      console.log('3. Clique no botão para mudar para "Instalada"');
    } else {
      console.log('\n❌ Nenhuma venda habilitada encontrada');
      console.log('📝 Para testar "Instalada", primeiro precisa ter vendas em status "Habilitada"');
    }
    
    // Verificar vendas perdidas
    if (vendasPorStatus['Perdida'] || vendasPorStatus['perdida']) {
      console.log('\n✅ Vendas perdidas encontradas!');
      console.log('📝 Vendas perdidas podem ser marcadas em qualquer momento');
      console.log('📝 Para testar marcação como perdida:');
      console.log('1. Clique em "Ver Detalhes" de qualquer venda');
      console.log('2. Verifique se o botão "Marcar como Perdida" aparece');
      console.log('3. Clique no botão e preencha o motivo');
      console.log('4. Confirme a mudança');
    } else {
      console.log('\n❌ Nenhuma venda perdida encontrada');
      console.log('📝 Para testar "Perdida", pode marcar qualquer venda como perdida');
    }
    
    console.log('\n🔍 Nova Lógica Implementada:');
    console.log('1. ✅ Pendente → Em Atendimento (Iniciar Processo)');
    console.log('2. ✅ Em Atendimento → Auditada (com data de instalação)');
    console.log('3. ✅ Auditada → Gerada (sem observações obrigatórias)');
    console.log('4. ✅ Gerada → Aguardando Habilitação (automático se tem data de instalação)');
    console.log('5. ✅ Gerada fica vermelha após 2 dias (sem data de instalação)');
    console.log('6. ✅ Aguardando Habilitação → Habilitada');
    console.log('7. ✅ Habilitada → Instalada');
    console.log('8. ✅ Perdida pode ser marcada em qualquer momento');
    
    console.log('\n🛠️ Para testar completamente:');
    console.log('1. Execute este script na página de acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de vendas em diferentes status');
    console.log('3. Verifique se os botões corretos aparecem');
    console.log('4. Teste as transições uma por uma');
    console.log('5. Verifique se as vendas geradas ficam vermelhas após 2 dias');
    console.log('6. Verifique se vendas com data de instalação vão automaticamente para "Aguardando Habilitação"');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarNovaLogicaStatus(); 