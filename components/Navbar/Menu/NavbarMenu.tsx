import * as React from 'react';

interface NavbarMenuProps {
  text: string;
  icon: React.ReactNode;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, text, icon }) => {
  return (
    <div className="group z-20  rounded-bl-full border-b-2 border-l-2 border-blue-600 bg-blue-700 pt-2 pb-2 pl-5 pr-3 font-display text-lg text-blue-100 transition-all hover:bg-blue-800 hover:text-blue-100 md:pr-6 md:pl-8 md:pb-5 md:text-2xl">
      <div className="flex flex-col items-end gap-1 group-hover:hidden">
        {text}
        {icon}
      </div>
      <div className="hidden flex-col py-2 pb-6 pl-3 group-hover:flex md:pb-8  md:pl-4">
        <p className="text-left font-sans text-blue-200 md:pb-2 md:text-lg">Tipo de usuario:</p>
        {/* {React.Children.map(children, (child) => ({ child }))} */}
        {children}
      </div>
    </div>
  );
};

export default NavbarMenu;
