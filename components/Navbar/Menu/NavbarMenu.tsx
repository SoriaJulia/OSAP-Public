import * as React from 'react';

interface NavbarMenuProps {
  text: string;
  icon: React.ReactNode;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ children, text, icon }) => {
  return (
    <div className="group z-20 rounded-sm rounded-b-md bg-blue-700 p-4 font-display text-xl text-blue-100 transition hover:bg-blue-600 hover:text-blue-50">
      <div className="flex items-center">
        {text}
        {icon}
      </div>
      <div className="absolute right-4 mt-2 hidden w-max rounded bg-blue-50 py-1 text-blue-700 group-hover:block">
        {React.Children.map(children, (child) => (
          <div className="block whitespace-nowrap ">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;
