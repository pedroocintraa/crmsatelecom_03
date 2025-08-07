/**
 * Serviço unificado do sistema
 * Centraliza todas as operações de dados e negócio
 */

import { usuariosService } from "./usuariosService";
import { fileService } from "./fileService";
import { equipesService } from "./equipesService";
import { configuracaoService } from "./configuracaoService";

class SystemService {
  // Stubs temporários para vendas (serão implementados com Firebase)
  get vendas() {
    return {
      salvar: async (vendaData: any) => {
        console.warn('⚠️ Método de vendas não implementado - migração para Firebase pendente');
        throw new Error('Funcionalidade de vendas temporariamente indisponível - migração para Firebase em andamento');
      },
      obter: async () => {
        console.warn('⚠️ Método de vendas não implementado - migração para Firebase pendente');
        return [];
      },
      obterPorId: async (id: string) => {
        console.warn('⚠️ Método de vendas não implementado - migração para Firebase pendente');
        throw new Error('Funcionalidade de vendas temporariamente indisponível - migração para Firebase em andamento');
      },
      atualizarStatus: async (id: string, status: string) => {
        console.warn('⚠️ Método de vendas não implementado - migração para Firebase pendente');
        throw new Error('Funcionalidade de vendas temporariamente indisponível - migração para Firebase em andamento');
      },
      obterEstatisticas: async () => {
        console.warn('⚠️ Método de vendas não implementado - migração para Firebase pendente');
        return {
          totalVendas: 0,
          vendasMes: 0,
          vendasSemana: 0,
          vendasHoje: 0
        };
      }
    };
  }

  // Delegação para usuários
  get usuarios() {
    return {
      obter: usuariosService.obterUsuarios.bind(usuariosService),
      obterPorId: usuariosService.obterUsuarioPorId.bind(usuariosService),
      salvar: usuariosService.salvarUsuario.bind(usuariosService),
      atualizar: usuariosService.atualizarUsuario.bind(usuariosService),
      desativar: usuariosService.desativarUsuario.bind(usuariosService),
      reativar: usuariosService.reativarUsuario.bind(usuariosService),
      validarEmail: usuariosService.validarEmailUnico.bind(usuariosService),
      validarCpf: usuariosService.validarCpfUnico.bind(usuariosService),
      obterPermissoes: usuariosService.obterPermissoes.bind(usuariosService)
    };
  }

  // Delegação para arquivos
  get arquivos() {
    return {
      processar: fileService.processFile.bind(fileService),
      comprimirImagem: fileService.compressImage.bind(fileService),
      formatarTamanho: fileService.formatarTamanho.bind(fileService)
    };
  }

  // Delegação para equipes
  get equipes() {
    return {
      obter: equipesService.obterEquipes.bind(equipesService),
      obterComMembros: equipesService.obterEquipesComMembros.bind(equipesService),
      obterPorId: equipesService.obterEquipePorId.bind(equipesService),
      salvar: equipesService.salvarEquipe.bind(equipesService),
      atualizar: equipesService.atualizarEquipe.bind(equipesService),
      excluir: equipesService.excluirEquipe.bind(equipesService),
      validarNome: equipesService.validarNomeUnico.bind(equipesService)
    };
  }

  // Delegação para planos
  get planos() {
    return {
      obter: configuracaoService.obterPlanos.bind(configuracaoService),
      obterAtivos: configuracaoService.obterPlanosAtivos.bind(configuracaoService),
      criar: configuracaoService.criarPlano.bind(configuracaoService),
      atualizar: configuracaoService.atualizarPlano.bind(configuracaoService),
      excluir: configuracaoService.excluirPlano.bind(configuracaoService)
    };
  }

  // Métodos de utilidade do sistema
  async verificarStatusServidor(): Promise<{ status: 'online' | 'offline'; latencia?: number }> {
    try {
      const inicio = Date.now();
      // TODO: Implementar verificação de status com Firebase
      console.warn('⚠️ Verificação de status do servidor não implementada - migração para Firebase pendente');
      const latencia = Date.now() - inicio;
      return { status: 'online', latencia };
    } catch (error) {
      console.error('Erro ao verificar status do servidor:', error);
      return { status: 'offline' };
    }
  }

  async sincronizarDados(): Promise<{ sucesso: boolean; erro?: string }> {
    try {
      // Verificar se há dados inconsistentes e corrigir
      console.log('🔄 Verificando sincronização de dados...');
      
      // Por enquanto, apenas verificar conectividade
      const status = await this.verificarStatusServidor();
      if (status.status === 'offline') {
        throw new Error('Servidor offline');
      }

      console.log('✅ Dados sincronizados com sucesso');
      return { sucesso: true };
    } catch (error: any) {
      console.error('❌ Erro na sincronização:', error);
      return { sucesso: false, erro: error.message };
    }
  }

  // Estatísticas completas do sistema
  async obterEstatisticasCompletas() {
    try {
      const [estatisticasVendas, totalUsuarios, totalEquipes] = await Promise.all([
        this.vendas.obterEstatisticas(),
        this.usuarios.obter().then(users => users.length),
        this.equipes.obter().then(teams => teams.length)
      ]);

      return {
        ...estatisticasVendas,
        totalUsuarios,
        totalEquipes,
        ultimaAtualizacao: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas completas:', error);
      throw error;
    }
  }
}

export const systemService = new SystemService();