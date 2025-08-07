import { ref, get, set, update, remove } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Plano, PlanoFormData } from '@/types/configuracao';

export class FirebaseConfiguracaoService {
  async obterPlanos(): Promise<Plano[]> {
    try {
      const planosRef = ref(realtimeDb, 'planos');
      const snapshot = await get(planosRef);
      
      if (snapshot.exists()) {
        const planosData = snapshot.val();
        return Object.values(planosData);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter planos:', error);
      return [];
    }
  }

  async obterPlanosAtivos(): Promise<Plano[]> {
    try {
      const planos = await this.obterPlanos();
      return planos.filter(plano => plano.ativo !== false);
    } catch (error) {
      console.error('Erro ao obter planos ativos:', error);
      return [];
    }
  }

  async obterPlanoPorId(id: string): Promise<Plano | null> {
    try {
      const planoRef = ref(realtimeDb, `planos/${id}`);
      const snapshot = await get(planoRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao obter plano por ID:', error);
      return null;
    }
  }

  async criarPlano(plano: PlanoFormData): Promise<Plano> {
    try {
      const novoPlano: Plano = {
        ...plano,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ativo: plano.ativo !== false
      };

      await set(ref(realtimeDb, `planos/${novoPlano.id}`), novoPlano);
      console.log('✅ Plano criado com sucesso:', novoPlano.nome);
      return novoPlano;
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      throw new Error('Erro ao criar plano');
    }
  }

  async atualizarPlano(id: string, dados: Partial<PlanoFormData>): Promise<Plano> {
    try {
      const dadosAtualizados = {
        ...dados,
        updated_at: new Date().toISOString()
      };

      const planoRef = ref(realtimeDb, `planos/${id}`);
      await update(planoRef, dadosAtualizados);
      
      const planoAtualizado = await this.obterPlanoPorId(id);
      if (!planoAtualizado) {
        throw new Error('Plano não encontrado');
      }
      
      console.log('✅ Plano atualizado com sucesso:', planoAtualizado.nome);
      return planoAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      throw new Error('Erro ao atualizar plano');
    }
  }

  async excluirPlano(id: string): Promise<void> {
    try {
      await remove(ref(realtimeDb, `planos/${id}`));
      console.log('✅ Plano excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir plano:', error);
      throw new Error('Erro ao excluir plano');
    }
  }

  async desativarPlano(id: string): Promise<boolean> {
    try {
      await this.atualizarPlano(id, { ativo: false });
      return true;
    } catch (error) {
      console.error('Erro ao desativar plano:', error);
      return false;
    }
  }

  async reativarPlano(id: string): Promise<boolean> {
    try {
      await this.atualizarPlano(id, { ativo: true });
      return true;
    } catch (error) {
      console.error('Erro ao reativar plano:', error);
      return false;
    }
  }

  async validarNomeUnico(nome: string, planoId?: string): Promise<{ unico: boolean; planoInativo?: Plano }> {
    try {
      const planos = await this.obterPlanos();
      const planoComNome = planos.find(p => p.nome === nome && p.id !== planoId);
      
      if (planoComNome) {
        return { unico: false };
      }

      // Verificar planos inativos
      const planosInativos = planos.filter(p => p.ativo === false);
      const planoInativo = planosInativos.find(p => p.nome === nome);
      
      return { 
        unico: true, 
        planoInativo: planoInativo || undefined 
      };
    } catch (error) {
      console.error('Erro ao validar nome único:', error);
      return { unico: true };
    }
  }

  async obterPlanoParaExclusao(id: string): Promise<Plano | null> {
    return this.obterPlanoPorId(id);
  }

  async excluirPlanoPermanentemente(id: string): Promise<boolean> {
    try {
      await remove(ref(realtimeDb, `planos/${id}`));
      return true;
    } catch (error) {
      console.error('Erro ao excluir plano permanentemente:', error);
      return false;
    }
  }

  async sincronizarPlanos(): Promise<{ removidos: number; erros: string[] }> {
    try {
      const planos = await this.obterPlanos();
      const erros: string[] = [];
      let removidos = 0;

      for (const plano of planos) {
        try {
          // Verificar se o plano ainda existe
          const planoAtual = await this.obterPlanoPorId(plano.id);
          if (!planoAtual) {
            await this.excluirPlanoPermanentemente(plano.id);
            removidos++;
          }
        } catch (error) {
          erros.push(`Erro ao sincronizar plano ${plano.nome}: ${error}`);
        }
      }

      return { removidos, erros };
    } catch (error) {
      console.error('Erro ao sincronizar planos:', error);
      return { removidos: 0, erros: ['Erro geral na sincronização'] };
    }
  }
}

export const firebaseConfiguracaoService = new FirebaseConfiguracaoService();
export default firebaseConfiguracaoService; 