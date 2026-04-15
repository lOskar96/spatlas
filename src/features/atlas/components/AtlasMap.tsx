import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { MapPin, Minus, Plus } from 'lucide-react-native'
import { useCallback, useRef, useState } from 'react'
import { Pressable } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
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
  const mapRef = useRef<MapView>(null)

  useFocusEffect(
    useCallback(() => {
      setShowMap(true)
      return () => setShowMap(false)
    }, []),
  )

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        if (camera && camera.zoom !== undefined) {
          const newCamera = { ...camera, zoom: camera.zoom + 1 }
          mapRef.current?.animateCamera(newCamera, { duration: 300 })
        }
      })
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.getCamera().then((camera) => {
        if (camera && camera.zoom !== undefined) {
          const newCamera = { ...camera, zoom: Math.max(camera.zoom - 1, 0) }
          mapRef.current?.animateCamera(newCamera, { duration: 300 })
        }
      })
    }
  }

  const handleCenterLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        300,
      )
    }
  }

  const toggleMapType = () => {
    const types: MapType[] = ['standard', 'satellite', 'hybrid', 'terrain']
    const currentIndex = types.indexOf(mapType)
    const nextIndex = (currentIndex + 1) % types.length
    setMapType(types[nextIndex])
  }

  if (!isFocused || !showMap) {
    return null
  }

  return (
    <Container>
      <MapView
        key="google-map"
        ref={mapRef}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
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
            {mapType === 'hybrid' && '🔀'}
            {mapType === 'terrain' && '⛰️'}
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
