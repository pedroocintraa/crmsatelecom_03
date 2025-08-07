import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Wifi, WifiOff, Database } from 'lucide-react';
import FirebaseAuthService from '@/services/firebaseAuthService';
import { auth, realtimeDb } from '@/lib/firebase';

export default function FirebaseConnectionTest() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    auth: boolean;
    realtimeDb: boolean;
    error?: string;
  } | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setResults(null);

    try {
      // Testar Firebase Auth
      let authWorking = false;
      try {
        // Verificar se o auth está inicializado
        auth.currentUser;
        authWorking = true;
      } catch (error) {
        console.error('Auth test failed:', error);
      }

      // Testar Realtime Database
      let realtimeDbWorking = false;
      try {
        realtimeDbWorking = await FirebaseAuthService.testConnection();
      } catch (error) {
        console.error('Realtime Database test failed:', error);
      }

      setResults({
        auth: authWorking,
        realtimeDb: realtimeDbWorking,
        error: !authWorking || !realtimeDbWorking ? 'Alguns serviços não estão funcionando' : undefined
      });
    } catch (error: any) {
      setResults({
        auth: false,
        realtimeDb: false,
        error: error.message || 'Erro desconhecido'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (working: boolean) => {
    return working ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const getStatusBadge = (working: boolean, label: string) => {
    return (
      <Badge variant={working ? "default" : "destructive"}>
        {working ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
        {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-500" />
          Teste de Conexão Firebase
        </CardTitle>
        <CardDescription>
          Verifique se o Firebase Auth e Realtime Database estão funcionando
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testConnection} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testando conexão...
            </>
          ) : (
            'Testar Conexão'
          )}
        </Button>

        {results && (
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Status dos Serviços:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getStatusIcon(results.auth)}
                  <span className="text-sm">
                    Firebase Auth: {results.auth ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(results.realtimeDb)}
                  <span className="text-sm">
                    Realtime Database: {results.realtimeDb ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {getStatusBadge(results.auth, "Auth")}
              {getStatusBadge(results.realtimeDb, "Realtime DB")}
            </div>

            {results.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Problema detectado:</strong> {results.error}
                </AlertDescription>
              </Alert>
            )}

            {!results.error && results.auth && results.realtimeDb && (
              <Alert>
                <AlertDescription>
                  <strong>✅ Tudo funcionando!</strong> O Firebase Auth e Realtime Database estão configurados corretamente.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Dica:</strong> Se houver problemas, verifique:</p>
          <ul className="mt-1 space-y-1">
            <li>• Configuração do Firebase no console</li>
            <li>• Regras de segurança do Realtime Database</li>
            <li>• Conexão com a internet</li>
            <li>• Realtime Database habilitado no projeto</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 