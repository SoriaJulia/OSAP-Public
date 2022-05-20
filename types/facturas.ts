import { State } from './enums/facturas';

export type Factura = {
  comp_id: number;
  comp_fecven: string;
  comp_total: number;
  comp_suc: number;
  comp_nro: number;
  estado: keyof typeof State;
  comp_peri: string;
};
