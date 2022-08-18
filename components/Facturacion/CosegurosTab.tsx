import PrintHeader from '@components/Base/PrintHeader';
import { getFilteredCosegurosXPeriodo } from '@lib/facturacion';
import { changeNumberInput, currentYear } from '@lib/utils';
import useCoseguros from 'hooks/coseguros/useCoseguros';
import { isEmpty } from 'lodash';
import { Download, Info } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Field from '../Base/Field';
import CosegurosXPeriodoCard from './CosegurosXPeriodoCard';

type Props = {
  agentId: string;
};

const CosegurosTab = ({ agentId }: Props) => {
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentYear);
  const { coseguros, isLoading } = useCoseguros(agentId);
  const cosegurosXPeriodo = getFilteredCosegurosXPeriodo(coseguros, selectedYear);
  const listRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => listRef.current,
    documentTitle: 'OSAP-CartillaPrestadores',
  });

  return (
    <div>
      <div className="my-2 flex flex-wrap items-center justify-end gap-4">
        <Field
          label="Año"
          type="number"
          labelPosition="left"
          value={selectedYear}
          onChange={changeNumberInput(setSelectedYear)}
          max={currentYear}
        />
        <Download
          onClick={handlePrint}
          size={44}
          weight="duotone"
          className="mr-6 rounded-full p-2 text-teal-500 hover:bg-slate-100/80"
          alt="Descargar o imprimir lista"
        />
      </div>
      <div className="flex flex-wrap gap-5 pt-5 print:px-4" ref={listRef}>
        <PrintHeader title={`Coseguros año ${selectedYear}`} />
        {!isEmpty(cosegurosXPeriodo) ? (
          Object.values(cosegurosXPeriodo)
            .reverse()
            .map((coseg) => {
              return <CosegurosXPeriodoCard isLoading={isLoading} key={coseg[0].periodo} coseguros={coseg} />;
            })
        ) : (
          <div className="mb-3 mt-1 flex grow items-center justify-center gap-1 text-xl text-teal-700">
            <Info size={24} weight="fill" />
            No se encontraron coseguros...
          </div>
        )}
      </div>
    </div>
  );
};

export default CosegurosTab;
