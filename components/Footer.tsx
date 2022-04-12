import Image from 'next/image';
import React from 'react';
import logo from '../public/img/logo.svg';
import logoSSS from '../public/img/logo-sss.png';
import { MapPin, Phone, Envelope, Printer } from 'phosphor-react';
import Link from 'next/link';
export const Footer = () => {
  return (
    <footer className="grid grid-cols-footer gap-9 bg-gradient-to-b from-blue-900 to-grey-700 px-9 py-4">
      <Image src={logo}></Image>

      <ul className="flex flex-col justify-center gap-2 text-blue-200">
        <li className="flex gap-3 align-middle transition hover:text-blue-100 hover:underline">
          <MapPin size={24} /> Av. Moreno 187 San Nicolás Bs As
        </li>
        <li className="flex gap-3 align-middle transition hover:text-blue-100 hover:underline">
          <Phone size={24} />
          0336-4425632/4429692/4450440/4450099
        </li>
        <li className="flex gap-3 align-middle transition hover:text-blue-100 hover:underline">
          <Printer size={24} />
          0336-4437600
        </li>
        <li className="flex gap-3 align-middle transition hover:text-blue-100 hover:underline">
          <Envelope size={24} />
          info@osap.org.ar
        </li>
      </ul>

      <ul className="flex flex-col justify-center gap-2 text-blue-400">
        <li className="transition hover:text-blue-300 hover:underline">
          <Link href={'#'}>Contactanos</Link>
        </li>
        <li className="transition hover:text-blue-300 hover:underline">
          <Link href={'#'}>Trabajá con nosotros</Link>
        </li>
        <li className="transition hover:text-blue-300 hover:underline">
          <Link href={'#'}>Preguntas frecuentes</Link>
        </li>
        <li className="transition hover:text-blue-300 hover:underline">
          <Link href={'#'}>Telefonos útiles</Link>
        </li>
        <li className="transition hover:text-blue-300 hover:underline">
          <Link href={'#'}>Centros de atención</Link>
        </li>
      </ul>

      <div className="flex flex-col gap-2 text-blue-200">
        <div className="flex">
          <Image src={logoSSS} layout="fixed" />
        </div>
        <div className="flex gap-2 transition hover:text-blue-100 hover:underline">
          <MapPin size={24} className="shrink-0" /> Av. Pte. Roque Sáenz Peña
          530 - CABA
        </div>
        <div className="flex gap-2 transition hover:text-blue-100 hover:underline">
          <Phone size={24} /> 0800-222-72583 (SALUD)
        </div>
      </div>
    </footer>
  );
};
