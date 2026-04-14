import * as React from 'react'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import styled from 'styled-components/native'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { theme } from '@/shared/constants/theme'

type LogoutModalProps = {
  visible: boolean
  onDismiss: () => void
}

export function LogoutModal({ visible, onDismiss }: LogoutModalProps) {
  const logout = useAuthStore((state) => state.logout)
  const containerStyle = {
    backgroundColor: theme.surface,
    padding: 20,
    margin: 20,
    borderRadius: 8,
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}
      >
        <Title>¿Estás seguro de que deseas cerrar sesión?</Title>
        <ButtonsContainer>
          <Button mode="contained" onPress={onDismiss}>
            Cancelar
          </Button>
          <Button
            mode="contained"
            onPress={() => logout()}
            buttonColor={theme.light.error}
          >
            Salir
          </Button>
        </ButtonsContainer>
      </Modal>
    </Portal>
  )
}

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`

const Title = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`
