import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Check, FileCheck, Calendar, CheckCircle, X } from "lucide-react";
import { Venda } from "@/types/venda";
import { VendaStatusService } from "@/services/vendaStatusService";

interface VendaProgressProps {
  venda: Venda;
}

export const VendaProgress: React.FC<VendaProgressProps> = ({ venda }) => {
  const progress = VendaStatusService.getVendaProgress(venda);
  const statusConfigs = VendaStatusService.getAllStatusConfigs();
  const currentStatusConfig = VendaStatusService.getStatusConfig(venda.status);
  const lastChange = VendaStatusService.getLastStatusChange(venda);
  const timeSinceLastChange = VendaStatusService.getTimeSinceLastChange(venda);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente": return <Clock className="h-4 w-4" />;
      case "em_andamento": return <Play className="h-4 w-4" />;
      case "auditada": return <Check className="h-4 w-4" />;
      case "gerada": return <FileCheck className="h-4 w-4" />;
      case "aguardando_habilitacao": return <Calendar className="h-4 w-4" />;
      case "habilitada": return <CheckCircle className="h-4 w-4" />;
      case "perdida": return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const isStatusCompleted = (status: string) => {
    const statusOrder = ["pendente", "em_andamento", "auditada", "gerada", "aguardando_habilitacao", "habilitada"];
    const currentIndex = statusOrder.indexOf(venda.status);
    const statusIndex = statusOrder.indexOf(status);
    
    if (venda.status === "perdida") return false;
    return statusIndex <= currentIndex;
  };

  const isCurrentStatus = (status: string) => {
    return status === venda.status;
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Progresso da Venda</span>
          <Badge variant="outline" className="text-sm">
            {progress}% Concluído
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progresso Geral</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Status da Venda</h4>
          <div className="space-y-2">
            {statusConfigs
              .filter(config => config.status !== "perdida") // Excluir perdida do timeline
              .map((config, index) => {
                const completed = isStatusCompleted(config.status);
                const current = isCurrentStatus(config.status);
                
                return (
                  <div
                    key={config.status}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      current 
                        ? "bg-primary/10 border border-primary/20" 
                        : completed 
                        ? "bg-green-50 border border-green-200" 
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      current 
                        ? "bg-primary text-primary-foreground" 
                        : completed 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-300 text-gray-600"
                    }`}>
                      {getStatusIcon(config.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          current ? "text-primary" : completed ? "text-green-700" : "text-gray-600"
                        }`}>
                          {config.label}
                        </span>
                        {current && (
                          <Badge variant="secondary" className="text-xs">
                            Atual
                          </Badge>
                        )}
                        {completed && !current && (
                          <Badge variant="outline" className="text-xs text-green-600">
                            Concluído
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {config.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Current Status Info */}
        {currentStatusConfig && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(venda.status)}
              <span className="font-medium text-blue-800">
                Status Atual: {currentStatusConfig.label}
              </span>
            </div>
            <p className="text-sm text-blue-700 mb-2">
              {currentStatusConfig.description}
            </p>
            {lastChange && (
              <div className="text-xs text-blue-600">
                Última atualização: {timeSinceLastChange} por {lastChange.usuarioNome}
              </div>
            )}
          </div>
        )}

        {/* Lost Sale Info */}
        {venda.status === "perdida" && venda.motivoPerda && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <X className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-800">Venda Perdida</span>
            </div>
            <p className="text-sm text-red-700">
              <strong>Motivo:</strong> {venda.motivoPerda}
            </p>
            {lastChange && (
              <div className="text-xs text-red-600 mt-1">
                Marcada como perdida em {timeSinceLastChange} por {lastChange.usuarioNome}
              </div>
            )}
          </div>
        )}

        {/* Installation Info */}
        {venda.dataInstalacao && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Data de Instalação</span>
            </div>
            <p className="text-sm text-green-700">
              {new Date(venda.dataInstalacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 