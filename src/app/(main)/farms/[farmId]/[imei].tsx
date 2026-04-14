import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
// import MapView, { Marker } from 'react-native-maps'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

import { useAtlasDetail } from '@/features/atlas/api/atlasService'
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle'

export default function AtlasDetailScreen() {
  useHeaderTitle('Detalle Atlas')
  const { farmId, imei } = useLocalSearchParams()
  const {
    data: atlas,
    isLoading,
    error,
  } = useAtlasDetail(farmId as string, imei as string)

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    )
  }

  if (error || !atlas) {
    return (
      <LoadingContainer>
        <Text>Ocurrió un error al cargar el detalle del atlas.</Text>
      </LoadingContainer>
    )
  }

  // const latitude = Number.parseFloat(atlas.latitude)
  // const longitude = Number.parseFloat(atlas.longitude)
  // const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude)
  // console.log(MapView, hasLocation, latitude, longitude)

  return (
    <Container>
      <Section>
        <Label>Nombre</Label>
        <Value>{atlas.name}</Value>
      </Section>
      <Section>
        <Label>Imei</Label>
        <Value>{atlas.imei}</Value>
      </Section>
      <DataRow>
        <DataBlock>
          <Label>Batería</Label>
          <Value>{atlas.battery}%</Value>
        </DataBlock>
        <DataBlock>
          <Label>Señal</Label>
          <Value>{atlas.signal}%</Value>
        </DataBlock>
      </DataRow>
      <Section>
        <Label>Expiración</Label>
        <Value>
          {new Date(atlas.expiredDate).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Value>
      </Section>
      <Section>
        <Label>Tipo</Label>
        <Value>{atlas.productTypeName}</Value>
      </Section>
      {/* <MapContainer>
        {MapView && Marker && hasLocation ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker coordinate={{ latitude, longitude }} title={atlas.name} />
          </MapView>
        ) : (
          <EmptyText>
            {MapView
              ? 'Ubicación no disponible'
              : 'Mapa no disponible en Expo Go. Usa un build nativo o dev client para ver el mapa.'}
          </EmptyText>
        )}
      </MapContainer> */}
    </Container>
  )
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 16px;
`

const Section = styled.View`
  margin-bottom: 16px;
`

const Label = styled(Text)`
  font-family: 'Manrope-Regular';
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 6px;
`

const Value = styled(Text)`
  font-family: 'Manrope-Bold';
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`

const DataRow = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
`

const DataBlock = styled.View`
  flex: 1;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.surface || '#fff'};
`

// const MapContainer = styled(View)`
//   height: 320px;
//   border-radius: 16px;
//   overflow: hidden;
//   background-color: ${({ theme }) => theme.surface || '#f8fafc'};
// `

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

// const EmptyText = styled(Text)`
//   color: ${({ theme }) => theme.text};
//   opacity: 0.7;
//   text-align: center;
//   padding: 24px;
// `
