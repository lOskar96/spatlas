import { CalendarClock } from 'lucide-react-native'
import { useMemo } from 'react'
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

import type { Atlas } from '../types/atlas'
import { AtlasBattery } from './AtlasBattery'
import { AtlasSignal } from './AtlasSignal'

interface AtlasCardProps {
  atlas: Atlas
  index: number
  onPress?: () => void
}

export function AtlasCard({ atlas, index, onPress }: AtlasCardProps) {
  const theme = useTheme()
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

  const formattedExpiry = useMemo(() => {
    if (!atlas.expiredDate) return 'Sin fecha'
    const date = new Date(atlas.expiredDate)
    if (isNaN(date.getTime())) return atlas.expiredDate
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [atlas.expiredDate])

  const isExpired = useMemo(() => {
    if (!atlas.expiredDate) return false
    return new Date(atlas.expiredDate) < new Date()
  }, [atlas.expiredDate])

  return (
    <AnimatedWrapper
      layout={LinearTransition.duration(200)}
      entering={FadeInDown.delay(index * 60).duration(350)}
    >
      <AnimatedCard style={animatedStyle}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onPress}
        >
          <CardHeader>
            <NameContainer>
              <DeviceName numberOfLines={1}>{atlas.name}</DeviceName>
              <ImeiText>{atlas.imei}</ImeiText>
            </NameContainer>
            <ExpiryBadge expired={isExpired}>
              <ExpiryBadgeText expired={isExpired}>
                {isExpired ? 'Expirado' : 'Activo'}
              </ExpiryBadgeText>
            </ExpiryBadge>
          </CardHeader>

          <Divider />

          <StatsRow>
            <StatItem>
              <CalendarClock
                size={16}
                color={isExpired ? '#ef4444' : theme.colors?.primary || '#6366f1'}
              />
              <StatLabel>Expiración</StatLabel>
              <StatValue expired={isExpired}>{formattedExpiry}</StatValue>
            </StatItem>

            <StatDivider />

            <StatItem>
              <AtlasBattery battery={atlas.battery} />
              <StatLabel>Batería</StatLabel>
              <StatValue>{atlas.battery}%</StatValue>
            </StatItem>

            <StatDivider />

            <StatItem>
              <AtlasSignal signal={atlas.signal} />
              <StatLabel>Señal</StatLabel>
              <StatValue>{atlas.signal}%</StatValue>
            </StatItem>
          </StatsRow>
        </Pressable>
      </AnimatedCard>
    </AnimatedWrapper>
  )
}

const AnimatedWrapper = Animated.View

const AnimatedCard = styled(Animated.View)`
  background-color: ${({ theme }) => theme.surface || '#FFFFFF'};
  border-radius: 16px;
  margin: 0 16px 12px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 10px;
  elevation: 3;
  overflow: hidden;
`

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px;
`

const NameContainer = styled.View`
  flex: 1;
  margin-right: 12px;
`

const DeviceName = styled.Text`
  font-size: 16px;
  font-family: 'Manrope-Bold';
  color: ${({ theme }) => theme.text};
  margin-bottom: 2px;
`

const ImeiText = styled.Text`
  font-size: 12px;
  font-family: 'Manrope-Regular';
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  letter-spacing: 0.5px;
`

const ExpiryBadge = styled.View<{ expired: boolean }>`
  background-color: ${({ expired }) =>
    expired ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)'};
  border-radius: 20px;
  padding: 4px 12px;
`

const ExpiryBadgeText = styled.Text<{ expired: boolean }>`
  font-size: 12px;
  font-family: 'Manrope-Bold';
  color: ${({ expired }) => (expired ? '#ef4444' : '#22c55e')};
`

const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.border || 'rgba(0,0,0,0.06)'};
  margin: 0 16px;
`

const StatsRow = styled.View`
  flex-direction: row;
  padding: 12px 16px;
`

const StatItem = styled.View`
  flex: 1;
  align-items: center;
  gap: 4px;
`

const StatDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.border || 'rgba(0,0,0,0.06)'};
  margin: 4px 0;
`

const StatLabel = styled.Text`
  font-size: 11px;
  font-family: 'Manrope-Regular';
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  margin-top: 2px;
`

const StatValue = styled.Text<{ expired?: boolean }>`
  font-size: 13px;
  font-family: 'Manrope-Bold';
  color: ${({ theme, expired }) => (expired ? '#ef4444' : theme.text)};
  text-align: center;
`
