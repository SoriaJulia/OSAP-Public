import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Footer } from './Footer';
import { Header } from './Header';
import LoggedUserNavbar from '../Navbar/LoggedUserNavbar';

const Layout: React.FC = ({ children }) => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="flex min-h-screen flex-col justify-between bg-grey-50 text-blue-900">
      <Header>{user && <LoggedUserNavbar user={session?.data?.user} />}</Header>
      <main className="flex w-full grow flex-col px-6 pt-8 lg:px-16 xl:px-20 2xl:px-32">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
