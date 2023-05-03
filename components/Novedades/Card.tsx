/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Novedad } from '@appTypes/novedad';
import React from 'react';
import { Calendar } from 'phosphor-react';

type CardProps = {
  novedad: Novedad;
};

const NovedadesActionButtons = dynamic(() => import('@components/Novedades/ActionButtons'), { ssr: false });

const Card = React.memo(
  ({ novedad }: CardProps) => {
    const { titulo, slug, miniaturaUrl, fechaPublicacion } = novedad;

    const publicacion = new Date(fechaPublicacion).toLocaleDateString(undefined, { year: '2-digit', month: 'short' });
    return (
      <Link href={`novedades/${slug}`}>
        <a
          style={{ backgroundImage: `url(${miniaturaUrl})` }}
          className="flex h-[300px] cursor-pointer flex-col justify-between rounded-sm bg-white/40 bg-cover bg-no-repeat text-xl text-gray-700 shadow-sm shadow-gray-200 transition hover:scale-105 hover:shadow-lg focus:scale-105 focus:shadow-lg"
        >
          <div className="m-3 flex justify-end gap-3">
            <NovedadesActionButtons slug={slug} />
          </div>
          <article className="flex justify-center">
            <h2 className="flex min-h-[4em] w-full flex-col  bg-white/80 p-2 pr-4 text-lg text-slate-800 backdrop-blur-sm">
              <small className="flex items-center justify-end gap-0.5 text-xs text-gray-500">
                <Calendar /> {publicacion}
              </small>
              {titulo}
            </h2>
          </article>
        </a>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.novedad._id === nextProps.novedad._id;
  }
);

export default Card;
