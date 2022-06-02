import * as React from 'react';

interface NavbarMenuProps {
  text: string;
  icon: React.ReactNode;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, text, icon }) => {
  return (
    <div className="group z-20  rounded-bl-full border-b-2 border-l-2 border-blue-600 bg-slate-50 pt-2 pb-5 pl-8 pr-6 font-display text-2xl text-blue-600 transition-all hover:bg-blue-100 hover:text-blue-700">
      <div className="flex flex-col items-end gap-1 group-hover:hidden">
        {text}
        {icon}
      </div>
      <div className="hidden flex-col py-2 pb-8 pl-4  group-hover:flex">
        <p className="pb-2 text-left font-sans text-lg text-blue-800">Tipo de usuario:</p>
        {/* {React.Children.map(children, (child) => ({ child }))} */}
        {children}
      </div>
    </div>
  );
};

export default NavbarMenu;
