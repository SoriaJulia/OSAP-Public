import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import * as React from 'react';

const LabelPosition = {
  top: 'flex-col mb-2',
  left: 'gap-2 items-center',
};

type Props = {
  label: string;
  helpText?: string;
  error?: any;
  errorText?: string;
  labelPosition?: 'top' | 'left';
  inputWidth?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    { label, name, helpText, error, errorText, labelPosition = 'top', required, inputWidth, cols, rows, ...props },
    ref
  ) => {
    return (
      <div className={`flex ${LabelPosition[labelPosition]}`}>
        <label className="text-left text-xl text-blue-700" htmlFor={name}>
          {label}
          {required && (
            <span title="Requerido" className="cursor-help">
              {' '}
              *
            </span>
          )}
        </label>
        <textarea
          aria-label={label}
          cols={cols || 50}
          rows={rows || 2}
          ref={ref}
          {...props}
          className={`${inputWidth || 'w-full md:w-72'} input peer `}
        />
        <span className="my-1 text-left text-sm font-light">{helpText}</span>
        <span className="my-1 hidden text-left text-sm font-light text-pink-800 peer-invalid:block">{errorText}</span>
      </div>
    );
  }
);

export default TextArea;
