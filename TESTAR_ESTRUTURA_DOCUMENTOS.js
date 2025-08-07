// Script para testar a estrutura dos documentos
// Execute no console do navegador na página de detalhes da venda

async function testarEstruturaDocumentos() {
  try {
    console.log('🔍 Testando estrutura dos documentos...');
    
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
      console.log('3. 🔄 Observe os logs detalhados no console');
      console.log('4. 🔄 Identifique onde exatamente está falhando');
      
      console.log('\n📋 LOGS ADICIONADOS PARA DEBUG:');
      console.log('✅ DEBUG COMPLETO - Iniciando baixarTodosDocumentos');
      console.log('✅ venda: [objeto completo]');
      console.log('✅ venda.documentos: [estrutura dos documentos]');
      console.log('✅ typeof venda.documentos');
      console.log('✅ Object.keys(venda.documentos)');
      console.log('✅ Object.keys length');
      console.log('✅ Para cada categoria: tipo, isArray, conteúdo, length');
      console.log('✅ Para cada documento: objeto completo, nome, conteúdo, tipo');
      
      console.log('\n📋 POSSÍVEIS PROBLEMAS E LOGS ESPERADOS:');
      
      console.log('\n🔍 CASO 1: venda.documentos não existe');
      console.log('Log esperado: "❌ venda.documentos é null/undefined"');
      
      console.log('\n🔍 CASO 2: venda.documentos existe mas está vazio');
      console.log('Log esperado: "❌ venda.documentos está vazio (sem chaves)"');
      
      console.log('\n🔍 CASO 3: docs não é um array');
      console.log('Log esperado: "❌ Categoria [X]: docs não é um array"');
      
      console.log('\n🔍 CASO 4: array de docs está vazio');
      console.log('Log esperado: "❌ Categoria [X]: array de docs está vazio"');
      
      console.log('\n🔍 CASO 5: documento não tem campo conteudo');
      console.log('Log esperado: "❌ Documento [X] não tem conteúdo"');
      
      console.log('\n🔍 CASO 6: formato do conteúdo não é reconhecido');
      console.log('Log esperado: "❌ Documento [X] formato não reconhecido"');
      
      console.log('\n🔍 CASO 7: erro no download via Firebase SDK');
      console.log('Log esperado: "⚠️ Erro no download via Firebase SDK"');
      
      console.log('\n📋 ESTRUTURAS POSSÍVEIS DOS DOCUMENTOS:');
      
      console.log('\n📄 ESTRUTURA CORRETA:');
      console.log(`{
  "documentos": {
    "comprovanteEndereco": [
      {
        "id": "doc_123",
        "nome": "arquivo.jpeg",
        "tipo": "image/jpeg",
        "conteudo": "https://firebasestorage.googleapis.com/...",
        "dataUpload": "2025-01-01T00:00:00.000Z"
      }
    ]
  }
}`);
      
      console.log('\n📄 ESTRUTURA PROBLEMA 1 - docs não é array:');
      console.log(`{
  "documentos": {
    "comprovanteEndereco": {
      "id": "doc_123",
      "nome": "arquivo.jpeg"
    }
  }
}`);
      
      console.log('\n📄 ESTRUTURA PROBLEMA 2 - sem campo conteudo:');
      console.log(`{
  "documentos": {
    "comprovanteEndereco": [
      {
        "id": "doc_123",
        "nome": "arquivo.jpeg",
        "tipo": "image/jpeg"
        // SEM campo "conteudo"
      }
    ]
  }
}`);
      
      console.log('\n📄 ESTRUTURA PROBLEMA 3 - conteudo vazio:');
      console.log(`{
  "documentos": {
    "comprovanteEndereco": [
      {
        "id": "doc_123",
        "nome": "arquivo.jpeg",
        "tipo": "image/jpeg",
        "conteudo": ""  // VAZIO
      }
    ]
  }
}`);
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Verifique se aparece "✅ venda.documentos existe e tem chaves"');
      console.log('2. ✅ Verifique quantas categorias são processadas');
      console.log('3. ✅ Verifique se cada categoria é um array');
      console.log('4. ✅ Verifique se cada documento tem campo "conteudo"');
      console.log('5. ✅ Verifique o formato do conteúdo (base64 ou URL)');
      console.log('6. ✅ Identifique em qual etapa está falhando');
      
      console.log('\n🎯 APÓS EXECUTAR O TESTE:');
      console.log('📝 Copie TODOS os logs da função baixarTodosDocumentos');
      console.log('📝 Cole aqui para eu analisar exatamente onde está o problema');
      console.log('📝 Vou ajustar a função conforme necessário');
      
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
        console.log('🎉 PRONTO PARA TESTE DE ESTRUTURA!');
        console.log('📝 Clique no botão e observe os logs detalhados');
      }
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarEstruturaDocumentos();