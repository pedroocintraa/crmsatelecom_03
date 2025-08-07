import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DocumentosVenda, DocumentoAnexado } from '@/types/venda';
import { Download, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DocumentViewerProps {
  documentos: DocumentosVenda;
  trigger: React.ReactNode;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentos, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Flatten all documents into a single array
  const allDocuments: Array<{ categoria: string; documento: DocumentoAnexado }> = [];
  
  Object.entries(documentos).forEach(([categoria, docs]) => {
    if (docs && docs.length > 0) {
      docs.forEach(doc => {
        allDocuments.push({ categoria, documento: doc });
      });
    }
  });

  const currentDocument = allDocuments[currentDocumentIndex];

  const handlePrevious = () => {
    setCurrentDocumentIndex(prev => 
      prev === 0 ? allDocuments.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentDocumentIndex(prev => 
      prev === allDocuments.length - 1 ? 0 : prev + 1
    );
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
          const toastElement = document.createElement('div');
          toastElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #22c55e;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-size: 14px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border-left: 4px solid #16a34a;
          `;
          toastElement.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">✅ ${nomeArquivo}</div>
            <div style="font-size: 13px; line-height: 1.4;">
              <strong>Arquivo aberto em nova aba!</strong><br>
              <strong>Para baixar:</strong><br>
              • <strong>Mac:</strong> Cmd+S ou botão direito → "Salvar imagem como..."<br>
              • <strong>Windows:</strong> Ctrl+S ou botão direito → "Salvar imagem como..."
            </div>
          `;
          
          document.body.appendChild(toastElement);
          
          // Remover toast após 10 segundos
          setTimeout(() => {
            if (document.body.contains(toastElement)) {
              document.body.removeChild(toastElement);
            }
          }, 10000);
          
        } else {
          // Popup realmente bloqueado
          const toastElement = document.createElement('div');
          toastElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-size: 14px;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          `;
          toastElement.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">🚫 Popup Bloqueado</div>
            <div style="font-size: 13px;">
              Permita popups para este site e tente novamente.<br>
              Arquivo: ${nomeArquivo}
            </div>
          `;
          
          document.body.appendChild(toastElement);
          setTimeout(() => {
            if (document.body.contains(toastElement)) {
              document.body.removeChild(toastElement);
            }
          }, 8000);
        }
      }, 100); // Aguarda 100ms para verificar o status da aba
      
    } catch (error) {
      console.error('❌ Erro ao abrir nova aba:', error);
      
      // Fallback: copiar URL
      try {
        await navigator.clipboard.writeText(url);
        
        const toastElement = document.createElement('div');
        toastElement.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #6366f1;
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          z-index: 9999;
          font-size: 14px;
          max-width: 350px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        toastElement.innerHTML = `
          <div style="font-weight: bold; margin-bottom: 8px;">📋 URL Copiada</div>
          <div style="font-size: 13px;">
            Cole no navegador para acessar:<br>
            <strong>${nomeArquivo}</strong>
          </div>
        `;
        
        document.body.appendChild(toastElement);
        setTimeout(() => {
          if (document.body.contains(toastElement)) {
            document.body.removeChild(toastElement);
          }
        }, 6000);
        
      } catch (clipboardError) {
        console.error('❌ Falha ao copiar URL:', clipboardError);
      }
    }
  };

  const handleDownload = async (doc: DocumentoAnexado) => {
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
        const blob = new Blob([byteArray], { type: doc.tipo });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.nome || 'documento.jpg';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } 
      // Se é URL do Firebase Storage, usar download via fetch
      else if (doc.conteudo.includes('firebasestorage.googleapis.com')) {
        await baixarArquivoSimples(doc.conteudo, doc.nome || 'documento.jpg');
      }
    } catch (error) {
      console.error('❌ Erro no download:', error);
    }
  };

  const openViewer = () => {
    setCurrentDocumentIndex(0);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const getDocumentIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    return '📎';
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>

      {/* Lista de documentos */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" aria-describedby="documentos-description">
          <DialogHeader>
            <DialogTitle>Documentos Anexados</DialogTitle>
            <p id="documentos-description" className="text-sm text-muted-foreground">
              Visualize e baixe os documentos anexados a esta venda. Clique no ícone de olho para visualizar ou no ícone de download para baixar.
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            {Object.entries(documentos).map(([categoria, docs]) => {
              if (!docs || docs.length === 0) return null;
              
              return (
                <div key={categoria} className="space-y-2">
                  <h3 className="font-semibold text-lg capitalize">
                    {categoria.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {docs.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">
                            {getDocumentIcon(doc.tipo)}
                          </span>
                          <div className="flex gap-1">
                            {doc.tipo.startsWith('image/') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setCurrentDocumentIndex(allDocuments.findIndex(d => 
                                    d.categoria === categoria && d.documento.id === doc.id
                                  ));
                                  setIsViewerOpen(true);
                                  setIsOpen(false);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(doc)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium truncate">{doc.nome}</p>
                          <p className="text-muted-foreground text-xs">
                            {(doc.tamanho / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Visualizador de imagens */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="viewer-description">
          <DialogHeader className="sr-only">
            <DialogTitle>Visualizador de Documento</DialogTitle>
            <p id="viewer-description">Visualização detalhada do documento selecionado</p>
          </DialogHeader>
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={allDocuments.length <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentDocumentIndex + 1} de {allDocuments.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={allDocuments.length <= 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {currentDocument?.categoria.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeViewer}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Imagem */}
            <div className="flex items-center justify-center p-4">
              {currentDocument && currentDocument.documento.tipo.startsWith('image/') ? (
                <img
                  src={currentDocument.documento.conteudo}
                  alt={currentDocument.documento.nome}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Este tipo de arquivo não pode ser visualizado
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => handleDownload(currentDocument.documento)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar arquivo
                  </Button>
                </div>
              )}
            </div>

            {/* Footer com informações */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currentDocument?.documento.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {(currentDocument?.documento.tamanho / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(currentDocument.documento)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentViewer;