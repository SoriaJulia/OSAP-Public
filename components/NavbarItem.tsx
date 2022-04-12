import Link from 'next/link';
import React, { ReactNode } from 'react';

type NavbarItemProps = {
  href: string;
  text: string;
  showDropdown?: boolean;
  icon?: ReactNode;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({
  text,
  showDropdown,
  icon,
  children,
  ...props
}) => {
  return (
    <li className="group rounded-sm p-4 font-display text-xl text-orange-600 transition hover:bg-gray-50 hover:text-orange-400">
      <Link {...props}>
        <div className="flex items-center">
          {icon}
          {text}
        </div>
      </Link>
      {showDropdown && (
        <ul className="absolute right-5 hidden w-max pt-1 text-orange-700 group-hover:block">
          {React.Children.map(children, (child) => (
            <li className="block whitespace-nowrap rounded-t bg-white py-2 px-4 hover:bg-grey-50">
              {child}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
