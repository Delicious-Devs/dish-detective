import axios from 'axios'
import {
  PAGE_SIZE,
  SPOONACULAR_API_BASE_URL,
  SPOONACULAR_API_KEY,
} from './constants'
import { getImageDimensions } from '~lib/regex'

export interface Recipe {
  id: number
  title: string
  image: { url: string; width: number | null; height: number | null }
  servings: number
  cookingMinutes: number
}
export type Recipes = Recipe[]

export interface RecipeDetails {
  id: number
  title: string
  image: { url: string; width: number | null; height: number | null }
  servings: number
  cookingMinutes: number
  instructions: {
    name: string
    steps: {
      step: string
    }[]
  }[]
}

export async function getRecipes(
  searchQuery: string,
  offset: number
): Promise<Recipes> {
  const { data } = await axios({
    method: 'GET',
    baseURL: SPOONACULAR_API_BASE_URL,
    url: '/recipes/complexSearch',
    headers: {
      'x-api-key': SPOONACULAR_API_KEY,
    },
    params: {
      offset,
      number: PAGE_SIZE,
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

  return recipes
}
