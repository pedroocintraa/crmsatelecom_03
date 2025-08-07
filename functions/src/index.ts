import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Storage } from '@google-cloud/storage';
import * as JSZip from 'jszip';

// Inicializar Firebase Admin
admin.initializeApp();

// Inicializar Google Cloud Storage
const storage = new Storage();

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

/**
 * Cloud Function para gerar ZIP de documentos de uma venda
 * 
 * Como usar:
 * POST https://your-region-your-project.cloudfunctions.net/gerarZipDocumentos
 * 
 * Body:
 * {
 *   "vendaId": "123456789",
 *   "clienteNome": "João Silva", 
 *   "documentos": [
 *     {
 *       "nome": "documento_frente.jpg",
 *       "path": "vendas/userId/documento_frente.jpg", 
 *       "categoria": "documentoClienteFrente"
 *     }
 *   ]
 * }
 */
export const gerarZipDocumentos = functions
  .region('us-central1') // ou sua região preferida
  .runWith({
    timeoutSeconds: 300, // 5 minutos
    memory: '1GB'
  })
  .https.onRequest(async (req, res) => {
    try {
      // Configurar CORS
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
      }

      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método não permitido' });
        return;
      }

      const { vendaId, clienteNome, documentos }: GerarZipRequest = req.body;

      if (!vendaId || !documentos || documentos.length === 0) {
        res.status(400).json({ error: 'vendaId e documentos são obrigatórios' });
        return;
      }

      console.log(`🔍 Gerando ZIP para venda ${vendaId} com ${documentos.length} documentos`);

      // Criar ZIP
      const zip = new JSZip();
      const bucket = storage.bucket(); // usa o bucket padrão do projeto

      let documentosProcessados = 0;

      // Processar cada documento
      for (const doc of documentos) {
        try {
          console.log(`📄 Baixando: ${doc.path}`);
          
          // Baixar arquivo do Firebase Storage
          const file = bucket.file(doc.path);
          const [exists] = await file.exists();
          
          if (!exists) {
            console.warn(`⚠️ Arquivo não encontrado: ${doc.path}`);
            continue;
          }

          const [buffer] = await file.download();
          
          // Adicionar ao ZIP organizando por categoria
          const pasta = zip.folder(doc.categoria);
          pasta?.file(doc.nome, buffer);
          
          documentosProcessados++;
          console.log(`✅ Adicionado ao ZIP: ${doc.nome} (${documentosProcessados}/${documentos.length})`);
          
        } catch (error) {
          console.error(`❌ Erro ao processar ${doc.nome}:`, error);
        }
      }

      if (documentosProcessados === 0) {
        res.status(404).json({ error: 'Nenhum documento válido encontrado' });
        return;
      }

      console.log(`📦 Gerando ZIP final com ${documentosProcessados} documentos...`);

      // Gerar o ZIP
      const zipBuffer = await zip.generateAsync({ 
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6
        }
      });

      // Nome do arquivo ZIP
      const nomeCliente = clienteNome.replace(/[^a-zA-Z0-9]/g, '_');
      const nomeArquivo = `documentos_venda_${nomeCliente}_${vendaId}.zip`;

      console.log(`✅ ZIP gerado: ${zipBuffer.length} bytes`);

      // Configurar headers para download
      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${nomeArquivo}"`,
        'Content-Length': zipBuffer.length.toString()
      });

      // Enviar o ZIP
      res.status(200).send(zipBuffer);

      console.log(`🎉 ZIP enviado com sucesso: ${nomeArquivo}`);

    } catch (error) {
      console.error('❌ Erro na Cloud Function:', error);
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  });

/**
 * Cloud Function simples para testar se está funcionando
 */
export const testeZip = functions.https.onRequest((req, res) => {
  res.json({ 
    message: 'Cloud Function está funcionando!',
    timestamp: new Date().toISOString() 
  });
});