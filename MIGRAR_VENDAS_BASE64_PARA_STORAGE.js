// Script para migrar vendas existentes de base64 para Firebase Storage
// Execute no console do navegador

async function migrarVendasBase64ParaStorage() {
  try {
    console.log('🔄 Iniciando migração de vendas de base64 para Storage...');
    
    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAFXCcg6zSv8Q6Q7NfEwp4fx-E6Y1zaics",
      authDomain: "crm-s-a-telecom.firebaseapp.com",
      databaseURL: "https://crm-s-a-telecom-default-rtdb.firebaseio.com",
      projectId: "crm-s-a-telecom",
      storageBucket: "crm-s-a-telecom.firebasestorage.app",
      messagingSenderId: "295341609951",
      appId: "1:295341609951:web:b970e1b4cc422d5dbfaa6a",
      measurementId: "G-RG1KV3DF87"
    };

    // Importar Firebase
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getDatabase, ref, get, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    const { getStorage, ref: storageRef, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
    const { getAuth, signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const storage = getStorage(app);
    const auth = getAuth(app);

    console.log('📝 Fazendo login...');
    
    // Fazer login com um usuário admin
    try {
      await signInWithEmailAndPassword(auth, 'admin@sa-telecom.com', 'admin123');
      console.log('✅ Login realizado com sucesso');
    } catch (loginError) {
      console.log('⚠️ Erro no login, tentando continuar:', loginError.message);
    }

    console.log('🔍 Buscando vendas existentes...');
    
    // Buscar todas as vendas
    const vendasRef = ref(database, 'vendas');
    const vendasSnapshot = await get(vendasRef);
    
    if (!vendasSnapshot.exists()) {
      console.log('❌ Nenhuma venda encontrada para migrar');
      return;
    }

    const vendas = vendasSnapshot.val();
    const vendasArray = Object.entries(vendas);
    
    console.log(`📋 Encontradas ${vendasArray.length} vendas para processar`);
    
    let vendasMigradas = 0;
    let vendasComDocumentos = 0;
    let documentosMigrados = 0;
    let erros = 0;

    // Processar cada venda
    for (const [vendaId, venda] of vendasArray) {
      try {
        console.log(`\n📄 Processando venda: ${vendaId}`);
        
        if (!venda.documentos) {
          console.log('  ⏭️ Venda sem documentos, pulando...');
          continue;
        }

        vendasComDocumentos++;
        const documentos = venda.documentos;
        let documentosMigradosNaVenda = 0;
        let vendaAtualizada = false;

        // Processar cada categoria de documentos
        for (const [categoria, docs] of Object.entries(documentos)) {
          if (docs && docs.length > 0) {
            console.log(`  📁 Processando categoria: ${categoria} (${docs.length} documentos)`);
            
            const docsProcessados = await Promise.all(
              docs.map(async (doc, index) => {
                try {
                  // Verificar se já é uma URL (já migrado)
                  if (doc.conteudo && !doc.conteudo.startsWith('data:')) {
                    console.log(`    ✅ Documento já migrado: ${doc.nome}`);
                    return doc;
                  }

                  // Verificar se tem conteúdo base64
                  if (!doc.conteudo || !doc.conteudo.startsWith('data:')) {
                    console.log(`    ⚠️ Documento sem conteúdo válido: ${doc.nome}`);
                    return doc;
                  }

                  // Criar nome único para o arquivo
                  const timestamp = Date.now();
                  const vendedorId = venda.vendedorId || 'sem_vendedor';
                  const extensao = doc.tipo.split('/')[1] || 'jpg';
                  const nomeArquivo = `${vendedorId}_${categoria}_${index}_${timestamp}.${extensao}`;
                  const caminhoArquivo = `vendas/${vendedorId}/${nomeArquivo}`;
                  
                  console.log(`    ⬆️ Migrando: ${doc.nome} -> ${nomeArquivo}`);
                  
                  // Upload para Firebase Storage
                  const storageRefDoc = storageRef(storage, caminhoArquivo);
                  
                  // Converter base64 para blob
                  const response = await fetch(doc.conteudo);
                  const blob = await response.blob();
                  
                  await uploadBytes(storageRefDoc, blob);
                  
                  // Obter URL de download
                  const downloadURL = await getDownloadURL(storageRefDoc);
                  
                  documentosMigrados++;
                  documentosMigradosNaVenda++;
                  
                  console.log(`    ✅ Migrado com sucesso: ${downloadURL}`);
                  
                  return {
                    ...doc,
                    conteudo: downloadURL // Substituir base64 pela URL
                  };
                  
                } catch (error) {
                  console.error(`    ❌ Erro ao migrar documento ${doc.nome}:`, error);
                  return doc; // Manter documento original em caso de erro
                }
              })
            );
            
            // Atualizar categoria de documentos
            documentos[categoria] = docsProcessados;
            vendaAtualizada = true;
          }
        }

        // Se a venda foi atualizada, salvar no banco
        if (vendaAtualizada) {
          await set(ref(database, `vendas/${vendaId}`), venda);
          vendasMigradas++;
          console.log(`  ✅ Venda ${vendaId} migrada com ${documentosMigradosNaVenda} documentos`);
        }

      } catch (error) {
        console.error(`❌ Erro ao processar venda ${vendaId}:`, error);
        erros++;
      }
    }

    console.log('\n🎉 Migração concluída!');
    console.log('📊 Resumo da migração:');
    console.log(`- Vendas processadas: ${vendasArray.length}`);
    console.log(`- Vendas com documentos: ${vendasComDocumentos}`);
    console.log(`- Vendas migradas: ${vendasMigradas}`);
    console.log(`- Documentos migrados: ${documentosMigrados}`);
    console.log(`- Erros: ${erros}`);
    
    if (vendasMigradas > 0) {
      console.log('\n✅ Migração bem-sucedida!');
      console.log('📝 Benefícios:');
      console.log('- Documentos agora estão no Firebase Storage');
      console.log('- URLs de download mais eficientes');
      console.log('- Menor uso de espaço no Realtime Database');
      console.log('- Melhor performance para visualização');
    } else {
      console.log('\n⚠️ Nenhuma venda foi migrada');
      console.log('📝 Possíveis motivos:');
      console.log('- Todas as vendas já estão migradas');
      console.log('- Nenhuma venda tem documentos base64');
      console.log('- Erros durante a migração');
    }

  } catch (error) {
    console.error('❌ Erro geral na migração:', error);
  }
}

// Executar migração
migrarVendasBase64ParaStorage(); 