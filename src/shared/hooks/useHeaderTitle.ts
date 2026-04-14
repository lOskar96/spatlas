// shared/hooks/useHeaderTitle.ts
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'

export const useHeaderTitle = (title?: string) => {
  const navigation = useNavigation()

  useEffect(() => {
    if (!title) return

    navigation.setOptions({
      title,
    })
  }, [title])
}
