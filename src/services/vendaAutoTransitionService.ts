import { VendaStatusService } from './vendaStatusService';
import { Venda } from '../types/venda';

/**
 * Serviço para gerenciar transições automáticas de vendas
 */
export class VendaAutoTransitionService {
  
  /**
   * Verifica se uma venda gerada deve ir automaticamente para "aguardando_habilitacao"
   */
  static shouldAutoTransitionToAwaiting(venda: Venda): boolean {
    return VendaStatusService.shouldAutoTransitionToAwaiting(venda);
  }

  /**
   * Verifica se uma venda gerada deve ficar vermelha (mais de 2 dias)
   */
  static shouldShowAsUrgent(venda: Venda): boolean {
    return VendaStatusService.shouldShowAsUrgent(venda);
  }

  /**
   * Processa transições automáticas para uma venda
   */
  static processAutoTransitions(venda: Venda): { shouldTransition: boolean; newStatus?: Venda["status"] } {
    // Se a venda está gerada e tem data de instalação, deve ir para aguardando_habilitacao
    if (this.shouldAutoTransitionToAwaiting(venda)) {
      return {
        shouldTransition: true,
        newStatus: "aguardando_habilitacao"
      };
    }

    return { shouldTransition: false };
  }

  /**
   * Obtém a classe CSS para destacar vendas urgentes
   */
  static getUrgentClass(venda: Venda): string {
    if (this.shouldShowAsUrgent(venda)) {
      return "border-red-500 bg-red-50";
    }
    return "";
  }

  /**
   * Obtém o texto de alerta para vendas urgentes
   */
  static getUrgentText(venda: Venda): string {
    if (this.shouldShowAsUrgent(venda)) {
      return "⚠️ Venda gerada há mais de 2 dias - requer atenção";
    }
    return "";
  }

  /**
   * Verifica se uma venda precisa de atenção especial
   */
  static needsAttention(venda: Venda): boolean {
    return this.shouldShowAsUrgent(venda);
  }

  /**
   * Obtém o tempo desde que a venda foi gerada
   */
  static getTimeSinceGenerated(venda: Venda): string {
    if (venda.status !== "gerada") return "";
    
    const lastChange = VendaStatusService.getLastStatusChange(venda);
    if (!lastChange) return "";
    
    const now = new Date();
    const changeTime = new Date(lastChange.timestamp);
    const diffMs = now.getTime() - changeTime.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    return `${diffDays} dias atrás`;
  }
} 