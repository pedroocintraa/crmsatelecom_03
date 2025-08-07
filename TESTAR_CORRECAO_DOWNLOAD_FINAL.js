// Script para testar a correção final do download
// Execute no console do navegador na página de detalhes da venda

async function testarCorrecaoDownloadFinal() {
  try {
    console.log('🔍 Testando correção final do download...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página de detalhes de venda detectada');
    
    // Aguardar um pouco para a página carregar
    setTimeout(() => {
      console.log('\n🎯 INSTRUÇÕES PARA TESTE:');
      console.log('1. 🔄 Clique no botão "Baixar Todos os Documentos"');
      console.log('2. 🔄 Observe os logs detalhados no console');
      console.log('3. 🔄 Verifique se o download funciona agora');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('✅ Melhor extração do caminho do arquivo da URL');
      console.log('✅ Logs detalhados da URL e pathname');
      console.log('✅ Fallback para nome do arquivo se extração falhar');
      console.log('✅ Download alternativo via Canvas/Image (sem CORS)');
      console.log('✅ Timeout de 10 segundos para cada imagem');
      console.log('✅ Múltiplas tentativas de download');
      
      console.log('\n📋 FLUXO DE DOWNLOAD ATUALIZADO:');
      console.log('1. 🔄 Tentar Firebase SDK (getBlob)');
      console.log('2. 🔄 Se falhar: tentar Canvas/Image (sem CORS)');
      console.log('3. 🔄 Se falhar: tentar fetch direto (pode dar CORS)');
      
      console.log('\n📋 LOGS ESPERADOS AGORA:');
      console.log('- 🔍 URL completa: https://firebasestorage.googleapis.com/...');
      console.log('- 🔍 URL pathname: /v0/b/projeto.app/o/vendas%2F...');
      console.log('- 📄 Caminho extraído (padrão 1): vendas/user/arquivo.jpeg');
      console.log('OU');
      console.log('- ⚠️ Erro no download via Firebase SDK: [erro]');
      console.log('- 📄 Tentando download alternativo...');
      console.log('- ✅ Download alternativo bem-sucedido via canvas: 12345 bytes');
      
      console.log('\n🔧 VANTAGENS DO DOWNLOAD VIA CANVAS:');
      console.log('✅ Não sofre bloqueio de CORS para imagens');
      console.log('✅ Funciona com URLs públicas do Firebase Storage');
      console.log('✅ Converte automaticamente para formato adequado');
      console.log('✅ Suporta crossOrigin="anonymous"');
      console.log('✅ Timeout para evitar travamento');
      
      console.log('\n📄 EXEMPLO DE URL ANALISADA:');
      const exemploUrl = 'https://firebasestorage.googleapis.com/v0/b/crm-s-a-telecom.firebasestorage.app/o/vendas%2F1WiyyOWIArbn7bnQ7ctMHzJtT8Q2%2F1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_comprovanteEndereco_0_1754087378141.jpeg?alt=media&token=3f458996-677f-4c35-9662-87adc8caebd4';
      
      try {
        const url = new URL(exemploUrl);
        console.log('🔍 Pathname:', url.pathname);
        
        const pathMatch = url.pathname.match(/\/o\/(.+)/);
        if (pathMatch) {
          const filePath = decodeURIComponent(pathMatch[1]);
          console.log('📄 Caminho extraído:', filePath);
        }
      } catch (error) {
        console.log('❌ Erro no exemplo:', error);
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Deve mostrar URL completa e pathname');
      console.log('2. ✅ Deve extrair caminho do arquivo corretamente');
      console.log('3. ✅ Se Firebase SDK falhar, deve tentar canvas');
      console.log('4. ✅ Deve mostrar "Download alternativo bem-sucedido"');
      console.log('5. ✅ Deve mostrar tamanho em bytes de cada documento');
      console.log('6. ✅ Deve gerar e baixar o arquivo ZIP');
      
      console.log('\n🚀 BENEFÍCIOS DAS CORREÇÕES:');
      console.log('✅ Múltiplas estratégias de download');
      console.log('✅ Logs detalhados para debug');
      console.log('✅ Contorna problemas de CORS de forma inteligente');
      console.log('✅ Timeout para evitar travamento');
      console.log('✅ Fallback robusto');
      
      // Verificar se há botão de download
      const downloadButtons = document.querySelectorAll('button');
      let botaoDownload = null;
      
      downloadButtons.forEach((button) => {
        const buttonText = button.textContent?.toLowerCase() || '';
        if (buttonText.includes('baixar') && buttonText.includes('documento')) {
          botaoDownload = button;
        }
      });
      
      if (!botaoDownload) {
        console.log('\n❌ Botão "Baixar Todos os Documentos" não encontrado');
        console.log('📝 Verifique se a venda tem documentos anexados');
      } else {
        console.log('\n✅ Botão "Baixar Todos os Documentos" encontrado!');
        console.log('🎉 PRONTO PARA TESTE FINAL!');
        console.log('📝 Clique no botão para testar todas as correções');
      }
      
      console.log('\n🔍 POSSÍVEIS RESULTADOS:');
      console.log('✅ SUCESSO: Todos os documentos baixados via Firebase SDK');
      console.log('✅ SUCESSO: Alguns via Firebase SDK, outros via Canvas');
      console.log('✅ SUCESSO: Todos via Canvas (contornando CORS)');
      console.log('❌ FALHA: Se nem Canvas nem fetch funcionarem');
      
      console.log('\n📝 APÓS O TESTE:');
      console.log('- Se ainda der erro, copie TODOS os logs aqui');
      console.log('- Se funcionar, confirme que o ZIP foi baixado');
      console.log('- Verifique se o ZIP contém todos os documentos');
      console.log('- Teste abrir os documentos dentro do ZIP');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoDownloadFinal();