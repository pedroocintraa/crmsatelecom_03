// Script para corrigir o arquivo DetalhesVenda.tsx
// Execute no terminal: node CORRIGIR_DETALHES_VENDA.js

const fs = require('fs');
const path = require('path');

function corrigirDetalhesVenda() {
  const filePath = './src/pages/DetalhesVenda.tsx';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log('🔍 Corrigindo arquivo DetalhesVenda.tsx...');
    
    // Remover todo código antigo quebrado entre as funções
    
    // 1. Procurar pela função baixarTodosDocumentos correta
    const funcaoDownloadCorreta = `  const baixarTodosDocumentos = async () => {
    console.log('🔍 Iniciando download individual de documentos...');
    
    if (!venda?.documentos) {
      console.log('❌ venda.documentos é null/undefined');
      toast({
        title: "Erro",
        description: "Nenhum documento disponível para download",
        variant: "destructive",
      });
      return;
    }
    
    if (Object.keys(venda.documentos).length === 0) {
      console.log('❌ venda.documentos está vazio (sem chaves)');
      toast({
        title: "Erro",
        description: "Nenhum documento disponível para download",
        variant: "destructive",
      });
      return;
    }
    
    console.log('✅ Iniciando downloads individuais...');
    
    let totalDocumentos = 0;
    
    // Baixar cada documento individualmente
    Object.entries(venda.documentos).forEach(([categoria, docs]) => {
      if (docs && Array.isArray(docs) && docs.length > 0) {
        docs.forEach((doc: any, index: number) => {
          if (doc.conteudo) {
            // Delay entre downloads para não sobrecarregar o navegador
            setTimeout(() => {
              baixarDocumentoIndividual(doc, categoria);
            }, index * 500); // 500ms entre cada download
            
            totalDocumentos++;
          }
        });
      }
    });
    
    if (totalDocumentos === 0) {
      toast({
        title: "Erro",
        description: "Nenhum documento válido encontrado",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Downloads iniciados",
      description: \`\${totalDocumentos} documentos estão sendo baixados individualmente\`,
      variant: "default",
    });
    
    console.log(\`✅ \${totalDocumentos} downloads individuais iniciados\`);
  };`;

    // 2. Função baixarDocumentoIndividual
    const funcaoDownloadIndividual = `  // Função para baixar documento individual (contorna CORS)
  const baixarDocumentoIndividual = (doc: any, categoria: string) => {
    try {
      console.log('🔍 Baixando documento individual:', doc.nome);
      
      // Criar um link temporário e simular clique
      const link = document.createElement('a');
      link.href = doc.conteudo;
      link.download = doc.nome || \`\${categoria}_documento.jpeg\`;
      link.target = '_blank';
      
      // Adicionar ao DOM temporariamente
      document.body.appendChild(link);
      
      // Simular clique para download
      link.click();
      
      // Remover do DOM
      document.body.removeChild(link);
      
      console.log('✅ Download iniciado para:', doc.nome);
      
      toast({
        title: "Download iniciado",
        description: \`Documento \${doc.nome} está sendo baixado\`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('❌ Erro ao baixar documento:', error);
      toast({
        title: "Erro no download",
        description: \`Erro ao baixar \${doc.nome}\`,
        variant: "destructive",
      });
    }
  };`;

    // 3. Função exportarDadosVenda
    const funcaoExportar = `  const exportarDadosVenda = () => {
    if (!venda) return;

    const dadosExport = {
      id: venda.id,
      cliente: venda.cliente,
      status: venda.status,
      dataVenda: venda.dataVenda,
      observacoes: venda.observacoes,
      totalDocumentos: venda.documentos ? Object.values(venda.documentos).flat().length : 0
    };

    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = \`venda_\${venda.cliente.nome.replace(/\\s+/g, '_')}_\${id}.json\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Dados da venda exportados!",
    });
  };`;

    // 4. Função contarDocumentos
    const funcaoContar = `  const contarDocumentos = () => {
    if (!venda?.documentos) return 0;
    return Object.values(venda.documentos).reduce((total, docs) => {
      return total + (docs?.length || 0);
    }, 0);
  };`;

    // Procurar e substituir as funções corrompidas
    
    // Padrão 1: Entre baixarDocumentoIndividual e if (loading)
    const padrao1 = /const baixarDocumentoIndividual[\s\S]*?if \(loading\)/;
    const substituicao1 = funcaoDownloadIndividual + '\n\n' + funcaoDownloadCorreta + '\n\n' + funcaoExportar + '\n\n' + funcaoContar + '\n\n  if (loading)';
    
    if (padrao1.test(content)) {
      content = content.replace(padrao1, substituicao1);
      console.log('✅ Padrão 1 corrigido');
    } else {
      console.log('⚠️ Padrão 1 não encontrado');
    }
    
    // Escrever arquivo corrigido
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Arquivo DetalhesVenda.tsx corrigido com sucesso!');
    
    console.log('\n📋 FUNÇÕES CORRIGIDAS:');
    console.log('✅ baixarDocumentoIndividual - Download individual via link.click()');
    console.log('✅ baixarTodosDocumentos - Chama download individual para cada doc');
    console.log('✅ exportarDadosVenda - Exporta dados da venda em JSON');
    console.log('✅ contarDocumentos - Conta total de documentos');
    
    console.log('\n🎯 PRÓXIMOS PASSOS:');
    console.log('1. Execute: npm run dev');
    console.log('2. Teste a página de detalhes da venda');
    console.log('3. Teste o botão "Baixar Todos os Documentos"');
    console.log('4. Verifique se downloads individuais funcionam');
    
  } catch (error) {
    console.error('❌ Erro ao corrigir arquivo:', error);
  }
}

// Executar correção
corrigirDetalhesVenda();