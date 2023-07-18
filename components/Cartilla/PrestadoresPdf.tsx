import React from 'react';
import { Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import Header from '@components/Base/PDF/Header';
import { Prestador, PrestadorXLocalidad } from '@appTypes/prestador';
import { capitalizeText } from '@lib/utils';
import { Localidad } from '@appTypes/localidad';

Font.register({
  family: 'trade-gothic-next',
  src: 'https://use.typekit.net/af/a741c0/00000000000000007735ba66/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3',
});

Font.register({
  family: 'trade-gothic-next-condensed',
  src: 'https://use.typekit.net/af/395675/00000000000000007735ba49/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3',
});
const styles = StyleSheet.create({
  page: { padding: '40', fontFamily: 'trade-gothic-next', color: '#0f172a' },
  prestador: { paddingLeft: '6', marginBottom: '12', fontSize: '12', borderBottom: '1px solid #cbd5e1' },
  nombre: { fontFamily: 'trade-gothic-next-condensed', fontSize: '16', color: '#1d4451' },
  especialidades: {
    paddingVertical: '6',
    paddingLeft: '12',
    fontSize: '12',
    color: '#242445',
    fontFamily: 'trade-gothic-next',
  },
  domicilio: { paddingVertical: '8' },
  localidad: { paddingBottom: '16', fontSize: '20', color: '#2E5078' },
  footer: { fontSize: '10', position: 'absolute', bottom: 30, left: 0, right: 50, textAlign: 'right' },
  smallText: { fontSize: '10' },
});
const Item = ({ prestador, localidad }: { prestador: Prestador; localidad?: Localidad }) => {
  const { nombre, calle, telefono, depto, nroPuerta, piso, Especialidades } = prestador;

  const domicilio = `${capitalizeText(calle)} Nº ${nroPuerta}${piso && piso !== '0' ? `, Piso: ${piso}` : ''}${
    depto.trim() ? `, Depto: ${depto}` : ''
  } ${localidad ? `${localidad?.nombre || ''}, ${localidad?.provincia}` : ''}`;
  return (
    <View key={`${prestador.id}_${prestador.idInstitucion}`} style={styles.prestador} wrap={false}>
      <Text style={styles.nombre}>
        {capitalizeText(nombre)} - <Text style={styles.especialidades}>{Especialidades}</Text>
      </Text>

      <Text style={styles.domicilio}>
        <Text style={styles.smallText}>Domicilio:</Text> {domicilio} <Text style={styles.smallText}>| Telefono:</Text>{' '}
        {telefono}
      </Text>
    </View>
  );
};

const PrestadoresPdf = ({
  prestadoresXLoc,
  localidades = [],
  subtitulo,
}: {
  prestadoresXLoc: PrestadorXLocalidad;
  localidades?: Localidad[];
  subtitulo: string;
}) => {
  return (
    <>
      {Object.entries(prestadoresXLoc).map(([locId, prestaodresLoc]) => {
        const localidad = localidades.find((loc) => loc.gecrosID === locId);
        if (!localidad?.nombre) return;
        return (
          <Page size="A4" key={`${localidad?.gecrosID}_${Math.random()}`} style={styles.page}>
            <Header title="Cartilla de prestadores" subtitle={subtitulo} />
            <View>
              <Text style={styles.localidad} key={`${localidad?.gecrosID}_${Math.random()}`} fixed>
                {localidad?.nombre}
              </Text>
              {prestaodresLoc.map((prestador) => {
                return (
                  <Item
                    key={`${prestador.id}_${prestador.calle}${prestador.nroPuerta}`}
                    prestador={prestador}
                    localidad={localidad}
                  />
                );
              })}
            </View>
            <View style={styles.footer} key={`${localidad?.gecrosID}_${Math.random()}`} fixed>
              <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
            </View>
          </Page>
        );
      })}
    </>
  );
};

export default PrestadoresPdf;
