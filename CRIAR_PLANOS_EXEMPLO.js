// Script para criar planos de exemplo
// Execute no console do navegador

async function criarPlanosExemplo() {
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

    console.log('🔍 Verificando planos existentes...');
    
    // Verificar se já existem planos
    const planosRef = ref(database, 'planos');
    const planosSnapshot = await get(planosRef);
    
    if (planosSnapshot.exists()) {
      const planosExistentes = planosSnapshot.val();
      console.log(`⚠️ Já existem ${Object.keys(planosExistentes).length} planos:`);
      for (const [id, plano] of Object.entries(planosExistentes)) {
        console.log(`- ${plano.nome} (ID: ${id})`);
      }
      
      const continuar = confirm('Já existem planos. Deseja criar planos de exemplo mesmo assim?');
      if (!continuar) {
        console.log('❌ Operação cancelada pelo usuário');
        return;
      }
    }

    console.log('\n📝 Criando planos de exemplo...');
    
    const planosExemplo = [
      {
        nome: "Plano Básico",
        descricao: "Plano ideal para pequenas empresas que estão começando",
        valor: 99.90,
        ativo: true
      },
      {
        nome: "Plano Profissional",
        descricao: "Plano completo para empresas em crescimento",
        valor: 199.90,
        ativo: true
      },
      {
        nome: "Plano Enterprise",
        descricao: "Solução completa para grandes empresas",
        valor: 399.90,
        ativo: true
      },
      {
        nome: "Plano Starter",
        descricao: "Plano inicial para freelancers e profissionais autônomos",
        valor: 49.90,
        ativo: true
      }
    ];

    let criados = 0;
    let erros = 0;

    for (const planoData of planosExemplo) {
      try {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        const plano = {
          ...planoData,
          id: id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        await set(ref(database, `planos/${id}`), plano);
        
        console.log(`✅ Plano criado: ${plano.nome} - R$ ${plano.valor}`);
        criados++;
      } catch (error) {
        console.error(`❌ Erro ao criar plano ${planoData.nome}:`, error);
        erros++;
      }
    }

    console.log(`\n📋 RESUMO:`);
    console.log(`- Planos criados: ${criados}`);
    console.log(`- Erros: ${erros}`);
    console.log(`- Total de planos: ${planosExemplo.length}`);

    if (criados > 0) {
      console.log('\n🎯 Planos criados com sucesso!');
      console.log('- ✅ Plano Básico - R$ 99,90');
      console.log('- ✅ Plano Profissional - R$ 199,90');
      console.log('- ✅ Plano Enterprise - R$ 399,90');
      console.log('- ✅ Plano Starter - R$ 49,90');
      
      console.log('\n🔄 Recarregue a página de configurações para ver os planos');
    }

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

// Executar criação de planos
criarPlanosExemplo(); 