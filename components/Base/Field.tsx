import { InputHTMLAttributes } from 'react';
import * as React from 'react';

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
} & InputHTMLAttributes<HTMLInputElement>;
const Field: React.FC<FieldProps> = ({
  label,
  name,
  helpText,
  error,
  errorText,
  type = 'text',
  labelPosition = 'top',
  ...props
}) => {
  return (
    <div className={`flex ${LabelPosition[labelPosition]}`}>
      <label className="text-left text-xl text-blue-700" htmlFor={name}>
        {label}
      </label>
      <input
        aria-label={label}
        type={type}
        {...props}
        className="w-full rounded-sm border-2 border-grey-400 p-2 caret-blue-500 transition placeholder:text-grey-300 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:invalid:border-pink-700 disabled:border-grey-400 disabled:bg-grey-100 md:w-72"
      />
      <span className="my-1 text-left text-sm font-light">{helpText}</span>
    </div>
  );
};

export default Field;
