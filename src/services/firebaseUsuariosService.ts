import { ref, get, set, update, remove, query, orderByChild, equalTo } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Usuario, FuncaoUsuario, PermissoesUsuario } from '@/types/usuario';

export class FirebaseUsuariosService {
  async obterUsuarios(): Promise<Usuario[]> {
    try {
      const usuariosRef = ref(realtimeDb, 'usuarios');
      const snapshot = await get(usuariosRef);
      
      if (snapshot.exists()) {
        const usuariosData = snapshot.val();
        return Object.values(usuariosData).filter((usuario: any) => usuario.ativo !== false);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
      return [];
    }
  }

  async obterUsuarioPorId(id: string): Promise<Usuario | null> {
    try {
      const usuarioRef = ref(realtimeDb, `usuarios/${id}`);
      const snapshot = await get(usuarioRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário por ID:', error);
      return null;
    }
  }

  async salvarUsuario(usuario: Omit<Usuario, 'id' | 'dataCadastro' | 'ativo'>): Promise<Usuario> {
    try {
      // Remover campos undefined para evitar erro no Firebase
      const usuarioLimpo = Object.fromEntries(
        Object.entries(usuario).filter(([_, value]) => value !== undefined)
      ) as Omit<Usuario, 'id' | 'dataCadastro' | 'ativo'>;

      // Aplicar permissões automaticamente baseadas na função
      const permissoes = this.obterPermissoes(usuario.funcao);
      console.log(`🔐 Aplicando permissões para função ${usuario.funcao}:`, permissoes);

      // Buscar nome da equipe se equipeId for fornecido
      let nomeEquipe: string | undefined;
      if (usuario.equipeId) {
        try {
          const equipeRef = ref(realtimeDb, `equipes/${usuario.equipeId}`);
          const equipeSnapshot = await get(equipeRef);
          if (equipeSnapshot.exists()) {
            const equipeData = equipeSnapshot.val();
            nomeEquipe = equipeData.nome;
            console.log(`🏢 Nome da equipe encontrado: ${nomeEquipe}`);
          }
        } catch (equipeError) {
          console.warn('⚠️ Erro ao buscar nome da equipe:', equipeError);
        }
      }

      const novoUsuario: Usuario = {
        ...usuarioLimpo,
        id: usuario.id || Date.now().toString(),
        dataCadastro: new Date().toISOString(),
        ativo: true,
        permissoes: permissoes, // Aplicar permissões automaticamente
        ...(nomeEquipe && { nomeEquipe }) // Incluir nome da equipe apenas se não for undefined
      };

      // Criar usuário no Firebase Auth com senha padrão
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');
      
      try {
        await createUserWithEmailAndPassword(auth, usuario.email, 'Trocar@123');
        console.log('✅ Usuário criado no Firebase Auth com senha padrão');
      } catch (authError: any) {
        // Se o usuário já existe no Auth, apenas logar
        if (authError.code === 'auth/email-already-in-use') {
          console.log('⚠️ Usuário já existe no Firebase Auth');
        } else {
          console.error('❌ Erro ao criar usuário no Firebase Auth:', authError);
        }
      }

      await set(ref(realtimeDb, `usuarios/${novoUsuario.id}`), novoUsuario);
      console.log('✅ Usuário criado com permissões e nome da equipe aplicados automaticamente');
      return novoUsuario;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw new Error('Erro ao salvar usuário');
    }
  }

  async atualizarUsuario(id: string, dados: Partial<Usuario>): Promise<Usuario> {
    try {
      // Remover campos undefined para evitar erro no Firebase
      const dadosLimpos = Object.fromEntries(
        Object.entries(dados).filter(([_, value]) => value !== undefined)
      ) as Partial<Usuario>;

      // Se a função foi alterada, aplicar permissões automaticamente
      if (dados.funcao) {
        const permissoes = this.obterPermissoes(dados.funcao);
        console.log(`🔐 Atualizando permissões para função ${dados.funcao}:`, permissoes);
        dadosLimpos.permissoes = permissoes;
      }

      // Se a equipe foi alterada, buscar o nome da equipe
      if (dados.equipeId) {
        try {
          const equipeRef = ref(realtimeDb, `equipes/${dados.equipeId}`);
          const equipeSnapshot = await get(equipeRef);
          if (equipeSnapshot.exists()) {
            const equipeData = equipeSnapshot.val();
            if (equipeData.nome) {
              dadosLimpos.nomeEquipe = equipeData.nome;
              console.log(`🏢 Nome da equipe atualizado: ${equipeData.nome}`);
            }
          }
        } catch (equipeError) {
          console.warn('⚠️ Erro ao buscar nome da equipe:', equipeError);
        }
      } else if (dados.equipeId === null || dados.equipeId === '') {
        // Se equipeId foi removido, remover também o nomeEquipe
        dadosLimpos.nomeEquipe = undefined;
      }

      const usuarioRef = ref(realtimeDb, `usuarios/${id}`);
      await update(usuarioRef, dadosLimpos);
      
      const usuarioAtualizado = await this.obterUsuarioPorId(id);
      if (!usuarioAtualizado) {
        throw new Error('Usuário não encontrado');
      }
      
      return usuarioAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }

  async obterUsuariosInativos(): Promise<Usuario[]> {
    try {
      const usuariosRef = ref(realtimeDb, 'usuarios');
      const snapshot = await get(usuariosRef);
      
      if (snapshot.exists()) {
        const usuariosData = snapshot.val();
        return Object.values(usuariosData).filter((usuario: any) => usuario.ativo === false);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter usuários inativos:', error);
      return [];
    }
  }

  async desativarUsuario(id: string): Promise<boolean> {
    try {
      await this.atualizarUsuario(id, { ativo: false });
      return true;
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
      return false;
    }
  }

  async reativarUsuario(id: string): Promise<boolean> {
    try {
      await this.atualizarUsuario(id, { ativo: true });
      return true;
    } catch (error) {
      console.error('Erro ao reativar usuário:', error);
      return false;
    }
  }

  async excluirUsuario(id: string): Promise<boolean> {
    return this.desativarUsuario(id);
  }

  async validarEmailUnico(email: string, usuarioId?: string): Promise<{ unico: boolean; usuarioInativo?: Usuario }> {
    try {
      const usuarios = await this.obterUsuarios();
      const usuarioComEmail = usuarios.find(u => u.email === email && u.id !== usuarioId);
      
      if (usuarioComEmail) {
        return { unico: false };
      }

      // Verificar usuários inativos
      const usuariosInativos = await this.obterUsuariosInativos();
      const usuarioInativo = usuariosInativos.find(u => u.email === email);
      
      return { 
        unico: true, 
        usuarioInativo: usuarioInativo || undefined 
      };
    } catch (error) {
      console.error('Erro ao validar email único:', error);
      return { unico: true };
    }
  }

  async validarCpfUnico(cpf: string, usuarioId?: string): Promise<{ unico: boolean; usuarioInativo?: Usuario }> {
    try {
      const usuarios = await this.obterUsuarios();
      const usuarioComCpf = usuarios.find(u => u.cpf === cpf && u.id !== usuarioId);
      
      if (usuarioComCpf) {
        return { unico: false };
      }

      // Verificar usuários inativos
      const usuariosInativos = await this.obterUsuariosInativos();
      const usuarioInativo = usuariosInativos.find(u => u.cpf === cpf);
      
      return { 
        unico: true, 
        usuarioInativo: usuarioInativo || undefined 
      };
    } catch (error) {
      console.error('Erro ao validar CPF único:', error);
      return { unico: true };
    }
  }

  async obterUsuariosPorEquipe(equipeId: string): Promise<Usuario[]> {
    try {
      const usuarios = await this.obterUsuarios();
      return usuarios.filter(u => u.equipeId === equipeId);
    } catch (error) {
      console.error('Erro ao obter usuários por equipe:', error);
      return [];
    }
  }

  async atribuirSupervisorEquipe(equipeId: string, supervisorId: string): Promise<void> {
    try {
      await this.atualizarUsuario(supervisorId, { 
        funcao: FuncaoUsuario.SUPERVISOR_EQUIPE,
        equipeId 
      });
    } catch (error) {
      console.error('Erro ao atribuir supervisor de equipe:', error);
      throw new Error('Erro ao atribuir supervisor de equipe');
    }
  }

  async verificarConsistenciaUsuario(id: string): Promise<{ consistente: boolean; existeNoAuth: boolean; existeNaCRM: boolean }> {
    try {
      const usuario = await this.obterUsuarioPorId(id);
      return {
        consistente: !!usuario,
        existeNoAuth: true, // Assumindo que existe no Auth se chegou aqui
        existeNaCRM: !!usuario
      };
    } catch (error) {
      console.error('Erro ao verificar consistência do usuário:', error);
      return { consistente: false, existeNoAuth: false, existeNaCRM: false };
    }
  }

  async obterUsuarioParaExclusao(id: string): Promise<Usuario | null> {
    return this.obterUsuarioPorId(id);
  }

  async excluirUsuarioPermanentemente(id: string): Promise<boolean> {
    try {
      await remove(ref(realtimeDb, `usuarios/${id}`));
      return true;
    } catch (error) {
      console.error('Erro ao excluir usuário permanentemente:', error);
      return false;
    }
  }

  async sincronizarUsuarios(): Promise<{ removidos: number; erros: string[] }> {
    try {
      const usuarios = await this.obterUsuarios();
      const erros: string[] = [];
      let removidos = 0;

      for (const usuario of usuarios) {
        try {
          const consistencia = await this.verificarConsistenciaUsuario(usuario.id);
          if (!consistencia.consistente) {
            await this.excluirUsuarioPermanentemente(usuario.id);
            removidos++;
          }
        } catch (error) {
          erros.push(`Erro ao sincronizar usuário ${usuario.nome}: ${error}`);
        }
      }

      return { removidos, erros };
    } catch (error) {
      console.error('Erro ao sincronizar usuários:', error);
      return { removidos: 0, erros: ['Erro geral na sincronização'] };
    }
  }

  // Sistema de permissões atualizado conforme especificações do usuário
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
          podeGerenciarUsuarios: true, // Pode criar, mas não excluir
          podeEditarVendas: true,
          podeGerenciarEquipes: true, // Pode gerenciar, mas não criar/excluir
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: true,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: true, // Pode gerenciar planos, mas não criar/excluir/editar
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
          podeAcessarNovaVenda: false, // Não tem acesso
          podeAcessarConfiguracoes: false, // Não tem acesso
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
          podeAcessarConfiguracoes: false, // Não tem acesso
        };
      
      case FuncaoUsuario.VENDEDOR:
        return {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false,
          podeAcessarNovaVenda: true,
          podeAcessarConfiguracoes: false, // Não tem acesso
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
    const numeros = telefone.replace(/\D/g, '');
    if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }
    return telefone;
  }

  formatarCpf(cpf: string): string {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length === 11) {
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
    }
    return cpf;
  }
}

export const firebaseUsuariosService = new FirebaseUsuariosService();
export default firebaseUsuariosService; 