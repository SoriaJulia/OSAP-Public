import React, { ReactNode } from 'react';

type PageTitleProps = { title: string; icon?: ReactNode; subtitle?: string };

export const PageTitle = ({ title, icon, subtitle }: PageTitleProps) => {
  return (
    <>
      <h1 className="flex items-end gap-2 pt-6 font-display text-4xl text-orange-600">
        {icon}
        {title}
      </h1>
      <p className="pb-10 text-left text-xl text-gray-600">{subtitle}</p>
    </>
  );
};

export default PageTitle;
