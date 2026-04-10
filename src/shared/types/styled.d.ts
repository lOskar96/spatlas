import 'styled-components/native'

import type { theme } from '../constants/theme'

type CustomTheme = typeof theme.light

declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomTheme {
    isDark: boolean
    fonts: typeof theme.fonts
  }
}
