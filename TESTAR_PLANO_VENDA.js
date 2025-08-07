// Script para testar se as vendas estão sendo salvas com informações do plano
// Execute no console do navegador

async function testarPlanoVenda() {
  try {
    console.log('🧪 Testando salvamento de vendas com informações do plano...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('cadastro')) {
      console.log('❌ Execute este script na página "Cadastro de Venda"');
      console.log('📝 Vá para: http://localhost:8080/cadastro');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há campos de plano e vencimento
    const camposPlano = document.querySelectorAll('select, input');
    const campoPlano = Array.from(camposPlano).find(el => 
      el.textContent && el.textContent.includes('Plano')
    );
    
    const campoVencimento = Array.from(camposPlano).find(el => 
      el.textContent && el.textContent.includes('Vencimento')
    );
    
    console.log(`📋 Campo de plano encontrado: ${!!campoPlano}`);
    console.log(`📋 Campo de vencimento encontrado: ${!!campoVencimento}`);
    
    // Verificar se há planos carregados
    const selects = document.querySelectorAll('select');
    const selectPlanos = Array.from(selects).find(select => 
      select.querySelector('option') && 
      select.querySelector('option').textContent.includes('Plano')
    );
    
    if (selectPlanos) {
      const opcoes = selectPlanos.querySelectorAll('option');
      console.log(`📊 Planos disponíveis: ${opcoes.length - 1}`); // -1 para excluir placeholder
      
      opcoes.forEach((opcao, index) => {
        if (index > 0) { // Pular placeholder
          console.log(`  - ${opcao.textContent}`);
        }
      });
    }
    
    console.log('\n📝 Para testar o salvamento:');
    console.log('1. Preencha todos os campos obrigatórios');
    console.log('2. Selecione um plano');
    console.log('3. Selecione o dia de vencimento');
    console.log('4. Anexe documentos (opcional)');
    console.log('5. Clique em "Cadastrar Venda"');
    console.log('6. Vá para a página de acompanhamento');
    console.log('7. Verifique se as informações do plano aparecem');
    
    console.log('\n🔍 Verificações importantes:');
    console.log('- O plano deve aparecer na lista de vendas');
    console.log('- A data de vencimento deve aparecer na lista');
    console.log('- Nos detalhes da venda, as informações devem estar completas');
    console.log('- O backoffice deve conseguir ver o plano e vencimento');
    
    console.log('\n⚠️ Se as informações não aparecerem:');
    console.log('- Verifique se o plano foi selecionado antes de cadastrar');
    console.log('- Verifique se o dia de vencimento foi selecionado');
    console.log('- Confirme se a venda foi salva com sucesso');
    console.log('- Verifique se há erros no console');
    
    console.log('\n🎯 Benefícios esperados:');
    console.log('- Backoffice pode ver o plano escolhido');
    console.log('- Data de vencimento clara para geração');
    console.log('- Informações completas nos detalhes');
    console.log('- Melhor organização do trabalho');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarPlanoVenda(); 