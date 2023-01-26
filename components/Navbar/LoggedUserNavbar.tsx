import User from '@appTypes/user';
import AfiliadosNavbar from './AfiliadosNavbar';
import PrestadoresNavbar from './PrestadoresNavbar';

const LoggedUserNavbar = ({ closeDrawer, user }: { closeDrawer?: () => void; user: User }) => {
  const isAfiliado = user.agentId !== '0';
  const isPrestador = user.proveedorId || user.agentId === '0';
  return (
    <>
      {isAfiliado && <AfiliadosNavbar closeDrawer={closeDrawer} />}
      {isPrestador && <PrestadoresNavbar closeDrawer={closeDrawer} />}
    </>
  );
};

export default LoggedUserNavbar;
