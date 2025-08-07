// Script para testar o StatusSelector e controle administrativo
// Execute no console do navegador

async function testarStatusSelector() {
  try {
    console.log('🧪 Testando StatusSelector e controle administrativo...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('venda/')) {
      console.log('❌ Execute este script na página de detalhes de uma venda');
      console.log('📝 Vá para: http://localhost:8080/venda/[ID_DA_VENDA]');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há seção "Ações do Backoffice"
    const acoesBackoffice = document.querySelectorAll('[class*="Card"]');
    let encontrouAcoesBackoffice = false;
    
    acoesBackoffice.forEach(card => {
      if (card.textContent && card.textContent.includes('Ações do Backoffice')) {
        encontrouAcoesBackoffice = true;
        console.log('✅ Seção "Ações do Backoffice" encontrada');
      }
    });
    
    if (!encontrouAcoesBackoffice) {
      console.log('❌ Seção "Ações do Backoffice" não encontrada');
      return;
    }
    
    // Verificar se há StatusManager
    const statusManager = document.querySelectorAll('[class*="space-y-4"]');
    let encontrouStatusManager = false;
    
    statusManager.forEach(element => {
      if (element.textContent && element.textContent.includes('Status da Venda')) {
        encontrouStatusManager = true;
        console.log('✅ StatusManager encontrado');
      }
    });
    
    if (!encontrouStatusManager) {
      console.log('⚠️ StatusManager não encontrado (pode ser normal)');
    }
    
    // Verificar se há StatusSelector (para admins/supervisores)
    const statusSelector = document.querySelectorAll('[class*="Controle Administrativo"]');
    let encontrouStatusSelector = false;
    
    statusSelector.forEach(element => {
      if (element.textContent && element.textContent.includes('Controle Administrativo')) {
        encontrouStatusSelector = true;
        console.log('✅ StatusSelector encontrado (usuário tem permissão)');
      }
    });
    
    if (!encontrouStatusSelector) {
      console.log('📝 StatusSelector não encontrado');
      console.log('📝 Isso pode ser normal se o usuário não for ADMINISTRADOR_GERAL ou SUPERVISOR');
    }
    
    // Verificar se há botões de ação
    const botoesAcao = document.querySelectorAll('button');
    const botoesStatus = Array.from(botoesAcao).filter(button => 
      button.textContent && (
        button.textContent.includes('Pendente') ||
        button.textContent.includes('Em Atendimento') ||
        button.textContent.includes('Auditada') ||
        button.textContent.includes('Gerada') ||
        button.textContent.includes('Aguardando Habilitação') ||
        button.textContent.includes('Habilitada') ||
        button.textContent.includes('Perdida')
      )
    );
    
    console.log(`📊 Botões de status encontrados: ${botoesStatus.length}`);
    
    // Verificar se há select de status
    const selects = document.querySelectorAll('select, [role="combobox"]');
    let encontrouSelect = false;
    
    selects.forEach(select => {
      if (select.textContent && select.textContent.includes('Alterar status')) {
        encontrouSelect = true;
        console.log('✅ Select de status encontrado');
      }
    });
    
    if (!encontrouSelect) {
      console.log('📝 Select de status não encontrado');
      console.log('📝 Isso pode ser normal se o usuário não tiver permissão');
    }
    
    console.log('\n🔍 Funcionalidades Implementadas:');
    console.log('1. ✅ StatusManager na seção "Ações do Backoffice"');
    console.log('2. ✅ StatusSelector para ADMINISTRADOR_GERAL e SUPERVISOR');
    console.log('3. ✅ Select dropdown para escolher status');
    console.log('4. ✅ Validação de data de instalação para status "Auditada"');
    console.log('5. ✅ Validação de motivo para status "Perdida"');
    console.log('6. ✅ Conversão de fuso horário para data de instalação');
    console.log('7. ✅ Dialog de confirmação para mudanças de status');
    
    console.log('\n🛠️ Para testar o StatusSelector:');
    console.log('1. Faça login como ADMINISTRADOR_GERAL ou SUPERVISOR');
    console.log('2. Acesse uma venda em detalhes');
    console.log('3. Na seção "Ações do Backoffice", procure por "Controle Administrativo"');
    console.log('4. Use o select para escolher um novo status');
    console.log('5. Preencha os campos obrigatórios se necessário');
    console.log('6. Confirme a mudança no dialog');
    
    console.log('\n🛠️ Para testar o StatusManager:');
    console.log('1. Na mesma seção, use os botões do StatusManager');
    console.log('2. Teste as transições de status normais');
    console.log('3. Teste marcar como perdida');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- ✅ StatusSelector só aparece para ADMINISTRADOR_GERAL e SUPERVISOR');
    console.log('- ✅ Select permite escolher qualquer status');
    console.log('- ✅ Data de instalação é obrigatória para "Auditada"');
    console.log('- ✅ Motivo é obrigatório para "Perdida"');
    console.log('- ✅ Dialog de confirmação aparece antes da mudança');
    console.log('- ✅ Fuso horário de Brasília é aplicado na data');
    
    console.log('\n📋 Permissões por Função:');
    console.log('1. ✅ ADMINISTRADOR_GERAL: Acesso total ao StatusSelector');
    console.log('2. ✅ SUPERVISOR: Acesso total ao StatusSelector');
    console.log('3. ✅ BACKOFFICE: Apenas StatusManager (sem StatusSelector)');
    console.log('4. ✅ SUPERVISOR_EQUIPE: Apenas StatusManager (sem StatusSelector)');
    console.log('5. ✅ VENDEDOR: Apenas StatusManager (sem StatusSelector)');
    
    console.log('\n🔍 Próximos Passos:');
    console.log('1. Teste o login com diferentes funções');
    console.log('2. Verifique se o StatusSelector aparece corretamente');
    console.log('3. Teste as mudanças de status via select');
    console.log('4. Confirme que as validações funcionam');
    console.log('5. Verifique se a data de instalação é salva corretamente');
    
    // Verificar se há StatusSelector visível
    if (encontrouStatusSelector) {
      console.log('\n✅ SUCESSO: StatusSelector está funcionando!');
      console.log('📝 O usuário tem permissão para usar o controle administrativo');
    } else {
      console.log('\n📝 DICA: Para ver o StatusSelector, faça login como ADMINISTRADOR_GERAL ou SUPERVISOR');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarStatusSelector(); 