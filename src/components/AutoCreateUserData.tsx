import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserCheck, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { ref, set, get } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Usuario, FuncaoUsuario, PermissoesUsuario } from '@/types/usuario';
import FirebaseAuthService from '@/services/firebaseAuthService';

export default function AutoCreateUserData() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    // Detectar usuário atual
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      
      if (user) {
        checkUserExists(user.uid);
      } else {
        setUserExists(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkUserExists = async (uid: string) => {
    try {
      const userRef = ref(realtimeDb, `usuarios/${uid}`);
      const snapshot = await get(userRef);
      setUserExists(snapshot.exists());
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      setUserExists(false);
    }
  };

  const createUserData = async () => {
    if (!currentUser) {
      setResult({
        success: false,
        message: 'Nenhum usuário logado encontrado'
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log('Criando dados para usuário:', currentUser.uid);

      // Determinar função baseada no email
      let funcao = FuncaoUsuario.VENDEDOR;
      let permissoes: PermissoesUsuario;

      if (currentUser.email?.includes('admin')) {
        funcao = FuncaoUsuario.ADMINISTRADOR_GERAL;
        permissoes = {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: true,
          podeEditarVendas: true,
          podeGerenciarEquipes: true,
          podeCriarSupervisorEquipe: true,
          podeCriarVendedor: true
        };
      } else if (currentUser.email?.includes('gerente')) {
        funcao = FuncaoUsuario.SUPERVISOR;
        permissoes = {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: true,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: true
        };
      } else if (currentUser.email?.includes('backoffice')) {
        funcao = FuncaoUsuario.BACKOFFICE;
        permissoes = {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: false,
          podeEditarVendas: true,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false
        };
      } else {
        funcao = FuncaoUsuario.VENDEDOR;
        permissoes = {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: false,
          podeAcessarApenasPropriaVendas: true,
          podeGerenciarUsuarios: false,
          podeEditarVendas: false,
          podeGerenciarEquipes: false,
          podeCriarSupervisorEquipe: false,
          podeCriarVendedor: false
        };
      }

      // Criar dados do usuário
      const userData: Usuario = {
        id: currentUser.uid,
        nome: currentUser.displayName?.split(' ')[0] || 'Usuário',
        sobrenome: currentUser.displayName?.split(' ').slice(1).join(' ') || 'Sistema',
        email: currentUser.email || '',
        telefone: '(11) 00000-0000',
        funcao,
        permissoes,
        ativo: true,
        dataCriacao: new Date().toISOString()
      };

      // Salvar no Realtime Database
      await set(ref(realtimeDb, `usuarios/${currentUser.uid}`), userData);

      setResult({
        success: true,
        message: `Dados criados com sucesso! Função: ${funcao}`
      });

      setUserExists(true);
      console.log('Dados do usuário criados:', userData);
    } catch (error: any) {
      console.error('Erro ao criar dados do usuário:', error);
      setResult({
        success: false,
        message: 'Erro ao criar dados: ' + (error.message || 'Erro desconhecido')
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (userExists === null) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (userExists) return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <AlertCircle className="h-4 w-4 text-orange-500" />;
  };

  const getStatusText = () => {
    if (userExists === null) return 'Verificando...';
    if (userExists) return 'Usuário encontrado no Realtime Database';
    return 'Usuário não encontrado no Realtime Database';
  };

  if (!currentUser) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-500" />
            Detectar Usuário
          </CardTitle>
          <CardDescription>
            Faça login primeiro para detectar o usuário atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Nenhum usuário logado encontrado. Faça login para continuar.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-600" />
          Criar Dados do Usuário
        </CardTitle>
        <CardDescription>
          Cria automaticamente os dados do usuário atual no Realtime Database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Usuário Atual:</h4>
          <div className="text-sm space-y-1">
            <div><strong>UID:</strong> {currentUser.uid}</div>
            <div><strong>Email:</strong> {currentUser.email}</div>
            <div><strong>Nome:</strong> {currentUser.displayName || 'Não definido'}</div>
            <div className="flex items-center gap-2">
              <span><strong>Status:</strong></span>
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>

        {!userExists && (
          <div className="space-y-2">
            <h4 className="font-medium">Este componente irá:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Detectar automaticamente a função baseada no email</li>
              <li>• Criar dados completos do usuário</li>
              <li>• Configurar permissões adequadas</li>
              <li>• Permitir login completo no sistema</li>
            </ul>
          </div>
        )}

        {userExists ? (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>✅ Usuário já existe!</strong> Os dados já estão criados no Realtime Database.
            </AlertDescription>
          </Alert>
        ) : (
          <Button 
            onClick={createUserData} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando dados...
              </>
            ) : (
              'Criar Dados do Usuário'
            )}
          </Button>
        )}

        {result && (
          <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
              {result.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Nota:</strong> Após criar os dados, faça logout e login novamente para testar.</p>
        </div>
      </CardContent>
    </Card>
  );
} 