export interface Atlas {
  id: number
  imei: string
  name: string
  expiredDate: string
  battery: number
  signal: number
}

export interface AtlasPage {
  items: Atlas[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface AtlasDetail extends Atlas {
  latitude: string
  longitude: string
  productTypeName: string
  atlasStatus: number
}
