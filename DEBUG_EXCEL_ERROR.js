// 🔍 SCRIPT DE DEBUG - Erro no Relatório Excel
// Copie este código no console do navegador (F12) para debugar o erro

console.log('🔍 INICIANDO DEBUG DO RELATÓRIO EXCEL...');

// Função para testar geração do relatório com logs detalhados
async function debugRelatorioExcel() {
  try {
    console.log('\n📊 VERIFICANDO DADOS NECESSÁRIOS...');
    
    // Verificar se as bibliotecas estão carregadas
    console.log('1. Verificando bibliotecas:');
    console.log('   - XLSX:', typeof window.XLSX !== 'undefined' ? '✅' : '❌');
    console.log('   - saveAs:', typeof window.saveAs !== 'undefined' ? '✅' : '❌');
    
    // Verificar dados do contexto da página
    console.log('\n2. Verificando dados da página:');
    
    // Simular dados de teste se não houver
    const vendasTeste = [
      {
        id: 'teste-1',
        cliente: {
          nome: 'Cliente Teste',
          cpf: '123.456.789-00',
          telefone: '(11) 99999-9999',
          email: 'teste@teste.com',
          endereco: {
            rua: 'Rua Teste',
            numero: '123',
            bairro: 'Bairro Teste',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01234-567'
          }
        },
        dataVenda: new Date().toISOString(),
        status: 'habilitada',
        planoId: 'plano-1',
        planoNome: 'Plano Teste 100MB',
        vendedorId: 'vendedor-1',
        equipeId: 'equipe-1',
        observacoes: 'Teste de relatório'
      }
    ];
    
    const usuariosTeste = [
      {
        id: 'vendedor-1',
        nome: 'Vendedor',
        sobrenome: 'Teste',
        email: 'vendedor@teste.com'
      }
    ];
    
    const planosTeste = [
      {
        id: 'plano-1',
        nome: 'Plano Teste 100MB',
        valor: 79.90
      }
    ];
    
    console.log('   - Vendas de teste:', vendasTeste.length);
    console.log('   - Usuários de teste:', usuariosTeste.length);
    console.log('   - Planos de teste:', planosTeste.length);
    
    console.log('\n3. Testando geração de dados Excel...');
    
    // Testar formatação de dados
    const dadosExcel = vendasTeste.map(venda => {
      try {
        const vendedor = usuariosTeste.find(u => u.id === venda.vendedorId);
        const plano = planosTeste.find(p => p.id === venda.planoId);
        const dataVenda = new Date(venda.dataVenda);
        
        console.log('   - Processando venda:', venda.id);
        console.log('     - Vendedor encontrado:', vendedor ? '✅' : '❌');
        console.log('     - Plano encontrado:', plano ? '✅' : '❌');
        console.log('     - Data válida:', !isNaN(dataVenda.getTime()) ? '✅' : '❌');
        
        return {
          'ID da Venda': venda.id,
          'Data da Venda': dataVenda.toLocaleDateString('pt-BR'),
          'Cliente': venda.cliente.nome,
          'CPF': venda.cliente.cpf,
          'Plano': venda.planoNome || plano?.nome || 'N/A',
          'Valor do Plano': plano?.valor ? `R$ ${plano.valor.toFixed(2)}` : 'N/A',
          'Status': venda.status,
          'Vendedor': vendedor ? `${vendedor.nome} ${vendedor.sobrenome || ''}`.trim() : 'N/A'
        };
      } catch (err) {
        console.error('   ❌ Erro ao processar venda:', venda.id, err);
        throw err;
      }
    });
    
    console.log('   ✅ Dados formatados com sucesso:', dadosExcel.length, 'registros');
    
    console.log('\n4. Testando criação da planilha...');
    
    // Verificar se XLSX está disponível
    if (typeof XLSX === 'undefined') {
      throw new Error('Biblioteca XLSX não está carregada');
    }
    
    const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
    console.log('   ✅ Worksheet criada');
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');
    console.log('   ✅ Workbook criado');
    
    console.log('\n5. Testando geração do arquivo...');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    console.log('   ✅ Buffer Excel gerado:', excelBuffer.byteLength, 'bytes');
    
    console.log('\n6. Testando download...');
    
    if (typeof saveAs === 'undefined') {
      throw new Error('Função saveAs não está disponível');
    }
    
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    const nomeArquivo = `teste-relatorio_${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.xlsx`;
    
    saveAs(blob, nomeArquivo);
    
    console.log('   ✅ Download iniciado:', nomeArquivo);
    console.log('\n🎉 TESTE COMPLETO - RELATÓRIO GERADO COM SUCESSO!');
    
  } catch (error) {
    console.error('\n❌ ERRO ENCONTRADO:', error);
    console.log('\n🔧 INFORMAÇÕES DE DEBUG:');
    console.log('   - Tipo do erro:', error.constructor.name);
    console.log('   - Mensagem:', error.message);
    console.log('   - Stack:', error.stack);
    
    // Verificações específicas
    console.log('\n🔍 VERIFICAÇÕES ESPECÍFICAS:');
    console.log('   - window.XLSX:', typeof window.XLSX);
    console.log('   - window.saveAs:', typeof window.saveAs);
    console.log('   - Bibliotecas no window:', Object.keys(window).filter(k => k.includes('XLSX') || k.includes('saveAs')));
    
    return false;
  }
}

// Executar o teste
console.log('\n🚀 Executando teste do relatório Excel...');
debugRelatorioExcel();

// Função adicional para testar apenas a parte problemática
window.testarExcelSimples = function() {
  try {
    console.log('🧪 Teste Excel Simples...');
    
    const dados = [{ 'Teste': 'Valor', 'Numero': 123 }];
    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teste');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'teste-simples.xlsx');
    
    console.log('✅ Teste simples funcionou!');
  } catch (e) {
    console.error('❌ Teste simples falhou:', e);
  }
}

console.log('\n💡 Para testar manualmente, execute: testarExcelSimples()');
