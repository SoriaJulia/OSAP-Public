import { Factura, Periodo } from '@appTypes/factura';

export const getFilteredFacturasXPeriodo = (facturas: Factura[], selectedYear?: number, selectedState = '') => {
  let year = '';
  if (selectedYear) year = selectedYear.toString();

  const filteredFacturas = facturas.filter(
    (factura) => factura.estado.includes(selectedState) && factura.comp_peri.slice(0, 4).includes(year)
  );

  const result = filteredFacturas.reduce((facturasxPeriodo: Periodo, factura) => {
    if (!facturasxPeriodo[factura.comp_peri]) {
      // eslint-disable-next-line no-param-reassign
      facturasxPeriodo[factura.comp_peri] = [factura];
    } else {
      facturasxPeriodo[factura.comp_peri].push(factura);
    }
    return facturasxPeriodo;
  }, {});

  return result;
};
