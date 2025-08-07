// Script para testar o cadastro de vendas com imagens
// Execute no console do navegador

async function testarCadastroVendaImagens() {
  try {
    console.log('🧪 Testando cadastro de venda com imagens...');
    
    // Simular dados de uma venda com imagens
    const dadosVenda = {
      cliente: {
        nome: "MARIA SANTOS SILVA",
        telefone: "62985886875",
        email: "maria.santos@email.com",
        cpf: "98765432100",
        dataNascimento: "1990-05-20",
        endereco: {
          cep: "74000000",
          logradouro: "AVENIDA PRINCIPAL",
          numero: "456",
          complemento: "CASA",
          bairro: "JARDIM AMÉRICA",
          localidade: "GOIÂNIA",
          uf: "GO"
        }
      },
      observacoes: "Cliente interessado no plano profissional. Documentos anexados.",
      planoId: "plano_profissional",
      diaVencimento: 20,
      documentos: {
        documentoClienteFrente: [
          {
            id: "doc_frente_1",
            nome: "documento_frente.jpg",
            tipo: "image/jpeg",
            tamanho: 1024000,
            dataUpload: new Date().toISOString(),
            conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          }
        ],
        documentoClienteVerso: [
          {
            id: "doc_verso_1",
            nome: "documento_verso.jpg",
            tipo: "image/jpeg",
            tamanho: 1024000,
            dataUpload: new Date().toISOString(),
            conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          }
        ],
        comprovanteEndereco: [
          {
            id: "comprovante_1",
            nome: "comprovante_endereco.jpg",
            tipo: "image/jpeg",
            tamanho: 1024000,
            dataUpload: new Date().toISOString(),
            conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          }
        ],
        fachadaCasa: [
          {
            id: "fachada_1",
            nome: "fachada_casa.jpg",
            tipo: "image/jpeg",
            tamanho: 1024000,
            dataUpload: new Date().toISOString(),
            conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          }
        ],
        selfieCliente: [
          {
            id: "selfie_1",
            nome: "selfie_cliente.jpg",
            tipo: "image/jpeg",
            tamanho: 1024000,
            dataUpload: new Date().toISOString(),
            conteudo: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          }
        ]
      }
    };

    console.log('📋 Dados da venda preparados:');
    console.log('- Cliente:', dadosVenda.cliente.nome);
    console.log('- CPF:', dadosVenda.cliente.cpf);
    console.log('- Endereço:', dadosVenda.cliente.endereco.logradouro);
    console.log('- Documentos anexados:', Object.keys(dadosVenda.documentos).length, 'categorias');

    // Verificar se o serviço de vendas está disponível
    if (typeof window !== 'undefined' && window.vendasService) {
      console.log('✅ Serviço de vendas disponível');
      
      // Simular criação da venda
      console.log('🔄 Simulando criação da venda...');
      
      // Aqui você pode testar a criação real se necessário
      console.log('📝 Para testar a criação real, use o formulário da página');
      
    } else {
      console.log('⚠️ Serviço de vendas não disponível no console');
      console.log('📝 Use o formulário da página para testar');
    }

    console.log('\n🎯 Para testar o cadastro completo:');
    console.log('1. Acesse a página "Nova Venda"');
    console.log('2. Preencha os dados do cliente');
    console.log('3. Anexe documentos usando as câmeras/upload');
    console.log('4. Clique em "Cadastrar Venda"');
    console.log('5. Verifique se as imagens foram salvas no Firebase Storage');

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

// Executar teste
testarCadastroVendaImagens(); 