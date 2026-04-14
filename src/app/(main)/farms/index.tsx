import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import styled from 'styled-components/native'

import { useFarms } from '@/features/fincas/api/farmService'
import { FarmCard } from '@/features/fincas/components/FarmCard'
import { FarmCardSkeleton } from '@/features/fincas/components/FarmCardSkeleton'
import { FarmHeader } from '@/features/fincas/components/FarmHeader'
import type { Farm } from '@/features/fincas/types/farm'
import { useHeaderTitle } from '@/shared/hooks/useHeaderTitle'

export default function FarmsScreen() {
  useHeaderTitle('Fincas')
  const { data, refetch, isLoading, error } = useFarms()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const filteredData = useMemo(() => {
    if (!data) return []
    return (data as Farm[]).filter((farm) => {
      const matchesSearch = farm.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorite = showFavoritesOnly ? farm.favourite : true
      return matchesSearch && matchesFavorite
    })
  }, [data, searchQuery, showFavoritesOnly])

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
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />
      <FlatList<Farm>
        data={isLoading ? [] : filteredData}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
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
