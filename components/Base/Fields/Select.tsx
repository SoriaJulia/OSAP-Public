import React, { SelectHTMLAttributes } from 'react';
import FieldLabel from './FieldLabel';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center md:whitespace-nowrap',
  right: 'gap-2 flex flex-row-reverse justify-end',
};

type FieldProps = {
  label: string;
  helpText?: string;
  errorText?: string;
  inputWidth?: string;
  labelPosition?: 'top' | 'left';
  id: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
const SelectField: React.FC<FieldProps> = ({
  label,
  errorText,
  helpText,
  inputWidth = '',
  children,
  labelPosition = 'top',
  className = '',
  required,
  id,
  ...props
}) => {
  return (
    <div className={`field ${LabelPosition[labelPosition]} ${className}`}>
      <FieldLabel htmlFor={id} text={label} required={required} />
      <select
        aria-label={label}
        id={id}
        required={required}
        className={`field-control peer py-3 ${inputWidth}`}
        {...props}
      >
        {children}
      </select>
      <span className="field-help-text">{helpText}</span>
      <span className="field-error-text">{errorText}</span>
    </div>
  );
};

export default SelectField;
