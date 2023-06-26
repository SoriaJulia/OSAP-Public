import React from 'react';
import { Phone, UserFocus, WhatsappLogo } from 'phosphor-react';
import ContactLink from './Base/ContactLink';

const places = [
  {
    name: 'OSAP Central',
    phones: [
      {
        label: '(0336) 4425632',
        href: 'tel:+543364425632',
      },
      {
        label: '4429692',
        href: 'tel:+543364429692',
      },
      {
        label: '4450440',
        href: 'tel:+543364450440',
      },
      {
        label: '4450099',
        href: 'tel:+543364450099',
      },
    ],
    wsp: [{ href: 'https://wa.me/+5491154529960', label: '+54 9 11 5452-9960' }],
  },
  {
    name: 'Centro de Medicina Preventiva',
    phones: [
      { label: '(0336) 4450966', href: 'tel:+5493364450966' },
      { label: '(0336) 4450977', href: 'tel:+5493364450977' },
    ],
  },
  {
    name: 'Planta Gral Savio',
    phones: [
      {
        label: '(0336) 4438960',
        href: 'tel:+543364438960',
      },
    ],
  },
  {
    name: 'Planta Haedo',
    phones: [
      {
        label: '(011) 44896910',
        href: 'tel:+5401144896910',
      },
    ],
  },
  {
    name: 'Rosario',
    phones: [
      {
        label: '(0341) 4497852',
        href: 'tel:+5403414497852',
      },
      {
        label: '(011) 49983336',
        href: 'tel:+5401149983336',
      },
    ],
    wsp: [{ href: 'https://wa.me/+5491149983336', label: '+54 9 11 49983336' }],
  },
  {
    name: 'Buenos Aires',
    phones: [
      {
        label: '(011) 48158477',
        href: 'tel:+5401148158477',
      },
    ],
  },
  {
    name: 'Ensenada',
    phones: [
      {
        label: '(0221) 4296187',
        href: 'tel:+542214296187',
      },
    ],
  },
  {
    name: 'Florencio Varela',
    phones: [
      {
        label: '(011) 42296502',
        href: 'tel:+5401142296502',
      },
    ],
  },

  { name: 'OSDEPYM', phones: [{ label: '0800 288 7963', href: 'tel:08002887963' }] },
];
const farmacias = [
  {
    name: 'Farmacia Don Bosco OSAP',
    phones: [
      {
        label: '(0336) 4427042',
        href: 'tel:+543364427042',
      },
      {
        label: '(0336) 4420700',
        href: 'tel:+543364420700',
      },
    ],
    wsp: [{ href: 'https://wa.me/+5493364008162', label: '+54 9 336 4008162' }],
  },
  {
    name: 'Farmacia Planta Savio',
    phones: [
      {
        label: '(336) 4438930',
        href: 'tel:+543364427042',
      },
      {
        label: 'Interno: 38936',
        href: 'tel:38930',
      },
    ],
    wsp: [{ href: 'https://wa.me/+5493364102003', label: '+54 9 336 4102003' }],
  },
];

const TelefonosAtencion = () => {
  return (
    <article className="flex break-before-column flex-col lg:px-6">
      <h2 className="mb-4 flex gap-2 font-display text-xl text-yellow-800 sm:gap-3 sm:text-3xl">
        <UserFocus className="mt-1" /> Atención al afiliado
      </h2>
      <div className="flex flex-col flex-wrap divide-y divide-dotted divide-slate-200">
        {places.map((place) => {
          return (
            <div className="flex flex-wrap items-center gap-2 py-3" key={place.name}>
              {place.name}
              <Phone className="text-yellow-500" weight="duotone" size={24} />
              {place.phones.map((phone) => {
                return <ContactLink key={phone.href} href={phone.href} variant="blue" label={phone.label} />;
              })}
              {place.wsp && <WhatsappLogo className="text-yellow-500" weight="duotone" size={24} />}
              {place.wsp?.map((phone) => {
                return (
                  <ContactLink key={phone.href} href={phone.href} target="_blank" variant="blue" label={phone.label} />
                );
              })}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default TelefonosAtencion;
