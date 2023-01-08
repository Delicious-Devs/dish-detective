export type Recipes = {
  id: number
  title: string
  image: { url: string; width: number | null; height: number | null }
  servings: number
  cookingMinutes: number
}[]
