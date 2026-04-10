import { Appearance } from 'react-native'
import { create } from 'zustand'

interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  getEffectiveTheme: () => 'light' | 'dark'
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  getEffectiveTheme: () => {
    const { theme } = get()
    if (theme === 'system') {
      return Appearance.getColorScheme() || 'light'
    }
    return theme
  },
}))
