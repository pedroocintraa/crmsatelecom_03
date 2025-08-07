# Configuração do Firebase - Sistema de Autenticação

## 📋 Visão Geral

O sistema foi configurado com Firebase Authentication e Realtime Database para gerenciar usuários e autenticação. Os dados dos usuários são armazenados no Realtime Database.

## 🔧 Configuração Implementada

### 1. Firebase Config
- **Projeto**: crm-s-a-telecom
- **Authentication**: Habilitado
- **Realtime Database**: Configurado para armazenar dados de usuários
- **Firestore**: Não utilizado (migrado para Realtime Database)

### 2. Estrutura de Dados

#### Nó: `usuarios` (Realtime Database)
```typescript
{
  [userId]: {
    id: string,                    // UID do Firebase Auth
    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
    funcao: FuncaoUsuario,        // ADMINISTRADOR | GERENTE | VENDEDOR
    permissoes: PermissoesUsuario, // Objeto com permissões específicas
    ativo: boolean,
    dataCriacao: string           // ISO Date string
  }
}
```

#### Permissões Disponíveis
```typescript
{
  visualizarDashboard: boolean,
  gerenciarUsuarios: boolean,
  gerenciarEquipes: boolean,
  cadastrarVendas: boolean,
  visualizarVendas: boolean,
  editarVendas: boolean,
  excluirVendas: boolean,
  gerenciarConfiguracoes: boolean
}
```

## 👥 Usuários Iniciais

### 1. Administrador
- **Email**: admin@sa-telecom.com
- **Senha**: admin123
- **Função**: ADMINISTRADOR
- **Permissões**: Todas habilitadas

### 2. Gerente
- **Email**: gerente@sa-telecom.com
- **Senha**: gerente123
- **Função**: GERENTE
- **Permissões**: Dashboard, Equipes, Vendas (sem exclusão), sem Configurações

### 3. Vendedor
- **Email**: vendedor@sa-telecom.com
- **Senha**: vendedor123
- **Função**: VENDEDOR
- **Permissões**: Dashboard, Cadastrar e Visualizar Vendas

## 🚀 Como Usar

### 1. Primeira Execução
1. Acesse a página de login
2. Clique em "Testar Firebase" para verificar a conexão
3. Clique em "Configurar Usuários" (botão pequeno)
4. Clique em "Criar Usuários Iniciais"
5. Aguarde a confirmação
6. Use qualquer um dos emails/senhas para fazer login

### 2. Login Normal
- Use qualquer um dos emails e senhas listados acima
- O sistema automaticamente carregará as permissões do usuário

### 3. Adicionar Novos Usuários
- Use o painel de gerenciamento de usuários (apenas administradores)
- Ou use o Firebase Console diretamente

## 🔒 Segurança

### Regras do Realtime Database
```json
{
  "rules": {
    "usuarios": {
      "$uid": {
        ".read": "auth != null && (auth.uid == $uid || root.child('usuarios').child(auth.uid).child('permissoes').child('gerenciarUsuarios').val() == true)",
        ".write": "auth != null && (auth.uid == $uid || root.child('usuarios').child(auth.uid).child('permissoes').child('gerenciarUsuarios').val() == true)"
      }
    },
    "vendas": {
      "$vendaId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "equipes": {
      "$equipeId": {
        ".read": "auth != null",
        ".write": "auth != null && (root.child('usuarios').child(auth.uid).child('permissoes').child('gerenciarEquipes').val() == true)"
      }
    },
    "configuracoes": {
      ".read": "auth != null",
      ".write": "auth != null && (root.child('usuarios').child(auth.uid).child('permissoes').child('gerenciarConfiguracoes').val() == true)"
    },
    "$other": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## 📁 Arquivos Criados/Modificados

### Novos Arquivos
- `src/lib/firebase.ts` - Configuração do Firebase
- `src/services/firebaseAuthService.ts` - Serviço de autenticação (Realtime Database)
- `src/utils/createInitialUsers.ts` - Utilitário para criar usuários
- `src/components/SetupInitialUsers.tsx` - Componente de configuração
- `src/components/FirebaseConnectionTest.tsx` - Teste de conexão
- `database.rules.json` - Regras do Realtime Database

### Arquivos Modificados
- `src/contexts/AuthContext.tsx` - Integração com Firebase
- `src/pages/Login.tsx` - Adicionado botão de configuração

## 🛠️ Comandos Úteis

### Instalar Dependências
```bash
npm install firebase
```

### Verificar Status
```bash
# Verificar se o Firebase está funcionando
npm run dev
# Acesse http://localhost:8083/ e tente fazer login
```

## ⚠️ Importante

1. **Nunca compartilhe as credenciais** dos usuários de teste em produção
2. **Altere as senhas** dos usuários iniciais após a primeira configuração
3. **Configure as regras de segurança** no Firebase Console
4. **Monitore o uso** através do Firebase Console
5. **Realtime Database** deve estar habilitado no projeto

## 🔧 Troubleshooting

### Erro de Autenticação
- Verifique se o Firebase está configurado corretamente
- Confirme se o projeto está ativo no Firebase Console
- Verifique as regras de segurança do Realtime Database

### Usuários não aparecem
- Execute novamente o processo de criação de usuários
- Verifique o console do navegador para erros
- Confirme se o Realtime Database está habilitado

### Problemas de Permissões
- Verifique se o usuário tem as permissões corretas no Realtime Database
- Confirme se o AuthContext está carregando as permissões
- Verifique se o usuário está ativo (campo `ativo: true`)

### Erro de Conexão
- Use o componente "Testar Firebase" para diagnosticar
- Verifique se o Realtime Database está habilitado no Firebase Console
- Confirme as regras de segurança no Firebase Console 