import { capitalizeText } from '@lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { House, SignOut, User } from 'phosphor-react';
import React from 'react';
import LoginMenu from './Menu/LoginMenu';
import { NavbarItem } from './NavbarItem';

const UserNavbar: React.FC = ({ children }) => {
  const session = useSession();
  const userName = session.data?.user ? capitalizeText(session.data?.user?.name) : '';

  return (
    <nav className="sticky top-[4.75rem] z-10 hidden justify-end md:flex">
      {session.data?.user ? (
        <div className="flex w-full justify-between bg-blue-800">
          <ul className="flex items-center gap-1 lg:ml-6">
            <Link href="/afiliados">
              <li className="flex items-center gap-1 p-4 text-blue-100 md:hover:bg-slate-50 md:hover:text-blue-700">
                <House className="" weight="duotone" size={24} />
                {`¡Hola! ${userName}`}
              </li>
            </Link>
            {children}
          </ul>
          <ul className="flex items-center gap-1 lg:mr-8">
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
        </div>
      ) : (
        <LoginMenu />
      )}
    </nav>
  );
};

export default UserNavbar;
