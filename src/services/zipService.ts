import { DocumentosVenda } from '@/types/venda';

interface DocumentoZip {
  nome: string;
  path: string;
  categoria: string;
}

interface GerarZipRequest {
  vendaId: string;
  clienteNome: string;
  documentos: DocumentoZip[];
}

export class ZipService {
  private static readonly CLOUD_FUNCTION_URL = 'https://us-central1-crm-s-a-telecom.cloudfunctions.net/gerarZipDocumentos';

  /**
   * Baixa todos os documentos de uma venda como ZIP via Cloud Function
   */
  static async baixarZipDocumentos(
    vendaId: string,
    clienteNome: string,
    documentos: DocumentosVenda
  ): Promise<void> {
    try {
      console.log('🔍 Preparando download ZIP via Cloud Function...');

      // Converter documentos para formato da Cloud Function
      const documentosZip: DocumentoZip[] = [];

      console.log('🔍 Debug - Documentos recebidos:', documentos);

      Object.entries(documentos).forEach(([categoria, docs]) => {
        console.log(`📁 Categoria: ${categoria}`, docs);
        
        if (docs && Array.isArray(docs) && docs.length > 0) {
          docs.forEach((doc, index) => {
            console.log(`📄 Documento ${index}:`, {
              nome: doc.nome,
              conteudo: doc.conteudo?.substring(0, 100) + '...',
              tipo: doc.tipo
            });

            if (doc.conteudo) {
              // Verificar se é Firebase Storage URL
              if (doc.conteudo.includes('firebasestorage.googleapis.com')) {
                console.log('✅ É Firebase Storage URL');
                
                try {
                  // Extrair o caminho do arquivo da URL do Firebase Storage
                  const url = new URL(doc.conteudo);
                  console.log('🔍 URL completa:', doc.conteudo);
                  console.log('🔍 Pathname:', url.pathname);
                  
                  // Regex mais flexível para extrair o caminho
                  // Formato: /v0/b/bucket/o/CAMINHO?alt=media&token=...
                  const pathMatch = url.pathname.match(/\/v0\/b\/[^\/]+\/o\/(.+)$/);
                  
                  if (pathMatch) {
                    const filePath = decodeURIComponent(pathMatch[1]);
                    console.log(`✅ Caminho extraído: ${filePath}`);
                    
                    documentosZip.push({
                      nome: doc.nome,
                      path: filePath,
                      categoria: categoria
                    });
                  } else {
                    console.warn('⚠️ Não foi possível extrair caminho da URL. Pathname:', url.pathname);
                    
                    // Tentar método alternativo - usar searchParams se disponível
                    const segments = url.pathname.split('/');
                    const oIndex = segments.indexOf('o');
                    if (oIndex !== -1 && segments[oIndex + 1]) {
                      const filePath = decodeURIComponent(segments[oIndex + 1]);
                      console.log(`🔄 Tentativa alternativa - Caminho: ${filePath}`);
                      
                      documentosZip.push({
                        nome: doc.nome,
                        path: filePath,
                        categoria: categoria
                      });
                    }
                  }
                } catch (error) {
                  console.error('❌ Erro ao processar URL:', error);
                }
              }
              // Verificar se é base64
              else if (doc.conteudo.includes('data:') && doc.conteudo.includes(',')) {
                console.log('⚠️ Documento é base64, pulando para ZIP (só Firebase Storage)');
              }
              // Outro formato
              else {
                console.log('❓ Formato desconhecido:', doc.conteudo.substring(0, 50));
              }
            } else {
              console.warn('⚠️ Documento sem conteúdo');
            }
          });
        }
      });

      console.log(`📦 Total de documentos para ZIP: ${documentosZip.length}`, documentosZip);

      if (documentosZip.length === 0) {
        throw new Error('Nenhum documento válido encontrado para ZIP');
      }

      const requestData: GerarZipRequest = {
        vendaId,
        clienteNome,
        documentos: documentosZip
      };

      console.log(`📦 Solicitando ZIP de ${documentosZip.length} documentos...`);

      try {
        // Tentar Cloud Function primeiro
        const response = await fetch(this.CLOUD_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`Cloud Function falhou: ${response.status}`);
        }

        // Baixar o arquivo ZIP
        const zipBlob = await response.blob();
        
        if (zipBlob.size === 0) {
          throw new Error('Arquivo ZIP vazio recebido');
        }

        // Criar link de download
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `documentos_venda_${clienteNome.replace(/[^a-zA-Z0-9]/g, '_')}_${vendaId}.zip`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);

        console.log('✅ Download do ZIP via Cloud Function concluído com sucesso');

      } catch (cloudFunctionError) {
        console.warn('⚠️ Cloud Function não disponível, usando fallback local:', cloudFunctionError);
        
        // Fallback: gerar ZIP localmente
        await this.gerarZipLocal(documentosZip, clienteNome, vendaId);
      }

    } catch (error) {
      console.error('❌ Erro no download ZIP:', error);
      throw error;
    }
  }

  /**
   * Gera ZIP localmente como fallback (quando Cloud Function não está disponível)
   */
  private static async gerarZipLocal(
    documentosZip: DocumentoZip[],
    clienteNome: string,
    vendaId: string
  ): Promise<void> {
    console.log('🔧 Iniciando geração de ZIP local...');

    // Importar JSZip dinamicamente
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    let processados = 0;

    for (const docInfo of documentosZip) {
      try {
        console.log(`📄 Baixando localmente: ${docInfo.nome}`);

        // Baixar arquivo do Firebase Storage via fetch
        const response = await fetch(`https://firebasestorage.googleapis.com/v0/b/crm-s-a-telecom.firebasestorage.app/o/${encodeURIComponent(docInfo.path)}?alt=media`);
        
        if (!response.ok) {
          console.warn(`⚠️ Falha ao baixar ${docInfo.nome}: ${response.status}`);
          continue;
        }

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Adicionar ao ZIP organizando por categoria
        const pasta = zip.folder(docInfo.categoria);
        pasta?.file(docInfo.nome, arrayBuffer);

        processados++;
        console.log(`✅ Adicionado localmente: ${docInfo.nome} (${processados}/${documentosZip.length})`);

      } catch (error) {
        console.error(`❌ Erro ao processar localmente ${docInfo.nome}:`, error);
      }
    }

    if (processados === 0) {
      throw new Error('Não foi possível processar nenhum documento localmente');
    }

    console.log(`📦 Gerando ZIP local com ${processados} documentos...`);

    // Gerar o ZIP
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    });

    // Fazer download do ZIP
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentos_venda_${clienteNome.replace(/[^a-zA-Z0-9]/g, '_')}_${vendaId}.zip`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);

    console.log('✅ ZIP local gerado com sucesso');
  }

  /**
   * Testa se a Cloud Function está respondendo
   */
  static async testarCloudFunction(): Promise<boolean> {
    try {
      const testeUrl = this.CLOUD_FUNCTION_URL.replace('gerarZipDocumentos', 'testeZip');
      const response = await fetch(testeUrl);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Cloud Function está funcionando:', data);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Cloud Function não está respondendo:', error);
      return false;
    }
  }
}