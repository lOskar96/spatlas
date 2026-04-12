export const theme = {
  light: {
    primary: '#1B5E20',
    primaryForeground: '#FFFFFF',
    secondary: '#455A64',
    secondaryForeground: '#FFFFFF',
    tertiary: '#0277BD',
    tertiaryForeground: '#FFFFFF',
    background: '#FFFFFF',
    loginBackground: '#ebf2ec',
    surface: '#F8F9FA',
    text: '#1A1C1E',
    textMuted: '#607D8B',
    border: '#E0E0E0',
    error: '#D32F2F',
    success: '#388E3C',
    mapMarker: '#1B5E20',
  },
  dark: {
    primary: '#4CAF50',
    primaryForeground: '#1A1C1E',
    secondary: '#78909C',
    secondaryForeground: '#1A1C1E',
    tertiary: '#FFB74D',
    tertiaryForeground: '#1A1C1E',
    background: '#121212',
    loginBackground: '#2c312dff',
    surface: '#1A1C1E',
    text: '#F8F9FA',
    textMuted: '#90A4AE',
    border: '#333333',
    error: '#EF5350',
    success: '#81C784',
    mapMarker: '#4CAF50',
  },
  fonts: {
    headline: {
      light: 'Manrope-Bold',
      dark: 'Manrope-Bold',
    },
    body: {
      light: 'Inter-Regular',
      dark: 'Manrope-Regular',
    },
    label: {
      light: 'Inter-Medium',
      dark: 'Manrope-Medium',
    },
  },
}

export type ThemeColors = typeof theme.light
