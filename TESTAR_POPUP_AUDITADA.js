// Script para testar se o popup da data de instalação aparece para status auditada
// Execute no console do navegador

async function testarPopupAuditada() {
  try {
    console.log('🧪 Testando popup da data de instalação para status auditada...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes da venda');
      console.log('📝 Vá para uma venda específica: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🔍 Verificando elementos da página...');
      
      // Verificar se há botões de status
      const statusButtons = document.querySelectorAll('button');
      let botaoAuditada = null;
      let botoesStatus = [];
      
      statusButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && (
          buttonText.toLowerCase().includes('auditada') ||
          buttonText.toLowerCase().includes('auditada')
        )) {
          botaoAuditada = button;
          console.log(`✅ Botão "Auditada" encontrado: "${buttonText}"`);
        }
        
        if (buttonText && (
          buttonText.toLowerCase().includes('pendente') ||
          buttonText.toLowerCase().includes('atendimento') ||
          buttonText.toLowerCase().includes('auditada') ||
          buttonText.toLowerCase().includes('gerada') ||
          buttonText.toLowerCase().includes('habilitada') ||
          buttonText.toLowerCase().includes('perdida')
        )) {
          botoesStatus.push(button);
          console.log(`📊 Botão de status: "${buttonText}"`);
        }
      });
      
      if (!botaoAuditada) {
        console.log('❌ Botão "Auditada" não encontrado');
      }
      
      // Verificar se há StatusSelector (controle administrativo)
      const statusSelectorElements = document.querySelectorAll('*');
      let encontrouStatusSelector = false;
      
      statusSelectorElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Controle Administrativo')) {
          encontrouStatusSelector = true;
          console.log('✅ StatusSelector encontrado');
        }
      });
      
      if (!encontrouStatusSelector) {
        console.log('❌ StatusSelector não encontrado');
      }
      
      // Verificar se há diálogos
      const dialogElements = document.querySelectorAll('[role="dialog"], [class*="dialog"], [class*="Dialog"]');
      console.log(`📊 Elementos de diálogo encontrados: ${dialogElements.length}`);
      
      // Verificar se há campos de data
      const dateInputs = document.querySelectorAll('input[type="date"]');
      console.log(`📊 Campos de data encontrados: ${dateInputs.length}`);
      
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
        console.log(`- Botão "Auditada": ${botaoAuditada ? 'Encontrado' : 'Não encontrado'}`);
        console.log(`- StatusSelector: ${encontrouStatusSelector ? 'Encontrado' : 'Não encontrado'}`);
        console.log(`- Diálogos: ${dialogElements.length} encontrados`);
        console.log(`- Campos de data: ${dateInputs.length} encontrados`);
        console.log(`- Botões de status: ${botoesStatus.length} encontrados`);
        
        if (botaoAuditada || encontrouStatusSelector) {
          console.log('\n🎉 SUCESSO: Elementos necessários encontrados!');
          console.log('📝 Agora você pode testar:');
          console.log('1. 🔄 Clique no botão "Auditada" ou use o StatusSelector');
          console.log('2. 🔄 Verifique se o popup da data de instalação aparece');
          console.log('3. 🔄 Preencha a data e confirme');
          console.log('4. 🔄 Verifique se não há mais erro de campo obrigatório');
        } else {
          console.log('\n❌ Elementos necessários não foram encontrados');
          console.log('📝 Verifique se a página carregou corretamente');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarPopupAuditada(); 