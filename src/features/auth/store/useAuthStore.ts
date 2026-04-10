import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  initialize: () => Promise<void>
  setToken: (token: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  initialize: async () => {
    const token = await SecureStore.getItemAsync('userToken')
    if (token) {
      set({ token, isAuthenticated: true })
    }
  },
  setToken: async (token: string) => {
    await SecureStore.setItemAsync('userToken', token)
    set({ token, isAuthenticated: true })
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('userToken')
    set({ token: null, isAuthenticated: false })
  }
}))
