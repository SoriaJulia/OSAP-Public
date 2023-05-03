import React from 'react';
import TerniumSVG from './SVG/Ternium';
import useMediaQuery from '../hooks/useMediaQuery';
import { Breakpoints } from '../types/enums/breakpoints';

const TerniumBanner = ({ classname }: { classname: string }) => {
  const matches = useMediaQuery(Breakpoints.MD);

  return (
    <div className={`ternium-banner ${classname}`}>
      El plan de Salud de los Empleados de
      {matches ? <TerniumSVG full /> : <TerniumSVG full={false} width="28px" />}
      Argentina
    </div>
  );
};

export default TerniumBanner;
