export const SPOONACULAR_API_IMAGE_URL_REGEX =
  /https:\/\/spoonacular.com\/recipeImages\/(\d*)-(\d*)x(\d*).[jpg|png]/

export function getImageDimensions(
  url: string
): { width: number; height: number } | null {
  const urlMatch = url.match(SPOONACULAR_API_IMAGE_URL_REGEX)
  if (urlMatch) {
    const width = Number(urlMatch[2])
    const height = Number(urlMatch[3])
    return { width, height }
  }
  return null
}
