// Script para testar upload para Firebase Storage
// Execute no console do navegador

async function testarUploadStorage() {
  try {
    console.log('🧪 Testando upload para Firebase Storage...');
    
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
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
    const { getAuth, signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
    
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const auth = getAuth(app);

    console.log('📝 Fazendo login para testar upload...');
    
    // Fazer login com um usuário admin
    try {
      await signInWithEmailAndPassword(auth, 'admin@sa-telecom.com', 'admin123');
      console.log('✅ Login realizado com sucesso');
    } catch (loginError) {
      console.log('⚠️ Erro no login, tentando continuar:', loginError.message);
    }

    console.log('📄 Criando documento de teste...');
    
    // Criar um documento de teste (imagem base64 mínima)
    const testImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    
    // Converter base64 para blob
    const response = await fetch(testImageBase64);
    const blob = await response.blob();
    
    console.log('📦 Blob criado:', {
      size: blob.size,
      type: blob.type
    });

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const vendedorId = 'teste_upload';
    const nomeArquivo = `${vendedorId}_documento_teste_${timestamp}.jpg`;
    const caminhoArquivo = `vendas/${vendedorId}/${nomeArquivo}`;
    
    console.log('📁 Caminho do arquivo:', caminhoArquivo);
    
    // Upload para Firebase Storage
    const storageRef = ref(storage, caminhoArquivo);
    
    try {
      console.log('⬆️ Fazendo upload...');
      await uploadBytes(storageRef, blob);
      console.log('✅ Upload realizado com sucesso!');
      
      // Obter URL de download
      console.log('🔗 Obtendo URL de download...');
      const downloadURL = await getDownloadURL(storageRef);
      console.log('✅ URL de download obtida:', downloadURL);
      
      // Testar acesso à URL
      console.log('🌐 Testando acesso à URL...');
      const urlResponse = await fetch(downloadURL);
      if (urlResponse.ok) {
        console.log('✅ URL acessível e funcionando!');
      } else {
        console.log('⚠️ URL não acessível:', urlResponse.status);
      }
      
      console.log('\n🎉 Teste de Storage concluído com sucesso!');
      console.log('📋 Resumo:');
      console.log(`- Arquivo: ${nomeArquivo}`);
      console.log(`- Tamanho: ${blob.size} bytes`);
      console.log(`- Tipo: ${blob.type}`);
      console.log(`- URL: ${downloadURL}`);
      console.log(`- Caminho: ${caminhoArquivo}`);
      
      console.log('\n✅ Sistema pronto para upload de documentos!');
      console.log('📝 Agora você pode:');
      console.log('1. Cadastrar vendas com documentos');
      console.log('2. Upload automático para Firebase Storage');
      console.log('3. URLs de download geradas automaticamente');
      console.log('4. Documentos organizados por vendedor');
      
    } catch (uploadError) {
      console.error('❌ Erro no upload:', uploadError);
      console.log('\n🔧 Possíveis soluções:');
      console.log('1. Verificar regras de Storage no Firebase Console');
      console.log('2. Verificar se o usuário tem permissão de upload');
      console.log('3. Verificar configuração do Firebase Storage');
      console.log('4. Verificar se o bucket está configurado corretamente');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar teste
testarUploadStorage(); 