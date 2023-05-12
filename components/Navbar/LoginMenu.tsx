import Link from 'next/link';
import { UserCircle } from 'phosphor-react';

const LoginMenu = () => {
  return (
    <Link href="/login">
      <button aria-label="Ingresar" className="user-menu flex flex-col">
        <UserCircle weight="duotone" size={24} />
        Ingresar
      </button>
    </Link>
  );
};

export default LoginMenu;
