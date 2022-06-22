import { UserCircle, User, SignOut } from 'phosphor-react';
import { signOut, useSession } from 'next-auth/react';
import NavbarMenu from './NavbarMenu';
import NavbarMenuItem from './NavbarMenuItem';

function ProfileMenu() {
  const session = useSession();
  return (
    <NavbarMenu text={session.data?.user?.name || 'User'} icon={<UserCircle weight="duotone" size={32} />}>
      <NavbarMenuItem
        text="Mis Datos"
        onClick={() => {
          console.log('TODO: redirect to mis datos');
        }}
        icon={<User weight="light" size={32} />}
      />
      <NavbarMenuItem
        onClick={() => {
          signOut();
        }}
        text="Cerrar sesion"
        icon={<SignOut weight="light" size={32} />}
      />
    </NavbarMenu>
  );
}

export default ProfileMenu;
