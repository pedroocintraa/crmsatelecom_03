import { Venda, StatusChange, StatusFlowConfig } from '../types/venda';

export class VendaStatusService {
  private static readonly STATUS_FLOW: StatusFlowConfig[] = [
    {
      status: "pendente",
      label: "Pendente",
      description: "Venda cadastrada, aguardando iniciar processo",
      color: "bg-gray-100 text-gray-800",
      icon: "clock",
      canTransitionTo: ["em_atendimento", "perdida"],
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR", "SUPERVISOR_EQUIPE", "VENDEDOR"],
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    },
    {
      status: "em_atendimento",
      label: "Em Atendimento",
      description: "Venda em processo de atendimento",
      color: "bg-blue-100 text-blue-800",
      icon: "play",
      canTransitionTo: ["auditada", "perdida"],
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR", "SUPERVISOR_EQUIPE"],
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    },
    {
      status: "auditada",
      label: "Auditada",
      description: "Venda auditada e aprovada",
      color: "bg-purple-100 text-purple-800",
      icon: "check",
      canTransitionTo: ["gerada", "perdida"],
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR"],
      requiresExtraData: {
        dataInstalacao: true // Requer data de instalação
      },
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    },
    {
      status: "gerada",
      label: "Gerada",
      description: "Venda gerada no sistema da operadora",
      color: "bg-green-100 text-green-800",
      icon: "file-check",
      canTransitionTo: ["aguardando_habilitacao", "perdida"],
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR"],
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    },
    {
      status: "aguardando_habilitacao",
      label: "Aguardando Habilitação",
      description: "Aguardando habilitação da operadora",
      color: "bg-orange-100 text-orange-800",
      icon: "calendar",
      canTransitionTo: ["habilitada", "perdida"],
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR"],
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento", "dataInstalacao"]
      }
    },
    {
      status: "habilitada",
      label: "Habilitada",
      description: "Venda habilitada e instalada",
      color: "bg-emerald-100 text-emerald-800",
      icon: "check-circle",
      canTransitionTo: [], // Status final - não pode mais ser alterada
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR", "SUPERVISOR_EQUIPE"],
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    },
    {
      status: "perdida",
      label: "Perdida",
      description: "Venda perdida",
      color: "bg-red-100 text-red-800",
      icon: "x",
      canTransitionTo: [], // Status final
      requiredPermissions: ["ADMINISTRADOR_GERAL", "SUPERVISOR", "SUPERVISOR_EQUIPE"],
      requiresExtraData: {
        motivoPerda: true // Requer motivo da perda
      },
      validationRules: {
        minDocuments: 0, // Não requer documentos mínimos
        requiredFields: ["cliente.nome", "cliente.telefone", "planoId", "diaVencimento"]
      }
    }
  ];

  /**
   * Obtém a configuração de um status específico
   */
  static getStatusConfig(status: Venda["status"]): StatusFlowConfig | undefined {
    return this.STATUS_FLOW.find(config => config.status === status);
  }

  /**
   * Verifica se uma transição de status é válida
   */
  static canTransition(fromStatus: Venda["status"], toStatus: Venda["status"]): boolean {
    const config = this.getStatusConfig(fromStatus);
    return config?.canTransitionTo.includes(toStatus) || false;
  }

  /**
   * Obtém os próximos status possíveis para uma venda
   */
  static getNextPossibleStatuses(currentStatus: Venda["status"]): Venda["status"][] {
    const config = this.getStatusConfig(currentStatus);
    return config?.canTransitionTo || [];
  }

  /**
   * Verifica se o usuário tem permissão para alterar o status
   */
  static hasPermissionToChangeStatus(
    currentStatus: Venda["status"], 
    targetStatus: Venda["status"], 
    userRole: string
  ): boolean {
    const config = this.getStatusConfig(currentStatus);
    const targetConfig = this.getStatusConfig(targetStatus);
    
    if (!config || !targetConfig) return false;
    
    // Verificar se a transição é válida
    if (!this.canTransition(currentStatus, targetStatus)) return false;
    
    // Verificar permissões do usuário
    return targetConfig.requiredPermissions.includes(userRole);
  }

  /**
   * Valida se uma venda pode ser movida para um novo status
   */
  static validateStatusTransition(
    venda: Venda, 
    targetStatus: Venda["status"], 
    userRole: string,
    extraData?: any
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    console.log('🔍 validateStatusTransition Debug:', {
      vendaStatus: venda.status,
      targetStatus,
      userRole,
      extraData,
      vendaDataInstalacao: venda.dataInstalacao
    });
    
    // Verificar permissões
    if (!this.hasPermissionToChangeStatus(venda.status, targetStatus, userRole)) {
      errors.push("Você não tem permissão para realizar esta transição");
    }
    
    // Verificar se a transição é válida
    if (!this.canTransition(venda.status, targetStatus)) {
      errors.push("Transição de status inválida");
    }
    
    // Obter configuração do status de destino
    const targetConfig = this.getStatusConfig(targetStatus);
    if (!targetConfig) {
      errors.push("Status de destino inválido");
      return { valid: false, errors };
    }
    
    console.log('🔍 Target Config:', {
      targetConfig,
      requiresExtraData: targetConfig.requiresExtraData,
      validationRules: targetConfig.validationRules
    });
    
    // Validar campos obrigatórios (excluindo campos que serão fornecidos via extraData)
    if (targetConfig.validationRules?.requiredFields) {
      console.log('🔍 Validando campos obrigatórios:', targetConfig.validationRules.requiredFields);
      
      for (const field of targetConfig.validationRules.requiredFields) {
        console.log(`🔍 Verificando campo: ${field}`);
        
        // Se o campo é fornecido via extraData, não validar na venda atual
        if (targetConfig.requiresExtraData?.dataInstalacao && field === 'dataInstalacao') {
          console.log('🔍 Pulando validação de dataInstalacao - será fornecido via extraData');
          continue; // Pular validação deste campo na venda atual
        }
        
        const hasField = this.hasRequiredField(venda, field);
        console.log(`🔍 Campo ${field}: ${hasField ? 'OK' : 'FALTANDO'}`);
        
        if (!hasField) {
          errors.push(`Campo obrigatório não preenchido: ${field}`);
        }
      }
    }
    
    // Validar dados extras obrigatórios
    if (targetConfig.requiresExtraData) {
      console.log('🔍 Validando dados extras:', targetConfig.requiresExtraData);
      
      if (targetConfig.requiresExtraData.motivoPerda && !extraData?.motivoPerda) {
        errors.push("Motivo da perda é obrigatório");
      }
      if (targetConfig.requiresExtraData.dataInstalacao && !extraData?.dataInstalacao) {
        errors.push("Data de instalação é obrigatória");
      }
      if (targetConfig.requiresExtraData.observacoes && !extraData?.observacoes) {
        errors.push("Observações são obrigatórias");
      }
    }
    
    console.log('🔍 Resultado da validação:', { valid: errors.length === 0, errors });
    return { valid: errors.length === 0, errors };
  }

  /**
   * Verifica se um campo obrigatório está preenchido
   */
  private static hasRequiredField(venda: Venda, fieldPath: string): boolean {
    const fields = fieldPath.split('.');
    let value: any = venda;
    
    for (const field of fields) {
      if (value && typeof value === 'object' && field in value) {
        value = value[field];
      } else {
        return false;
      }
    }
    
    return value !== undefined && value !== null && value !== '';
  }

  /**
   * Cria um registro de mudança de status
   */
  static createStatusChange(
    newStatus: Venda["status"],
    userId: string,
    userName: string,
    extraData?: any
  ): StatusChange {
    return {
      status: newStatus,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      extraData
    };
  }

  /**
   * Obtém o histórico de mudanças de status
   */
  static getStatusHistory(venda: Venda): StatusChange[] {
    return venda.historicoStatus || [];
  }

  /**
   * Obtém a última mudança de status
   */
  static getLastStatusChange(venda: Venda): StatusChange | null {
    const history = this.getStatusHistory(venda);
    return history.length > 0 ? history[history.length - 1] : null;
  }

  /**
   * Obtém todas as configurações de status
   */
  static getAllStatusConfigs(): StatusFlowConfig[] {
    return this.STATUS_FLOW;
  }

  /**
   * Calcula o progresso da venda (0-100)
   */
  static getVendaProgress(venda: Venda): number {
    const statusOrder = [
      "pendente",
      "em_atendimento", 
      "auditada",
      "gerada",
      "aguardando_habilitacao",
      "habilitada"
    ];
    
    const currentIndex = statusOrder.indexOf(venda.status);
    if (currentIndex === -1) return 0;
    
    return Math.round(((currentIndex + 1) / statusOrder.length) * 100);
  }

  /**
   * Verifica se um status é final
   */
  static isFinalStatus(status: Venda["status"]): boolean {
    const config = this.getStatusConfig(status);
    return config?.canTransitionTo.length === 0;
  }

  /**
   * Obtém o tempo desde a última mudança
   */
  static getTimeSinceLastChange(venda: Venda): string {
    const lastChange = this.getLastStatusChange(venda);
    if (!lastChange) return "Nunca";
    
    const now = new Date();
    const changeTime = new Date(lastChange.timestamp);
    const diffMs = now.getTime() - changeTime.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    return `${diffDays} dias atrás`;
  }

  /**
   * Verifica se uma venda gerada deve ficar vermelha (mais de 2 dias)
   */
  static shouldShowAsUrgent(venda: Venda): boolean {
    if (venda.status !== "gerada") return false;
    
    const lastChange = this.getLastStatusChange(venda);
    if (!lastChange) return false;
    
    const now = new Date();
    const changeTime = new Date(lastChange.timestamp);
    const diffMs = now.getTime() - changeTime.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    return diffDays > 2;
  }

  /**
   * Verifica se uma venda gerada deve ir automaticamente para "aguardando_habilitacao"
   */
  static shouldAutoTransitionToAwaiting(venda: Venda): boolean {
    if (venda.status !== "gerada") return false;
    
    // Se tem data de instalação, deve ir para aguardando_habilitacao
    return venda.dataInstalacao && venda.dataInstalacao.trim() !== '';
  }

  /**
   * Processa dados extras quando o status é alterado
   */
  static async processExtraDataOnStatusChange(
    venda: Venda,
    newStatus: Venda["status"],
    extraData?: any
  ): Promise<Partial<Venda>> {
    console.log('🔍 processExtraDataOnStatusChange:', { newStatus, extraData });
    
    const updates: Partial<Venda> = {};

    // Se está mudando para "habilitada", definir dataInstalacaoReal
    if (newStatus === "habilitada" && !venda.dataInstalacaoReal) {
      const { getDataAtualBrasil } = await import('@/lib/utils');
      updates.dataInstalacaoReal = getDataAtualBrasil();
      console.log('🔍 Definindo dataInstalacaoReal para habilitada');
    }

    // Se está mudando para "perdida", salvar motivoPerda
    if (newStatus === "perdida" && extraData?.motivoPerda) {
      updates.motivoPerda = extraData.motivoPerda;
      console.log('🔍 Salvando motivoPerda para perdida');
    }

    // Se está mudando para "auditada" e tem dataInstalacao nos dados extras
    if (newStatus === "auditada" && extraData?.dataInstalacao) {
      updates.dataInstalacao = extraData.dataInstalacao;
      console.log('🔍 Salvando dataInstalacao para auditada:', extraData.dataInstalacao);
      console.log('🔍 Tipo da data:', typeof extraData.dataInstalacao);
      console.log('🔍 Updates completo:', updates);
    }

    console.log('🔍 Updates processados:', updates);
    return updates;
  }
} 