import { useQuery } from '@tanstack/react-query'

import { coreApi } from '@/shared/api/client'

export const useFarms = () => {
  return useQuery({
    queryKey: ['fincas'],
    queryFn: async () => {
      const response = await coreApi.get(`/System/List`)
      console.log(response)
      return response.data
    },
  })
}
