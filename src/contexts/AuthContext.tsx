import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Usuario, PermissoesUsuario, FuncaoUsuario } from "@/types/usuario";
import { usuariosService } from "@/services/usuariosService";
import FirebaseAuthService, { LoginResult } from "@/services/firebaseAuthService";
import { User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  usuario: Usuario | null;
  permissoes: PermissoesUsuario | null;
  user: FirebaseUser | null;
  session: any | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [permissoes, setPermissoes] = useState<PermissoesUsuario | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener para mudanças de autenticação do Firebase
    const unsubscribe = FirebaseAuthService.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Buscar dados do usuário no Firestore
          const userData = await FirebaseAuthService.getCurrentUser();
          if (userData) {
            setUsuario(userData);
            setPermissoes(userData.permissoes || null);
            setSession({ user: firebaseUser });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        setUsuario(null);
        setPermissoes(null);
        setSession(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result: LoginResult = await FirebaseAuthService.login(email, password);
      
      if (result.success && result.user) {
        setUsuario(result.user);
        setPermissoes(result.user.permissoes || null);
        return { error: null };
      } else {
        return { 
          error: { 
            message: result.error?.message || 'Erro no login' 
          } 
        };
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      return { 
        error: { 
          message: error.message || 'Erro desconhecido durante o login' 
        } 
      };
    }
  };

  const logout = async () => {
    try {
      await FirebaseAuthService.logout();
      setUsuario(null);
      setPermissoes(null);
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const isAuthenticated = !!user && !!usuario;
  
  console.log('AuthContext isAuthenticated:', { 
    hasUser: !!user, 
    hasUsuario: !!usuario, 
    isAuthenticated 
  });

  return (
    <AuthContext.Provider value={{
      usuario,
      permissoes,
      user,
      session,
      login,
      logout,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}