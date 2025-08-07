import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import createInitialUsers from '@/utils/createInitialUsers';

export default function SetupInitialUsers() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleCreateUsers = async () => {
    setLoading(true);
    setResult(null);

    try {
      await createInitialUsers();
      setResult({
        success: true,
        message: 'Usuários iniciais criados com sucesso! Verifique o console para mais detalhes.'
      });
    } catch (error) {
      console.error('Erro ao criar usuários:', error);
      setResult({
        success: false,
        message: 'Erro ao criar usuários. Verifique o console para mais detalhes.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Configuração Inicial
        </CardTitle>
        <CardDescription>
          Crie os usuários iniciais do sistema com diferentes níveis de acesso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Usuários que serão criados:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• <strong>admin@sa-telecom.com</strong> (senha: admin123) - Administrador</li>
            <li>• <strong>gerente@sa-telecom.com</strong> (senha: gerente123) - Gerente</li>
            <li>• <strong>vendedor@sa-telecom.com</strong> (senha: vendedor123) - Vendedor</li>
          </ul>
        </div>

        <Button 
          onClick={handleCreateUsers} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando usuários...
            </>
          ) : (
            'Criar Usuários Iniciais'
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
          <p><strong>Nota:</strong> Esta operação só deve ser executada uma vez durante a configuração inicial do sistema.</p>
        </div>
      </CardContent>
    </Card>
  );
} 