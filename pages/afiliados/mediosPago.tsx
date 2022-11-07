import PageTitle from 'components/Base/PageTitle';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ContactLink from 'components/Base/ContactLink';
import React from 'react';
import { getSession } from 'next-auth/react';
import { Buildings, CopySimple, Envelope, FileArrowDown } from 'phosphor-react';
import Button from 'components/Base/Button';
import Federacion from '../../public/img/Federacion.png';
import Link from '../../public/img/RedLink.png';
import PagoMisCuentas from '../../public/img/PagoMisCuentas.png';
import ProntoPago from '../../public/img/ProntoPago.png';
import ProvinciaNet from '../../public/img/ProvinciaNet.png';
import ProvinciaPagos from '../../public/img/ProvinciaPagos.svg';
import RapiPago from '../../public/img/RapiPago.png';

const mediosDePago = [
  {
    Name: 'Pago mis cuentas',
    Image: PagoMisCuentas,
    Content: 'En la factura puede encontrar el código para hacer el pago respectivo.',
    OnClick: () => {
      window.open(
        'https://paysrv3.pagomiscuentas.com/pmctas/home.do#_ga=2.174360226.1448306210.1598373360-2092372822.1561138945',
        '_blank'
      );
    },
    ActionText: 'Ir a Pago mis Cuentas',
  },
  {
    Name: 'Pronto Pago',
    Image: ProntoPago,
    Content: 'En la factura puede encontrar el código para hacer el pago respectivo.',
    OnClick: () => {
      window.open('https://pagoweb.prontopago.com.ar/web.html', '_blank');
    },
    ActionText: 'Ir a Pronto Pago',
  },
  {
    Name: 'Rapi Pago',
    Image: RapiPago,
    Content:
      'En la factura puede encontrar el código para hacer el pago respectivo por este medio en cualquier sucursal o online.',
    OnClick: () => {
      window.open('https://rapipago.com.ar/rapipagoWeb/', '_blank');
    },
    ActionText: 'Ir a Pagar Online o Buscar sucursales',
  },
  {
    Name: 'Red Link',
    Image: Link,
    Content: 'Utilice la red link para pagar sus facturas, desde su celular, un cajero o su homebanking de la red link',
    OnClick: () => {
      window.open('https://www.redlink.com.ar/link_pagos_y_cobranzas.html', '_blank');
    },
    ActionText: 'Ir a Red Link',
  },
  {
    Name: 'Provincia Net',
    Image: ProvinciaNet,
    Content:
      'Pague su factura en cualquier sucursal Provincia NET (ex BAPRO). O sin factura informando la Clave de 6 digitos o el nro. de razon social que puede encontrar en una factura anterior.',
    OnClick: () => {
      window.open('https://www.provincianet.com.ar/donde-pago', '_blank');
    },
    ActionText: 'Buscar Sucursales',
  },
  {
    Name: 'Provincian Net Pagos Online',
    Image: ProvinciaPagos,
    Content:
      'Usted puede abonar sus servicios en línea desde cualquier dispositivo conectado a internet sin necesidad de salir de su casa. Regístrese gratis y aproveche el beneficio.',
    OnClick: () => {
      window.open('https://pagosnet.provincianet.com.ar/pagosnet/public/application/index/landing', '_blank');
    },
    ActionText: 'Ir a PagosNet',
  },
  {
    Name: 'Federacion de Comercio e Industria San Nicolas',
    Image: Federacion,
    Content:
      'Pague con o sin factura en sucursal de la Federacion de Comercio de San Nícolas, calle Urquiza N° 32 de 8 a 17 hs.',
    OnClick: () => {
      window.open('https://g.page/federacionsn?share', '_blank');
    },
    ActionText: 'Ver en el Mapa',
  },
];

const MediosPago: NextPage<{ agentId: string }> = ({ agentId }) => {
  return (
    <div className="text-left">
      <Head>
        <title>Medios de Pago - OSAP</title>
      </Head>
      <PageTitle title="Medios de Pago" />
      <div className="flex flex-wrap gap-8">
        <article className="pb-10">
          <h2 className="mb-3  text-2xl text-orange-700">Pago Online</h2>
          <div className="mb-10 flex items-center gap-4 text-lg">
            <div className=" flex w-8/12 flex-col">
              Ingrese a nuestro sistema de pago y pague con cualquier Tarjeta de Debito
              <span className="mt-1 flex text-sm">
                *Agente de Cuenta: {agentId}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(agentId);
                  }}
                  title="Copiar"
                >
                  <CopySimple
                    className="mx-1 rounded-full p-1 text-blue-600 hover:bg-white"
                    size={22}
                    weight="regular"
                  />
                </button>
              </span>
            </div>
            <Button
              label="Ingresar"
              variant="yellowFill"
              onClick={() =>
                window.open(`https://osapjubilados.prontopago.com.ar:4545/?serviceid=17944&Param1=${agentId}`, '_blank')
              }
            />
          </div>
        </article>
        <article className="pb-10">
          <h2 className="mb-3 text-2xl text-orange-700">Debito Automatico</h2>
          Para adherirse descargue el siguiente formulario:
          <button
            onClick={() => {
              window.open(
                'http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/AUTORIZACION%20DE%20DEBITO%20AUTOMATICO%20OSAP.pdf',
                '_blank'
              );
            }}
            title="Descargar formulario"
          >
            <FileArrowDown
              className="m-1 inline rounded-full p-1 text-blue-500 hover:bg-white hover:text-blue-700"
              weight="regular"
              size={28}
            />
          </button>
          <div className="flex flex-wrap gap-1">
            y envíelo a
            <ContactLink
              href="mailto:info@osap.org.ar"
              label="info@osap.org.ar"
              icon={<Envelope />}
              variant="blue"
              inline
            />
            o acérquelo a nuesta Sede
            <ContactLink href="" label="Moreno 187" variant="blue" icon={<Buildings />} inline />
          </div>
        </article>
      </div>
      <article>
        <h2 className="mb-4 text-2xl text-orange-700">Otros medios de pago</h2>
        <div className="flex flex-wrap gap-3">
          {mediosDePago.map((medio) => {
            return (
              <div
                className="flex max-w-lg flex-col items-center justify-evenly rounded bg-white p-3 text-left drop-shadow sm:flex-row lg:w-[48%] lg:max-w-full"
                key={medio.Name}
              >
                <button
                  className="mr-3 mb-2 flex flex-shrink-0 flex-col items-center gap-2 p-1 text-sm text-slate-600 underline sm:mb-0"
                  onClick={medio.OnClick}
                >
                  <Image src={medio.Image} alt={medio.Name} className="object-scale-down" width={200} height={120} />
                  {medio.ActionText}
                </button>
                {medio.Content}
              </div>
            );
          })}
        </div>
      </article>
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

  return {
    props: { agentId },
  };
};
export default MediosPago;
