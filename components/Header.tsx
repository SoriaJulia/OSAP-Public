import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export const Header = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-500 py-4 px-9">
      <Image src={'/img/Logo.svg'} height={46} width={105} />
      <ul className="flex justify-end">
        <NavbarItem href="/clientes/turnosonline" text="Turnos online" />
        <NavbarItem href="/clientes/cartillamedica" text="Cartilla medica" />
        <NavbarItem href="/clientes/pagos" text="Pagos y facturacion" />
        <NavbarItem href="/clientes/faq" text="Preguntas frecuentes" />
        <NavbarItem href="/clientes/perfil" text="Perfil" />
      </ul>
    </nav>
  );
};

type NavbarItemProps = { href: string; text: string };

const NavbarItem: React.FC<NavbarItemProps> = ({ text, ...props }) => {
  return (
    <li className="text-orange-300 p-4">
      <Link {...props}>{text}</Link>
    </li>
  );
};
