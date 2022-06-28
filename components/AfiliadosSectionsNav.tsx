import { ChatsCircle, Calendar, UserList, FirstAidKit, Phone, Car } from 'phosphor-react';
import SectionButton from './Base/SectionButton';

const AfiliadosSectionsNav = () => {
  return (
    <nav className="horizontalScrollbar flex w-screen gap-4 overflow-x-auto scroll-smooth p-4 md:p-8 xl:justify-center">
      <SectionButton label="Consulta a distancia" icon={ChatsCircle} variant="blue" href="/consultaDistancia" />
      {/* <SectionButton href="/turnosOnline" label="Turnos online" icon={Calendar} variant="blue" /> */}
      <SectionButton
        href="http://www.osapsalud.com.ar/prestador/?tipo=49.62#form"
        label="Cartilla médica"
        icon={UserList}
        variant="blue"
      />
      {/* <SectionButton href="cobertura" label="Cobertura" icon={FirstAidKit} variant="blue" /> */}
      <SectionButton
        href="http://www.osapsalud.com.ar/telefonos-utiles/"
        label="Teléfonos útiles"
        icon={Phone}
        variant="blue"
      />
      <SectionButton href="/asistenciaAlViajero" label="Asistencia al viajero" icon={Car} variant="blue" />
    </nav>
  );
};

export default AfiliadosSectionsNav;
