import React from 'react';
import InputField, { InputFieldProps } from './Input';
import { useRadioGroup } from './RadioGroup';

const RadioButton = ({ id, ...props }: InputFieldProps) => {
  const { changeHandler, selected } = useRadioGroup();
  return (
    <InputField
      {...props}
      type="radio"
      labelPosition="right"
      id={id}
      onChange={() => {
        changeHandler(id);
      }}
      checked={selected === id}
    />
  );
};

export default RadioButton;
