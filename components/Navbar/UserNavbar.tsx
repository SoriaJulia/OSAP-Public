import _ from 'lodash';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { House, SignOut, User } from 'phosphor-react';
import React from 'react';
import NavbarMenuItem from './Menu/NavbarMenuItem';
import { NavbarItem } from './NavbarItem';

const UserNavbar: React.FC = ({ children }) => {
  const session = useSession();
  const userName = _.words(session.data?.user?.name)
    .map((word) => {
      return _.capitalize(word);
    })
    .join(' ');
  return (
    <nav className="sticky top-20 z-10 flex justify-between bg-blue-800 ">
      <ul className="ml-6 flex items-center gap-1">
        <Link href="/afiliados">
          <li className="flex items-center gap-1 p-4 text-blue-100 md:hover:bg-slate-50 md:hover:text-blue-700">
            <House className="" weight="duotone" size={24} />
            {`¡Hola! ${userName || ''}`}
          </li>
        </Link>
        {children}
      </ul>
      <ul className="mr-8 flex items-center gap-1">
        <NavbarItem
          title="Mis Datos"
          onClick={() => {
            console.log('TODO: redirect to mis datos');
          }}
          icon={<User weight="light" size={24} />}
          variant="secondary"
          onNavbar
          showIcon
        />
        <NavbarItem
          onClick={() => {
            signOut();
          }}
          onNavbar
          title="Cerrar sesion"
          icon={<SignOut weight="light" size={24} />}
          variant="secondary"
          showIcon
          iconEnd
        />
      </ul>
    </nav>
  );
};

export default UserNavbar;
