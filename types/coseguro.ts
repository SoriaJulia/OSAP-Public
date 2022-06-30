export type Coseguro = {
  periodo: string;
  fecha: string;
  prestador: string;
  concepto: string;
  detalle: string;
  importe: number;
  grupofamiliar: string;
};

export type CosegXPeriodo = {
  [key: string]: Coseguro[];
};
