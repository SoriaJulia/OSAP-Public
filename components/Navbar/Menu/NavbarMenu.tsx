import * as React from 'react';

interface NavbarMenuProps {
  text: string;
  icon: React.ReactNode;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, text, icon }) => {
  return (
    <div className="group z-20 rounded-sm p-4 font-display text-xl text-orange-600 transition hover:bg-slate-50 hover:text-orange-400">
      <div className="flex items-center">
        {text}
        {icon}
      </div>
      <div className="absolute right-5 hidden w-max py-2 text-orange-700 group-hover:block">
        {React.Children.map(children, (child) => (
          <div className="block whitespace-nowrap rounded ">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;
