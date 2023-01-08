import useSWRInfinite from 'swr/infinite'
import axios from 'axios'
import { PAGE_SIZE } from '~lib/constants'
import type { Recipes } from '~lib/recipes'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useRecipes(search: string): {
  recipes?: Recipes
  isLoadingInitialData: boolean
  isLoadingMore: boolean
  isEmpty: boolean
  isReachingEnd: boolean
  isRefreshing: boolean
  isError: boolean
  size: number
  setSize: (size: number) => void
} {
  const { data, error, isValidating, size, setSize } = useSWRInfinite(
    (index) => `/api/recipes/search?query=${encodeURI(search)}&offset=${index}`,
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isEmpty = data?.[0].recipes.length === 0

  return {
    recipes: data && data.map((list) => list.recipes as Recipes).flat(),
    isError: error,
    size,
    setSize,
    isLoadingInitialData,
    isLoadingMore:
      isLoadingInitialData ||
      (size > 0 && data !== undefined && typeof data[size - 1] === 'undefined'),
    isEmpty,
    isReachingEnd:
      isEmpty ||
      (data !== undefined && data[data.length - 1]?.recipes.length < PAGE_SIZE),
    isRefreshing: isValidating && data !== undefined && data.length === size,
  }
}
