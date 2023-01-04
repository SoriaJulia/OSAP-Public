import { InputHTMLAttributes } from 'react';
import * as React from 'react';
import FieldLabel from './FieldLabel';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
  right: 'gap-2 flex flex-row-reverse justify-end',
};

export type InputFieldProps = {
  label: string;
  helpText?: string;
  errorText?: string;
  labelPosition?: keyof typeof LabelPosition;
  inputWidth?: string;
  id: string;
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
