import { Stack } from 'expo-router'

import { MainHeader } from '@/shared/components/MainHeader'

export default function FincasLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ navigation, options }) => {
          return <MainHeader navigation={navigation} title={options.title} />
        },
        headerShown: true,
      }}
    >
      <Stack.Screen name="farms/[farmId]/[imei]" />
    </Stack>
  )
}
