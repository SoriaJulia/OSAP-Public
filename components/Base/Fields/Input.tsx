import { InputHTMLAttributes, ReactNode } from 'react';
import * as React from 'react';
import FieldLabel from './FieldLabel';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center md:whitespace-nowrap',
  right: 'gap-2 flex flex-row-reverse justify-end',
};

export type InputFieldProps = {
  label: string;
  helpText?: string;
  errorText?: string;
  labelPosition?: keyof typeof LabelPosition;
  inputWidth?: string;
  id: string;
  trialingIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
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
      trialingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`field ${LabelPosition[labelPosition]} ${className}`}>
        <FieldLabel htmlFor={id} required={required} text={label} />
        <div className="field-container">
          <input
            aria-label={label}
            type={type}
            ref={ref}
            id={id}
            required={required}
            className={`field-control peer ${inputWidth}`}
            {...props}
          />
          {trialingIcon && <span className="field-trailing-icon">{trialingIcon}</span>}
        </div>

        <span className="field-help-text">{helpText}</span>
        <span className="field-error-text">{errorText}</span>
      </div>
    );
  }
);

export default InputField;
