import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import type { LoginResponse } from '@/features/auth/types/auth'
import { authApi } from '@/shared/api/client'

export const useLogin = () => {
  const { setToken } = useAuthStore()
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      const { data } = await authApi.post<LoginResponse>(`/Authentication/Login`, {
        username,
        password,
      })
      return data
    },
    onSuccess: ({ accessToken }) => setToken(accessToken.token),
  })
}
