// Script para corrigir especificamente a equipe "EQUIPE 01 - THIAGO"
// Execute no console do navegador

async function corrigirEquipeEspecifica() {
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

    console.log('🔍 Buscando equipe específica...');
    
    // Buscar todas as equipes
    const equipesRef = ref(database, 'equipes');
    const equipesSnapshot = await get(equipesRef);
    
    if (!equipesSnapshot.exists()) {
      console.log('❌ Nenhuma equipe encontrada');
      return;
    }

    const equipes = equipesSnapshot.val();
    console.log(`📊 Encontradas ${Object.keys(equipes).length} equipes:`);
    
    // Procurar pela equipe específica
    let equipeEncontrada = null;
    let equipeId = null;

    for (const [id, equipeData] of Object.entries(equipes)) {
      const equipe = { id, ...equipeData };
      console.log(`\n🏢 Verificando: ${equipe.nome} (ID: ${id})`);
      
      if (equipe.nome === "EQUIPE 01 - THIAGO") {
        equipeEncontrada = equipe;
        equipeId = id;
        console.log('✅ Equipe encontrada!');
        break;
      }
    }

    if (!equipeEncontrada) {
      console.log('❌ Equipe "EQUIPE 01 - THIAGO" não encontrada');
      console.log('Equipes disponíveis:');
      for (const [id, equipeData] of Object.entries(equipes)) {
        const equipe = { id, ...equipeData };
        console.log(`- ${equipe.nome} (ID: ${id})`);
      }
      return;
    }

    console.log('\n📋 Dados atuais da equipe:');
    console.log(`Nome: ${equipeEncontrada.nome}`);
    console.log(`Descrição: ${equipeEncontrada.descricao || 'Não definida'}`);
    console.log(`Ativo: ${equipeEncontrada.ativo}`);
    console.log(`Created_at: ${equipeEncontrada.created_at || 'NÃO DEFINIDO'}`);
    console.log(`Updated_at: ${equipeEncontrada.updated_at || 'NÃO DEFINIDO'}`);

    // Corrigir a equipe
    console.log('\n🔧 Corrigindo dados da equipe...');
    
    const dataAtual = new Date().toISOString();
    const dadosCorretos = {
      ...equipeEncontrada,
      created_at: equipeEncontrada.created_at || dataAtual,
      updated_at: equipeEncontrada.updated_at || dataAtual,
      ativo: equipeEncontrada.ativo !== false // Garantir que está ativo
    };

    console.log('\n📝 Novos dados:');
    console.log(`Created_at: ${dadosCorretos.created_at}`);
    console.log(`Updated_at: ${dadosCorretos.updated_at}`);
    console.log(`Ativo: ${dadosCorretos.ativo}`);

    // Salvar no Firebase
    await set(ref(database, `equipes/${equipeId}`), dadosCorretos);
    
    console.log('\n✅ Equipe corrigida com sucesso!');
    console.log('🔄 Recarregue a página para ver as mudanças');

    // Verificar se foi salvo corretamente
    console.log('\n🔍 Verificando se foi salvo corretamente...');
    const equipeVerificada = await get(ref(database, `equipes/${equipeId}`));
    if (equipeVerificada.exists()) {
      const dadosSalvos = equipeVerificada.val();
      console.log('✅ Dados salvos corretamente:');
      console.log(`Created_at: ${dadosSalvos.created_at}`);
      console.log(`Updated_at: ${dadosSalvos.updated_at}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirEquipeEspecifica(); 