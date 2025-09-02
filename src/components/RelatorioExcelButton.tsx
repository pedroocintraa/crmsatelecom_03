import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Download, FileSpreadsheet, Filter, Loader2 } from 'lucide-react';
import { ExcelReportService, RelatorioVendasOptions } from '@/services/excelReportService';
import { Venda } from '@/types/venda';
import { Usuario } from '@/types/usuario';
import { Plano } from '@/types/configuracao';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface RelatorioExcelButtonProps {
  vendas: Venda[];
  usuarios?: Usuario[];
  planos?: Plano[];
  className?: string;
}

export default function RelatorioExcelButton({ 
  vendas, 
  usuarios = [], 
  planos = [],
  className = '' 
}: RelatorioExcelButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtros, setFiltros] = useState<RelatorioVendasOptions>({});

  const handleDownloadSimples = async () => {
    setIsGenerating(true);
    try {
      await ExcelReportService.gerarRelatorioSimples(vendas, usuarios, planos);
      toast.success('Relatório simples baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório simples:', error);
      toast.error('Erro ao gerar relatório. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCompleto = async () => {
    setIsGenerating(true);
    try {
      await ExcelReportService.gerarRelatorioVendas(vendas, usuarios, {}, planos);
      toast.success('Relatório completo baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório completo:', error);
      toast.error('Erro ao gerar relatório. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadComFiltros = async () => {
    setIsGenerating(true);
    try {
      await ExcelReportService.gerarRelatorioVendas(vendas, usuarios, filtros, planos);
      toast.success('Relatório filtrado baixado com sucesso!');
      setShowFilters(false);
    } catch (error) {
      console.error('Erro ao gerar relatório filtrado:', error);
      toast.error('Erro ao gerar relatório. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const vendedoresUnicos = Array.from(
    new Set(vendas.map(v => v.vendedorId))
  ).map(id => {
    const usuario = usuarios.find(u => u.id === id);
    return {
      id,
      nome: usuario ? `${usuario.nome} ${usuario.sobrenome || ''}`.trim() : 'N/A'
    };
  });

  const statusUnicos = Array.from(new Set(vendas.map(v => v.status)));
  const equipesUnicas = Array.from(new Set(vendas.map(v => v.equipeId).filter(Boolean)));

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className={className}
            disabled={isGenerating || vendas.length === 0}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar Excel
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Relatórios de Vendas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleDownloadSimples}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Relatório Simples
            <span className="ml-auto text-xs text-muted-foreground">
              {vendas.length} vendas
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleDownloadCompleto}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Relatório Completo
            <span className="ml-auto text-xs text-muted-foreground">
              + Resumo
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowFilters(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Com Filtros
            <span className="ml-auto text-xs text-muted-foreground">
              Personalizar
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de Filtros */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filtros do Relatório</DialogTitle>
            <DialogDescription>
              Personalize quais dados incluir no relatório Excel
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Filtro por Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={filtros.dataInicio ? format(filtros.dataInicio, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFiltros(prev => ({
                    ...prev,
                    dataInicio: e.target.value ? new Date(e.target.value) : undefined
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data Fim</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={filtros.dataFim ? format(filtros.dataFim, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setFiltros(prev => ({
                    ...prev,
                    dataFim: e.target.value ? new Date(e.target.value) : undefined
                  }))}
                />
              </div>
            </div>

            {/* Filtro por Vendedor */}
            <div className="space-y-2">
              <Label>Vendedor</Label>
              <Select
                value={filtros.vendedorId || ''}
                onValueChange={(value) => setFiltros(prev => ({
                  ...prev,
                  vendedorId: value || undefined
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os vendedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os vendedores</SelectItem>
                  {vendedoresUnicos.map(vendedor => (
                    <SelectItem key={vendedor.id} value={vendedor.id}>
                      {vendedor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={filtros.status || ''}
                onValueChange={(value) => setFiltros(prev => ({
                  ...prev,
                  status: value || undefined
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  {statusUnicos.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Equipe */}
            {equipesUnicas.length > 0 && (
              <div className="space-y-2">
                <Label>Equipe</Label>
                <Select
                  value={filtros.equipeId || ''}
                  onValueChange={(value) => setFiltros(prev => ({
                    ...prev,
                    equipeId: value || undefined
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as equipes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as equipes</SelectItem>
                    {equipesUnicas.map(equipe => (
                      <SelectItem key={equipe} value={equipe}>
                        {equipe}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDownloadComFiltros}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Relatório
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
