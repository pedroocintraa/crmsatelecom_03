# 📋 Permissões por Função no Sistema

## 👑 **ADMINISTRADOR GERAL**
**Acesso completo ao sistema**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar todas as estatísticas
- **Todas as vendas** - Ver e editar vendas de todos os usuários
- **Gerenciamento de usuários** - Criar, editar, excluir usuários
- **Gerenciamento de equipes** - Criar, editar, excluir equipes
- **Edição de vendas** - Modificar qualquer venda
- **Criação de supervisores** - Promover usuários a supervisores
- **Criação de vendedores** - Criar novos vendedores
- **Configurações** - Acessar configurações do sistema

### 🎯 **Links visíveis:**
- Dashboard
- Nova Venda
- Vendas
- **Usuários** ✅
- **Equipes** ✅
- **Configurações** ✅

---

## 👨‍💼 **SUPERVISOR**
**Acesso gerencial limitado**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Todas as vendas** - Ver e editar vendas de todos os usuários
- **Gerenciamento de equipes** - Criar, editar, excluir equipes
- **Edição de vendas** - Modificar vendas
- **Criação de vendedores** - Criar novos vendedores

### ❌ **Não pode fazer:**
- Gerenciamento de usuários
- Criação de supervisores
- Acessar configurações

### 🎯 **Links visíveis:**
- Dashboard
- Nova Venda
- Vendas
- **Equipes** ✅
- ~~Usuários~~ ❌
- ~~Configurações~~ ❌

---

## 🏢 **BACKOFFICE**
**Acesso administrativo básico**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Todas as vendas** - Ver e editar vendas de todos os usuários
- **Edição de vendas** - Modificar vendas

### ❌ **Não pode fazer:**
- Gerenciamento de usuários
- Gerenciamento de equipes
- Criação de supervisores
- Criação de vendedores
- Acessar configurações

### 🎯 **Links visíveis:**
- Dashboard
- Nova Venda
- Vendas
- ~~Usuários~~ ❌
- ~~Equipes~~ ❌
- ~~Configurações~~ ❌

---

## 👥 **SUPERVISOR DE EQUIPE**
**Acesso limitado à própria equipe**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Apenas vendas próprias** - Ver e editar apenas suas vendas

### ❌ **Não pode fazer:**
- Ver todas as vendas
- Gerenciamento de usuários
- Gerenciamento de equipes
- Edição de vendas de outros
- Criação de supervisores
- Criação de vendedores
- Acessar configurações

### 🎯 **Links visíveis:**
- Dashboard
- Nova Venda
- Vendas (filtradas)
- ~~Usuários~~ ❌
- ~~Equipes~~ ❌
- ~~Configurações~~ ❌

---

## 👤 **VENDEDOR**
**Acesso básico**

### ✅ **Pode fazer:**
- **Dashboard** - Visualizar estatísticas
- **Apenas vendas próprias** - Ver e editar apenas suas vendas

### ❌ **Não pode fazer:**
- Ver todas as vendas
- Gerenciamento de usuários
- Gerenciamento de equipes
- Edição de vendas de outros
- Criação de supervisores
- Criação de vendedores
- Acessar configurações

### 🎯 **Links visíveis:**
- Dashboard
- Nova Venda
- Vendas (filtradas)
- ~~Usuários~~ ❌
- ~~Equipes~~ ❌
- ~~Configurações~~ ❌

---

## 🔧 **Como Corrigir Permissões**

### **Para Administrador Geral:**
```javascript
// Execute no console
const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
const database = getDatabase();

await set(ref(database, 'usuarios/SEU_USER_ID'), {
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

### **Para Supervisor:**
```javascript
await set(ref(database, 'usuarios/SEU_USER_ID'), {
  funcao: 'SUPERVISOR',
  permissoes: {
    podeAcessarDashboard: true,
    podeAcessarTodasVendas: true,
    podeAcessarApenasPropriaVendas: false,
    podeGerenciarUsuarios: false,
    podeEditarVendas: true,
    podeGerenciarEquipes: true,
    podeCriarSupervisorEquipe: false,
    podeCriarVendedor: true
  }
});
```

**Execute o script `VERIFICAR_PERMISSOES_USUARIO.js` para corrigir automaticamente!** ✅🔧 