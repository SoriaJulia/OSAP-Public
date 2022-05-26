import React, { SelectHTMLAttributes } from 'react';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
};

type FieldProps = {
  label: string;
  helpText?: string;
  error?: any;
  errorText?: string;
  labelPosition?: 'top' | 'left';
} & SelectHTMLAttributes<HTMLSelectElement>;
const Select: React.FC<FieldProps> = ({
  label,
  name,
  helpText,
  error,
  errorText,
  children,
  labelPosition = 'top',
  ...props
}) => {
  return (
    <div className={`flex ${LabelPosition[labelPosition]}`}>
      <label className="text-left text-xl text-blue-700" htmlFor={name}>
        {label}
      </label>
      <select
        aria-label={label}
        {...props}
        className="w-full rounded-sm border-2 border-grey-400 p-2 py-2.5 pr-8 transition placeholder:text-grey-300 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:invalid:border-pink-700 disabled:border-grey-400 disabled:bg-grey-100 md:w-72"
      >
        {children}
      </select>
      <span className="my-1 text-left text-sm font-light">{helpText}</span>
    </div>
  );
};

export default Select;
