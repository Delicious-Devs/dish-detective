import axios from 'axios'
import { getImageDimensions } from '~lib/regex'
import { SPOONACULAR_API_BASE_URL, SPOONACULAR_API_KEY } from '~lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Recipes } from '~lib/recipes'

export interface Data {
  recipes: Recipes
  totalResults: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: searchQuery, offset } = req.query
  const { data } = await axios({
    method: 'GET',
    baseURL: SPOONACULAR_API_BASE_URL,
    url: '/recipes/complexSearch',
    headers: {
      'x-api-key': SPOONACULAR_API_KEY,
    },
    params: {
      offset,
      query: searchQuery,
      addRecipeInformation: true,
    },
  })

  const recipes = data.results.map((result: any) => {
    const { id, title, image: imageUrl, servings, cookingMinutes } = result
    const { width, height } = getImageDimensions(imageUrl) || {
      width: null,
      height: null,
    }

    return {
      id,
      title,
      image: {
        url: imageUrl,
        width,
        height,
      },
      servings,
      cookingMinutes,
    }
  })
  res.status(200).json({ recipes, totalResults: data.totalResults })
}
