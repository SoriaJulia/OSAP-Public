import classNames from 'classnames';
import Link from 'next/link';
import { MapPin, Phone, WhatsappLogo } from 'phosphor-react';
import React from 'react';
import ContactLink from './Base/ContactLink';

type CentroAtencionProps = {
  title: string;
  address: { href: string; label: string };
  phones: { href: string; label: string }[];
  wsps?: { href: string; label: string }[];
  titleHref?: string;
  smallTitle?: boolean;
};

const CentroAtencion = ({ title, address, phones, wsps, titleHref, smallTitle }: CentroAtencionProps) => {
  const titleClass = classNames({
    'mb-4 text-2xl text-slate-700': true,
    'underline decoration-slate-300/40 underline-offset-2 hover:text-slate-600 hover:decoration-slate-500/50':
      titleHref,
    'text-lg': smallTitle,
  });
  return (
    <>
      <h2 className={titleClass}>{titleHref ? <Link href={titleHref}>{title}</Link> : title}</h2>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <ContactLink
          href={address.href}
          icon={<MapPin className="text-xl text-orange-200" weight="duotone" />}
          label={address.label}
          variant="blue"
        />
        <div className="flex flex-wrap gap-2">
          {phones.map((phone, index) => {
            return (
              <ContactLink
                key={phone.label}
                href={phone.href}
                label={phone.label}
                variant="blue"
                icon={index === 0 ? <Phone className="text-xl text-orange-200" weight="duotone" /> : null}
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          {wsps &&
            wsps.map((wsp, index) => {
              return (
                <ContactLink
                  key={wsp.label}
                  href={wsp.href}
                  label={wsp.label}
                  variant="blue"
                  icon={index === 0 ? <WhatsappLogo className="text-xl text-orange-200" weight="duotone" /> : null}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CentroAtencion;
