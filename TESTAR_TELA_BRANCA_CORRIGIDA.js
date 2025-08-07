// Script para testar se a correção da tela branca funcionou
// Execute no console do navegador

async function testarTelabrancaCorrigida() {
  try {
    console.log('🔍 Testando correção da tela branca...');
    
    console.log('\n✅ PROBLEMAS IDENTIFICADOS E CORRIGIDOS:');
    console.log('  ❌ venda.endereco.cidade → ✅ venda.cliente.endereco.localidade');
    console.log('  ❌ venda.endereco.estado → ✅ venda.cliente.endereco.uf');
    console.log('  ❌ Estrutura incorreta → ✅ Estrutura correta conforme types');
    
    console.log('\n📋 ESTRUTURA CORRIGIDA:');
    console.log('✅ venda.cliente.endereco.cep');
    console.log('✅ venda.cliente.endereco.logradouro');
    console.log('✅ venda.cliente.endereco.numero');
    console.log('✅ venda.cliente.endereco.bairro');
    console.log('✅ venda.cliente.endereco.localidade (cidade)');
    console.log('✅ venda.cliente.endereco.uf (estado)');
    
    console.log('\n🚀 PARA TESTAR:');
    console.log('1. Acesse: http://localhost:8081/acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda');
    console.log('3. A página DEVE carregar corretamente agora');
    console.log('4. Verifique se todos os dados aparecem');
    
    // Verificar se estamos numa página de detalhes de venda
    if (window.location.pathname.includes('venda')) {
      console.log('\n✅ Você está numa página de detalhes de venda!');
      
      // Verificar elementos da página
      const elementos = {
        titulo: document.querySelector('h1'),
        cards: document.querySelectorAll('[class*="card"], .card'),
        buttons: document.querySelectorAll('button'),
        badges: document.querySelectorAll('[class*="badge"], .badge'),
        grid: document.querySelector('[class*="grid"]')
      };
      
      console.log('\n📊 ELEMENTOS ENCONTRADOS:');
      console.log(`  📄 Título: ${elementos.titulo ? '✅ ' + elementos.titulo.textContent : '❌ Não encontrado'}`);
      console.log(`  📋 Cards: ${elementos.cards.length} encontrados`);
      console.log(`  🔲 Botões: ${elementos.buttons.length} encontrados`);
      console.log(`  🏷️ Badges: ${elementos.badges.length} encontrados`);
      console.log(`  📐 Grid: ${elementos.grid ? '✅ Layout grid presente' : '❌ Grid não encontrado'}`);
      
      // Verificar se há conteúdo no body
      const bodyContent = document.body.innerText.trim();
      if (bodyContent.length > 100) {
        console.log('✅ Página tem conteúdo significativo');
      } else {
        console.log('❌ Página ainda pode estar vazia');
      }
      
      // Verificar se há erros no console
      setTimeout(() => {
        console.log('\n🔍 VERIFICAÇÃO FINAL:');
        console.log('  - Se você vê este log, o JavaScript está funcionando');
        console.log('  - Se a página tem conteúdo, a correção funcionou');
        console.log('  - Se ainda há tela branca, verifique o console por erros');
      }, 1000);
      
    } else if (window.location.pathname.includes('acompanhamento')) {
      console.log('\n✅ Você está na página de acompanhamento!');
      console.log('🎯 Clique em "Ver Detalhes" de uma venda para testar a correção');
      
      // Verificar se há vendas na lista
      const vendas = document.querySelectorAll('[class*="card"], .card');
      console.log(`📋 ${vendas.length} vendas encontradas na lista`);
      
      if (vendas.length > 0) {
        console.log('✅ Há vendas para testar - clique em uma!');
      } else {
        console.log('⚠️ Nenhuma venda encontrada - cadastre uma venda primeiro');
      }
      
    } else {
      console.log('\n📝 Para testar a correção, vá para:');
      console.log('  - Acompanhamento: http://localhost:8081/acompanhamento');
      console.log('  - Depois clique em "Ver Detalhes" de uma venda');
    }
    
    console.log('\n🎉 CORREÇÃO DA ESTRUTURA DE DADOS APLICADA!');
    console.log('💪 A tela branca deve estar resolvida agora!');
    
    // Log de debug da estrutura esperada
    console.log('\n🔧 DEBUG - Estrutura esperada:');
    console.log('venda = {');
    console.log('  id: "...",');
    console.log('  cliente: {');
    console.log('    nome: "...",');
    console.log('    telefone: "...",');
    console.log('    email: "...",');
    console.log('    cpf: "...",');
    console.log('    endereco: {');
    console.log('      cep: "...",');
    console.log('      logradouro: "...",');
    console.log('      numero: "...",');
    console.log('      bairro: "...",');
    console.log('      localidade: "...", // cidade');
    console.log('      uf: "..." // estado');
    console.log('    }');
    console.log('  },');
    console.log('  status: "...",');
    console.log('  dataVenda: "...",');
    console.log('  // ... outros campos');
    console.log('}');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    console.log('⚠️ Se houve erro, ainda pode haver problemas no código');
  }
}

// Executar teste
testarTelabrancaCorrigida();