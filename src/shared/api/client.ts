import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Constants from 'expo-constants'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useToastStore } from '@/shared/store/useToastStore'

const config = (Constants.expoConfig?.extra ?? Constants.manifest?.extra) as
  | Record<string, string | undefined>
  | undefined
const AUTH_BASE_URL = config?.authBaseUrl
const CORE_BASE_URL = config?.coreBaseUrl

export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const coreApi = axios.create({
  baseURL: CORE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

coreApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const getErrorMessage = (error: AxiosError) => {
  const data = error.response?.data as any
  return (
    data?.Message ||
    data?.error ||
    data?.message ||
    error.message ||
    'An unexpected error occurred'
  )
}

coreApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { logout } = useAuthStore.getState()
    const { showToast } = useToastStore.getState()

    if (error.response?.status === 401) {
      logout()
    }

    showToast(getErrorMessage(error), 'error')
    return Promise.reject(error)
  },
)

authApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { showToast } = useToastStore.getState()

    showToast(getErrorMessage(error), 'error')
    return Promise.reject(error)
  },
)
