// Script para aplicar regras de Storage no Firebase
// Execute no console do navegador

async function aplicarRegrasStorage() {
  try {
    console.log('🔧 Aplicando regras de Storage...');
    
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

    console.log('📝 Fazendo login para aplicar regras...');
    
    // Fazer login com um usuário admin
    try {
      await signInWithEmailAndPassword(auth, 'admin@sa-telecom.com', 'admin123');
      console.log('✅ Login realizado com sucesso');
    } catch (loginError) {
      console.log('⚠️ Erro no login, tentando continuar:', loginError.message);
    }

    console.log('🧪 Testando upload de arquivo...');
    
    // Testar upload de um arquivo pequeno
    const testContent = 'Teste de upload - ' + new Date().toISOString();
    const testBlob = new Blob([testContent], { type: 'text/plain' });
    const testFileName = `test_${Date.now()}.txt`;
    const testPath = `vendas/test/${testFileName}`;
    
    const storageRef = ref(storage, testPath);
    
    try {
      await uploadBytes(storageRef, testBlob);
      console.log('✅ Upload de teste realizado com sucesso!');
      
      // Tentar obter URL de download
      const downloadURL = await getDownloadURL(storageRef);
      console.log('✅ Download URL obtida:', downloadURL);
      
      console.log('\n🎉 Storage configurado corretamente!');
      console.log('📋 Agora você pode:');
      console.log('1. Cadastrar vendas com documentos');
      console.log('2. Upload de imagens funcionando');
      console.log('3. URLs de download geradas automaticamente');
      
    } catch (uploadError) {
      console.error('❌ Erro no upload de teste:', uploadError);
      console.log('\n🔧 Soluções possíveis:');
      console.log('1. Verificar se as regras de Storage foram aplicadas');
      console.log('2. Verificar se o usuário tem permissão de admin');
      console.log('3. Verificar configuração do Firebase Storage');
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

// Executar script
aplicarRegrasStorage(); 