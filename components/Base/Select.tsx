import React, { SelectHTMLAttributes } from 'react';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
};

type FieldProps = {
  label: string;
  helpText?: string;
  inputWidth?: string;
  labelPosition?: 'top' | 'left';
} & SelectHTMLAttributes<HTMLSelectElement>;
const Select: React.FC<FieldProps> = ({
  label,
  name,
  helpText,
  inputWidth,
  children,
  labelPosition = 'top',
  className,
  required,
  ...props
}) => {
  return (
    <div className={`${className} flex w-full ${LabelPosition[labelPosition]}`}>
      <label className="text-left text-xl text-blue-700" htmlFor={name}>
        {label}
        {required && (
          <span title="Requerido" className="cursor-help">
            {' '}
            *
          </span>
        )}
      </label>
      <select aria-label={label} {...props} className={`${inputWidth || 'w-full md:w-72'} input py-3`}>
        {children}
      </select>
      <span className="my-1 text-left text-sm font-light">{helpText}</span>
    </div>
  );
};

export default Select;
