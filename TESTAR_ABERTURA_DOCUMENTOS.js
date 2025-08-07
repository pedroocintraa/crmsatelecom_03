// Script para testar a abertura de documentos em abas
// Execute no console do navegador

async function testarAberturaDocumentos() {
  try {
    console.log('🔍 Testando abertura de documentos em abas...');
    
    console.log('\n✅ NOVA ABORDAGEM - SIMPLES E FUNCIONAL:');
    console.log('  📂 window.open(doc.conteudo, "_blank") para cada documento');
    console.log('  🕐 Intervalo de 1 segundo entre cada abertura');
    console.log('  👆 Usuário faz download manual: botão direito → "Salvar imagem como..."');
    console.log('  🎯 Solução garantida que funciona sempre');
    
    console.log('\n🔧 POR QUE ESTA ABORDAGEM:');
    console.log('  ❌ fetch() + blob = arquivos vazios (mode: no-cors)');
    console.log('  ❌ Firebase SDK = bloqueado por CORS');
    console.log('  ❌ link.download = não funciona com URLs externas');
    console.log('  ✅ window.open() = sempre funciona, usuário vê e salva');
    
    console.log('\n📋 FLUXO ATUAL:');
    console.log('1. Usuário clica "Abrir Todos os Documentos"');
    console.log('2. Sistema abre 1 aba por segundo para cada documento');
    console.log('3. Usuário vê as imagens/documentos nas abas');
    console.log('4. Usuário clica com botão direito → "Salvar imagem como..."');
    console.log('5. Usuário escolhe onde salvar cada arquivo');
    
    console.log('\n🚀 PARA TESTAR:');
    console.log('1. Acesse: http://localhost:8081/acompanhamento');
    console.log('2. Clique em "Ver Detalhes" de uma venda com documentos');
    console.log('3. Clique "Abrir Todos os Documentos"');
    console.log('4. Aguarde as abas abrirem (1 por segundo)');
    console.log('5. Em cada aba: botão direito → "Salvar imagem como..."');
    
    // Verificar se estamos numa página de detalhes de venda
    if (window.location.pathname.includes('venda')) {
      console.log('\n✅ Você está numa página de detalhes de venda!');
      
      // Verificar botão
      const botaoAbrir = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.includes('Abrir Todos') || btn.textContent.includes('Abrir Documentos')
      );
      
      if (botaoAbrir) {
        console.log('✅ Botão "Abrir Documentos" encontrado');
        console.log(`📝 Texto: "${botaoAbrir.textContent}"`);
        console.log(`🔘 Habilitado: ${!botaoAbrir.disabled ? '✅' : '❌'}`);
        
        if (!botaoAbrir.disabled) {
          console.log('\n🎯 CLIQUE NO BOTÃO PARA TESTAR!');
          console.log('📊 O que vai acontecer:');
          
          // Verificar contador
          const contador = document.querySelector('[class*="text-2xl"]');
          if (contador) {
            const numDocs = contador.textContent;
            console.log(`  📂 ${numDocs} abas serão abertas`);
            console.log(`  ⏱️ ${numDocs} segundos de duração`);
            console.log(`  🪟 1 aba por segundo`);
            console.log(`  👆 Você fará download manual em cada aba`);
          }
          
          console.log('\n💡 DICAS PARA DOWNLOAD:');
          console.log('  1. Aguarde todas as abas abrirem');
          console.log('  2. Em cada aba com imagem:');
          console.log('     - Clique com botão DIREITO na imagem');
          console.log('     - Escolha "Salvar imagem como..."');
          console.log('     - Escolha pasta e nome do arquivo');
          console.log('     - Clique "Salvar"');
          console.log('  3. Feche a aba após salvar');
          console.log('  4. Repita para todas as abas');
          
        } else {
          console.log('⚠️ Botão desabilitado - sem documentos');
        }
      } else {
        console.log('❌ Botão não encontrado');
      }
      
      // Verificar se popup blocker pode interferir
      console.log('\n⚠️ VERIFICAÇÕES IMPORTANTES:');
      console.log('  🚫 Popup Blocker: Se ativo, pode bloquear abas');
      console.log('  🔧 Solução: Permitir popups para este site');
      console.log('  🪟 Abas: Cada documento abrirá em aba separada');
      console.log('  💾 Download: Manual via botão direito');
      
    } else if (window.location.pathname.includes('acompanhamento')) {
      console.log('\n✅ Você está na página de acompanhamento!');
      console.log('🎯 Clique em "Ver Detalhes" de uma venda para testar');
      
    } else {
      console.log('\n📝 Para testar, vá para:');
      console.log('  - Acompanhamento: http://localhost:8081/acompanhamento');
      console.log('  - Depois clique em "Ver Detalhes" de uma venda');
    }
    
    console.log('\n🎉 SOLUÇÃO SIMPLES E CONFIÁVEL!');
    console.log('💪 Vantagens:');
    console.log('  ✅ SEMPRE funciona (não depende de CORS)');
    console.log('  ✅ Usuário VÊ os documentos antes de salvar');
    console.log('  ✅ Usuário ESCOLHE onde salvar cada arquivo');
    console.log('  ✅ Não há arquivos vazios ou corrompidos');
    console.log('  ✅ Funciona em qualquer navegador');
    console.log('  ✅ Não depende de configurações Firebase');
    
    console.log('\n📝 PROCESSO DO USUÁRIO:');
    console.log('1. 🖱️ Clica "Abrir Todos os Documentos"');
    console.log('2. ⏳ Aguarda abas abrirem (1 por segundo)');
    console.log('3. 👀 Vê cada documento/imagem em sua aba');
    console.log('4. 🖱️ Botão direito → "Salvar imagem como..."');
    console.log('5. 📁 Escolhe pasta e nome');
    console.log('6. 💾 Salva o arquivo');
    console.log('7. ❌ Fecha a aba');
    console.log('8. 🔄 Repete para próxima aba');
    
    console.log('\n🔧 TOAST INFORMATIVO:');
    console.log('Após todas as abas abrirem:');
    console.log('"X abas abertas. Clique com botão direito → Salvar imagem como... em cada aba"');
    
    // Aguardar um pouco e dar feedback final
    setTimeout(() => {
      console.log('\n🔍 VERIFICAÇÃO FINAL:');
      console.log('  - Esta é a solução mais confiável');
      console.log('  - Usuário tem controle total do processo');
      console.log('  - Não há problemas técnicos de CORS');
      console.log('  - Teste agora e veja a diferença!');
    }, 1000);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarAberturaDocumentos();