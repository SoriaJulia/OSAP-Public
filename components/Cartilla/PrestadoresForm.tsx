import { Especialidad } from '@appTypes/especialidad';
import { Localidad } from '@appTypes/localidad';
import { TiposPrestador } from '@appTypes/prestador';
import { ButtonMouseEventHandler, SetState } from '@appTypes/reactCommon';
import InputField from '@components/Base/Fields/Input';
import Select from '@components/Base/Fields/Select';
import { changeTextInput } from '@lib/utils';
import Button from 'components/Base/Button';

import { SpinnerGap, MagnifyingGlass } from 'phosphor-react';
import React from 'react';
import TipoPrestadorSelect from './TipoPrestadorSelect';

type Props = {
  tipo: string;
  setTipo: SetState<string>;
  especialidades: Especialidad[] | null | undefined;
  nombre: string;
  localidad: string;
  localidades: Localidad[];
  setLocalidad: SetState<string>;
  setNombre: SetState<string>;
  handleSearch: () => void;
  isLoading: boolean;
  setEspecialidad: SetState<string>;
  especialidad: string;
  setEspecialidadDesc: SetState<string | undefined>;
};

const PrestadoresForm = ({
  tipo,
  setTipo,
  especialidades,
  nombre,
  localidad,
  localidades,
  setLocalidad,
  setNombre,
  handleSearch,
  setEspecialidad,
  especialidad,
  isLoading,
  setEspecialidadDesc,
}: Props) => {
  const searchPrestadores: ButtonMouseEventHandler = async (e) => {
    e.preventDefault();
    handleSearch();
    setEspecialidadDesc(especialidades?.find((elem) => elem.Codigo.toString() === especialidad)?.Descripcion);
  };
  return (
    <form className="flex min-w-fit flex-col px-2">
      <Select id="localidad" label="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
        <option value="0">Todas</option>
        {localidades.map((loc) => (
          <option value={loc.gecrosID} key={loc.gecrosID}>
            {loc.nombre}
          </option>
        ))}
      </Select>
      <TipoPrestadorSelect
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        tipo={tipo}
        setTipo={setTipo}
        especialidades={especialidades}
      />
      <InputField
        id="nombre"
        label="Nombre"
        placeholder="Ana"
        helpText="Ingresá por lo menos 3 letras de su nombre o apellido"
        value={nombre}
        onChange={changeTextInput(setNombre)}
      />
      <Button
        label={` ${isLoading ? 'Buscando...' : 'Buscar'} `}
        className="mr-4 mt-3 self-end"
        trailingIcon={isLoading ? <SpinnerGap className="animate-spin" /> : <MagnifyingGlass />}
        disabled={
          isLoading ||
          (tipo === TiposPrestador.Medico && !especialidad) ||
          (tipo === TiposPrestador.Kinesiologo && !especialidad)
        }
        onClick={searchPrestadores}
      />
    </form>
  );
};

export default PrestadoresForm;
