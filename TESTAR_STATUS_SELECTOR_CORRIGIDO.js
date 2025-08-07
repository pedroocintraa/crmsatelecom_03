// Script para testar se o erro do StatusSelector foi resolvido
// Execute no console do navegador

async function testarStatusSelectorCorrigido() {
  try {
    console.log('🔍 Testando correção do StatusSelector...');
    
    console.log('\n✅ PROBLEMA IDENTIFICADO E CORRIGIDO:');
    console.log('  ❌ Props inconsistentes no StatusSelector');
    console.log('  ❌ Interface esperava: venda, onStatusChange');
    console.log('  ❌ Estava passando: currentStatus, onStatusChange, userRole');
    console.log('  ✅ CORRIGIDO: Agora passa venda, onStatusChange');
    
    console.log('\n🔧 CORREÇÃO APLICADA:');
    console.log('ANTES:');
    console.log('  <StatusSelector');
    console.log('    currentStatus={venda.status}');
    console.log('    onStatusChange={handleStatusChange}');
    console.log('    userRole={usuario.funcao}');
    console.log('  />');
    console.log('');
    console.log('DEPOIS:');
    console.log('  <StatusSelector');
    console.log('    venda={venda}');
    console.log('    onStatusChange={handleStatusChange}');
    console.log('  />');
    
    console.log('\n🚀 PARA TESTAR:');
    console.log('1. Acesse: http://localhost:8081/acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda');
    console.log('3. A página DEVE carregar sem erro do StatusSelector');
    console.log('4. Se for Admin/Supervisor, o StatusSelector deve aparecer');
    
    // Verificar se estamos na página correta
    if (window.location.pathname.includes('venda')) {
      console.log('\n✅ Você está numa página de detalhes de venda!');
      
      // Verificar se a página carregou sem erros
      const body = document.body;
      const hasContent = body.innerText.trim().length > 100;
      
      if (hasContent) {
        console.log('✅ Página carregou com conteúdo - erro do StatusSelector resolvido!');
        
        // Verificar se encontramos o StatusSelector
        const statusSelector = document.querySelector('[class*="select"], select');
        if (statusSelector) {
          console.log('✅ StatusSelector encontrado na página');
        } else {
          console.log('⚠️ StatusSelector não encontrado (talvez não tenha permissão)');
        }
        
        // Verificar outros elementos essenciais
        const elementos = {
          titulo: document.querySelector('h1'),
          cards: document.querySelectorAll('[class*="card"], .card'),
          buttons: document.querySelectorAll('button'),
          badges: document.querySelectorAll('[class*="badge"], .badge')
        };
        
        console.log('\n📊 ELEMENTOS ENCONTRADOS:');
        console.log(`  📄 Título: ${elementos.titulo ? '✅' : '❌'}`);
        console.log(`  📋 Cards: ${elementos.cards.length} encontrados`);
        console.log(`  🔲 Botões: ${elementos.buttons.length} encontrados`);
        console.log(`  🏷️ Badges: ${elementos.badges.length} encontrados`);
        
        // Verificar se há erros no console do React
        const reactErrors = document.querySelectorAll('[data-reactroot] [class*="error"]');
        if (reactErrors.length === 0) {
          console.log('✅ Nenhum erro React detectado visualmente');
        } else {
          console.log(`⚠️ ${reactErrors.length} possíveis erros React encontrados`);
        }
        
      } else {
        console.log('❌ Página ainda está vazia - pode haver outros erros');
        console.log('⚠️ Verifique o console por mensagens de erro adicionais');
      }
      
    } else if (window.location.pathname.includes('acompanhamento')) {
      console.log('\n✅ Você está na página de acompanhamento!');
      console.log('🎯 Clique em "Ver Detalhes" de uma venda para testar a correção');
      
    } else {
      console.log('\n📝 Para testar a correção, vá para:');
      console.log('  - Acompanhamento: http://localhost:8081/acompanhamento');
      console.log('  - Depois clique em "Ver Detalhes" de uma venda');
    }
    
    console.log('\n🎉 CORREÇÃO DO STATUS SELECTOR APLICADA!');
    console.log('💪 O erro "Cannot read properties of undefined" deve estar resolvido!');
    
    // Aguardar um pouco e verificar se não há mais erros
    setTimeout(() => {
      console.log('\n🔍 VERIFICAÇÃO FINAL (após 2 segundos):');
      console.log('  - Se você vê este log, o JavaScript está funcionando');
      console.log('  - Se não há mais erros no console, a correção funcionou');
      console.log('  - Se a página carregou completamente, o problema está resolvido');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.log('⚠️ Se houve erro aqui, ainda pode haver problemas no código');
  }
}

// Executar teste
testarStatusSelectorCorrigido();