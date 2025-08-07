import type { Equipe, EquipeFormData } from "@/types/equipe";
import firebaseEquipesService from "./firebaseEquipesService";

export class EquipesService {
  // Implementação com Firebase
  async obterEquipes(): Promise<Equipe[]> {
    return firebaseEquipesService.obterEquipes();
  }

  async obterEquipesComMembros(): Promise<Equipe[]> {
    try {
      const equipes = await firebaseEquipesService.obterEquipes();
      const { usuariosService } = await import('./usuariosService');
      
      // Para cada equipe, contar os membros
      const equipesComMembros = await Promise.all(
        equipes.map(async (equipe) => {
          try {
            const membros = await usuariosService.obterUsuariosPorEquipe(equipe.id);
            return {
              ...equipe,
              membros: membros.length
            };
          } catch (error) {
            console.error(`Erro ao contar membros da equipe ${equipe.nome}:`, error);
            return {
              ...equipe,
              membros: 0
            };
          }
        })
      );
      
      return equipesComMembros;
    } catch (error) {
      console.error('Erro ao obter equipes com membros:', error);
      return firebaseEquipesService.obterEquipes();
    }
  }

  async obterEquipePorId(id: string): Promise<Equipe | null> {
    return firebaseEquipesService.obterEquipePorId(id);
  }

  async salvarEquipe(equipe: EquipeFormData): Promise<Equipe> {
    return firebaseEquipesService.salvarEquipe(equipe);
  }

  async atualizarEquipe(id: string, equipe: Partial<EquipeFormData>): Promise<Equipe> {
    return firebaseEquipesService.atualizarEquipe(id, equipe);
  }

  async excluirEquipe(id: string): Promise<void> {
    await firebaseEquipesService.excluirEquipe(id);
  }

  async validarNomeUnico(nome: string, idExcluir?: string): Promise<boolean> {
    const resultado = await firebaseEquipesService.validarNomeUnico(nome, idExcluir);
    return resultado.unico;
  }
}

export const equipesService = new EquipesService();