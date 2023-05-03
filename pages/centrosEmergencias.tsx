import PageTitle from '@components/Base/PageTitle';
import CentroAtencion from '@components/CentroAtencion';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const centros = [
  {
    localidad: 'San Nicolás',
    title: 'CEM S.A',
    address: { href: 'https://goo.gl/maps/bcdVcmbmrVcyqbty9', label: 'Pellegrini 340' },
    phones: [
      { href: 'tel:03364423672', label: '(0336)4423672' },
      { href: 'tel:03364429752', label: '4429752' },
      { href: 'tel:03364430143', label: '4430143' },
      { href: 'tel:03364430300', label: '4430300' },
    ],
  },
  {
    localidad: 'Ramallo',
    title: 'CEM S.A',
    address: { href: 'https://goo.gl/maps/mHbSZaECLLYV1SDG8', label: 'B.Mitre 1315' },
    phones: [
      { href: 'tel:03407422000', label: '(03407)422000' },
      { href: 'tel:08005555200', label: '0800 555 5200' },
    ],
  },
  {
    localidad: 'Partido de La Plata',
    title: 'vittal',
    address: { href: 'https://goo.gl/maps/mpCzHAD5ro84yh7t9', label: 'Av.Alvarez Thomas 1154 CABA' },
    phones: [
      { href: 'tel:01140008888', label: '(011)40008888' },
      { href: 'tel:08103338888', label: '0810 333 8888' },
    ],
  },
  {
    localidad: 'Morón, Quilmes, Varela, Haedo y zonas de influencia',
    title: 'vittal',
    address: { href: 'https://goo.gl/maps/mpCzHAD5ro84yh7t9', label: 'Av.Alvarez Thomas 1154 CABA' },
    phones: [
      { href: 'tel:01140008888', label: '(011)40008888' },
      { href: 'tel:08103338888', label: '0810 333 8888' },
    ],
  },
  {
    localidad: 'Rosario',
    title: 'vittal',
    address: { href: 'https://goo.gl/maps/8iNhdLnUR6Pm4ckh6', label: 'Av.Francia 1530' },
    phones: [{ href: 'tel:08102227510', label: '0810 222 7510' }],
  },
  {
    localidad: 'Villa Constitución, Rueda, Pavón, Godoy, Empalme',
    title: 'EMCOR',
    address: { href: 'https://goo.gl/maps/YoDoMzDYjkXBoXEQ7', label: 'Rivadavia 1340, Villa Constitución' },
    phones: [
      { href: 'tel:03400476476', label: '(03400)476476' },
      { href: 'tel:03400477333', label: '477333' },
    ],
  },
  {
    localidad: 'Arroyo Seco',
    title: 'Emergencias Regionales',
    address: { href: 'https://goo.gl/maps/dzmSqUsuPTk1KJNV9', label: 'Gálvez 930' },
    phones: [{ href: 'tel:03402427400', label: '(03402)427400' }],
  },
];

const CentrosEmergencias: NextPage = () => {
  return (
    <div className=" osap-container">
      <Head>
        <title>Emergencias - OSAP</title>
        <meta name="description" content="Servicios de atencion ante emergencias disponibles en cada localidad" />
      </Head>

      <PageTitle title="Atención ante emergencias" />
      <section className="rounded-sm  bg-slate-50 p-4 text-left lg:columns-2">
        {centros.map((centro) => {
          return (
            <div className="break-inside-avoid-column">
              <h2 className="mb-1 text-2xl text-orange-700">{centro.localidad}</h2>
              <CentroAtencion smallTitle address={centro.address} phones={centro.phones} title={centro.title} />
            </div>
          );
        })}
      </section>
      <p className="mb-3 mt-12 text-left text-lg text-slate-600 lg:w-4/5">
        • Se denomina emergencia a toda situación crítica en que la vida, los órganos y/o funciones vitales del paciente
        puedan quedar comprometidos de no mediar una rápida y adecuada asistencia profesional.
      </p>
      <p className="text-left text-lg font-semibold text-slate-600 lg:w-4/5">
        • Este servicio comprende la presencia en el lugar solicitado de un profesional médico equipado con el
        instrumental necesario, acompañado de chofer y enfermero apto para realizar un eventual traslado del paciente al
        centro asistencial que le correspondiera siempre que el profesional lo considere conveniente para una eficaz
        atención.
      </p>
    </div>
  );
};

export default CentrosEmergencias;
