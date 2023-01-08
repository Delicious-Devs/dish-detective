import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecipes, Recipes } from '~lib/recipes'

export interface Data {
  recipes: Recipes
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: searchQuery, offset } = req.query

  const recipes = await getRecipes(String(searchQuery), Number(offset))
  res.status(200).json({ recipes })
}
