// Script para testar o download do ZIP e o reset dos campos de instalação
// Execute no console do navegador

async function testarDownloadEReset() {
  try {
    console.log('🧪 Testando download do ZIP e reset dos campos...');
    
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
      
      // Verificar se há botão de download
      const downloadButtons = document.querySelectorAll('button');
      let botaoDownload = null;
      
      downloadButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && buttonText.toLowerCase().includes('download')) {
          botaoDownload = button;
          console.log(`✅ Botão de download encontrado: "${buttonText}"`);
        }
      });
      
      if (!botaoDownload) {
        console.log('❌ Botão de download não encontrado');
      }
      
      // Verificar se há campos de instalação
      const instalacaoElements = document.querySelectorAll('*');
      let encontrouInstalacaoAgendada = false;
      let encontrouInstaladaEm = false;
      
      instalacaoElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Instalação agendada')) {
          encontrouInstalacaoAgendada = true;
          console.log('✅ Campo "Instalação agendada" encontrado');
        }
        if (element.textContent && element.textContent.includes('Instalada em')) {
          encontrouInstaladaEm = true;
          console.log('✅ Campo "Instalada em" encontrado');
        }
      });
      
      if (!encontrouInstalacaoAgendada) {
        console.log('❌ Campo "Instalação agendada" não encontrado');
      }
      
      if (!encontrouInstaladaEm) {
        console.log('❌ Campo "Instalada em" não encontrado');
      }
      
      // Verificar se há botões de status
      const statusButtons = document.querySelectorAll('button');
      let botoesStatus = [];
      
      statusButtons.forEach((button, index) => {
        const buttonText = button.textContent?.trim();
        if (buttonText && (
          buttonText.toLowerCase().includes('pendente') ||
          buttonText.toLowerCase().includes('atendimento') ||
          buttonText.toLowerCase().includes('auditada') ||
          buttonText.toLowerCase().includes('gerada') ||
          buttonText.toLowerCase().includes('habilitada') ||
          buttonText.toLowerCase().includes('perdida')
        )) {
          botoesStatus.push(button);
          console.log(`✅ Botão de status encontrado: "${buttonText}"`);
        }
      });
      
      console.log(`📊 Total de botões de status encontrados: ${botoesStatus.length}`);
      
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
        console.log(`- Botão de download: ${botaoDownload ? 'Encontrado' : 'Não encontrado'}`);
        console.log(`- Campo "Instalação agendada": ${encontrouInstalacaoAgendada ? 'Encontrado' : 'Não encontrado'}`);
        console.log(`- Campo "Instalada em": ${encontrouInstaladaEm ? 'Encontrado' : 'Não encontrado'}`);
        console.log(`- Botões de status: ${botoesStatus.length} encontrados`);
        
        if (botaoDownload && encontrouInstalacaoAgendada && botoesStatus.length > 0) {
          console.log('\n🎉 SUCESSO: Elementos necessários encontrados!');
          console.log('📝 Agora você pode testar:');
          console.log('1. 🔄 Clique no botão de download para testar o ZIP');
          console.log('2. 🔄 Mude o status para "Pendente" ou "Em Atendimento" para testar o reset');
          console.log('3. 🔄 Verifique se os campos de instalação são resetados');
        } else {
          console.log('\n❌ Alguns elementos necessários não foram encontrados');
          console.log('📝 Verifique se a página carregou corretamente');
        }
      }, 1000);
      
    }, 3000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarDownloadEReset(); 