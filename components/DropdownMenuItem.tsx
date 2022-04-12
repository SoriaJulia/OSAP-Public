import Link from 'next/link';
import React, { ReactNode } from 'react';
type DropdownMenuItemProps = {
  href: string;
  icon?: ReactNode;
  text: string;
};
const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <Link {...props}>
      <div className="flex items-center justify-between gap-3">
        {text}
        {icon}
      </div>
    </Link>
  );
};

export default DropdownMenuItem;
