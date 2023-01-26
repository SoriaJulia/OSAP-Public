import { changeTextInput } from '@lib/utils';
import { Eye, EyeClosed } from 'phosphor-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import InputField from './Input';

const Password = ({ password, setPassword }: { password: string; setPassword: Dispatch<SetStateAction<string>> }) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordIcon = showPassword ? (
    <Eye weight="bold" className="cursor-pointer" onClick={() => setShowPassword(false)} />
  ) : (
    <EyeClosed weight="bold" className="cursor-pointer" onClick={() => setShowPassword(true)} />
  );
  return (
    <InputField
      id="password"
      type={showPassword ? 'text' : 'password'}
      label="Contraseña"
      placeholder="••••••••"
      value={password}
      onChange={changeTextInput(setPassword)}
      trialingIcon={passwordIcon}
    />
  );
};

export default Password;
