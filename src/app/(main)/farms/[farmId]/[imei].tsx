import { useLocalSearchParams } from 'expo-router'
import { CalendarClock, MapPin, Package } from 'lucide-react-native'
import { RefreshControl, View } from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

import { useAtlasDetail } from '@/features/atlas/api/atlasService'
import { AtlasBattery } from '@/features/atlas/components/AtlasBattery'
import { AtlasDetailSkeleton } from '@/features/atlas/components/AtlasDetailSkeleton'
import { AtlasMap } from '@/features/atlas/components/AtlasMap'
import { AtlasSignal } from '@/features/atlas/components/AtlasSignal'
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle'
import { useTheme } from '@/shared/hooks/useTheme'

export default function AtlasDetailScreen() {
  useHeaderTitle('Detalle Atlas')
  const { isDark } = useTheme()
  const { farmId, imei } = useLocalSearchParams()
  const {
    data: atlas,
    refetch,
    isLoading,
    isRefetching,
    error,
  } = useAtlasDetail(farmId as string, imei as string)

  if (isLoading) {
    return <AtlasDetailSkeleton />
  }

  if (error || !atlas) {
    return (
      <LoadingContainer>
        <ErrorText>Ocurrió un error al cargar el detalle del atlas.</ErrorText>
      </LoadingContainer>
    )
  }

  const signalBatteryText = (percentage: number) => {
    if (percentage >= 80) {
      return 'Excelente'
    }
    if (percentage >= 50) {
      return 'Buena'
    }
    if (percentage >= 20) {
      return 'Baja'
    }
    return 'Crítica'
  }

  const iconColor = isDark ? '#fff' : '#000'

  const latitude = Number.parseFloat(atlas.latitude)
  const longitude = Number.parseFloat(atlas.longitude)
  const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude)

  const expiryDate = new Date(atlas.expiredDate)
  const isExpired = expiryDate < new Date()
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <Container
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
    >
      <HeroHeader>
        <HeroContent>
          <DeviceIcon>📡</DeviceIcon>
          <DeviceName numberOfLines={1}>{atlas.name}</DeviceName>
          <DeviceImei>{atlas.imei}</DeviceImei>
        </HeroContent>
      </HeroHeader>

      <StatsGrid>
        <StatCard>
          <StatIconContainer battery>
            <AtlasBattery battery={atlas.battery} size={28} />
          </StatIconContainer>
          <StatInfo>
            <StatLabel>Batería</StatLabel>
            <StatValueLarge>{atlas.battery}%</StatValueLarge>
            <StatDescription>{signalBatteryText(atlas.battery)}</StatDescription>
          </StatInfo>
        </StatCard>

        <StatCard>
          <StatIconContainer signal>
            <AtlasSignal signal={atlas.signal} size={28} />
          </StatIconContainer>
          <StatInfo>
            <StatLabel>Señal</StatLabel>
            <StatValueLarge>{atlas.signal}%</StatValueLarge>
            <StatDescription>{signalBatteryText(atlas.signal)}</StatDescription>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <SectionContainer>
        <SectionTitleBar>
          <Package size={18} color={iconColor} />
          <SectionTitle>Producto</SectionTitle>
        </SectionTitleBar>
        <InfoCard>
          <InfoRow>
            <InfoLabel>Tipo</InfoLabel>
            <InfoValue>{atlas.productTypeName}</InfoValue>
          </InfoRow>
        </InfoCard>
      </SectionContainer>

      <SectionContainer>
        <SectionTitleBar>
          <CalendarClock size={18} color={iconColor} />
          <SectionTitle>Estado</SectionTitle>
        </SectionTitleBar>
        <InfoCard>
          <InfoRow>
            <InfoLabel>Expiración</InfoLabel>
            <ExpiryBadge expired={isExpired}>
              <ExpiryText expired={isExpired}>
                {isExpired ? '❌ Expirado' : `✓ ${daysUntilExpiry} días`}
              </ExpiryText>
            </ExpiryBadge>
          </InfoRow>
          <InfoDivider />
          <InfoRow>
            <InfoLabel>Fecha</InfoLabel>
            <InfoValue>
              {expiryDate.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </InfoValue>
          </InfoRow>
        </InfoCard>
      </SectionContainer>

      {hasLocation && (
        <SectionContainer>
          <SectionTitleBar>
            <MapPin size={18} color={iconColor} />
            <SectionTitle>Ubicación</SectionTitle>
          </SectionTitleBar>
          <MapContainerStyled>
            <AtlasMap
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              coordinate={{ latitude, longitude }}
              title={atlas.name}
            />
          </MapContainerStyled>
        </SectionContainer>
      )}

      <BottomSpacer />
    </Container>
  )
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const HeroHeader = styled.View`
  background-color: ${({ theme }) => theme.primary};
  padding: 32px 16px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`

const HeroContent = styled.View`
  align-items: center;
  gap: 12px;
  width: 100%;
`

const DeviceIcon = styled(Text)`
  font-size: 48px;
`

const DeviceName = styled(Text)`
  font-family: 'Manrope-Bold';
  font-size: 28px;
  color: #fff;
  text-align: center;
`

const DeviceImei = styled(Text)`
  font-family: 'Manrope-Regular';
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
`

const StatsGrid = styled.View`
  flex-direction: row;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 24px;
`

const StatCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`

const StatIconContainer = styled.View<{ battery?: boolean; signal?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background-color: ${({ battery }) =>
    battery ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  justify-content: center;
  align-items: center;
`

const StatInfo = styled.View`
  flex: 1;
  gap: 4px;
`

const StatLabel = styled(Text)`
  font-family: 'Manrope-Regular';
  font-size: 12px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`

const StatValueLarge = styled(Text)`
  font-family: 'Manrope-Bold';
  font-size: 22px;
  color: ${({ theme }) => theme.text};
`

const StatDescription = styled(Text)`
  font-family: 'Manrope-Regular';
  font-size: 11px;
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
`

const SectionContainer = styled.View`
  padding: 0 16px;
  margin-bottom: 20px;
  gap: 8px;
`

const SectionTitleBar = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const SectionTitle = styled(Text)`
  font-family: 'Manrope-Bold';
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`

const InfoCard = styled.View`
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

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const InfoLabel = styled(Text)`
  font-family: 'Manrope-Regular';
  font-size: 13px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`

const InfoValue = styled(Text)`
  font-family: 'Manrope-Bold';
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  text-align: right;
`

const InfoDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.border || 'rgba(0, 0, 0, 0.05)'};
`

const ExpiryBadge = styled.View<{ expired: boolean }>`
  background-color: ${({ expired }) =>
    expired ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)'};
  border-radius: 8px;
  padding: 6px 12px;
`

const ExpiryText = styled(Text)<{ expired: boolean }>`
  font-family: 'Manrope-Bold';
  font-size: 13px;
  color: ${({ expired }) => (expired ? '#ef4444' : '#22c55e')};
`

const MapContainerStyled = styled(View)`
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

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  gap: 16px;
`

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-family: 'Manrope-Regular';
  font-size: 16px;
  text-align: center;
`

const BottomSpacer = styled.View`
  height: 32px;
`
