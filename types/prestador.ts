import { Especialidad } from './especialidad';

export type Prestador = {
  id: string;
  nombre: string;
  matricula: string;
  institucion: string;
  idInstitucion: string;
  calle: string;
  nroPuerta: string;
  piso: string;
  depto: string;
  telefono: string;
  idLocalidad: number;
  email?: string;
  tel?: string;
  cel?: string;
  nombreCartilla?: string;
  Especialidades: string;
};

export enum TiposPrestador {
  Medico = '1',
  Bioquimico = '2',
  Odontologo = '3',
  Kinesiologo = '5',
  PrestadoresDiscapacidad = '219',
  Farmacias = '7',
  TerapeutaOcupacional = '205',
  Psicologo = '11',
  Fonoaudiologo = '6',
  Psicopedagogia = '195',
  Opticas = '177',
  Instituciones = '4',
}
export type TipoPrestador = { name: string; id: string; especialidades: Array<Especialidad> };
