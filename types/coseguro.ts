export type Coseguro = {
  Periodo: string;
  Fecha: string;
  Prestador: string;
  Concepto: string;
  Detalle: string;
  Importe: number;
  GrupoFamiliar: string;
};

export type CosegXPeriodo = {
  [key: string]: Coseguro[];
};
