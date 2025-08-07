// Script para testar a correção do CORS no download de documentos
// Execute no console do navegador

async function testarCorrecaoCorsDownload() {
  try {
    console.log('🔍 Testando correção do CORS no download...');
    
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
      console.log('1. 🔄 Certifique-se de estar numa venda que tem documentos anexados');
      console.log('2. 🔄 Clique no botão "Baixar Todos os Documentos"');
      console.log('3. 🔄 Observe os logs no console');
      console.log('4. 🔄 Verifique se o download do ZIP funciona agora');
      
      console.log('\n📋 PROBLEMA IDENTIFICADO:');
      console.log('❌ CORS policy bloqueava fetch() direto das URLs do Firebase Storage');
      console.log('❌ "No Access-Control-Allow-Origin header" error');
      console.log('❌ Todas as requisições falhavam com "Failed to fetch"');
      
      console.log('\n📋 CORREÇÃO IMPLEMENTADA:');
      console.log('✅ Usar Firebase SDK (getBlob) em vez de fetch() direto');
      console.log('✅ Extrair caminho do arquivo da URL do Storage');
      console.log('✅ Usar storageRef + getBlob para contornar CORS');
      console.log('✅ Fallback para fetch() se Firebase SDK falhar');
      console.log('✅ Logs detalhados para debug');
      
      console.log('\n📋 LOGS ESPERADOS AGORA:');
      console.log('- 📄 Documento xxx.jpeg é URL do Storage, baixando via Firebase SDK...');
      console.log('- 📄 Caminho do arquivo extraído: vendas/[ID]/arquivo.jpeg');
      console.log('- ✅ Download via Firebase SDK bem-sucedido: 12345 bytes');
      console.log('- ✅ Documento xxx.jpeg baixado com sucesso (12345 bytes)');
      console.log('- ✅ Documento xxx.jpeg adicionado ao ZIP');
      console.log('- 🔍 Total de documentos processados: X');
      console.log('- 📁 Arquivo ZIP gerado: documentos-venda-[ID].zip');
      console.log('- ✅ Download iniciado com sucesso!');
      
      console.log('\n🔧 DIFERENÇA TÉCNICA:');
      console.log('❌ ANTES: fetch(firebaseStorageURL) → CORS blocked');
      console.log('✅ AGORA: getBlob(storageRef(filePath)) → Firebase SDK (sem CORS)');
      
      console.log('\n📄 EXEMPLO DE URL E EXTRAÇÃO:');
      console.log('URL: https://firebasestorage.googleapis.com/v0/b/projeto.app/o/vendas%2Fuser%2Farquivo.jpeg?alt=media&token=...');
      console.log('Caminho extraído: vendas/user/arquivo.jpeg');
      console.log('Firebase ref: storageRef(storage, "vendas/user/arquivo.jpeg")');
      console.log('Download: getBlob(fileRef) → Blob');
      
      console.log('\n🔍 Verificando se há documentos na página...');
      
      // Verificar se há seção de documentos
      const documentSections = document.querySelectorAll('*');
      let temDocumentos = false;
      let urlsFirebase = [];
      
      documentSections.forEach(element => {
        const text = element.textContent?.toLowerCase() || '';
        if (text.includes('documentos anexados') || text.includes('documento') || text.includes('anexo')) {
          temDocumentos = true;
        }
        
        // Procurar URLs do Firebase Storage no HTML
        if (text.includes('firebasestorage.googleapis.com')) {
          urlsFirebase.push(text.substring(0, 200) + '...');
        }
      });
      
      if (!temDocumentos) {
        console.log('\n❌ Nenhuma seção de documentos encontrada');
        console.log('📝 Certifique-se de estar numa venda que tem documentos anexados');
      } else {
        console.log('\n✅ Seção de documentos encontrada!');
        console.log(`📊 URLs do Firebase Storage detectadas: ${urlsFirebase.length}`);
      }
      
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
        console.log('🎉 PRONTO PARA TESTE DE CORREÇÃO CORS!');
        console.log('📝 Clique no botão para testar o download corrigido');
      }
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ NÃO deve aparecer "CORS policy" nos erros');
      console.log('2. ✅ Deve aparecer "baixando via Firebase SDK"');
      console.log('3. ✅ Deve aparecer "Download via Firebase SDK bem-sucedido"');
      console.log('4. ✅ Deve aparecer "X bytes" para cada documento');
      console.log('5. ✅ O arquivo ZIP deve ser gerado e baixado');
      
      console.log('\n🚀 BENEFÍCIOS DA CORREÇÃO:');
      console.log('✅ Sem problemas de CORS');
      console.log('✅ Download autenticado via Firebase SDK');
      console.log('✅ Mais confiável que fetch() direto');
      console.log('✅ Funciona com regras de Storage do Firebase');
      console.log('✅ Fallback para fetch() se necessário');
      
      // Testar extração de caminho (simulação)
      console.log('\n🧪 TESTE DE EXTRAÇÃO DE CAMINHO:');
      const testarExtracao = (url) => {
        try {
          const urlObj = new URL(url);
          const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
          if (pathMatch) {
            const filePath = decodeURIComponent(pathMatch[1]);
            console.log(`📝 URL: ${url.substring(0, 80)}...`);
            console.log(`📝 Caminho extraído: ${filePath}`);
            return true;
          }
          return false;
        } catch (error) {
          console.log(`❌ Erro na extração: ${error.message}`);
          return false;
        }
      };
      
      // Exemplos de teste
      const exemploUrl = 'https://firebasestorage.googleapis.com/v0/b/projeto.app/o/vendas%2Fuser%2Farquivo.jpeg?alt=media&token=123';
      testarExtracao(exemploUrl);
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCorrecaoCorsDownload();