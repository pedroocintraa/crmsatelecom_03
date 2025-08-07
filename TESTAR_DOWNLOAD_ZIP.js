// Script para testar o download de documentos em ZIP
// Execute no console do navegador

async function testarDownloadZip() {
  try {
    console.log('🔍 Testando download de documentos em ZIP...');
    
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
      console.log('2. 🔄 Procure pela seção "Documentos Anexados"');
      console.log('3. 🔄 Clique no botão "Baixar Todos os Documentos"');
      console.log('4. 🔄 Verifique se o download do ZIP inicia automaticamente');
      console.log('5. 🔄 Abra o arquivo ZIP baixado e verifique se contém todos os documentos');
      
      console.log('\n📋 CORREÇÕES IMPLEMENTADAS:');
      console.log('✅ Função baixarTodosDocumentos agora suporta URLs do Firebase Storage');
      console.log('✅ Downloads de documentos são feitos em paralelo (melhor performance)');
      console.log('✅ Suporte tanto para base64 quanto para URLs');
      console.log('✅ Melhor tratamento de erros por documento');
      console.log('✅ Logs detalhados para debug');
      
      console.log('\n📋 LOGS ESPERADOS NO DOWNLOAD:');
      console.log('- 🔍 Processando documentos...');
      console.log('- 🔍 Processando categoria: comprovanteEndereco');
      console.log('- 📄 Documento xxx.jpeg é URL do Storage, fazendo download...');
      console.log('- ✅ Documento xxx.jpeg baixado com sucesso (12345 bytes)');
      console.log('- 🔍 Iniciando X downloads...');
      console.log('- ✅ Documento xxx.jpeg adicionado ao ZIP');
      console.log('- 🔍 Total de documentos processados: X');
      console.log('- 📁 Gerando arquivo ZIP...');
      console.log('- 📁 Arquivo ZIP gerado: documentos-venda-[ID].zip');
      console.log('- ✅ Download iniciado com sucesso!');
      
      console.log('\n🔍 Verificando se há documentos na página...');
      
      // Verificar se há seção de documentos
      const documentSections = document.querySelectorAll('*');
      let temDocumentos = false;
      
      documentSections.forEach(element => {
        const text = element.textContent?.toLowerCase() || '';
        if (text.includes('documentos anexados') || text.includes('documento') || text.includes('anexo')) {
          temDocumentos = true;
        }
      });
      
      if (!temDocumentos) {
        console.log('\n❌ Nenhuma seção de documentos encontrada');
        console.log('📝 Certifique-se de estar numa venda que tem documentos anexados');
      } else {
        console.log('\n✅ Seção de documentos encontrada!');
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
        console.log('🎉 PRONTO PARA TESTE DE DOWNLOAD!');
        console.log('📝 Clique no botão para testar o download');
      }
      
      console.log('\n🔧 DIFERENÇAS DA CORREÇÃO:');
      console.log('❌ ANTES: Esperava base64 (doc.conteudo.includes(","))');
      console.log('✅ AGORA: Suporta URLs do Firebase Storage');
      console.log('❌ ANTES: Processamento sequencial');
      console.log('✅ AGORA: Downloads em paralelo');
      console.log('❌ ANTES: atob() para base64');
      console.log('✅ AGORA: fetch() para URLs');
      
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('1. ✅ Verifique se aparece "é URL do Storage, fazendo download"');
      console.log('2. ✅ Verifique se mostra "baixado com sucesso (X bytes)"');
      console.log('3. ✅ Verifique se o ZIP é gerado e baixado');
      console.log('4. ✅ Verifique se o ZIP contém os documentos organizados por pasta');
      console.log('5. ✅ Verifique se os documentos dentro do ZIP abrem corretamente');
      
      console.log('\n📦 ESTRUTURA ESPERADA DO ZIP:');
      console.log('📁 documentos-venda-[ID].zip');
      console.log('  📁 comprovanteEndereco/');
      console.log('    📄 documento1.jpeg');
      console.log('  📁 documentoClienteFrente/');
      console.log('    📄 documento2.jpeg');
      console.log('  📁 documentoClienteVerso/');
      console.log('    📄 documento3.jpeg');
      console.log('  📁 fachadaCasa/');
      console.log('    📄 documento4.jpeg');
      console.log('  📁 selfieCliente/');
      console.log('    📄 documento5.jpeg');
      
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarDownloadZip();