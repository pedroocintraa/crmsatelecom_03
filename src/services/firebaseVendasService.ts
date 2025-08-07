import { ref, get, set, update, remove, query, orderByChild, equalTo } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { Venda, VendaFormData, DocumentosVenda } from '@/types/venda';

export class FirebaseVendasService {
  
  async criarIndicesRetroativos(): Promise<void> {
    try {
      console.log('🔧 Criando índices retroativos para vendas existentes...');
      
      const vendasRef = ref(realtimeDb, 'vendas');
      const snapshot = await get(vendasRef);
      
      if (!snapshot.exists()) {
        console.log('📭 Nenhuma venda encontrada');
        return;
      }
      
      const vendasData = snapshot.val();
      const vendas = Object.values(vendasData) as Venda[];
      
      const updates: any = {};
      let countIndices = 0;
      
      for (const venda of vendas) {
        if (venda.cliente?.cpf) {
          const cpfNormalizado = this.normalizarCpf(venda.cliente.cpf);
          if (cpfNormalizado && cpfNormalizado.length === 11) {
            updates[`indices/cpf/${cpfNormalizado}`] = venda.id;
            countIndices++;
          }
        }
      }
      
      if (countIndices > 0) {
        await update(ref(realtimeDb), updates);
        console.log(`✅ ${countIndices} índices de CPF criados retroativamente`);
      } else {
        console.log('📋 Nenhum índice retroativo necessário');
      }
      
    } catch (error) {
      console.error('❌ Erro ao criar índices retroativos:', error);
    }
  }
  async obterVendas(): Promise<Venda[]> {
    try {
      const vendasRef = ref(realtimeDb, 'vendas');
      const snapshot = await get(vendasRef);
      
      if (snapshot.exists()) {
        const vendasData = snapshot.val();
        return Object.values(vendasData);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter vendas:', error);
      return [];
    }
  }

  async obterVendasPorVendedor(vendedorId: string): Promise<Venda[]> {
    try {
      const vendasRef = ref(realtimeDb, 'vendas');
      const vendasQuery = query(vendasRef, orderByChild('vendedorId'), equalTo(vendedorId));
      const snapshot = await get(vendasQuery);
      
      if (snapshot.exists()) {
        const vendasData = snapshot.val();
        return Object.values(vendasData);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter vendas por vendedor:', error);
      return [];
    }
  }

  async obterVendasPorEquipe(equipeId: string): Promise<Venda[]> {
    try {
      const vendasRef = ref(realtimeDb, 'vendas');
      const vendasQuery = query(vendasRef, orderByChild('equipeId'), equalTo(equipeId));
      const snapshot = await get(vendasQuery);
      
      if (snapshot.exists()) {
        const vendasData = snapshot.val();
        return Object.values(vendasData);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter vendas por equipe:', error);
      return [];
    }
  }

  async obterVendaPorId(id: string): Promise<Venda | null> {
    try {
      const vendaRef = ref(realtimeDb, `vendas/${id}`);
      const snapshot = await get(vendaRef);
      
      if (snapshot.exists()) {
        return snapshot.val();
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao obter venda por ID:', error);
      return null;
    }
  }

  private normalizarCpf(cpf: string): string {
    // Remove todos os caracteres não numéricos
    return cpf.replace(/\D/g, '');
  }

  async verificarCpfDuplicado(cpf: string): Promise<boolean> {
    try {
      console.log(`🔍 Verificando CPF duplicado: ${cpf}`);
      
      // Normalizar CPF (remover formatação)
      const cpfNormalizado = this.normalizarCpf(cpf);
      console.log(`🔍 CPF normalizado: ${cpfNormalizado}`);
      
      if (!cpfNormalizado || cpfNormalizado.length !== 11) {
        console.log('❌ CPF inválido para verificação');
        return false;
      }

      // Primeiro: verificar no índice de CPF (mais rápido)
      const indiceRef = ref(realtimeDb, `indices/cpf/${cpfNormalizado}`);
      const indiceSnapshot = await get(indiceRef);
      
      if (indiceSnapshot.exists()) {
        const vendaId = indiceSnapshot.val();
        console.log(`🎯 CPF encontrado no índice! Venda ID: ${vendaId}`);
        return true;
      }

      // Segundo: verificar nas vendas diretamente (fallback para vendas antigas)
      const vendasRef = ref(realtimeDb, 'vendas');
      const snapshot = await get(vendasRef);
      
      if (snapshot.exists()) {
        const vendasData = snapshot.val();
        const vendas = Object.values(vendasData) as Venda[];
        
        console.log(`📊 Total de vendas para verificar: ${vendas.length}`);
        
        // Verificar se existe alguma venda com o mesmo CPF (normalizado)
        const vendaExistente = vendas.find((v: Venda) => {
          const cpfVendaExistente = this.normalizarCpf(v.cliente?.cpf || '');
          const match = cpfVendaExistente === cpfNormalizado;
          
          if (match) {
            console.log(`🎯 Match encontrado! Venda: ${v.id}, CPF existente: ${v.cliente?.cpf}, CPF verificado: ${cpf}`);
          }
          
          return match;
        });
        
        if (vendaExistente) {
          console.log(`⚠️ CPF ${cpf} já possui venda cadastrada:`, vendaExistente.id);
          console.log(`📝 Dados da venda existente:`, {
            id: vendaExistente.id,
            cliente: vendaExistente.cliente?.nome,
            cpf: vendaExistente.cliente?.cpf,
            vendedor: vendaExistente.vendedorNome,
            status: vendaExistente.status,
            dataVenda: vendaExistente.dataVenda
          });
          
          // Criar índice para essa venda existente
          try {
            await set(ref(realtimeDb, `indices/cpf/${cpfNormalizado}`), vendaExistente.id);
            console.log(`🔗 Índice de CPF criado retroativamente para venda ${vendaExistente.id}`);
          } catch (indexError) {
            console.warn('⚠️ Erro ao criar índice retroativo:', indexError);
          }
          
          return true;
        }
      }
      
      console.log(`✅ CPF ${cpf} não encontrado nas vendas existentes`);
      return false;
    } catch (error) {
      console.error('❌ Erro ao verificar CPF duplicado:', error);
      // Em caso de erro, NÃO permitir cadastro por segurança
      throw new Error('Erro ao verificar duplicação de CPF. Tente novamente.');
    }
  }

  async criarVenda(venda: VendaFormData, vendedorId: string, vendedorNome: string, equipeId?: string, equipeNome?: string): Promise<Venda> {
    try {
      // Verificar se já existe uma venda com o mesmo CPF
      const cpfJaExiste = await this.verificarCpfDuplicado(venda.cliente.cpf);
      if (cpfJaExiste) {
        throw new Error(`Já existe uma venda cadastrada para o CPF ${venda.cliente.cpf}`);
      }

      // Processar documentos se existirem
      let documentosProcessados = undefined;
      if (venda.documentos) {
        try {
          documentosProcessados = await this.processarDocumentos(venda.documentos, vendedorId);
        } catch (docError) {
          console.warn('⚠️ Erro ao processar documentos, continuando sem documentos:', docError);
          documentosProcessados = undefined;
        }
      }

      // Limpar dados undefined para evitar erro no Firebase
      const vendaLimpa = Object.fromEntries(
        Object.entries(venda).filter(([_, value]) => value !== undefined)
      ) as VendaFormData;

      // Verificação final antes de salvar (evitar condição de corrida)
      console.log('🔒 Verificação final de CPF antes de salvar...');
      const cpfJaExisteFinal = await this.verificarCpfDuplicado(venda.cliente.cpf);
      if (cpfJaExisteFinal) {
        throw new Error(`Já existe uma venda cadastrada para o CPF ${venda.cliente.cpf} (verificação final)`);
      }

      const vendaId = Date.now().toString();
      const cpfNormalizado = this.normalizarCpf(venda.cliente.cpf);

      const novaVenda: Venda = {
        ...vendaLimpa,
        id: vendaId,
        dataVenda: new Date().toISOString(),
        status: "pendente",
        vendedorId: vendedorId,
        vendedorNome: vendedorNome,
        equipeId: equipeId || null,
        equipeNome: equipeNome || null,
        documentos: documentosProcessados
      };

      // Salvar venda e índice de CPF atomicamente
      const updates: any = {};
      updates[`vendas/${vendaId}`] = novaVenda;
      updates[`indices/cpf/${cpfNormalizado}`] = vendaId; // Índice para prevenir duplicatas

      // Usar update para operação atômica
      await update(ref(realtimeDb), updates);
      
      console.log('✅ Venda criada com sucesso:', novaVenda.id);
      console.log('🔗 Índice de CPF criado:', cpfNormalizado);
      return novaVenda;
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      throw new Error('Erro ao criar venda');
    }
  }

  private async processarDocumentos(documentos: DocumentosVenda, vendedorId: string): Promise<DocumentosVenda> {
    try {
      const { ref: storageRef, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const { storage } = await import('@/lib/firebase');
      
      const documentosProcessados: DocumentosVenda = {};
      const timestamp = Date.now(); // Usar um timestamp único para todos os documentos

      // Processar todos os documentos em paralelo para melhor performance
      const todasAsCategorias = Object.entries(documentos);
      const uploadsPromises = todasAsCategorias.flatMap(([categoria, docs]) => {
        if (!docs || docs.length === 0) return [];
        
        return docs.map(async (doc, index) => {
          try {
            // Validar se o documento tem conteúdo
            if (!doc.conteudo || !doc.tipo) {
              console.warn(`Documento ${categoria} sem conteúdo ou tipo válido`);
              return { categoria, doc: null };
            }

            // Criar nome único para o arquivo
            const extensao = doc.tipo.split('/')[1] || 'jpg';
            const nomeArquivo = `${vendedorId}_${categoria}_${index}_${timestamp}.${extensao}`;
            const caminhoArquivo = `vendas/${vendedorId}/${nomeArquivo}`;
            
            // Upload para Firebase Storage
            const storageRefDoc = storageRef(storage, caminhoArquivo);
            
            // Converter base64 para blob
            let blob: Blob;
            if (doc.conteudo.startsWith('data:')) {
              // É base64
              const response = await fetch(doc.conteudo);
              blob = await response.blob();
            } else {
              // Já é uma URL, não precisa fazer upload
              return {
                categoria,
                doc: {
                  ...doc,
                  id: `${timestamp}_${index}`,
                  nome: nomeArquivo,
                  dataUpload: new Date().toISOString()
                }
              };
            }
            
            // Upload para Firebase Storage
            await uploadBytes(storageRefDoc, blob);
            
            // Obter URL de download
            const downloadURL = await getDownloadURL(storageRefDoc);
            
            console.log(`📄 Documento ${categoria} enviado para Storage: ${nomeArquivo}`);
            
            return {
              categoria,
              doc: {
                ...doc,
                id: `${timestamp}_${index}`,
                nome: nomeArquivo,
                dataUpload: new Date().toISOString(),
                conteudo: downloadURL // Substituir base64 pela URL
              }
            };
          } catch (error) {
            console.error(`Erro ao processar documento ${categoria}:`, error);
            return { categoria, doc: null };
          }
        });
      });

      // Aguardar todos os uploads em paralelo
      const resultados = await Promise.all(uploadsPromises);
      
      // Organizar resultados por categoria
      resultados.forEach(({ categoria, doc }) => {
        if (doc) {
          if (!documentosProcessados[categoria as keyof DocumentosVenda]) {
            documentosProcessados[categoria as keyof DocumentosVenda] = [];
          }
          documentosProcessados[categoria as keyof DocumentosVenda].push(doc);
        }
      });

      return documentosProcessados;
    } catch (error) {
      console.error('Erro ao processar documentos:', error);
      return {}; // Retornar objeto vazio em caso de erro
    }
  }

  async atualizarVenda(id: string, dados: Partial<Venda>): Promise<Venda> {
    try {
      const dadosAtualizados = {
        ...dados,
        updated_at: new Date().toISOString()
      };

      const vendaRef = ref(realtimeDb, `vendas/${id}`);
      await update(vendaRef, dadosAtualizados);
      
      const vendaAtualizada = await this.obterVendaPorId(id);
      if (!vendaAtualizada) {
        throw new Error('Venda não encontrada');
      }
      
      console.log('✅ Venda atualizada com sucesso:', vendaAtualizada.id);
      return vendaAtualizada;
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
      throw new Error('Erro ao atualizar venda');
    }
  }

  async atualizarStatusVenda(id: string, status: Venda['status'], motivoPerda?: string, dadosAdicionais?: any): Promise<Venda> {
    try {
      console.log('🔍 atualizarStatusVenda chamado:', { id, status, motivoPerda, dadosAdicionais });
      
      // Obter venda atual para processar dados extras
      const vendaAtual = await this.obterVendaPorId(id);
      if (!vendaAtual) {
        throw new Error('Venda não encontrada');
      }

      const dadosAtualizados: Partial<Venda> = {
        status: status
      };

      // Processar dados extras baseado no novo status
      const { VendaStatusService } = await import('./vendaStatusService');
      
      // Combinar motivoPerda com dadosAdicionais para formar extraData completo
      let extraData: any = {};
      if (motivoPerda) {
        extraData.motivoPerda = motivoPerda;
      }
      if (dadosAdicionais?.dataInstalacao) {
        extraData.dataInstalacao = dadosAdicionais.dataInstalacao;
      }
      
      console.log('🔍 ExtraData para processamento:', extraData);
      
      const dadosExtras = await VendaStatusService.processExtraDataOnStatusChange(vendaAtual, status, extraData);
      console.log('🔍 Dados extras processados:', dadosExtras);
      
      // Mesclar dados extras com dados atualizados
      Object.assign(dadosAtualizados, dadosExtras);

      // Mesclar dados adicionais (como reset de campos)
      if (dadosAdicionais) {
        console.log('🔍 Aplicando dados adicionais:', dadosAdicionais);
        Object.assign(dadosAtualizados, dadosAdicionais);
      }

      console.log('🔍 Dados finais para atualização:', dadosAtualizados);

      if (status === 'gerada') {
        dadosAtualizados.dataGeracao = new Date().toISOString();
      }

      const vendaAtualizada = await this.atualizarVenda(id, dadosAtualizados);
      console.log('🔍 Venda atualizada:', vendaAtualizada);
      return vendaAtualizada;
    } catch (error) {
      console.error('Erro ao atualizar status da venda:', error);
      throw new Error('Erro ao atualizar status da venda');
    }
  }

  async excluirVenda(id: string): Promise<void> {
    try {
      await remove(ref(realtimeDb, `vendas/${id}`));
      console.log('✅ Venda excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir venda:', error);
      throw new Error('Erro ao excluir venda');
    }
  }

  async obterVendasPorStatus(status: Venda['status']): Promise<Venda[]> {
    try {
      const vendasRef = ref(realtimeDb, 'vendas');
      const vendasQuery = query(vendasRef, orderByChild('status'), equalTo(status));
      const snapshot = await get(vendasQuery);
      
      if (snapshot.exists()) {
        const vendasData = snapshot.val();
        return Object.values(vendasData);
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao obter vendas por status:', error);
      return [];
    }
  }

  async obterVendasPorPeriodo(dataInicio: string, dataFim: string): Promise<Venda[]> {
    try {
      const vendas = await this.obterVendas();
      return vendas.filter(venda => {
        const dataVenda = new Date(venda.dataVenda);
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        return dataVenda >= inicio && dataVenda <= fim;
      });
    } catch (error) {
      console.error('Erro ao obter vendas por período:', error);
      return [];
    }
  }

  async obterEstatisticasVendas(vendedorId?: string, equipeId?: string): Promise<{
    total: number;
    pendentes: number;
    emAndamento: number;
    auditadas: number;
    geradas: number;
    habilitadas: number;
    perdidas: number;
  }> {
    try {
      let vendas: Venda[];
      
      if (vendedorId) {
        vendas = await this.obterVendasPorVendedor(vendedorId);
      } else if (equipeId) {
        vendas = await this.obterVendasPorEquipe(equipeId);
      } else {
        vendas = await this.obterVendas();
      }

      const estatisticas = {
        total: vendas.length,
        pendentes: vendas.filter(v => v.status === 'pendente').length,
        emAndamento: vendas.filter(v => v.status === 'em_atendimento').length,
        auditadas: vendas.filter(v => v.status === 'auditada').length,
        geradas: vendas.filter(v => v.status === 'gerada').length,
        habilitadas: vendas.filter(v => v.status === 'habilitada').length,
        perdidas: vendas.filter(v => v.status === 'perdida').length,
      };

      return estatisticas;
    } catch (error) {
      console.error('Erro ao obter estatísticas de vendas:', error);
      return {
        total: 0,
        pendentes: 0,
        emAndamento: 0,
        auditadas: 0,
        geradas: 0,
        habilitadas: 0,
        perdidas: 0,
      };
    }
  }

  async validarVendaUnica(clienteCpf: string, dataVenda: string): Promise<{ unica: boolean; vendaExistente?: Venda }> {
    try {
      const vendas = await this.obterVendas();
      const vendaExistente = vendas.find(v => 
        v.cliente.cpf === clienteCpf && 
        v.dataVenda === dataVenda
      );
      
      return { 
        unica: !vendaExistente, 
        vendaExistente: vendaExistente || undefined 
      };
    } catch (error) {
      console.error('Erro ao validar venda única:', error);
      return { unica: true };
    }
  }

  async obterVendaParaExclusao(id: string): Promise<Venda | null> {
    return this.obterVendaPorId(id);
  }

  async excluirVendaPermanentemente(id: string): Promise<boolean> {
    try {
      await remove(ref(realtimeDb, `vendas/${id}`));
      return true;
    } catch (error) {
      console.error('Erro ao excluir venda permanentemente:', error);
      return false;
    }
  }

  async sincronizarVendas(): Promise<{ removidas: number; erros: string[] }> {
    try {
      const vendas = await this.obterVendas();
      const erros: string[] = [];
      let removidas = 0;

      for (const venda of vendas) {
        try {
          // Verificar se a venda ainda existe
          const vendaAtual = await this.obterVendaPorId(venda.id);
          if (!vendaAtual) {
            await this.excluirVendaPermanentemente(venda.id);
            removidas++;
          }
        } catch (error) {
          erros.push(`Erro ao sincronizar venda ${venda.id}: ${error}`);
        }
      }

      return { removidas, erros };
    } catch (error) {
      console.error('Erro ao sincronizar vendas:', error);
      return { removidas: 0, erros: ['Erro geral na sincronização'] };
    }
  }
}

export const firebaseVendasService = new FirebaseVendasService();
export default firebaseVendasService; 