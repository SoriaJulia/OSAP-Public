import { Faq } from '@appTypes/faq';
import { SpinnerGap } from 'phosphor-react';
import React from 'react';
import FaqCard from './Card';

const FaqList = ({
  faqs,
  isLoading,
  filter,
  error,
}: {
  faqs: Faq[];
  isLoading: boolean;
  filter: string;
  error: any;
}) => {
  if (isLoading)
    return (
      <p className="flex items-center justify-center gap-2 text-xl text-teal-500">
        <SpinnerGap className="animate-spin" /> {filter ? 'Buscando resultados...' : 'Cargando...'}
      </p>
    );
  if (error || faqs.length <= 0) return <p>No se encontraron resultados</p>;
  return (
    <>
      {faqs.map((faq) => (
        <FaqCard content={faq.content} key={faq._id} title={faq.title} />
      ))}
    </>
  );
};

export default FaqList;
