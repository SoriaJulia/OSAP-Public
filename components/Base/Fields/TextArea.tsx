import { TextareaHTMLAttributes } from 'react';
import * as React from 'react';
import FieldLabel from './FieldLabel';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
};

type Props = {
  label: string;
  helpText?: string;
  errorText?: string;
  labelPosition?: 'top' | 'left';
  inputWidth?: string;
  id: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      label,
      helpText,
      id,
      errorText,
      labelPosition = 'top',
      required,
      inputWidth = '',
      className = '',
      cols,
      rows,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`field ${LabelPosition[labelPosition]} ${className}`}>
        <FieldLabel htmlFor={id} text={label} required={required} />
        <textarea
          aria-label={label}
          cols={cols || 50}
          rows={rows || 2}
          ref={ref}
          id={id}
          required={required}
          {...props}
          className={`field-control peer ${inputWidth}`}
        />
        <span className="field-help-text">{helpText}</span>
        <span className="field-error-text">{errorText}</span>
      </div>
    );
  }
);

export default TextAreaField;
