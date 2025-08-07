# 🔧 Solução de Problemas - Firebase

## 🚨 Erro 400 no Firestore

### Problema
```
Failed to load resource: the server responded with a status of 400 ()
Firestore (12.0.0): WebChannelConnection RPC 'Listen' stream transport errored
```

### Causas Possíveis

1. **Regras de Segurança Restritivas**
   - As regras do Firestore estão bloqueando o acesso
   - Usuário não autenticado tentando acessar dados

2. **Configuração Incorreta**
   - Firebase não configurado corretamente
   - Projeto não ativo no Firebase Console

3. **Problemas de Rede**
   - Conexão com internet instável
   - Firewall bloqueando conexões

## 🛠️ Soluções

### 1. Configurar Regras de Segurança

#### Firestore Rules (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acesso para usuários autenticados
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    // Regras temporárias para desenvolvimento
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

#### Realtime Database Rules (database.rules.json)
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

### 2. Verificar Configuração do Firebase

1. **Acesse o Firebase Console**: https://console.firebase.google.com
2. **Selecione seu projeto**: crm-s-a-telecom
3. **Verifique se os serviços estão ativos**:
   - Authentication: ✅ Ativo
   - Firestore Database: ✅ Ativo
   - Realtime Database: ✅ Ativo

### 3. Aplicar Regras de Segurança

#### No Firebase Console:

1. **Firestore Database**:
   - Vá para "Regras"
   - Cole as regras do arquivo `firestore.rules`
   - Clique em "Publicar"

2. **Realtime Database**:
   - Vá para "Regras"
   - Cole as regras do arquivo `database.rules.json`
   - Clique em "Salvar"

### 4. Testar Conexão

Use o componente "Testar Firebase" na página de login para verificar:
- ✅ Firebase Auth funcionando
- ✅ Firestore conectado
- ✅ Regras aplicadas corretamente

## 🔍 Diagnóstico

### 1. Verificar Console do Navegador

Abra o DevTools (F12) e verifique:
- **Network tab**: Requisições para Firebase
- **Console tab**: Erros de JavaScript
- **Application tab**: Cookies e localStorage

### 2. Logs de Debug

O sistema agora inclui logs detalhados:
```javascript
// Logs que você deve ver no console:
"Firebase Auth successful: [uid]"
"User data retrieved: [userData]"
"User document created in Firestore"
```

### 3. Teste Manual

```javascript
// No console do navegador:
import { auth, db } from './src/lib/firebase';
console.log('Auth:', auth.currentUser);
console.log('Firestore:', db);
```

## 🚀 Passos para Resolver

### Passo 1: Aplicar Regras Temporárias
```javascript
// Regras permissivas para desenvolvimento
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ APENAS PARA DESENVOLVIMENTO
    }
  }
}
```

### Passo 2: Verificar Configuração
1. Confirme que o projeto está ativo
2. Verifique se Authentication está habilitado
3. Confirme se Firestore está criado

### Passo 3: Testar Login
1. Use o botão "Testar Firebase"
2. Se funcionar, tente fazer login
3. Verifique os logs no console

### Passo 4: Criar Usuários
1. Use "Configurar Usuários"
2. Crie os usuários iniciais
3. Tente fazer login com eles

## 📋 Checklist de Verificação

- [ ] Firebase Console acessível
- [ ] Projeto ativo
- [ ] Authentication habilitado
- [ ] Firestore criado
- [ ] Regras aplicadas
- [ ] Teste de conexão passou
- [ ] Usuários criados
- [ ] Login funcionando

## 🆘 Se Ainda Não Funcionar

### 1. Verificar Configuração Local
```bash
# Verificar se o Firebase está instalado
npm list firebase

# Reinstalar se necessário
npm install firebase
```

### 2. Limpar Cache
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### 3. Verificar Variáveis de Ambiente
Certifique-se de que as credenciais estão corretas em `src/lib/firebase.ts`

### 4. Contatar Suporte
Se nada funcionar, verifique:
- Logs completos do console
- Screenshots dos erros
- Configuração do Firebase Console

## 📞 Suporte

Para problemas persistentes:
1. Verifique os logs no console do navegador
2. Teste a conexão com o componente
3. Verifique as regras de segurança
4. Confirme a configuração no Firebase Console 