import { ref, set } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';

export const createSampleVendas = async () => {
  const sampleVendas = {
    'venda1': {
      id: 'venda1',
      clienteNome: 'João Silva',
      clienteTelefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      plano: '100MB',
      valor: 89.90,
      status: 'HABILITADA',
      vendedorId: 'MmKJUH5zgQN5TlGqe1iAMamBMkj1',
      vendedorNome: 'Administrador',
      equipeNome: 'Equipe A',
      dataCriacao: '2024-01-15T10:00:00.000Z',
      observacoes: 'Cliente interessado em planos de internet'
    },
    'venda2': {
      id: 'venda2',
      clienteNome: 'Maria Santos',
      clienteTelefone: '(11) 88888-8888',
      endereco: 'Av. Paulista, 456',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-000',
      plano: '200MB',
      valor: 129.90,
      status: 'GERADA',
      vendedorId: 'MmKJUH5zgQN5TlGqe1iAMamBMkj1',
      vendedorNome: 'Administrador',
      equipeNome: 'Equipe A',
      dataCriacao: '2024-01-16T14:30:00.000Z',
      observacoes: 'Cliente satisfeito com a proposta'
    },
    'venda3': {
      id: 'venda3',
      clienteNome: 'Pedro Oliveira',
      clienteTelefone: '(11) 77777-7777',
      endereco: 'Rua Augusta, 789',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01305-000',
      plano: '500MB',
      valor: 199.90,
      status: 'PENDENTE',
      vendedorId: 'MmKJUH5zgQN5TlGqe1iAMamBMkj1',
      vendedorNome: 'Administrador',
      equipeNome: 'Equipe A',
      dataCriacao: '2024-01-17T09:15:00.000Z',
      observacoes: 'Aguardando confirmação do cliente'
    },
    'venda4': {
      id: 'venda4',
      clienteNome: 'Ana Costa',
      clienteTelefone: '(11) 66666-6666',
      endereco: 'Rua Oscar Freire, 321',
      bairro: 'Jardins',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01426-000',
      plano: '100MB',
      valor: 89.90,
      status: 'EM_ANDAMENTO',
      vendedorId: 'MmKJUH5zgQN5TlGqe1iAMamBMkj1',
      vendedorNome: 'Administrador',
      equipeNome: 'Equipe A',
      dataCriacao: '2024-01-18T16:45:00.000Z',
      observacoes: 'Processando instalação'
    },
    'venda5': {
      id: 'venda5',
      clienteNome: 'Carlos Ferreira',
      clienteTelefone: '(11) 55555-5555',
      endereco: 'Av. Brigadeiro Faria Lima, 654',
      bairro: 'Itaim Bibi',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '04538-000',
      plano: '1GB',
      valor: 299.90,
      status: 'AUDITADA',
      vendedorId: 'MmKJUH5zgQN5TlGqe1iAMamBMkj1',
      vendedorNome: 'Administrador',
      equipeNome: 'Equipe A',
      dataCriacao: '2024-01-19T11:20:00.000Z',
      observacoes: 'Venda auditada e aprovada'
    }
  };

  try {
    await set(ref(realtimeDb, 'vendas'), sampleVendas);
    console.log('✅ Dados de exemplo criados com sucesso!');
    console.log('📊 Vendas criadas:', Object.keys(sampleVendas).length);
    return true;
  } catch (error) {
    console.error('❌ Erro ao criar dados de exemplo:', error);
    return false;
  }
};

export default createSampleVendas; 