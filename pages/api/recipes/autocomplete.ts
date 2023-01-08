import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SPOONACULAR_API_BASE_URL, SPOONACULAR_API_KEY } from '~lib/constants'

export interface Data {
  queries: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: searchQuery } = req.query
  const { data } = await axios({
    method: 'GET',
    baseURL: SPOONACULAR_API_BASE_URL,
    url: '/recipes/autocomplete',
    headers: {
      'x-api-key': SPOONACULAR_API_KEY,
    },
    params: {
      query: searchQuery,
      number: 4,
    },
  })

  const autocompletedQueries = data.map((recipe: any) => recipe.title)

  res.status(200).json({ queries: autocompletedQueries })
}
