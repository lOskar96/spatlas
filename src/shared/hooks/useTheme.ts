import { useColorScheme } from 'react-native'

import { theme } from '@/shared/constants/theme'
import { useThemeStore } from '@/shared/store/useThemeStore'

export const useTheme = () => {
  const systemColorScheme = useColorScheme()
  const { theme: userPreference, setTheme } = useThemeStore()

  const isDark =
    userPreference === 'system' ? systemColorScheme === 'dark' : userPreference === 'dark'

  const colors = isDark ? theme.dark : theme.light

  const toggleTheme = () => {
    if (isDark) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return {
    colors,
    isDark,
    userPreference,
    setTheme,
    toggleTheme,
  }
}
