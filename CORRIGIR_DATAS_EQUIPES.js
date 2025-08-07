// Script para corrigir datas das equipes existentes
// Execute no console do navegador

async function corrigirDatasEquipes() {
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
    const { getDatabase, ref, get, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    console.log('🔍 Buscando equipes...');
    
    // Buscar todas as equipes
    const equipesRef = ref(database, 'equipes');
    const equipesSnapshot = await get(equipesRef);
    
    if (!equipesSnapshot.exists()) {
      console.log('❌ Nenhuma equipe encontrada');
      return;
    }

    const equipes = equipesSnapshot.val();
    console.log(`📊 Encontradas ${Object.keys(equipes).length} equipes:`);
    
    let corrigidas = 0;
    let erros = 0;

    for (const [equipeId, equipeData] of Object.entries(equipes)) {
      const equipe = { id: equipeId, ...equipeData };
      
      console.log(`\n🏢 Verificando: ${equipe.nome}`);
      console.log(`Data de criação atual: ${equipe.created_at || 'Não definida'}`);
      console.log(`Data de atualização atual: ${equipe.updated_at || 'Não definida'}`);

      // Verificar se precisa corrigir
      const precisaCorrigir = !equipe.created_at || !equipe.updated_at;

      if (precisaCorrigir) {
        console.log('⚠️ Datas incorretas detectadas. Corrigindo...');
        
        try {
          // Usar data atual se não existir, ou manter a existente
          const dataAtual = new Date().toISOString();
          const dadosCorretos = {
            ...equipe,
            created_at: equipe.created_at || dataAtual,
            updated_at: equipe.updated_at || dataAtual
          };

          await set(ref(database, `equipes/${equipeId}`), dadosCorretos);
          
          console.log('✅ Datas corrigidas com sucesso!');
          console.log(`Nova data de criação: ${dadosCorretos.created_at}`);
          console.log(`Nova data de atualização: ${dadosCorretos.updated_at}`);
          corrigidas++;
        } catch (error) {
          console.error('❌ Erro ao corrigir datas:', error);
          erros++;
        }
      } else {
        console.log('✅ Datas já estão corretas!');
      }
    }

    console.log(`\n📋 RESUMO:`);
    console.log(`- Equipes corrigidas: ${corrigidas}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Total de equipes verificadas: ${Object.keys(equipes).length}`);

    if (corrigidas > 0) {
      console.log('\n🎯 Após a correção, as equipes mostrarão:');
      console.log('- ✅ Data de criação correta');
      console.log('- ✅ Data de atualização correta');
      console.log('- ✅ Informações completas');
      
      console.log('\n🔄 Recarregue a página para ver as mudanças');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirDatasEquipes(); 