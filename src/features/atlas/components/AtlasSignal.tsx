import { Wifi, WifiHigh, WifiLow, WifiOff, WifiZero } from 'lucide-react-native'
import { useMemo } from 'react'

export function AtlasSignal({ signal, size = 16 }: { signal: number; size?: number }) {
  const signalColor = useMemo(() => {
    if (signal >= 60) return '#22c55e'
    if (signal >= 30) return '#f59e0b'
    return '#ef4444'
  }, [signal])

  return (
    <>
      {signal >= 80 && <Wifi size={size} color={signalColor} />}
      {signal >= 40 && signal < 80 && <WifiHigh size={size} color={signalColor} />}
      {signal >= 10 && signal < 40 && <WifiLow size={size} color={signalColor} />}
      {signal > 0 && signal < 10 && <WifiZero size={size} color={signalColor} />}
      {signal === 0 && <WifiOff size={size} color={signalColor} />}
    </>
  )
}
