import type { LoginResponse } from '@/features/auth/types/auth'
import { authApi } from '@/shared/api/client'

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await authApi.post<LoginResponse>('/Authentication/Login', {
    username,
    password,
  })
  return data
}
