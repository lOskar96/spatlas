import { Image } from 'expo-image'
import { CalendarDays, MapPin, Star } from 'lucide-react-native'
import React, { useMemo } from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

import type { Farm } from '@/features/fincas/types/farm'

interface FarmCardProps {
  farm: Farm
  onPress: () => void
}

export const FarmCard = ({ farm, onPress }: FarmCardProps) => {
  const theme = useTheme()
  const isFavorite = farm.favourite

  const scale = useSharedValue(1)

  const handlePressIn = () => {
    'worklet'
    scale.value = withSpring(0.97)
  }

  const handlePressOut = () => {
    'worklet'
    scale.value = withSpring(1)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const formattedDate = useMemo(() => {
    if (!farm.createdDate) return 'Desconocido'
    const date = new Date(farm.createdDate)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [farm.createdDate])

  return (
    <AnimatedWrapper
      layout={LinearTransition.duration(200)}
      entering={FadeInDown.duration(300)}
    >
      <AnimatedCard style={animatedStyle}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          <FarmImage
            source={
              farm?.image
                ? { uri: farm.image }
                : require('../../../../assets/images/farm.webp')
            }
            contentFit="cover"
          />
          <CardContent>
            <CardHeader>
              <FarmName numberOfLines={1}>{farm.name}</FarmName>
              <StarButton disabled>
                <Star
                  size={24}
                  color={isFavorite ? '#FFD700' : '#E0E0E0'}
                  fill={isFavorite ? '#FFD700' : 'transparent'}
                />
              </StarButton>
            </CardHeader>

            <InfoRow>
              <CalendarDays size={16} color={theme.colors?.primary || '#666'} />
              <InfoText>Creada el {formattedDate}</InfoText>
            </InfoRow>

            <InfoRow>
              <MapPin size={16} color={theme.colors?.primary || '#666'} />
              <InfoText>
                {farm.latitude && farm.longitude
                  ? `${parseFloat(farm.latitude)}, ${parseFloat(farm.longitude)}`
                  : 'Sin coordenadas'}
              </InfoText>
            </InfoRow>
          </CardContent>
        </Pressable>
      </AnimatedCard>
    </AnimatedWrapper>
  )
}

const AnimatedWrapper = Animated.View

const AnimatedCard = styled(Animated.View)`
  background-color: ${({ theme }) => theme.surface || '#FFFFFF'};
  border-radius: 16px;
  margin: 0 20px 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
  overflow: hidden;
`

const FarmImage = styled(Image)`
  width: 100%;
  height: 140px;
`

const CardContent = styled.View`
  padding: 16px;
`

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const FarmName = styled.Text`
  font-size: 20px;
  font-family: 'Manrope-Bold';
  color: ${({ theme }) => theme.text};
  flex: 1;
`

const StarButton = styled.TouchableOpacity`
  padding: 4px;
`

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

const InfoText = styled.Text`
  font-size: 14px;
  font-family: 'Manrope-Regular';
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-left: 8px;
`
