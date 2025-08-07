import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { auth } from '@/lib/firebase';

export interface DashboardStats {
  totalVendas: number;
  vendasMes: number;
  vendasSemana: number;
  vendasHoje: number;
  vendasGeradas: number;
  vendasHabilitadas: number;
  vendasPerdidas: number;
  taxaConversao: number;
  vendasPorBairro: Record<string, number>;
  vendasPorCidade: Record<string, number>;
  vendasPorVendedor: Record<string, number>;
  vendasPorEquipe: Record<string, number>;
  vendasPendentes: number;
  vendasEmAndamento: number;
  vendasAuditadas: number;
  vendasAguardandoHabilitacao: number;
}

export class DashboardService {
  static async getDashboardStats(userId?: string, userRole?: string, equipeId?: string): Promise<DashboardStats> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      // Buscar vendas do Realtime Database
      const vendasRef = ref(realtimeDb, 'vendas');
      const vendasSnapshot = await get(vendasRef);

      let vendas: any[] = [];
      if (vendasSnapshot.exists()) {
        const vendasData = vendasSnapshot.val();
        vendas = Object.values(vendasData || {});
      }

      // Filtrar vendas baseado na função do usuário
      let vendasFiltradas = vendas;
      
      if (userRole === 'ADMINISTRADOR_GERAL' || userRole === 'SUPERVISOR' || userRole === 'BACKOFFICE') {
        // Administrador Geral, Supervisor e Backoffice veem todas as vendas
        console.log('📊 Dashboard carregando todas as vendas para:', userRole);
        vendasFiltradas = vendas;
      } else if (userRole === 'SUPERVISOR_EQUIPE') {
        // Supervisor de equipe vê apenas vendas da sua equipe
        console.log('📊 Dashboard filtrando vendas por equipe para supervisor de equipe, equipeId:', equipeId);
        if (equipeId) {
          vendasFiltradas = vendas.filter((venda: any) => venda.equipeId === equipeId);
        } else {
          console.warn('📊 Supervisor de equipe sem equipeId definido');
          vendasFiltradas = [];
        }
      } else if (userRole === 'VENDEDOR') {
        // Vendedor vê apenas suas vendas
        console.log('📊 Dashboard filtrando vendas do vendedor:', userId);
        vendasFiltradas = vendas.filter((venda: any) => venda.vendedorId === currentUser.uid);
      } else {
        console.warn('📊 Função de usuário não reconhecida no dashboard:', userRole);
        vendasFiltradas = [];
      }

      // Calcular estatísticas
      const stats: DashboardStats = {
        totalVendas: vendasFiltradas.length,
        vendasMes: vendasFiltradas.filter((v: any) => {
          const vendaDate = new Date(v.dataCriacao);
          const now = new Date();
          return vendaDate.getMonth() === now.getMonth() && 
                 vendaDate.getFullYear() === now.getFullYear();
        }).length,
        vendasSemana: vendasFiltradas.filter((v: any) => {
          const vendaDate = new Date(v.dataCriacao);
          const now = new Date();
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return vendaDate >= weekAgo;
        }).length,
        vendasHoje: vendasFiltradas.filter((v: any) => {
          const vendaDate = new Date(v.dataCriacao);
          const now = new Date();
          return vendaDate.toDateString() === now.toDateString();
        }).length,
        vendasGeradas: vendasFiltradas.filter((v: any) => v.status === 'gerada').length,
        vendasHabilitadas: vendasFiltradas.filter((v: any) => v.status === 'habilitada').length,
        vendasPerdidas: vendasFiltradas.filter((v: any) => v.status === 'perdida').length,
        taxaConversao: 0,
        vendasPorBairro: {},
        vendasPorCidade: {},
        vendasPorVendedor: {},
        vendasPorEquipe: {},
        vendasPendentes: vendasFiltradas.filter((v: any) => v.status === 'pendente').length,
        vendasEmAndamento: vendasFiltradas.filter((v: any) => v.status === 'em_atendimento').length,
        vendasAuditadas: vendasFiltradas.filter((v: any) => v.status === 'auditada').length,
        vendasAguardandoHabilitacao: vendasFiltradas.filter((v: any) => v.status === 'aguardando_habilitacao').length
      };

      // Calcular taxa de conversão
      if (stats.vendasGeradas > 0) {
        stats.taxaConversao = (stats.vendasHabilitadas / stats.vendasGeradas) * 100;
      }

      // Calcular vendas por bairro
      vendasFiltradas.forEach((venda: any) => {
        const bairro = venda.cliente?.endereco?.bairro || venda.bairro;
        if (bairro) {
          stats.vendasPorBairro[bairro] = (stats.vendasPorBairro[bairro] || 0) + 1;
        }
      });

      // Calcular vendas por cidade
      vendasFiltradas.forEach((venda: any) => {
        const cidade = venda.cliente?.endereco?.localidade || venda.cidade;
        if (cidade) {
          stats.vendasPorCidade[cidade] = (stats.vendasPorCidade[cidade] || 0) + 1;
        }
      });

      // Calcular vendas por vendedor (apenas para administradores)
      if (userRole === 'ADMINISTRADOR_GERAL' || userRole === 'SUPERVISOR' || userRole === 'BACKOFFICE') {
        vendasFiltradas.forEach((venda: any) => {
          if (venda.vendedorNome) {
            stats.vendasPorVendedor[venda.vendedorNome] = (stats.vendasPorVendedor[venda.vendedorNome] || 0) + 1;
          }
        });
      }

      // Calcular vendas por equipe (apenas para administradores)
      if (userRole === 'ADMINISTRADOR_GERAL' || userRole === 'SUPERVISOR' || userRole === 'BACKOFFICE') {
        vendasFiltradas.forEach((venda: any) => {
          if (venda.equipeNome) {
            stats.vendasPorEquipe[venda.equipeNome] = (stats.vendasPorEquipe[venda.equipeNome] || 0) + 1;
          }
        });
      }

      console.log('📊 Estatísticas calculadas:', {
        funcao: userRole,
        equipeId,
        totalVendasOriginais: vendas.length,
        totalVendasFiltradas: vendasFiltradas.length,
        stats: {
          totalVendas: stats.totalVendas,
          vendasPendentes: stats.vendasPendentes,
          vendasEmAndamento: stats.vendasEmAndamento,
          vendasAuditadas: stats.vendasAuditadas,
          vendasGeradas: stats.vendasGeradas,
          vendasAguardandoHabilitacao: stats.vendasAguardandoHabilitacao,
          vendasHabilitadas: stats.vendasHabilitadas,
          vendasPerdidas: stats.vendasPerdidas
        }
      });
      return stats;

    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      
      // Retornar dados mockados em caso de erro
      return {
        totalVendas: 0,
        vendasMes: 0,
        vendasSemana: 0,
        vendasHoje: 0,
        vendasGeradas: 0,
        vendasHabilitadas: 0,
        vendasPerdidas: 0,
        taxaConversao: 0,
        vendasPorBairro: {},
        vendasPorCidade: {},
        vendasPorVendedor: {},
        vendasPorEquipe: {},
        vendasPendentes: 0,
        vendasEmAndamento: 0,
        vendasAuditadas: 0,
        vendasAguardandoHabilitacao: 0
      };
    }
  }
}

export default DashboardService; 