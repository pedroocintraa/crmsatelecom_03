# 📋 Permissões Finais Corretas por Função

## 👑 **ADMINISTRADOR GERAL**
**Acesso completo ao sistema**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar todas as estatísticas
- **Nova Venda** - Criar novas vendas
- **Vendas** - Ver e editar vendas de todos os usuários
- **Usuários** - Criar, editar, excluir usuários
- **Equipes** - Criar, editar, excluir equipes
- **Configurações** - Acesso completo às configurações

### 🎯 **Links visíveis:**
- ✅ Dashboard
- ✅ Nova Venda
- ✅ Vendas
- ✅ Usuários
- ✅ Equipes
- ✅ Configurações

---

## 👨‍💼 **SUPERVISOR**
**Acesso gerencial com limitações**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Nova Venda** - Criar novas vendas
- **Vendas** - Ver e editar vendas de todos os usuários
- **Usuários** - Criar novos usuários (não pode excluir)
- **Equipes** - Gerenciar equipes (não pode criar/excluir)
- **Configurações** - Gerenciar planos (não pode criar/excluir/editar)

### ❌ **Não pode fazer:**
- Excluir usuários
- Criar/excluir equipes
- Criar/excluir/editar configurações

### 🎯 **Links visíveis:**
- ✅ Dashboard
- ✅ Nova Venda
- ✅ Vendas
- ✅ Usuários
- ✅ Equipes
- ✅ Configurações

---

## 👥 **SUPERVISOR DE EQUIPE**
**Acesso limitado**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Nova Venda** - Criar novas vendas
- **Vendas** - Ver e editar vendas
- **Equipes** - Gerenciar equipes (não pode criar/excluir)

### ❌ **Não pode fazer:**
- Acessar página de usuários
- Acessar configurações
- Criar/excluir equipes

### 🎯 **Links visíveis:**
- ✅ Dashboard
- ✅ Nova Venda
- ✅ Vendas
- ❌ Usuários
- ✅ Equipes
- ❌ Configurações

---

## 🏢 **BACKOFFICE**
**Acesso administrativo básico**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Vendas** - Ver e editar vendas

### ❌ **Não pode fazer:**
- Acessar nova venda
- Acessar página de usuários
- Acessar página de equipes
- Acessar configurações

### 🎯 **Links visíveis:**
- ✅ Dashboard
- ❌ Nova Venda
- ✅ Vendas
- ❌ Usuários
- ❌ Equipes
- ❌ Configurações

---

## 👤 **VENDEDOR**
**Acesso básico**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Nova Venda** - Criar novas vendas
- **Vendas** - Ver e editar vendas

### ❌ **Não pode fazer:**
- Acessar página de usuários
- Acessar página de equipes
- Acessar configurações

### 🎯 **Links visíveis:**
- ✅ Dashboard
- ✅ Nova Venda
- ✅ Vendas
- ❌ Usuários
- ❌ Equipes
- ❌ Configurações

---

## 🔧 **Como Corrigir Permissões**

### **Para Administrador Geral:**
```javascript
// Execute no console
const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
const database = getDatabase();

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
    podeCriarVendedor: true,
    podeAcessarNovaVenda: true,
    podeAcessarConfiguracoes: true
  },
  ativo: true
});
```

### **Para Supervisor:**
```javascript
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  funcao: 'SUPERVISOR',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: true,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: false,
    podeCriarVendedor: true,
    podeAcessarNovaVenda: true,
    podeAcessarConfiguracoes: true
  }
});
```

### **Para Supervisor de Equipe:**
```javascript
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  funcao: 'SUPERVISOR_EQUIPE',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: false,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: false,
    podeCriarVendedor: false,
    podeAcessarNovaVenda: true,
    podeAcessarConfiguracoes: false
  }
});
```

### **Para Backoffice:**
```javascript
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  funcao: 'BACKOFFICE',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: false,
    podeEditarVendas: true,
    podeGerenciarEquipes: false,
    podeCriarSupervisorEquipe: false,
    podeCriarVendedor: false,
    podeAcessarNovaVenda: false,
    podeAcessarConfiguracoes: false
  }
});
```

### **Para Vendedor:**
```javascript
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  funcao: 'VENDEDOR',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: false,
    podeEditarVendas: true,
    podeGerenciarEquipes: false,
    podeCriarSupervisorEquipe: false,
    podeCriarVendedor: false,
    podeAcessarNovaVenda: true,
    podeAcessarConfiguracoes: false
  }
});
```

**Execute o script `CORRIGIR_PERMISSOES_FINAIS.js` para corrigir automaticamente!** ✅🔧 