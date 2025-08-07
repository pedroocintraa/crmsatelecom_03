# 🚀 Setup Cloud Function para Download ZIP

## 📋 Pré-requisitos

1. **Firebase CLI instalado**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login no Firebase**:
   ```bash
   firebase login
   ```

## 🔧 Configuração

### 1. Inicializar Functions (se ainda não fez)

```bash
# Na raiz do projeto
firebase init functions

# Escolher:
# - Use an existing project: selecionar seu projeto
# - TypeScript
# - ESLint: Yes
# - Install dependencies: Yes
```

### 2. Instalar dependências das Functions

```bash
cd functions
npm install firebase-admin firebase-functions jszip @google-cloud/storage
npm install --save-dev typescript @types/node
```

### 3. Atualizar configuração do projeto

No arquivo `src/services/zipService.ts`, linha 13, substitua `SEU-PROJECT-ID`:

```typescript
private static readonly CLOUD_FUNCTION_URL = 'https://us-central1-SEU-PROJECT-ID.cloudfunctions.net/gerarZipDocumentos';
```

**Por exemplo:**
```typescript
private static readonly CLOUD_FUNCTION_URL = 'https://us-central1-crm-s-a-telecom.cloudfunctions.net/gerarZipDocumentos';
```

### 4. Deploy da Cloud Function

```bash
# Na raiz do projeto
firebase deploy --only functions

# Ou apenas a função específica
firebase deploy --only functions:gerarZipDocumentos
```

## 🎯 Como funciona

### Fluxo completo:

1. **Frontend** → clica "Baixar ZIP (Backend)"
2. **ZipService** → prepara lista de documentos
3. **Cloud Function** → baixa arquivos do Storage
4. **JSZip** → compacta no servidor
5. **Download** → ZIP pronto retorna para o usuário

### Vantagens:

✅ **Sem CORS**: servidor tem acesso total ao Storage
✅ **ZIP real**: arquivos íntegros compactados no servidor  
✅ **Escalável**: processa muitos arquivos sem problemas
✅ **Rápido**: processamento no servidor Google
✅ **Confiável**: não depende do navegador do cliente

## 🔍 Estrutura de arquivos criada

```
functions/
├── package.json          # Dependências das functions
├── tsconfig.json         # Config TypeScript
└── src/
    └── index.ts          # Cloud Functions

src/services/
└── zipService.ts         # Cliente para chamar as functions
```

## 🧪 Teste

### 1. Testar function de teste:
```bash
curl https://us-central1-SEU-PROJECT-ID.cloudfunctions.net/testeZip
```

### 2. No frontend:
```typescript
// Console do navegador
import { ZipService } from './services/zipService';
await ZipService.testarCloudFunction();
```

## 📦 Estrutura do ZIP gerado

```
documentos_venda_João_Silva_123456.zip
├── documentoClienteFrente/
│   └── documento_frente.jpg
├── documentoClienteVerso/
│   └── documento_verso.jpg
├── comprovanteEndereco/
│   └── comprovante.jpg
├── fachadaCasa/
│   └── fachada.jpg
└── selfieCliente/
    └── selfie.jpg
```

## ⚡ Performance

- **Timeout**: 5 minutos
- **Memória**: 1GB
- **Região**: us-central1 (configurável)
- **Compressão**: DEFLATE level 6

## 🛠️ Troubleshooting

### Erro de permissões:
```bash
# Verificar regras do Storage
firebase deploy --only storage
```

### Função não responde:
```bash
# Ver logs
firebase functions:log --only gerarZipDocumentos
```

### CORS no frontend:
- Function já configurada com CORS aberto
- Se necessário, ajustar origins específicos

## 🎉 Resultado

Após o deploy, você terá:

1. ✅ **Botão "Baixar ZIP (Backend)"** funcionando
2. ✅ **Download direto** do ZIP gerado no servidor
3. ✅ **Arquivos organizados** por categoria
4. ✅ **Sem problemas de CORS** ou browser

**Esta é a solução profissional e definitiva para downloads ZIP!** 🚀