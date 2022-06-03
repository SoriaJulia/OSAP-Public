import { Factura, Periodo } from '@appTypes/factura';

export const getFilteredFacturasXPeriodo = (facturas: Factura[], selectedYear?: number, selectedState = '') => {
  let year = '';
  if (selectedYear) year = selectedYear.toString();

  const filteredFacturas = facturas.filter(
    (factura) => factura.Estado.includes(selectedState) && factura.Peri.slice(0, 4).includes(year)
  );

  const result = filteredFacturas.reduce((facturasxPeriodo: Periodo, factura) => {
    if (!facturasxPeriodo[factura.Peri]) {
      // eslint-disable-next-line no-param-reassign
      facturasxPeriodo[factura.Peri] = [factura];
    } else {
      facturasxPeriodo[factura.Peri].push(factura);
    }
    return facturasxPeriodo;
  }, {});

  return result;
};
