import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { Manrope_400Regular, Manrope_700Bold, useFonts } from '@expo-google-fonts/manrope'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useState } from 'react'
import type { MD3Theme } from 'react-native-paper'
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { GlobalToast } from '@/shared/components/GlobalToast'
import { theme as projectTheme } from '@/shared/constants/theme'
import { useTheme } from '@/shared/hooks/useTheme'

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const queryClient = new QueryClient()

// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const { initialize, isAuthenticated } = useAuthStore()
  const { isDark } = useTheme()
  const segments = useSegments()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  const [loaded, error] = useFonts({
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Bold': Manrope_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  })

  useEffect(() => {
    initialize().finally(() => setIsReady(true))
  }, [initialize])

  useEffect(() => {
    if (!isReady || (!loaded && !error)) return

    const inAuthGroup = segments[0] === '(auth)'

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(main)/farms')
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login')
    }
  }, [isAuthenticated, segments, isReady, loaded, error, router])

  // useEffect(() => {
  //   if ((loaded || error) && isReady) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded, error, isReady])

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
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
                <Stack.Screen name="(main)" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <GlobalToast />
            </QueryClientProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PaperProvider>
    </StyledThemeProvider>
  )
}
