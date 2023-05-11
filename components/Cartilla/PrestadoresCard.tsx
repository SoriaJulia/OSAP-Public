import { Prestador } from '@appTypes/prestador';
import { capitalizeText } from '@lib/utils';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import { Bookmark, MapPin, Phone } from 'phosphor-react';
import React from 'react';

const PrestadoresCard = ({ prestador }: { prestador: Prestador }) => {
  const { nombre, calle, telefono, depto, nroPuerta, piso, idLocalidad, Especialidades } = prestador;
  const { localidades } = useLocalidades();

  const localidad = localidades.find((loc) => loc.gecrosID === idLocalidad.toString());
  const domicilio = `${capitalizeText(calle)} Nº ${nroPuerta}${piso && piso !== '0' ? `, Piso: ${piso}` : ''}${
    depto.trim() ? `, Depto: ${depto}` : ''
  } ${localidad ? `${localidad?.nombre || ''}, ${localidad?.provincia}` : ''}`;
  return (
    <div className="card flex w-full flex-wrap items-start text-left lg:max-h-60 xl:max-h-60">
      <span className="flex flex-col items-baseline justify-start gap-4 p-2 text-lg text-blue-500 print:w-full lg:w-full">
        <p className="flex gap-1 font-display text-2xl">{capitalizeText(nombre)}</p>
        <span className="flex items-stretch gap-1 text-sm text-blue-700">
          <Bookmark size={18} className="mt-0.5 shrink-0" /> {Especialidades.trimEnd()}
        </span>
      </span>
      <div className="flex flex-wrap">
        <span className="flex  flex-wrap items-center gap-1 p-2 text-gray-600 print:w-2/3">
          <p className="flex items-center gap-1">
            <MapPin className="print:hidden" />
            Domicilio:
          </p>
          {domicilio}
        </span>
        <span className="flex   items-center gap-1  p-2 text-gray-600 print:w-1/3">
          <p className="flex items-center gap-1">
            <Phone className="print:hidden" />
            Teléfono:
          </p>
          {telefono}
        </span>
      </div>
    </div>
  );
};

export default PrestadoresCard;
