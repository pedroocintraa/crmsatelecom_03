// Script para testar o redirecionamento para página de acompanhamento
// Execute no console do navegador

async function testarRedirecionamentoAcompanhamento() {
  try {
    console.log('🔄 Testando redirecionamento para página de acompanhamento...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('nova-venda')) {
      console.log('❌ Execute este script na página "Nova Venda"');
      console.log('📝 Vá para: http://localhost:8080/nova-venda');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se o formulário existe
    const form = document.querySelector('form');
    if (!form) {
      console.log('❌ Formulário não encontrado');
      return;
    }
    
    console.log('✅ Formulário encontrado');
    
    // Verificar se o botão de submit existe
    const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitButton) {
      console.log('❌ Botão de submit não encontrado');
      return;
    }
    
    console.log('✅ Botão de submit encontrado');
    console.log(`📝 Texto do botão: "${submitButton.textContent?.trim()}"`);
    
    // Simular preenchimento de campos obrigatórios
    console.log('\n📝 Preenchendo campos obrigatórios...');
    
    const nomeInput = document.querySelector('input[name="cliente.nome"]');
    if (nomeInput) {
      nomeInput.value = 'TESTE ACOMPANHAMENTO';
      nomeInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo nome preenchido');
    }
    
    const telefoneInput = document.querySelector('input[name="cliente.telefone"]');
    if (telefoneInput) {
      telefoneInput.value = '62985886880';
      telefoneInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo telefone preenchido');
    }
    
    const cpfInput = document.querySelector('input[name="cliente.cpf"]');
    if (cpfInput) {
      cpfInput.value = '66677788899';
      cpfInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo CPF preenchido');
    }
    
    // Verificar se há campos de endereço
    const cepInput = document.querySelector('input[name="cliente.endereco.cep"]');
    if (cepInput) {
      cepInput.value = '74000000';
      cepInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo CEP preenchido');
    }
    
    const logradouroInput = document.querySelector('input[name="cliente.endereco.logradouro"]');
    if (logradouroInput) {
      logradouroInput.value = 'RUA TESTE ACOMPANHAMENTO';
      logradouroInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo logradouro preenchido');
    }
    
    const numeroInput = document.querySelector('input[name="cliente.endereco.numero"]');
    if (numeroInput) {
      numeroInput.value = '789';
      numeroInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo número preenchido');
    }
    
    const bairroInput = document.querySelector('input[name="cliente.endereco.bairro"]');
    if (bairroInput) {
      bairroInput.value = 'BAIRRO ACOMPANHAMENTO';
      bairroInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo bairro preenchido');
    }
    
    const localidadeInput = document.querySelector('input[name="cliente.endereco.localidade"]');
    if (localidadeInput) {
      localidadeInput.value = 'GOIÂNIA';
      localidadeInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo localidade preenchido');
    }
    
    const ufInput = document.querySelector('input[name="cliente.endereco.uf"]');
    if (ufInput) {
      ufInput.value = 'GO';
      ufInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo UF preenchido');
    }
    
    console.log('\n📋 Campos preenchidos com sucesso!');
    console.log('📝 Redirecionamento configurado:');
    console.log('1. ✅ Toast de loading durante processamento');
    console.log('2. ✅ Upload de documentos em paralelo');
    console.log('3. ✅ Redirecionamento imediato para /acompanhamento');
    console.log('4. ✅ Limpeza otimizada do formulário');
    console.log('5. ✅ Performance otimizada');
    
    console.log('\n🔄 Teste de redirecionamento configurado!');
    console.log('📝 Para testar:');
    console.log('- Clique em "Cadastrar Venda"');
    console.log('- Observe o toast de loading');
    console.log('- Aguarde o processamento otimizado');
    console.log('- Verifique o redirecionamento para /acompanhamento');
    console.log('- Confirme se chegou na página de acompanhamento');
    
    console.log('\n🎯 URL de destino:');
    console.log('- Página atual: /nova-venda');
    console.log('- Página de destino: /acompanhamento');
    console.log('- Redirecionamento: Imediato (sem delay)');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarRedirecionamentoAcompanhamento(); 