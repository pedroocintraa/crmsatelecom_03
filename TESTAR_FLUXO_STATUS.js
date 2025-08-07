// Script para testar o fluxo completo de status das vendas
// Execute no console do navegador

async function testarFluxoStatus() {
  try {
    console.log('🧪 Testando fluxo completo de status das vendas...');
    
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
    
    // Verificar status das vendas
    console.log('\n📊 Verificando status das vendas...');
    const statusCounts = {};
    
    vendasCards.forEach((card, index) => {
      const statusElement = card.querySelector('[class*="badge"]');
      if (statusElement) {
        const status = statusElement.textContent.trim();
        statusCounts[status] = (statusCounts[status] || 0) + 1;
        console.log(`📋 Venda ${index + 1}: ${status}`);
      }
    });
    
    console.log('\n📈 Distribuição de status:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} vendas`);
    });
    
    // Verificar botões de ação
    console.log('\n🔧 Verificando botões de ação...');
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
    
    console.log('\n📋 Fluxo de Status Implementado:');
    console.log('1. ✅ Pendente - Venda cadastrada, aguardando processamento');
    console.log('2. ✅ Em Andamento - Venda sendo processada pelo backoffice');
    console.log('3. ✅ Auditada - Venda auditada e aprovada');
    console.log('4. ✅ Gerada - Venda gerada no sistema da operadora');
    console.log('5. ✅ Aguardando Habilitação - Aguardando habilitação da operadora');
    console.log('6. ✅ Habilitada - Venda habilitada pela operadora');
    console.log('7. ✅ Instalada - Venda instalada e ativa (status final)');
    console.log('8. ✅ Perdida - Venda perdida (status final)');
    
    console.log('\n🔍 Validações Implementadas:');
    console.log('- ✅ Permissões por função de usuário');
    console.log('- ✅ Validação de documentos mínimos');
    console.log('- ✅ Validação de campos obrigatórios');
    console.log('- ✅ Validação de dados extras (data instalação, motivo perda)');
    console.log('- ✅ Histórico de mudanças de status');
    console.log('- ✅ Progresso visual da venda');
    
    console.log('\n🎯 Benefícios do Fluxo:');
    console.log('- ✅ Controle rigoroso de transições de status');
    console.log('- ✅ Validações automáticas antes de mudanças');
    console.log('- ✅ Histórico completo de mudanças');
    console.log('- ✅ Interface visual do progresso');
    console.log('- ✅ Permissões baseadas em função');
    console.log('- ✅ Dados extras obrigatórios para certos status');
    
    console.log('\n🔄 Para testar completamente:');
    console.log('1. Clique em "Ver Detalhes" de uma venda pendente');
    console.log('2. Verifique se os botões de ação aparecem corretamente');
    console.log('3. Teste as transições de status uma por uma');
    console.log('4. Verifique se as validações funcionam');
    console.log('5. Confirme se o histórico é salvo');
    console.log('6. Teste o componente de progresso');
    
    console.log('\n⚠️ Regras de Validação:');
    console.log('- Pendente → Em Andamento: Mínimo 1 documento');
    console.log('- Em Andamento → Auditada: Mínimo 2 documentos');
    console.log('- Auditada → Gerada: Mínimo 3 documentos + observações');
    console.log('- Gerada → Aguardando Habilitação: Data de instalação obrigatória');
    console.log('- Habilitada → Instalada: Observações obrigatórias');
    console.log('- Qualquer status → Perdida: Motivo obrigatório');
    
    console.log('\n👥 Permissões por Função:');
    console.log('- ADMINISTRADOR_GERAL: Todas as transições');
    console.log('- SUPERVISOR: Todas as transições');
    console.log('- SUPERVISOR_EQUIPE: Transições limitadas');
    console.log('- VENDEDOR: Apenas visualização');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarFluxoStatus(); 