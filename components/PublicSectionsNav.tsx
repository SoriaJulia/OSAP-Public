import { ChatsCircle, FirstAid, UserList, Car, Buildings } from 'phosphor-react';
import SectionButton from './Base/SectionButton';

const PublicSectionsNav = () => {
  return (
    <nav className="horizontalScrollbar my-8 flex w-screen gap-4 overflow-x-auto scroll-smooth p-2 md:p-4 xl:justify-center">
      <SectionButton href="/cartilla" label="Cartilla médica" icon={UserList} variant="" />
      <SectionButton label="Consulta a distancia" icon={ChatsCircle} variant="" href="/consultaDistancia" />
      <SectionButton href="/centrosEmergencias" label="Atención de Emergencias" icon={FirstAid} variant="" />
      <SectionButton href="/centrosAtencion" label="Centros de atención" icon={Buildings} variant="" />
      <SectionButton href="/asistenciaAlViajero" label="Asistencia al viajero" icon={Car} variant="" />
    </nav>
  );
};

export default PublicSectionsNav;
