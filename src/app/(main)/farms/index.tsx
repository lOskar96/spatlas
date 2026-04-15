import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import styled from 'styled-components/native'

import { useFarms } from '@/features/fincas/api/farmService'
import { FarmCard } from '@/features/fincas/components/FarmCard'
import { FarmCardSkeleton } from '@/features/fincas/components/FarmCardSkeleton'
import { FarmHeader } from '@/features/fincas/components/FarmHeader'
import type { Farm } from '@/features/fincas/types/farm'
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle'
import { useSearch } from '@/shared/hooks/useSearch'

export default function FarmsScreen() {
  useHeaderTitle('Fincas')
  const { data, refetch, isLoading, isRefetching, error } = useFarms()
  const router = useRouter()

  const {
    searchQuery,
    setSearchQuery,
    filtered: filteredData,
    activeFilters,
    toggleFilter,
  } = useSearch({
    items: (data as Farm[]) || [],
    searchFields: ['name'],
    filters: {
      favorites: (farm) => farm.favourite,
    },
  })

  if (error) {
    return (
      <CenterContainer>
        <Title>Error al cargar las fincas</Title>
      </CenterContainer>
    )
  }

  return (
    <MainContainer>
      <FarmHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFavoritesOnly={activeFilters.includes('favorites')}
        setShowFavoritesOnly={() => toggleFilter('favorites')}
      />
      <FlatList<Farm>
        data={isLoading ? [] : filteredData}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        renderItem={({ item }) => (
          <FarmCard farm={item} onPress={() => router.push(`/farms/${item.id}` as any)} />
        )}
        ListHeaderComponent={
          <>
            {isLoading && (
              <View>
                {[1, 2, 3].map((key) => (
                  <FarmCardSkeleton key={key} />
                ))}
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyText>
              No se han encontrado fincas que coincidan con la búsqueda.
            </EmptyText>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        style={{ paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </MainContainer>
  )
}

const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`

const EmptyText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  margin-top: 32px;
  font-family: 'Manrope-Regular';
`
