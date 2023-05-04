import Link from 'next/link';
import { ReactNode, useState } from 'react';
import * as React from 'react';
import { CaretRight, Plus, Minus } from 'phosphor-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  primary: ' md:hover:bg-yellow-500/10 ',
  secondary: ' md:hover:bg-blue-600 ',
};

const selected = {
  primary: 'md:bg-slate-100',
  secondary: 'md:bg-blue-500 md:text-white',
};

const labelStyle = {
  primary: 'md:font-semibold md:text-red-600  lg:text-xl md:text-lg',
  secondary: 'md:text-blue-100 md:text-base md:font-sans md:hover:text-blue-100 ',
};

export type Variants = keyof typeof variants;

export type NavbarItemProps = {
  title: string;
  icon?: ReactNode;
  onNavbar?: boolean;
  list?: boolean;
  variant?: Variants;
  onClick?: () => void;
  showIcon?: boolean;
  iconEnd?: boolean;
  hideFromDrawer?: boolean;
  closeDrawer?: () => void;
  href: string;
  onNewTab?: boolean;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  title,
  icon,
  onNavbar,
  list,
  children,
  href,
  variant = 'primary',
  onClick,
  showIcon,
  iconEnd,
  hideFromDrawer = false,
  closeDrawer,
  onNewTab,
}) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const [isListOpen, setIsListOpen] = useState(false);
  const caret = list ? (
    <>
      <Plus className="group-hover:hidden md:hidden" />
      <Minus className="hidden group-hover:block md:group-hover:hidden" />
    </>
  ) : (
    <CaretRight className="md:hidden" />
  );
  const label = (
    <>
      <div className="navbar-item-link-label ">
        <div className={`${showIcon && !iconEnd ? '' : 'md:hidden'}`}>{icon}</div>
        {title}
        <div className={`${iconEnd ? 'hidden md:block' : 'hidden'}`}>{icon}</div>
      </div>
      {caret}
    </>
  );

  const handleClick = () => {
    if (list) {
      setIsListOpen(!isListOpen);
    } else {
      closeDrawer?.();
      onClick?.();
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={`${onNavbar ? '' : 'md:hidden'} ${hideFromDrawer && 'hidden md:flex'} ${variants[variant]}  ${
        currentPage === href ? selected[variant] : ''
      }navbar-item-li group`}
    >
      {list ? (
        <>
          <button onClick={handleClick} className={`navbar-item-link ${labelStyle[variant]}`}>
            {label}
          </button>
          <ul className={`${isListOpen ? 'flex' : 'hidden'} navbar-item-list-ul group-hover:flex`}>{children}</ul>
        </>
      ) : (
        <Link href={href} passHref>
          {onNewTab ? (
            <a target="_blank" href={href} className={`navbar-item-link ${labelStyle[variant]}`}>
              {label}
            </a>
          ) : (
            <button onClick={handleClick} className={`navbar-item-link ${labelStyle[variant]}`}>
              {label}
            </button>
          )}
        </Link>
      )}
    </motion.li>
  );
};

export default NavbarItem;
