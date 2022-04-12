import Head from 'next/head';
import Link from 'next/link';
import { User, UserCircle, SignOut } from 'phosphor-react';
import React from 'react';
import DropdownMenuItem from './DropdownMenuItem';
import { Footer } from './Footer';
import { Header } from './Header';
import { NavbarItem } from './NavbarItem';

const Content: React.FC<unknown> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Head>
        <title>Osap</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Header>
        <NavbarItem href="/clientes/turnosonline" text="Turnos online" />
        <NavbarItem href="/clientes/cartillamedica" text="Cartilla medica" />
        <NavbarItem href="/clientes/pagos" text="Pagos y facturacion" />
        <NavbarItem href="/clientes/faq" text="Preguntas frecuentes" />
        <NavbarItem
          href="/clientes/perfil"
          text="Perfil"
          showDropdown={true}
          icon={<UserCircle weight="duotone" size={32} />}
        >
          <DropdownMenuItem href="#" text="Mis Datos" icon={<User />} />
          <DropdownMenuItem href="#" text="Cerrar Sesión" icon={<SignOut />} />
        </NavbarItem>
      </Header>
      <main className="flex w-full flex-auto flex-col items-center justify-center bg-grey-50 px-9 text-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Content;
