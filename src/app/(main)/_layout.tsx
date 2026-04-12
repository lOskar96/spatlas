import { Stack } from 'expo-router'
import { Button } from 'react-native-paper'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useTheme } from '@/shared/hooks/useTheme'

export default function MainLayout() {
  const { isDark, colors, toggleTheme } = useTheme()
  const { logout } = useAuthStore()
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitle: 'Mis Fincas',
        headerTitleStyle: {
          fontFamily: 'Manrope-Bold',
          fontSize: 24,
        },
        headerTintColor: colors.text,
        headerRight: () => (
          <>
            <Button
              icon={isDark ? 'weather-sunny' : 'weather-night'}
              onPress={toggleTheme}
            >
              {isDark ? 'Light' : 'Dark'}
            </Button>
            <Button icon="logout" onPress={() => logout()}>
              Cerrar Sesión
            </Button>
          </>
        ),
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="farms" />
    </Stack>
  )
}
