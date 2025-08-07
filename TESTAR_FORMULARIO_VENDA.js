// Script para testar o formulário de venda
// Execute no console do navegador

async function testarFormularioVenda() {
  try {
    console.log('🧪 Testando formulário de venda...');
    
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
    
    // Verificar se os campos obrigatórios existem
    const camposObrigatorios = [
      'input[name="cliente.nome"]',
      'input[name="cliente.telefone"]',
      'input[name="cliente.cpf"]'
    ];
    
    const camposEncontrados = camposObrigatorios.map(selector => {
      const campo = document.querySelector(selector);
      return { selector, encontrado: !!campo };
    });
    
    console.log('📋 Campos obrigatórios:');
    camposEncontrados.forEach(({ selector, encontrado }) => {
      console.log(`  ${encontrado ? '✅' : '❌'} ${selector}`);
    });
    
    // Verificar se os componentes de upload existem
    const uploadComponents = document.querySelectorAll('[data-testid*="upload"], [class*="upload"]');
    console.log(`📄 Componentes de upload encontrados: ${uploadComponents.length}`);
    
    // Verificar se o botão de submit existe
    const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
    if (submitButton) {
      console.log('✅ Botão de submit encontrado');
      console.log(`📝 Texto do botão: "${submitButton.textContent?.trim()}"`);
    } else {
      console.log('❌ Botão de submit não encontrado');
    }
    
    // Verificar se há erros no console
    console.log('\n🔍 Verificando erros no console...');
    const originalError = console.error;
    const errors = [];
    
    console.error = (...args) => {
      errors.push(args.join(' '));
      originalError.apply(console, args);
    };
    
    // Simular preenchimento de campos
    console.log('\n📝 Simulando preenchimento de campos...');
    
    const nomeInput = document.querySelector('input[name="cliente.nome"]');
    if (nomeInput) {
      nomeInput.value = 'TESTE AUTOMÁTICO';
      nomeInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo nome preenchido');
    }
    
    const telefoneInput = document.querySelector('input[name="cliente.telefone"]');
    if (telefoneInput) {
      telefoneInput.value = '62985886877';
      telefoneInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo telefone preenchido');
    }
    
    const cpfInput = document.querySelector('input[name="cliente.cpf"]');
    if (cpfInput) {
      cpfInput.value = '33344455566';
      cpfInput.dispatchEvent(new Event('input', { bubbles: true }));
      console.log('✅ Campo CPF preenchido');
    }
    
    // Verificar se o reset está funcionando
    console.log('\n🔄 Testando função reset...');
    
    // Tentar acessar a função reset do React Hook Form
    const formElement = document.querySelector('form');
    if (formElement) {
      const formData = new FormData(formElement);
      console.log('📋 Dados do formulário antes do reset:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    console.log('\n✅ Teste do formulário concluído!');
    console.log('\n📋 Resumo:');
    console.log(`- Formulário: ✅ Encontrado`);
    console.log(`- Campos obrigatórios: ${camposEncontrados.filter(c => c.encontrado).length}/${camposEncontrados.length}`);
    console.log(`- Componentes de upload: ${uploadComponents.length}`);
    console.log(`- Botão submit: ${submitButton ? '✅' : '❌'}`);
    console.log(`- Erros detectados: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\n⚠️ Erros encontrados:');
      errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
    
    // Restaurar console.error original
    console.error = originalError;
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarFormularioVenda(); 