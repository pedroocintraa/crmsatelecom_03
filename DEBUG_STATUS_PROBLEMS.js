// Script para debugar problemas com transições de status
// Execute no console do navegador

async function debugStatusProblems() {
  try {
    console.log('🔍 Debugando problemas com transições de status...');
    
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
    
    // Verificar botões de ação disponíveis
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
    
    // Verificar se há vendas auditadas (que deveriam poder ir para "gerada")
    const vendasAuditadas = Object.entries(statusCounts).filter(([status]) => 
      status.includes('Auditada')
    );
    
    console.log('\n🔍 Vendas Auditadas (que deveriam poder ir para "Gerada"):');
    if (vendasAuditadas.length > 0) {
      console.log('✅ Vendas auditadas encontradas');
      console.log('📝 Para testar transição para "Gerada":');
      console.log('1. Clique em "Ver Detalhes" de uma venda auditada');
      console.log('2. Verifique se o botão "Marcar como Gerada" aparece');
      console.log('3. Clique no botão e preencha as observações');
      console.log('4. Confirme a mudança');
    } else {
      console.log('❌ Nenhuma venda auditada encontrada');
      console.log('📝 Primeiro precisa ter vendas em status "Auditada"');
    }
    
    // Verificar se há vendas pendentes (que deveriam poder ir para "perdida")
    const vendasPendentes = Object.entries(statusCounts).filter(([status]) => 
      status.includes('Pendente')
    );
    
    console.log('\n🔍 Vendas Pendentes (que deveriam poder ir para "Perdida"):');
    if (vendasPendentes.length > 0) {
      console.log('✅ Vendas pendentes encontradas');
      console.log('📝 Para testar transição para "Perdida":');
      console.log('1. Clique em "Ver Detalhes" de uma venda pendente');
      console.log('2. Verifique se o botão "Marcar como Perdida" aparece');
      console.log('3. Clique no botão e preencha o motivo');
      console.log('4. Confirme a mudança');
    } else {
      console.log('❌ Nenhuma venda pendente encontrada');
      console.log('📝 Primeiro precisa ter vendas em status "Pendente"');
    }
    
    console.log('\n🔍 Possíveis Problemas Identificados:');
    console.log('1. ❌ Validação muito rigorosa impedindo transições');
    console.log('2. ❌ Permissões de usuário incorretas');
    console.log('3. ❌ Dados extras obrigatórios não sendo preenchidos');
    console.log('4. ❌ Documentos mínimos não atingidos');
    console.log('5. ❌ Interface não mostrando botões corretos');
    
    console.log('\n🛠️ Para debugar completamente:');
    console.log('1. Abra o console do navegador (F12)');
    console.log('2. Clique em "Ver Detalhes" de uma venda');
    console.log('3. Verifique se há erros no console');
    console.log('4. Teste clicar nos botões de ação');
    console.log('5. Verifique se os diálogos aparecem');
    console.log('6. Preencha os dados obrigatórios');
    console.log('7. Confirme as mudanças');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- Quantos documentos estão anexados? (mínimo 3 para "Gerada")');
    console.log('- Qual é a função do usuário logado?');
    console.log('- Os campos obrigatórios estão preenchidos?');
    console.log('- Os diálogos estão aparecendo corretamente?');
    
  } catch (error) {
    console.error('❌ Erro no debug:', error);
  }
}

// Executar debug
debugStatusProblems(); 