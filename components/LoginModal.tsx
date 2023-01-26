import Image from 'next/image';
import { useState } from 'react';
import * as React from 'react';
import { SignIn, Spinner, WarningCircle } from 'phosphor-react';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { changeTextInput } from '@lib/utils';
import Button from './Base/Button';
import Modal, { ModalProps } from './Base/Modal';
import loginImg from '../public/img/login.svg';
import { UserRoles } from '../types/enums';
import InputField from './Base/Fields/Input';
import Password from './Base/Fields/Password';
import RadioGroup from './Base/Fields/RadioGroup';
import RadioButton from './Base/Fields/RadioButton';

const LoginModal: React.FC<ModalProps> = ({ onDismiss, show, title }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loginIn, setLoginIn] = useState(false);
  const [role, setRole] = useState(UserRoles.AFILIADO);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoginIn(true);
    e.preventDefault();
    const redirectUrl = role === UserRoles.AFILIADO ? '/afiliados' : '/prestadores';
    signIn<RedirectableProviderType>('credentials', {
      username,
      password,
      role,
      redirect: false,
    }).then((value) => {
      if (value?.error) {
        setLoginIn(false);
        setError(value.error);
      } else {
        router.push(redirectUrl);
      }
    });
  };

  return (
    <Modal onDismiss={onDismiss} show={show} title={title}>
      <div className="flex w-full">
        <div className="hidden md:contents">
          <Image src={loginImg} />
        </div>
        <form className="mt-11 flex w-full flex-col items-center justify-around px-2 md:w-7/12 md:px-0">
          <div className="flex w-11/12 flex-col gap-6 md:w-10/12">
            <InputField
              id="user"
              type="text"
              label="Usuario"
              placeholder="30256544"
              helpText="Sin espacios ni caracteres especiales"
              value={username}
              onChange={changeTextInput(setUsername)}
            />
            <Password password={password} setPassword={setPassword} />
            <RadioGroup legend="Tipo de usuario" stateSetter={setRole} defaultValue={UserRoles.AFILIADO}>
              <RadioButton id={UserRoles.AFILIADO} label="Afiliado" />
              <RadioButton id={UserRoles.PRESTADOR} label="Prestador" />
            </RadioGroup>
            <div className="h-12 w-80 overflow-hidden text-rose-500">
              {error ? (
                <>
                  <WarningCircle className="mr-1 mb-1 inline" size={18} weight="bold" />
                  {error}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="m-4 flex justify-end gap-2 place-self-end pt-0 md:pt-6 ">
            <Button
              label="Cancelar"
              variant="yellowFill"
              type="button"
              onClick={() => {
                setError(null);
                onDismiss();
              }}
            />
            <Button
              label={loginIn ? 'Ingresando...' : 'Ingresar'}
              variant="fill"
              trailingIcon={
                loginIn ? <Spinner size={20} className="animate-spin" /> : <SignIn weight="bold" size={20} />
              }
              type="submit"
              disabled={!username || !password}
              onClick={handleLogin}
              showIconOnMobile
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
