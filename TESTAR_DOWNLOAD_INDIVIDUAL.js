// Script para testar download individual de documentos
// Execute no console do navegador na página de detalhes da venda

async function testarDownloadIndividual() {
  try {
    console.log('🔍 Testando download individual de documentos...');
    
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
      console.log('2. 🔄 Aguarde os downloads individuais iniciarem');
      console.log('3. 🔄 Cada documento será baixado separadamente');
      console.log('4. 🔄 Verifique a pasta de Downloads do navegador');
      
      console.log('\n📋 SOLUÇÃO IMPLEMENTADA:');
      console.log('✅ Downloads individuais (sem ZIP)');
      console.log('✅ Cada documento baixa diretamente via link.click()');
      console.log('✅ Não faz requisições HTTP (contorna CORS)');
      console.log('✅ Delay de 500ms entre downloads');
      console.log('✅ Toast notification para cada download');
      console.log('✅ Funciona mesmo com CORS bloqueado');
      
      console.log('\n📋 VANTAGENS DA SOLUÇÃO:');
      console.log('✅ Não depende de Firebase SDK');
      console.log('✅ Não depende de fetch() ou XMLHttpRequest');
      console.log('✅ Não depende de Canvas/Image');
      console.log('✅ Usa navegação direta para URLs');
      console.log('✅ O próprio navegador gerencia o download');
      console.log('✅ Funciona mesmo com CORS rigoroso');
      
      console.log('\n📋 LOGS ESPERADOS:');
      console.log('- 🔍 Iniciando download individual de documentos...');
      console.log('- ✅ Iniciando downloads individuais...');
      console.log('- 🔍 Baixando documento individual: arquivo1.jpeg');
      console.log('- ✅ Download iniciado para: arquivo1.jpeg');
      console.log('- 🔍 Baixando documento individual: arquivo2.jpeg');
      console.log('- ✅ Download iniciado para: arquivo2.jpeg');
      console.log('- ✅ 5 downloads individuais iniciados');
      
      console.log('\n📋 TOASTS ESPERADOS:');
      console.log('- "Downloads iniciados" - 5 documentos estão sendo baixados individualmente');
      console.log('- "Download iniciado" - Documento arquivo1.jpeg está sendo baixado');
      console.log('- "Download iniciado" - Documento arquivo2.jpeg está sendo baixado');
      console.log('- (etc para cada documento)');
      
      console.log('\n🔧 COMO FUNCIONA:');
      console.log('1. Para cada documento:');
      console.log('   - Cria elemento <a> temporário');
      console.log('   - Define href = URL do documento');
      console.log('   - Define download = nome do arquivo');
      console.log('   - Define target = "_blank"');
      console.log('   - Adiciona ao DOM');
      console.log('   - Simula clique (.click())');
      console.log('   - Remove do DOM');
      console.log('2. Delay de 500ms entre cada download');
      console.log('3. Toast de confirmação para cada download');
      
      console.log('\n📂 RESULTADO ESPERADO NA PASTA DOWNLOADS:');
      console.log('📄 1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_comprovanteEndereco_0_1754087378141.jpeg');
      console.log('📄 1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_documentoClienteFrente_0_1754087378141.jpeg');
      console.log('📄 1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_documentoClienteVerso_0_1754087378141.jpeg');
      console.log('📄 1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_fachadaCasa_0_1754087378141.jpeg');
      console.log('📄 1WiyyOWIArbn7bnQ7ctMHzJtT8Q2_selfieCliente_0_1754087378141.jpeg');
      
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
        console.log('🎉 PRONTO PARA TESTE DE DOWNLOAD INDIVIDUAL!');
        console.log('📝 Clique no botão para iniciar downloads individuais');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Deve aparecer toast "Downloads iniciados"');
      console.log('2. ✅ Deve aparecer toast para cada documento individual');
      console.log('3. ✅ Deve aparecer logs de "Baixando documento individual"');
      console.log('4. ✅ Documentos devem aparecer na pasta Downloads');
      console.log('5. ✅ Não deve haver erros de CORS no console');
      
      console.log('\n🚀 DIFERENÇA DA SOLUÇÃO:');
      console.log('❌ ANTES: Tentar baixar todos em ZIP → CORS blocked');
      console.log('✅ AGORA: Download individual direto → Sem CORS');
      console.log('❌ ANTES: fetch() / XMLHttpRequest');
      console.log('✅ AGORA: link.click() direto');
      console.log('❌ ANTES: Um arquivo ZIP');
      console.log('✅ AGORA: Múltiplos arquivos individuais');
      
      console.log('\n📝 APÓS O TESTE:');
      console.log('- Verifique se todos os documentos foram baixados');
      console.log('- Verifique se não há erros de CORS');
      console.log('- Verifique se os arquivos abrem corretamente');
      console.log('- Confirme que a solução funciona!');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarDownloadIndividual();