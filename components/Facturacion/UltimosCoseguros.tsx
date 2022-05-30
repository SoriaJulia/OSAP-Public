import _ from 'lodash';
import Router from 'next/router';
import React from 'react';
import { Coseguro } from '../../types/coseguro';
import Button from '../Base/Button';
import CosegurosXPeriodoCard from './CosegurosXPeriodoCard';

const cosegurosWS: Array<Coseguro> = [
  {
    id: 12132,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'CONSULTA MEDICA',
    importe: 500,
    periodo: '202204',
    prestador: 'ORITI TIZIO MARIANELLA / SANAT. D/L/MUJER(PERINAT)(505-512)',
  },
  {
    id: 12162,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'PSICOTERAPIAS INDIVIDUALES',
    importe: 500,
    periodo: '202204',
    prestador: 'PSICORED (PRI)(509-516) / PSICORED (PRI)(509-516)',
  },
  {
    id: 12172,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'CITOLOGIA EXFOLIATIVA ONCOLOGICA.',
    importe: 500,
    periodo: '202204',
    prestador: 'ORITI TIZIO MARIANELLA / SANAT. D/L/MUJER(PERINAT)(505-512)',
  },
  {
    id: 12132,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'CONSULTA MEDICA',
    importe: 500,
    periodo: '202203',
    prestador: 'ORITI TIZIO MARIANELLA / SANAT. D/L/MUJER(PERINAT)(505-512)',
  },
  {
    id: 12162,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'PSICOTERAPIAS INDIVIDUALES',
    importe: 500,
    periodo: '202203',
    prestador: 'PSICORED (PRI)(509-516) / PSICORED (PRI)(509-516)',
  },
  {
    id: 12172,
    fecha: '2022-05-25T00:00:00',
    concepto: 'COSEGURO - 6835914 /1',
    detalle: 'CITOLOGIA EXFOLIATIVA ONCOLOGICA.',
    importe: 500,
    periodo: '202203',
    prestador: 'ORITI TIZIO MARIANELLA / SANAT. D/L/MUJER(PERINAT)(505-512)',
  },
];
const cosegurosPorPeriodo = _.groupBy<Coseguro>(cosegurosWS, (coseg) => coseg.periodo);
const UltimosCoseguros = () => {
  return (
    <article className="flex w-full flex-col overflow-x-auto bg-white py-4 px-6 text-left md:m-2 lg:my-2">
      <div className="mb-4 flex  gap-4 sm:justify-between ">
        <h4 className=" text-lg text-orange-600">Ultimos Coseguros</h4>
        <Button label="Ver todos" variant="blueText" onClick={() => Router.push('/afiliados/facturacion')} />
      </div>
      <div className="flex flex-wrap gap-3">
        {Object.values(cosegurosPorPeriodo)
          .reverse()
          .map((coseguros) => {
            return <CosegurosXPeriodoCard key={coseguros[0].periodo} coseguros={coseguros} />;
          })}
      </div>
    </article>
  );
};

export default UltimosCoseguros;
