import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL, SOAP_API_URL } from '../config';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthUserRoles, UserRoles } from '../types/enums';

interface User {
  role: UserRoles;
  Afiliado: string;
}

interface UserCredentials {
  username: string;
  password: string;
  role: AuthUserRoles;
}

interface IAuthContext {
  user: User | null;
  error: any;
  login: (credentials: UserCredentials, cb?: () => void) => void;
  logout: () => void;
  setUser: any;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Must use inside AuthProvider component');
  }
  return authContext;
};

const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/me`, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      if (!data) {
        router.replace('/');
      }
      setUser(data);
    } else {
      router.replace('/');
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (credentials: UserCredentials, cb?: () => void) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();
    if (res.ok) {
      if (cb) {
        cb();
      }
      // window.localStorage.setItem('user', JSON.stringify(userObj));
      setUser({ ...result });
      router.push('/afiliados');
    } else {
      setError(result.message);
    }
  };

  const logout = async () => {
    // window.localStorage.removeItem('user');
    const res = await fetch(`${NEXT_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };
  // const checkUserLoggedIn = async () => {
  //   const res = await fetch(`${SOAP_API_URL}/user`);
  //   const result = await res.json();
  //   if (res.ok) {
  //     setUser(result.user);
  //   } else {
  //     setUser(null);
  //   }
  // };

  // const clearFieldError = (field = '') => {
  //   const errorIndex = errors.findIndex((err) => err.path.includes(field));

  //   if (errorIndex >= 0) {
  //     setErrors((prevErrors) => {
  //       return prevErrors.slice(errorIndex + 1);
  //     });
  //   }
  //   return;
  // };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        error,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
