import React from 'react'
import { Snackbar, useTheme } from 'react-native-paper'

import { useToastStore } from '@/shared/store/useToastStore'

export function GlobalToast() {
  const { visible, message, type, hideToast } = useToastStore()
  const theme = useTheme()

  let backgroundColor = theme.colors.inverseSurface
  if (type === 'error') {
    backgroundColor = theme.colors.error
  } else if (type === 'success') {
    backgroundColor = theme.colors.primary
  }

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideToast}
      action={{
        label: 'OK',
        onPress: hideToast,
        textColor:
          type === 'error' ? theme.colors.onError : theme.colors.inverseOnSurface,
      }}
      duration={Snackbar.DURATION_SHORT}
      style={{ backgroundColor }}
      theme={{
        colors: {
          inverseOnSurface:
            type === 'error' ? theme.colors.onError : theme.colors.inverseOnSurface,
        },
      }}
    >
      {message}
    </Snackbar>
  )
}
