import { CreditCard } from 'phosphor-react';
import React from 'react';
import NavbarItem from './NavbarItem';

const AfiliadosNavbar = ({ closeDrawer }: { closeDrawer?: () => void }) => {
  return (
    <NavbarItem
      onNavbar
      href="/afiliados/facturacion"
      title="Pagos y facturación"
      variant="secondary"
      icon={<CreditCard />}
      closeDrawer={closeDrawer}
    />
  );
};

export default AfiliadosNavbar;
