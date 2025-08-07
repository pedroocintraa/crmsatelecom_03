# 🔧 Configurar Firebase Storage para Downloads

## ❌ **Problema Atual**
O Firebase Storage está bloqueando **TODOS** os downloads com erro de CORS:
```
Access to XMLHttpRequest from origin 'http://localhost:8080' has been blocked by CORS policy
```

## ✅ **Solução Definitiva**

### **Opção 1: Firebase Console (Mais Fácil)**

1. **Acesse**: [Firebase Console](https://console.firebase.google.com)
2. **Selecione**: Projeto `crm-s-a-telecom`
3. **Vá para**: Storage → Rules
4. **Substitua as regras por**:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Permitir leitura para usuários autenticados
      allow read: if request.auth != null;
      // Permitir escrita para usuários autenticados  
      allow write: if request.auth != null;
    }
  }
}
```

### **Opção 2: Configurar CORS via Google Cloud (Avançado)**

1. **Instale Google Cloud CLI**:
```bash
# No Mac
brew install google-cloud-sdk

# No Windows
# Baixe de: https://cloud.google.com/sdk/docs/install
```

2. **Autentique**:
```bash
gcloud auth login
gcloud config set project crm-s-a-telecom
```

3. **Crie arquivo `cors.json`**:
```json
[
  {
    "origin": ["http://localhost:8080", "https://seu-dominio.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Content-Disposition"]
  }
]
```

4. **Aplicar CORS**:
```bash
gsutil cors set cors.json gs://crm-s-a-telecom.firebasestorage.app
```

### **Opção 3: Regras Mais Permissivas (Temporário)**

Para teste imediato, use regras mais abertas:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // TEMPORÁRIO: Permitir leitura pública
      allow read: if true;
      // Escrita apenas para autenticados
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 **Após Configurar**

1. **Aguarde**: 1-2 minutos para propagação
2. **Teste**: Clique em "Baixar" nos documentos
3. **Resultado esperado**: Download direto para pasta Downloads

## 📋 **Verificar Configuração**

No Console do Firefox/Chrome:
- ✅ **Sucesso**: `✅ Download concluído via Firebase SDK`
- ❌ **Ainda com erro**: Repetir passos acima

## 🔍 **URLs Atuais Bloqueadas**
```
https://firebasestorage.googleapis.com/v0/b/crm-s-a-telecom.firebasestorage.app/o/vendas%2F...
```

## ⚠️ **Importante**
- As regras atuais estão **muito restritivas**
- Mesmo o Firebase SDK oficial está sendo bloqueado
- Esta configuração é **essencial** para o funcionamento dos downloads