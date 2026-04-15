import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import Constants from 'expo-constants'
import { MapPin, Minus, Plus } from 'lucide-react-native'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, Pressable } from 'react-native'
import styled from 'styled-components/native'

interface AtlasMapProps {
  initialRegion: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
  coordinate: {
    latitude: number
    longitude: number
  }
  title: string
}

type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain'

export function AtlasMap({ initialRegion, coordinate, title }: AtlasMapProps) {
  const isFocused = useIsFocused()
  const [showMap, setShowMap] = useState(false)
  const [mapType, setMapType] = useState<MapType>('standard')
  const mapRef = useRef<any>(null)
  const [region, setRegion] = useState(initialRegion)

  useEffect(() => {
    setRegion(initialRegion)
  }, [initialRegion])

  useFocusEffect(
    useCallback(() => {
      setShowMap(true)
      return () => setShowMap(false)
    }, []),
  )

  const handleZoomIn = () => {
    const nextRegion = {
      ...region,
      latitudeDelta: Math.max(region.latitudeDelta * 0.5, 0.0001),
      longitudeDelta: Math.max(region.longitudeDelta * 0.5, 0.0001),
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion(nextRegion, 300)
    }
    setRegion(nextRegion)
  }

  const handleZoomOut = () => {
    const nextRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion(nextRegion, 300)
    }
    setRegion(nextRegion)
  }

  const handleCenterLocation = () => {
    const centerRegion = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion(centerRegion, 300)
    }
    setRegion(centerRegion)
  }

  const toggleMapType = () => {
    const types: MapType[] = ['standard', 'satellite']
    const currentIndex = types.indexOf(mapType)
    const nextIndex = (currentIndex + 1) % types.length
    setMapType(types[nextIndex])
  }

  const appOwnership = (Constants as any).appOwnership
  const executionEnvironment = (Constants as any).executionEnvironment
  const isExpoGo =
    appOwnership === 'expo' ||
    executionEnvironment === 'storeClient' ||
    executionEnvironment === 'expoGo'

  if (!isFocused || !showMap) {
    return null
  }

  if (isExpoGo) {
    return (
      <PlaceholderContainer>
        <PlaceholderText>Mapas no disponibles en Expo Go.</PlaceholderText>
        <PlaceholderSubText>
          Usa un build nativo o Expo dev client para ver el mapa.
        </PlaceholderSubText>
      </PlaceholderContainer>
    )
  }

  const MapLib: any = require('react-native-maps')
  const MapView = MapLib.default
  const Marker = MapLib.Marker

  return (
    <Container>
      <MapView
        key="google-map"
        ref={mapRef}
        region={region}
        onRegionChangeComplete={setRegion}
        liteMode={Platform.OS === 'android'}
        style={{ flex: 1 }}
        mapType={mapType}
        showsCompass={true}
        showsScale={true}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
      >
        <Marker
          coordinate={coordinate}
          title={title}
          tracksViewChanges={false}
          pinColor="#3B82F6"
        />
      </MapView>

      <ControlsContainer>
        <ZoomControlsContainer>
          <ControlButton onPress={handleZoomIn}>
            <Plus size={20} color="#fff" />
          </ControlButton>
          <ControlButton onPress={handleZoomOut}>
            <Minus size={20} color="#fff" />
          </ControlButton>
        </ZoomControlsContainer>

        <CenterButton onPress={handleCenterLocation}>
          <MapPin size={20} color="#fff" />
        </CenterButton>

        <MapTypeButton onPress={toggleMapType}>
          <MapTypeText>
            {mapType === 'standard' && '🗺️'}
            {mapType === 'satellite' && '🛰️'}
          </MapTypeText>
        </MapTypeButton>
      </ControlsContainer>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  position: relative;
`

const ControlsContainer = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  gap: 8px;
  pointer-events: auto;
`

const ZoomControlsContainer = styled.View`
  gap: 8px;
`

const ControlButton = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #3b82f6;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`

const CenterButton = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #10b981;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`

const MapTypeButton = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #8b5cf6;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 5;
`

const MapTypeText = styled.Text`
  font-size: 20px;
`

const PlaceholderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 16px;
`

const PlaceholderText = styled.Text`
  font-family: 'Manrope-Bold';
  font-size: 18px;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 8px;
`

const PlaceholderSubText = styled.Text`
  font-family: 'Manrope-Regular';
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  text-align: center;
`
