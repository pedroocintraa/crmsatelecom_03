# 🚀 Solução Direta - Criar Dados do Usuário

## 🎯 Problema
Você já tem um usuário cadastrado no Firebase Auth, mas os dados não estão no Realtime Database.

## 🛠️ Solução 1: Componente Automático

### Passo 1: Acessar o Sistema
1. **Acesse**: `http://localhost:8083/`
2. **Faça login** com seu email/senha (mesmo que dê erro)
3. **Clique em "Criar Dados"** (botão pequeno)
4. **Clique em "Criar Dados do Usuário"**
5. **Aguarde a confirmação**

### Passo 2: Testar
1. **Faça logout**
2. **Faça login novamente**
3. **Deve funcionar agora!**

## 🛠️ Solução 2: Script no Console

### Passo 1: Fazer Login
1. **Acesse**: `http://localhost:8083/`
2. **Faça login** com seu email/senha
3. **Abra o console** (F12)

### Passo 2: Executar Script
1. **Cole este código** no console:

```javascript
// Script para criar dados do usuário
console.log('🚀 Iniciando criação de dados do usuário...');

async function createUserData() {
  try {
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error('❌ Nenhum usuário logado encontrado');
      return;
    }

    console.log('✅ Usuário encontrado:', currentUser.uid);

    // Determinar função baseada no email
    let funcao = 'VENDEDOR';
    let permissoes = {
      visualizarDashboard: true,
      gerenciarUsuarios: false,
      gerenciarEquipes: false,
      cadastrarVendas: true,
      visualizarVendas: true,
      editarVendas: false,
      excluirVendas: false,
      gerenciarConfiguracoes: false
    };

    if (currentUser.email?.includes('admin')) {
      funcao = 'ADMINISTRADOR';
      permissoes = {
        visualizarDashboard: true,
        gerenciarUsuarios: true,
        gerenciarEquipes: true,
        cadastrarVendas: true,
        visualizarVendas: true,
        editarVendas: true,
        excluirVendas: true,
        gerenciarConfiguracoes: true
      };
    } else if (currentUser.email?.includes('gerente')) {
      funcao = 'GERENTE';
      permissoes = {
        visualizarDashboard: true,
        gerenciarUsuarios: false,
        gerenciarEquipes: true,
        cadastrarVendas: true,
        visualizarVendas: true,
        editarVendas: true,
        excluirVendas: false,
        gerenciarConfiguracoes: false
      };
    }

    // Criar dados do usuário
    const userData = {
      id: currentUser.uid,
      nome: currentUser.displayName?.split(' ')[0] || 'Usuário',
      sobrenome: currentUser.displayName?.split(' ').slice(1).join(' ') || 'Sistema',
      email: currentUser.email || '',
      telefone: '(11) 00000-0000',
      funcao: funcao,
      permissoes: permissoes,
      ativo: true,
      dataCriacao: new Date().toISOString()
    };

    console.log('📝 Dados do usuário:', userData);

    // Salvar no Realtime Database
    const database = firebase.database();
    await database.ref(`usuarios/${currentUser.uid}`).set(userData);

    console.log('✅ Dados criados com sucesso!');
    console.log('🎯 Função:', funcao);

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

createUserData();
```

2. **Pressione Enter** para executar
3. **Verifique as mensagens** no console

### Passo 3: Testar
1. **Faça logout**
2. **Faça login novamente**
3. **Deve funcionar!**

## 🛠️ Solução 3: Manual no Firebase Console

### Passo 1: Acessar Firebase Console
1. **Vá para**: https://console.firebase.google.com
2. **Selecione**: `crm-s-a-telecom`
3. **Clique em**: **Realtime Database**

### Passo 2: Criar Estrutura
1. **Clique em "Dados"**
2. **Clique no "+"** para adicionar nó
3. **Digite**: `usuarios`
4. **Clique em "usuarios"**
5. **Clique no "+"** novamente
6. **Digite seu UID**: `MmKJUH5zgQN5TlGqe1iAMamBMkj1`
7. **Adicione os campos**:

```json
{
  "id": "MmKJUH5zgQN5TlGqe1iAMamBMkj1",
  "nome": "Administrador",
  "sobrenome": "Sistema",
  "email": "admin@sa-telecom.com",
  "telefone": "(11) 99999-9990",
  "funcao": "ADMINISTRADOR",
  "ativo": true,
  "dataCriacao": "2024-01-01T00:00:00.000Z",
  "permissoes": {
    "visualizarDashboard": true,
    "gerenciarUsuarios": true,
    "gerenciarEquipes": true,
    "cadastrarVendas": true,
    "visualizarVendas": true,
    "editarVendas": true,
    "excluirVendas": true,
    "gerenciarConfiguracoes": true
  }
}
```

## 🔍 Verificação

### Console do Navegador
Procure por estas mensagens:
```
✅ Usuário encontrado: [UID]
✅ Dados criados com sucesso!
```

### Firebase Console
1. **Realtime Database** → **Dados**
2. **Verifique**: `usuarios/[seu-UID]`
3. **Confirme** que os dados estão lá

## 🚨 Regras de Segurança

Certifique-se de que as regras estão assim:

```json
{
  "rules": {
    "usuarios": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "$other": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 📋 Checklist

- [ ] Usuário logado no Firebase Auth
- [ ] Regras de segurança aplicadas
- [ ] Dados criados no Realtime Database
- [ ] Logout e login novamente
- [ ] Sistema funcionando

## 🆘 Se Não Funcionar

1. **Verifique o console** do navegador para erros
2. **Confirme as regras** no Firebase Console
3. **Teste a conexão** com "Testar Firebase"
4. **Verifique** se o Realtime Database está habilitado 