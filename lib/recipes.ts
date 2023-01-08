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
