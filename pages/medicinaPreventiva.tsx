import ContactLink from '@components/Base/ContactLink';
import PageTitle from '@components/Base/PageTitle';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Envelope, MapPin, Phone } from 'phosphor-react';
import React from 'react';

const MedicinaPreventiva: NextPage = () => {
  const router = useRouter();
  return (
    <div className=" osap-container text-left">
      <Head>
        <title>Medicina Preventiva - OSAP</title>
        <meta
          name="description"
          content="Centro de medicina preventiva OSAP. Es un centro Medico en San Nicolas disponible para todos los afiliados"
        />
      </Head>
      <div className="mb-4 flex items-end justify-between">
        <PageTitle title="Centro de Medicina Preventiva OSAP" />
        {/*  
         <Button
          label="Turnos Online"
          onClick={() => router.push('/turnosonline')}
          leadingIcon={<Calendar size={24} />}
        /> */}
      </div>
      <article className="mt-8 flex flex-wrap rounded-sm bg-white/40 p-8">
        <div className="space-y-5 text-xl font-semibold text-gray-500 lg:w-3/5">
          <p>
            A través de la <b>concientización</b>, la <b>prevención</b>, y con <b>10 años de trayectoria</b>, nuestro
            centro médico se encuentra <b>altamente especializado en la detección temprana de factores de riesgo.</b>
          </p>
          <p>
            Junto con OSAP, se impulsa el control anual permitiendo la detección precoz de enfermedades y mejora de
            calidad de vida.
          </p>
          <p>
            Para que puedos acceder a atención particular y asesoramiento ideal, mediante chequeos{' '}
            <b className="text-teal-600">
              te acompañamos para que logres abandonar conductas nocivas e incorporar hábitos saludables de vida.
            </b>
          </p>
        </div>
        <div className="flex flex-col gap-3 p-4 text-lg lg:w-2/5 lg:pl-16">
          <p className="font-semibold text-blue-500">Te esperamos en</p>
          <ContactLink
            href="https://goo.gl/maps/i4F37QpXTJU79GaPA"
            label="Maipú 36, San Nicolás"
            variant="blue"
            icon={<MapPin size={24} />}
          />
          <p className="font-semibold text-blue-500">Contactanos</p>
          <ContactLink href="tel:03364450966" label="336 4450966" variant="blue" icon={<Phone size={24} />} />
          <ContactLink href="tel:03364450977" label="336 4450977" variant="blue" icon={<Phone size={24} />} />
          <ContactLink
            href="mailto:centro@osap.org.ar"
            label="centro@osap.org.ar"
            variant="blue"
            icon={<Envelope size={24} />}
          />
        </div>
      </article>
      <article className="mt-8 flex flex-wrap rounded-sm bg-white/40 p-8">
        <h2 className="text-2xl font-semibold text-orange-700">¿Sabías sobre tus beneficios como afiliado?</h2>
        <ul className="mt-8 grid gap-6 text-gray-600 lg:grid-cols-2">
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Consultas clínicas</h3>
            <p>
              Contamos con el mejor equipo de especialistas a los cuales podes acudir ante cualquier malestar y
              ayudarte.
            </p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Nutrición</h3>
            <p>
              Disponemos de profesionales que acompañan en el proceso de mejorar hábitos alimenticios y sostenerlos en
              el tiempo.
            </p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Radiografías</h3>
            <p>
              Realizamos pruebas rápidas e indoloras para detectar cualquier anomalía relacionada con el corazón, los
              pulmones, las vias respiratorias, los vasos sanguineos, los huesos de la columna y el tórax.
            </p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Ecografías</h3>
            <p>Realizamos ecografías de abdomen, pelvis, cuello y vasos del cuello a partir de mayores de 50 años.</p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Ergometrías</h3>
            <p>
              Contamos con pruebas de esfuerzo que consisten en la realización de un ejercicio físico intenso encaminado
              a evaluar si durante dicho esfuerzo se encuentra la existencia de un problema de riego para mayores de 40
              años.
            </p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Seguimiento post chequeos</h3>
            <p>
              Devolución personalizada y constante seguimiento de tus chegueos realizados para no perderlos de vista.
            </p>
          </li>
          <li className="card p-4">
            <h3 className="mb-2 text-xl text-teal-600">Kinesiología</h3>
            <p>
              Realizamos rehabilitación física y de manejo del dolor, a través de diferentes terapias como Fisioterapia,
              y Ejercicio terapéutico, que ayudan al paciente a recuperar el movimiento normal de partes de su cuerpo.
            </p>
          </li>
        </ul>
      </article>
    </div>
  );
};

export default MedicinaPreventiva;
