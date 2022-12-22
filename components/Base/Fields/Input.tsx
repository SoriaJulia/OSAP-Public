import { InputHTMLAttributes } from 'react';
import * as React from 'react';
import FieldLabel from './FieldLabel';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
};

type FieldProps = {
  label: string;
  helpText?: string;
  errorText?: string;
  labelPosition?: 'top' | 'left';
  inputWidth?: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      helpText,
      errorText,
      type = 'text',
      labelPosition = 'top',
      inputWidth = '',
      className = '',
      required,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`field ${LabelPosition[labelPosition]} ${className}`}>
        <FieldLabel htmlFor={id} required={required} text={label} />
        <input
          aria-label={label}
          type={type}
          ref={ref}
          id={id}
          required={required}
          className={`field-control peer ${inputWidth}`}
          {...props}
        />
        <span className="field-help-text">{helpText}</span>
        <span className="field-error-text">{errorText}</span>
      </div>
    );
  }
);

export default InputField;
