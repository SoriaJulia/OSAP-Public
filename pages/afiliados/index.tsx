import { GetServerSideProps, NextPage } from 'next';
import { Bank, CreditCard, Receipt, Download } from 'phosphor-react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Factura } from '@appTypes/factura';
import { nextFetch } from '@lib/utils';
import { Credencial } from '@appTypes/credencial';
import { Autorizacion } from '@appTypes/autorizacion';
import Credenciales from 'components/Credencial/List';
import UltimasAutorizaciones from 'components/Facturacion/UltimasAutorizaciones';
import Link from 'next/link';
import Button from '../../components/Base/Button';
import AfiliadosSectionsNav from '../../components/AfiliadosSectionsNav';
import UltimasFacturas from '../../components/Facturacion/UltimasFacturas';
import UltimosCoseguros from '../../components/Facturacion/UltimosCoseguros';

type AfiliadosPageProps = {
  facturas: Array<Factura>;
  credenciales: Array<Credencial>;
  autorizaciones: Array<Autorizacion>;
  agentId: string;
};

export const Afiliados: NextPage<AfiliadosPageProps> = ({ facturas, credenciales, autorizaciones, agentId }) => {
  return (
    <div className="flex flex-col items-center gap-3 divide-y-2 divide-white text-left">
      <Head>
        <title>OSAP - Tramites y consultas online</title>
      </Head>
      <AfiliadosSectionsNav />
      <Credenciales credenciales={credenciales} agentId={agentId} />

      <section className="flex w-full flex-col items-start pt-8">
        <h3 className="mb-6 text-3xl text-blue-800 md:mb-0">Pagos y facturación</h3>
        <div className="flex w-full justify-end gap-1 px-2 pb-4 sm:gap-4 sm:px-6 xs:gap-2">
          <Link href="/afiliados/mediosPago">
            <Button label="Medios de pago" variant="yellowOutlined" leadingIcon={<Bank size={24} />} />
          </Link>
          <Button
            label="Pago online"
            variant="yellowOutlined"
            leadingIcon={<CreditCard size={24} />}
            onClick={() =>
              window.open(`https://osapjubilados.prontopago.com.ar:4545/?serviceid=17944&Param1=${agentId}`, '_blank')
            }
          />
        </div>
        <UltimasFacturas facturas={facturas} />
        <UltimasAutorizaciones autorizaciones={autorizaciones} />

        <article className="mt-2 w-full px-4 text-left md:px-8 lg:w-3/4 lg:px-0">
          <a
            href="http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/folleto_reintegros_2016.pdf"
            className="flex items-center gap-2 py-2 text-blue-700 transition-all hover:text-blue-500 hover:underline hover:decoration-blue-500 md:text-lg"
            target="_blank"
          >
            <Download /> Formulario de acreditación automática de reintegros
          </a>
          <a
            href="http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/AUTORIZACION%20DE%20DEBITO%20AUTOMATICO%20OSAP.pdf"
            className="flex items-center gap-2 py-2 text-blue-700 decoration-blue-300 hover:text-blue-500 hover:underline hover:decoration-blue-500 md:text-lg"
            target="_blank"
          >
            <Download /> Formulario de autorización débito automático de cuenta bancaria
          </a>
        </article>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session || session.status === 'unauthenicated') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const agentId = session.user?.agentId;

  // call consultar facturas
  try {
    const facturas = await nextFetch(`afiliado/${agentId}/factura`, {
      headers: { Cookie: req.headers.cookie || '' },
    });
    const credenciales = await nextFetch(`afiliado/${agentId}/credencial`, {
      headers: { Cookie: req.headers.cookie || '' },
    });
    const autorizaciones = await nextFetch(`afiliado/${agentId}/autorizacion`, {
      headers: { Cookie: req.headers.cookie || '' },
    });
    return {
      props: { facturas, credenciales, autorizaciones, agentId },
    };
  } catch (err) {
    console.error(err);

    // TODO check for default values for pages props
    return {
      props: {
        facturas: [],
        credenciales: [],
        autorizaciones: [],
        agentId,
      },
    };
  }
};

export default Afiliados;
