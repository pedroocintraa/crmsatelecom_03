import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle } from 'lucide-react';
import { MigrationPanel } from '@/components/MigrationPanel';
import { AuthDebugPanel } from '@/components/AuthDebugPanel';
import SetupInitialUsers from '@/components/SetupInitialUsers';
import FirebaseConnectionTest from '@/components/FirebaseConnectionTest';
import MigrateCurrentUser from '@/components/MigrateCurrentUser';
import AutoCreateUserData from '@/components/AutoCreateUserData';
import createSampleVendas from '@/utils/createSampleData';
import { TransformarAdmin } from '@/components/TransformarAdmin';
import { SyncUserData } from '@/components/SyncUserData';
// import saTelecomLogo from '@/assets/sa-telecom-logo.png';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMigrationPanel, setShowMigrationPanel] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [showSetupUsers, setShowSetupUsers] = useState(false);
  const [showConnectionTest, setShowConnectionTest] = useState(false);
  const [showMigrateUser, setShowMigrateUser] = useState(false);
  const [showAutoCreate, setShowAutoCreate] = useState(false);
  const [showSampleData, setShowSampleData] = useState(false);
  const [showTransformAdmin, setShowTransformAdmin] = useState(false);
  const [showSyncUserData, setShowSyncUserData] = useState(false);
  const {
    login,
    isAuthenticated,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/');
    }
  }, [isAuthenticated, authLoading, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const {
        error
      } = await login(email, password);
      if (error) {
        // Provide more specific error messages
        if (error.message?.includes('tentativas')) {
          setError(error.message);
        } else if (error.message?.includes('caracteres não permitidos')) {
          setError('Dados inválidos detectados');
        } else if (error.message?.includes('Email inválido')) {
          setError('Formato de email inválido');
        } else {
          setError('Email ou senha incorretos');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Painel de Migração */}
        {showMigrationPanel && <MigrationPanel />}
        
        {/* Painel de Debug de Autenticação */}
        {showDebugPanel && <AuthDebugPanel />}
        
        {/* Painel de Configuração de Usuários Iniciais */}
        {showSetupUsers && <SetupInitialUsers />}
        
        {/* Painel de Teste de Conexão Firebase */}
        {showConnectionTest && <FirebaseConnectionTest />}
        
        {/* Painel de Migração de Usuário Atual */}
        {showMigrateUser && <MigrateCurrentUser />}
        
        {/* Painel de Criação Automática de Dados */}
        {showAutoCreate && <AutoCreateUserData />}
        
        {/* Painel de Dados de Exemplo */}
        {showSampleData && (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Dados de Exemplo
              </CardTitle>
              <CardDescription>
                Cria vendas de exemplo para testar o dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={async () => {
                  const success = await createSampleVendas();
                  if (success) {
                    alert('✅ Dados de exemplo criados! Agora você pode testar o dashboard.');
                  } else {
                    alert('❌ Erro ao criar dados de exemplo.');
                  }
                }}
                className="w-full"
              >
                Criar Vendas de Exemplo
              </Button>
              <div className="text-xs text-muted-foreground">
                <p><strong>Nota:</strong> Isso criará 5 vendas de exemplo no Realtime Database.</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <img src="/lovable-uploads/c25efcbd-b42b-48b3-9e82-db0628ef0cbc.png" alt="SA TELECOM" className="h-40 object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Faça login para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Botões de Debug e Migração */}
            {!showMigrationPanel && !showDebugPanel && !showSetupUsers && !showConnectionTest && !showMigrateUser && !showAutoCreate && !showSampleData && !showTransformAdmin && !showSyncUserData && (
              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSetupUsers(true)}
                  className="text-xs"
                >
                  Configurar Usuários
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConnectionTest(true)}
                  className="text-xs"
                >
                  Testar Firebase
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMigrateUser(true)}
                  className="text-xs"
                >
                  Migrar Usuário
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAutoCreate(true)}
                  className="text-xs"
                >
                  Criar Dados
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSampleData(true)}
                  className="text-xs"
                >
                  Dados Exemplo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTransformAdmin(true)}
                  className="text-xs"
                >
                  Transformar Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSyncUserData(true)}
                  className="text-xs"
                >
                  Sincronizar Dados
                </Button>
              </div>
            )}

            {/* Painel de Transformação em Administrador */}
            {showTransformAdmin && <TransformarAdmin />}

            {/* Painel de Sincronização de Dados */}
            {showSyncUserData && <SyncUserData />}

            {error && <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required disabled={loading} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" required disabled={loading} />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </> : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>;
}