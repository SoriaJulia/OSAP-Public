import { State } from './enums/facturas';

export type Factura = {
  CompId: number;
  FecVen: string;
  Total: number;
  Suc: number;
  Nro: number;
  Estado: keyof typeof State;
  Peri: string;
};

export type Periodo = {
  [key: string]: Factura[];
};
