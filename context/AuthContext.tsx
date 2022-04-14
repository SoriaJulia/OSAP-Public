import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL, SOAP_API_URL } from '../config';

interface IAuthContext {
  user: any;
  error: any;
  login: (credentials: { user: string; password: string }) => void;
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
  const [error, setError] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   checkUserLoggedIn();
  // }, []);

  // const register = async (user: any) => {
  //   const res = await fetch(`${SOAP_API_URL}/register`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(user),
  //   });
  //   const result = await res.json();
  //   if (res.ok) {
  //     setUser(result.user);
  //     router.push('/account/dashboard');
  //   }
  // };

  const login = async (credentials: any) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const result = await res.json();
    if (res.ok) {
      setUser(result.user);
      router.push('/account/dashboard');
    }
  };
  // const logout = async () => {
  //   const res = await fetch(`${SOAP_API_URL}/logout`, { method: 'POST' });
  //   if (res.ok) {
  //     setUser(null);
  //     router.push('/');
  //   }
  // };
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
      value={{
        user,
        error,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
