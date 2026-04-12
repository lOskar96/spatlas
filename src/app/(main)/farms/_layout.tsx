import { Stack } from 'expo-router'
import { useTheme } from 'react-native-paper'

export default function FincasLayout() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* 
        Aquí se definirían las siguientes pantallas en la estructura:
        
        <Stack.Screen 
          name="[id]/index" 
          options={{ title: 'Listado de Atlas' }} 
        />
        <Stack.Screen 
          name="[id]/atlas/[imei]" 
          options={{ title: 'Detalle de Atlas' }} 
        />
      */}
    </Stack>
  )
}
