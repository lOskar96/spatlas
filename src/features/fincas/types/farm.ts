export interface Farm {
  id: number
  name: string
  favourite: boolean
  createdDate: Date
  latitude: string
  longitude: string
  country: string
  measuringSystemTypeId: number
  timeZone: string
  timeZoneStandard: string
  type: number
  userId: number
  currencySymbol: string
  currencyTypeId: number
  description: string
  image: string
  isLite: boolean
}
