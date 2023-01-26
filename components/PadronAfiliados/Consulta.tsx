import { ButtonMouseEventHandler } from '@appTypes/reactCommon';
import Button from '@components/Base/Button';
import InputField from '@components/Base/Fields/Input';
import SelectField from '@components/Base/Fields/Select';
import PageTitle from '@components/Base/PageTitle';
import TableSkeleton from '@components/Base/TableSkeleton';
import { changeTextInput } from '@lib/utils';
import useAfiliados from 'hooks/afiliados/useAfiliados';
import { Info, MagnifyingGlass } from 'phosphor-react';

import React, { useState } from 'react';
import Table from './Table';

type Options = {
  value: optsKeys;
  title: string;
  helpText: string;
  placeholder: string;
};
const opts = {
  Numero: 'Numero',
  Nombre: 'Nombre',
  Documento: 'Documento',
};

type optsKeys = keyof typeof opts;
const SearchOptions: Options[] = [
  {
    value: 'Numero',
    title: 'Número de afiliado',
    helpText: 'Ingresar el número de afiliado presente en la credencial',
    placeholder: '111111',
  },
  {
    value: 'Documento',
    title: 'Documento',
    helpText: 'Ingresar solo los numeros del Documento',
    placeholder: '99111222',
  },
  {
    value: 'Nombre',
    title: 'Apellido y/o Nombre',
    helpText: 'Ingresar primero el apellido y si lo desea el nombre separado por una coma (,)',
    placeholder: 'Perez, Juan',
  },
];

const PadronAfiliados = () => {
  const [searchText, setSearchText] = useState('');
  const [searchOpt, setSearchOpt] = useState(SearchOptions[0].value);
  const helpText = SearchOptions.find((opt) => opt.value === searchOpt)?.helpText;
  const placeholder = SearchOptions.find((opt) => opt.value === searchOpt)?.placeholder;
  const [showMessage, setShowMessage] = useState(false);
  const { afiliados, mutate, isLoading, isSuccess, isError } = useAfiliados(searchOpt, searchText);
  const search: ButtonMouseEventHandler = async (e) => {
    e.preventDefault();
    mutate();
    setShowMessage(true);
  };
  const headers = ['Número', 'Nombre y Apellido', 'Edad', 'Documento', 'Estado', '   ...'];
  return (
    <>
      <PageTitle title="Consultá el padrón de afiliados" />
      <div className="rounded bg-white/80 p-8">
        <form className="flex flex-wrap items-start gap-5">
          <SelectField
            label="Buscar por"
            id="searchOpt"
            value={searchOpt}
            onChange={(e) => {
              setShowMessage(false);
              setSearchOpt(e.target.value as optsKeys);
            }}
            labelPosition="left"
            className="w-full md:w-96"
          >
            {SearchOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.title}
              </option>
            ))}
          </SelectField>

          <InputField
            id="SearchText"
            label=""
            value={searchText}
            onChange={changeTextInput(setSearchText)}
            helpText={helpText}
            placeholder={placeholder}
            className="w-full md:w-96"
          />

          <Button label="Buscar" showIconOnMobile onClick={search} leadingIcon={<MagnifyingGlass size={24} />} />
        </form>
        {isSuccess &&
          (afiliados.length <= 0 ? (
            showMessage && (
              <p className="mt-3 flex items-center gap-3 rounded bg-yellow-100/60 p-4 text-lg text-amber-700">
                <Info size={26} weight="bold" /> No se encontraron resultados para{' '}
                {SearchOptions.find((opt) => opt.value === searchOpt)?.title}: {searchText}
              </p>
            )
          ) : (
            <Table data={afiliados} />
          ))}
        {isLoading && <TableSkeleton headers={headers} />}
        {isError &&
          showMessage &&
          (searchOpt === 'Documento' ? (
            <p className="mt-3 flex items-center gap-3 rounded bg-rose-100/60 p-4 text-lg text-rose-700">
              <Info size={26} weight="bold" /> Para la busqueda por{' '}
              {SearchOptions.find((opt) => opt.value === searchOpt)?.title} solo ingresar números
            </p>
          ) : (
            <p className="mt-3 flex items-center gap-3 rounded bg-rose-100/60 p-4 text-lg text-rose-700">
              <Info size={26} weight="bold" /> Ocurrió un error procesando tu solicitud, por favor volve a intentar en
              unos minutos y si el error persiste contactanos
            </p>
          ))}
      </div>
    </>
  );
};

export default PadronAfiliados;
