// Script para corrigir nomes das equipes nos usuários existentes
// Execute no console do navegador

async function corrigirNomesEquipesUsuarios() {
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

    console.log('🔍 Buscando usuários e equipes...');
    
    // Buscar todos os usuários
    const usuariosRef = ref(database, 'usuarios');
    const usuariosSnapshot = await get(usuariosRef);
    
    if (!usuariosSnapshot.exists()) {
      console.log('❌ Nenhum usuário encontrado');
      return;
    }

    // Buscar todas as equipes
    const equipesRef = ref(database, 'equipes');
    const equipesSnapshot = await get(equipesRef);
    
    if (!equipesSnapshot.exists()) {
      console.log('❌ Nenhuma equipe encontrada');
      return;
    }

    const usuarios = usuariosSnapshot.val();
    const equipes = equipesSnapshot.val();
    
    // Criar mapa de equipes (ID -> Nome)
    const equipesMap = {};
    for (const [equipeId, equipeData] of Object.entries(equipes)) {
      equipesMap[equipeId] = equipeData.nome;
    }

    console.log('📊 Equipes encontradas:');
    for (const [equipeId, nomeEquipe] of Object.entries(equipesMap)) {
      console.log(`- ${equipeId}: ${nomeEquipe}`);
    }

    console.log('\n🔍 Verificando usuários com equipe...');
    
    let corrigidos = 0;
    let erros = 0;

    for (const [userId, userData] of Object.entries(usuarios)) {
      const usuario = { id: userId, ...userData };
      
      if (usuario.equipeId) {
        const nomeEquipe = equipesMap[usuario.equipeId];
        
        console.log(`\n👤 Verificando: ${usuario.nome} (${usuario.email})`);
        console.log(`Equipe ID: ${usuario.equipeId}`);
        console.log(`Nome da equipe: ${nomeEquipe || 'Não encontrada'}`);
        console.log(`Nome atual no usuário: ${usuario.nomeEquipe || 'Não definido'}`);

        if (nomeEquipe && nomeEquipe !== usuario.nomeEquipe) {
          console.log('⚠️ Nome da equipe diferente. Corrigindo...');
          
          try {
            // Atualizar usuário com nome da equipe
            const dadosCorretos = {
              ...usuario,
              nomeEquipe: nomeEquipe
            };

            await set(ref(database, `usuarios/${userId}`), dadosCorretos);
            
            console.log('✅ Nome da equipe corrigido!');
            corrigidos++;
          } catch (error) {
            console.error('❌ Erro ao corrigir nome da equipe:', error);
            erros++;
          }
        } else if (nomeEquipe) {
          console.log('✅ Nome da equipe já está correto');
        } else {
          console.log('⚠️ Equipe não encontrada no sistema');
        }
      } else {
        console.log(`\n👤 ${usuario.nome}: Sem equipe associada`);
      }
    }

    console.log(`\n📋 RESUMO:`);
    console.log(`- Usuários corrigidos: ${corrigidos}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Total de usuários verificados: ${Object.keys(usuarios).length}`);

    if (corrigidos > 0) {
      console.log('\n🎯 Após a correção, os usuários mostrarão:');
      console.log('- ✅ Nome correto da equipe em vez de "Sem equipe"');
      console.log('- ✅ Informação completa da equipe');
      
      console.log('\n🔄 Recarregue a página para ver as mudanças');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar correção
corrigirNomesEquipesUsuarios(); 