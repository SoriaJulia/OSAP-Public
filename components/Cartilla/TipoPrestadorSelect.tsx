import { Especialidad } from '@appTypes/especialidad';
import { TiposPrestador, TipoPrestador as TipoPrestadorSelect } from '@appTypes/prestador';
import Select from '@components/Base/Fields/Select';
import { capitalizeText } from '@lib/utils';
import React, { useEffect } from 'react';

export const tiposPrestadores: TipoPrestadorSelect[] = [
  {
    name: 'Médicos',
    id: '1',
    especialidades: [],
  },
  { name: 'Bioquímicos', id: '2', especialidades: [{ Codigo: '59', Descripcion: 'BIOQUIMICO' }] },
  { name: 'Odontólogos', id: '3', especialidades: [{ Codigo: '94', Descripcion: 'ODONTOLOGIA' }] },
  {
    name: 'Kinesiólogos',
    id: '5',
    especialidades: [
      { Codigo: '38', Descripcion: 'Kinesiologia' },
      { Codigo: '87', Descripcion: 'Kinesiologia (Disc)' },
      { Codigo: '97', Descripcion: 'Kinesiologia a domicilio' },
    ],
  },
  { name: 'Prestadores Discapacidad', id: '219', especialidades: [] },
  { name: 'Terapeuta Ocupacional', id: '205', especialidades: [{ Codigo: '0', Descripcion: '' }] },
  {
    name: 'Psicólogo',
    id: '11',
    especialidades: [{ Codigo: '0', Descripcion: '' }],
  },
  { name: 'Fonoaudiologia', id: '6', especialidades: [{ Codigo: '0', Descripcion: '' }] },
  { name: 'Psicopedagogia', id: '195', especialidades: [{ Codigo: '0', Descripcion: '' }] },
  { name: 'Opticas', id: '177', especialidades: [{ Codigo: '0', Descripcion: '' }] },
  { name: 'Farmacias', id: '7', especialidades: [{ Codigo: '0', Descripcion: '' }] },
];

type Props = {
  tipo: string;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  especialidad: string;
  setEspecialidad: React.Dispatch<React.SetStateAction<string>>;
  especialidades: Especialidad[] | null | undefined;
};

const TipoPrestadorSelect = ({ tipo, setTipo, especialidad, setEspecialidad, especialidades }: Props) => {
  useEffect(() => {
    if (tipo === TiposPrestador.Bioquimico || tipo === TiposPrestador.Odontologo)
      setEspecialidad(tiposPrestadores[tipo].especialidades[0].Codigo);
    if (tipo !== TiposPrestador.Medico && tipo !== TiposPrestador.Kinesiologo) setEspecialidad('0');
  }, [tipo, setEspecialidad]);
  const showEspecialidad =
    tipo === TiposPrestador.Medico ||
    tipo === TiposPrestador.PrestadoresDiscapacidad ||
    tipo === TiposPrestador.Kinesiologo;

  return (
    <>
      <Select
        label="Tipo de profesional"
        id="tipo"
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setEspecialidad('');
        }}
      >
        {tiposPrestadores.map(({ name, id }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </Select>
      <Select
        id="especialidad"
        label="Especialidad"
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
        disabled={tipo === TiposPrestador.Bioquimico || tipo === TiposPrestador.Odontologo}
        hidden={!showEspecialidad}
      >
        {(tipo === TiposPrestador.Medico || tipo === TiposPrestador.Kinesiologo) && (
          <option value="">Seleccione especialidad</option>
        )}
        {tipo === TiposPrestador.PrestadoresDiscapacidad && <option value="0">Todas</option>}
        {especialidades &&
          especialidades.map(({ Codigo, Descripcion }) => (
            <option key={Codigo} value={Codigo}>
              {capitalizeText(Descripcion)}
            </option>
          ))}
      </Select>
    </>
  );
};

export default TipoPrestadorSelect;
