import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, FileX, Play, Check, FileCheck, CheckCircle, X, Clock } from "lucide-react";
import { Venda } from "@/types/venda";
import { useAuth } from "@/contexts/AuthContext";
import { VendaStatusService } from "@/services/vendaStatusService";

interface StatusManagerProps {
  venda: Venda;
  onStatusChange: (newStatus: Venda["status"], extraData?: { dataInstalacao?: string; motivoPerda?: string }) => void;
  showLostOption?: boolean; // Controla se exibe a opção "Marcar como Perdida"
}

export const StatusManager: React.FC<StatusManagerProps> = ({ venda, onStatusChange, showLostOption = true }) => {
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showLostDialog, setShowLostDialog] = useState(false);
  const [dataInstalacao, setDataInstalacao] = useState("");
  const [motivoPerda, setMotivoPerda] = useState("");
  const [pendingAction, setPendingAction] = useState<Venda["status"] | null>(null);
  const { usuario } = useAuth();

  // Verificar se o usuário tem permissão para alterar status
  const hasPermission = usuario?.funcao === "ADMINISTRADOR_GERAL" || 
                       usuario?.funcao === "SUPERVISOR" || 
                       usuario?.funcao === "SUPERVISOR_EQUIPE";

  console.log('🔍 StatusManager Debug:', {
    usuario: usuario?.funcao,
    hasPermission,
    vendaStatus: venda.status,
    vendaId: venda.id,
    usuarioCompleto: usuario
  });

  const getNextActions = () => {
    const actions = [];
    const nextStatuses = VendaStatusService.getNextPossibleStatuses(venda.status);
    
    console.log('🔍 Debug getNextActions:', {
      currentStatus: venda.status,
      nextStatuses,
      userRole: usuario?.funcao
    });
    
    for (const status of nextStatuses) {
      const config = VendaStatusService.getStatusConfig(status);
      if (!config) {
        console.log(`❌ Config não encontrada para status: ${status}`);
        continue;
      }
      
      console.log(`🔍 Verificando status: ${status}`, {
        config,
        userRole: usuario?.funcao,
        hasPermission: config.requiredPermissions.includes(usuario?.funcao || '')
      });
      
      // Verificar permissões do usuário
      if (!config.requiredPermissions.includes(usuario?.funcao || '')) {
        console.log(`❌ Usuário sem permissão para status: ${status}`);
        continue;
      }
      
      const action = {
        action: status,
        label: config.label,
        variant: status === "perdida" ? "destructive" as const : "default" as const,
        icon: config.icon,
        needsReason: config.requiresExtraData?.motivoPerda,
        needsInstallDate: config.requiresExtraData?.dataInstalacao,

        description: config.description
      };
      
      console.log(`✅ Ação adicionada:`, action);
      actions.push(action);
    }
    
    console.log('🔍 Ações disponíveis:', actions);
    return actions;
  };

  const handleAction = (action: Venda["status"], needsReason?: boolean, needsInstallDate?: boolean) => {
    console.log('🔍 handleAction chamado:', { 
      action, 
      needsReason, 
      needsInstallDate,
      vendaStatus: venda.status,
      userRole: usuario?.funcao
    });
    
    try {
      console.log('🔍 Debug processamento:', { needsReason, needsInstallDate, action });
      
      if (needsReason) {
        console.log('🔍 Abrindo diálogo de motivo da perda');
        setShowLostDialog(true);
      } else if (needsInstallDate) {
        console.log('🔍 Abrindo diálogo de data de instalação');
        console.log('🔍 Estado atual do diálogo:', { showInstallDialog });
        setPendingAction(action);
        setShowInstallDialog(true);
        console.log('🔍 Diálogo definido como true');
      } else {
        // Apenas validar se não precisa de dados extras
        const validation = VendaStatusService.validateStatusTransition(
          venda, 
          action, 
          usuario?.funcao || '',
          { dataInstalacao, motivoPerda }
        );
        
        console.log('🔍 Resultado da validação:', validation);
        
        if (!validation.valid) {
          console.error('❌ Validação falhou:', validation.errors);
          alert(`Erro de validação: ${validation.errors.join(', ')}`);
          return;
        }
        
        console.log('✅ Validação passou, processando ação...');
        console.log('🔍 Chamando onStatusChange diretamente:', action);
        onStatusChange(action);
      }
  } catch (error) {
    console.error('❌ Erro em handleAction:', error);
    
    // Log detalhado do erro
    if (error instanceof Error) {
      console.error('❌ Detalhes do erro:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    
    alert('Erro ao processar ação. Verifique o console para mais detalhes.');
  }
};

  const handleInstallConfirm = () => {
    console.log('🔍 handleInstallConfirm:', dataInstalacao, pendingAction);
    if (dataInstalacao && pendingAction) {
      // Validar antes de confirmar
      const validation = VendaStatusService.validateStatusTransition(
        venda, 
        pendingAction, 
        usuario?.funcao || '',
        { dataInstalacao }
      );
      
      console.log('🔍 Resultado da validação:', validation);
      
      if (!validation.valid) {
        console.error('❌ Validação falhou:', validation.errors);
        alert(`Erro de validação: ${validation.errors.join(', ')}`);
        return;
      }
      
      console.log('✅ Validação passou, confirmando ação...');
      console.log('🔍 Chamando onStatusChange com status:', pendingAction);
      console.log('🔍 ExtraData sendo passado:', { dataInstalacao });
      onStatusChange(pendingAction, { dataInstalacao });
      console.log('🔍 onStatusChange chamado com sucesso');
      setShowInstallDialog(false);
      setDataInstalacao("");
      setPendingAction(null);
    }
  };

  const handleLostConfirm = () => {
    console.log('🔍 handleLostConfirm:', motivoPerda);
    if (motivoPerda.trim()) {
      // Validar antes de confirmar
      const validation = VendaStatusService.validateStatusTransition(
        venda, 
        "perdida", 
        usuario?.funcao || '',
        { motivoPerda }
      );
      
      console.log('🔍 Resultado da validação:', validation);
      
      if (!validation.valid) {
        console.error('❌ Validação falhou:', validation.errors);
        alert(`Erro de validação: ${validation.errors.join(', ')}`);
        return;
      }
      
      console.log('✅ Validação passou, confirmando ação...');
      onStatusChange("perdida", { motivoPerda });
      setShowLostDialog(false);
      setMotivoPerda("");
    }
  };



  const actions = getNextActions();

  // Se não tem permissão ou não há ações, não renderiza nada
  if (!hasPermission || actions.length === 0) {
    console.log('🔍 StatusManager não renderizado:', { hasPermission, actionsLength: actions.length });
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => {
          const getIcon = () => {
            switch (action.icon) {
              case "play": return <Play className="h-4 w-4" />;
              case "check": return <Check className="h-4 w-4" />;
              case "file-check": return <FileCheck className="h-4 w-4" />;
              case "calendar": return <Calendar className="h-4 w-4" />;
              case "check-circle": return <CheckCircle className="h-4 w-4" />;
              case "x": return <X className="h-4 w-4" />;
              case "clock": return <Clock className="h-4 w-4" />;
              default: return null;
            }
          };

          return (
            <Button
              key={action.action}
              variant={action.variant}
              size="sm"
              onClick={() => handleAction(
                action.action, 
                action.needsReason, 
                action.needsInstallDate
              )}
              className="flex items-center gap-2"
              title={action.description}
            >
              {getIcon()}
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Install Date Dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar Instalação</DialogTitle>
            <DialogDescription>
              Defina a data da instalação para continuar o processo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dataInstalacao">Data da Instalação</Label>
              <Input
                id="dataInstalacao"
                type="date"
                value={dataInstalacao}
                onChange={(e) => setDataInstalacao(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInstallDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleInstallConfirm} disabled={!dataInstalacao}>
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lost Sale Dialog */}
      <Dialog open={showLostDialog} onOpenChange={setShowLostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Marcar Venda como Perdida
            </DialogTitle>
            <DialogDescription>
              Informe o motivo pelo qual esta venda foi perdida. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="motivoPerda">Motivo da Perda</Label>
              <Textarea
                id="motivoPerda"
                value={motivoPerda}
                onChange={(e) => setMotivoPerda(e.target.value)}
                placeholder="Descreva o motivo pelo qual esta venda foi perdida..."
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowLostDialog(false)}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLostConfirm} 
                disabled={!motivoPerda.trim()}
              >
                Confirmar Perda
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
};