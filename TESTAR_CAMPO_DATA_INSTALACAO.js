// Script para testar o campo de data de instalação
// Execute no console do navegador

async function testarCampoDataInstalacao() {
  try {
    console.log('🧪 Testando campo de data de instalação...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há informações da venda
    const infoVendaSection = document.querySelector('[class*="Informações da Venda"]');
    if (!infoVendaSection) {
      console.log('❌ Seção "Informações da Venda" não encontrada');
      return;
    }

    console.log('✅ Seção "Informações da Venda" encontrada');
    
    // Verificar se há campo de data de instalação
    const dataInstalacaoField = infoVendaSection.querySelector('label:contains("Data de Instalação")');
    if (!dataInstalacaoField) {
      console.log('❌ Campo "Data de Instalação" não encontrado');
      return;
    }

    console.log('✅ Campo "Data de Instalação" encontrado');
    
    // Verificar se há botão de editar/adicionar
    const botaoEditar = infoVendaSection.querySelector('button:contains("Editar"), button:contains("Adicionar")');
    if (!botaoEditar) {
      console.log('❌ Botão de editar/adicionar não encontrado');
      return;
    }

    console.log('✅ Botão de editar/adicionar encontrado');
    
    // Verificar status da venda
    const statusBadge = document.querySelector('[class*="badge"]');
    if (statusBadge) {
      const status = statusBadge.textContent.trim();
      console.log(`📊 Status da venda: ${status}`);
      
      console.log('\n🔍 Verificações por status:');
      
      if (status === 'Pendente') {
        console.log('✅ Venda pendente - pode adicionar data de instalação');
        console.log('📝 Clique em "Adicionar" para definir a data de instalação');
      } else if (status === 'Em Atendimento') {
        console.log('✅ Venda em atendimento - pode adicionar data de instalação');
        console.log('📝 Clique em "Adicionar" para definir a data de instalação');
      } else if (status === 'Auditada') {
        console.log('✅ Venda auditada - data de instalação deve estar definida');
        console.log('📝 Clique em "Editar" para modificar a data de instalação');
      } else if (status === 'Gerada') {
        console.log('✅ Venda gerada - verificar se tem data de instalação');
        console.log('📝 Se tem data: deve ir para "Aguardando Habilitação"');
        console.log('📝 Se não tem data: fica como "Gerada"');
      } else if (status === 'Aguardando Habilitação') {
        console.log('✅ Venda aguardando habilitação - deve ter data de instalação');
        console.log('📝 Clique em "Editar" para modificar a data de instalação');
      } else if (status === 'Habilitada') {
        console.log('✅ Venda habilitada - pode ter data de instalação');
        console.log('📝 Clique em "Editar" para modificar a data de instalação');
      } else if (status === 'Instalada') {
        console.log('✅ Venda instalada - pode ter data de instalação');
        console.log('📝 Clique em "Editar" para modificar a data de instalação');
      } else if (status === 'Perdida') {
        console.log('✅ Venda perdida - data de instalação não é relevante');
      }
    }
    
    console.log('\n🛠️ Para testar o campo de data de instalação:');
    console.log('1. Clique no botão "Adicionar" ou "Editar"');
    console.log('2. Selecione uma data no campo de data');
    console.log('3. Clique em "Salvar"');
    console.log('4. Verifique se a data foi salva corretamente');
    console.log('5. Verifique se a venda foi atualizada no Firebase');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- O campo deve aparecer sempre (não apenas quando preenchido)');
    console.log('- Deve mostrar "Não definida" quando não há data');
    console.log('- Deve mostrar a data formatada quando há data');
    console.log('- O botão deve mostrar "Adicionar" quando não há data');
    console.log('- O botão deve mostrar "Editar" quando há data');
    console.log('- Deve permitir salvar e cancelar a edição');
    console.log('- Deve mostrar feedback de sucesso/erro');
    
    console.log('\n📋 Funcionalidades Esperadas:');
    console.log('✅ Campo sempre visível nas informações da venda');
    console.log('✅ Botão para adicionar/editar data de instalação');
    console.log('✅ Campo de data com validação');
    console.log('✅ Botões de salvar e cancelar');
    console.log('✅ Feedback visual de carregamento');
    console.log('✅ Toast de sucesso/erro');
    console.log('✅ Atualização em tempo real');
    console.log('✅ Integração com Firebase');
    
    console.log('\n🔍 Lógica de Negócio:');
    console.log('1. Data de instalação pode ser adicionada a qualquer momento');
    console.log('2. Data de instalação é obrigatória para "Auditada"');
    console.log('3. Vendas "Gerada" com data de instalação vão para "Aguardando Habilitação"');
    console.log('4. Vendas "Gerada" sem data de instalação ficam como "Gerada"');
    console.log('5. Data de instalação pode ser editada posteriormente');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCampoDataInstalacao(); 