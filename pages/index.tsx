import { UserRoles } from '@appTypes/enums';
import { changeTextInput } from '@lib/utils';
import Button from 'components/Base/Button';
import Field from 'components/Base/Field';
import { GetServerSideProps, NextPage } from 'next';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { WarningCircle, SignIn } from 'phosphor-react';
import Head from 'next/head';
import React, { useState } from 'react';
import Logo from 'components/SVG/Logo';
import Slogan from 'components/SVG/Slogan';
import Link from 'next/link';
import { nextAuthOptions } from './api/auth/[...nextauth]';

const Login: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loginIn, setLoginIn] = useState(false);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoginIn(true);
    e.preventDefault();
    signIn<RedirectableProviderType>('credentials', {
      username,
      password,
      role: UserRoles.AFILIADO,
      redirect: false,
    }).then((value) => {
      if (value?.error) {
        setLoginIn(false);
        setError(value.error);
      } else {
        router.push('/afiliados');
      }
    });
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <Head>
        <title>Iniciar Sesion - OSAP </title>
      </Head>

      <div className="flex h-full flex-col items-center justify-evenly bg-gradient-to-br from-orange-600/60 to-yellow-500/50">
        <form className="my-6 flex max-w-md flex-col items-center justify-around rounded-xl bg-slate-50 py-6 px-6 drop-shadow-2xl lg:w-2/6 ">
          <Link passHref href="http://www.osapsalud.com.ar/">
            <button className=" mt-4 flex items-center gap-2 md:mr-0">
              <Logo width="120" height="52" className="fill-orange-500" />
              <Slogan width="180" height="52" className=" fill-grey-400 " />
            </button>
          </Link>
          <div className="mt-20 flex flex-col gap-6 ">
            <h1 className=" text-3xl text-orange-600">Ingresá </h1>
            <Field
              type="text"
              label="DNI"
              name="user"
              placeholder="30256544"
              helpText="Sin espacios ni caracteres especiales"
              value={username}
              onChange={changeTextInput(setUsername)}
              inputWidth="w-auto"
            />
            <Field
              type="password"
              label="Contraseña"
              name="pass"
              placeholder="••••••••"
              helpText="Si no tenes contraseña repetí tu DNI"
              value={password}
              onChange={changeTextInput(setPassword)}
              inputWidth="w-auto"
            />
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
          <div className="flex flex-row-reverse gap-2 pt-10 md:pt-0 ">
            <Button
              label={loginIn ? 'Ingresando...' : 'Ingresar'}
              variant="fill"
              trailingIcon={<SignIn weight="bold" size={20} />}
              type="submit"
              disabled={!username || !password}
              onClick={handleLogin}
              showIconOnMobile
            />
            <Button
              label="Cancelar"
              variant="outlined"
              type="button"
              onClick={() => {
                setError(null);
                window.open('http://www.osapsalud.com.ar/', '_self');
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session && session.user) {
    return {
      redirect: {
        destination: '/afiliados',
        permanent: true,
      },
    };
  }

  return { props: {} };
};

export default Login;
