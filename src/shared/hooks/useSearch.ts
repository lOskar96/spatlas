import { useMemo, useState } from 'react'

interface UseSearchOptions<T> {
  items: T[]
  searchFields: (keyof T)[]
  filters?: {
    [key: string]: (item: T) => boolean
  }
}

export const useSearch = <T>({
  items,
  searchFields,
  filters = {},
}: UseSearchOptions<T>) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (!items) return []

    return items.filter((item) => {
      const matchesSearch = searchFields.some((field) => {
        const value = item[field]
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value).toLowerCase().includes(searchQuery.toLowerCase())
        }
        return false
      })

      const matchesAllFilters = activeFilters.every((filterKey) => {
        const filterFn = filters[filterKey]
        return filterFn ? filterFn(item) : true
      })

      return matchesSearch && matchesAllFilters
    })
  }, [items, searchQuery, activeFilters, filters, searchFields])

  const toggleFilter = (filterKey: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterKey)
        ? prev.filter((f) => f !== filterKey)
        : [...prev, filterKey],
    )
  }

  return {
    searchQuery,
    setSearchQuery,
    filtered,
    activeFilters,
    toggleFilter,
  }
}
