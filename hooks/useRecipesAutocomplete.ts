import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useRecipesAutocomplete(search: string): {
  data?: string[]
  isError: boolean
  isLoading: boolean
} {
  const { data, error, isLoading } = useSWR(
    `/api/recipes/autocomplete?query=${encodeURI(search)}`,
    fetcher
  )

  return {
    data: data && data.queries,
    isError: error,
    isLoading,
  }
}
