import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import PageTitle from '../components/Base/PageTitle';
import CentroAtencion from '../components/CentroAtencion';

const listCentros = [
  {
    title: 'Sede Central',
    address: { href: 'https://goo.gl/maps/q5kNyRQML5KfYiam8', label: 'Moreno 187 (San Nicolás)' },
    phones: [
      { href: 'tel:03364425632', label: '(0336)4425632' },
      { href: 'tel:03364429692', label: '4429692' },
      { href: 'tel:03364450440', label: '4450440' },
      { href: 'tel:03364450099', label: '4450099' },
    ],
    wsp: [{ href: 'https://wa.me/+5491154529960', label: '+54 9 11 5452-9960' }],
  },
  {
    title: 'Centro de Medicina Preventiva OSAP',
    titleHref: '/medicinaPreventiva',
    address: { href: 'https://goo.gl/maps/i4F37QpXTJU79GaPA', label: 'Maipú 36 (San Nicolás)' },
    phones: [
      { href: 'tel:03364450966', label: '(0336)4450966' },
      { href: 'tel:03364450977', label: '4450977' },
    ],
  },
  {
    title: 'Centro Atención Planta Haedo',
    address: { href: 'https://goo.gl/maps/jhRZyoZkrfxEWmbE9', label: 'Valentín Gómez 210' },
    phones: [{ href: 'tel:01144896910', label: '(011)44896910' }],
  },
  {
    title: 'Centro Atención Planta Gral. Savio',
    address: {
      href: 'https://goo.gl/maps/srfAarX1GcSGHU4p9',
      label: 'Administración SIDERAR PTA. Gral. Savio (Ramallo)',
    },
    phones: [{ href: 'tel:0336-4438960', label: '(336)4438960' }],
  },
  {
    title: 'Centro Atención Rosario',
    address: { href: 'https://goo.gl/maps/meMD2Wi3NUvSvGTh7', label: 'Córdoba 1147 Piso 4 Of. 10' },
    phones: [
      { href: 'tel:3414112698', label: '(341)4112698' },
      { href: 'tel:3414110482', label: '4110482 ' },
    ],
    wsp: [{ href: 'https://wa.me/+5491149983336', label: '+54 9 11 49983336' }],
  },
  {
    title: 'Centro Atención Buenos Aires',
    address: { href: 'https://goo.gl/maps/zrQLqgqWWjCWpMF58', label: 'Santa Fe 1780. Piso 9 Of. 904 (CABA)' },
    phones: [{ href: 'tel:01148158477', label: '(011)48158477' }],
  },
  {
    title: 'Centro Atención Ensenada',
    address: { href: 'https://goo.gl/maps/EYpxLrRSRvTbyzMT7', label: 'Administración-SIDERAR PTA.' },
    phones: [{ href: 'tel:02214296187', label: '(0221)4296187' }],
  },
  {
    title: 'Centro Atención Florencio Varela',
    address: { href: 'https://goo.gl/maps/7sxTGeTQXyef7BvM8', label: 'Cno. Gral. Manuel Belgrano 31500' },
    phones: [{ href: 'tel:01142296502', label: '(011)42296502' }],
  },
  {
    title: 'Farmacia Don Bosco OSAP',
    titleHref: '/farmacia',
    address: { href: 'https://goo.gl/maps/AouyNt9fCuRXk4x1A', label: 'Savio y San José (San Nicolás)' },
    phones: [
      { href: 'tel:03364427042', label: '(0336)4427042' },
      { href: 'tel:03334420700', label: '4420700' },
    ],
    wsp: [{ href: 'https://wa.me/+5493364008162', label: '+54 9 336 4008162' }],
  },
  {
    title: 'Farmacia Planta Savio',
    titleHref: '/farmaciaSavio',
    address: { href: 'https://goo.gl/maps/XBo8yrespoj6bQ2VA', label: 'Planta General Savio (Ramallo)' },
    phones: [
      { href: 'tel:0336438930', label: '(0336)438930' },
      { href: 'tel:38930', label: '38930 (Interno Planta)' },
    ],
    wsp: [{ href: 'https://wa.me/+549336102003', label: '+54 9 336 102003' }],
  },
];

const CentrosAtencion: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Centros de atención - OSAP</title>
        <meta name="description" content="Nuestros centros de atención, con sus respectivas direcciones y telefonos" />
      </Head>
      <section className="text-left lg:w-3/5">
        <PageTitle title="Centros de atención" />
        <article className="rounded-sm bg-slate-50 p-4 text-left">
          {listCentros.map((centro) => {
            return (
              <CentroAtencion
                key={centro.title}
                title={centro.title}
                address={centro.address}
                phones={centro.phones}
                wsps={centro.wsp}
                titleHref={centro.titleHref}
              />
            );
          })}
        </article>
      </section>
      <img className="hidden w-2/5 p-4 pt-16 pr-8 lg:block" src="./img/undraw_interview.svg" alt="" />
    </div>
  );
};

export default CentrosAtencion;
