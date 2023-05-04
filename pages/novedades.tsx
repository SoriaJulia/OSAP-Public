import { NextPage } from 'next';
import Head from 'next/head';
import NovedadesInfiniteList from '@components/Novedades/InfiniteList';

const Novedades: NextPage = () => {
  return (
    <div className="flex">
      <Head>
        <title>Novedades - OSAP</title>
        <meta name="description" content="Ultimas Novedades relacionadas a OSAP." />
      </Head>
      <section className="max-h-min w-full ">
        <div className=" mb-8 flex flex-col items-center gap-9 rounded-sm bg-gradient-to-br from-orange-50 via-yellow-50 to-slate-50 pt-8">
          <h1 className="mt-6 w-max  text-5xl text-slate-600">OSAP NEWS</h1>
          <div className="flex items-center gap-1">
            <hr className="w-9 border-b-2 border-orange-600/80" />
            <hr className="w-2 border-b-2 border-orange-600/80" />
          </div>
          <p className="mb-8 text-xl text-slate-500">Te presentamos nuestas últimas novedades</p>
        </div>

        <NovedadesInfiniteList />
      </section>
    </div>
  );
};

export default Novedades;
