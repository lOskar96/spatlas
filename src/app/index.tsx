import { Redirect } from 'expo-router'

import { useAuthStore } from '@/features/auth/store/useAuthStore'

export default function Index() {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) {
    return <Redirect href="/(main)/farms" />
  }
  return <Redirect href="/(auth)/login" />
}
