import { Newspaper, UsersThree, Envelope, Phone, Buildings, Suitcase, FirstAidKit, Question } from 'phosphor-react';
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
      <NavbarItem onNavbar href="/novedades" title="Novedades" icon={<Newspaper />} closeDrawer={closeDrawer} />
      <NavbarItem onNavbar href="/cartilla" title="Cartilla médica" icon={<UsersThree />} closeDrawer={closeDrawer} />
      <NavbarItem onNavbar title="Farmacias" href="" list icon={<FirstAidKit />} closeDrawer={closeDrawer}>
        <NavbarItem onNavbar title="Don Bosco" href="/farmacia" closeDrawer={closeDrawer} />
        <NavbarItem onNavbar title="Planta Savio" href="/farmaciaSavio" closeDrawer={closeDrawer} />
      </NavbarItem>
      <NavbarItem
        href="/centrosAtencion"
        onNavbar
        title="Centros de atención"
        icon={<Buildings />}
        closeDrawer={closeDrawer}
      />
      <NavbarItem href="/telefonosUtiles" title="Telefonos Utiles" icon={<Phone />} closeDrawer={closeDrawer} />
      <NavbarItem href="/faq" title="Preguntas Frecuentes" onNavbar icon={<Question />} closeDrawer={closeDrawer} />
    </>
  );
};

export default PublicNavbar;
