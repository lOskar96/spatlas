import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { coreApi } from '@/shared/api/client'

import type { Atlas, AtlasDetail, AtlasPage } from '../types/atlas'

const PAGE_SIZE = 10

const mapAtlas = (item: any): Atlas => ({
  id: item.id,
  imei: item.imei,
  name: item.name,
  expiredDate: item.expiredDate,
  battery: item.batteryPercentage ?? item.battery,
  signal: item.signalPercentage ?? item.signal,
})

const mapAtlasDetail = (item: any): AtlasDetail => ({
  ...mapAtlas(item),
  latitude: item.latitude,
  longitude: item.longitude,
  productTypeName: item.productTypeName,
  atlasStatus: item.atlasStatus,
})

export const useAtlas = (farmId: string) => {
  return useInfiniteQuery<AtlasPage>({
    queryKey: ['atlas', farmId],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await coreApi.get(
        `/systems/${farmId}/Atlas?Init=${pageParam}&Limit=${PAGE_SIZE}`,
      )
      const payload = response.data as AtlasPage
      return {
        ...payload,
        items: payload.items?.map(mapAtlas) ?? [],
      }
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.pageNumber + 1 : undefined,
  })
}

export const useAtlasDetail = (farmId: string, imei: string) => {
  return useQuery<AtlasDetail>({
    queryKey: ['atlas-detail', farmId, imei],
    queryFn: async () => {
      const response = await coreApi.get(`/systems/${farmId}/Atlas/${imei}`)
      return mapAtlasDetail(response.data)
    },
    enabled: Boolean(farmId && imei),
  })
}
