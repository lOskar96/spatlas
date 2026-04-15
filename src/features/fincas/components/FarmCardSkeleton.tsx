import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

export const FarmCardSkeleton = () => {
  const opacity = useSharedValue(0.4)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 1000 }), -1, true)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <SkeletonCard style={animatedStyle}>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonHeader>
          <SkeletonTitle />
          <SkeletonIcon />
        </SkeletonHeader>
        <SkeletonRow />
        <SkeletonRow />
      </SkeletonContent>
    </SkeletonCard>
  )
}

const SkeletonCard = styled(Animated.View)`
  background-color: ${({ theme }) => theme.surface || '#FFFFFF'};
  border-radius: 16px;
  margin: 0 20px 16px;
  overflow: hidden;
`

const SkeletonImage = styled.View`
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.textMuted || '#E0E0E0'};
`

const SkeletonContent = styled.View`
  padding: 16px;
`

const SkeletonHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const SkeletonTitle = styled.View`
  height: 24px;
  width: 60%;
  background-color: ${({ theme }) => theme.textMuted || '#E0E0E0'};
  border-radius: 4px;
`

const SkeletonIcon = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.textMuted || '#E0E0E0'};
`

const SkeletonRow = styled.View`
  height: 16px;
  width: 40%;
  background-color: ${({ theme }) => theme.textMuted || '#E0E0E0'};
  border-radius: 4px;
  margin-bottom: 12px;
`
