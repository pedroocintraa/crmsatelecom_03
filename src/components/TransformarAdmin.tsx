import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Crown, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { ref, update, get } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { FuncaoUsuario } from '@/types/usuario';

export function TransformarAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultado, setResultado] = useState<{
    sucesso: boolean;
    mensagem: string;
    dados?: any;
  } | null>(null);

  const userId = 'MmKJUH5zgQN5TlGqe1iAMamBMkj1';

  const transformarEmAdministrador = async () => {
    setIsLoading(true);
    setResultado(null);

    try {
      console.log('🔄 Iniciando transformação do usuário em Administrador Geral...');
      
      // Verificar se o usuário existe
      const usuarioRef = ref(realtimeDb, `usuarios/${userId}`);
      const snapshot = await get(usuarioRef);
      
      if (!snapshot.exists()) {
        setResultado({
          sucesso: false,
          mensagem: '❌ Usuário não encontrado no Realtime Database'
        });
        return;
      }

      const usuarioAtual = snapshot.val();
      console.log('👤 Usuário atual:', usuarioAtual);

      // Dados do Administrador Geral
      const dadosAdmin = {
        funcao: FuncaoUsuario.ADMINISTRADOR_GERAL,
        permissoes: {
          podeAcessarDashboard: true,
          podeAcessarTodasVendas: true,
          podeAcessarApenasPropriaVendas: false,
          podeGerenciarUsuarios: true,
          podeEditarVendas: true,
          podeGerenciarEquipes: true,
          podeCriarSupervisorEquipe: true,
          podeCriarVendedor: true
        }
      };

      // Atualizar usuário
      await update(usuarioRef, dadosAdmin);
      
      console.log('✅ Usuário transformado em Administrador Geral!');

      // Verificar se foi atualizado
      const snapshotAtualizado = await get(usuarioRef);
      const usuarioAtualizado = snapshotAtualizado.val();
      
      setResultado({
        sucesso: true,
        mensagem: '✅ Usuário transformado em Administrador Geral com sucesso!',
        dados: usuarioAtualizado
      });

      console.log('🎉 Verificação final:', usuarioAtualizado);

    } catch (error) {
      console.error('❌ Erro ao transformar usuário:', error);
      setResultado({
        sucesso: false,
        mensagem: `❌ Erro ao transformar usuário: ${error}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-600" />
          Transformar em Administrador Geral
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Este botão transformará o usuário com ID <Badge variant="outline">{userId}</Badge> em Administrador Geral.
          </p>
          <p className="text-sm text-muted-foreground">
            Isso dará acesso total a todas as funcionalidades do sistema.
          </p>
        </div>

        <Button 
          onClick={transformarEmAdministrador}
          disabled={isLoading}
          className="w-full"
          variant="default"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transformando...
            </>
          ) : (
            <>
              <Crown className="mr-2 h-4 w-4" />
              Transformar em Administrador Geral
            </>
          )}
        </Button>

        {resultado && (
          <Alert className={resultado.sucesso ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            {resultado.sucesso ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={resultado.sucesso ? "text-green-800" : "text-red-800"}>
              {resultado.mensagem}
            </AlertDescription>
          </Alert>
        )}

        {resultado?.dados && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Dados Atualizados:</h4>
            <div className="space-y-1 text-xs">
              <div><strong>Nome:</strong> {resultado.dados.nome}</div>
              <div><strong>Email:</strong> {resultado.dados.email}</div>
              <div><strong>Função:</strong> <Badge variant="secondary">{resultado.dados.funcao}</Badge></div>
              <div><strong>Status:</strong> <Badge variant={resultado.dados.ativo ? "default" : "destructive"}>
                {resultado.dados.ativo ? "Ativo" : "Inativo"}
              </Badge></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 