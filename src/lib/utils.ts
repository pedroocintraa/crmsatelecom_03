import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata data para exibição no formato brasileiro (dd/mm/yyyy)
 * Corrige problemas de timezone
 */
export function formatarDataBrasil(dataISO: string): string {
  if (!dataISO) return '';
  
  try {
    console.log('🔍 formatarDataBrasil recebeu:', dataISO);
    
    // Se a data já está no formato YYYY-MM-DDT00:00:00-03:00, extrair apenas a parte da data
    if (dataISO.includes('T00:00:00-03:00')) {
      const dataPart = dataISO.split('T')[0];
      console.log('🔍 Extraindo parte da data:', dataPart);
      
      // Converter YYYY-MM-DD para DD/MM/YYYY
      const [year, month, day] = dataPart.split('-');
      const dataFormatada = `${day}/${month}/${year}`;
      console.log('🔍 Data formatada:', dataFormatada);
      return dataFormatada;
    }
    
    // Se é uma data simples no formato YYYY-MM-DD, processar diretamente
    if (dataISO.match(/^\d{4}-\d{2}-\d{2}$/)) {
      console.log('🔍 Data simples detectada:', dataISO);
      const [year, month, day] = dataISO.split('-');
      const dataFormatada = `${day}/${month}/${year}`;
      console.log('🔍 Data formatada (método simples):', dataFormatada);
      return dataFormatada;
    }
    
    // Para outros formatos, usar o método anterior
    const data = new Date(dataISO);
    
    // Verificar se a data é válida
    if (isNaN(data.getTime())) {
      console.log('❌ Data inválida:', dataISO);
      return '';
    }
    
    // Formatar no padrão brasileiro
    const dataFormatada = data.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });
    console.log('🔍 Data formatada (método anterior):', dataFormatada);
    return dataFormatada;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return '';
  }
}

/**
 * Formata data e hora para exibição no formato brasileiro
 * Corrige problemas de timezone
 */
export function formatarDataHoraBrasil(dataISO: string): string {
  if (!dataISO) return '';
  
  try {
    const data = new Date(dataISO);
    
    if (isNaN(data.getTime())) {
      return '';
    }
    
    return data.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return '';
  }
}

/**
 * Converte data para timezone brasileiro
 */
export function converterParaTimezoneBrasil(dataISO: string): Date {
  if (!dataISO) return new Date();
  
  try {
    const data = new Date(dataISO);
    
    // Ajustar para timezone brasileiro
    const offsetBrasil = -3; // UTC-3
    const offsetLocal = data.getTimezoneOffset() / 60;
    const diffOffset = offsetBrasil - offsetLocal;
    
    const dataAjustada = new Date(data.getTime() + (diffOffset * 60 * 60 * 1000));
    
    return dataAjustada;
  } catch (error) {
    console.error('Erro ao converter timezone:', error);
    return new Date();
  }
}

/**
 * Converte data para ISO string no fuso horário de Brasília
 */
export function converterDataParaBrasilISO(dataString: string): string {
  if (!dataString) return '';
  
  try {
    // Criar data no fuso horário de Brasília
    const data = new Date(dataString + 'T00:00:00-03:00');
    
    // Verificar se a data é válida
    if (isNaN(data.getTime())) {
      return '';
    }
    
    // Retornar no formato ISO mantendo o fuso horário de Brasília
    return dataString + 'T00:00:00-03:00';
  } catch (error) {
    console.error('Erro ao converter data para Brasília:', error);
    return '';
  }
}

/**
 * Formata data de nascimento para exibição
 */
export function formatarDataNascimento(dataISO: string): string {
  if (!dataISO) return '';
  
  try {
    // Para datas de nascimento, não precisamos ajustar timezone
    // pois é apenas uma data, não datetime
    const data = new Date(dataISO + 'T00:00:00');
    
    if (isNaN(data.getTime())) {
      return '';
    }
    
    return data.toLocaleDateString('pt-BR');
  } catch (error) {
    console.error('Erro ao formatar data de nascimento:', error);
    return '';
  }
}

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export function maskCPF(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Aplica máscara de telefone ((00) 0 0000-0000)
 */
export function maskPhone(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, '');
  
  // Aplica a máscara baseada no tamanho
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    return numbers.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  }
}

/**
 * Remove máscaras de CPF e telefone
 */
export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, '');
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Retorna a data atual no fuso horário de Brasília
 */
export function getDataAtualBrasil(): string {
  const agora = new Date();
  const offsetBrasil = -3; // UTC-3
  const offsetLocal = agora.getTimezoneOffset() / 60;
  const diffOffset = offsetBrasil - offsetLocal;
  
  const dataBrasil = new Date(agora.getTime() + (diffOffset * 60 * 60 * 1000));
  return dataBrasil.toISOString();
}
