# 🔧 Corrigir Dados do Administrador Geral

## ❌ **Problema Atual**
- ✅ Usuário criado como "Administrador Geral" no sistema
- ❌ No login aparece como "Vendedor" 
- ❌ Nome aparece como email (antes do @)
- ❌ Permissões não estão corretas

## ✅ **Solução**

### **Passo 1: Executar Script de Correção**

1. **Abra o console** do navegador (F12)
2. **Cole e execute** o código do arquivo `CORRIGIR_ADMIN.js`
3. **Aguarde** a verificação e correção
4. **Faça logout** e **login novamente**

### **Passo 2: Verificar Resultado**

Após o login, você deve ver:
- ✅ **Nome correto** (não mais email)
- ✅ **Função: Administrador Geral**
- ✅ **Todas as permissões** ativas
- ✅ **Acesso completo** ao sistema

## 🔍 **O que o Script Faz**

### **1. Busca Todos os Usuários**
```javascript
const usuarios = snapshot.val();
console.log('📋 Usuários encontrados:', Object.keys(usuarios));
```

### **2. Identifica Administradores**
```javascript
if (userData.funcao === 'ADMINISTRADOR_GERAL') {
  console.log('👑 Encontrado Administrador Geral!');
}
```

### **3. Corrige os Dados**
```javascript
const dadosCorretos = {
  ...userData,
  nome: userData.nome || 'Administrador Geral',
  funcao: 'ADMINISTRADOR_GERAL',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: true,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: true,
    podeCriarVendedor: true
  },
  ativo: true
};
```

## 🎯 **Dados que Serão Corrigidos**

### **Antes:**
```javascript
{
  nome: "usuario@email.com", // ❌ Email como nome
  funcao: "VENDEDOR",        // ❌ Função errada
  permissoes: undefined       // ❌ Sem permissões
}
```

### **Depois:**
```javascript
{
  nome: "Administrador Geral", // ✅ Nome correto
  funcao: "ADMINISTRADOR_GERAL", // ✅ Função correta
  permissoes: {               // ✅ Todas as permissões
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeGerenciarUsuarios: true,
    // ... outras permissões
  }
}
```

## 🚨 **Se Ainda Der Problema**

### **1. Verificar Dados Manualmente**
```javascript
// Execute no console para ver os dados atuais
const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
const database = getDatabase();
const userRef = ref(database, 'usuarios/SEU_USER_ID');
const snapshot = await get(userRef);
console.log('Dados do usuário:', snapshot.val());
```

### **2. Forçar Atualização**
```javascript
// Execute para forçar atualização
const { set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  nome: 'Administrador Geral',
  funcao: 'ADMINISTRADOR_GERAL',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: true,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: true,
    podeCriarVendedor: true
  }
});
```

### **3. Limpar Cache**
- **Ctrl+F5** (Windows) ou **Cmd+Shift+R** (Mac)
- Ou limpe o cache do navegador

## 🎉 **Resultado Esperado**

Após a correção:
- ✅ **Nome correto** exibido
- ✅ **Função: Administrador Geral**
- ✅ **Todas as permissões** funcionando
- ✅ **Acesso completo** ao sistema
- ✅ **Criação de usuários** funcionando
- ✅ **Gerenciamento de equipes** funcionando

## 📞 **Suporte**

### **Se precisar de ajuda:**
1. **Execute o script** `CORRIGIR_ADMIN.js`
2. **Verifique** os logs no console
3. **Faça logout/login** novamente
4. **Confirme** que os dados estão corretos

**Esta correção resolve o problema de dados inconsistentes!** ✅🔧 