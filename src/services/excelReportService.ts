import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Venda } from '@/types/venda';
import { Usuario } from '@/types/usuario';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface RelatorioVendasOptions {
  dataInicio?: Date;
  dataFim?: Date;
  vendedorId?: string;
  status?: string;
  equipeId?: string;
}

export class ExcelReportService {
  /**
   * Gera e faz download de relatório de vendas em Excel
   */
  static async gerarRelatorioVendas(
    vendas: Venda[],
    usuarios: Usuario[] = [],
    opcoes: RelatorioVendasOptions = {},
    planos: any[] = []
  ): Promise<void> {
    try {
      console.log('📊 Gerando relatório Excel de vendas...');
      console.log('📊 Dados recebidos:', { 
        vendas: vendas.length, 
        usuarios: usuarios.length, 
        planos: planos.length 
      });
      
      // Filtrar vendas se necessário
      let vendasFiltradas = [...vendas];
      
      if (opcoes.dataInicio || opcoes.dataFim) {
        vendasFiltradas = vendasFiltradas.filter(venda => {
          const dataVenda = new Date(venda.dataVenda);
          if (opcoes.dataInicio && dataVenda < opcoes.dataInicio) return false;
          if (opcoes.dataFim && dataVenda > opcoes.dataFim) return false;
          return true;
        });
      }
      
      if (opcoes.vendedorId) {
        vendasFiltradas = vendasFiltradas.filter(v => v.vendedorId === opcoes.vendedorId);
      }
      
      if (opcoes.status) {
        vendasFiltradas = vendasFiltradas.filter(v => v.status === opcoes.status);
      }
      
      if (opcoes.equipeId) {
        vendasFiltradas = vendasFiltradas.filter(v => v.equipeId === opcoes.equipeId);
      }

      // Criar mapa de usuários e planos para busca rápida
      const usuariosMap = new Map(usuarios.map(u => [u.id, u]));
      const planosMap = new Map(planos.map(p => [p.id, p]));

      // Preparar dados para o Excel
      const dadosExcel = vendasFiltradas.map((venda, index) => {
        try {
          console.log(`📊 Processando venda ${index + 1}/${vendasFiltradas.length}:`, venda.id);
          
          const vendedor = usuariosMap.get(venda.vendedorId);
          const plano = planosMap.get(venda.planoId);
          
          // Validar data
          let dataVenda: Date;
          try {
            dataVenda = new Date(venda.dataVenda);
            if (isNaN(dataVenda.getTime())) {
              console.warn(`⚠️ Data inválida para venda ${venda.id}:`, venda.dataVenda);
              dataVenda = new Date(); // Usar data atual como fallback
            }
          } catch (e) {
            console.warn(`⚠️ Erro ao processar data da venda ${venda.id}:`, e);
            dataVenda = new Date();
          }
          
          let dataInstalacao: Date | null = null;
          if (venda.dataInstalacao) {
            try {
              dataInstalacao = new Date(venda.dataInstalacao);
              if (isNaN(dataInstalacao.getTime())) {
                dataInstalacao = null;
              }
            } catch (e) {
              dataInstalacao = null;
            }
          }

          return {
            'ID da Venda': venda.id || 'N/A',
            'Data da Venda': format(dataVenda, 'dd/MM/yyyy', { locale: ptBR }),
            'Hora da Venda': format(dataVenda, 'HH:mm', { locale: ptBR }),
          'Vendedor': vendedor ? `${vendedor.nome} ${vendedor.sobrenome || ''}`.trim() : 'N/A',
          'Email do Vendedor': vendedor?.email || 'N/A',
            'Cliente': venda.cliente?.nome || 'N/A',
            'CPF': venda.cliente?.cpf || 'N/A',
            'Telefone': venda.cliente?.telefone || 'N/A',
            'Email do Cliente': venda.cliente?.email || 'N/A',
            'Endereço': venda.cliente?.endereco ? 
              `${venda.cliente.endereco.rua || ''}, ${venda.cliente.endereco.numero || ''} - ${venda.cliente.endereco.bairro || ''}, ${venda.cliente.endereco.cidade || venda.cliente.endereco.localidade || ''}/${venda.cliente.endereco.estado || venda.cliente.endereco.uf || ''}` 
              : 'N/A',
            'CEP': venda.cliente?.endereco?.cep || 'N/A',
          'Plano': venda.planoNome || plano?.nome || 'N/A',
          'Valor do Plano': plano?.valor ? `R$ ${plano.valor.toFixed(2)}` : 'N/A',
          'Status': venda.status,
          'Data de Instalação': dataInstalacao ? format(dataInstalacao, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A',
          'Observações': venda.observacoes || 'N/A',
          'Equipe': venda.equipeId || 'N/A',
            'Forma de Pagamento': venda.formaPagamento || 'N/A',
            'Desconto': venda.desconto ? `R$ ${venda.desconto.toFixed(2)}` : 'R$ 0,00',
            'Valor Final': venda.valorFinal ? `R$ ${venda.valorFinal.toFixed(2)}` : 'N/A'
          };
        } catch (error) {
          console.error(`❌ Erro ao processar venda ${venda.id}:`, error);
          // Retornar dados básicos em caso de erro
          return {
            'ID da Venda': venda.id || 'ERRO',
            'Data da Venda': 'ERRO',
            'Hora da Venda': 'ERRO',
            'Vendedor': 'ERRO',
            'Email do Vendedor': 'ERRO',
            'Cliente': venda.cliente?.nome || 'ERRO',
            'CPF': venda.cliente?.cpf || 'ERRO',
            'Telefone': 'ERRO',
            'Email do Cliente': 'ERRO',
            'Endereço': 'ERRO',
            'CEP': 'ERRO',
            'Plano': 'ERRO',
            'Valor do Plano': 'ERRO',
            'Status': venda.status || 'ERRO',
            'Data de Instalação': 'ERRO',
            'Observações': 'ERRO - ' + (error as Error).message,
            'Equipe': 'ERRO',
            'Forma de Pagamento': 'ERRO',
            'Desconto': 'ERRO',
            'Valor Final': 'ERRO'
          };
        }
      });

      console.log('📊 Dados processados:', dadosExcel.length, 'registros');
      
      // Criar planilha
      console.log('📊 Criando planilha Excel...');
      const worksheet = XLSX.utils.json_to_sheet(dadosExcel);
      
      // Configurar largura das colunas
      const columnWidths = [
        { wch: 15 }, // ID da Venda
        { wch: 12 }, // Data da Venda
        { wch: 8 },  // Hora da Venda
        { wch: 20 }, // Vendedor
        { wch: 25 }, // Email do Vendedor
        { wch: 25 }, // Cliente
        { wch: 15 }, // CPF
        { wch: 15 }, // Telefone
        { wch: 25 }, // Email do Cliente
        { wch: 40 }, // Endereço
        { wch: 10 }, // CEP
        { wch: 20 }, // Plano
        { wch: 12 }, // Valor do Plano
        { wch: 15 }, // Status
        { wch: 15 }, // Data de Instalação
        { wch: 30 }, // Observações
        { wch: 15 }, // Equipe
        { wch: 15 }, // Forma de Pagamento
        { wch: 10 }, // Desconto
        { wch: 12 }  // Valor Final
      ];
      
      worksheet['!cols'] = columnWidths;

      // Criar workbook
      console.log('📊 Criando workbook...');
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');

      // Adicionar planilha de resumo
      console.log('📊 Gerando resumo...');
      try {
        const resumo = this.gerarResumoVendas(vendasFiltradas, usuarios, planosMap);
        const worksheetResumo = XLSX.utils.json_to_sheet(resumo);
        XLSX.utils.book_append_sheet(workbook, worksheetResumo, 'Resumo');
        console.log('📊 Resumo adicionado com sucesso');
      } catch (resumoError) {
        console.warn('⚠️ Erro ao gerar resumo, continuando sem resumo:', resumoError);
      }

      // Gerar arquivo Excel
      console.log('📊 Gerando buffer Excel...');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Criar nome do arquivo com data atual
      const dataAtual = format(new Date(), 'yyyy-MM-dd_HH-mm');
      const nomeArquivo = `relatorio-vendas_${dataAtual}.xlsx`;

      // Fazer download
      console.log('📊 Criando blob e iniciando download...');
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      saveAs(blob, nomeArquivo);
      
      console.log(`✅ Relatório Excel gerado: ${nomeArquivo}`);
      console.log(`📊 Total de vendas: ${vendasFiltradas.length}`);
      
    } catch (error) {
      console.error('❌ Erro ao gerar relatório Excel:', error);
      throw new Error('Erro ao gerar relatório Excel. Tente novamente.');
    }
  }

  /**
   * Gera dados de resumo para a segunda planilha
   */
  private static gerarResumoVendas(vendas: Venda[], usuarios: Usuario[], planosMap?: Map<string, any>): any[] {
    const usuariosMap = new Map(usuarios.map(u => [u.id, u]));
    
    // Resumo por vendedor
    const resumoPorVendedor = new Map<string, {
      nome: string;
      totalVendas: number;
      valorTotal: number;
      vendas: Venda[];
    }>();

    // Resumo por status
    const resumoPorStatus = new Map<string, number>();

    // Resumo por mês
    const resumoPorMes = new Map<string, number>();

    vendas.forEach(venda => {
      // Por vendedor
      const vendedor = usuariosMap.get(venda.vendedorId);
      const nomeVendedor = vendedor ? `${vendedor.nome} ${vendedor.sobrenome || ''}`.trim() : 'N/A';
      
      if (!resumoPorVendedor.has(venda.vendedorId)) {
        resumoPorVendedor.set(venda.vendedorId, {
          nome: nomeVendedor,
          totalVendas: 0,
          valorTotal: 0,
          vendas: []
        });
      }
      
      const resumoVendedor = resumoPorVendedor.get(venda.vendedorId)!;
      resumoVendedor.totalVendas++;
      const planoVenda = planosMap?.get(venda.planoId);
      resumoVendedor.valorTotal += venda.valorFinal || planoVenda?.valor || 0;
      resumoVendedor.vendas.push(venda);

      // Por status
      const count = resumoPorStatus.get(venda.status) || 0;
      resumoPorStatus.set(venda.status, count + 1);

      // Por mês
      const mesAno = format(new Date(venda.dataVenda), 'MM/yyyy');
      const countMes = resumoPorMes.get(mesAno) || 0;
      resumoPorMes.set(mesAno, countMes + 1);
    });

    const resumoFinal = [
      { 'Tipo': 'RESUMO GERAL', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      { 'Tipo': 'Total de Vendas', 'Descrição': '', 'Quantidade': vendas.length, 'Valor': '' },
      { 'Tipo': 'Valor Total', 'Descrição': '', 'Quantidade': '', 'Valor': `R$ ${vendas.reduce((acc, v) => {
        const planoVenda = planosMap?.get(v.planoId);
        return acc + (v.valorFinal || planoVenda?.valor || 0);
      }, 0).toFixed(2)}` },
      { 'Tipo': '', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      
      { 'Tipo': 'RESUMO POR VENDEDOR', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      ...Array.from(resumoPorVendedor.entries()).map(([id, dados]) => ({
        'Tipo': 'Vendedor',
        'Descrição': dados.nome,
        'Quantidade': dados.totalVendas,
        'Valor': `R$ ${dados.valorTotal.toFixed(2)}`
      })),
      { 'Tipo': '', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      
      { 'Tipo': 'RESUMO POR STATUS', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      ...Array.from(resumoPorStatus.entries()).map(([status, count]) => ({
        'Tipo': 'Status',
        'Descrição': status,
        'Quantidade': count,
        'Valor': ''
      })),
      { 'Tipo': '', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      
      { 'Tipo': 'RESUMO POR MÊS', 'Descrição': '', 'Quantidade': '', 'Valor': '' },
      ...Array.from(resumoPorMes.entries()).map(([mes, count]) => ({
        'Tipo': 'Mês',
        'Descrição': mes,
        'Quantidade': count,
        'Valor': ''
      }))
    ];

    return resumoFinal;
  }

  /**
   * Gera relatório simplificado apenas com dados essenciais
   */
  static async gerarRelatorioSimples(vendas: Venda[], usuarios: Usuario[] = [], planos: any[] = []): Promise<void> {
    const usuariosMap = new Map(usuarios.map(u => [u.id, u]));
    const planosMap = new Map(planos.map(p => [p.id, p]));

    const dadosSimples = vendas.map(venda => {
      const vendedor = usuariosMap.get(venda.vendedorId);
      const plano = planosMap.get(venda.planoId);
      
      return {
        'Data': format(new Date(venda.dataVenda), 'dd/MM/yyyy'),
        'Vendedor': vendedor ? `${vendedor.nome} ${vendedor.sobrenome || ''}`.trim() : 'N/A',
        'Cliente': venda.cliente.nome,
        'CPF': venda.cliente.cpf,
        'Telefone': venda.cliente.telefone || 'N/A',
        'Plano': venda.planoNome || plano?.nome || 'N/A',
        'Valor': plano?.valor ? `R$ ${plano.valor.toFixed(2)}` : (venda.valorFinal ? `R$ ${venda.valorFinal.toFixed(2)}` : 'N/A'),
        'Status': venda.status
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dadosSimples);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataAtual = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const nomeArquivo = `vendas-simples_${dataAtual}.xlsx`;

    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    saveAs(blob, nomeArquivo);
    
    console.log(`✅ Relatório simples gerado: ${nomeArquivo}`);
  }
}
