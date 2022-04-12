import Image from 'next/image';
import Link from 'next/link';
import React, { Children, ReactNode } from 'react';
import logo from '../public/img/logo completo.svg';

export const Header: React.FC<unknown> = ({ children }) => {
  return (
    <nav className="flex items-center justify-between py-2 px-9">
      <Image src={logo} />
      <ul className="flex justify-end">{children}</ul>
    </nav>
  );
};
