import axios from 'axios'
import { SPOONACULAR_API_BASE_URL, SPOONACULAR_API_KEY } from '~lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { RecipeDetails } from '~lib/recipes'
import { getImageDimensions } from '~lib/regex'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeDetails>
) {
  const { id } = req.query

  const { data: recipeData } = await axios({
    method: 'GET',
    baseURL: SPOONACULAR_API_BASE_URL,
    url: `/recipes/${id}/information`,
    headers: {
      'x-api-key': SPOONACULAR_API_KEY,
    },
  })
  const { title, image: imageUrl, servings, cookingMinutes } = recipeData
  const { width, height } = getImageDimensions(imageUrl) || {
    width: null,
    height: null,
  }

  const { data: instructionsData } = await axios({
    method: 'GET',
    baseURL: SPOONACULAR_API_BASE_URL,
    url: `/recipes/${id}/analyzedInstructions`,
    headers: {
      'x-api-key': SPOONACULAR_API_KEY,
    },
  })

  const instructions = instructionsData.map((food: any) => {
    const { name, steps } = food
    return {
      name,
      steps: steps.map((step: any) => ({ step: step.step })),
    }
  })

  res.status(200).json({
    id: Number(id),
    title,
    image: { url: imageUrl, width, height },
    servings,
    cookingMinutes,
    instructions,
  })
}
