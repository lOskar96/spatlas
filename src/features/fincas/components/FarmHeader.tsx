import React from 'react'
import { IconButton, Searchbar, useTheme } from 'react-native-paper'
import styled, { useTheme as useStyledTheme } from 'styled-components/native'

interface FarmHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showFavoritesOnly: boolean
  setShowFavoritesOnly: (show: boolean) => void
}

export const FarmHeader = ({
  searchQuery,
  setSearchQuery,
  showFavoritesOnly,
  setShowFavoritesOnly,
}: FarmHeaderProps) => {
  const theme = useTheme()
  const styledTheme = useStyledTheme()

  return (
    <HeaderContainer>
      <StyledSearchbar
        placeholder="Buscar finca..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={theme.colors.onSurfaceVariant}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        inputStyle={{ color: styledTheme.text, alignSelf: 'center', minHeight: 0 }}
      />
      <IconButton
        icon={showFavoritesOnly ? 'star' : 'star-outline'}
        iconColor={showFavoritesOnly ? '#FFD700' : theme.colors.onSurfaceVariant}
        size={24}
        onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 26px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) =>
    theme.isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'};
`

const StyledSearchbar = styled(Searchbar).attrs(({ theme }) => ({
  inputStyle: {
    fontSize: 14,
    minHeight: 0,
    alignSelf: 'center',
    color: theme.text,
  },
}))`
  flex: 1;
  elevation: 0;
  height: 46px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.surface};
`
