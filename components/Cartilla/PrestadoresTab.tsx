import { Especialidad } from '@appTypes/especialidad';
import { TiposPrestador } from '@appTypes/prestador';
import { capitalizeText, downloadBlob, downloadFile, getEnumKeyByEnumValue } from '@lib/utils';
import React, { useState } from 'react';
import useLocalidades from 'hooks/cartilla/useLocalidades';
import { NEXT_URL } from 'config';
import dynamic from 'next/dynamic';
import axios from 'axios';
import usePrestadores from 'hooks/cartilla/usePrestadores';
import { tiposPrestadores } from './TipoPrestadorSelect';
import PrestadoresForm from './PrestadoresForm';

type Props = {
  payload: {
    especialidades: Especialidad[] | null;
  };
};
const PrestadoresList = dynamic(() => import('./PrestadoresList'), {
  ssr: false,
});

const files = [
  { tipo: '1', especialidad: '0', localidad: '0', url: './docs/Todas las especialidades.pdf' },
  { tipo: '1', especialidad: '0', localidad: '1369', url: './docs/Todas las especialidades-La Plata.pdf' },
  { tipo: '1', especialidad: '3', localidad: '0', url: './docs/Clinica General.pdf' },
  { tipo: '1', especialidad: '3', localidad: '1369', url: './docs/Clinica General-La Plata.pdf' },
  { tipo: '1', especialidad: '90', localidad: '0', url: './docs/Medicina General.pdf' },
  { tipo: '1', especialidad: '90', localidad: '1369', url: './docs/Medicina General-La Plata.pdf' },
];

const PrestadoresTab = ({ payload }: Props) => {
  const [tipo, setTipo] = useState('1');
  const [localidad, setLocalidad] = useState('0');
  const [nombre, setNombre] = useState('');
  const [especialidadDesc, setEspecialidadDesc] = useState<string | undefined>('');
  const [especialidad, setEspecialidad] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { localidades } = useLocalidades();
  const especialidadesOptions =
    tipo === TiposPrestador.Medico ||
    tipo === TiposPrestador.PrestadoresDiscapacidad ||
    tipo === TiposPrestador.Instituciones
      ? payload.especialidades
      : tiposPrestadores.find((esp) => esp.id === tipo)?.especialidades;

  const { prestadores, mutate, isLoading, error } = usePrestadores(nombre, tipo, especialidad, localidad);

  const printNombre = nombre ? `Nombre: ${nombre} ,` : '';
  const printSubtitle = `${printNombre} ${getEnumKeyByEnumValue(TiposPrestador, tipo)} - ${
    (especialidadDesc && capitalizeText(especialidadDesc)) || 'Todas las especialidades'
  }`;
  const downloadPdf = () => {
    setIsGeneratingPdf(true);
    const localidadName = localidades.find((loc) => loc.gecrosID === localidad)?.nombre;
    const fileName = `Cartilla-OSAP-${printSubtitle}${localidadName ? `-${localidadName}` : ''}.pdf`;
    const file = files.find((f) => f.especialidad === especialidad && f.localidad === localidad && f.tipo === tipo);
    if (file) {
      setIsGeneratingPdf(false);
      return downloadFile(file.url, fileName);
    }

    axios
      .get(
        `${NEXT_URL}/generatePdf?nombre=${
          nombre || ''
        }&tipo=${tipo}&especialidad=${especialidad}&localidad=${localidad}&subtitulo=${printSubtitle}`,
        { responseType: 'blob' }
      )
      .then((response) => {
        const blob = new Blob([response.data]);
        setIsGeneratingPdf(false);
        downloadBlob(blob, fileName);
      });
  };

  return (
    <div className="flex flex-wrap gap-6 lg:flex-nowrap">
      <PrestadoresForm
        handleSearch={mutate}
        isLoading={isLoading}
        localidad={localidad}
        setLocalidad={setLocalidad}
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        nombre={nombre}
        setNombre={setNombre}
        tipo={tipo}
        setTipo={setTipo}
        localidades={localidades}
        especialidades={especialidadesOptions}
        setEspecialidadDesc={setEspecialidadDesc}
      />
      <div className="flex grow justify-center">
        <PrestadoresList
          isLoading={isLoading}
          prestadores={prestadores}
          error={error}
          downloadPdf={downloadPdf}
          isGeneratingPdf={isGeneratingPdf}
        />
      </div>
    </div>
  );
};

export default PrestadoresTab;
