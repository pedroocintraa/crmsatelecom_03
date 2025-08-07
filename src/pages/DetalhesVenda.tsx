import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Venda } from "@/types/venda";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DocumentViewer from "@/components/DocumentViewer/DocumentViewer";
import { StatusManager } from "@/components/StatusManager/StatusManager";
import { StatusSelector } from "@/components/StatusSelector/StatusSelector";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar, 
  Eye, 
  Download, 
  Edit3,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { maskCPF, maskPhone, unmaskCPF, unmaskPhone, formatarDataBrasil, formatarDataNascimento } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DetalhesVenda = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [venda, setVenda] = useState<Venda | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  

  
  // Estados para edição
  const [editandoCliente, setEditandoCliente] = useState(false);
  const [editandoEndereco, setEditandoEndereco] = useState(false);
  const [editandoDataInstalacao, setEditandoDataInstalacao] = useState(false);
  const [editandoVenda, setEditandoVenda] = useState(false);
  const [dadosEditados, setDadosEditados] = useState<any>(null);
  const [dataInstalacaoEditada, setDataInstalacaoEditada] = useState<string>('');
  const [planoEditado, setPlanoEditado] = useState<string>('');
  const [vencimentoEditado, setVencimentoEditado] = useState<number | undefined>(undefined);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/acompanhamento");
      return;
    }

    const carregarVenda = async () => {
      try {
        const { vendasService } = await import('@/services/vendasService');
        
        const vendaCompleta = await vendasService.obterVendaPorId(id);
        if (vendaCompleta) {
          setVenda(vendaCompleta);
        } else {
          toast({
            title: "Erro",
            description: "Venda não encontrada",
            variant: "destructive",
          });
          navigate("/acompanhamento");
        }
      } catch (error) {
        console.error("Erro ao carregar venda:", error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados da venda",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    carregarVenda();
  }, [id, navigate]);

  const getStatusLabel = (status: Venda["status"]) => {
    const labels = {
      pendente: "Pendente",
      em_atendimento: "Em Atendimento",
      auditada: "Auditada",
      gerada: "Gerada",
      aguardando_habilitacao: "Aguardando Habilitação",
      habilitada: "Habilitada",
      perdida: "Perdida"
    };
    return labels[status];
  };

  const getStatusVariant = (status: Venda["status"]) => {
    const variants = {
      pendente: "outline",
      em_atendimento: "default",
      auditada: "secondary",
      gerada: "default",
      aguardando_habilitacao: "default",
      habilitada: "default",
      perdida: "destructive"
    } as const;
    return variants[status];
  };

  const formatarData = (dataISO: string) => {
    console.log('🔍 formatarData chamado com:', dataISO);
    const resultado = formatarDataBrasil(dataISO);
    console.log('🔍 formatarData retornou:', resultado);
    return resultado;
  };

  // Funções para edição
  const iniciarEdicaoCliente = () => {
    setDadosEditados({
      nome: venda?.cliente.nome || '',
      cpf: maskCPF(venda?.cliente.cpf || ''),
      telefone: maskPhone(venda?.cliente.telefone || ''),
      email: venda?.cliente.email || '',
      dataNascimento: venda?.cliente.dataNascimento || ''
    });
    setEditandoCliente(true);
  };

  const iniciarEdicaoEndereco = () => {
    setDadosEditados({
      cep: venda?.cliente.endereco.cep || '',
      logradouro: venda?.cliente.endereco.logradouro || '',
      numero: venda?.cliente.endereco.numero || '',
      complemento: venda?.cliente.endereco.complemento || '',
      bairro: venda?.cliente.endereco.bairro || '',
      localidade: venda?.cliente.endereco.localidade || '',
      uf: venda?.cliente.endereco.uf || ''
    });
    setEditandoEndereco(true);
  };

  const cancelarEdicao = () => {
    setEditandoCliente(false);
    setEditandoEndereco(false);
    setEditandoDataInstalacao(false);
    setEditandoVenda(false);
    setDadosEditados(null);
    setDataInstalacaoEditada('');
    setPlanoEditado('');
    setVencimentoEditado(undefined);
  };

  const iniciarEdicaoDataInstalacao = () => {
    setEditandoDataInstalacao(true);
    setDataInstalacaoEditada(venda?.dataInstalacao || '');
  };

  const salvarDataInstalacao = async () => {
    if (!venda) return;
    
    setSalvando(true);
    try {
      const { vendasService } = await import('@/services/vendasService');
      const { converterDataParaBrasilISO } = await import('@/lib/utils');
      
      // Converter data para fuso horário de Brasília
      const dataInstalacaoISO = converterDataParaBrasilISO(dataInstalacaoEditada);
      
      await vendasService.atualizarVenda(venda.id, {
        dataInstalacao: dataInstalacaoISO
      });
      
      // Atualizar o estado local
      setVenda({
        ...venda,
        dataInstalacao: dataInstalacaoISO
      });
      
      setEditandoDataInstalacao(false);
      setDataInstalacaoEditada('');
      
      toast({
        title: "Sucesso",
        description: "Data de instalação atualizada com sucesso",
      });
    } catch (error) {
      console.error("Erro ao atualizar data de instalação:", error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar data de instalação",
        variant: "destructive",
      });
    } finally {
      setSalvando(false);
    }
  };

  const iniciarEdicaoVenda = () => {
    setPlanoEditado(venda?.planoNome || '');
    setVencimentoEditado(venda?.diaVencimento);
    setEditandoVenda(true);
  };

  const salvarVenda = async () => {
    if (!venda) return;

    setSalvando(true);
    try {
      const { vendasService } = await import('@/services/vendasService');
      
      // Preparar dados atualizados
      const dadosAtualizados: Partial<Venda> = {
        planoNome: planoEditado,
        diaVencimento: vencimentoEditado
      };

      // Atualizar venda no Firebase
      const vendaAtualizada = await vendasService.atualizarVenda(venda.id, dadosAtualizados);
      setVenda(vendaAtualizada);

      setEditandoVenda(false);
      setPlanoEditado('');
      setVencimentoEditado(undefined);

      toast({
        title: "Sucesso",
        description: "Informações da venda atualizadas com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar venda:", error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações da venda",
        variant: "destructive",
      });
    } finally {
      setSalvando(false);
    }
  };

  const salvarAlteracoes = async () => {
    if (!venda || !dadosEditados) return;

    setSalvando(true);
    try {
      const { vendasService } = await import('@/services/vendasService');
      
      // Preparar dados atualizados
      const dadosAtualizados: Partial<Venda> = {};
      
      // Atualizar dados do cliente
      if (editandoCliente) {
        dadosAtualizados.cliente = {
          ...venda.cliente,
          nome: dadosEditados.nome,
          cpf: dadosEditados.cpf.replace(/\D/g, ''),
          telefone: dadosEditados.telefone.replace(/\D/g, ''),
          email: dadosEditados.email,
          dataNascimento: dadosEditados.dataNascimento
        };
      }

      // Atualizar dados do endereço
      if (editandoEndereco) {
        dadosAtualizados.cliente = {
          ...venda.cliente,
          endereco: {
            ...venda.cliente.endereco,
            cep: dadosEditados.cep,
            logradouro: dadosEditados.logradouro,
            numero: dadosEditados.numero,
            complemento: dadosEditados.complemento,
            bairro: dadosEditados.bairro,
            localidade: dadosEditados.localidade,
            uf: dadosEditados.uf
          }
        };
      }

      // Atualizar venda no Firebase
      const vendaAtualizada = await vendasService.atualizarVenda(venda.id, dadosAtualizados);
      setVenda(vendaAtualizada);

      cancelarEdicao();
      toast({
        title: "Sucesso",
        description: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setSalvando(false);
    }
  };

  // Função para atualizar status da venda
  const handleStatusChange = async (
    novoStatus: Venda["status"],
    extraData?: { dataInstalacao?: string; motivoPerda?: string }
  ) => {
    console.log('🔍 ====== INÍCIO DO handleStatusChange ======');
    console.log('🔍 handleStatusChange chamado:', { novoStatus, extraData, vendaId: venda?.id });
    console.log('🔍 Tipo do extraData:', typeof extraData);
    console.log('🔍 ExtraData completo:', JSON.stringify(extraData, null, 2));
    
    if (!venda) {
      console.log('❌ Venda não encontrada');
      return;
    }
    
    try {
      console.log('🔍 Chamando atualizarStatusVenda...');
      const { vendasService } = await import('@/services/vendasService');
      
      // Preparar dados para atualização
      let dadosAtualizacao: any = {};
      
      // Lógica de reset dos campos de instalação
      const statusQueResetaInstalacao = ['pendente', 'em_atendimento', 'perdida'];
      const statusQueMantemInstalacao = ['auditada', 'gerada', 'aguardando_habilitacao', 'habilitada'];
      
      if (statusQueResetaInstalacao.includes(novoStatus)) {
        console.log('🔍 Resetando campos de instalação para status:', novoStatus);
        dadosAtualizacao.dataInstalacao = null;
        dadosAtualizacao.dataInstalacaoReal = null;
      } else if (statusQueMantemInstalacao.includes(novoStatus)) {
        console.log('🔍 Mantendo campos de instalação para status:', novoStatus);
        // Não resetar os campos
      }
      
      // Incluir extraData nos dados de atualização
      if (extraData?.dataInstalacao) {
        console.log('🔍 Incluindo dataInstalacao nos dados de atualização:', extraData.dataInstalacao);
        dadosAtualizacao.dataInstalacao = extraData.dataInstalacao;
      }
      
      // Atualizar status no Firebase
      const vendaAtualizada = await vendasService.atualizarStatusVenda(
        venda.id,
        novoStatus,
        extraData?.motivoPerda,
        dadosAtualizacao // Passar dados adicionais incluindo dataInstalacao
      );
      
      console.log('🔍 Venda atualizada com sucesso:', vendaAtualizada);
      console.log('🔍 dataInstalacao na venda atualizada:', vendaAtualizada.dataInstalacao);
      console.log('🔍 Tipo da dataInstalacao:', typeof vendaAtualizada.dataInstalacao);
      setVenda(vendaAtualizada);
      
      toast({
        title: "Status atualizado",
        description: `Venda marcada como ${getStatusLabel(novoStatus).toLowerCase()}.`,
      });
      
      console.log('🔍 handleStatusChange concluído com sucesso');
      
      // Se o status for "habilitada", redirecionar para a página de acompanhamento após um breve delay
      if (novoStatus === "habilitada") {
        console.log('🔍 Status habilitada detectado, redirecionando...');
        setTimeout(() => {
          navigate('/acompanhamento');
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Erro ao atualizar status:", error);
      
      // Log detalhado do erro
      if (error instanceof Error) {
        console.error("❌ Detalhes do erro:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
      
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da venda.",
        variant: "destructive",
      });
    }
  };

  /**
   * Função simplificada que sempre abre em nova aba
   */
  const baixarArquivoSimples = async (url: string, nomeArquivo: string) => {
    console.log(`📄 Abrindo em nova aba: ${nomeArquivo}`);
    
    try {
      // Abrir diretamente em nova aba
      const newWindow = window.open(url, '_blank');
      
      // Aguardar um pouco para verificar se a aba realmente abriu
      setTimeout(() => {
        if (newWindow && !newWindow.closed) {
          // Sucesso - nova aba aberta
          toast({
            title: "✅ Arquivo aberto em nova aba",
            description: "Para baixar: Cmd+S (Mac) ou Ctrl+S (Windows), ou botão direito → 'Salvar imagem como...'",
            duration: 8000,
          });
        } else {
          // Popup realmente bloqueado
          toast({
            title: "🚫 Popup bloqueado",
            description: `Permita popups para este site e tente baixar ${nomeArquivo} novamente`,
            variant: "destructive",
            duration: 6000,
          });
        }
      }, 100); // Aguarda 100ms para verificar o status da aba
      
    } catch (error) {
      console.error('❌ Erro ao abrir nova aba:', error);
      
      // Fallback: copiar URL
      try {
        await navigator.clipboard.writeText(url);
        
        toast({
          title: "📋 URL copiada para clipboard",
          description: `Cole no navegador para acessar: ${nomeArquivo}`,
          duration: 6000,
        });
        
      } catch (clipboardError) {
        console.error('❌ Falha ao copiar URL:', clipboardError);
        
        toast({
          title: "❌ Erro no download",
          description: `Não foi possível baixar ${nomeArquivo}`,
          variant: "destructive",
        });
      }
    }
  };



  const baixarDocumentoIndividual = async (doc: any, categoria: string) => {
    try {
      console.log(`📄 Iniciando download: ${doc.nome}`);

      // Se é base64, converter para blob e baixar
      if (doc.conteudo.includes('data:') && doc.conteudo.includes(',')) {
        const base64Data = doc.conteudo.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: doc.tipo || 'image/jpeg' });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.nome || `${categoria}_documento.jpg`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "✅ Download concluído",
          description: `${doc.nome} foi baixado`,
        });
      } 
      // Se é URL do Firebase Storage, usar download via fetch
      else if (doc.conteudo.includes('firebasestorage.googleapis.com')) {
        await baixarArquivoSimples(doc.conteudo, doc.nome || `${categoria}_documento.jpg`);
      }
    } catch (error) {
      console.error(`❌ Erro no download: ${doc.nome}`, error);
      toast({
        title: "❌ Erro no download",
        description: `Não foi possível baixar ${doc.nome}`,
        variant: "destructive",
      });
    }
  };

  const exportarDadosVenda = () => {
    if (!venda) return;

    const dadosExport = {
      id: venda.id,
      cliente: venda.cliente,
      status: venda.status,
      dataVenda: venda.dataVenda,
      observacoes: venda.observacoes,
      totalDocumentos: venda.documentos ? Object.values(venda.documentos).flat().length : 0
    };

    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `venda_${venda.cliente.nome.replace(/\s+/g, '_')}_${id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sucesso",
      description: "Dados da venda exportados!",
    });
  };

  const contarDocumentos = () => {
    if (!venda?.documentos) return 0;
    return Object.values(venda.documentos).reduce((total, docs) => {
      return total + (docs?.length || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/acompanhamento")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        <div className="text-center">Carregando dados da venda...</div>
      </div>
    );
  }

  if (!venda) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/acompanhamento")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
        <div className="text-center">Venda não encontrada</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/acompanhamento")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Detalhes da Venda</h1>
            <p className="text-muted-foreground">
              Venda #{venda.id} - {getStatusLabel(venda.status)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">

          <Button variant="outline" onClick={exportarDadosVenda}>
            <FileText className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </div>
      </div>

      {/* Status e Info Básica */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Informações do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados do Cliente
                </div>
                {!editandoCliente ? (
                  <Button variant="outline" size="sm" onClick={iniciarEdicaoCliente}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelarEdicao} disabled={salvando}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={salvarAlteracoes} disabled={salvando}>
                      <Save className="h-4 w-4 mr-2" />
                      {salvando ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!editandoCliente ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                      <p className="font-medium">{venda.cliente.nome}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">CPF</label>
                      <p className="font-medium">{maskCPF(venda.cliente.cpf)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
                      <p className="font-medium">{formatarDataNascimento(venda.cliente.dataNascimento)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="font-medium">{venda.cliente.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      Telefone
                    </label>
                    <p className="font-medium">{maskPhone(venda.cliente.telefone)}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={dadosEditados?.nome || ''}
                        onChange={(e) => setDadosEditados({...dadosEditados, nome: e.target.value})}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={dadosEditados?.cpf || ''}
                        onChange={(e) => setDadosEditados({...dadosEditados, cpf: maskCPF(e.target.value)})}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={dadosEditados?.dataNascimento || ''}
                        onChange={(e) => setDadosEditados({...dadosEditados, dataNascimento: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={dadosEditados?.email || ''}
                        onChange={(e) => setDadosEditados({...dadosEditados, email: e.target.value})}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={dadosEditados?.telefone || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, telefone: maskPhone(e.target.value)})}
                      placeholder="(00) 0 0000-0000"
                      maxLength={15}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço
                </div>
                {!editandoEndereco ? (
                  <Button variant="outline" size="sm" onClick={iniciarEdicaoEndereco}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelarEdicao} disabled={salvando}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={salvarAlteracoes} disabled={salvando}>
                      <Save className="h-4 w-4 mr-2" />
                      {salvando ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!editandoEndereco ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">CEP</label>
                    <p className="font-medium">{venda.cliente.endereco.cep}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Logradouro</label>
                    <p className="font-medium">{venda.cliente.endereco.logradouro}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Número</label>
                    <p className="font-medium">{venda.cliente.endereco.numero}</p>
                  </div>
                  {venda.cliente.endereco.complemento && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Complemento</label>
                      <p className="font-medium">{venda.cliente.endereco.complemento}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                    <p className="font-medium">{venda.cliente.endereco.bairro}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cidade</label>
                    <p className="font-medium">{venda.cliente.endereco.localidade}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">UF</label>
                    <p className="font-medium">{venda.cliente.endereco.uf}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                      id="cep"
                      value={dadosEditados?.cep || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, cep: e.target.value})}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                  </div>
                  <div>
                    <Label htmlFor="logradouro">Logradouro</Label>
                    <Input
                      id="logradouro"
                      value={dadosEditados?.logradouro || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, logradouro: e.target.value})}
                      placeholder="Rua, Avenida, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="numero">Número</Label>
                    <Input
                      id="numero"
                      value={dadosEditados?.numero || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, numero: e.target.value})}
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      value={dadosEditados?.complemento || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, complemento: e.target.value})}
                      placeholder="Apto, Casa, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={dadosEditados?.bairro || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, bairro: e.target.value})}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="localidade">Cidade</Label>
                    <Input
                      id="localidade"
                      value={dadosEditados?.localidade || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, localidade: e.target.value})}
                      placeholder="Nome da cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="uf">UF</Label>
                    <Input
                      id="uf"
                      value={dadosEditados?.uf || ''}
                      onChange={(e) => setDadosEditados({...dadosEditados, uf: e.target.value})}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações da Venda */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Informações da Venda</CardTitle>
              {!editandoVenda ? (
                <Button variant="outline" size="sm" onClick={iniciarEdicaoVenda}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={salvarVenda} disabled={salvando}>
                    <Save className="h-4 w-4 mr-1" />
                    Salvar
                  </Button>
                  <Button variant="outline" size="sm" onClick={cancelarEdicao} disabled={salvando}>
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plano">Plano</Label>
                  {!editandoVenda ? (
                    <p className="font-medium">{venda.planoNome || 'Não informado'}</p>
                  ) : (
                    <Input
                      id="plano"
                      value={planoEditado}
                      onChange={(e) => setPlanoEditado(e.target.value)}
                      placeholder="Nome do plano"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="vencimento">Dia de Vencimento</Label>
                  {!editandoVenda ? (
                    <p className="font-medium">{venda.diaVencimento}</p>
                  ) : (
                    <Select 
                      value={vencimentoEditado?.toString() || ''} 
                      onValueChange={(value) => setVencimentoEditado(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 28}, (_, i) => i + 1).map(dia => (
                          <SelectItem key={dia} value={dia.toString()}>
                            {dia}º dia
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data da Venda</label>
                  <p className="font-medium">{formatarData(venda.dataVenda)}</p>
                </div>
                {/* Data de Instalação Agendada */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Instalação agendada para:</label>
                      {!editandoDataInstalacao ? (
                        <p className="font-medium">
                          {(() => {
                            console.log('🔍 Renderizando campo dataInstalacao:', venda.dataInstalacao);
                            return venda.dataInstalacao ? formatarData(venda.dataInstalacao) : 'Não agendada';
                          })()}
                        </p>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="date"
                            value={dataInstalacaoEditada}
                            onChange={(e) => setDataInstalacaoEditada(e.target.value)}
                            className="w-auto"
                          />
                          <Button 
                            size="sm" 
                            onClick={salvarDataInstalacao} 
                            disabled={salvando}
                          >
                            <Save className="h-4 w-4 mr-1" />
                            {salvando ? 'Salvando...' : 'Salvar'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setEditandoDataInstalacao(false);
                              setDataInstalacaoEditada('');
                            }}
                            disabled={salvando}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  {!editandoDataInstalacao && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={iniciarEdicaoDataInstalacao}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      {venda.dataInstalacao ? 'Editar' : 'Agendar'}
                    </Button>
                  )}
                </div>
                {venda.dataInstalacaoReal && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Instalada em:</label>
                    <p className="font-medium flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {formatarData(venda.dataInstalacaoReal)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          {venda.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Observações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{venda.observacoes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status da Venda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(venda.status)}>
                  {getStatusLabel(venda.status)}
                </Badge>
              </div>
              
              {/* Status Selector para Admin e Supervisor */}
              {usuario?.funcao && ['ADMINISTRADOR_GERAL', 'SUPERVISOR'].includes(usuario.funcao) && (
                <div className="space-y-2">
                  <StatusSelector
                    venda={venda}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              )}

              {/* Ações do Backoffice */}
              <div className="space-y-2">
                <h4 className="font-medium">Ações do Backoffice</h4>
                <StatusManager
                  venda={venda}
                  onStatusChange={handleStatusChange}
                  showLostOption={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos Anexados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <div className="text-2xl font-bold">{contarDocumentos()}</div>
                <div className="text-sm text-muted-foreground">documentos anexados</div>
              </div>
              
              <div className="space-y-2">
                {venda.documentos && (
                  <DocumentViewer 
                    documentos={venda.documentos}
                    trigger={
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar Documentos
                      </Button>
                    }
                  />
                )}
                
                <div className="text-sm text-muted-foreground text-center py-2">
                  Use o botão "Visualizar Documentos" para ver todos os arquivos.
                  <br />
                  Para baixar, clique no ícone de download de cada documento.
                </div>
              </div>



              {(!venda.documentos || Object.keys(venda.documentos).length === 0) && (
                <div className="text-center text-muted-foreground py-4">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum documento anexado</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetalhesVenda;