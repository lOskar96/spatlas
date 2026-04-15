import { useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'
import { Text } from 'react-native-paper'
import styled from 'styled-components/native'

import { useAtlas } from '@/features/atlas/api/atlasService'
import { AtlasCard } from '@/features/atlas/components/AtlasCard'
import { AtlasCardSkeleton } from '@/features/atlas/components/AtlasCardSkeleton'
import type { Atlas } from '@/features/atlas/types/atlas'
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle'

export default function AtlasScreen() {
  useHeaderTitle('Atlas')
  const { farmId } = useLocalSearchParams()
  const router = useRouter()
  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
  } = useAtlas(farmId as string)

  const atlasItems = data?.pages.flatMap((page) => page.items) ?? []

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <MainContainer>
      {error ? (
        <EmptyText>Error al obtener los atlas.</EmptyText>
      ) : (
        <FlatList<Atlas>
          data={atlasItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <AtlasCard
              atlas={item}
              index={index}
              onPress={() => router.push(`/farms/${farmId}/${item.imei}` as any)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading || isRefetching} onRefresh={refetch} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            isLoading && atlasItems.length === 0 ? (
              <View>
                {[1, 2, 3].map((key) => (
                  <AtlasCardSkeleton key={key} />
                ))}
              </View>
            ) : null
          }
          ListEmptyComponent={
            !isLoading ? (
              <EmptyText>No hay atlas disponibles para esta finca.</EmptyText>
            ) : null
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <LoadingMore>
                <ActivityIndicator size="small" />
                <LoadingText>Cargando más atlas...</LoadingText>
              </LoadingMore>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          style={{ paddingTop: 12 }}
        />
      )}
    </MainContainer>
  )
}

const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const EmptyText = styled(Text)`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin: 24px 16px;
  font-family: 'Manrope-Regular';
`

const LoadingMore = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
`

const LoadingText = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-family: 'Manrope-Regular';
`
