/**
 * Utilitário para reparar usuários órfãos
 * - Usuários que existem no Authentication mas não no Realtime Database
 */

import { auth, realtimeDb } from '@/lib/firebase';
import { ref, get, set } from 'firebase/database';
import { listUsers } from 'firebase/auth';
import type { Usuario, FuncaoUsuario } from '@/types/usuario';

interface UsuarioOrfao {
  uid: string;
  email: string;
  displayName?: string;
  creationTime?: string;
}

export async function verificarUsuariosOrfaos(): Promise<UsuarioOrfao[]> {
  try {
    console.log('🔍 Verificando usuários órfãos...');
    
    // Esta função só funciona no servidor/admin SDK
    // Para o frontend, precisamos usar uma abordagem diferente
    
    console.warn('⚠️ Esta função precisa ser executada no backend com Admin SDK');
    return [];
    
  } catch (error) {
    console.error('❌ Erro ao verificar usuários órfãos:', error);
    throw error;
  }
}

export async function repararUsuarioOrfao(
  uid: string, 
  dadosUsuario: {
    nome: string;
    email: string;
    telefone?: string;
    cpf?: string;
    funcao: FuncaoUsuario;
    equipeId?: string;
  }
): Promise<Usuario> {
  try {
    console.log(`🔧 Reparando usuário órfão: ${uid}`);
    
    // Verificar se o usuário já existe no Realtime Database
    const usuarioRef = ref(realtimeDb, `usuarios/${uid}`);
    const snapshot = await get(usuarioRef);
    
    if (snapshot.exists()) {
      console.log('✅ Usuário já existe no Realtime Database');
      return snapshot.val();
    }
    
    // Buscar nome da equipe se equipeId for fornecido
    let nomeEquipe: string | undefined;
    if (dadosUsuario.equipeId) {
      try {
        const equipeRef = ref(realtimeDb, `equipes/${dadosUsuario.equipeId}`);
        const equipeSnapshot = await get(equipeRef);
        if (equipeSnapshot.exists()) {
          const equipeData = equipeSnapshot.val();
          nomeEquipe = equipeData.nome;
        }
      } catch (equipeError) {
        console.warn('⚠️ Erro ao buscar nome da equipe:', equipeError);
      }
    }
    
    // Definir permissões baseadas na função
    const obterPermissoes = (funcao: FuncaoUsuario) => {
      switch (funcao) {
        case FuncaoUsuario.ADMINISTRADOR_GERAL:
          return {
            visualizarTodosUsuarios: true,
            criarUsuarios: true,
            editarUsuarios: true,
            excluirUsuarios: true,
            visualizarTodasVendas: true,
            criarVendas: true,
            editarVendas: true,
            excluirVendas: true,
            gerenciarEquipes: true,
            acessarRelatorios: true,
            configurarSistema: true
          };
        case FuncaoUsuario.SUPERVISOR:
          return {
            visualizarTodosUsuarios: true,
            criarUsuarios: false,
            editarUsuarios: false,
            excluirUsuarios: false,
            visualizarTodasVendas: true,
            criarVendas: true,
            editarVendas: true,
            excluirVendas: false,
            gerenciarEquipes: false,
            acessarRelatorios: true,
            configurarSistema: false
          };
        case FuncaoUsuario.BACKOFFICE:
          return {
            visualizarTodosUsuarios: false,
            criarUsuarios: false,
            editarUsuarios: false,
            excluirUsuarios: false,
            visualizarTodasVendas: true,
            criarVendas: false,
            editarVendas: true,
            excluirVendas: false,
            gerenciarEquipes: false,
            acessarRelatorios: false,
            configurarSistema: false
          };
        case FuncaoUsuario.SUPERVISOR_EQUIPE:
          return {
            visualizarTodosUsuarios: false,
            criarUsuarios: false,
            editarUsuarios: false,
            excluirUsuarios: false,
            visualizarTodasVendas: false,
            criarVendas: true,
            editarVendas: true,
            excluirVendas: false,
            gerenciarEquipes: false,
            acessarRelatorios: false,
            configurarSistema: false
          };
        case FuncaoUsuario.VENDEDOR:
          return {
            visualizarTodosUsuarios: false,
            criarUsuarios: false,
            editarUsuarios: false,
            excluirUsuarios: false,
            visualizarTodasVendas: false,
            criarVendas: true,
            editarVendas: false,
            excluirVendas: false,
            gerenciarEquipes: false,
            acessarRelatorios: false,
            configurarSistema: false
          };
        default:
          return {};
      }
    };
    
    // Criar dados do usuário
    const novoUsuario: Usuario = {
      id: uid,
      nome: dadosUsuario.nome.toUpperCase(),
      email: dadosUsuario.email.toLowerCase(),
      telefone: dadosUsuario.telefone || '(00) 00000-0000',
      cpf: dadosUsuario.cpf || '000.000.000-00',
      funcao: dadosUsuario.funcao,
      dataCadastro: new Date().toISOString(),
      ativo: true,
      permissoes: obterPermissoes(dadosUsuario.funcao),
      ...(dadosUsuario.equipeId && { equipeId: dadosUsuario.equipeId }),
      ...(nomeEquipe && { nomeEquipe })
    };
    
    // Salvar no Realtime Database
    await set(usuarioRef, novoUsuario);
    
    console.log('✅ Usuário órfão reparado com sucesso');
    return novoUsuario;
    
  } catch (error) {
    console.error('❌ Erro ao reparar usuário órfão:', error);
    throw error;
  }
}

export async function verificarUsuarioExiste(uid: string): Promise<boolean> {
  try {
    const usuarioRef = ref(realtimeDb, `usuarios/${uid}`);
    const snapshot = await get(usuarioRef);
    return snapshot.exists();
  } catch (error) {
    console.error('❌ Erro ao verificar usuário:', error);
    return false;
  }
}