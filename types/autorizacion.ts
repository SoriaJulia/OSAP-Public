import { State } from './enums/autorizaciones';

export type Autorizacion = {
  Periodo: string;
  fecha: string;
  Afiliado: string;
  nro_ord: string;
  ori_nom: string;
  aut_estado: keyof typeof State;
};

export type AutXPeriodo = {
  [key: string]: Autorizacion[];
};
