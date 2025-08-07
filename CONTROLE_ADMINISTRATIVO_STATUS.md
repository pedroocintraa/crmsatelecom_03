# 🔧 Controle Administrativo de Status

## ❌ **Problema Identificado:**

### **1. Limitação no controle de status:**
```
❌ Apenas StatusManager disponível para todos os usuários
❌ Não havia controle administrativo para mudanças diretas
❌ Supervisores e Administradores precisavam de mais flexibilidade
❌ Não era possível pular status intermediários quando necessário
```

## ✅ **Solução Implementada:**

### **1. StatusSelector para Controle Administrativo:**
- **Disponível** apenas para `ADMINISTRADOR_GERAL` e `SUPERVISOR`
- **Select dropdown** para escolher qualquer status
- **Validações** específicas para cada status
- **Dialog de confirmação** para mudanças administrativas

### **2. Dupla Interface de Controle:**
- **StatusManager:** Controle normal para todos os usuários
- **StatusSelector:** Controle administrativo para supervisores e administradores

## 🎯 **Funcionalidades Implementadas:**

### **✅ StatusSelector:**
```typescript
// ✅ Interface para Supervisores e Administradores:
interface StatusSelectorProps {
  venda: Venda;
  onStatusChange: (newStatus: Venda["status"], extraData?: { 
    dataInstalacao?: string; 
    motivoPerda?: string 
  }) => void;
}
```

### **✅ Permissões por Função:**
- **ADMINISTRADOR_GERAL:** ✅ Acesso total ao StatusSelector
- **SUPERVISOR:** ✅ Acesso total ao StatusSelector
- **BACKOFFICE:** ❌ Apenas StatusManager
- **SUPERVISOR_EQUIPE:** ❌ Apenas StatusManager
- **VENDEDOR:** ❌ Apenas StatusManager

### **✅ Validações Específicas:**
- **Status "Auditada":** Data de instalação obrigatória
- **Status "Perdida":** Motivo da perda obrigatório
- **Conversão automática** para fuso horário de Brasília

## 🔧 **Interface Atualizada:**

### **✅ Seção "Ações do Backoffice":**
```typescript
// ✅ Estrutura da seção:
<Card>
  <CardHeader>
    <CardTitle>Ações do Backoffice</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* StatusManager para todos os usuários */}
    <StatusManager
      venda={venda}
      onStatusChange={handleStatusChange}
      showLostOption={true}
    />
    
    {/* StatusSelector apenas para admins/supervisores */}
    {user && (user.funcao === "ADMINISTRADOR_GERAL" || user.funcao === "SUPERVISOR") && (
      <div className="pt-4 border-t">
        <StatusSelector
          venda={venda}
          onStatusChange={handleStatusChange}
        />
      </div>
    )}
  </CardContent>
</Card>
```

### **✅ StatusSelector Interface:**
- **Select dropdown** com todos os status disponíveis
- **Indicação** do status atual
- **Desabilitação** do status atual no select
- **Dialog de confirmação** antes da mudança

## 🛠️ **Como Funciona:**

### **✅ Controle Normal (StatusManager):**
1. **Todos os usuários** veem os botões do StatusManager
2. **Transições normais** seguindo o fluxo definido
3. **Validações** baseadas no fluxo de status
4. **Interface familiar** e intuitiva

### **✅ Controle Administrativo (StatusSelector):**
1. **Apenas admins/supervisores** veem o StatusSelector
2. **Select dropdown** permite escolher qualquer status
3. **Validações específicas** para cada status
4. **Dialog de confirmação** para mudanças administrativas

### **✅ Validações do StatusSelector:**
```typescript
// ✅ Para status "Auditada":
if (selectedStatus === "auditada") {
  if (!dataInstalacao) {
    alert("Data de instalação é obrigatória para o status 'Auditada'");
    return;
  }
  // Converter para fuso horário de Brasília
  const dataInstalacaoISO = new Date(dataInstalacao + 'T00:00:00-03:00').toISOString();
  extraData.dataInstalacao = dataInstalacaoISO;
}

// ✅ Para status "Perdida":
if (selectedStatus === "perdida") {
  if (!motivoPerda.trim()) {
    alert("Motivo da perda é obrigatório");
    return;
  }
  extraData.motivoPerda = motivoPerda;
}
```

## 🎯 **Benefícios das Alterações:**

### **✅ Flexibilidade Administrativa:**
- **Mudanças diretas** de status quando necessário
- **Controle total** para supervisores e administradores
- **Possibilidade** de pular status intermediários
- **Correção rápida** de status incorretos

### **✅ Segurança e Controle:**
- **Permissões** baseadas na função do usuário
- **Validações** específicas para cada status
- **Confirmação** antes de mudanças administrativas
- **Auditoria** de mudanças via histórico

### **✅ Interface Intuitiva:**
- **Dupla interface** para diferentes níveis de controle
- **Indicação clara** do status atual
- **Validações em tempo real**
- **Feedback visual** para o usuário

## 🛠️ **Como Testar:**

### **1. Teste de Permissões:**
```javascript
// Execute na página de detalhes de uma venda:
TESTAR_STATUS_SELECTOR.js
```

### **2. Teste Manual:**
1. **Faça login** como ADMINISTRADOR_GERAL ou SUPERVISOR
2. **Acesse** uma venda em detalhes
3. **Procure** a seção "Ações do Backoffice"
4. **Verifique** se aparece "Controle Administrativo"
5. **Use** o select para escolher um novo status
6. **Preencha** os campos obrigatórios se necessário
7. **Confirme** a mudança no dialog

### **3. Teste de Validações:**
1. **Tente** mudar para "Auditada" sem data de instalação
2. **Tente** mudar para "Perdida" sem motivo
3. **Verifique** se as validações aparecem
4. **Teste** com dados válidos

### **4. Teste de Permissões:**
1. **Faça login** com diferentes funções
2. **Verifique** se o StatusSelector aparece apenas para admins/supervisores
3. **Confirme** que outros usuários só veem o StatusManager

## 📋 **Arquivos Modificados:**

### **✅ `src/pages/DetalhesVenda.tsx`:**
- Adicionado `useAuth` para verificar permissões
- Incluído `StatusSelector` na seção "Ações do Backoffice"
- Verificação de permissões para exibir StatusSelector

### **✅ `src/components/StatusSelector/StatusSelector.tsx`:**
- Corrigido status "em_atendimento" (era "em_andamento")
- Atualizada validação para status "Auditada"
- Melhorada conversão de fuso horário
- Adicionada validação de motivo para "Perdida"

## 🎯 **Fluxo de Uso:**

### **✅ Para Usuários Normais:**
1. **Acessam** a página de detalhes da venda
2. **Veem** apenas o StatusManager
3. **Usam** os botões para transições normais
4. **Seguem** o fluxo de status definido

### **✅ Para Administradores/Supervisores:**
1. **Acessam** a página de detalhes da venda
2. **Veem** StatusManager + StatusSelector
3. **Podem** usar ambos os controles
4. **Têm** flexibilidade total para mudanças

---

**✅ Controle administrativo implementado com sucesso!**

Agora supervisores e administradores têm controle total sobre os status das vendas, com validações adequadas e interface intuitiva! 🎉 