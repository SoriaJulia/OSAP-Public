import { Especialidad } from '@appTypes/especialidad';
import { TiposPrestador } from '@appTypes/prestador';
import { capitalizeText, getEnumKeyByEnumValue } from '@lib/utils';
import _ from 'lodash';
import React, { useState } from 'react';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import usePrestadores from 'hooks/cartilla/usePrestadores';
import { tiposPrestadores } from './TipoPrestadorSelect';
import PrestadoresForm from './PrestadoresForm';
import PrestadoresList from './PrestadoresList';

type Props = {
  payload: {
    especialidades: Especialidad[] | null;
  };
};

const PrestadoresTab = ({ payload }: Props) => {
  const [tipo, setTipo] = useState('1');
  const [localidad, setLocalidad] = useState('0');
  const [nombre, setNombre] = useState('');
  const [especialidadDesc, setEspecialidadDesc] = useState<string | undefined>('');
  const [especialidad, setEspecialidad] = useState('');
  const { localidades } = useLocalidades();

  const especialidadesOptions =
    tipo === TiposPrestador.Medico ||
    tipo === TiposPrestador.PrestadoresDiscapacidad ||
    tipo === TiposPrestador.Instituciones
      ? payload.especialidades
      : tiposPrestadores.find((esp) => esp.id === tipo)?.especialidades;

  const { prestadores, mutate, isLoading, error } = usePrestadores(nombre, tipo, especialidad, localidad);

  const printSubtitle = `Localidad: ${_.find(localidades, (loc) => loc.gecrosID === localidad)?.nombre || 'Todas'}
    ${nombre && `, Nombre: ${nombre}`}, 
    Tipo: ${getEnumKeyByEnumValue(TiposPrestador, tipo)}, 
    Especialidad: ${especialidadDesc && capitalizeText(especialidadDesc)}`;

  return (
    <div className="flex flex-wrap gap-6 lg:flex-nowrap">
      <PrestadoresForm
        handleSearch={mutate}
        isLoading={isLoading}
        localidad={localidad}
        setLocalidad={setLocalidad}
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        nombre={nombre}
        setNombre={setNombre}
        tipo={tipo}
        setTipo={setTipo}
        localidades={localidades}
        especialidades={especialidadesOptions}
        setEspecialidadDesc={setEspecialidadDesc}
      />
      <div className="flex grow justify-center">
        <PrestadoresList isLoading={isLoading} prestadores={prestadores} printSubtitle={printSubtitle} error={error} />
      </div>
    </div>
  );
};

export default PrestadoresTab;
