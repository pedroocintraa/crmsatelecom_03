// Script para debugar o problema das datas das equipes
// Execute no console do navegador

async function debugEquipeDatas() {
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

    console.log('🔍 DEBUG: Verificando dados das equipes...');
    
    // Buscar todas as equipes
    const equipesRef = ref(database, 'equipes');
    const equipesSnapshot = await get(equipesRef);
    
    if (!equipesSnapshot.exists()) {
      console.log('❌ Nenhuma equipe encontrada');
      return;
    }

    const equipes = equipesSnapshot.val();
    console.log(`📊 Encontradas ${Object.keys(equipes).length} equipes:`);
    
    for (const [id, equipeData] of Object.entries(equipes)) {
      const equipe = { id, ...equipeData };
      console.log(`\n🏢 EQUIPE: ${equipe.nome}`);
      console.log(`ID: ${equipe.id}`);
      console.log(`Nome: ${equipe.nome}`);
      console.log(`Descrição: ${equipe.descricao || 'Não definida'}`);
      console.log(`Ativo: ${equipe.ativo}`);
      console.log(`Created_at (raw): ${equipe.created_at}`);
      console.log(`Updated_at (raw): ${equipe.updated_at}`);
      
      // Testar conversão de data
      if (equipe.created_at) {
        try {
          const data = new Date(equipe.created_at);
          console.log(`Created_at (converted): ${data.toLocaleDateString()}`);
          console.log(`Created_at (ISO): ${data.toISOString()}`);
          console.log(`Created_at (valid): ${!isNaN(data.getTime())}`);
        } catch (error) {
          console.log(`❌ Erro ao converter created_at: ${error}`);
        }
      } else {
        console.log('❌ Created_at não definido');
      }
      
      if (equipe.updated_at) {
        try {
          const data = new Date(equipe.updated_at);
          console.log(`Updated_at (converted): ${data.toLocaleDateString()}`);
          console.log(`Updated_at (ISO): ${data.toISOString()}`);
          console.log(`Updated_at (valid): ${!isNaN(data.getTime())}`);
        } catch (error) {
          console.log(`❌ Erro ao converter updated_at: ${error}`);
        }
      } else {
        console.log('❌ Updated_at não definido');
      }
      
      // Testar todos os campos da equipe
      console.log('📋 Todos os campos da equipe:');
      for (const [campo, valor] of Object.entries(equipe)) {
        console.log(`  ${campo}: ${valor} (tipo: ${typeof valor})`);
      }
    }

    console.log('\n🎯 DIAGNÓSTICO:');
    console.log('1. Verifique se created_at e updated_at estão definidos');
    console.log('2. Verifique se as datas são válidas');
    console.log('3. Verifique se o formato está correto (ISO string)');
    console.log('4. Execute CORRIGIR_EQUIPE_ESPECIFICA.js se necessário');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar debug
debugEquipeDatas(); 