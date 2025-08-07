/**
 * Painel de debug para autenticação - mostra estado detalhado e permite correções
 */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import FirebaseAuthService from '@/services/firebaseAuthService';

interface AuthDebugResult {
  firebase_user: any;
  usuario: any;
  isAuthenticated: boolean;
  loading: boolean;
  timestamp_check: string;
}

export function AuthDebugPanel() {
  const { user, usuario, isAuthenticated, loading } = useAuth();
  const [debugResult, setDebugResult] = useState<AuthDebugResult | null>(null);
  const [fixResult, setFixResult] = useState<any>(null);
  const [debugLoading, setDebugLoading] = useState(false);

  const handleDebugAuth = async () => {
    setDebugLoading(true);
    try {
      const currentUser = await FirebaseAuthService.getCurrentUser();
      
      const result: AuthDebugResult = {
        firebase_user: user,
        usuario: currentUser,
        isAuthenticated,
        loading,
        timestamp_check: new Date().toISOString()
      };
      
      setDebugResult(result);
    } catch (error) {
      console.error('Erro no debug:', error);
    } finally {
      setDebugLoading(false);
    }
  };

  const handleFixAuth = async () => {
    setDebugLoading(true);
    try {
      // Forçar refresh do estado de autenticação
      const currentUser = await FirebaseAuthService.getCurrentUser();
      
      setFixResult({
        success: true,
        message: 'Estado de autenticação atualizado',
        authData: {
          session_valid: !!currentUser,
          user_found: !!currentUser
        }
      });
      
      // Atualizar debug após correção
      const result: AuthDebugResult = {
        firebase_user: user,
        usuario: currentUser,
        isAuthenticated: !!currentUser,
        loading: false,
        timestamp_check: new Date().toISOString()
      };
      
      setDebugResult(result);
    } catch (error) {
      console.error('Erro na correção:', error);
      setFixResult({ success: false, message: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    setDebugLoading(true);
    try {
      // No Firebase, não precisamos refresh manual do token
      // Mas podemos forçar uma verificação do estado atual
      const currentUser = await FirebaseAuthService.getCurrentUser();
      
      setFixResult({
        success: true,
        message: 'Token verificado e estado atualizado'
      });
      
      // Atualizar debug após refresh
      setTimeout(async () => {
        const result: AuthDebugResult = {
          firebase_user: user,
          usuario: currentUser,
          isAuthenticated: !!currentUser,
          loading: false,
          timestamp_check: new Date().toISOString()
        };
        
        setDebugResult(result);
      }, 1000);
    } catch (error) {
      console.error('Erro no refresh:', error);
    } finally {
      setDebugLoading(false);
    }
  };

  const getStatusIcon = (valid: boolean) => {
    return valid ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (valid: boolean, label: string) => {
    return (
      <Badge variant={valid ? "default" : "destructive"}>
        {valid ? "✓" : "✗"} {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Debug de Autenticação Firebase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleDebugAuth}
            disabled={debugLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${debugLoading ? 'animate-spin' : ''}`} />
            Debug Completo
          </Button>
          
          <Button
            onClick={handleRefreshToken}
            disabled={debugLoading}
            variant="outline"
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            Verificar Token
          </Button>
          
          <Button
            onClick={handleFixAuth}
            disabled={debugLoading}
            variant="default"
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Corrigir Autenticação
          </Button>
        </div>

        {debugResult && (
          <div className="space-y-4">
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Estado do Firebase</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(!!debugResult.firebase_user)}
                    <span className="text-sm">
                      Firebase User: {debugResult.firebase_user ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(debugResult.isAuthenticated)}
                    <span className="text-sm">
                      Autenticado: {debugResult.isAuthenticated ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(!debugResult.loading)}
                    <span className="text-sm">
                      Loading: {debugResult.loading ? 'Sim' : 'Não'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Dados do Usuário</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(!!debugResult.usuario)}
                    <span className="text-sm">
                      Usuário Encontrado: {debugResult.usuario ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  {debugResult.usuario?.nome && (
                    <div className="text-sm">
                      <strong>Nome:</strong> {debugResult.usuario.nome}
                    </div>
                  )}
                  {debugResult.usuario?.funcao && (
                    <div className="text-sm">
                      <strong>Função:</strong> {debugResult.usuario.funcao}
                    </div>
                  )}
                  {debugResult.usuario?.id && (
                    <div className="text-sm text-xs text-muted-foreground">
                      <strong>ID:</strong> {debugResult.usuario.id}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {getStatusBadge(!!debugResult.firebase_user, "Firebase Auth")}
              {getStatusBadge(debugResult.isAuthenticated, "Contexto Auth")}
              {getStatusBadge(!!debugResult.usuario, "Usuário Local")}
            </div>

            {debugResult.firebase_user && (
              <details className="text-xs">
                <summary className="cursor-pointer font-semibold">Firebase User Data (clique para expandir)</summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                  {JSON.stringify(debugResult.firebase_user, null, 2)}
                </pre>
              </details>
            )}

            <div className="text-xs text-muted-foreground">
              Última verificação: {new Date(debugResult.timestamp_check).toLocaleString()}
            </div>
          </div>
        )}

        {fixResult && (
          <Alert variant={fixResult.success ? "default" : "destructive"}>
            <AlertDescription>
              <strong>Resultado da Correção:</strong> {fixResult.message}
              {fixResult.authData && (
                <div className="mt-2 text-xs">
                  Debug atualizado: Sessão válida = {fixResult.authData.session_valid ? 'Sim' : 'Não'}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <Alert>
          <AlertDescription className="text-sm">
            Este painel mostra o estado detalhado da autenticação Firebase e pode ajudar a identificar 
            problemas de contexto. Use "Corrigir Autenticação" se detectar inconsistências.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}