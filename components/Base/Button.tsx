import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as React from 'react';
import classNames from 'classnames';

const buttonVariants = {
  fill: 'btn-orange',
  yellowFill: 'btn-yellow',
  blueText: 'btn-text-blue',
  slateText: 'btn-text-slate',
};
type Variants = keyof typeof buttonVariants;
type ButtonProps = {
  label: string;
  variant?: Variants;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
  showIconOnMobile?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type,
  variant = 'fill',
  trailingIcon,
  leadingIcon,
  className,
  showIconOnMobile,
  ...props
}) => {
  return (
    <button
      className={classNames(className, {
        [`${buttonVariants[variant]}`]: true,
      })}
      onClick={onClick}
      type={type}
      {...props}
    >
      <div className={` ${showIconOnMobile ? '' : 'hidden'} pl-1 sm:block`}>{leadingIcon}</div>
      {label}
      <div className={` ${showIconOnMobile ? '' : 'hidden'} pr-1 sm:block`}>{trailingIcon}</div>
    </button>
  );
};

export default Button;
