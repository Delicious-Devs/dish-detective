import useSWR from 'swr'
import axios from 'axios'
import type { RecipeDetails } from '~lib/recipes'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useRecipe(id: string): {
  data?: RecipeDetails
  isError: boolean
  isLoading: boolean
} {
  const { data, error, isLoading } = useSWR(`/api/recipes/${id}`, fetcher)

  return {
    data: data,
    isError: error,
    isLoading,
  }
}
