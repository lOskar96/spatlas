import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useToastStore } from '@/shared/store/useToastStore'

const AUTH_BASE_URL = 'https://api.spherag.com'
const CORE_BASE_URL = 'https://apicore.spherag.com'

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
  console.log(error.response?.data)
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
