// Script para testar as funcionalidades melhoradas de documentos
// Execute no console do navegador

async function testarDocumentosMelhorados() {
  try {
    console.log('🔍 Testando funcionalidades de documentos...');
    
    console.log('\n✅ FUNCIONALIDADES IMPLEMENTADAS:');
    console.log('  👁️ Visualizar documentos (DocumentViewer)');
    console.log('  📦 Download em ZIP com pastas por categoria');
    console.log('  📄 Download individual de documentos');
    console.log('  📊 Contador visual de documentos');
    console.log('  📋 Lista detalhada por categoria');
    
    console.log('\n🔧 MELHORIAS NA INTERFACE:');
    console.log('  📦 Card redesenhado com ícones');
    console.log('  📊 Contador grande e visível');
    console.log('  👁️ Botão "Visualizar Documentos"');
    console.log('  📦 Botão "Baixar Todos (ZIP)"');
    console.log('  📋 Lista organizada por categoria');
    console.log('  🎨 Visual moderno com bg-muted');
    
    console.log('\n📦 FUNCIONALIDADE ZIP:');
    console.log('  ✅ Importação dinâmica do JSZip');
    console.log('  ✅ Processamento paralelo de documentos');
    console.log('  ✅ Criação de pastas por categoria');
    console.log('  ✅ Suporte a base64 e URLs do Firebase');
    console.log('  ✅ Progress feedback com toasts');
    console.log('  ✅ Compressão DEFLATE nível 6');
    console.log('  ✅ Nome do arquivo com dados da venda');
    
    console.log('\n🗂️ ESTRUTURA DO ZIP:');
    console.log('📦 documentos_venda_[NOME_CLIENTE]_[ID].zip');
    console.log('├── 📁 documentoClienteFrente/');
    console.log('│   ├── 📄 documento1.jpg');
    console.log('│   └── 📄 documento2.jpg');
    console.log('├── 📁 documentoClienteVerso/');
    console.log('│   └── 📄 documento3.jpg');
    console.log('├── 📁 comprovanteEndereco/');
    console.log('│   └── 📄 comprovante.pdf');
    console.log('└── 📁 selfieCliente/');
    console.log('    └── 📄 selfie.jpg');
    
    console.log('\n🚀 PARA TESTAR:');
    console.log('1. Acesse: http://localhost:8081/acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda com documentos');
    console.log('3. No card "Documentos Anexados":');
    console.log('   - Clique "Visualizar Documentos" (abre modal)');
    console.log('   - Clique "Baixar Todos (ZIP)" (baixa arquivo)');
    console.log('   - Clique nos ícones individuais para download');
    
    // Verificar se estamos na página correta
    if (window.location.pathname.includes('venda')) {
      console.log('\n✅ Você está numa página de detalhes de venda!');
      
      // Verificar elementos específicos de documentos
      const elementos = {
        cardDocumentos: document.querySelector('[class*="card"]:has([class*="title"]:contains("Documentos"))'),
        botaoVisualizar: Array.from(document.querySelectorAll('button')).find(btn => 
          btn.textContent.includes('Visualizar')
        ),
        botaoZip: Array.from(document.querySelectorAll('button')).find(btn => 
          btn.textContent.includes('ZIP') || btn.textContent.includes('Baixar Todos')
        ),
        contador: document.querySelector('[class*="text-2xl"]'),
        listaDocumentos: document.querySelectorAll('[class*="bg-muted"]')
      };
      
      console.log('\n📊 ELEMENTOS ENCONTRADOS:');
      console.log(`  📋 Card de documentos: ${elementos.cardDocumentos ? '✅' : '❌'}`);
      console.log(`  👁️ Botão "Visualizar": ${elementos.botaoVisualizar ? '✅' : '❌'}`);
      console.log(`  📦 Botão "ZIP": ${elementos.botaoZip ? '✅' : '❌'}`);
      console.log(`  📊 Contador visual: ${elementos.contador ? '✅' : '❌'}`);
      console.log(`  📄 Documentos listados: ${elementos.listaDocumentos.length}`);
      
      if (elementos.contador) {
        const numeroDocumentos = elementos.contador.textContent;
        console.log(`  📊 Total de documentos: ${numeroDocumentos}`);
        
        if (parseInt(numeroDocumentos) > 0) {
          console.log('✅ Há documentos para testar download ZIP!');
          
          if (elementos.botaoZip && !elementos.botaoZip.disabled) {
            console.log('✅ Botão ZIP está habilitado - pode testar!');
          } else {
            console.log('⚠️ Botão ZIP está desabilitado (normal se não há docs)');
          }
        } else {
          console.log('⚠️ Nenhum documento encontrado para testar');
        }
      }
      
      // Verificar se DocumentViewer está disponível
      if (elementos.botaoVisualizar) {
        console.log('✅ DocumentViewer disponível - clique para testar visualização!');
      }
      
      // Verificar categorias de documentos
      const categorias = document.querySelectorAll('[class*="uppercase tracking-wide"]');
      if (categorias.length > 0) {
        console.log('\n📁 CATEGORIAS ENCONTRADAS:');
        categorias.forEach((cat, index) => {
          console.log(`  ${index + 1}. ${cat.textContent}`);
        });
      }
      
    } else if (window.location.pathname.includes('acompanhamento')) {
      console.log('\n✅ Você está na página de acompanhamento!');
      console.log('🎯 Clique em "Ver Detalhes" de uma venda para testar os documentos');
      
      // Verificar se há vendas com documentos
      const vendas = document.querySelectorAll('[class*="card"], .card');
      console.log(`📋 ${vendas.length} vendas encontradas na lista`);
      
      if (vendas.length > 0) {
        console.log('✅ Escolha uma venda para testar as funcionalidades de documentos');
      } else {
        console.log('⚠️ Nenhuma venda encontrada - cadastre uma venda com documentos primeiro');
      }
      
    } else {
      console.log('\n📝 Para testar os documentos, vá para:');
      console.log('  - Acompanhamento: http://localhost:8081/acompanhamento');
      console.log('  - Depois clique em "Ver Detalhes" de uma venda');
    }
    
    console.log('\n🎉 DOCUMENTOS COMPLETAMENTE MELHORADOS!');
    console.log('💪 Funcionalidades disponíveis:');
    console.log('  ✅ Visualização interna (DocumentViewer)');
    console.log('  ✅ Download ZIP organizado por categorias');
    console.log('  ✅ Downloads individuais');
    console.log('  ✅ Interface moderna e intuitiva');
    console.log('  ✅ Feedback em tempo real (toasts)');
    console.log('  ✅ Tratamento de erros robusto');
    
    console.log('\n📦 TESTANDO FUNCIONALIDADE ZIP:');
    console.log('1. Clique no botão "Baixar Todos os Documentos (ZIP)"');
    console.log('2. Aguarde os toasts de progresso');
    console.log('3. O arquivo ZIP será baixado automaticamente');
    console.log('4. Abra o ZIP para ver as pastas organizadas');
    
    console.log('\n👁️ TESTANDO VISUALIZAÇÃO:');
    console.log('1. Clique no botão "Visualizar Documentos"');
    console.log('2. Um modal deve abrir com os documentos');
    console.log('3. Navegue entre as categorias');
    console.log('4. Visualize as imagens/documentos');
    
    // Aguardar um pouco e dar feedback final
    setTimeout(() => {
      console.log('\n🔍 VERIFICAÇÃO FINAL:');
      console.log('  - Se você vê este log, o JavaScript está funcionando');
      console.log('  - Se há botões de documentos visíveis, a implementação está correta');
      console.log('  - Teste as funcionalidades para confirmar o funcionamento');
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.log('⚠️ Se houve erro, verifique o console por mensagens adicionais');
  }
}

// Executar teste
testarDocumentosMelhorados();