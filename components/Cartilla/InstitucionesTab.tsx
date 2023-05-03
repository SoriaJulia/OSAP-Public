import { useRef, useState } from 'react';
import { changeTextInput } from '@lib/utils';
import EmptyListMessage from 'components/Base/EmptyListMessage';
import _ from 'lodash';
import { Download } from 'phosphor-react';
import { useReactToPrint } from 'react-to-print';
import useInstituciones from 'hooks/cartilla/useInstituciones';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import PrintHeader from 'components/Base/PrintHeader';
import Select from '@components/Base/Fields/Select';
import InputField from '@components/Base/Fields/Input';
import InstitucionesCard from './InstitucionesCard';

const InstitucionesTab = () => {
  const [localidad, setLocalidad] = useState('0');
  const [nombre, setNombre] = useState('');
  const listRef = useRef(null);
  const { localidades } = useLocalidades();
  const { instituciones, isLoading } = useInstituciones();
  const institucionesList = instituciones.filter(
    (institucion) =>
      (localidad === '0' || institucion.localidad.gecrosID === localidad) &&
      institucion.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase())
  );
  const handlePrint = useReactToPrint({ content: () => listRef.current, documentTitle: 'OSAP-CartillaInstituciones' });
  return (
    <div className="relative">
      <div className="mb-4 mr-12 flex flex-col gap-4 lg:flex-row">
        <Select
          id="localidad"
          label="Localidad"
          className="w-max"
          value={localidad}
          labelPosition="left"
          onChange={(e) => setLocalidad(e.target.value)}
        >
          <option value="0">Todas</option>
          {localidades.map((loc) => (
            <option value={loc.gecrosID} key={loc.gecrosID}>
              {loc.nombre}
            </option>
          ))}
        </Select>
        <InputField
          id="nombre"
          label="Nombre"
          labelPosition="left"
          value={nombre}
          onChange={changeTextInput(setNombre)}
        />
      </div>
      <div className="flex flex-wrap gap-4 print:p-4" ref={listRef}>
        <PrintHeader
          title="Cartilla de Instituciones"
          subtitle={`Localidad: ${_.find(localidades, (loc) => loc.gecrosID === localidad)?.nombre || 'Todas'}${
            nombre && `, Nombre: ${nombre}`
          }`}
        />
        {!_.isEmpty(institucionesList) ? (
          <>
            {institucionesList.map((institucion) => (
              <InstitucionesCard institucion={institucion} key={institucion._id} />
            ))}
            <Download
              onClick={handlePrint}
              size={32}
              weight="duotone"
              className="absolute right-2 top-2 text-teal-500 print:hidden"
              alt="Descargar o imprimir lista"
            />
          </>
        ) : (
          <EmptyListMessage text="No se encontraron Instituciones..." />
        )}
      </div>
    </div>
  );
};

export default InstitucionesTab;
