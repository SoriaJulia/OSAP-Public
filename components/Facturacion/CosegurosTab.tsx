import InputField from '@components/Base/Fields/Input';
import PrintHeader from '@components/Base/PrintHeader';
import { getFilteredCosegurosXPeriodo } from '@lib/facturacion';
import { changeNumberInput, currentYear } from '@lib/utils';
import useCoseguros from 'hooks/coseguros/useCoseguros';
import { Download } from 'phosphor-react';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CosegurosList from './CosegurosList';

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
        <InputField
          id="anio"
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
      <div className="pt-5 print:px-4" ref={listRef}>
        <PrintHeader title={`Coseguros año ${selectedYear}`} />
        <CosegurosList isLoading={isLoading} periodos={cosegurosXPeriodo} />
      </div>
    </div>
  );
};

export default CosegurosTab;
