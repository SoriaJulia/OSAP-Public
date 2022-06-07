import PageTitle from 'components/Base/PageTitle';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ContactLink from 'components/Base/ContactLink';
import React from 'react';
import { Buildings, Envelope } from 'phosphor-react';
import DebitoAutomatico from '../../public/img/Deb-Aut.jpg';
import Federacion from '../../public/img/Federacion.png';
import Link from '../../public/img/RedLink.png';
import PagoMisCuentas from '../../public/img/PagoMisCuentas.png';
import ProntoPago from '../../public/img/ProntoPago.png';
import ProvinciaNet from '../../public/img/ProvinciaNet.png';
import ProvinciaPagos from '../../public/img/ProvinciaPagos.svg';
import RapiPago from '../../public/img/RapiPago.png';
import VisaHome from '../../public/img/VisaHome.jpg';

const mediosDePago = [
  {
    Name: 'Debito Automatico',
    Image: DebitoAutomatico,
    Content: (
      <p>
        Descargue este formulario y
        <ContactLink
          href="mailto:info@osap.org.ar"
          label="envíelo a info@osap.org.ar"
          icon={<Envelope />}
          variant="blue"
        />
        <ContactLink href="" label="o acérquelo a Moreno 187" variant="blue" icon={<Buildings />} />
      </p>
    ),
    OnClick: () => {
      window.open(
        'http://www.osapsalud.com.ar/descargar_pdf.php?archivo=wordpress/wp-content/uploads/AUTORIZACION%20DE%20DEBITO%20AUTOMATICO%20OSAP.pdf',
        '_blank'
      );
    },
  },
  {
    Name: 'Pago mis cuentas',
    Image: PagoMisCuentas,
    Content: 'En la factura puede encontrar el código para hacer el pago respectivo aquí.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Pronto Pago',
    Image: ProntoPago,
    Content: 'En la factura puede encontrar el código para hacer el pago respectivo aquí.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Rapi Pago',
    Image: RapiPago,
    Content:
      'En la factura puede encontrar el código para hacer el pago respectivo por este medio en cualquier sucursal o en la sucursal virtual.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Red Link',
    Image: Link,
    Content: 'Utilice la red link para pagar sus facturas',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Provincia Net',
    Image: ProvinciaNet,
    Content:
      'Pague su factura en cualquier sucursal Provincia NET (ex BAPRO). O pague sin factura informando la Clave de 6 digitos o el nro. de razon social que puede encontrar en una factura anterior.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Provincian Net Pagos Online',
    Image: ProvinciaPagos,
    Content:
      'Usted puede abonar sus servicios en línea desde cualquier dispositivo conectado a internet sin necesidad de salir de su casa. Regístrese gratis en la plataforma Provincia Net Pagos y aproveche el beneficio.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Visa Home',
    Image: VisaHome,
    Content: 'En la factura puede encontrar el código para hacer el pago respectivo aquí.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
  {
    Name: 'Federacion de Comercio e Industria San Nicolas',
    Image: Federacion,
    Content:
      'Pague con o sin factura en sucursal de la Federacion de Comercio de San Nícolas, calle Urquiza N° 32 de 8 a 17 hs.',
    OnClick: () => {
      window.open('', '_blank');
    },
  },
];

const MediosPago: NextPage = () => {
  return (
    <div className="text-left">
      <Head>
        <title>Medios de Pago - OSAP</title>
      </Head>
      <PageTitle title="Medios de Pago" />
      <div className="flex flex-wrap gap-3">
        {mediosDePago.map((medio) => {
          return (
            <div className="flex w-[45%] items-center justify-evenly rounded bg-white p-3 text-left drop-shadow">
              <button className="mr-3  flex-shrink-0 p-1" onClick={medio.OnClick}>
                <Image src={medio.Image} className="object-scale-down" width={200} height={120} />
              </button>
              {medio.Content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediosPago;
