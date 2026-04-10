import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios'

import { useAuthStore } from '@/features/auth/store/useAuthStore'

const AUTH_BASE_URL = 'https://api.spherag.com'
const CORE_BASE_URL = 'https://apicore.spherag.com'

export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const coreApi = axios.create({
  baseURL: CORE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

coreApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = useAuthStore((state) => state.token)
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

coreApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { logout } = useAuthStore.getState()
    if (error.response?.status === 401) {
      logout()
    }
    return Promise.reject(error)
  }
)
