import _ from 'lodash';
import { MagnifyingGlass } from 'phosphor-react';
import React from 'react';
import { Coseguro } from '../../types/coseguro';
import Button from '../Base/Button';
import Field from '../Base/Field';
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
];
const cosegurosPorPeriodo = _.groupBy<Coseguro>(cosegurosWS, (coseg) => coseg.periodo);
const CosegurosList = () => {
  return (
    <div>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field label="Periodo" type="month" labelPosition="left" />
        <Field label="Prestador" type="text" labelPosition="left" />
        <Button
          variant="blueFill"
          label="Buscar"
          className="h-12 text-lg"
          trailingIcon={<MagnifyingGlass weight="bold" />}
        />
      </div>
      <div className="flex flex-wrap gap-5 pt-5">
        {Object.values(cosegurosPorPeriodo)
          .reverse()
          .map((coseguros) => {
            return <CosegurosXPeriodoCard key={coseguros[0].periodo} coseguros={coseguros} />;
          })}
      </div>
    </div>
  );
};

export default CosegurosList;
