import Image from 'next/image';
import { useState } from 'react';
import * as React from 'react';
import { SignIn } from 'phosphor-react';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { InputChangeHandler } from 'types/reactCommon';
import { useRouter } from 'next/router';
import { changeTextInput } from '@lib/utils';
import Button from './Base/Button';
import Field from './Base/Field';
import Modal, { ModalProps } from './Base/Modal';
import loginImg from '../public/img/login.svg';
import { UserRoles } from '../types/enums';

type LoginModalProps = {
  userRole: UserRoles;
} & ModalProps;

const LoginModal: React.FC<LoginModalProps> = ({ onDismiss, show, title, userRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Modal onDismiss={onDismiss} show={show} title={title}>
      <div className="flex h-[50vh] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[45vw]">
        <div className="hidden md:contents">
          <Image src={loginImg} />
        </div>
        <form className="mt-10 flex w-full flex-col items-center justify-around px-2 md:w-7/12 md:px-0">
          <div className="flex w-10/12 flex-col gap-6">
            <Field
              type="text"
              label="DNI"
              name="user"
              placeholder="30256544"
              helpText="Sin espacios ni caracteres especiales"
              errorText=""
              value={username}
              onChange={changeTextInput(setUsername)}
            />
            <Field
              type="password"
              label="Contraseña"
              name="pass"
              placeholder="••••••••"
              helpText="Si no tenes contraseña repetí tu DNI"
              value={password}
              onChange={changeTextInput(setPassword)}
            />
            {error && <div className="text-rose-500">{error}</div>}
          </div>
          <div className="m-4 flex justify-end gap-2 place-self-end pt-10 md:pt-6 ">
            <Button
              label="Cancelar"
              variant="outlined"
              type="button"
              onClick={() => {
                onDismiss();
              }}
            />
            <Button
              label="Ingresar"
              variant="fill"
              trailingIcon={<SignIn weight="bold" size={20} />}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                signIn<RedirectableProviderType>('credentials', {
                  username,
                  password,
                  role: UserRoles.AFILIADO,
                  redirect: false,
                }).then((value) => {
                  if (value?.error) {
                    setError(value.error);
                  } else {
                    router.push('/afiliados');
                  }
                });
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
