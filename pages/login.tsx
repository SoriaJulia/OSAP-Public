import { UserRoles } from '@appTypes/enums';
import { changeTextInput } from '@lib/utils';
import Button from 'components/Base/Button';
import { GetServerSideProps, NextPage } from 'next';
import { RedirectableProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { WarningCircle, SignIn, Spinner } from 'phosphor-react';
import Head from 'next/head';
import React, { useState } from 'react';
import Logo from 'components/SVG/Logo';
import Slogan from 'components/SVG/Slogan';
import InputField from '@components/Base/Fields/Input';
import RadioButton from '@components/Base/Fields/RadioButton';
import RadioGroup from '@components/Base/Fields/RadioGroup';
import Link from 'next/link';
import Password from '@components/Base/Fields/Password';
import { nextAuthOptions } from './api/auth/[...nextauth]';

const Login: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
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
        if (!localStorage.getItem('showTravelBanner') && role === UserRoles.AFILIADO)
          localStorage.setItem('showTravelBanner', 'true');
        router.push(redirectUrl);
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-evenly bg-gradient-to-br from-orange-600/60 to-yellow-500/50">
      <Head>
        <title>Iniciar Sesion - OSAP </title>
      </Head>

      <div className="mb-6 mt-4 flex max-w-md flex-col items-center rounded-xl bg-slate-50 px-6 py-6 drop-shadow-2xl lg:w-2/6">
        <Link passHref href="/">
          <button
            aria-label="Volver a la pagina principal"
            tabIndex={-1}
            className="mt-6 flex items-center gap-2 md:mr-0"
          >
            <Logo width="120" height="52" className="fill-orange-500" />
            <Slogan width="180" height="52" className=" fill-grey-400 " />
          </button>
        </Link>
        <form>
          <div className="mt-12 flex flex-col gap-4">
            <h1 className="mb-2 text-3xl text-orange-600">Ingresá </h1>
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

            <div className="mb-4 min-h-[24px] w-80 overflow-hidden text-rose-500">
              {error ? (
                <>
                  <WarningCircle className="mb-1 mr-1 inline" size={18} weight="bold" />
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
              trailingIcon={
                loginIn ? <Spinner size={20} className="animate-spin" /> : <SignIn weight="bold" size={20} />
              }
              type="submit"
              disabled={!username || !password}
              onClick={handleLogin}
              showIconOnMobile
            />
            <Button
              label="Cancelar"
              variant="yellowFill"
              type="button"
              onClick={() => {
                setError(null);
                router.push('/');
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session && session.user) {
    const destination = session?.user.agentId === '0' ? '/prestadores' : '/afiliados';
    return {
      redirect: {
        destination,
        permanent: true,
      },
    };
  }

  return { props: {} };
};

export default Login;
