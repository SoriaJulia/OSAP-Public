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
      <Header>{user && <LoggedUserNavbar user={user} />}</Header>
      <main className="flex w-full grow flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
