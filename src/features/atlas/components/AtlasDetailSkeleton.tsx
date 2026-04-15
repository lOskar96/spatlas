import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

export const AtlasDetailSkeleton = () => {
  const opacity = useSharedValue(0.4)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.8, { duration: 1000 }), -1, true)
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Container style={animatedStyle}>
      {/* Hero Header Skeleton */}
      <SkeletonHeroHeader>
        <SkeletonIcon size={48} />
        <SkeletonTitle width="80%" />
        <SkeletonSubtitle width="60%" />
      </SkeletonHeroHeader>

      {/* Stats Grid Skeleton */}
      <SkeletonStatsGrid>
        <SkeletonStatCard>
          <SkeletonIconContainer />
          <SkeletonStatInfo>
            <SkeletonText width="70%" height={12} />
            <SkeletonText width="90%" height={18} style={{ marginTop: 4 }} />
            <SkeletonText width="60%" height={11} style={{ marginTop: 4 }} />
          </SkeletonStatInfo>
        </SkeletonStatCard>

        <SkeletonStatCard>
          <SkeletonIconContainer />
          <SkeletonStatInfo>
            <SkeletonText width="70%" height={12} />
            <SkeletonText width="90%" height={18} style={{ marginTop: 4 }} />
            <SkeletonText width="60%" height={11} style={{ marginTop: 4 }} />
          </SkeletonStatInfo>
        </SkeletonStatCard>
      </SkeletonStatsGrid>

      {/* Section 1 - Product */}
      <SkeletonSectionContainer>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon />
          <SkeletonText width="60%" height={16} />
        </SkeletonSectionHeader>
        <SkeletonInfoCard>
          <SkeletonInfoRow>
            <SkeletonText width="40%" height={13} />
            <SkeletonText width="35%" height={14} />
          </SkeletonInfoRow>
        </SkeletonInfoCard>
      </SkeletonSectionContainer>

      {/* Section 2 - Status */}
      <SkeletonSectionContainer>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon />
          <SkeletonText width="60%" height={16} />
        </SkeletonSectionHeader>
        <SkeletonInfoCard>
          <SkeletonInfoRow>
            <SkeletonText width="40%" height={13} />
            <SkeletonText width="35%" height={14} />
          </SkeletonInfoRow>
          <SkeletonDivider />
          <SkeletonInfoRow>
            <SkeletonText width="40%" height={13} />
            <SkeletonText width="50%" height={14} />
          </SkeletonInfoRow>
        </SkeletonInfoCard>
      </SkeletonSectionContainer>

      {/* Section 3 - Map */}
      <SkeletonSectionContainer>
        <SkeletonSectionHeader>
          <SkeletonSectionIcon />
          <SkeletonText width="60%" height={16} />
        </SkeletonSectionHeader>
        <SkeletonMapContainer />
      </SkeletonSectionContainer>

      <SkeletonBottomSpacer />
    </Container>
  )
}

const Container = styled(Animated.ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const SkeletonHeroHeader = styled.View`
  background-color: ${({ theme }) => theme.primary};
  padding: 32px 16px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`

const SkeletonIcon = styled.View<{ size?: number }>`
  width: ${({ size = 48 }) => size}px;
  height: ${({ size = 48 }) => size}px;
  border-radius: ${({ size = 48 }) => size / 2}px;
  background-color: rgba(255, 255, 255, 0.2);
`

const SkeletonTitle = styled.View<{ width?: string }>`
  width: ${({ width = '100%' }) => width};
  height: 28px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`

const SkeletonSubtitle = styled.View<{ width?: string }>`
  width: ${({ width = '100%' }) => width};
  height: 13px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
`

const SkeletonStatsGrid = styled.View`
  flex-direction: row;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 24px;
`

const SkeletonStatCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  gap: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`

const SkeletonIconContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background-color: #e0e0e0;
`

const SkeletonStatInfo = styled.View`
  flex: 1;
  gap: 4px;
`

const SkeletonText = styled.View<{ width?: string; height?: number }>`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = 14 }) => height}px;
  background-color: #e0e0e0;
  border-radius: 4px;
`

const SkeletonSectionContainer = styled.View`
  padding: 0 16px;
  margin-bottom: 20px;
  gap: 8px;
`

const SkeletonSectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const SkeletonSectionIcon = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background-color: #e0e0e0;
`

const SkeletonInfoCard = styled.View`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 16px;
  gap: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 3px;
  elevation: 1;
`

const SkeletonInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const SkeletonDivider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
`

const SkeletonMapContainer = styled.View`
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`

const SkeletonBottomSpacer = styled.View`
  height: 32px;
`
