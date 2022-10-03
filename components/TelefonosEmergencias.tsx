import React from 'react';
import { FirstAid, Phone } from 'phosphor-react';
import ContactLink from './Base/ContactLink';

// TODO implement getStaticProps

const places = [
  {
    name: 'Arroyo Seco',
    provider: 'Emergencias Regionales',
    phones: [
      {
        label: '(03402) 427400',
        href: 'tel:+5403402427400',
      },
    ],
  },
  {
    name: 'La Plata',
    provider: 'Vittal',
    phones: [
      {
        label: '0810 333 8888',
        href: 'tel:08103338888',
      },
    ],
  },

  {
    name: 'Morón, Quilmes, Fcio. Varela, Haedo y zonas de influencia',
    provider: 'Vittal',
    phones: [
      {
        label: '(011) 45562000',
        href: 'tel:+5401145562000',
      },
      {
        label: '40008888',
        href: 'tel:+5401140008888',
      },
      {
        label: '0810 333 8888',
        href: 'tel:08103338888',
      },
    ],
  },
  {
    name: 'Ramallo',
    provider: 'CEM S.A',
    phones: [
      {
        label: '0800 555 5200',
        href: 'tel:08005555200',
      },
    ],
  },
  {
    name: 'Rosario',
    provider: 'Vittal',
    phones: [
      {
        label: '0810 222 7510',
        href: 'tel:08102227510',
      },
    ],
  },
  {
    name: 'San Nicolás',
    provider: 'CEM S.A',
    phones: [
      {
        label: '(0336) 4423672',
        href: 'tel:+543364423672',
      },
      {
        label: '4429752',
        href: 'tel:+543364429752',
      },
      {
        label: '4430143',
        href: 'tel:+543364430143',
      },
      {
        label: '4430300',
        href: 'tel:+543364430300',
      },
    ],
  },
  {
    name: 'Villa Constitución, Rueda, Pavon, Godoy, Empalme',
    provider: 'EMCOR',
    phones: [
      {
        label: '(03400) 476476',
        href: 'tel:+5403400476476',
      },
      {
        label: '477333',
        href: 'tel:+5403400477333',
      },
    ],
  },
];

const TelefonosEmergencias = () => {
  return (
    <article className="flex  break-before-column flex-col rounded bg-white p-4 ">
      <h2 className="mb-4 flex justify-center gap-2 font-display text-3xl text-orange-600 sm:gap-3 sm:text-4xl">
        <FirstAid className="mt-1" /> Emergencias
      </h2>
      <div className="divide-y divide-dotted divide-slate-200">
        {places.map((place) => {
          return (
            <div key={place.name} className="flex flex-wrap items-center gap-2 p-4 text-left">
              {place.name}
              <small>({place.provider})</small>
              <Phone className="text-orange-500" weight="duotone" size={24} />
              {place.phones.map((phone) => {
                return <ContactLink href={phone.href} variant="blue" label={phone.label} key={phone.href} />;
              })}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default TelefonosEmergencias;
