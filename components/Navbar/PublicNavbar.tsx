import {
  Question,
  Newspaper,
  UsersThree,
  Envelope,
  Phone,
  House,
  Buildings,
  Suitcase,
  FirstAidKit,
  FirstAid,
  Pill,
} from 'phosphor-react';
import NavbarItem from './NavbarItem';

const PublicNavbar: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {
  return (
    <>
      <NavbarItem
        href="/trabajaConNosotros"
        title="Trabaja con nosotros"
        icon={<Suitcase />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem href="/contacto" title="Contactános" icon={<Envelope />} closeDrawer={closeDrawer} />
      <NavbarItem onNavbar href="/conoceOSAP" title="Conocé OSAP" icon={<House />} closeDrawer={closeDrawer} />
      <NavbarItem
        onNavbar
        href="http://www.osapsalud.com.ar/novedades/"
        title="Novedades"
        icon={<Newspaper />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem
        onNavbar
        href="http://www.osapsalud.com.ar/prestador/?tipo=49.62#form"
        title="Cartilla médica"
        icon={<UsersThree />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem
        onNavbar
        title="Emergencias"
        href="/centrosEmergencias"
        icon={<FirstAid />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem onNavbar title="Farmacias" list icon={<Pill />} closeDrawer={closeDrawer}>
        <NavbarItem onNavbar title="Don Bosco" href="/farmacia" closeDrawer={closeDrawer} />
        <NavbarItem onNavbar title="Planta Savio" href="/farmaciaSavio" closeDrawer={closeDrawer} />
      </NavbarItem>
      <NavbarItem
        onNavbar
        href="http://www.osapsalud.com.ar/normas-generales/"
        title="Preguntas frecuentes"
        icon={<Question />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem href="/telefonosUtiles" title="Telefonos Utiles" icon={<Phone />} closeDrawer={closeDrawer} />
      <NavbarItem href="/centrosAtencion" title="Centros de atencion" icon={<Buildings />} closeDrawer={closeDrawer} />
    </>
  );
};

export default PublicNavbar;
