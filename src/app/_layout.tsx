import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Manrope_400Regular, Manrope_700Bold, useFonts } from '@expo-google-fonts/manrope'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo } from 'react'
import type { MD3Theme } from 'react-native-paper'
import {
  adaptNavigationTheme,
  Button,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { theme as projectTheme } from '@/shared/constants/theme'
import { useTheme } from '@/shared/hooks/useTheme'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const queryClient = new QueryClient()

// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { initialize } = useAuthStore()
  const { isDark, colors, toggleTheme } = useTheme()

  const [loaded, error] = useFonts({
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Bold': Manrope_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  })

  useEffect(() => {
    initialize()
  }, [initialize])

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded, error])

  const paperTheme: MD3Theme = useMemo(
    () => ({
      ...(isDark ? MD3DarkTheme : MD3LightTheme),
      version: 3 as const,
      colors: {
        ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
        ...(isDark ? DarkTheme.colors : LightTheme.colors),
        primary: isDark ? projectTheme.dark.primary : projectTheme.light.primary,
        secondary: isDark ? projectTheme.dark.secondary : projectTheme.light.secondary,
        tertiary: isDark ? projectTheme.dark.tertiary : projectTheme.light.tertiary,
      },
    }),
    [isDark],
  )

  const navigationTheme = isDark ? DarkTheme : LightTheme

  const styledTheme = useMemo(
    () => ({
      ...(isDark ? projectTheme.dark : projectTheme.light),
      isDark,
      fonts: projectTheme.fonts,
    }),
    [isDark],
  )

  if (!loaded && !error) {
    return null
  }

  return (
    <StyledThemeProvider theme={styledTheme}>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navigationTheme as any}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <Stack
                screenOptions={{
                  headerShown: true,
                  headerStyle: {
                    backgroundColor: colors.background,
                  },
                  headerTintColor: colors.text,
                  headerRight: () => (
                    <Button
                      icon={isDark ? 'weather-sunny' : 'weather-night'}
                      onPress={toggleTheme}
                    >
                      {isDark ? 'Light' : 'Dark'}
                    </Button>
                  ),
                  contentStyle: {
                    backgroundColor: colors.background,
                  },
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/login" options={{ headerShown: true }} />
              </Stack>
              <StatusBar style={isDark ? 'light' : 'dark'} />
            </QueryClientProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PaperProvider>
    </StyledThemeProvider>
  )
}
