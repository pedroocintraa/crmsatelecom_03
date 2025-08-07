import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

/**
 * Página para alterar senha do usuário logado
 */
const ChangePassword = () => {
  const { user } = useAuth();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
      });
      return;
    }

    if (novaSenha.length < 6) {
      toast({
        variant: "destructive",
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    if (senhaAtual === novaSenha) {
      toast({
        variant: "destructive",
        title: "Senhas iguais",
        description: "A nova senha deve ser diferente da atual.",
      });
      return;
    }

    setLoading(true);

    try {
      // Verificar se o usuário está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error("Usuário não está autenticado");
      }

      console.log('🔑 Iniciando processo de alteração de senha...');

      // Reautenticar o usuário com a senha atual
      const credential = EmailAuthProvider.credential(currentUser.email, senhaAtual);
      await reauthenticateWithCredential(currentUser, credential);
      console.log('✅ Usuário reautenticado com sucesso');

      // Atualizar a senha
      await updatePassword(currentUser, novaSenha);
      console.log('✅ Senha alterada com sucesso');

      // Limpar formulário
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");

      toast({
        title: "Senha alterada com sucesso",
        description: "Sua senha foi alterada com sucesso. Use a nova senha nos próximos logins.",
      });

    } catch (error: any) {
      console.error('❌ Erro ao alterar senha:', error);
      
      let errorMessage = "Ocorreu um erro inesperado.";
      
      // Tratar erros específicos do Firebase
      if (error.code === 'auth/wrong-password') {
        errorMessage = "A senha atual está incorreta.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "A nova senha é muito fraca. Use pelo menos 6 caracteres.";
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = "Por segurança, faça login novamente antes de alterar a senha.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "Usuário não encontrado.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        variant: "destructive",
        title: "Erro ao alterar senha",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alterar Senha</h1>
        <p className="text-muted-foreground">
          Altere sua senha de acesso ao sistema
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Alterar Senha</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="senha-atual">Senha Atual</Label>
              <div className="relative">
                <Input
                  id="senha-atual"
                  type={mostrarSenhaAtual ? "text" : "password"}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
                  aria-label={mostrarSenhaAtual ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenhaAtual ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nova-senha">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="nova-senha"
                  type={mostrarNovaSenha ? "text" : "password"}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Digite sua nova senha"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                  aria-label={mostrarNovaSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarNovaSenha ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
              <Input
                id="confirmar-senha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua nova senha"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Alterando..." : "Alterar Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;