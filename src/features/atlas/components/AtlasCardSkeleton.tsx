import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

export const AtlasCardSkeleton = () => {
  const opacity = useSharedValue(0.4)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 1000 }), -1, true)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <SkeletonCard style={animatedStyle}>
      <SkeletonHeader>
        <SkeletonLeftContent>
          <SkeletonTitle />
          <SkeletonSubtitle />
        </SkeletonLeftContent>
        <SkeletonBadge />
      </SkeletonHeader>

      <SkeletonDivider />

      <SkeletonStats>
        <SkeletonIcon />
        <SkeletonStatLabel />
        <SkeletonStatValue />

        <SkeletonIcon />
        <SkeletonStatLabel />
        <SkeletonStatValue />

        <SkeletonIcon />
        <SkeletonStatLabel />
        <SkeletonStatValue />
      </SkeletonStats>
    </SkeletonCard>
  )
}

const SkeletonCard = styled(Animated.View)`
  background-color: ${({ theme }) => theme.surface || '#FFFFFF'};
  border-radius: 16px;
  margin: 0 16px 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
  overflow: hidden;
`

const SkeletonHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

const SkeletonLeftContent = styled.View`
  flex: 1;
  gap: 8px;
`

const SkeletonTitle = styled.View`
  height: 18px;
  width: 70%;
  background-color: #e0e0e0;
  border-radius: 4px;
`

const SkeletonSubtitle = styled.View`
  height: 14px;
  width: 40%;
  background-color: #d0d0d0;
  border-radius: 4px;
`

const SkeletonBadge = styled.View`
  height: 24px;
  width: 60px;
  border-radius: 12px;
  background-color: #e0e0e0;
`

const SkeletonDivider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin: 0 16px;
`

const SkeletonStats = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  gap: 8px;
`

const SkeletonIcon = styled.View`
  flex: 1;
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
`

const SkeletonStatLabel = styled.View`
  flex: 1;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 4px;
`

const SkeletonStatValue = styled.View`
  flex: 1;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 4px;
`
