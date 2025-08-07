// Script para testar o redirecionamento após cadastro de venda
// Execute no console do navegador

async function testarRedirecionamentoVenda() {
  try {
    console.log('🧪 Testando redirecionamento após cadastro de venda...');
    
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
      nomeInput.value = 'TESTE REDIRECIONAMENTO';
      nomeInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo nome preenchido');
    }
    
    const telefoneInput = document.querySelector('input[name="cliente.telefone"]');
    if (telefoneInput) {
      telefoneInput.value = '62985886878';
      telefoneInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo telefone preenchido');
    }
    
    const cpfInput = document.querySelector('input[name="cliente.cpf"]');
    if (cpfInput) {
      cpfInput.value = '44455566677';
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
      logradouroInput.value = 'RUA TESTE REDIRECIONAMENTO';
      logradouroInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo logradouro preenchido');
    }
    
    const numeroInput = document.querySelector('input[name="cliente.endereco.numero"]');
    if (numeroInput) {
      numeroInput.value = '123';
      numeroInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo número preenchido');
    }
    
    const bairroInput = document.querySelector('input[name="cliente.endereco.bairro"]');
    if (bairroInput) {
      bairroInput.value = 'BAIRRO TESTE';
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
    console.log('📝 Próximos passos:');
    console.log('1. Clique no botão "Cadastrar Venda"');
    console.log('2. Aguarde o toast de sucesso');
    console.log('3. Observe o redirecionamento para /vendas após 1.5 segundos');
    console.log('4. Verifique se a venda aparece na lista');
    
    console.log('\n🔄 Teste de redirecionamento configurado!');
    console.log('📝 Para testar:');
    console.log('- Clique em "Cadastrar Venda"');
    console.log('- Aguarde o redirecionamento automático');
    console.log('- Verifique se chegou na página de vendas');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarRedirecionamentoVenda(); 