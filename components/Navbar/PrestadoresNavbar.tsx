import { FilePlus, HouseLine, ListChecks, UsersFour } from 'phosphor-react';
import NavbarItem from './NavbarItem';

const PrestadoresNavbar = ({ closeDrawer }: { closeDrawer?: () => void }) => {
  return (
    <>
      <NavbarItem
        onNavbar
        variant="secondary"
        title="Consulta de afiliados"
        href="/prestadores"
        closeDrawer={closeDrawer}
        icon={<UsersFour />}
      />
      <NavbarItem
        onNavbar
        variant="secondary"
        onNewTab
        title="Autorizador"
        href="https://validador.osap.com.ar/"
        closeDrawer={closeDrawer}
        icon={<ListChecks />}
      />
      <NavbarItem
        onNavbar
        variant="secondary"
        onNewTab
        title="Licitaciones Farmacia"
        href="http://licitaciones.osap.com.ar"
        closeDrawer={closeDrawer}
        icon={<FilePlus />}
      />
      <NavbarItem
        onNavbar
        variant="secondary"
        title="Cambio Domicilio"
        href="/prestadores/cambioDomicilio"
        closeDrawer={closeDrawer}
        icon={<HouseLine />}
      />
    </>
  );
};

export default PrestadoresNavbar;
