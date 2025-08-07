# 🔧 Correção de Permissões para ADMINISTRADORES_GERAIS

## 📋 Problema Identificado

Você tem **3 usuários ADMINISTRADOR_GERAL**:
- **1 usuário** que está funcionando 100% (permissões corretas)
- **2 usuários** que não têm as permissões totais (incluindo um que foi criado agora)

Os usuários com a mesma função estão apresentando visões diferentes no sistema, indicando que as permissões não estão configuradas corretamente.

## 🎯 Permissões Corretas para ADMINISTRADOR_GERAL

### ✅ **O que um ADMINISTRADOR_GERAL deve ter acesso:**

| Funcionalidade | Acesso |
|----------------|--------|
| **Dashboard** | ✅ Completo |
| **Nova Venda** | ✅ Criar vendas |
| **Vendas** | ✅ Ver todas as vendas |
| **Usuários** | ✅ Criar, editar, excluir |
| **Equipes** | ✅ Criar, editar, excluir |
| **Configurações** | ✅ Acesso completo |

### 🔐 **Permissões Técnicas Corretas:**

```javascript
{
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
}
```

## 🛠️ Como Corrigir

### **Opção 1: Script Inteligente (Recomendado)**

1. Abra o console do navegador (F12)
2. Execute o script `CORRIGIR_PERMISSOES_USUARIOS_INCOMPLETOS.js`
3. Este script irá:
   - Identificar automaticamente o usuário que está funcionando 100%
   - Usar suas permissões como referência
   - Corrigir os outros 2 usuários baseando-se no usuário de referência
   - Mostrar relatório detalhado

### **Opção 2: Script para Usuário Novo**

1. Execute o script `CORRIGIR_USUARIO_NOVO.js`
2. Este script irá:
   - Listar todos os administradores com status
   - Identificar quais precisam de correção
   - Corrigir automaticamente as permissões
   - Mostrar permissões antes e depois

### **Opção 3: Script de Comparação**

1. Execute o script `COMPARAR_PERMISSOES_ADMINISTRADORES.js`
2. Este script irá:
   - Comparar as permissões entre todos os usuários
   - Identificar exatamente onde estão as diferenças
   - Verificar se as permissões estão conforme o padrão

### **Opção 4: Correção Manual**

Se preferir corrigir manualmente, use o script `CORRIGIR_PERMISSOES_FINAIS.js` para cada usuário individualmente.

## 🔍 Verificação das Correções

Após executar os scripts, verifique se:

1. **Todos os 3 usuários ADMINISTRADOR_GERAL têm acesso a:**
   - Dashboard
   - Nova Venda
   - Vendas
   - Usuários (menu visível)
   - Equipes (menu visível)
   - Configurações (menu visível)

2. **Faça logout e login novamente** para aplicar as mudanças

3. **Teste as funcionalidades** para garantir que todos os usuários têm o mesmo acesso

## 📊 Estrutura de Permissões por Função

### 👑 **ADMINISTRADOR_GERAL**
- **Acesso completo** ao sistema
- Pode gerenciar usuários, equipes e configurações
- Pode ver e editar todas as vendas

### 👨‍💼 **SUPERVISOR**
- Pode gerenciar equipes e criar vendedores
- **NÃO** pode gerenciar usuários ou acessar configurações
- Pode ver e editar todas as vendas

### 🏢 **BACKOFFICE**
- Pode ver e editar vendas
- **NÃO** pode gerenciar usuários, equipes ou configurações
- **NÃO** pode criar novas vendas

### 👥 **SUPERVISOR_DE_EQUIPE**
- Acesso limitado à própria equipe
- Pode ver e editar vendas
- **NÃO** pode gerenciar usuários ou configurações

### 👤 **VENDEDOR**
- Acesso básico
- Pode criar e editar próprias vendas
- **NÃO** pode gerenciar usuários, equipes ou configurações

## 🚨 Problemas Comuns

### **Usuário não vê menu "Usuários"**
- Verificar se `podeGerenciarUsuarios: true`
- Verificar se a função está correta

### **Usuário não vê menu "Equipes"**
- Verificar se `podeGerenciarEquipes: true`
- Verificar se a função está correta

### **Usuário não vê menu "Configurações"**
- Verificar se `podeAcessarConfiguracoes: true`
- Verificar se a função está correta

### **Usuário não pode criar vendas**
- Verificar se `podeAcessarNovaVenda: true`
- Verificar se `podeEditarVendas: true`

## 🔄 Após a Correção

1. **Logout e Login** - Faça logout e login novamente
2. **Teste as funcionalidades** - Verifique se todos os 3 usuários têm o mesmo acesso
3. **Verifique os menus** - Confirme se todos os menus estão visíveis
4. **Teste as permissões** - Tente acessar páginas restritas para verificar

## 📞 Suporte

Se ainda houver problemas após executar os scripts:

1. Execute o script de comparação para identificar diferenças específicas
2. Verifique se os usuários estão com a função correta
3. Confirme se as permissões foram aplicadas corretamente
4. Teste com logout/login para garantir que as mudanças foram aplicadas

## 🎯 Scripts Disponíveis

| Script | Função |
|--------|--------|
| `CORRIGIR_PERMISSOES_USUARIOS_INCOMPLETOS.js` | **Recomendado** - Usa usuário de referência |
| `CORRIGIR_USUARIO_NOVO.js` | Corrige usuários com permissões incompletas |
| `COMPARAR_PERMISSOES_ADMINISTRADORES.js` | Compara permissões entre usuários |
| `VERIFICAR_PERMISSOES_ADMINISTRADORES.js` | Verifica e corrige todos os administradores |

---

**✅ Execute o script `CORRIGIR_PERMISSOES_USUARIOS_INCOMPLETOS.js` para corrigir automaticamente os 2 usuários com permissões incompletas!** 