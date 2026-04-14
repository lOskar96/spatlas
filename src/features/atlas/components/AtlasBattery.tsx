import { Battery, BatteryFull, BatteryLow, BatteryMedium } from 'lucide-react-native'
import { useMemo } from 'react'

export function AtlasBattery({ battery, size = 16 }: { battery: number; size?: number }) {
  const batteryColor = useMemo(() => {
    if (battery >= 60) return '#22c55e'
    if (battery >= 30) return '#f59e0b'
    return '#ef4444'
  }, [battery])

  return (
    <>
      {battery >= 80 && <BatteryFull size={size} color={batteryColor} />}
      {battery >= 40 && battery < 80 && (
        <BatteryMedium size={size} color={batteryColor} />
      )}
      {battery >= 15 && battery < 40 && <BatteryLow size={size} color={batteryColor} />}
      {battery < 15 && <Battery size={size} color={batteryColor} />}
    </>
  )
}
