import { Prestador } from '@appTypes/prestador';
import EmptyListMessage from '@components/Base/EmptyListMessage';
import { Lottie } from '@components/Base/Lottie';
import PrintHeader from '@components/Base/PrintHeader';
import SearchInput from '@components/Base/SearchInput';
import { changeTextInput } from '@lib/utils';
import { isEmpty } from 'lodash';
import { Download } from 'phosphor-react';
import searchGif from 'public/animations/search-doctor.json';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrestadoresCard from './PrestadoresCard';

type Props = {
  isLoading: boolean;
  prestadores: Prestador[] | null | undefined;
  printSubtitle: string;
  error: string | null;
};

const PrestadoresList = ({ isLoading, prestadores, printSubtitle, error }: Props) => {
  const [search, setSearch] = useState('');
  const filteredList = prestadores?.filter((prest) => prest.nombre.toLowerCase().includes(search.toLowerCase()));
  const listRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => listRef.current,
    documentTitle: 'OSAP-CartillaPrestadores',
  });
  if (isLoading) return <Lottie animationData={searchGif} className="hidden self-center md:block" />;
  if (!prestadores && !error)
    return (
      <img className="hidden w-3/5 p-2 pl-8 md:block" src="./img/undraw_doctors.svg" alt="Ilustración de doctores" />
    );
  return (
    <div className="mt-4 flex flex-wrap gap-4  print:mt-0 print:p-4" ref={listRef}>
      <PrintHeader title="Cartilla de Prestadores" subtitle={printSubtitle} />
      <div className="flex w-full items-end justify-between text-gray-500">
        <span
          className={`text-sm print:m-0 lg:ml-8 ${isEmpty(filteredList) ? 'hidden' : 'flex'}`}
        >{`${filteredList?.length} resultados...`}</span>
        <SearchInput value={search} onChange={changeTextInput(setSearch)} />
        <Download
          onClick={handlePrint}
          size={44}
          weight="duotone"
          className="mr-6 rounded-full p-2 text-teal-500 hover:bg-slate-100/80 print:hidden"
          alt="Descargar o imprimir lista"
        />
      </div>
      <EmptyListMessage
        text="No se encontraron Prestadores..."
        className={`${isEmpty(filteredList) ? 'flex' : 'hidden'}`}
      />
      <div className="flex h-[70vh] w-auto flex-wrap content-start items-start gap-4 overflow-y-auto scroll-smooth p-2 print:m-0 print:h-auto lg:ml-6">
        {filteredList?.map((prestador) => (
          <PrestadoresCard key={`${prestador.id}_${prestador.idInstitucion}`} prestador={prestador} />
        ))}
      </div>
    </div>
  );
};

export default PrestadoresList;
