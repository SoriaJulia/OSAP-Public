import { Prestador } from '@appTypes/prestador';
import { capitalizeText } from '@lib/utils';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import { MapPin, Phone, UserSquare } from 'phosphor-react';
import React from 'react';

const PrestadoresCard = ({ prestador }: { prestador: Prestador }) => {
  const { nombre, calle, telefono, depto, nroPuerta, piso, idLocalidad, especialidad } = prestador;
  const { localidades } = useLocalidades();

  const localidad = localidades.find((loc) => loc.gecrosID === idLocalidad.toString());
  const domicilio = `${capitalizeText(calle)} Nº ${nroPuerta}${piso && piso !== '0' ? `, Piso: ${piso}` : ''}${
    depto.trim() ? `, Depto: ${depto}` : ''
  } ${localidad ? `${localidad?.nombre || ''}, ${localidad?.provincia}` : ''}`;
  return (
    <div className="card flex w-full flex-wrap items-start text-left lg:max-h-52 xl:max-h-40">
      <span className="flex flex-wrap items-baseline justify-start gap-4 p-2 text-lg text-blue-700 print:w-full lg:w-full">
        <p className="flex gap-1">
          <UserSquare size={26} />
          {capitalizeText(nombre)}
        </p>
      </span>
      <span className="flex w-full flex-wrap items-center gap-1 p-2 text-gray-600 print:w-2/3 lg:w-2/3">
        <p className="flex items-center gap-2">
          <MapPin className="print:hidden" />
          Domicilio:
        </p>
        {domicilio}
      </span>
      <span className="flex w-56 items-center gap-1 p-2  text-gray-600 print:w-1/3 lg:w-1/3">
        <p className="flex items-center gap-2">
          <Phone className="print:hidden" />
          Telefono:
        </p>
        {telefono}
      </span>
    </div>
  );
};

export default PrestadoresCard;
