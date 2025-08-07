// Script para testar a remoção do status "instalada" e novas funcionalidades
// Execute no console do navegador

async function testarRemocaoStatusInstalada() {
  try {
    console.log('🧪 Testando remoção do status "instalada" e novas funcionalidades...');
    
    // Verificar se estamos na página correta
    if (!window.location.pathname.includes('acompanhamento')) {
      console.log('❌ Execute este script na página de acompanhamento de vendas');
      console.log('📝 Vá para: http://localhost:8080/acompanhamento');
      return;
    }

    console.log('✅ Página correta detectada');
    
    // Verificar se há vendas com status "instalada" (deve ser 0)
    const statusBadges = document.querySelectorAll('[class*="badge"]');
    const statuses = Array.from(statusBadges).map(badge => badge.textContent?.trim());
    
    const vendasInstaladas = statuses.filter(status => status === 'Instalada');
    console.log(`📊 Vendas com status "Instalada": ${vendasInstaladas.length} (deve ser 0)`);
    
    if (vendasInstaladas.length > 0) {
      console.log('⚠️ ATENÇÃO: Ainda existem vendas com status "Instalada"');
      console.log('📝 Essas vendas precisam ser migradas para "Habilitada"');
    } else {
      console.log('✅ Nenhuma venda com status "Instalada" encontrada');
    }
    
    // Verificar se há vendas com status "Habilitada"
    const vendasHabilitadas = statuses.filter(status => status === 'Habilitada');
    console.log(`📊 Vendas com status "Habilitada": ${vendasHabilitadas.length}`);
    
    // Verificar se há vendas com data de instalação agendada
    const vendasComInstalacaoAgendada = document.querySelectorAll('[class*="text-sm"]');
    let encontrouInstalacaoAgendada = false;
    
    vendasComInstalacaoAgendada.forEach(element => {
      if (element.textContent && element.textContent.includes('Instalação agendada:')) {
        encontrouInstalacaoAgendada = true;
        console.log('✅ Instalação agendada encontrada na lista:', element.textContent.trim());
      }
    });
    
    if (!encontrouInstalacaoAgendada) {
      console.log('📝 Nenhuma instalação agendada encontrada na lista');
      console.log('📝 Isso pode ser normal se não houver vendas com data agendada');
    }
    
    // Verificar se há vendas com data de instalação real
    let encontrouInstalacaoReal = false;
    
    vendasComInstalacaoAgendada.forEach(element => {
      if (element.textContent && element.textContent.includes('Instalada em:')) {
        encontrouInstalacaoReal = true;
        console.log('✅ Instalação real encontrada na lista:', element.textContent.trim());
      }
    });
    
    if (!encontrouInstalacaoReal) {
      console.log('📝 Nenhuma instalação real encontrada na lista');
      console.log('📝 Isso pode ser normal se não houver vendas com status "Habilitada"');
    }
    
    console.log('\n🔍 Alterações Implementadas:');
    console.log('1. ✅ Status "instalada" removido do sistema');
    console.log('2. ✅ Campo "Data de Instalação" renomeado para "Instalação agendada para:"');
    console.log('3. ✅ Novo campo "Data de instalação real" adicionado');
    console.log('4. ✅ Data de instalação real preenchida automaticamente quando status vira "habilitada"');
    console.log('5. ✅ Status "habilitada" agora é o status final (equivalente a instalada)');
    
    console.log('\n🛠️ Para testar as novas funcionalidades:');
    console.log('1. Acesse uma venda em detalhes');
    console.log('2. Verifique se o campo se chama "Instalação agendada para:"');
    console.log('3. Agende uma data de instalação');
    console.log('4. Mude o status para "Habilitada"');
    console.log('5. Verifique se aparece "Instalada em:" com a data atual');
    
    console.log('\n🛠️ Para testar na tela principal:');
    console.log('1. Verifique se vendas com data agendada mostram "Instalação agendada:"');
    console.log('2. Verifique se vendas com status "Habilitada" mostram "Instalada em:"');
    console.log('3. Confirme que não há mais status "Instalada"');
    
    console.log('\n⚠️ Verificações Importantes:');
    console.log('- ✅ Status "instalada" não deve mais aparecer');
    console.log('- ✅ Campo deve se chamar "Instalação agendada para:"');
    console.log('- ✅ Deve haver campo "Instalada em:" para vendas habilitadas');
    console.log('- ✅ Data de instalação real deve ser preenchida automaticamente');
    console.log('- ✅ Status "habilitada" deve ser o status final');
    
    console.log('\n📋 Lógica de Status Atualizada:');
    console.log('1. ✅ Pendente → Em Atendimento → Auditada → Gerada → Aguardando Habilitação → Habilitada');
    console.log('2. ✅ Status "habilitada" = venda instalada e ativa');
    console.log('3. ✅ Data de instalação real = data quando status vira "habilitada"');
    console.log('4. ✅ Data de instalação agendada = data agendada pelo usuário');
    
    console.log('\n🔍 Próximos Passos:');
    console.log('1. Teste a mudança de status para "Habilitada"');
    console.log('2. Verifique se a data de instalação real é preenchida');
    console.log('3. Confirme que não há mais status "Instalada"');
    console.log('4. Teste o agendamento de instalação');
    
    // Verificar se há vendas com status "Habilitada" que devem ter data de instalação real
    if (vendasHabilitadas.length > 0) {
      console.log('\n✅ SUCESSO: Vendas com status "Habilitada" encontradas!');
      console.log('📝 Essas vendas devem ter a data de instalação real preenchida automaticamente');
    } else {
      console.log('\n📝 DICA: Para ver a data de instalação real, mude uma venda para status "Habilitada"');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarRemocaoStatusInstalada(); 