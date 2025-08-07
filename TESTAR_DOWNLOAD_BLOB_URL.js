// Script para testar downloads usando blob URL
// Execute no console do navegador

async function testarDownloadBlobUrl() {
  try {
    console.log('🔍 Testando nova solução de download com blob URL...');
    
    console.log('\n✅ NOVA ABORDAGEM IMPLEMENTADA:');
    console.log('  1️⃣ fetch(url, {mode: "no-cors"}) → contorna CORS');
    console.log('  2️⃣ response.blob() → converte para blob');
    console.log('  3️⃣ URL.createObjectURL(blob) → cria URL local');
    console.log('  4️⃣ <a href="blob://..."> download → força download');
    console.log('  5️⃣ URL.revokeObjectURL() → limpa memória');
    console.log('  ⚠️ Fallback: link direto se fetch falhar');
    
    console.log('\n🔧 VANTAGENS DA BLOB URL:');
    console.log('  ✅ Força download real (não abre em aba)');
    console.log('  ✅ Funciona com mode: "no-cors"');
    console.log('  ✅ Blob URL local bypassa restrições');
    console.log('  ✅ Gerenciamento de memória automático');
    console.log('  ✅ Fallback para casos extremos');
    
    console.log('\n📋 FLUXO DETALHADO:');
    console.log('1. Para cada documento:');
    console.log('   🔄 fetch(firebaseUrl, {mode: "no-cors"})');
    console.log('   📄 const blob = await response.blob()');
    console.log('   🔗 const blobUrl = URL.createObjectURL(blob)');
    console.log('   📥 link.href = blobUrl; link.download = nome');
    console.log('   ⬇️ link.click() → download real');
    console.log('   🧹 URL.revokeObjectURL(blobUrl) após 5s');
    console.log('');
    console.log('2. Se fetch falhar:');
    console.log('   🔄 link.href = originalUrl');
    console.log('   🪟 link.target = "_blank" (abre aba)');
    console.log('   ⬇️ link.click() → fallback');
    
    console.log('\n🚀 PARA TESTAR:');
    console.log('1. Acesse: http://localhost:8081/acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda com documentos');
    console.log('3. Clique "Baixar Todos os Documentos"');
    console.log('4. Aguarde 1 segundo entre cada download');
    console.log('5. Verifique se os arquivos são baixados (não abertos em aba)');
    
    // Verificar se estamos numa página de detalhes de venda
    if (window.location.pathname.includes('venda')) {
      console.log('\n✅ Você está numa página de detalhes de venda!');
      
      // Verificar botão de download
      const botaoDownload = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Baixar Todos') || btn.textContent.includes('Baixar Documentos')
      );
      
      if (botaoDownload) {
        console.log('✅ Botão de download encontrado');
        console.log(`📝 Texto: "${botaoDownload.textContent}"`);
        console.log(`🔘 Habilitado: ${!botaoDownload.disabled ? '✅' : '❌'}`);
        
        if (!botaoDownload.disabled) {
          console.log('\n🎯 CLIQUE NO BOTÃO PARA TESTAR!');
          console.log('📊 Observe o console para ver o progresso:');
          console.log('  🔄 "Fazendo fetch de: https://..."');
          console.log('  ✅ "Download via blob URL: documento.jpg"');
          console.log('  📁 Arquivos devem aparecer na pasta Downloads');
          
          // Verificar contador
          const contador = document.querySelector('[class*="text-2xl"]');
          if (contador) {
            const numDocs = contador.textContent;
            console.log(`📊 ${numDocs} documentos para download`);
            console.log(`⏱️ Tempo total: ~${parseInt(numDocs)} segundos`);
          }
        } else {
          console.log('⚠️ Botão desabilitado - sem documentos');
        }
      } else {
        console.log('❌ Botão de download não encontrado');
      }
      
      // Verificar documentos
      const documentos = document.querySelectorAll('[class*="bg-muted"], [class*="document"]');
      console.log(`📄 ${documentos.length} elementos de documento encontrados na interface`);
      
    } else if (window.location.pathname.includes('acompanhamento')) {
      console.log('\n✅ Você está na página de acompanhamento!');
      console.log('🎯 Clique em "Ver Detalhes" de uma venda para testar');
      
    } else {
      console.log('\n📝 Para testar, vá para:');
      console.log('  - Acompanhamento: http://localhost:8081/acompanhamento');
      console.log('  - Depois clique em "Ver Detalhes" de uma venda');
    }
    
    console.log('\n💡 DIFERENÇAS DA NOVA SOLUÇÃO:');
    console.log('❌ ANTES: link.href = firebaseUrl → abria em aba');
    console.log('✅ AGORA: link.href = blobUrl → força download');
    console.log('');
    console.log('❌ ANTES: CORS bloqueava XMLHttpRequest');
    console.log('✅ AGORA: mode: "no-cors" evita bloqueio');
    console.log('');
    console.log('❌ ANTES: Usuário tinha que salvar manualmente');
    console.log('✅ AGORA: Download automático na pasta Downloads');
    
    console.log('\n🎉 RESULTADO ESPERADO:');
    console.log('  ✅ Downloads automáticos (não abrem abas)');
    console.log('  ✅ Arquivos salvos na pasta Downloads');
    console.log('  ✅ Nomes organizados por categoria');
    console.log('  ✅ Console sem erros de CORS');
    console.log('  ✅ Toasts informativos');
    console.log('  ✅ Gerenciamento de memória limpo');
    
    console.log('\n🔧 TECNOLOGIAS USADAS:');
    console.log('  - fetch() com mode: "no-cors"');
    console.log('  - Blob API para conversão');
    console.log('  - URL.createObjectURL() para URLs locais');
    console.log('  - <a> tag com download attribute');
    console.log('  - URL.revokeObjectURL() para limpeza');
    
    // Aguardar um pouco e dar feedback final
    setTimeout(() => {
      console.log('\n🔍 VERIFICAÇÃO FINAL:');
      console.log('  - Esta solução deve baixar arquivos reais');
      console.log('  - Não deve abrir abas desnecessárias');
      console.log('  - Deve funcionar com qualquer tipo de documento');
      console.log('  - Teste agora e observe a diferença!');
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarDownloadBlobUrl();