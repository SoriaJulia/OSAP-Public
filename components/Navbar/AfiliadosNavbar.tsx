import { Envelope, Calendar, UsersThree, CreditCard, Question, Phone, Buildings, FirstAidKit } from 'phosphor-react';
import { NavbarItem } from './NavbarItem';

const AfiliadosNavbar = () => {
  return (
    <>
      <NavbarItem
        onNavbar
        href="/centrosAtencion"
        title="Centros de atencion"
        variant="secondary"
        icon={<Buildings />}
      />
      <NavbarItem
        onNavbar
        href="/afiliados/turnosonline"
        title="Turnos online"
        variant="secondary"
        icon={<Calendar />}
      />
      <NavbarItem
        onNavbar
        href="/afiliados/facturacion"
        title="Pagos y facturación"
        variant="secondary"
        icon={<CreditCard />}
      />
    </>
  );
};

export default AfiliadosNavbar;
