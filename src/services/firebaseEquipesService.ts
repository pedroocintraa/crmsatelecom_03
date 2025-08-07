import { ref, get, set, update, remove } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Equipe } from '@/types/equipe';

export class FirebaseEquipesService {
  async obterEquipes(): Promise<Equipe[]> {
    try {
      const equipesRef = ref(realtimeDb, 'equipes');
      const snapshot = await get(equipesRef);
      
      if (snapshot.exists()) {
        const equipesData = snapshot.val();
        return Object.values(equipesData).filter((equipe: any) => equipe.ativo !== false);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter equipes:', error);
      return [];
    }
  }

  async obterEquipePorId(id: string): Promise<Equipe | null> {
    try {
      const equipeRef = ref(realtimeDb, `equipes/${id}`);
      const snapshot = await get(equipeRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao obter equipe por ID:', error);
      return null;
    }
  }

  async salvarEquipe(equipe: Omit<Equipe, 'id' | 'created_at' | 'updated_at' | 'ativo'>): Promise<Equipe> {
    try {
      const novaEquipe: Equipe = {
        ...equipe,
        id: equipe.id || Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ativo: true
      };

      await set(ref(realtimeDb, `equipes/${novaEquipe.id}`), novaEquipe);
      return novaEquipe;
    } catch (error) {
      console.error('Erro ao salvar equipe:', error);
      throw new Error('Erro ao salvar equipe');
    }
  }

  async atualizarEquipe(id: string, dados: Partial<Equipe>): Promise<Equipe> {
    try {
      const dadosAtualizados = {
        ...dados,
        updated_at: new Date().toISOString()
      };

      const equipeRef = ref(realtimeDb, `equipes/${id}`);
      await update(equipeRef, dadosAtualizados);
      
      const equipeAtualizada = await this.obterEquipePorId(id);
      if (!equipeAtualizada) {
        throw new Error('Equipe não encontrada');
      }
      
      return equipeAtualizada;
    } catch (error) {
      console.error('Erro ao atualizar equipe:', error);
      throw new Error('Erro ao atualizar equipe');
    }
  }

  async obterEquipesInativas(): Promise<Equipe[]> {
    try {
      const equipesRef = ref(realtimeDb, 'equipes');
      const snapshot = await get(equipesRef);
      
      if (snapshot.exists()) {
        const equipesData = snapshot.val();
        return Object.values(equipesData).filter((equipe: any) => equipe.ativo === false);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter equipes inativas:', error);
      return [];
    }
  }

  async desativarEquipe(id: string): Promise<boolean> {
    try {
      await this.atualizarEquipe(id, { ativo: false });
      return true;
    } catch (error) {
      console.error('Erro ao desativar equipe:', error);
      return false;
    }
  }

  async reativarEquipe(id: string): Promise<boolean> {
    try {
      await this.atualizarEquipe(id, { ativo: true });
      return true;
    } catch (error) {
      console.error('Erro ao reativar equipe:', error);
      return false;
    }
  }

  async excluirEquipe(id: string): Promise<boolean> {
    return this.desativarEquipe(id);
  }

  async validarNomeUnico(nome: string, equipeId?: string): Promise<{ unico: boolean; equipeInativa?: Equipe }> {
    try {
      const equipes = await this.obterEquipes();
      const equipeComNome = equipes.find(e => e.nome === nome && e.id !== equipeId);
      
      if (equipeComNome) {
        return { unico: false };
      }

      // Verificar equipes inativas
      const equipesInativas = await this.obterEquipesInativas();
      const equipeInativa = equipesInativas.find(e => e.nome === nome);
      
      return { 
        unico: true, 
        equipeInativa: equipeInativa || undefined 
      };
    } catch (error) {
      console.error('Erro ao validar nome único:', error);
      return { unico: true };
    }
  }

  async obterEquipeParaExclusao(id: string): Promise<Equipe | null> {
    return this.obterEquipePorId(id);
  }

  async excluirEquipePermanentemente(id: string): Promise<boolean> {
    try {
      await remove(ref(realtimeDb, `equipes/${id}`));
      return true;
    } catch (error) {
      console.error('Erro ao excluir equipe permanentemente:', error);
      return false;
    }
  }

  async sincronizarEquipes(): Promise<{ removidas: number; erros: string[] }> {
    try {
      const equipes = await this.obterEquipes();
      const erros: string[] = [];
      let removidas = 0;

      for (const equipe of equipes) {
        try {
          // Verificar se a equipe ainda existe
          const equipeAtual = await this.obterEquipePorId(equipe.id);
          if (!equipeAtual) {
            await this.excluirEquipePermanentemente(equipe.id);
            removidas++;
          }
        } catch (error) {
          erros.push(`Erro ao sincronizar equipe ${equipe.nome}: ${error}`);
        }
      }

      return { removidas, erros };
    } catch (error) {
      console.error('Erro ao sincronizar equipes:', error);
      return { removidas: 0, erros: ['Erro geral na sincronização'] };
    }
  }
}

export const firebaseEquipesService = new FirebaseEquipesService();
export default firebaseEquipesService; 