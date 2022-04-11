import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

const Content: React.FC<unknown> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Content;
