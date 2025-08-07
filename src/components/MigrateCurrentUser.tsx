import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Usuario, FuncaoUsuario, PermissoesUsuario } from '@/types/usuario';

export default function MigrateCurrentUser() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const migrateCurrentUser = async () => {
    setLoading(true);
    setResult(null);

    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setResult({
          success: false,
          message: 'Nenhum usuário logado encontrado'
        });
        return;
      }

      console.log('Migrando usuário atual:', currentUser.uid);

      // Criar dados do usuário no Realtime Database
      const userData: Usuario = {
        id: currentUser.uid,
        nome: 'Usuário',
        sobrenome: 'Sistema',
        email: currentUser.email || '',
        telefone: '(11) 00000-0000',
        funcao: FuncaoUsuario.ADMINISTRADOR,
        permissoes: {
          visualizarDashboard: true,
          gerenciarUsuarios: true,
          gerenciarEquipes: true,
          cadastrarVendas: true,
          visualizarVendas: true,
          editarVendas: true,
          excluirVendas: true,
          gerenciarConfiguracoes: true
        } as PermissoesUsuario,
        ativo: true,
        dataCriacao: new Date().toISOString()
      };

      // Salvar no Realtime Database
      await set(ref(realtimeDb, `usuarios/${currentUser.uid}`), userData);

      setResult({
        success: true,
        message: `Usuário migrado com sucesso! UID: ${currentUser.uid}`
      });

      console.log('Usuário migrado com sucesso:', userData);
    } catch (error: any) {
      console.error('Erro ao migrar usuário:', error);
      setResult({
        success: false,
        message: 'Erro ao migrar usuário: ' + (error.message || 'Erro desconhecido')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-600" />
          Migrar Usuário Atual
        </CardTitle>
        <CardDescription>
          Cria os dados do usuário atual no Realtime Database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Este componente irá:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Verificar se há um usuário logado</li>
            <li>• Criar dados do usuário no Realtime Database</li>
            <li>• Configurar permissões de administrador</li>
            <li>• Permitir login completo no sistema</li>
          </ul>
        </div>

        <Button 
          onClick={migrateCurrentUser} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Migrando usuário...
            </>
          ) : (
            'Migrar Usuário Atual'
          )}
        </Button>

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
          <p><strong>Nota:</strong> Use este componente se o login está funcionando mas os dados do usuário não aparecem no sistema.</p>
        </div>
      </CardContent>
    </Card>
  );
} 