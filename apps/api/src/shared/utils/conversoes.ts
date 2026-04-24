import type { UnidadeMedida } from '@prisma/client';

type ConversaoTipo = 'massa' | 'volume' | 'unidade';

const GRAMAS_POR: Record<string, number> = {
  GRAMA: 1,
  KG: 1000,
  XICARA: 150,
  COLHER_SOPA: 15,
  COLHER_CHA: 5,
  PITADA: 0.5,
};

const MLS_POR: Record<string, number> = {
  ML: 1,
  LITRO: 1000,
  XICARA: 240,
  COLHER_SOPA: 15,
  COLHER_CHA: 5,
};

const getTipo = (unidade: UnidadeMedida): ConversaoTipo => {
  if (['UNIDADE', 'DUZIA', 'PACOTE', 'LATA'].includes(unidade)) return 'unidade';
  if (['ML', 'LITRO'].includes(unidade)) return 'volume';
  if (unidade === 'XICARA' || unidade === 'COLHER_SOPA' || unidade === 'COLHER_CHA') return 'volume';
  return 'massa';
};

export const converterUnidade = (
  quantidade: number,
  de: UnidadeMedida,
  para: UnidadeMedida,
  densidade?: number | null
): number => {
  if (de === para) return quantidade;

  const tipoDe = getTipo(de);
  const tipoPara = getTipo(para);

  if (tipoDe === 'unidade' || tipoPara === 'unidade') {
    return quantidade;
  }

  if (tipoDe === 'massa' && tipoPara === 'volume') {
    if (!densidade) return quantidade;
    const grama = quantidade * (GRAMAS_POR[de] ?? 1);
    const grams = grama / densidade;
    return grams / (MLS_POR[para] ?? 1);
  }

  if (tipoDe === 'volume' && tipoPara === 'massa') {
    if (!densidade) return quantidade;
    const ml = quantidade * (MLS_POR[de] ?? 1);
    const grams = ml * densidade;
    return grams / (GRAMAS_POR[para] ?? 1);
  }

  if (tipoDe === 'massa' && tipoPara === 'massa') {
    const grama = quantidade * (GRAMAS_POR[de] ?? 1);
    return grama / (GRAMAS_POR[para] ?? 1);
  }

  if (tipoDe === 'volume' && tipoPara === 'volume') {
    const ml = quantidade * (MLS_POR[de] ?? 1);
    return ml / (MLS_POR[para] ?? 1);
  }

  return quantidade;
};

export const calcularCustoIngrediente = (
  precoUnitario: number,
  quantidadeComprada: number,
  quantidadeReceita: number,
  fatorAproveitamento: number = 1,
  fatorMultiplicador: number = 1
): number => {
  if (quantidadeComprada <= 0 || fatorAproveitamento <= 0) return 0;
  const custoPorUnidade = precoUnitario / quantidadeComprada;
  const custoBruto = custoPorUnidade * quantidadeReceita;
  const custoComAproveitamento = custoBruto / fatorAproveitamento;
  return custoComAproveitamento * fatorMultiplicador;
};

export const calcularCustoReceita = (
  ingredientes: {
    precoUnitario: number | null;
    quantidadeComprada: number | null;
    quantidadeBase: number;
    fatorAproveitamento: number;
  }[],
  fatorMultiplicador: number = 1
): number | null => {
  let temPeloMenosUm = false;
  const custoTotal = ingredientes.reduce((acc, ing) => {
    if (ing.precoUnitario === null || ing.quantidadeComprada === null) return acc;
    temPeloMenosUm = true;
    return acc + calcularCustoIngrediente(
      ing.precoUnitario,
      ing.quantidadeComprada,
      ing.quantidadeBase,
      ing.fatorAproveitamento,
      fatorMultiplicador
    );
  }, 0);

  return temPeloMenosUm ? Math.round(custoTotal * 100) / 100 : null;
};

export const getSemanaReferencia = (data: Date = new Date()): Date => {
  const d = new Date(data);
  const day = d.getDay();
  const diff = d.getDate() - day;
  const domingo = new Date(d.setDate(diff));
  domingo.setHours(0, 0, 0, 0);
  return domingo;
};
