import { ReactNode } from 'react';

const PageHeader = ({ children }: { children?: ReactNode }) => {
  return <div className="flex flex-col pb-10 pt-6">{children}</div>;
};

export default PageHeader;
