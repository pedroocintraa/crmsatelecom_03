import type { Plano, PlanoFormData } from "@/types/configuracao";
import firebaseConfiguracaoService from "./firebaseConfiguracaoService";

export class ConfiguracaoService {
  // Implementação com Firebase
  async obterPlanos(): Promise<Plano[]> {
    return firebaseConfiguracaoService.obterPlanos();
  }

  async obterPlanosAtivos(): Promise<Plano[]> {
    return firebaseConfiguracaoService.obterPlanosAtivos();
  }

  async obterPlanoPorId(id: string): Promise<Plano | null> {
    return firebaseConfiguracaoService.obterPlanoPorId(id);
  }

  async criarPlano(plano: PlanoFormData): Promise<Plano> {
    return firebaseConfiguracaoService.criarPlano(plano);
  }

  async atualizarPlano(id: string, plano: Partial<PlanoFormData>): Promise<Plano> {
    return firebaseConfiguracaoService.atualizarPlano(id, plano);
  }

  async excluirPlano(id: string): Promise<void> {
    await firebaseConfiguracaoService.excluirPlano(id);
  }

  async desativarPlano(id: string): Promise<boolean> {
    return firebaseConfiguracaoService.desativarPlano(id);
  }

  async reativarPlano(id: string): Promise<boolean> {
    return firebaseConfiguracaoService.reativarPlano(id);
  }

  async validarNomeUnico(nome: string, idExcluir?: string): Promise<boolean> {
    const resultado = await firebaseConfiguracaoService.validarNomeUnico(nome, idExcluir);
    return resultado.unico;
  }

  async obterPlanoParaExclusao(id: string): Promise<Plano | null> {
    return firebaseConfiguracaoService.obterPlanoParaExclusao(id);
  }

  async excluirPlanoPermanentemente(id: string): Promise<boolean> {
    return firebaseConfiguracaoService.excluirPlanoPermanentemente(id);
  }

  async sincronizarPlanos(): Promise<{ removidos: number; erros: string[] }> {
    return firebaseConfiguracaoService.sincronizarPlanos();
  }
}

export const configuracaoService = new ConfiguracaoService();