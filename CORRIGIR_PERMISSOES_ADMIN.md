# 🔧 Corrigir Permissões do Administrador

## ❌ **Problema Atual**

O usuário `fdd7ehJgy0dDum2gPH4dpo7iCo03` está logado, mas **não tem permissões completas**:
- ❌ **Não consegue acessar** página de usuários
- ❌ **Não consegue acessar** página de equipes
- ❌ **Permissões defasadas** em relação ao administrador de referência

## ✅ **Solução**

### **Passo 1: Executar Script de Correção**

1. **Abra o console** do navegador (F12)
2. **Cole e execute** o código do arquivo `CORRIGIR_PERMISSOES_ADMIN.js`
3. **Aguarde** a correção das permissões
4. **Faça logout** e **login novamente**

### **Passo 2: Verificar Resultado**

Após a correção, você deve ter acesso a:
- ✅ **Dashboard** completo
- ✅ **Todas as vendas**
- ✅ **Gerenciamento de usuários**
- ✅ **Gerenciamento de equipes**
- ✅ **Edição de vendas**
- ✅ **Criação de supervisores**
- ✅ **Criação de vendedores**

## 🔍 **O que o Script Faz**

### **1. Busca o Usuário Atual**
```javascript
const userId = 'fdd7ehJgy0dDum2gPH4dpo7iCo03';
const userData = userSnapshot.val();
console.log('👤 Usuário atual:', userData);
```

### **2. Busca o Administrador de Referência**
```javascript
const adminRef = ref(database, `usuarios/MmKJUH5zgQN5TlGqe1iAMamBMkj1`);
const adminData = adminSnapshot.val();
console.log('👑 Administrador de referência:', adminData);
```

### **3. Aplica Permissões Corretas**
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

## 🎯 **Permissões que Serão Aplicadas**

### **Antes:**
```javascript
{
  funcao: "VENDEDOR", // ❌ Função errada
  permissoes: undefined // ❌ Sem permissões
}
```

### **Depois:**
```javascript
{
  funcao: "ADMINISTRADOR_GERAL", // ✅ Função correta
  permissoes: {                  // ✅ Todas as permissões
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: true,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: true,
    podeCriarVendedor: true
  }
}
```

## 🚨 **Se Ainda Der Problema**

### **1. Verificar Permissões Manualmente**
```javascript
// Execute no console para ver as permissões atuais
const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
const database = getDatabase();
const userRef = ref(database, 'usuarios/fdd7ehJgy0dDum2gPH4dpo7iCo03');
const snapshot = await get(userRef);
console.log('Permissões atuais:', snapshot.val());
```

### **2. Forçar Correção Manual**
```javascript
// Execute para forçar correção
const { set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
await set(ref(database, 'usuarios/fdd7ehJgy0dDum2gPH4dpo7iCo03'), {
  nome: 'Administrador Geral',
  email: 'seu@email.com',
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
});
```

### **3. Limpar Cache**
- **Ctrl+F5** (Windows) ou **Cmd+Shift+R** (Mac)
- Ou limpe o cache do navegador

## 🎉 **Resultado Esperado**

Após a correção:
- ✅ **Acesso completo** ao sistema
- ✅ **Página de usuários** funcionando
- ✅ **Página de equipes** funcionando
- ✅ **Todas as funcionalidades** disponíveis
- ✅ **Mesmas permissões** do administrador de referência

## 📞 **Suporte**

### **Se precisar de ajuda:**
1. **Execute o script** `CORRIGIR_PERMISSOES_ADMIN.js`
2. **Verifique** os logs no console
3. **Faça logout/login** novamente
4. **Confirme** que todas as páginas estão acessíveis

**Esta correção dará acesso completo ao sistema!** ✅🔧 