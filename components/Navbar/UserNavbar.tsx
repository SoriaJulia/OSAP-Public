import { capitalizeText } from '@lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { House, SignOut } from 'phosphor-react';
import React from 'react';
import LoginMenu from './LoginMenu';
import NavbarItem from './NavbarItem';

const UserNavbar: React.FC = ({ children }) => {
  const session = useSession();
  const loggedUser = session.data?.user;
  const userName = session.data?.user ? capitalizeText(session.data?.user?.name) : '';
  const agentId = session.data?.user.agentId;
  const homeLink = agentId !== '0' ? '/afiliados' : '/prestadores';
  const handleSignOut = () => {
    localStorage.removeItem('showTravelBanner');
    signOut();
  };

  return (
    <nav
      className={` ${loggedUser ? 'top-0 md:sticky md:top-[4.75rem] ' : 'absolute right-0 top-0'}
     absolute right-0 z-10 justify-end 
    `}
    >
      {loggedUser ? (
        <>
          <div className="user-menu h-14 flex-row gap-4 md:hidden">
            <Link href={homeLink} passHref>
              <button aria-label="Tramites y constultas Afiliado">
                <House weight="duotone" size={32} />
              </button>
            </Link>
            <button onClick={handleSignOut} aria-label="Cerrar sesion">
              <SignOut weight="duotone" size={32} />
            </button>
          </div>
          <div className=" hidden w-screen items-center justify-between bg-blue-800 md:flex">
            <ul className="flex items-center gap-1 lg:ml-6">
              <span className="mr-3 flex text-blue-200">¡Hola! {userName}</span>
              <NavbarItem
                title="Inicio"
                variant="secondary"
                showIcon
                onNavbar
                icon={<House className="" weight="duotone" size={24} />}
                href={homeLink}
              />
              {children}
            </ul>
            <ul className="flex items-center gap-1 lg:mr-8">
              {/* <NavbarItem
                title="Mis Datos"
                onClick={() => {
                  console.log('TODO: redirect to mis datos');
                }}
                icon={<User weight="light" size={24} />}
                variant="secondary"
                onNavbar
                showIcon
              /> */}
              <NavbarItem
                onClick={handleSignOut}
                href=""
                onNavbar
                title="Cerrar sesion"
                icon={<SignOut weight="light" size={24} />}
                variant="secondary"
                showIcon
                iconEnd
              />
            </ul>
          </div>
        </>
      ) : (
        <LoginMenu />
      )}
    </nav>
  );
};

export default UserNavbar;
