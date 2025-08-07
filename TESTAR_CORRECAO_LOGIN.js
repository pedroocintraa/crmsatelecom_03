// Script para testar a correção do login
// Execute no console do navegador

async function testarCorrecaoLogin() {
  try {
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
    const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Buscar todos os usuários
    console.log('🔍 Verificando usuários...');
    const usuariosRef = ref(database, 'usuarios');
    const snapshot = await get(usuariosRef);
    
    if (!snapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }

    const usuarios = snapshot.val();
    console.log('📋 Usuários encontrados:');
    
    for (const [userId, userData] of Object.entries(usuarios)) {
      console.log(`\n👤 ID: ${userId}`);
      console.log(`   Nome: ${userData.nome}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Função: ${userData.funcao}`);
      console.log(`   Data: ${userData.dataCadastro}`);
    }

    // Verificar se há usuários duplicados por email
    const emails = {};
    const duplicados = [];
    
    for (const [userId, userData] of Object.entries(usuarios)) {
      const email = userData.email;
      if (!emails[email]) {
        emails[email] = [];
      }
      emails[email].push({ userId, userData });
    }
    
    for (const [email, users] of Object.entries(emails)) {
      if (users.length > 1) {
        duplicados.push({ email, users });
      }
    }
    
    if (duplicados.length > 0) {
      console.log('\n⚠️ Usuários duplicados encontrados:');
      for (const { email, users } of duplicados) {
        console.log(`\n📧 Email: ${email}`);
        users.forEach(({ userId, userData }) => {
          console.log(`  - ID: ${userId} (${userData.funcao})`);
        });
      }
    } else {
      console.log('\n✅ Nenhum usuário duplicado encontrado!');
    }

    console.log('\n🎯 Próximos passos:');
    console.log('1. Faça logout do sistema');
    console.log('2. Faça login novamente');
    console.log('3. O sistema deve usar o usuário correto agora');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar teste
testarCorrecaoLogin(); 