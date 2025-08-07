/**
 * Tipos e interfaces para o sistema de vendas
 */

export interface Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface Cliente {
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  endereco: Endereco;
}

export interface DocumentoAnexado {
  id: string;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  conteudo: string; // base64 para persistência
}

export interface DocumentosVenda {
  documentoClienteFrente?: DocumentoAnexado[];
  documentoClienteVerso?: DocumentoAnexado[];
  comprovanteEndereco?: DocumentoAnexado[];
  fachadaCasa?: DocumentoAnexado[];
  selfieCliente?: DocumentoAnexado[];
}

export interface DocumentoBase64 {
  id: string;
  nome: string;
  base64: string; // Dados base64 do documento
  dataBackup: string; // Data do backup
}

export interface DocumentosBase64 {
  documentoClienteFrente?: DocumentoBase64[];
  documentoClienteVerso?: DocumentoBase64[];
  comprovanteEndereco?: DocumentoBase64[];
  fachadaCasa?: DocumentoBase64[];
  selfieCliente?: DocumentoBase64[];
}

// Histórico de mudanças de status
export interface StatusChange {
  status: Venda["status"];
  timestamp: string; // ISO string
  userId: string;
  userName: string;
  extraData?: {
    dataInstalacao?: string;
    motivoPerda?: string;
    observacoes?: string;
  };
}

export interface Venda {
  id: string;
  cliente: Cliente;
  documentos?: DocumentosVenda;
  documentosBase64?: DocumentosBase64; // Backup base64 dos documentos para ZIP
  dataBackupDocumentos?: string; // Data do último backup base64
  status: "pendente" | "em_atendimento" | "auditada" | "gerada" | "aguardando_habilitacao" | "habilitada" | "perdida";
  dataVenda: string;
  dataGeracao: string; // Data de geração da venda
  observacoes?: string;
  vendedorId?: string; // ID do usuário que criou a venda
  vendedorNome?: string; // Nome do vendedor (para facilitar exibição)
  equipeNome?: string; // Nome da equipe do vendedor
  equipeId?: string; // ID da equipe do vendedor
  planoId?: string; // ID do plano selecionado
  planoNome?: string; // Nome do plano selecionado
  diaVencimento?: number; // Dia do vencimento (1-25)
  dataInstalacao?: string; // Data agendada da instalação (ISO string)
  dataInstalacaoReal?: string; // Data real da instalação (ISO string) - preenchida automaticamente quando status vira "habilitada"
  motivoPerda?: string; // Motivo quando marcada como perdida
  historicoStatus?: StatusChange[]; // Histórico de mudanças de status
  dataUltimaAtualizacao?: string; // Data da última atualização de status
  usuarioUltimaAtualizacao?: string; // Usuário que fez a última atualização
}

export interface VendaFormData extends Omit<Venda, "id" | "dataVenda" | "status"> {
  // Dados do formulário antes de ser processado
}

// Configurações de fluxo de status
export interface StatusFlowConfig {
  status: Venda["status"];
  label: string;
  description: string;
  color: string;
  icon: string;
  canTransitionTo: Venda["status"][];
  requiredPermissions: string[];
  requiresExtraData?: {
    dataInstalacao?: boolean;
    motivoPerda?: boolean;
    observacoes?: boolean;
  };
  validationRules?: {
    minDocuments?: number;
    requiredFields?: string[];
  };
}