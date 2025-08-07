import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { ref, set, get, update, remove, query, orderByChild, equalTo, getDatabase } from 'firebase/database';
import { auth, realtimeDb } from '@/lib/firebase';
import { Usuario, PermissoesUsuario, FuncaoUsuario } from '@/types/usuario';

export interface AuthError {
  code: string;
  message: string;
}

export interface LoginResult {
  success: boolean;
  error?: AuthError;
  user?: Usuario;
}

export class FirebaseAuthService {
  // Login com email e senha
  static async login(email: string, password: string): Promise<LoginResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      console.log('Firebase Auth successful:', firebaseUser.uid);
      
      // Buscar dados do usuário no Realtime Database
      try {
        // Primeiro, tentar buscar pelo UID do Firebase Auth
        let userRef = ref(realtimeDb, `usuarios/${firebaseUser.uid}`);
        let userSnapshot = await get(userRef);
        
        // Se não encontrar pelo UID, buscar por email
        if (!userSnapshot.exists()) {
          console.log('User not found by UID, searching by email...');
          
          // Buscar todos os usuários para encontrar por email
          const allUsersRef = ref(realtimeDb, 'usuarios');
          const allUsersSnapshot = await get(allUsersRef);
          
          if (allUsersSnapshot.exists()) {
            const allUsers = allUsersSnapshot.val();
            let foundUser = null;
            let foundUserId = null;
            
            // Procurar usuário pelo email
            for (const [userId, userData] of Object.entries(allUsers)) {
              const user = userData as Usuario;
              if (user.email === firebaseUser.email) {
                foundUser = user;
                foundUserId = userId;
                break;
              }
            }
            
            if (foundUser) {
              console.log('✅ User found by email:', foundUserId);
              
              // Atualizar o ID para o UID do Firebase Auth (para compatibilidade)
              const updatedUserData = {
                ...foundUser,
                id: firebaseUser.uid
              };
              
              // Criar entrada com o UID do Firebase Auth
              await set(ref(realtimeDb, `usuarios/${firebaseUser.uid}`), updatedUserData);
              
              // Remover a entrada antiga (opcional)
              if (foundUserId !== firebaseUser.uid) {
                await remove(ref(realtimeDb, `usuarios/${foundUserId}`));
                console.log('🗑️ Removed old user entry:', foundUserId);
              }
              
              return {
                success: true,
                user: updatedUserData
              };
            }
          }
          
          // Se não encontrou por email, criar dados padrão
          console.warn('User not found by email, creating default data...');
          
          try {
            const defaultUserData: Usuario = {
              id: firebaseUser.uid,
              nome: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
              telefone: '',
              email: firebaseUser.email || '',
              cpf: '',
              funcao: FuncaoUsuario.VENDEDOR,
              dataCadastro: new Date().toISOString(),
              ativo: true
            };

            await set(ref(realtimeDb, `usuarios/${firebaseUser.uid}`), defaultUserData);
            console.log('✅ User data created automatically in Realtime Database');
            
            return {
              success: true,
              user: defaultUserData
            };
          } catch (createError: any) {
            console.error('Failed to create user data automatically:', createError);
            return {
              success: false,
              error: {
                code: 'user-not-found',
                message: 'Usuário não encontrado no sistema. Entre em contato com o administrador.'
              }
            };
          }
        }

        // Se o usuário existe, usar os dados existentes
        const userData = userSnapshot.val() as Usuario;
        console.log('✅ User data found in Realtime DB:', userData);
        
        // Garantir que o ID está correto
        const userWithCorrectId = {
          ...userData,
          id: firebaseUser.uid
        };
        
        return {
          success: true,
          user: userWithCorrectId
        };
      } catch (realtimeError: any) {
        console.error('Realtime Database error:', realtimeError);
        return {
          success: false,
          error: {
            code: realtimeError.code || 'realtime-error',
            message: 'Erro ao buscar dados do usuário: ' + (realtimeError.message || 'Erro desconhecido')
          }
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Mapear códigos de erro do Firebase para mensagens em português
      let errorMessage = 'Erro desconhecido durante o login';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        default:
          errorMessage = error.message || 'Erro durante o login';
      }
      
      return {
        success: false,
        error: {
          code: error.code || 'unknown-error',
          message: errorMessage
        }
      };
    }
  }

  // Criar novo usuário
  static async createUser(
    email: string, 
    password: string, 
    userData: Omit<Usuario, 'id'>
  ): Promise<LoginResult> {
    try {
      // Se o userData já tem um ID, usar esse ID
      const userId = (userData as any).id || Date.now().toString();
      
      console.log('Creating user with ID:', userId);

      // Criar dados do usuário no Realtime Database primeiro
      const userDoc = {
        ...userData,
        id: userId,
        email: email,
        dataCadastro: new Date().toISOString(),
        ativo: true
      };

      try {
        await set(ref(realtimeDb, `usuarios/${userId}`), userDoc);
        console.log('✅ User data created in Realtime Database with ID:', userId);
      } catch (realtimeError: any) {
        console.error('Error creating user in Realtime Database:', realtimeError);
        throw new Error('Erro ao criar dados do usuário: ' + realtimeError.message);
      }

      // Tentar criar no Firebase Auth (opcional, para compatibilidade)
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User also created in Firebase Auth:', userCredential.user.uid);
      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          console.log('⚠️ User already exists in Firebase Auth, continuing...');
        } else {
          console.warn('⚠️ Could not create user in Firebase Auth:', authError.message);
        }
      }

      return {
        success: true,
        user: userDoc
      };
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      let errorMessage = 'Erro desconhecido ao criar usuário';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca';
          break;
        default:
          errorMessage = error.message || 'Erro ao criar usuário';
      }
      
      return {
        success: false,
        error: {
          code: error.code || 'unknown-error',
          message: errorMessage
        }
      };
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Buscar usuário atual
  static async getCurrentUser(): Promise<Usuario | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      console.log('No Firebase user found');
      return null;
    }

    try {
      const userRef = ref(realtimeDb, `usuarios/${firebaseUser.uid}`);
      const userSnapshot = await get(userRef);
      
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val() as Usuario;
        console.log('Current user data retrieved from Realtime DB:', userData);
        return userData;
      }
      
      console.log('User not found in Realtime Database');
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Atualizar dados do usuário
  static async updateUser(userId: string, updates: Partial<Usuario>): Promise<boolean> {
    try {
      await update(ref(realtimeDb, `usuarios/${userId}`), updates);
      console.log('User updated in Realtime Database');
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  // Buscar usuário por email
  static async getUserByEmail(email: string): Promise<Usuario | null> {
    try {
      const usersRef = ref(realtimeDb, 'usuarios');
      const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = Object.keys(users)[0];
        const userData = users[userId] as Usuario;
        return { ...userData, id: userId };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  // Listar todos os usuários (apenas para administradores)
  static async getAllUsers(): Promise<Usuario[]> {
    try {
      const usersRef = ref(realtimeDb, 'usuarios');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        return Object.entries(users).map(([id, userData]) => ({
          ...userData as Usuario,
          id
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Deletar usuário
  static async deleteUser(userId: string): Promise<boolean> {
    try {
      await remove(ref(realtimeDb, `usuarios/${userId}`));
      console.log('User deleted from Realtime Database');
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Listener para mudanças de autenticação
  static onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Testar conexão com Realtime Database
  static async testConnection(): Promise<boolean> {
    try {
      const testRef = ref(realtimeDb, 'test/connection');
      await set(testRef, { timestamp: Date.now() });
      await remove(testRef);
      return true;
    } catch (error) {
      console.error('Realtime Database connection test failed:', error);
      return false;
    }
  }
}

export default FirebaseAuthService; 