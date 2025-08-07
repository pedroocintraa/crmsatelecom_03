import type { Venda, VendaFormData } from "@/types/venda";
import firebaseVendasService from "./firebaseVendasService";

export class VendasService {
  // Implementação com Firebase
  async obterVendas(): Promise<Venda[]> {
    return firebaseVendasService.obterVendas();
  }

  async obterVendasPorVendedor(vendedorId: string): Promise<Venda[]> {
    return firebaseVendasService.obterVendasPorVendedor(vendedorId);
  }

  async obterVendasPorEquipe(equipeId: string): Promise<Venda[]> {
    return firebaseVendasService.obterVendasPorEquipe(equipeId);
  }

  async obterVendaPorId(id: string): Promise<Venda | null> {
    return firebaseVendasService.obterVendaPorId(id);
  }

  async verificarCpfDuplicado(cpf: string): Promise<boolean> {
    return firebaseVendasService.verificarCpfDuplicado(cpf);
  }

  async criarIndicesRetroativos(): Promise<void> {
    return firebaseVendasService.criarIndicesRetroativos();
  }

  async criarVenda(venda: VendaFormData, vendedorId: string, vendedorNome: string, equipeId?: string, equipeNome?: string): Promise<Venda> {
    return firebaseVendasService.criarVenda(venda, vendedorId, vendedorNome, equipeId, equipeNome);
  }

  async atualizarVenda(id: string, dados: Partial<Venda>): Promise<Venda> {
    return firebaseVendasService.atualizarVenda(id, dados);
  }

  async atualizarStatusVenda(id: string, status: Venda['status'], motivoPerda?: string, dadosAdicionais?: any): Promise<Venda> {
    return firebaseVendasService.atualizarStatusVenda(id, status, motivoPerda, dadosAdicionais);
  }

  async excluirVenda(id: string): Promise<void> {
    await firebaseVendasService.excluirVenda(id);
  }

  async obterVendasPorStatus(status: Venda['status']): Promise<Venda[]> {
    return firebaseVendasService.obterVendasPorStatus(status);
  }

  async obterVendasPorPeriodo(dataInicio: string, dataFim: string): Promise<Venda[]> {
    return firebaseVendasService.obterVendasPorPeriodo(dataInicio, dataFim);
  }

  async obterEstatisticasVendas(vendedorId?: string, equipeId?: string): Promise<{
    total: number;
    pendentes: number;
    emAndamento: number;
    auditadas: number;
    geradas: number;
    habilitadas: number;
    perdidas: number;
  }> {
    return firebaseVendasService.obterEstatisticasVendas(vendedorId, equipeId);
  }

  async validarVendaUnica(clienteCpf: string, dataVenda: string): Promise<{ unica: boolean; vendaExistente?: Venda }> {
    return firebaseVendasService.validarVendaUnica(clienteCpf, dataVenda);
  }

  async obterVendaParaExclusao(id: string): Promise<Venda | null> {
    return firebaseVendasService.obterVendaParaExclusao(id);
  }

  async excluirVendaPermanentemente(id: string): Promise<boolean> {
    return firebaseVendasService.excluirVendaPermanentemente(id);
  }

  async sincronizarVendas(): Promise<{ removidas: number; erros: string[] }> {
    return firebaseVendasService.sincronizarVendas();
  }
}

export const vendasService = new VendasService(); 