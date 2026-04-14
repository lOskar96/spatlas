import { useSegments } from 'expo-router'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import styled from 'styled-components/native'

import { useTheme } from '@/shared/hooks/useTheme'

import { LogoutModal } from './LogoutModal'

type MainHeaderProps = {
  navigation: {
    goBack: () => void
    canGoBack: () => boolean
  }
  title?: string
}

export function MainHeader({ navigation, title }: MainHeaderProps) {
  const { toggleTheme, isDark } = useTheme()
  const segments = useSegments()
  const [modalVisible, setModalVisible] = useState(false)

  const mainSegments = segments.filter(
    (segment) => segment !== '(main)' && segment !== '(auth)',
  )
  const isNestedRoute = mainSegments.length > 1
  const showBack = navigation.canGoBack() && isNestedRoute

  return (
    <HeaderContainer>
      <LeftContent>
        {showBack ? (
          <IconButton icon="arrow-left" size={24} onPress={navigation.goBack} />
        ) : (
          <Spacer />
        )}
        <Title>{title}</Title>
      </LeftContent>

      <RightContent>
        <IconButton
          icon={isDark ? 'white-balance-sunny' : 'weather-night'}
          size={24}
          onPress={toggleTheme}
          accessibilityLabel="Cambiar tema"
        />

        <ProfileButton onPress={() => setModalVisible(true)}>
          <AvatarIcon size={40} icon="power" color="#fff" />
        </ProfileButton>
      </RightContent>

      <LogoutModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.SafeAreaView`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`

const LeftContent = styled.View`
  padding-left: 0px;
  flex-direction: row;
  align-items: center;
`

const Spacer = styled.View`
  width: 40px;
`

const Title = styled.Text`
  font-size: 18px;
  font-family: 'Manrope-Bold';
  color: ${({ theme }) => theme.text};
`

const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
`

const ProfileButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
  margin-right: 24px;
`

const AvatarIcon = styled(Avatar.Icon)`
  background-color: ${({ theme }) => theme.primary};
`
