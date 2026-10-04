import { defineQuery } from 'next-sanity'
import type { CategoryValue, CountryCode, RecipeDetail, RecipeSummary } from '@/lib/recipes'
import { sanityFetch } from './client'

const summaryProjection = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  "image": image{ ..., "lqip": asset->metadata.lqip },
  category,
  country,
  prepTime,
  cookTime,
  servings,
  difficulty
`

export const featuredRecipeQuery = defineQuery(`
  *[_type == "recipe" && defined(slug.current)]
    | order(coalesce(isFeatured, false) desc, _updatedAt desc)[0]{ ${summaryProjection} }
`)

export const recipesQuery = defineQuery(`
  *[_type == "recipe" && defined(slug.current)
    && (!defined($category) || category == $category)
    && (!defined($country) || country == $country)
    && ($q == "" || title match $q || summary match $q || count(ingredients[@ match $q]) > 0)
  ] | order(_createdAt desc)[0...$limit]{ ${summaryProjection} }
`)

export const recipeBySlugQuery = defineQuery(`
  *[_type == "recipe" && slug.current == $slug][0]{
    ${summaryProjection},
    ingredients,
    instructions,
    proTips
  }
`)

export const relatedRecipesQuery = defineQuery(`
  *[_type == "recipe" && defined(slug.current) && slug.current != $slug
    && ((defined($country) && country == $country) || (defined($category) && category == $category))
  ] | order(_createdAt desc)[0...3]{ ${summaryProjection} }
`)

export const recipeSlugsQuery = defineQuery(`*[_type == "recipe" && defined(slug.current)].slug.current`)

export type RecipeFilters = { q: string; category: CategoryValue | null; country: CountryCode | null }

export function getFeaturedRecipe() {
  return sanityFetch<RecipeSummary | null>({ query: featuredRecipeQuery, fallback: null })
}

export function getRecipes({ q, category, country }: RecipeFilters, limit = 12) {
  const term = q.trim().replace(/[*"\\]/g, '')
  return sanityFetch<RecipeSummary[]>({
    query: recipesQuery,
    params: { q: term ? `${term}*` : '', category, country, limit },
    fallback: [],
  })
}

export function getRecipeBySlug(slug: string) {
  return sanityFetch<RecipeDetail | null>({ query: recipeBySlugQuery, params: { slug }, fallback: null })
}

export function getRelatedRecipes(recipe: Pick<RecipeSummary, 'slug' | 'country' | 'category'>) {
  return sanityFetch<RecipeSummary[]>({
    query: relatedRecipesQuery,
    params: { slug: recipe.slug, country: recipe.country, category: recipe.category },
    fallback: [],
  })
}

export function getRecipeSlugs() {
  return sanityFetch<string[]>({ query: recipeSlugsQuery, fallback: [] })
}
