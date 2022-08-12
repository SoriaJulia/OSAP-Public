import { useSession } from 'next-auth/react';

export const useAuth = () => {
  const { status, data: session } = useSession();
  if (status === 'authenticated') {
    return { session };
  }
  return {};
};
