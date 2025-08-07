import { Usuario, FuncaoUsuario, PermissoesUsuario } from "@/types/usuario";
import firebaseUsuariosService from "./firebaseUsuariosService";

export class UsuariosService {
  // Implementação com Firebase
  async obterUsuarios(): Promise<Usuario[]> {
    return firebaseUsuariosService.obterUsuarios();
  }

  async obterUsuarioPorId(id: string): Promise<Usuario | null> {
    return firebaseUsuariosService.obterUsuarioPorId(id);
  }

  async salvarUsuario(usuario: Omit<Usuario, 'id' | 'dataCadastro' | 'ativo'>): Promise<Usuario> {
    return firebaseUsuariosService.salvarUsuario(usuario);
  }

  async atualizarUsuario(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    return firebaseUsuariosService.atualizarUsuario(id, usuario);
  }

  async obterUsuariosInativos(): Promise<Usuario[]> {
    return firebaseUsuariosService.obterUsuariosInativos();
  }

  async desativarUsuario(id: string): Promise<boolean> {
    return firebaseUsuariosService.desativarUsuario(id);
  }

  async reativarUsuario(id: string): Promise<boolean> {
    return firebaseUsuariosService.reativarUsuario(id);
  }

  async excluirUsuario(id: string): Promise<boolean> {
    return this.desativarUsuario(id);
  }

  async validarEmailUnico(email: string, usuarioId?: string): Promise<{ unico: boolean; usuarioInativo?: Usuario }> {
    return firebaseUsuariosService.validarEmailUnico(email, usuarioId);
  }

  async validarCpfUnico(cpf: string, usuarioId?: string): Promise<{ unico: boolean; usuarioInativo?: Usuario }> {
    return firebaseUsuariosService.validarCpfUnico(cpf, usuarioId);
  }

  async obterUsuariosPorEquipe(equipeId: string): Promise<Usuario[]> {
    return firebaseUsuariosService.obterUsuariosPorEquipe(equipeId);
  }

  async atribuirSupervisorEquipe(equipeId: string, supervisorId: string): Promise<void> {
    return firebaseUsuariosService.atribuirSupervisorEquipe(equipeId, supervisorId);
  }

  async verificarConsistenciaUsuario(id: string): Promise<{ consistente: boolean; existeNoAuth: boolean; existeNaCRM: boolean }> {
    return firebaseUsuariosService.verificarConsistenciaUsuario(id);
  }

  async obterUsuarioParaExclusao(id: string): Promise<Usuario | null> {
    return firebaseUsuariosService.obterUsuarioParaExclusao(id);
  }

  async excluirUsuarioPermanentemente(id: string): Promise<boolean> {
    return firebaseUsuariosService.excluirUsuarioPermanentemente(id);
  }

  async sincronizarUsuarios(): Promise<{ removidos: number; erros: string[] }> {
    return firebaseUsuariosService.sincronizarUsuarios();
  }

  // Sistema de permissões atualizado conforme especificações
  obterPermissoes(funcao: FuncaoUsuario): PermissoesUsuario {
    switch (funcao) {
      case FuncaoUsuario.ADMINISTRADOR_GERAL:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: true,
          podeEditarVendas: true,
          podeGerenciarEquipes: true,
          podeCriarSupervisorEquipe: true,
          podeCriarVendedor: true,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: true,
        };
      
      case FuncaoUsuario.SUPERVISOR:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: true,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: true,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: false,
        };
      
      case FuncaoUsuario.BACKOFFICE:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false,
          podeAcessarNovaVenda: false,
          podeAcessarConfiguracoes: false,
        };
      
      case FuncaoUsuario.SUPERVISOR_EQUIPE:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: false,
          podeAcessarApenasPropriaVendas: true,
          podeGerenciarUsuarios: true, // Pode ver usuários da sua equipe
          podeEditarVendas: true,
          podeGerenciarEquipes: false, // Não deve ter acesso às equipes
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: false,
        };
      
      case FuncaoUsuario.VENDEDOR:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: false,
          podeAcessarApenasPropriaVendas: true,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: false,
        };
      
      default:
        return {
          podeAcessarDashboard: false,
          podeAcessarTodasVendas: false,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: false,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false,
          podeAcessarNovaVenda: false,
          podeAcessarConfiguracoes: false,
        };
    }
  }

  formatarTelefone(telefone: string): string {
    const nums = telefone.replace(/\D/g, "");
    if (nums.length === 11) {
      return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
    }
    return telefone;
  }

  formatarCpf(cpf: string): string {
    const nums = cpf.replace(/\D/g, "");
    if (nums.length === 11) {
      return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6, 9)}-${nums.slice(9)}`;
    }
    return cpf;
  }
}

export const usuariosService = new UsuariosService();