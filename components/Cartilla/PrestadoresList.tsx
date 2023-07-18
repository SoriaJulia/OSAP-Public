import { Prestador } from '@appTypes/prestador';
import EmptyListMessage from '@components/Base/EmptyListMessage';
import { Lottie } from '@components/Base/Lottie';
import SearchInput from '@components/Base/SearchInput';
import { changeTextInput } from '@lib/utils';
import { isEmpty } from 'lodash';
import searchGif from 'public/animations/search-doctor.json';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import { getPrestadoresporLocalidad } from '@lib/cartilla';
import React, { useMemo, useState } from 'react';
import { CircleNotch, Download } from 'phosphor-react';
import PrestadoresCard from './PrestadoresCard';

type Props = {
  isLoading: boolean;
  prestadores: Prestador[] | null | undefined;
  error: string | null;
  downloadPdf: () => void;
  isGeneratingPdf: boolean;
};

const PrestadoresList = ({ isLoading, prestadores, error, downloadPdf, isGeneratingPdf }: Props) => {
  const { localidades } = useLocalidades();
  const [search, setSearch] = useState('');
  const filteredList = useMemo(
    () =>
      prestadores?.filter((prest) => (prest.nombre ? prest.nombre.toLowerCase().includes(search.toLowerCase()) : null)),
    [prestadores, search]
  );
  const prestadoresXLoc = getPrestadoresporLocalidad(filteredList || []);

  if (isLoading) return <Lottie animationData={searchGif} className="hidden self-center md:block" />;

  if (!prestadores && !error)
    return (
      <img className="hidden w-3/5 p-2 pl-8 md:block" src="./img/undraw_doctors.svg" alt="Ilustración de doctores" />
    );

  return (
    <div className="mt-4 flex flex-wrap gap-4 print:mt-0 print:p-4">
      <div className="flex w-full items-end justify-between text-gray-500">
        <span
          className={`text-sm print:m-0 lg:ml-8 ${isEmpty(filteredList) ? 'hidden' : 'flex'}`}
        >{`${filteredList?.length} resultados...`}</span>
        <SearchInput value={search} onChange={changeTextInput(setSearch)} />
        <button
          onClick={downloadPdf}
          className="ml-6 rounded-full p-2 text-teal-500 hover:bg-slate-100/80 disabled:animate-spin disabled:bg-slate-100"
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? (
            <CircleNotch size={28} className="animate-pulse" weight="duotone" alt="Generando archivo" />
          ) : (
            <Download size={28} weight="duotone" alt="Descargar o imprimir lista" />
          )}
        </button>
      </div>
      {isEmpty(filteredList) ? (
        <div className=" h-[60vh]">
          <EmptyListMessage text="No se encontraron Prestadores..." />
        </div>
      ) : (
        <div className="flex h-[70vh] w-auto flex-wrap content-start items-start gap-4 overflow-y-auto scroll-smooth p-2 print:m-0 print:h-auto lg:ml-6">
          {Object.entries(prestadoresXLoc).map(([locId, prestaodresLoc]) => {
            const localidad = localidades.find((loc) => loc.gecrosID === locId);
            if (!localidad?.nombre) return;
            return (
              <>
                <p
                  className="mt-4 text-2xl font-thin tracking-tight text-slate-400 first:mt-0"
                  key={localidad?.gecrosID}
                >
                  {localidad?.nombre}
                </p>
                {prestaodresLoc.map((prestador) => {
                  return (
                    <PrestadoresCard
                      key={`${prestador.id}_${prestador.calle}${prestador.nroPuerta}`}
                      prestador={prestador}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PrestadoresList;
