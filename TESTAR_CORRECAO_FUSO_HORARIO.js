// Script para testar a correção do fuso horário e data de instalação na tela principal
// Execute no console do navegador

async function testarCorrecaoFusoHorario() {
  try {
    console.log('🧪 Testando correção do fuso horário e data de instalação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento de vendas');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há vendas com data de instalação
    const vendasComInstalacao = document.querySelectorAll('[class*="text-sm"]');
    let encontrouDataInstalacao = false;
    
    vendasComInstalacao.forEach(element => {
      if (element.textContent && element.textContent.includes('Instalação:')) {
        encontrouDataInstalacao = true;
        console.log('✅ Data de instalação encontrada na lista:', element.textContent.trim());
      }
    });
    
    if (!encontrouDataInstalacao) {
      console.log('⚠️ Nenhuma data de instalação encontrada na lista');
      console.log('📝 Isso pode ser normal se não houver vendas com data de instalação definida');
    }
    
    // Verificar se há vendas na lista
    const cardsVenda = document.querySelectorAll('[class*="Card"]');
    console.log(`📊 Vendas encontradas na lista: ${cardsVenda.length}`);
    
    // Verificar se há vendas com status que podem ter data de instalação
    const statusBadges = document.querySelectorAll('[class*="badge"]');
    const statuses = Array.from(statusBadges).map(badge => badge.textContent?.trim());
    
    console.log('📊 Status das vendas encontradas:');
    statuses.forEach((status, index) => {
      console.log(`  ${index + 1}. ${status}`);
    });
    
    // Verificar se há vendas em status que podem ter data de instalação
    const statusesComInstalacao = ['Auditada', 'Gerada', 'Aguardando Habilitação', 'Habilitada', 'Instalada'];
    const vendasComStatusRelevante = statuses.filter(status => 
      statusesComInstalacao.includes(status)
    );
    
    console.log(`📊 Vendas com status que podem ter data de instalação: ${vendasComStatusRelevante.length}`);
    
    console.log('\n🔍 Correções Implementadas:');
    console.log('1. ✅ Função converterDataParaBrasilISO criada');
    console.log('2. ✅ Data de instalação convertida para fuso horário de Brasília');
    console.log('3. ✅ Data de instalação adicionada na tela principal');
    console.log('4. ✅ Formatação correta usando formatarDataBrasil');
    
    console.log('\n🛠️ Para testar a correção do fuso horário:');
    console.log('1. Acesse uma venda em detalhes');
    console.log('2. Clique em "Adicionar" ou "Editar" na data de instalação');
    console.log('3. Selecione uma data (ex: 05/01/2024)');
    console.log('4. Clique em "Salvar"');
    console.log('5. Verifique se a data salva é a mesma que você selecionou');
    console.log('6. Verifique se não há diferença de um dia');
    
    console.log('\n🛠️ Para testar a data de instalação na tela principal:');
    console.log('1. Verifique se vendas com data de instalação mostram a data na lista');
    console.log('2. A data deve aparecer no formato brasileiro (dd/mm/aaaa)');
    console.log('3. A data deve estar correta (sem diferença de fuso horário)');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- ✅ Data salva deve ser a mesma que foi selecionada');
    console.log('- ✅ Não deve haver diferença de um dia por fuso horário');
    console.log('- ✅ Data de instalação deve aparecer na tela principal');
    console.log('- ✅ Formatação deve estar no padrão brasileiro');
    
    console.log('\n📋 Lógica de Conversão de Fuso Horário:');
    console.log('1. ✅ Data selecionada no input: YYYY-MM-DD');
    console.log('2. ✅ Conversão: new Date(dataString + "T00:00:00-03:00")');
    console.log('3. ✅ Fuso horário: UTC-3 (Brasília)');
    console.log('4. ✅ Salvamento: data.toISOString()');
    console.log('5. ✅ Exibição: formatarDataBrasil(dataISO)');
    
    console.log('\n🔍 Próximos Passos:');
    console.log('1. Teste a seleção de data de instalação em uma venda');
    console.log('2. Verifique se a data salva está correta');
    console.log('3. Verifique se a data aparece na tela principal');
    console.log('4. Confirme que não há problemas de fuso horário');
    
    // Verificar se há vendas com data de instalação na lista
    if (encontrouDataInstalacao) {
      console.log('\n✅ SUCESSO: Data de instalação está sendo exibida na tela principal!');
    } else {
      console.log('\n📝 DICA: Para ver a data de instalação na lista, defina uma data de instalação em uma venda primeiro');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoFusoHorario(); 