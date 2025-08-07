/**
 * Script utilitário para criar índices de CPF retroativos
 * Execute no console do navegador para criar índices para vendas existentes
 */

export async function executarCriacaoIndices() {
  try {
    console.log('🚀 Iniciando criação de índices de CPF...');
    
    const { vendasService } = await import('@/services/vendasService');
    await vendasService.criarIndicesRetroativos();
    
    console.log('✅ Criação de índices concluída!');
    
  } catch (error) {
    console.error('❌ Erro ao criar índices:', error);
  }
}

export async function testarValidacaoCpf(cpf: string) {
  try {
    console.log(`🧪 Testando validação para CPF: ${cpf}`);
    
    const { vendasService } = await import('@/services/vendasService');
    const isDuplicado = await vendasService.verificarCpfDuplicado(cpf);
    
    if (isDuplicado) {
      console.log(`❌ CPF ${cpf} JÁ EXISTE no sistema`);
    } else {
      console.log(`✅ CPF ${cpf} está disponível`);
    }
    
    return isDuplicado;
    
  } catch (error) {
    console.error('❌ Erro ao testar CPF:', error);
    return false;
  }
}

// Função para ser executada no console do navegador
(window as any).criarIndicesCpf = executarCriacaoIndices;
(window as any).testarCpf = testarValidacaoCpf;

console.log('🔧 Utilitários carregados:');
console.log('  - criarIndicesCpf() - Criar índices retroativos');
console.log('  - testarCpf("123.456.789-01") - Testar validação de CPF');